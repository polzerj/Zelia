export async function setRoomReservationByDate(booking: Booking) {
    try {
      setRoomReservation(booking);
    } catch (e) {
      throw new CouldNotInsertDataException();
    }
  }

  