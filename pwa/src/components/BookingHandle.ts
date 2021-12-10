import RoomBookingModel from "../services/room/RoomBookingModel";
import Component from "../types/Component";

interface SearchElements {
    btnDeny: HTMLButtonElement;
    btnAllow: HTMLButtonElement;
}

export default class BookingHandle extends Component<SearchElements> {
    constructor() {
        super("zelia-booking-handle", {
            useShadowRoot: false,
            autoRender: false,
            queries: {
                btnDeny: "#btnDeny",
                btnAllow: "#btnAllow",
            },
        });
        // INFO: Elements with no shadowroot inside other custom shadowroot elements cannot be auto-rendered
    }

    public set bookingData(data: RoomBookingModel) {
        this.setState("notice", "Informationen: ");
        this.setState("info", "Raumbuchung für: ");
        this.setState("allow", "Erlauben");
        this.setState("deny", "Ablehnen");

        let date = new Date(data.date).toLocaleDateString();
        this.setState("roomNr", data.roomNumber);
        this.setState("user", data.user);
        this.setState("date", date);
        this.setState("purpose", "Grund der Buchung: " + data.purpose);
        this.setState("time", `Am ${date} von der ${data.from}. bis in die ${data.until}. Stunde`);

        this.render(true);
    }

    registerEventListenerCallback() {
        this.elements.btnAllow.addEventListener("click", this.btnAllowClick.bind(this));
        this.elements.btnDeny.addEventListener("click", this.btnDenyClick.bind(this));
    }

    btnDenyClick() {
        // TODO: send to server
        this.remove();
    }
    btnAllowClick() {
        // TODO: send to server
        this.remove();
    }
}
