import { ControllerBase, Request, Response } from "../types";
import { getTimetableByRoomNumber } from "../services/WebUntis";

export default class Timetable extends ControllerBase {
    constructor() {
        super("/room/:roomNr/timetable");
    }
    async get(req: Request, res: Response) {
        let roomNumber = req.params.roomNr;
        let timetable = await getTimetableByRoomNumber(roomNumber);
        res.json(timetable);
    }
}
