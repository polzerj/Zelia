import { Request, Response } from "express";
export type NextMethod = () => void;

export type Middleware = (
    req: Request,
    res: Response,
    next: NextMethod
) => void;
