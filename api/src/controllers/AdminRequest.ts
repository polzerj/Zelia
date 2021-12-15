import Booking from "../types/Booking";
import Report from "../types/Report";
import { Request, Response, ControllerBase } from "../types";
import AuthenticationMiddleware from "../middleware/AutenticationMiddleware";
import { getAllAdminRequests } from "../data/DatabaseService";
import { RoomReport } from "../data/RoomReportConnection";
import { RoomReservation } from "../data/RoomReservationConnection";

export default class AdminRequest extends ControllerBase {
    constructor() {
        super("/admin/requests", { get: [AuthenticationMiddleware] });
    }

    async get(req: Request, res: Response) {
        let reqs = await getAllAdminRequests();
        let toSend = [];
        for (const req of reqs) {
            if (req instanceof RoomReport) {
                toSend.push(Report.fromDB(req));
            } else if (req instanceof RoomReservation) {
                toSend.push(Booking.fromDB(req));
            }
        }
        res.json(toSend);
    }
}
