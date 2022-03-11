export async function getAllRoomReports(): Promise<RoomReportEntity[]> {
  let data: RoomReport[];
  try {
    data = await getRoomReports();
  } catch (e) {
    throw new DatabaseNotAvailableException();
  }
  if (data.length === 0) {
    throw new NoRoomReportsFoundException();
  }
  return data;
}
