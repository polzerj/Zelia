import { ControllerBase, Request, Response } from "../types";
import type Lesson  from "../services/WebUntis/WebUntisLib/Lesson";
import { getTimetableByRoomNumber } from "../services/WebUntis";

export default class Timetable extends ControllerBase {
    constructor() {
        super("/room/:roomNr/timetable");
    }
    async get(req: Request, res: Response) {
        let roomNumber = req.params.roomNr;
        let timetable: Lesson[];
        try {
             timetable = await getTimetableByRoomNumber(roomNumber);
        }
        catch {
            res.status(404).send(`Timetable for ${roomNumber} not found!`);
            return;
            
        }        
        res.send(timetable);
    }
}
