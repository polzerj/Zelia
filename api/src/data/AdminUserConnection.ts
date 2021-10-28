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

export async function getAdminUser(): Promise<AdminUser[]> {
  const adminUser = await AdminUser.findAll();
  return adminUser;
}
