import App from "./app";

import bodyParser = require("body-parser");
import HelloWorldController from "./controllers/HelloWorld";
import TestMiddleware from "./middleware/TestMiddleware";
import LoggingMiddleware from "./middleware/LoggingMiddleware";
import Timetable from "./controllers/TimeTable";
import CorsMiddleware from "./middleware/CorsMiddleware";
import RoomList from "./controllers/RoomList";
import RoomInfo from "./controllers/RoomInfo";
import Login from "./controllers/Login";
import { login } from "./services/WebUntis";
import Timegrid from "./controllers/Timegrid";
import { TryLogin } from "./services/WebUntis";
import AdminRequest from "./controllers/AdminRequest";
import RoomBooking from "./controllers/RoomBooking";
import RoomReport from "./controllers/RoomReport";

const app = new App({
    controllers: [
        new HelloWorldController(),
        new Timetable(),
        new RoomList(),
        new RoomInfo(),
        new Timegrid(),
        new Login(),
        new AdminRequest(),
        new RoomReport(),
        new RoomBooking(),
    ],
    middleWares: [
        // It is not deprecated if not used as function
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true }),
        CorsMiddleware,
        TestMiddleware,
        LoggingMiddleware,
    ],
    baseUrl: "/api",
});

TryLogin();
app.listen();
