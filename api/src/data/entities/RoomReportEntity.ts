export default interface RoomReportEntity
{
    Id: number;
    RoomId: number;
    AssignedAdminId: number;
    ReportDescription: string;
    Email: string;
    ReportDateTime: Date;
    ReportStatus: string;
}
