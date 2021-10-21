import { getRoomInfoByRoomNumber } from "../services/roominfo";
import RoomInfoModel from "../services/roominfo/RoomInfoModel";
import Component from "../types/Component";
import logger from "../util/logger";

interface SearchElements {
    details: HTMLDetailsElement;
    divExtendable: HTMLDivElement;
}

export default class RoomInfo extends Component<SearchElements> {
    private _roomInfo?: RoomInfoModel;

    constructor() {
        super(
            "zelia-room-info",
            {
                details: "#dtlInfo",
                divExtendable: "#divExtendable",
            },
            false
        );

        let attr = this.getAttribute("room-number");
        if (attr) this.loadInfo(attr);
    }

    set roomNumber(roomNumber: string) {
        this.setAttribute("room-number", roomNumber);

        this.loadInfo(roomNumber);
    }

    get roomNumber(): string {
        return this.getAttribute("room-number") ?? "";
    }

    private async loadInfo(roomNumber: string) {
        try {
            let roomInfo = await getRoomInfoByRoomNumber(roomNumber);
            this.createElements(roomInfo);
        } catch (e) {
            logger.error(e);
            this.createErrorElements();
        }
    }

    private createElements(roomInfo: RoomInfoModel) {
        let welcomeMsg = "Willkommen in " + roomInfo.roomNumber;

        this.setState("welcomeMsg", welcomeMsg);
        this.setState("infoSummary", roomInfo.description);

        for (const key in roomInfo) {
            let e = document.createElement("p");
            let val = (roomInfo as any)[key];

            e.textContent = key + " - " + val;

            this.elements.divExtendable.append(e);
        }
    }

    private createErrorElements() {
        this.setState("welcomeMsg", "Raum nicht gefunden :(");
        this.elements.details.classList.add("hidden");
    }
}
