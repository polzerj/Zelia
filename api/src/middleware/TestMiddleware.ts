import { Request, Response } from "../types/types";
export default function TestMiddleware(
    req: Request,
    res: Response,
    next: () => void
) {
    console.log("Test");
    next();
}
