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

import TestEntity from "./entities/TestEntity"

const {DB_USER, DB_PASSWORD, DB_SERVER, DB_DATABASE} = process.env;
console.log(DB_USER, DB_PASSWORD, DB_SERVER, DB_DATABASE);

const sequelize = new Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
  host: DB_SERVER,
  dialect: 'mariadb'
});

class User extends Model<TestEntity>
  implements TestEntity {
  public id!: number; // Note that the `null ssertion` `!` is required in strict mode.
  public name!: string;
}

User.init(
  {
    id:{
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      allowNull: false,
    },
    name:{
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
  },
  {
    tableName: "testtable",
    sequelize,
  }
);

async function doStuffWithUserModel() {
  const newUser = await User.create(
    {
      id: 2,
      name: "Johannes",
    });
  console.log(newUser.id, newUser.name);

  const foundUser = await User.findOne({where: {name: "Richard"}});
  if(foundUser == null) return;
  console.log(foundUser.name);
}
doStuffWithUserModel();
