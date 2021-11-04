import { getRoomList } from "../services/roomlist";
import { getMatchingPart } from "../services/validation";
import Component from "../types/Component";
import logger from "../util/logger";
import router from "../router";

interface SearchElements {
    form: HTMLFormElement;
    input: HTMLInputElement;
    button: HTMLButtonElement;
    autoCompleteList: HTMLDataListElement;
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
            },
        });

        this.setState("infoMsg", "Raumnummer eingeben:");
        this.setState("btnText", "Choose");

        this.roomNumbers = getRoomList();
        this.fillDataList();
    }

    bindMethodsCallback() {
        this.submit = this.submit.bind(this);
    }

    registerEventListenerCallback() {
        this.elements.form.addEventListener("submit", this.submit);
    }

    removeEventListenerCallback() {
        this.elements.form.removeEventListener("submit", this.submit);
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
