import Booking from "../types/Booking";
import Report from "../types/Report";
import { Request, Response, ControllerBase } from "../types";
import AuthenticationMiddleware from "../middleware/AutenticationMiddleware";
import { getAllRoomReports, getAllRoomReservations } from "../data/DatabaseService";
import { RoomReport } from "../data/RoomReportConnection";
import { RoomReservation } from "../data/RoomReservationConnection";
import { DatabaseNotAvailableException } from "../data/Exceptions/DatabaseNotAvailableException";
import { NoAdminUsersFoundException } from "../data/Exceptions/NoAdminUsersFoundException";

export default class AdminRequest extends ControllerBase {
  constructor() {
    super("/admin/requests", { get: [AuthenticationMiddleware] });
  }

  async get(req: Request, res: Response) {
    try {
      console.log("OKOK");

      let reqs = [...(await getAllRoomReports()), ...(await getAllRoomReservations())];

      console.log(reqs);

      let toSend = [];
      for (const req of reqs) {
        if (req instanceof RoomReport) {
          toSend.push(Report.fromDB(req));
        } else if (req instanceof RoomReservation) {
          toSend.push(Booking.fromDB(req));
        }
      }
      res.json(toSend);
    } catch (e) {
      console.log(e);

      if (e instanceof NoAdminUsersFoundException) {
        res.status(401).send("Invalid Login Name|Password");
        return;
      }

      if (e instanceof DatabaseNotAvailableException) {
        res.status(500).send("Database not available");
        return;
      }

      res.status(501).send("Other Server error");
    }
  }
}
