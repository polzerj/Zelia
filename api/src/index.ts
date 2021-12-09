import App from "./app";

import bodyParser = require("body-parser");
import HelloWorldController from "./controllers/HelloWorld";
import TestMiddleware from "./middleware/TestMiddleware";
import LoggingMiddleware from "./middleware/LoggingMiddleware";
import Timetable from "./controllers/TimeTable";
import CorsMiddleware from "./middleware/CorsMiddleware";
import RoomList from "./controllers/RoomList";
import RoomInfo from "./controllers/RoomInfo";
import { login } from "./services/WebUntis";
import Timegrid from "./controllers/Timegrid";
import { TryLogin } from "./services/WebUntis";
import AdminRequest from "./controllers/AdminRequest";

const app = new App({
    controllers: [
        new HelloWorldController(),
        new Timetable(),
        new RoomList(),
        new RoomInfo(),
        new Timegrid(),
        new AdminRequest(),
    ],
    middleWares: [
        // It is not deprecated if not used as function
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true }),
        TestMiddleware,
        LoggingMiddleware,
        CorsMiddleware,
    ],
    baseUrl: "/api",
});

TryLogin();
app.listen();
