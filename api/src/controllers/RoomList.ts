import { Request, Response, ControllerBase } from "../types";

export default class RoomList extends ControllerBase {
    constructor() {
        super("/room");
    }

    get(req: Request, res: Response) {
        res.json(["ITACA", "1308", "2412", "2406"]);
    }
}
