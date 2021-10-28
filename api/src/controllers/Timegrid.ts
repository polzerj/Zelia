import { getTimegrid } from "../services/WebUntis";
import { Request, Response, ControllerBase } from "../types";
console.log("here");

export default class HelloWorldController extends ControllerBase {
    constructor() {
        super("/timegrid");
    }

    async get(req: Request, res: Response) {
        const tg = await getTimegrid();
        res.json(tg);
    }
}
