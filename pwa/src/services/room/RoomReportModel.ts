export default class RoomReportModel {
    roomNumber: string;
    user: string;
    message: string;
    firstDedection: number;

    constructor(report: RoomReportModel) {
        this.roomNumber = report.roomNumber;
        this.user = report.user;
        this.message = report.message;
        this.firstDedection = report.firstDedection;
    }
}
