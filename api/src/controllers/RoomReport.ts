import { Request, Response, ControllerBase } from "../types";
import RequestManager from "../services/RequestManager";
import { sendVerificationMail } from "../services/Mail";
import Report from "../types/Report";
import { setRoomReportDbService } from "../data/DatabaseService";
import { CouldNotInsertDataException } from "../data/Exceptions/CouldNotInsertDataException";

interface IReport {
    roomNumber: string;
    user: string;
    firstDected: number;
    information: string;
}

export default class RoomReport extends ControllerBase {
    constructor() {
        super("/room/:roomNumber/report");
    }

    async post(req: Request, res: Response) {
        const { roomNumber, user, information, firstDected } =
            req.body as unknown as IReport;
        let report = new Report(roomNumber, user, firstDected, information);

        try {
            await setRoomReportDbService(report);
        } catch (e) {
            res.status(500).send("Could not insert into database");
            return;
        }

        RequestManager.add(report);
        try {
            sendVerificationMail(report);
            res.send(200);
        } catch (error) {
            res.status(500).send("Could not send E-Mail");
        }
    }
}
