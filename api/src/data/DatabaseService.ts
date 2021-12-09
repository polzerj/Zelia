import RoomEntity from "./entities/RoomEntity";
import RoomReportEntity from "./entities/RoomReportEntity";
import RoomReservationEntity from "./entities/RoomReservationEntity";
import LessonEntity from "./entities/LessonEntity";
import AdminUserEntity from "./entities/AdminUserEntity";
import Booking from "../types/Booking";

import { getRooms, Room } from "./RoomConnection";
import { getRoomReports, setRoomReport, RoomReport } from "./RoomReportConnection";
import {
  getRoomReservations,
  setRoomReservation,
  RoomReservation,
} from "./RoomReservationConnection";
import { getLessons, Lesson } from "./LessonConnection";
import { getAdminUser, AdminUser } from "./AdminUserConnection";
import { RoomNotFoundException } from "./Exceptions/RoomNotFoundException";
import { DatabaseNotAvailableException } from "./Exceptions/DatabaseNotAvailableException";
import { NoAdminUsersFoundException } from "./Exceptions/NoAdminUsersFoundException";
import { CouldNotInsertDataException } from "./Exceptions/CouldNotInsertDataException";
import Report from "types/Report";

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

export async function getAdminUserByNameAndPw(
  userName: string,
  hash: string
): Promise<AdminUserEntity> {
  let data: AdminUser;
  try {
    data = await getAdminUser(userName, hash);
  } catch (e) {
    throw new DatabaseNotAvailableException();
  }
  if (data === null) {
    throw new NoAdminUsersFoundException();
  }
  return data;
}

export async function setRoomReservationByDate(booking: Booking) {
  try {
    setRoomReservation(booking);
  } catch (e) {
    throw new CouldNotInsertDataException();
  }
}

export async function setRoomReportDbService(roomReport: Report) {
  try {
    setRoomReport(roomReport);
  } catch (e) {
    throw new CouldNotInsertDataException();
  }
}
