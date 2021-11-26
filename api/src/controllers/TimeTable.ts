import { ControllerBase, Request, Response } from "../types";
import type Lesson from "../services/WebUntis/WebUntisLib/Lesson";
import { getTimetableByRoomNumber, login } from "../services/WebUntis";
import { isValidLogin } from "../services/WebUntis";

export default class Timetable extends ControllerBase {
    constructor() {
        super("/room/:roomNr/timetable");
    }
    async get(req: Request, res: Response) {
        let roomNumber = req.params.roomNr;
        let timetable: Lesson[];
        if (!isValidLogin) {
            res.status(500).send("No valid WebUntis Login");
        } else {
            try {
                timetable = await getTimetableByRoomNumber(roomNumber);
            } catch (e) {
                if (e.message == "Room not found") {
                    res.status(404).send(e.message);
                    return;
                }
                if (e.message == "Unable to connect to WebUntis") {
                    res.status(500).send(e.message);
                    return;
                }
            }
            res.send(timetable);
        }
    }
}
