export default interface RoomReportEntity {
  Id?: number;
  RoomId: number;
  AssignedAdminId: number;
  RoomNumber: string;
  ReportDescription: string;
  Email: string;
  ReportDateTime: Date;
  ReportStatus: string;
  Hash: string;
  Verified: boolean;
}
