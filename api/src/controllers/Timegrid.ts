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
            if (e.message == "Current session is not valid") {
                try {
                    await login();
                    this.get(req, res);
                    return;
                } catch {
                    res.status(500).send("No connection to WebUntis");
                    return;
                }
            }
        }

        res.json(tg);
    }
}
