export default interface RoomReservationEntity
{
    Id: Number;
    RoomId: Number;
    AssignedAdminId: Number;
    ReservationReason: string;
    Email: string;
    StartReservation: Date;
    EndReservation: Date;
    ReservationStatus: string;
}
