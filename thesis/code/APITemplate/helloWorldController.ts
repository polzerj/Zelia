import { Request, Response, ControllerBase } from "../types";

export default class HelloWorldController extends ControllerBase {
  constructor() {
    super("/hello");
  }

  get(req: Request, res: Response) {
    res.json({ hello: "world" });
  }
}
