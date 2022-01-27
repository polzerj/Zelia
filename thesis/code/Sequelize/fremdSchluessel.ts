Room.hasMany(RoomReport);
RoomReport.belongsTo(Room, { foreignKey: "RoomId" });
