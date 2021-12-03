import { Request, Response, ControllerBase } from "../types";
import { RoomNotFoundException } from "../data/Exceptions/RoomNotFoundException";
import { DatabaseNotAvailableException } from "../data/Exceptions/DatabaseNotAvailableException";
import Booking from "../types/Booking";
import RequestManager from "../services/RequestManager";
import { sendVerificationMail } from "../services/Mail";

interface IBooking {
    roomNumber: string;
    user: string;
    date: number;
    until: number;
    from: number;
    purpose: string;
}

export default class RoomBooking extends ControllerBase {
    constructor() {
        super("/room/:roomNumber/book");
    }

    async post(req: Request, res: Response) {
        // TODO:
        // -> build obj
        // -> add to mgr service
        // -> send email
        // <- send response

        const { roomNumber, user, date, until, from, purpose } =
            req.params as unknown as IBooking;
        let booking = new Booking(roomNumber, user, date, from, until, purpose);

        RequestManager.add(booking);
        try {
            sendVerificationMail(booking);
            res.send(200);
        } catch (error) {
            res.status(500).send("E-Mail nicht erfolgreich gesendet");
        }
    }
}
