RoomReport.init(
  {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    RoomId: {
      type: DataTypes.INTEGER,
      references: {
        model: Room,
        key: "RoomId",
      },
    },
    AssignedAdminId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    RoomNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ReportDescription: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ReportDateTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    ReportStatus: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Hash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    tableName: "RoomReport",
    sequelize,
  }
);
