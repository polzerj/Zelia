export default interface RoomReportEntity
{
    Id: Number;
    RoomId: Number;
    AssignedAdminId: Number;
    ReportDescription: string;
    Email: string;
    ReportDateTime: Date;
    ReportStatus: string;
}
