export default interface RoomReportEntity
{
    Id: Number;
    RoomId: Number;
    AssignedAdminId: Number;
    Description: string;
    Email: string;
    ReportDate: Date;
    NoteTime: Date;
    Status: string;
}
