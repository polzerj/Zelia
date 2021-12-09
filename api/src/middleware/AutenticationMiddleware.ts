import { Request, Response, NextMethod } from "../types";
const jwt = require("jsonwebtoken");
const jwt_secret = process.env.JWT_Secret;

export default function (req: Request, res: Response, next: NextMethod): void {
    var token = req.headers["authorization"].trim().split(" ")[1].trim();
    if (!token) {
        res.status(403).send("A token is required for authentication");
        return;
    }
    try {
        const decoded = jwt.verify(token, jwt_secret );
    } catch {
        res.status(401).send("Invalid token");
        return;
    }
    next();
}