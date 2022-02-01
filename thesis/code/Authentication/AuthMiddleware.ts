import { Request, Response, NextMethod } from "../types";
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

export default function (req: Request, res: Response, next: NextMethod): void {
  var token = req.headers["authorization"].trim().split(" ")[1].trim();
  if (!token) {
    res.status(403).send("A token is required for authentication");
    return;
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
  } catch (e) {
    console.log(e);
    res.status(401).send("Invalid token");
    return;
  }
  next();
}
