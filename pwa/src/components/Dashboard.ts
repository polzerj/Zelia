import Component from "../types/Component";

import { fetchRequests } from "../services/admin";
import RoomReportModel from "../services/room/RoomReportModel";
import RoomBookingModel from "../services/room/RoomBookingModel";

import BookingHandle from "./BookingHandle";
import ReportHandle from "./ReportHandle";

interface SearchElements {
    divFeed: HTMLDivElement;

    cbxBooking: HTMLInputElement;
    cbxReport: HTMLInputElement;
    noReqMsg: HTMLDivElement;
}

export default class Dashboard extends Component<SearchElements> {
    private requests: Promise<(RoomReportModel | RoomBookingModel)[]>;
    constructor() {
        super("zelia-admin-dashboard", {
            useShadowRoot: true,
            queries: { divFeed: "#divFeed", cbxBooking: "#cbxBooking", cbxReport: "#cbxReport", noReqMsg: "#noReqMsg" },
        });

        this.setState("noReqMsg", "Keine weiteren Anfragen vorhanden!");
        this.setState("cbxBooking", "Buchungen");
        this.setState("cbxReport", "Meldungen");

        this.requests = fetchRequests();
    }

    async connectedCallback() {
        this.filter();
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

    registerEventListenerCallback() {
        this.elements.cbxBooking.addEventListener("change", this.filter.bind(this));
        this.elements.cbxReport.addEventListener("change", this.filter.bind(this));
    }

    removeEventListenerCallback() {}

    async filter() {
        this.elements.divFeed.innerHTML = "";
        this.elements.noReqMsg.style.display = "none";

        for (const req of await this.requests) {
            if (req instanceof RoomBookingModel) {
                if (this.elements.cbxBooking.checked) this.elements.divFeed.append(this.createBookingHandle(req));
            } else if (req instanceof RoomReportModel) {
                if (this.elements.cbxReport.checked) this.elements.divFeed.append(this.createReportHandle(req));
            }
        }

        if (this.elements.divFeed.innerHTML == "") {
            this.elements.noReqMsg.style.display = "block";
        }
    }
}
