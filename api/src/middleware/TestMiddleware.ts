import { Request, Response } from "../types";
export default function TestMiddleware(
    req: Request,
    res: Response,
    next: () => void
) {
    console.log("Test");
    next();
}
