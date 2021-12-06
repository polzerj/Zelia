import RoomEntity from "./entities/RoomEntity";
import RoomReportEntity from "./entities/RoomReportEntity";
import RoomReservationEntity from "./entities/RoomReservationEntity";
import LessonEntity from "./entities/LessonEntity";
import AdminUserEntity from "./entities/AdminUserEntity";

import { getRooms, Room } from "./RoomConnection";
import { getRoomReports, RoomReport } from "./RoomReportConnection";
import { getRoomReservations, RoomReservation } from "./RooomReservationConnection";
import { getLessons, Lesson } from "./LessonConnection";
import { getAdminUser, AdminUser } from "./AdminUserConnection";
import { RoomNotFoundException } from "./Exceptions/RoomNotFoundException";
import { DatabaseNotAvailableException } from "./Exceptions/DatabaseNotAvailableException";
import { NoAdminUsersFoundException } from "./Exceptions/NoAdminUsersFoundException";
import { CouldNotInsertDataException } from "./Exceptions/CouldNotInsertDataException";

export async function getRoomInfoByRoomNumber(roomNumber: string): Promise<RoomEntity[]> {
  let data: Room[];
  try {
    data = await getRooms(roomNumber);
  } catch (e) {
    throw new DatabaseNotAvailableException();
  }
  if (data.length === 0) {
    throw new RoomNotFoundException();
  }
  return data;
}

export async function getRoomReportByRoomNumber(roomNumber: string): Promise<RoomReportEntity[]> {
  let data: RoomReport[];
  try {
    data = await getRoomReports(roomNumber);
  } catch (e) {
    throw new DatabaseNotAvailableException();
  }
  if (data.length === 0) {
    throw new RoomNotFoundException();
  }
  return data;
}

export async function getRoomReservationByRoomNumber(
  roomNumber: string
): Promise<RoomReservationEntity[]> {
  let data: RoomReservation[];
  try {
    data = await getRoomReservations(roomNumber);
  } catch (e) {
    throw new DatabaseNotAvailableException();
  }
  if (data.length === 0) {
    throw new RoomNotFoundException();
  }
  return data;
}

export async function getLessonByRoomNumber(roomNumber: string): Promise<LessonEntity[]> {
  let data: Lesson[];
  try {
    data = await getLessons(roomNumber);
  } catch (e) {
    throw new DatabaseNotAvailableException();
  }
  if (data.length === 0) {
    throw new RoomNotFoundException();
  }
  return data;
}

export async function getAdminUsers(): Promise<AdminUserEntity[]> {
  let data: AdminUser[];
  try {
    data = await getAdminUser();
  } catch (e) {
    throw new DatabaseNotAvailableException();
  }
  if (data.length === 0) {
    throw new NoAdminUsersFoundException();
  }
  return data;
}

export async function setRoomReportDbService(roomReport: RoomReport) {
  try {
  } catch (e) {
    throw new CouldNotInsertDataException();
  }
}
