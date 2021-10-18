import RoomEntity from "./entities/RoomEntity";
import RoomReportEntity from "./entities/RoomReportEntity";
import {getRooms} from "./RoomConnection";
import {getRoomReports} from "./RoomReportConnection";

async function getRoomInfoByRoomNumber(roomNumber: string):Promise<RoomEntity[]> {
    const data: RoomEntity[] = await getRooms(roomNumber);
    console.log(data);
    return data;
};
async function getRoomReportByRoomNumber(roomNumber: string):Promise<RoomReportEntity[]> {
    const data: RoomReportEntity[] = await getRoomReports(roomNumber);
    console.log(data);
    return data;
}