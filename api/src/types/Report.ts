import HashObject from "./HashObject";

export default class Report extends HashObject {
    public readonly roomNumber: string;
    public readonly user: string;
    public readonly firstDetected: Date;
    public readonly information: string;

    constructor(
        roomNumber: string,
        user: string,
        firstDetected: number,
        information: string
    ) {
        super(`${roomNumber}${user}${firstDetected}${information}`);

        this.roomNumber = roomNumber;
        this.user = user;
        this.firstDetected = new Date(firstDetected);
        this.information = information;
    }
}