export async function alterRoomReservationConfirmById(id: number) {
    try {
      alterRoomReservationConfirm(id);
    } catch (e) {
      throw new CouldNotAlterDataException();
    }
  }