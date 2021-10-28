import RoomEntity from "./entities/RoomEntity";
import RoomReportEntity from "./entities/RoomReportEntity";
import RoomReservationEntity from "./entities/RoomReservationEntity";
import LessonEntity from "./entities/LessonEntity";
import AdminUserEntity from "./entities/AdminUserEntity";

import { getRooms } from "./RoomConnection";
import { getRoomReports } from "./RoomReportConnection";
import { getRoomReservations } from "./RooomReservationConnection";
import { getLessons } from "./LessonConnection";
import { getAdminUser } from "./AdminUserConnection";

export async function getRoomInfoByRoomNumber(
    roomNumber: string
): Promise<RoomEntity[]> {
    const data: RoomEntity[] = await getRooms(roomNumber);
    return data;
}

export async function getRoomReportByRoomNumber(
    roomNumber: string
): Promise<RoomReportEntity[]> {
    const data = await getRoomReports(roomNumber);
    return data;
}

export async function getRoomReservationByRoomNumber(
    roomNumber: string
): Promise<RoomReservationEntity[]> {
    const data = await getRoomReservations(roomNumber);
    return data;
}

export async function getLessonByRoomNumber(
    roomNumber: string
): Promise<LessonEntity[]> {
    const data = await getLessons(roomNumber);
    return data;
}

export async function getAdminUsers(): Promise<AdminUserEntity[]> {
    const data = await getAdminUser();
    return data;
}
