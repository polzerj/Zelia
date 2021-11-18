import Timegrid from "services/WebUntis/WebUntisLib/Timegrid";
import { getTimegrid, login } from "../services/WebUntis";
import { Request, Response, ControllerBase } from "../types";
console.log("here");

export default class HelloWorldController extends ControllerBase {
    constructor() {
        super("/timegrid");
    }

    async get(req: Request, res: Response) {
        var tg: Timegrid;
        try {
            tg = await getTimegrid();
        } catch (e) {
            res.status(500).send(e.message);
            return;
        }
        res.json(tg);
    }
}
