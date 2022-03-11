export async function setRoomReportDbService(roomReport: Report) {
  try {
    setRoomReport(roomReport);
  } catch (e) {
    throw new CouldNotInsertDataException();
  }
}
