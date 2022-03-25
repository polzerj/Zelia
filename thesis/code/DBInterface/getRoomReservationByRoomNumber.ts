export async function getRoomReservationByRoomNumber(
    roomNumber: string
  ): Promise<RoomReservationEntity[]> {
    let data: RoomReservation[];
    try {
      data = await getRoomReservation(roomNumber);
    } catch (e) {
      throw new DatabaseNotAvailableException();
    }
    if (data.length === 0) {
      throw new RoomNotFoundException();
    }
    return data;
  }