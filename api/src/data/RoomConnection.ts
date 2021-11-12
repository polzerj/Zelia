import {
  Sequelize,
  Model,
  ModelDefined,
  DataTypes,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyHasAssociationMixin,
  Association,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  Optional,
} from "sequelize";

import RoomEntity from "./entities/RoomEntity";
import sequelize from "./DatabaseConnectionHandler";
import { ProjectorType } from "./typesOfARoom/ProjectorType";
import { ProjectorConnectorsTypes } from "./typesOfARoom/ProjectorConnectorsTypes";
import { BoardTypes } from "./typesOfARoom/BoardType";
import { RoomType } from "./typesOfARoom/RoomType";

export class Room extends Model<RoomEntity> implements RoomEntity {
  public Id!: number;
  public AdminUserId!: number;
  public RoomNumber!: string;
  public LongName!: string;
  public RoomDescription!: string;
  public RoomType!: RoomType;
  public IsWheelchairAccessable!: boolean;
  public HasWater!: boolean;
  public HasTeacherComputer!: boolean;
  public Projector!: ProjectorType;
  public ProjectorConnectors!: string;
  public Boards!: string;
  public NumberOfComputers!: number;
  public NumberOfSeats!: number;
}

Room.init(
  {
    Id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      allowNull: false,
    },
    AdminUserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    RoomNumber: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    LongName: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    RoomDescription: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    RoomType: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    IsWheelchairAccessable: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    HasWater: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    HasTeacherComputer: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    Projector: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ProjectorConnectors: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Boards: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    NumberOfComputers: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    NumberOfSeats: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "Room",
    sequelize,
  }
);

export async function getRooms(roomNumber: string): Promise<Room[]> {
  const room = await Room.findAll({ where: { RoomNumber: roomNumber } });
  return room;
}
