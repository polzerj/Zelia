export async function alterRoomReservationDeclineById(id: number) {
    try {
      alterRoomReservationDecline(id);
    } catch (e) {
      throw new CouldNotAlterDataException();
    }
  }