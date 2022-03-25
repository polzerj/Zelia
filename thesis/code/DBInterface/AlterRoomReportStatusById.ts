export async function alterRoomReportStatusById(id: number, toChangeStatus: string) {
    try {
      alterRoomReportStatus(id, toChangeStatus);
    } catch (e) {
      throw new CouldNotAlterDataException();
    }
  }