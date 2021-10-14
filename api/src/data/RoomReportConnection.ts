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
        public Description!: string;
        public Email!: string;
        public ReportDateTime!: Date;
        public Status!: string;
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
        Description:
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
        Status:
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

async function GetRoomReports() {
    const roomReports = RoomReport.findAll();
    return roomReports;
    console.log(roomReports);
}