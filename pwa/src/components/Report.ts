import Component from "../types/Component";

interface SearchElements {
    form: HTMLFormElement;
    tbxEmail: HTMLInputElement;
    txaInfoMessage: HTMLTextAreaElement;
    dtpFirstNotice: HTMLInputElement;
}

export default class NotFoundError extends Component<SearchElements> {
    constructor() {
        super("zelia-report", {
            queries: {
                form: "form",
                tbxEmail: "#email",
                txaInfoMessage: "#message",
                dtpFirstNotice: "#first-notice",
            },
            autoRender: true,
        });

        this.setState("reportMsg", `No room selected :(`);
    }
    registerEventListenerCallback() {
        this.elements.form.addEventListener("submit", this.reportSubmitted);
    }
    removeEventListenerCallback() {
        this.elements.form.removeEventListener("submit", this.reportSubmitted);
    }
    bindMethodsCallback() {
        this.reportSubmitted = this.reportSubmitted.bind(this);
    }

    set roomNumber(roomNumber: string) {
        this.setAttribute("room-number", roomNumber);

        this.writeStates();
    }

    get roomNumber(): string {
        return this.getAttribute("room-number") ?? "";
    }

    writeStates() {
        this.setState(
            "reportMsg",
            `What's wrong with the room :( (${this.roomNumber})`
        );
        this.setState("firstNoticeLabel", "Wann wurde es bemerkt");
        this.setState("messageLabel", "Was ist hinnig?");

        this.render(true);
    }

    reportSubmitted(e: Event) {
        e.preventDefault();

        const formData = new FormData(this.elements.form);

        const data = {
            roomNumber: this.roomNumber,
            email: formData.get("email") as string,
            message: formData.get("message") as string,
            firstNotice: formData.get("first-notice") as string,
        };
    }
}
