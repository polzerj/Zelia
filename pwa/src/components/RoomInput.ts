import Component from "../types/Component";
import logger from "../util/logger";

interface SearchElements {
    form: HTMLFormElement;
    input: HTMLInputElement;
    button: HTMLButtonElement;
    autoCompleteList: HTMLDataListElement;
}

const roomNumbers = ["S4124", "EDV 31", "1412"];

export default class RoomInput extends Component<SearchElements> {
    constructor() {
        super("zelia-room-input", {
            input: "#tbxInput",
            button: "#btnSubmit",
            form: "#frmInput",
            autoCompleteList: "#dtlAutoComplete",
        });

        this.setState("infoMsg", "Raumnummer eingeben:");
        this.setState("btnText", "Choose");
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
    }

    fillDataList() {
        for (const rn of roomNumbers) {
            let item = document.createElement("option");
            item.textContent = rn;

            this.elements.autoCompleteList.append(item);
        }
    }
}
