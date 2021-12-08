import { Request, Response, ControllerBase } from "../types";
import RequestManager from "../services/RequestManager";
import { sendVerificationMail } from "../services/Mail";
import Report from "../types/Report";

interface IReport {
    roomNumber: string;
    user: string;
    firstDected: number;
    information: string;
}

export default class RoomBooking extends ControllerBase {
    constructor() {
        super("/room/:roomNumber/book");
    }

    async post(req: Request, res: Response) {
        // -> build obj
        // -> add to mgr service
        // -> send email
        // <- send response

        const { roomNumber, user, firstDected, information } =
            req.params as unknown as IReport;
        let report = new Report(roomNumber, user, firstDected, information);

        RequestManager.add(report);
        try {
            sendVerificationMail(report);
            res.send(200);
        } catch (error) {
            res.status(500).send("E-Mail nicht erfolgreich gesendet");
        }
    }
}
