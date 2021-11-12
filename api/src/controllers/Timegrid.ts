import { getTimegrid, login } from "../services/WebUntis";
import { Request, Response, ControllerBase } from "../types";
console.log("here");

export default class HelloWorldController extends ControllerBase {
    constructor() {
        super("/timegrid");
    }

    async get(req: Request, res: Response) {
        try {
            var tg = await getTimegrid();
            
        } catch (e) {
            if (e.message == "Current session is not valid") {
                try {
                    login();
                } catch {
                    res.status(500).send("No connection to WebUntis");
                    return;
                }
            }
        }

        res.json(tg);
    }
}
