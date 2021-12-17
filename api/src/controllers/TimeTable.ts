import { ControllerBase, Request, Response } from "../types";
import type Lesson from "../services/WebUntis/WebUntisLib/Lesson";
import { getTimetableByRoomNumber, login } from "../services/WebUntis";
import { isValidLogin } from "../services/WebUntis";
import { RoomNotFoundException } from "../data/Exceptions/RoomNotFoundException";
import { NoConnectionException } from "../data/Exceptions/NoConnectionException";

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
                if (e instanceof RoomNotFoundException) {
                    res.status(404).send(e.message);
                    return;
                }
                if (e instanceof NoConnectionException) {
                    res.status(500).send(e.message);
                    return;
                }
            }
            res.send(timetable);
        }
    }
}
