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
  where,
} from "sequelize";

import RoomReportEntity from "./entities/RoomReportEntity";
import { Room } from "./RoomConnection";

import sequelize from "./DatabaseConnectionHandler";

export class RoomReport extends Model<RoomReportEntity> implements RoomReportEntity {
  public Id?: number;
  public RoomId!: number;
  public AssignedAdminId!: number;
  public ReportDescription!: string;
  public Email!: string;
  public ReportDateTime!: Date;
  public ReportStatus!: string;
  public Hash!: string;
  public Verified!: boolean;
}

RoomReport.init(
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
    ReportDescription: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ReportDateTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    ReportStatus: {
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
    tableName: "RoomReport",
    sequelize,
  }
);

Room.hasMany(RoomReport);
RoomReport.belongsTo(Room, { foreignKey: "RoomId" });

export async function getRoomReports(roomNumber: string): Promise<RoomReport[]> {
  const roomReport = await RoomReport.findAll({
    include: [
      {
        model: Room,
        required: true,
        where: { RoomNumber: roomNumber },
      },
    ],
  });
  return roomReport;
  //return (roomReport as any[]).map(e=>e.dataValue) as RoomReport[];
}

export async function setRoomReport(roomReport: RoomReport) {
  RoomReport.create({
    RoomId: 1,
    AssignedAdminId: roomReport.AssignedAdminId,
    ReportDescription: roomReport.ReportDescription,
    Email: roomReport.Email,
    ReportDateTime: roomReport.ReportDateTime,
    ReportStatus: roomReport.ReportStatus,
    Hash: roomReport.Hash,
    Verified: roomReport.Verified,
  });
}
