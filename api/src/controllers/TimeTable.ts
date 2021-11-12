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
            res.status(500).send("No connection to WebUntis");
        } else {
            try {
                timetable = await getTimetableByRoomNumber(roomNumber);
            } catch (e) {
                if (e.message == "Current session is not valid") {
                    try {
                        await login();
                        this.get(req, res);
                        return;
                    } catch {
                        res.status(500).send("No connection to WebUntis");
                        return;
                    }
                } else {
                    res.status(404).send(
                        `Timetable for ${roomNumber} not found!`
                    );
                    return;
                }
            }
            res.send(timetable);
        }
    }
}
