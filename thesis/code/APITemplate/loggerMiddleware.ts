import { Request, Response, NextMethod } from "../types";

export default function loggerMiddleware(
  req: Request,
  res: Response,
  next: NextMethod
): void {
  console.log(
    "Incoming request:",
    req.method,
    req.path,
    req.method !== "GET" ? req.body : ""
  );
  next();
}
