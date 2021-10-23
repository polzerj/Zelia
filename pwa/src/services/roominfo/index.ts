import RescourceNotFoundError from "../../types/RescourceNotFoundError";
import { getRoomInfoUrl } from "../URLFactory";
import RoomInfoModel from "./RoomInfoModel";

export async function getRoomInfoByRoomNumber(
    roomNr: string
): Promise<RoomInfoModel[]> {
    const res = await fetch(getRoomInfoUrl(roomNr));

    if (res.status === 404) {
        throw new RescourceNotFoundError();
    }

    if (!res.ok) throw new Error("Another error (Not 404; Not Not found)");

    return (await res.json()) as RoomInfoModel[];
}
