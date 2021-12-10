import RoomReportModel from "../room/RoomReportModel";
import logger from "../../util/logger";
import { getAdminLoginUrl } from "../URLFactory";
import RoomBookingModel from "../room/RoomBookingModel";

export async function login(username: string, password: string): Promise<boolean> {
    const res = await fetch(getAdminLoginUrl(), {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    });
    if (!res.ok) {
        logger.info("login request response: " + res.status);
        return false;
    }

    let { token }: { token: string } = await res.json();
    sessionStorage.setItem("token", token);

    return true;
}

export async function fetchRequests(type?: "reports" | "bookings" | "all", amount?: number): Promise<(RoomReportModel | RoomBookingModel)[]> {
    return [
        new RoomReportModel({
            firstDedection: new Date().getTime(),
            user: "julian.kusternigg@edu.szu.at",
            roomNumber: "1308",
            message: "Beamer liegt am Boden :(",
        }),
        new RoomBookingModel({
            purpose: "Weil der Raum so schön ist :) !",
            user: "julian.kusternigg@edu.szu.at",
            roomNumber: "1308",
            date: new Date().getTime(),
            from: 1,
            until: 3,
        }),
    ];
}

export function isLoggedIn(): boolean {
    return sessionStorage.getItem("token") ? true : false;
}
