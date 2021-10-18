import { join } from "path/win32";
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

import RoomReportEntity from "./entities/RoomReportEntity";

const {DB_USER, DB_PASSWORD, DB_SERVER, DB_DATABASE} = process.env;
console.log(DB_USER, DB_PASSWORD, DB_SERVER, DB_DATABASE);

const sequelize = new Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
  host: DB_SERVER,
  dialect: 'mariadb'
});

class RoomReport extends Model<RoomReportEntity>
    implements RoomReportEntity{
        public Id!: Number;
        public RoomId!: Number;
        public AssignedAdminId!: Number;
        public ReportDescription!: string;
        public Email!: string;
        public ReportDateTime!: Date;
        public ReportStatus!: string;
    }

RoomReport.init(
    {
        Id:
        {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
        },
        RoomId:
        {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        AssignedAdminId:
        {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        ReportDescription:
        {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Email:
        {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ReportDateTime:
        {
            type: DataTypes.DATE,
            allowNull: false,
        },
        ReportStatus:
        {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        tableName: "RoomReport",
        sequelize,
    }
);

export async function getRoomReports(roomNumber: string) :Promise<RoomReportEntity[]> {
    const roomReports = await RoomReport.findAll({where: {}})
    console.log(roomReports);
    return roomReports;
}