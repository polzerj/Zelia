//#region "Imports"
import RoomEntity from "./entities/RoomEntity";
import RoomReportEntity from "./entities/RoomReportEntity";
import RoomReservationEntity from "./entities/RoomReservationEntity";
import LessonEntity from "./entities/LessonEntity";
import AdminUserEntity from "./entities/AdminUserEntity";
import Booking from "../types/Booking";

import { getRooms, Room } from "./RoomConnection";
import {
  getRoomReport,
  getRoomReports,
  setRoomReport,
  alterRoomReportVerified,
  RoomReport,
} from "./RoomReportConnection";
import {
  getRoomReservation,
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
import { NoRoomReservationsFoundException } from "./Exceptions/NoRoomReservationsFoundException";
import { NoRoomReportsFoundException } from "./Exceptions/NoRoomReportsFoundException";
import { CouldNotAlterDataException } from "./Exceptions/CouldNotAlterDataException";
//#endregion

//#region "RoomInfo"
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
//#endregion

//#region "RoomReport"
export async function getRoomReportByRoomNumber(roomNumber: string): Promise<RoomReportEntity[]> {
  let data: RoomReport[];
  try {
    data = await getRoomReport(roomNumber);
  } catch (e) {
    throw new DatabaseNotAvailableException();
  }
  if (data.length === 0) {
    throw new RoomNotFoundException();
  }
  return data;
}

export async function getAllRoomReports(): Promise<RoomReportEntity[]> {
  let data: RoomReport[];
  try {
    data = await getRoomReports();
  } catch (e) {
    throw new DatabaseNotAvailableException();
  }
  if (data.length === 0) {
    throw new NoRoomReportsFoundException();
  }
  return data;
}

export async function setRoomReportDbService(roomReport: Report) {
  try {
    setRoomReport(roomReport);
  } catch (e) {
    throw new CouldNotInsertDataException();
  }
}

export async function alterRommReportVerifiedById(id: number) {
  try {
    alterRoomReportVerified(id);
  } catch (e) {
    throw new CouldNotAlterDataException();
  }
}
//#endregion

//#region "RoomReservation"
export async function getRoomReservationByRoomNumber(
  roomNumber: string
): Promise<RoomReservationEntity[]> {
  let data: RoomReservation[];
  try {
    data = await getRoomReservation(roomNumber);
  } catch (e) {
    throw new DatabaseNotAvailableException();
  }
  if (data.length === 0) {
    throw new RoomNotFoundException();
  }
  return data;
}

export async function getAllRoomReservations(): Promise<RoomReservationEntity[]> {
  let data: RoomReservation[];
  try {
    data = await getRoomReservations();
  } catch (e) {
    throw new DatabaseNotAvailableException();
  }
  if (data.length === 0) {
    throw new NoRoomReservationsFoundException();
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
//#endregion

//#region "Lesson"
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
//#endregion

//#region "AdminUser"
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
  console.log(data);

  if (data === null) {
    throw new NoAdminUsersFoundException();
  }
  return data;
}
//#endregion

//(async () => {
//console.log(await getAllRoomReports());
//alterRommReportVerifiedById(1);
//})();
