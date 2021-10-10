import { Request, Response, NextMethod } from "../types";

export default function (req: Request, resp: Response, next: NextMethod): void {
    console.log(
        "Incoming request:",
        req.method,
        req.path,
        req.method !== "GET" ? req.body : ""
    );
    next();
}
