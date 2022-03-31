import { Request, Response, NextMethod } from "../types";

export default function (req: Request, res: Response, next: NextMethod): void {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
}
