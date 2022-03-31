import Room from "../services/WebUntis/WebUntisLib/Room";
import { getRoomList } from "../services/WebUntis";
import { Request, Response, ControllerBase } from "../types";

export default class RoomList extends ControllerBase {
    constructor() {
        super("/room");
    }

    async get(req: Request, res: Response) {
        let rooms;
        try {
            rooms = await getRoomList();
        } catch (e) {
            res.status(500).send(e.message);
            return;
        }
        res.json(roomsToStringArray(rooms));
    }
}

function roomsToStringArray(rooms: Room[]) {
    return [
        ...rooms.map((room) => room.name),
        ...rooms.map((room) => room.longName),
    ];
}
