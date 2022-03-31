import RoomReportEntity from "../data/entities/RoomReportEntity";
import HashObject from "./HashObject";

export default class Report extends HashObject {
    public readonly roomNumber: string;
    public readonly user: string;
    public readonly firstDetected: number;
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
        this.firstDetected = firstDetected;
        this.information = information;
    }

    static fromDB(report: RoomReportEntity): Report {
        // room id is not room number -> join in db
        return new Report(
            report.RoomNumber,
            report.Email,
            report.ReportDateTime.getTime(),
            report.ReportDescription
        );
    }
}
