const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

export default class Login extends ControllerBase {
  constructor() {
    super("/admin/login");
  }

  async post(req: Request, res: Response) {
    let user = req.body.username;
    let pwd = req.body.password;
    let hash = crypto.createHash("sha256").update(pwd).digest("hex");

    try {
      let data = await getAdminUserByNameAndPw(user, hash);
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
