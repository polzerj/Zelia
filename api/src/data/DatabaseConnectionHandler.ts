import { Sequelize } from "sequelize";

const {DB_USER, DB_PASSWORD, DB_SERVER, DB_DATABASE} = process.env;

export default new Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
  host: DB_SERVER,
  dialect: 'mariadb'
});
