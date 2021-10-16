import App from "./app";

import bodyParser = require("body-parser");
import HelloWorldController from "./controllers/HelloWorld";
import TestMiddleware from "./middleware/TestMiddleware";
import LoggingMiddleware from "./middleware/LoggingMiddleware";
import Timetable from "./controllers/TimeTable";
import CorsMiddleware from "./middleware/CorsMiddleware";

const app = new App({
    controllers: [
        new HelloWorldController(),
        new Timetable()
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

app.listen();
