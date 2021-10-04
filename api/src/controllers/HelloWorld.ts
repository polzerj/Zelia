import TestMiddleware from "../middleware/TestMiddleware";
import { Request, Response, ControllerBase } from "../types";

export default class HelloWorldController extends ControllerBase {
    constructor() {
        super("/");
    }

    get(req: Request, res: Response) {
        res.json({ hello: "world" });
    }
}
