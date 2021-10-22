import RoomEntity from "data/entities/RoomEntity";
import RoomInfoModel from "models/RoomInfoModel";

export function roomEntitiesToRoomInfoModels(
    entities: RoomEntity[]): 
    RoomInfoModel[] {
    const model: RoomInfoModel[] = entities.map(roomEntityToRoomInfoModel);
    return model;
}

export function roomEntityToRoomInfoModel(entity: RoomEntity): RoomInfoModel {
    const model: RoomInfoModel = {
        roomNumber: entity.RoomNumber,
        name: entity.LongName,
        description: "Classroom of 5A/BHITN",
        type: "Class",
        isWheelchairAccessible: entity.IsWheelchairAccessable,
        hasTeacherComputer: entity.HasTeacherComputer,
        projector: entity.HasABeamer ? "Normal" : "None",
        projectorConnectors: ["HDMI", "USB"],
        hasWater: entity.HasWater,
        boards: ["smart", "white", "pin"],
        numberOfComputers: entity.NumberOfComputers,
        numberOfSeats: entity.Seatplaces,
    };
    return model;
}
