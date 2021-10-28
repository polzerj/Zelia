class RoomNotFoundException extends Error {
  constructor() {
    super("Room not found");
  }
}
