import RoomEntity from "../data/entities/RoomEntity";
import { roomEntitiesToRoomInfoModels } from "../data/mapper/RoomInfoMapper";
import { getRoomInfoByRoomNumber } from "../data/DatabaseService";
import { Request, Response, ControllerBase } from "../types";
import { isValidLogin } from "../services/WebUntis";
import { RoomNotFoundException } from "data/Exceptions/RoomNotFoundException";
import { DatabaseNotAvailableException } from "data/Exceptions/DatabaseNotAvailableException";

export default class RoomInfo extends ControllerBase {
    constructor() {
        super("/room/:roomNumber");
    }

    async get(req: Request, res: Response) {
        const roomNumber = req.params.roomNumber;
        let data: RoomEntity[];
        try {
            data = await getRoomInfoByRoomNumber(roomNumber);
        } catch (e: unknown) {
            if (e instanceof RoomNotFoundException) {
                res.status(404).send("Room not found");
                return;
            }
            if (e instanceof DatabaseNotAvailableException) {
                res.status(500).send("Database not available");
                return;
            }
            res.status(500).send((e as Error).message);
            return;
        }
        const model = roomEntitiesToRoomInfoModels(data);
        res.send(model);
    }
}
