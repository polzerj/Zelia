import { Request, Response, ControllerBase } from "../types";
import HashObject from "../types/HashObject";
import { getAdminUserByNameAndPw } from "../data/DatabaseService";
import { DatabaseNotAvailableException } from "../data/Exceptions/DatabaseNotAvailableException";
import { NoAdminUsersFoundException } from "../data/Exceptions/NoAdminUsersFoundException";
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const env = process.env.JWT_SECRET;

export default class Login extends ControllerBase {
    constructor() {
        super("/admin/login");
    }

    async post(req: Request, res: Response) {
        console.log(req);
        let user = req.body.username;
        let pwd = req.body.password;
        let hash = crypto.createHash("md5").update(pwd).digest("hex");
        try {
            let data = getAdminUserByNameAndPw(user, hash);
            let token = jwt.sign({ user }, env, {
                algorithm: "HS256",
            });
            res.status(200).json({ token });
        } catch (e) {
            console.log(e);
            if (e.instanceof(DatabaseNotAvailableException)) {
                res.status(500).send("Database not available");
                return;
            }
            if (e.instanceof(NoAdminUsersFoundException)) {
                res.status(401).send("Invalid Login Name|Password");
                return;
            }
        }
    }
}
