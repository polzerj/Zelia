export default interface RoomEntity
{
    Id: number;
    AdminUserId: number;
    RoomNumber: string;
    LongName: string;
    IsWheelchairAccessable: boolean;
    HasABeamer: boolean;
    HasWater: boolean;
    HasTeacherComputer: boolean;
    NumberOfComputers: number;
    Seatplaces: number;
}
