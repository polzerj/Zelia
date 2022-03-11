export async function alterRoomReportVerifiedById(id: number) {
  try {
    alterRoomReportVerified(id);
  } catch (e) {
    throw new CouldNotAlterDataException();
  }
}
