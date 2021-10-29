import { getRoomInfoByRoomNumber } from "../services/roominfo";
import {
    buildSummary,
    createRoomInfoText,
} from "../services/roominfo/elementCreation";
import RoomInfoModel from "../services/roominfo/RoomInfoModel";
import Component from "../types/Component";
import logger from "../util/logger";

interface SearchElements {
    details: HTMLDetailsElement;
    divExtendable: HTMLDivElement;
}

export default class RoomInfo extends Component<SearchElements> {
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
            this.createElements(roomInfo[0]);
        } catch (e) {
            logger.error(e);
            this.createErrorElements();
        }
    }

    private createElements(roomInfo: RoomInfoModel) {
        let welcomeMsg = "Willkommen in " + roomInfo.roomNumber;

        this.setState("welcomeMsg", welcomeMsg);
        this.setState("infoSummary", buildSummary(roomInfo));

        for (const infoText of createRoomInfoText(roomInfo)) {
            this.appendInfo(infoText);
        }

        /*  for (const key in roomInfo) {
            let val = (roomInfo as any)[key];
            this.appendInfo(key + " - " + val);
        } */
    }

    private appendInfo(text: string) {
        const e = document.createElement("p");
        e.textContent = text;
        this.elements.divExtendable.append(e);
    }

    private createErrorElements() {
        this.setState("welcomeMsg", "Raum nicht gefunden :(");
        this.elements.details.classList.add("hidden");
    }
}
