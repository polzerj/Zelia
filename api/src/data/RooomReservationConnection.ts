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

const {DB_USER, DB_PASSWORD, DB_SERVER, DB_DATABASE} = process.env;
console.log(DB_USER, DB_PASSWORD, DB_SERVER, DB_DATABASE);

const sequelize = new Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
  host: DB_SERVER,
  dialect: 'mariadb'
});

class RoomReservation extends Model<RoomReservationEntity>
    implements RoomReservationEntity{
        public Id!: Number;
        public RoomId!: Number;
        public AssignedAdminId!: Number;
        public ReservationReason!: string;
        public Email!: string;
        public StartReservation!: Date;
        public EndReservation!: Date;
        public ReservationStatus!: string;
    };

RoomReservation.init(
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
        ReservationReason:
        {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Email:
        {
            type: DataTypes.STRING,
            allowNull: false,
        },
        StartReservation:
        {
            type: DataTypes.DATE,
            allowNull: false,    
        },
        EndReservation:
        {
            type: DataTypes.DATE,
            allowNull: false,
        },
        ReservationStatus:
        {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        tableName: "RoomReservation",
        sequelize,
    }
);

export async function getRoomReservations(roomNumber: string) :Promise<RoomReservationEntity[]> {
    const roomReservation = await RoomReservation.findAll({where: {}})  //To implement
    console.log(roomReservation);
    return roomReservation;
}