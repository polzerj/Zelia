import RoomInfoModel from "../services/roominfo/RoomInfoModel";
import Component from "../types/Component";

interface SearchElements {
    details: HTMLDetailsElement;
    divExtendable: HTMLDivElement;
}

export default class RoomInfo extends Component<SearchElements> {
    private _roomInfo?: RoomInfoModel;

    constructor() {
        super("zelia-room-info", {
            details: "#dtlInfo",
            divExtendable: "#divExtendable",
        });
    }

    set roomInfo(roomInfo: RoomInfoModel) {
        this._roomInfo = roomInfo;
    }

    connectedCallback() {
        if (this._roomInfo) {
            let welcomeMsg = "Willkommen in " + this._roomInfo.roomNumber;

            this.setState("welcomeMsg", welcomeMsg);
            this.setState("infoSummary", this._roomInfo.description);

            for (const key in this._roomInfo) {
                let e = document.createElement("p");
                let val = (this._roomInfo as any)[key];

                e.textContent = key + " - " + val;

                this.elements.divExtendable.append(e);
            }
        } else {
            this.setState("welcomeMsg", "Raum nicht gefunden :(");
            this.elements.details.classList.add("hidden");
        }
    }
}
