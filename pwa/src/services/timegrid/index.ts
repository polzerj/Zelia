import { getTimegridUrl } from "../URLFactory";
import Timegrid from "./Timegrid";

export async function getTimeGrid(): Promise<Timegrid[]> {
    const res = await fetch(getTimegridUrl());
    return (await res.json()) as Timegrid[];
}
