import HashObject from "./HashObject";

export default class Booking extends HashObject {
    public readonly roomNumber: string;
    public readonly user: string;
    public readonly date: Date;

    public readonly from: number;
    public readonly until: number;
    public readonly purpose: string;

    constructor(
        roomNumber: string,
        user: string,
        date: number,
        from: number,
        until: number,
        purpose: string
    ) {
        super(`${roomNumber}${user}${date}${from}${until}${purpose}`);

        this.roomNumber = roomNumber;
        this.user = user;
        this.date = new Date(date);

        this.from = from;
        this.until = until;
        this.purpose = purpose;
    }
}
