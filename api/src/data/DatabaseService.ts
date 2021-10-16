import RoomEntity from "./entities/RoomEntity";
import RoomReportEntity from "./entities/RoomReportEntity";

async function getRoomInfoByRoomNumber(roomNumber: string):Promise<RoomEntity[]> {
    const data: RoomEntity[] = [{Id:1, RoomNumber:'2223', LongName: '2AHITN',HasABeamer:true, HasTeacherComputer:true, HasWater:true, IsWheelchairAccessable:true, NumberOfComputers:3, Seatplaces: 15, AdminUserId:3}]
    return await Promise.resolve(data);
}

//async function getRoomReportByRoomNumber(roomNumber: string):Promise<RoomReportEntity[]> {
//    const data: RoomReportEntity[] = [{Id:1, }]
//}