import { Request, Response, ControllerBase } from "../types";
import HashObject from "../types/HashObject";
import { getAdminUserByNameAndPw } from "../data/DatabaseService";
import { DatabaseNotAvailableException } from "../data/Exceptions/DatabaseNotAvailableException";
import { NoAdminUsersFoundException } from "../data/Exceptions/NoAdminUsersFoundException";
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

export default class Login extends ControllerBase {
    constructor() {
        super("/admin/login");
    }

    async post(req: Request, res: Response) {
        let user = req.body.username;
        let pwd = req.body.password;
        //let hash = crypto.createHash("md5").update(pwd).digest("hex");
        try {
            let data = await getAdminUserByNameAndPw(user, pwd);
            let token = jwt.sign({ user }, JWT_SECRET, {
                algorithm: "HS256",
            });
            res.status(200).json({ token });
        } catch (e) {
            if (e instanceof DatabaseNotAvailableException) {
                res.status(500).send("Database not available");
                return;
            }
            if (e instanceof NoAdminUsersFoundException) {
                res.status(401).send("Invalid Login Name|Password");
                return;
            }
        }
    }
}
