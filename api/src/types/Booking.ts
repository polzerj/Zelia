import HashObject from "./HashObject";

export default class Booking extends HashObject {
    public readonly roomNumber: string;
    public readonly user: string;
    public readonly date: number;

    public readonly from: number;
    public readonly until: number;
    public readonly purpose: string;

    constructor(roomNumber: string, user: string, date: number, from: number, until: number, purpose: string) {
        super(`${roomNumber}${user}${date}${from}${until}${purpose}`);

        this.roomNumber = roomNumber;
        this.user = user;
        this.date = date;

        this.from = from;
        this.until = until;
        this.purpose = purpose;
    }
}
