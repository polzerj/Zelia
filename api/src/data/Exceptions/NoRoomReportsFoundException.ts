export class NoRoomReportsFoundException extends Error {
  constructor() {
    super("No RoomReports found.");
  }
}
