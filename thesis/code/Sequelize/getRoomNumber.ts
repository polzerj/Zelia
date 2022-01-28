export async function getRoomReport(roomNumber: string): Promise<RoomReport[]> {
  const roomReport = await RoomReport.findAll({
    include: [
      {
        model: Room,
        required: true,
        where: { RoomNumber: roomNumber },
      },
    ],
  });
  return roomReport;
}
