import router from "../router";
import Component from "../types/Component";
import logger from "../util/logger";

interface SearchElements {
    form: HTMLFormElement;
    tbxEmail: HTMLInputElement;
    txaPurpose: HTMLTextAreaElement;
    dapDay: HTMLInputElement;
    sltStartLesson: HTMLSelectElement;
    sltNumLessons: HTMLSelectElement;
}

export default class Booking extends Component<SearchElements> {
    private freeLessons: number[] = [];

    constructor() {
        super("zelia-booking", {
            queries: {
                form: "form",
                tbxEmail: "#email",
                txaPurpose: "#purpose",
                dapDay: "#day",
                sltStartLesson: "#start-lesson",
                sltNumLessons: "#num-lessons",
            },
            autoRender: true,
        });

        this.setState("bookingMsg", `No room selected :(`);
    }
    registerEventListenerCallback() {
        this.elements.form.addEventListener("submit", this.bookingSubmitted);
        this.elements.dapDay.addEventListener(
            "change",
            this.rerenderStartLesson
        );
        this.elements.sltStartLesson.addEventListener(
            "change",
            this.rerenderNumberOfLessons
        );
    }

    removeEventListenerCallback() {
        this.elements.form.removeEventListener("submit", this.bookingSubmitted);
        this.elements.dapDay.removeEventListener(
            "change",
            this.rerenderStartLesson
        );
        this.elements.sltStartLesson.removeEventListener(
            "change",
            this.rerenderNumberOfLessons
        );
    }
    bindMethodsCallback() {
        this.bookingSubmitted = this.bookingSubmitted.bind(this);
        this.rerenderStartLesson = this.rerenderStartLesson.bind(this);
        this.rerenderNumberOfLessons = this.rerenderNumberOfLessons.bind(this);
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
            "bookingMsg",
            `Wann willst du ${this.roomNumber} buchen?`
        );
        this.setState("messageLabel", "Grund für die Buchung:");
        this.setState(
            "day",
            `An welchem Tag willst du ${this.roomNumber} buchen?`
        );
        this.setState("startLesson", "Welche Stunde willst du buchen?");
        this.setState("numLesson", "Anzahl der Unterrichtseinheiten:");
        this.setState("btnSubmit", "Buchen");
        this.render(true);
    }

    rerenderStartLesson(e: Event) {
        logger.log("rerenderStartLesson", this.elements.dapDay.value);
    }

    rerenderNumberOfLessons(e: Event) {
        // get the start lesson and return all numbers from start lesson onwards as long as the difference is equal one
        let startLesson = parseInt(this.elements.sltStartLesson.value);
        for (let i = 0; i < array.length; i++) {
            const element = array[i];
            
        }



        logger.log(
            "rerenderNumberOfLessons",
            this.elements.sltStartLesson.value
        );
    }

    async bookingSubmitted(e: Event) {
        e.preventDefault();

        const formData = new FormData(this.elements.form);

        let datetime = new Date(formData.get("day") as string);
        let startLesson = parseInt(formData.get("start-lesson") as string);
        let numLessons = parseInt(formData.get("num-lessons") as string);
        let purpose = formData.get("purpose") as string;
        let email = formData.get("email") as string;

        try {
            router.redirect("/room/" + this.roomNumber);
        } catch (e) {
            logger.error("something went wrong (no connectoin to server)");
        }
    }
}
