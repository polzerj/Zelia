export async function getAllRoomReservations(): Promise<RoomReservationEntity[]> {
    let data: RoomReservation[];
    try {
      data = await getRoomReservations();
    } catch (e) {
      throw new DatabaseNotAvailableException();
    }
    if (data.length === 0) {
      throw new NoRoomReservationsFoundException();
    }
    return data;
  }