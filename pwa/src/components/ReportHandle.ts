import Accordion from "../services/animation/Accordion";
import RoomReportModel from "../services/room/RoomReportModel";
import Component from "../types/Component";

interface SearchElements {
    btnClose: HTMLButtonElement;
    details: HTMLDetailsElement;
}

export default class ReportHandle extends Component<SearchElements> {
    constructor() {
        super("zelia-report-handle", {
            useShadowRoot: false,
            autoRender: false,
            queries: {
                btnClose: "#btnClose",
                details: "details",
            },
        });
    }

    public set reportData(data: RoomReportModel) {
        this.setState("notice", "Anmerkung: ");
        this.setState("info", "Meldung für: ");
        this.setState("close", "Erledigt");
        this.setState("tagReport", "Meldung");

        this.setState("roomNr", data.roomNumber);
        this.setState("user", data.user);
        this.setState("description", data.information);
        this.setState("date", new Date(data.firstDetected).toLocaleString());

        this.render(true);
    }

    registerEventListenerCallback() {
        this.elements.btnClose.addEventListener(
            "click",
            this.btnCloseClick.bind(this)
        );
        new Accordion(this.elements.details, { duration: 100 });
    }

    btnCloseClick() {
        // TODO: send to server
        this.remove();
    }
}
