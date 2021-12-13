import router from "../router";
import { postBookingReport } from "../services/room";
import Component from "../types/Component";
import logger from "../util/logger";

interface SearchElements {
    form: HTMLFormElement;
    tbxEmail: HTMLInputElement;
    txaPurpose: HTMLTextAreaElement;
    dapDay: HTMLInputElement;
    sltStartLesson: HTMLSelectElement;
    sltNumLesson: HTMLSelectElement;
}

export default class Booking extends Component<SearchElements> {
    private freeLessons: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

    constructor() {
        super("zelia-booking", {
            queries: {
                form: "form",
                tbxEmail: "#email",
                txaPurpose: "#purpose",
                dapDay: "#day",
                sltStartLesson: "#start-lesson",
                sltNumLesson: "#num-lesson",
            },
            autoRender: true,
        });

        this.setState("bookingMsg", `No room selected :(`);
    }

    registerEventListenerCallback() {
        this.elements.form.addEventListener("submit", this.bookingSubmitted);
        this.elements.dapDay.addEventListener("change", this.reRenderStartLesson);
        this.elements.sltStartLesson.addEventListener("change", this.reRenderNumberOfLessons);
    }

    removeEventListenerCallback() {
        this.elements.form.removeEventListener("submit", this.bookingSubmitted);
        this.elements.dapDay.removeEventListener("change", this.reRenderStartLesson);
        this.elements.sltStartLesson.removeEventListener("change", this.reRenderNumberOfLessons);
    }
    bindMethodsCallback() {
        this.bookingSubmitted = this.bookingSubmitted.bind(this);
        this.reRenderStartLesson = this.reRenderStartLesson.bind(this);
        this.reRenderNumberOfLessons = this.reRenderNumberOfLessons.bind(this);
    }

    set roomNumber(roomNumber: string) {
        this.setAttribute("room-number", roomNumber);
        this.writeStates();
    }

    get roomNumber(): string {
        return this.getAttribute("room-number") ?? "";
    }

    writeStates() {
        this.setState("bookingMsg", `Raumbuchung für ${this.roomNumber}`);
        this.setState("messageLabel", "Buchungsgrund:");
        this.setState("day", `Tag der Buchung:`);
        this.setState("startLesson", "Start der Reservierung");
        this.setState("numLesson", "Anzahl der Unterrichtseinheiten:");
        this.setState("btnSubmit", "Buchen");
        this.render(true);

        this.reRenderStartLesson();
    }

    reRenderStartLesson(e?: Event) {
        this.elements.sltStartLesson.innerHTML = "";

        for (const lesson of this.freeLessons) {
            let el = document.createElement("option");
            el.value = lesson.toString();
            el.innerText = lesson.toString();
            this.elements.sltStartLesson.append(el);
        }
    }

    reRenderNumberOfLessons(e?: Event) {
        this.elements.sltNumLesson.innerHTML = "";

        let free = 13 - Number.parseInt(this.elements.sltStartLesson.value);
        let fls = [];
        for (let i = 1; i < free; i++) fls.push(i);

        for (const lesson of fls) {
            let el = document.createElement("option");
            el.value = lesson.toString();
            el.innerText = lesson.toString();
            this.elements.sltNumLesson.append(el);
        }
    }

    async bookingSubmitted(e: Event) {
        e.preventDefault();

        const formData = new FormData(this.elements.form);

        try {
            await postBookingReport({
                roomNumber: this.roomNumber,
                date: new Date(formData.get("day") as string).getTime(),
                from: parseInt(formData.get("start-lesson") as string),
                until: parseInt(formData.get("num-lessons") as string),
                purpose: formData.get("purpose") as string,
                user: formData.get("email") as string,
            });
            router.redirect("/room/" + this.roomNumber);
        } catch (e) {
            logger.error("something went wrong (no connectoin to server)");
        }
    }
}
