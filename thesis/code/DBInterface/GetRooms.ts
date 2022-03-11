export async function getRoomInfoByRoomNumber(
  roomNumber: string
): Promise<RoomEntity[]> {
  let data: Room[];
  try {
    data = await getRooms(roomNumber);
  } catch (e) {
    throw new DatabaseNotAvailableException();
  }
  if (data.length === 0) {
    throw new RoomNotFoundException();
  }
  return data;
}
