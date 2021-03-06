import { ProjectorType } from "data/typesOfARoom/ProjectorType";
import { RoomType } from "data/typesOfARoom/RoomType";

export default interface RoomEntity {
  Id: number;
  AdminUserId: number;
  RoomNumber: string;
  LongName: string;
  RoomDescription: string;
  RoomType: RoomType;
  IsWheelchairAccessable: boolean;
  HasWater: boolean;
  HasTeacherComputer: boolean;
  Projector: ProjectorType;
  ProjectorConnectors: string;
  Boards: string;
  NumberOfComputers: number;
  NumberOfSeats: number;
}
