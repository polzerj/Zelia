export default interface RoomReservationEntity {
  Id?: number;
  RoomId: number;
  AssignedAdminId: number;
  ReservationReason: string;
  Email: string;
  StartReservation: Date;
  EndReservation: Date;
  ReservationStatus: string;
  Hash: string;
  Verified: boolean;
}
