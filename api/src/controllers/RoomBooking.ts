import { Request, Response, ControllerBase } from "../types";
import { RoomNotFoundException } from "../data/Exceptions/RoomNotFoundException";
import { DatabaseNotAvailableException } from "../data/Exceptions/DatabaseNotAvailableException";

export default class RoomBooking extends ControllerBase {
    constructor() {
        super("/room/:roomNumber/book");
    }

    async get(req: Request, res: Response) 
    {
        
    }
}
