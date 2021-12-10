import { getBookingReportUrl, getRoomInfoUrl, getRoomListUrl, getRoomReportUrl } from "../URLFactory";

import RescourceNotFoundError from "../../types/RescourceNotFoundError";
import RoomInfoModel from "./RoomInfoModel";
import RoomReportModel from "./RoomReportModel";
import RoomBookingModel from "./RoomBookingModel";

export async function postRoomReport(report: RoomReportModel): Promise<void> {
    const res = await fetch(getRoomReportUrl(report.roomNumber), {
        method: "POST",
        headers: new Headers({ "content-type": "application/json" }),
        body: JSON.stringify(report),
    });

    if (res.status === 404) {
        throw new RescourceNotFoundError();
    }

    if (!res.ok) throw new Error("Another error (Not 404; Not Not found)");
}

export async function postBookingReport(booking: RoomBookingModel): Promise<void> {
    const res = await fetch(getBookingReportUrl(booking.roomNumber), {
        method: "POST",
        headers: new Headers({ "content-type": "application/json" }),
        body: JSON.stringify(booking),
    });

    if (res.status === 404) {
        throw new RescourceNotFoundError();
    }

    if (!res.ok) throw new Error("Another error (Not 404; Not Not found)");
}

export async function getRoomList(): Promise<string[]> {
    const res = await fetch(getRoomListUrl());
    return (await res.json()) as string[];
}

export async function getRoomInfoByRoomNumber(roomNr: string): Promise<RoomInfoModel[]> {
    const res = await fetch(getRoomInfoUrl(roomNr));

    if (res.status === 404) {
        throw new RescourceNotFoundError();
    }

    if (!res.ok) throw new Error("Another error (Not 404; Not Not found)");

    return (await res.json()) as RoomInfoModel[];
}
