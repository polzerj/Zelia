import { getTimetableUrl } from "../URLFactory";
import Lesson from "./Lesson";

export async function getTimetableByRoomNumber(
    roomNr: string
): Promise<Lesson[]> {
    const res = await fetch(getTimetableUrl(roomNr));
    return (await res.json()) as Lesson[];
}
