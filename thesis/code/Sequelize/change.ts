export async function alterRoomReportStatus(
  id: number,
  toChangeStatus: string
) {
  await RoomReport.update(
    { ReportStatus: toChangeStatus },
    { where: { Id: id } }
  );
}
