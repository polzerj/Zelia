import RoomInfoModel from "models/RoomInfoModel";
import { Request, Response, ControllerBase } from "../types";

export default class RoomInfo extends ControllerBase {
    constructor() {
        super("/room/:roomNumber");
    }

    get(req: Request, res: Response) {
        let roomInfo: RoomInfoModel = {
            roomNumber: "S1208",
            name: "Demo",
            description: "Classroom of 5A/BHITN",
            type: "Class",
            isWheelchairAccessible: true,
            hasTeacherComputer: true,
            projector: "Smart",
            projectorConnectors: ["HDMI", "USB"],
            hasWater: true,
            boards: ["smart", "white", "pin"],
            numberOfComputers: 1,
            numberOfSeats: 20,
        };

        res.json(roomInfo);
    }
}
