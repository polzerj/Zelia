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

let WebUntisLoggedIn = false;

const app = new App({
    controllers: [
        new HelloWorldController(),
        new Timetable(),
        new RoomList(),
        new RoomInfo(),
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

async function TryLogin() {
    try {
        login();
        WebUntisLoggedIn = true;
    } catch (e) {
        console.log(e);
    }
}
TryLogin();
export default WebUntisLoggedIn;
app.listen();
