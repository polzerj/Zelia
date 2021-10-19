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

import AdminUserEntity from "./entities/AdminUserEntity";

const {DB_USER, DB_PASSWORD, DB_SERVER, DB_DATABASE} = process.env;
console.log(DB_USER, DB_PASSWORD, DB_SERVER, DB_DATABASE);

const sequelize = new Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
  host: DB_SERVER,
  dialect: 'mariadb'
});

class AdminUser extends Model<AdminUserEntity>
    implements AdminUserEntity{
        public Id!: Number;
        public UserName!: string;
        public UserPassword!: string;
    };

AdminUser.init(
    {
        Id:
        {
            type: DataTypes.NUMBER,
            autoIncrement: true,
            allowNull: false,
        },
        UserName:
        {
            type: DataTypes.STRING,
            allowNull: false,
        },
        UserPassword:
        {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        tableName: "AdminUser",
        sequelize,
    }
);

export async function getAdminUser() :Promise<AdminUserEntity[]> {
    const adminUser = await AdminUser.findAll()  //To implement
    console.log(adminUser);
    return adminUser;
}