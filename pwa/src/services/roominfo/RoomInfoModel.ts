export default interface RoomInfoModel {
    roomNumber: string;
    name: string;
    description: string;
    type:
        | "EDV"
        | "Class"
        | "Toilet"
        | "Teacher"
        | "Lab"
        | "Workshop"
        | "Wardrobe"
        | "Custody Room"
        | "Cleaning Chamber"
        | "Other";
    isWheelchairAccessible: boolean;
    hasTeacherComputer: boolean;
    projector: "None" | "Normal" | "Smart";
    projectorConnectors: (
        | "VGA"
        | "HDMI"
        | "DVI"
        | "USB"
        | "Display Port"
        | "NEC Multipresenter"
    )[];
    hasWater: boolean;
    boards: ("black" | "white" | "smart" | "pin")[];
    numberOfComputers: number;
    numberOfSeats: number;
}
