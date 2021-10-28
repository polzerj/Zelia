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

export class Room extends Model<RoomEntity> implements RoomEntity {
  public Id!: number;
  public AdminUserId!: number;
  public RoomNumber!: string;
  public LongName!: string;
  public IsWheelchairAccessable!: boolean;
  public HasABeamer!: boolean;
  public HasWater!: boolean;
  public HasTeacherComputer!: boolean;
  public HasProjector!: boolean;
  public ProjectorConnectors!: string;
  public Boards!: string;
  public NumberOfComputers!: number;
  public Seatplaces!: number;
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
    IsWheelchairAccessable: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    HasABeamer: {
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
    HasProjector: {
      type: DataTypes.BOOLEAN,
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
    Seatplaces: {
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
