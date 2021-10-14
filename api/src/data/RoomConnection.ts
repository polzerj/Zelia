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

const {DB_USER, DB_PASSWORD, DB_SERVER, DB_DATABASE} = process.env;
console.log(DB_USER, DB_PASSWORD, DB_SERVER, DB_DATABASE);

const sequelize = new Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
  host: DB_SERVER,
  dialect: 'mariadb'
});

class Room extends Model<RoomEntity>
  implements RoomEntity {
    public Id!: Number;
    public RoomNumber!: string;
    public LongName!: string;
    public Wheelchair!: boolean;
    public Beamer!: boolean;
    public Water!: boolean;
    public Computer!: boolean; 
}

Room.init(
  {
    Id:
    {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
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
    Wheelchair:
    {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    Beamer:
    {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    Water:
    {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    Computer:
    {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    }
  },
  {
    tableName: "Room",
    sequelize,
  }
);

async function GetRooms() {
  const rooms = await Room.findAll();
  return rooms;
  console.log(rooms);
}