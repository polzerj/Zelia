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
  and,
} from "sequelize";

import AdminUserEntity from "./entities/AdminUserEntity";

import sequelize from "./DatabaseConnectionHandler";

export class AdminUser extends Model<AdminUserEntity> implements AdminUserEntity {
  public Id!: number;
  public UserName!: string;
  public UserPassword!: string;
}

AdminUser.init(
  {
    Id: {
      type: DataTypes.NUMBER,
      primaryKey: true,
      allowNull: false,
    },
    UserName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    UserPassword: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "AdminUser",
    sequelize,
  }
);

export async function getAdminUser(userName: string, hash: string): Promise<AdminUser> {
  const adminUser = await AdminUser.findOne({
    attributes: { exclude: ["UserPassword", "createdAt", "updatedAt"] },
    where: { UserName: userName, UserPassword: hash },
  });
  return adminUser;
}
