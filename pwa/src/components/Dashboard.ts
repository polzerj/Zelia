import Component from "../types/Component";

import { fetchRequests } from "../services/admin";
import RoomReportModel from "../services/room/RoomReportModel";
import RoomBookingModel from "../services/room/RoomBookingModel";

import BookingHandle from "./BookingHandle";
import ReportHandle from "./ReportHandle";

interface SearchElements {
    divFeed: HTMLDivElement;
}

export default class Dashboard extends Component<SearchElements> {
    private requests: Promise<(RoomReportModel | RoomBookingModel)[]>;
    constructor() {
        super("zelia-admin-dashboard", {
            useShadowRoot: true,
            queries: { divFeed: "#divFeed" },
        });

        this.setState("noReqMsg", "Keine weiteren Anfragen vorhanden!");

        this.requests = fetchRequests();
    }

    async connectedCallback() {
        this.elements.divFeed.innerHTML = "";

        for (const req of await this.requests) {
            if (req instanceof RoomBookingModel) {
                this.elements.divFeed.append(this.createBookingHandle(req));
            } else if (req instanceof RoomReportModel) {
                this.elements.divFeed.append(this.createReportHandle(req));
            }
        }
    }

    private createBookingHandle(booking: RoomBookingModel): BookingHandle {
        let bh = document.createElement("zelia-booking-handle") as BookingHandle;
        bh.bookingData = booking;
        return bh;
    }

    private createReportHandle(report: RoomReportModel): ReportHandle {
        let rh = document.createElement("zelia-report-handle") as ReportHandle;
        rh.reportData = report;
        return rh;
    }

    bindMethodsCallback() {}

    registerEventListenerCallback() {}

    removeEventListenerCallback() {}
}
