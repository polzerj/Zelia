import { getRoomInfoUrl } from "../URLFactory";
import RoomInfo from "./RoomInfo";

export async function getRoomInfoByRoomNumber(
    roomNr: string
): Promise<RoomInfo> {
    const res = await fetch(getRoomInfoUrl(roomNr));
    return (await res.json()) as RoomInfo;
}
