import router from "../router";
import Component from "../types/Component";
import { isRoomNumberValid } from "./OCR";

interface SearchElements {
    inputBox: HTMLInputElement;
    form: HTMLFormElement;
}

export default class RoomInput extends Component<SearchElements> {
    isEmpty: boolean = true;

    constructor() {
        super("zelia-room-input", { inputBox: "input", form: "form" });

        if (isMobile) this.setState("infoMsg", "Or enter manually: ");
        else this.setState("infoMsg", "Enter room number: ");
    }

    bindMethodsCallback() {
        this.inputChanged = this.inputChanged.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    registerEventListenerCallback() {
        this.elements.inputBox.addEventListener("input", this.inputChanged);
        this.elements.form.addEventListener("submit", this.onSubmit);
    }

    removeEventListenerCallback() {
        this.elements.inputBox.removeEventListener("input", this.inputChanged);
        this.elements.form.removeEventListener("submit", this.onSubmit);
    }

    inputChanged() {
        this.elements.inputBox.value =
            this.elements.inputBox.value.toUpperCase();

        let i = this.elements.inputBox.value;

        if (i.length > 0) {
            if (this.isEmpty && isNumber(i[0])) {
                i = "S" + i;
            }
            if (
                i.length - 1 > 0 &&
                i.length - 1 < 5 &&
                !isNumber(i[i.length - 1])
            ) {
                i = i.substr(0, i.length - 1);
            }
            this.isEmpty = false;
        } else this.isEmpty = true;

        if (i.length > 5) {
            if (i[5] == ".") {
                if (i.length > 6 && !isNumber(i[i.length - 1])) {
                    i = i.substr(0, i.length - 1);
                }

                i = i.substr(0, 7);
            } else i = i.substr(0, 5);
        }

        this.elements.inputBox.value = i;
    }

    onSubmit(ev: Event) {
        ev.preventDefault();

        if (isRoomNumberValid(this.elements.inputBox.value)) {
            router.route("/room?number=" + this.elements.inputBox.value);
        }
    }
}

function isNumber(character: string): boolean {
    return character.charCodeAt(0) >= 48 && character.charCodeAt(0) <= 57;
}

const isMobile = window.navigator.userAgent.toLowerCase().includes("mobile");
