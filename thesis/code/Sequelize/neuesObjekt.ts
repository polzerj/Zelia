sequelize = new Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
  host: DB_SERVER,
  dialect: "mariadb",
});
