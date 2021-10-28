import RoomEntity from "../data/entities/RoomEntity";
import { roomEntitiesToRoomInfoModels } from "../data/mapper/RoomInfoMapper";
import { getRoomInfoByRoomNumber } from "../data/DatabaseService";
import { Request, Response, ControllerBase } from "../types";
import { isLoggedInWebUntis } from "../index";

export default class RoomInfo extends ControllerBase {
    constructor() {
        super("/room/:roomNumber");
    }

    async get(req: Request, res: Response) {
        if (!isLoggedInWebUntis) {
            res.status(500).send("No connection to WebUntis");
        } else {
            const roomNumber = req.params.roomNumber;
            let data: RoomEntity[];
            try {
                data = await getRoomInfoByRoomNumber(roomNumber);
            } catch (e: unknown) {
                console.log(e);

                res.status(404).send("Room not found");
                return;
            }
            const model = roomEntitiesToRoomInfoModels(data);
            res.send(model);
        }
    }
}
