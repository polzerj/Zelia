export class NoRoomReservationsFoundException extends Error {
  constructor() {
    super("No RoomReservations found");
  }
}
