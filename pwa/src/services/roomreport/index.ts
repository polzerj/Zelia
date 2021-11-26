import RescourceNotFoundError from "../../types/RescourceNotFoundError";
import { getRoomReportUrl } from "../URLFactory";

export async function postRoomReport(report: RoomReport): Promise<void> {
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
