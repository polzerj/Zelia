export async function getRoomReports(): Promise<RoomReport[]> {
  const roomReports = await RoomReport.findAll({
    attributes: {
      exclude: [
        "RoomId",
        "AssignedAdminId",
        "ReportStatus",
        "Hash",
        "Verified",
        "createdAt",
        "updatedAt",
      ],
    },
    include: [
      {
        model: Room,
        required: true,
      },
    ],
  });
  return roomReports;
}
