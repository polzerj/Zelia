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

import RoomReservationEntity from "./entities/RoomReservationEntity";
import { Room } from "./RoomConnection";

import sequelize from "./DatabaseConnectionHandler";

export class RoomReservation extends Model<RoomReservationEntity> implements RoomReservationEntity {
  public Id!: number;
  public RoomId!: number;
  public AssignedAdminId!: number;
  public ReservationReason!: string;
  public Email!: string;
  public StartReservation!: Date;
  public EndReservation!: Date;
  public ReservationStatus!: string;
  public Hash!: string;
  public Verified!: boolean;
}

RoomReservation.init(
  {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    RoomId: {
      type: DataTypes.INTEGER,
      references: {
        model: Room,
        key: "RoomId",
      },
    },
    AssignedAdminId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ReservationReason: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    StartReservation: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    EndReservation: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    ReservationStatus: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Hash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    tableName: "RoomReservation",
    sequelize,
  }
);

Room.hasMany(RoomReservation);
RoomReservation.belongsTo(Room, { foreignKey: "RoomId" });

export async function getRoomReservations(roomNumber: string): Promise<RoomReservation[]> {
  const roomReservation = await RoomReservation.findAll({
    include: [
      {
        model: Room,
        required: true,
        where: { RoomNumber: roomNumber },
      },
    ],
  });
  return roomReservation;
}
