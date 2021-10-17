import { gerRoomListUrl } from "../URLFactory";

export async function getRoomList(): Promise<string[]> {
    const res = await fetch(gerRoomListUrl());
    return (await res.json()) as string[];
}
