export class RoomReport
  extends Model<RoomReportEntity>
  implements RoomReportEntity
{
  public Id?: number;
  public RoomId!: number;
  public AssignedAdminId!: number;
  public RoomNumber!: string;
  public ReportDescription!: string;
  public Email!: string;
  public ReportDateTime!: Date;
  public ReportStatus!: string;
  public Hash!: string;
  public Verified!: boolean;
}
