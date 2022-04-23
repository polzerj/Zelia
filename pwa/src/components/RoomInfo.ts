import Accordion from "../services/animation/Accordion";
import { getRoomInfoByRoomNumber } from "../services/room";
import { buildSummary, createRoomInfoText } from "../services/room/elementCreation";
import RoomInfoModel from "../services/room/RoomInfoModel";
import Component from "../types/Component";
import RescourceNotFoundError from "../types/RescourceNotFoundError";
import logger from "../util/logger";

interface SearchElements {
    details: HTMLDetailsElement;
    divExtendable: HTMLDivElement;
    status: HTMLSpanElement;
}

export default class RoomInfo extends Component<SearchElements> {
    constructor() {
        super("zelia-room-info", {
            queries: {
                details: "#dtlInfo",
                divExtendable: "#divExtendable",
                status: "span",
            },
            autoRender: false,
        });

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

    registerEventListenerCallback() {
        new Accordion(this.elements.details);
    }

    private async loadInfo(roomNumber: string) {
        try {
            let roomInfo = await getRoomInfoByRoomNumber(roomNumber);
            this.createElements(roomInfo[0]);
        } catch (e) {
            if (e instanceof RescourceNotFoundError) {
                this.setState("welcomeMsg", `Willkommen in ${roomNumber}!`);
                this.setState("status", `Keine Daten verfügbar :(`);

                this.elements.status.classList.remove("hidden");
            } else {
                this.setState("welcomeMsg", "Verbindung fehlgeschlagen!");
            }

            this.elements.details.classList.add("hidden");

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

    private createErrorElements() {}
}
