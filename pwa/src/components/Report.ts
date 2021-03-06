import router from "../router";
import { postRoomReport } from "../services/room";
import Component from "../types/Component";
import logger from "../util/logger";

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
        this.setState("reportMsg", `Mangelmeldung für ${this.roomNumber}`);
        this.setState("firstNoticeLabel", "Zuerst aufgetreten: ");
        this.setState("messageLabel", "Problembeschreibung:");
        this.setState("btnSubmit", "Melden");
        this.render(true);
    }

    async reportSubmitted(e: Event) {
        e.preventDefault();

        const formData = new FormData(this.elements.form);

        let datetime = new Date(formData.get("first-notice") as string);

        console.log(datetime);

        try {
            await postRoomReport({
                roomNumber: this.roomNumber,
                user: formData.get("email") as string,
                information: formData.get("message") as string,
                firstDetected: datetime.getTime(),
            });
            router.redirect("/room/" + this.roomNumber);
        } catch (e) {
            logger.error("something went wrong (no connectoin to server)");
        }
    }
}
