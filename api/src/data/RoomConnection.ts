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
//import {RoomReport} from "./RoomReportConnection";

const {DB_USER, DB_PASSWORD, DB_SERVER, DB_DATABASE} = process.env;
console.log(DB_USER, DB_PASSWORD, DB_SERVER, DB_DATABASE);

const sequelize = new Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
  host: DB_SERVER,
  dialect: 'mariadb'
});

export class Room extends Model<RoomEntity>
  implements RoomEntity {
    public Id!: Number;
    public AdminUserId!: Number;
    public RoomNumber!: string;
    public LongName!: string;
    public IsWheelchairAccessable!: boolean;
    public HasABeamer!: boolean;
    public HasWater!: boolean;
    public HasTeacherComputer!: boolean;
    public NumberOfComputers!: Number;
    public Seatplaces!: Number;
}

Room.init(
  {
    Id:
    {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      allowNull: false,
    },
    AdminUserId:
    {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    RoomNumber:
    {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    LongName:
    {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    IsWheelchairAccessable:
    {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    HasABeamer:
    {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    HasWater:
    {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    HasTeacherComputer:
    {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    NumberOfComputers:
    {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Seatplaces:
    {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  },
  {
    tableName: "Room",
    sequelize,
  }
);

export async function getRooms(roomNumber: string) :Promise<Room[]> {
  const room = await Room.findAll({where: {RoomNumber: roomNumber}});
  return room;
};