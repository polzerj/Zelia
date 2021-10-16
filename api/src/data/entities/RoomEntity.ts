export default interface RoomEntity
{
    Id: Number;
    AdminUserId: Number;
    RoomNumber: string;
    LongName: string;
    IsWheelchairAccessable: boolean;
    HasABeamer: boolean;
    HasWater: boolean;
    HasTeacherComputer: boolean;
    NumberOfComputers: Number;
    Seatplaces: Number;
}
