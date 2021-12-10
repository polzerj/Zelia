import RoomReportModel from "../services/room/RoomReportModel";
import Component from "../types/Component";

interface SearchElements {
    btnClose: HTMLButtonElement;
}

export default class ReportHandle extends Component<SearchElements> {
    constructor() {
        super("zelia-report-handle", {
            useShadowRoot: false,
            autoRender: false,
            queries: {
                btnClose: "#btnClose",
            },
        });
    }

    public set reportData(data: RoomReportModel) {
        this.setState("notice", "Anmerkung: ");
        this.setState("info", "Meldung für: ");
        this.setState("close", "Erledigt");

        this.setState("roomNr", data.roomNumber);
        this.setState("user", data.user);
        this.setState("description", data.message);
        this.setState("date", new Date(data.firstDedection).toLocaleString());

        this.render(true);
    }

    registerEventListenerCallback() {
        this.elements.btnClose.addEventListener("click", this.btnCloseClick.bind(this));
    }

    btnCloseClick() {
        // TODO: send to server
        this.remove();
    }
}
