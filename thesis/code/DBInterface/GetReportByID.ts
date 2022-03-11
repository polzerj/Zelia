export async function getRoomReportByRoomNumber(
  roomNumber: string
): Promise<RoomReportEntity[]> {
  let data: RoomReport[];
  try {
    data = await getRoomReport(roomNumber);
  } catch (e) {
    throw new DatabaseNotAvailableException();
  }
  if (data.length === 0) {
    throw new RoomNotFoundException();
  }
  return data;
}
