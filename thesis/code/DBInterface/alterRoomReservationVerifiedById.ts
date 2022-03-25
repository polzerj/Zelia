export async function alterRoomReservationVerifiedById(id: number) {
    try {
      alterRoomReservationVerified(id);
    } catch (e) {
      throw new CouldNotAlterDataException();
    }
  }