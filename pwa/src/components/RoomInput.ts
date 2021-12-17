import { getRoomList } from "../services/room";
import { getMatchingPart } from "../services/validation";
import Component from "../types/Component";
import logger from "../util/logger";
import router from "../router";

interface SearchElements {
    form: HTMLFormElement;
    input: HTMLInputElement;
    button: HTMLButtonElement;
    autoCompleteList: HTMLDataListElement;
    ocrInfoText: HTMLSpanElement;
    ocrButton: HTMLButtonElement;
}

export default class RoomInput extends Component<SearchElements> {
    roomNumbers: Promise<string[]>;
    constructor() {
        super("zelia-room-input", {
            queries: {
                input: "#tbxInput",
                button: "#btnSubmit",
                form: "#frmInput",
                autoCompleteList: "#dtlAutoComplete",
                ocrInfoText: "#spnOcrInfo",
                ocrButton: "#btnOcr",
            },
        });

        this.setState("infoMsg", "Raumnummer eingeben:");
        this.setState("btnText", "Suchen 🔎");
        this.setState("btnScan", "Kamera öffnen 📸");

        const isMobile = window.navigator.userAgent
            .toLowerCase()
            .includes("mobile");

        let ocrInfoMsg = "Or use a camera";
        //if (!isMobile) ocrInfoMsg += " on your mobile device";

        this.setState("ocrInfoMsg", ocrInfoMsg);

        if (!isMobile) this.elements.ocrInfoText.style.display = "none";

        if (isMobile) {
            this.elements.ocrButton.style.display = "";
        }

        this.roomNumbers = getRoomList();
        this.fillDataList();
    }

    bindMethodsCallback() {
        this.submit = this.submit.bind(this);
        this.ocrRedirect = this.ocrRedirect.bind(this);
    }

    registerEventListenerCallback() {
        this.elements.form.addEventListener("submit", this.submit);
        this.elements.ocrButton.addEventListener("click", this.ocrRedirect);
    }

    removeEventListenerCallback() {
        this.elements.form.removeEventListener("submit", this.submit);
        this.elements.ocrButton.removeEventListener("click", this.ocrRedirect);
    }

    private ocrRedirect() {
        router.redirect("/ocr");
    }

    submit(ev: Event) {
        ev.preventDefault();

        logger.info(this.elements.input.value);

        let mp = getMatchingPart(this.elements.input.value);

        if (mp /* && isRoomNumberValid(mp) */) {
            router.redirect("/room/" + mp);
        } else {
            this.elements.input.classList.add("error");
        }
    }

    async fillDataList(): Promise<void> {
        let numbers = await this.roomNumbers;

        this.elements.autoCompleteList.innerHTML = "";

        numbers.push(...this.createRoomShortNumbers(numbers));

        for (const rn of numbers) {
            if (!getMatchingPart(rn)) continue;

            let item = document.createElement("option");
            item.textContent = rn;

            this.elements.autoCompleteList.append(item);
        }
    }

    private createRoomShortNumbers(roomNumbers: string[]): string[] {
        let srooms: string[] = [];
        for (const rn of roomNumbers) {
            let snum = getMatchingPart(rn);

            if (snum && !roomNumbers.includes(snum) && !srooms.includes(snum)) {
                srooms.push(snum);
            }
        }
        return srooms;
    }
}
