import { Request, Response, ControllerBase } from "types";
import RequestManager from "../services/RequestManager";
import {
    setRoomReportDbService,
    setRoomReservationByDate,
} from "../data/DatabaseService";
import { CouldNotInsertDataException } from "../data/Exceptions/CouldNotInsertDataException";
import Report from "../types/Report";
import Booking from "../types/Booking";

export default class VerifyController extends ControllerBase {
    constructor() {
        super("/verify");
    }

    async get(req: Request, res: Response) {
        //@ts-ignore
        var hash = req.query["hash"];
        var request: Booking | Report;
        request = RequestManager.close(hash as string);
        if ((request = null)) {
            res.status(500).send("Hash could not be verified");
            return;
        }

        if (request instanceof Report) {
            try {
                await setRoomReportDbService(request);
            } catch (e) {
                if (e instanceof CouldNotInsertDataException) {
                    res.status(500).send("Could not insert into database");
                    return;
                }
            }
        } else {
            try {
                await setRoomReservationByDate(request);
            } catch (e) {
                if (e instanceof CouldNotInsertDataException) {
                    res.status(500).send("Could not insert into database");
                    return;
                }
            }
        }
    }
}
