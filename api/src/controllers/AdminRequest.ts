import Booking from "types/Booking";
import Report from "types/Report";
import { Request, Response, ControllerBase } from "../types";
import AuthenticationMiddleware from "../middleware/AutenticationMiddleware";

export default class AdminRequest extends ControllerBase {
  constructor() {
    super("/admin/requests", { all: [AuthenticationMiddleware] });
  }

  async get(req: Request, res: Response) {
    res.json([
      new Report(
        "1308",
        "mersed.keco@edu.szu.at",
        new Date().getTime(),
        "Waschbecken voller Schlamm"
      ),
      new Booking(
        "1308",
        "mersed.keco@edu.szu.at",
        new Date().getTime(),
        1,
        3,
        "Weil der Raum so schön ist"
      ),
      new Report("2406", "mersed.keco@edu.szu.at", new Date().getTime(), "Keine Tafel mehr"),
    ]);
  }
}
