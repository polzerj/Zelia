export default interface RoomEntity {
  Id: number;
  AdminUserId: number;
  RoomNumber: string;
  LongName: string;
  IsWheelchairAccessable: boolean;
  HasWater: boolean;
  HasTeacherComputer: boolean;
  Projector: string;
  ProjectorConnectors: string;
  Boards: string;
  NumberOfComputers: number;
  Seatplaces: number;
}
