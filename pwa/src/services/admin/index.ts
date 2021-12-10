import RoomReportModel from "../room/RoomReportModel";
import logger from "../../util/logger";
import { getAdminLoginUrl, getRequestsUrl } from "../URLFactory";
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

    console.log(token);

    return true;
}

export async function fetchRequests(type?: "reports" | "bookings" | "all", amount?: number): Promise<(RoomReportModel | RoomBookingModel)[]> {
    let token = sessionStorage.getItem("token");
    if (!token) throw Error("Bist nichta nagelmendet du wplleer ");

    let req = await fetch(getRequestsUrl(), {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            authorization: "bearer " + token,
        },
    });

    let obj = await req.json();

    console.log(obj);

    // TODO: Mapper obj to map from API
    let l = [];
    for (const o of obj) {
        if (o.purpose) l.push(new RoomBookingModel(o));
        else
            l.push(
                new RoomReportModel({
                    user: o.user,
                    message: o.information,
                    firstDedection: o.firstDetected,
                    roomNumber: o.roomNumber,
                })
            );
    }

    console.log(l);

    return l;

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
    console.log(sessionStorage.getItem("token"));

    return sessionStorage.getItem("token") ? true : false;
}
