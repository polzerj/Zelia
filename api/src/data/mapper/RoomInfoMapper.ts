import RoomEntity from "data/entities/RoomEntity";
import RoomInfoModel from "models/RoomInfoModel";

export function roomEntitiesToRoomInfoModels(entities: RoomEntity[]): RoomInfoModel[] {
  const model: RoomInfoModel[] = entities.map(roomEntityToRoomInfoModel);
  return model;
}

export function roomEntityToRoomInfoModel(entity: RoomEntity): RoomInfoModel {
  const model: RoomInfoModel = {
    roomNumber: entity.RoomNumber,
    name: entity.LongName,
    description: entity.RoomDescription,
    type: entity.RoomType,
    isWheelchairAccessible: entity.IsWheelchairAccessable,
    hasTeacherComputer: entity.HasTeacherComputer,
    projector: entity.Projector,
    projectorConnectors: entity.ProjectorConnectors.split(",") as (
      | "VGA"
      | "HDMI"
      | "DVI"
      | "USB"
      | "Display Port"
      | "NEC Multipresenter"
    )[],
    hasWater: entity.HasWater,
    boards: entity.Boards.split(",") as ("black" | "white" | "smart" | "pin")[],
    numberOfComputers: entity.NumberOfComputers,
    numberOfSeats: entity.NumberOfSeats,
  };
  return model;
}
