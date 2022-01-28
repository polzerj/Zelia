export async function setRoomReport(roomReport: Report) {
  let roomId = (await getRoomInfoByRoomNumber(roomReport.roomNumber))[0].Id;
  //Create Room if not existing
  RoomReport.create({
    RoomId: roomId,
    AssignedAdminId: 1,
    RoomNumber: roomReport.roomNumber,
    ReportDescription: roomReport.information,
    Email: roomReport.user,
    ReportDateTime: new Date(roomReport.firstDetected),
    ReportStatus: "open",
    Hash: roomReport.hash,
    Verified: false,
  });
}
