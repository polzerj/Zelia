import { Model, DataTypes } from "sequelize";

import RoomReportEntity from "./entities/RoomReportEntity";
import { Room } from "./RoomConnection";

import sequelize from "./DatabaseConnectionHandler";
import Report from "types/Report";
import { getRoomInfoByRoomNumber } from "./DatabaseService";

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
        RoomNumber: {
            type: DataTypes.STRING,
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

export async function getRoomReport(roomNumber: string): Promise<RoomReport[]> {
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

export async function setRoomReport(roomReport: Report) {
    let roomId = (await getRoomInfoByRoomNumber(roomReport.roomNumber))[0].Id;
    //Create Room if not existing
    RoomReport.create({
        RoomId: roomId,
        AssignedAdminId: 1,
        RoomNumber: roomReport.roomNumber,
        ReportDescription: roomReport.information,
        Email: roomReport.user,
        ReportDateTime: new Date(Date.now()),
        ReportStatus: "open",
        Hash: roomReport.hash,
        Verified: false,
    });
}

export async function getRoomReports(): Promise<RoomReport[]> {
    const roomReports = await RoomReport.findAll({
        attributes: {
            exclude: [
                "RoomId",
                "AssignedAdminId",
                "ReportStatus",
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
    return roomReports;
}

export async function alterRoomReportVerified(id: number) {
    await RoomReport.update({ Verified: true }, { where: { Id: id } });
}

export async function alterRoomReportStatus(
    id: number,
    toChangeStatus: string
) {
    await RoomReport.update(
        { ReportStatus: toChangeStatus },
        { where: { Id: id } }
    );
}
