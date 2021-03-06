import { Model, DataTypes } from "sequelize";

import RoomReservationEntity from "./entities/RoomReservationEntity";
import { Room } from "./RoomConnection";

import sequelize from "./DatabaseConnectionHandler";
import Booking from "types/Booking";
import { getRoomInfoByRoomNumber } from "./DatabaseService";
import RoomBooking from "controllers/RoomBooking";

export class RoomReservation extends Model<RoomReservationEntity> implements RoomReservationEntity {
  public Id?: number;
  public RoomId!: number;
  public AssignedAdminId!: number;
  public RoomNumber!: string;
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
    RoomNumber: {
      type: DataTypes.STRING,
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

export async function getRoomReservation(roomNumber: string): Promise<RoomReservation[]> {
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

export async function setRoomReservation(roomBooking: Booking) {
  let roomId = (await getRoomInfoByRoomNumber(roomBooking.roomNumber))[0].Id;
  RoomReservation.create({
    RoomId: roomId,
    AssignedAdminId: 1,
    RoomNumber: roomBooking.roomNumber,
    ReservationReason: roomBooking.purpose,
    Email: roomBooking.user,
    // TODO: Not going to work :)
    StartReservation: new Date(roomBooking.from),
    EndReservation: new Date(roomBooking.until),
    ReservationStatus: "open",
    Hash: roomBooking.hash,
    Verified: false,
  });
}

export async function getRoomReservations(): Promise<RoomReservation[]> {
  const roomReservations = await RoomReservation.findAll({
    attributes: {
      exclude: [
        "RoomId",
        "AssignedAdminId",
        "ReservationStatus",
        "Hash",
        "Verified",
        "createdAt",
        "updatedAt",
      ],
    },
    include: [
      {
        model: Room,
        required: true,
      },
    ],
  });
  return roomReservations;
}

export async function alterRoomReservationVerified(id: number) {
  RoomReservation.update({ Verified: true }, { where: { Id: id } });
}

export async function alterRoomReservationConfirm(id: number) {
  RoomReservation.update({ ReservationStatus: "confirmed" }, { where: { Id: id } });
}

export async function alterRoomReservationDecline(id: number) {
  RoomReservation.update({ ReservationStatus: "decline" }, { where: { Id: id } });
}
