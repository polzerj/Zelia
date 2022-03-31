export default class RoomReportModel {
    roomNumber: string;
    user: string;
    information: string;
    firstDetected: number;

    constructor(report: RoomReportModel) {
        this.roomNumber = report.roomNumber;
        this.user = report.user;
        this.information = report.information;
        this.firstDetected = report.firstDetected;
    }
}
