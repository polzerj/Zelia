import ResourceNotFoundError from "../../types/ResourceNotFoundError";
import { getTimetableUrl } from "../URLFactory";
import Lesson from "./Lesson";

export async function getTimetableByRoomNumber(
    roomNr: string
): Promise<Lesson[]> {
    const res = await fetch(getTimetableUrl(roomNr));
    if (res.status === 404) {
        throw new ResourceNotFoundError(`Timetable for ${roomNr} not found.`);
    }

    if (!res.ok) throw new Error(`Other error ${res.status}`);

    return (await res.json()) as Lesson[];
}
