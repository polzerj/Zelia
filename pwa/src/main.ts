import ComponentInfo from "./types/ComponentInfo";
import { initializeComponents } from "./loader";
import router, { PathVariables } from "./router";

import NotFoundError from "./components/404";
import OCR from "./components/OCR";
import logger from "./util/logger";
import Link from "./components/Link";
import RoomInfo from "./components/RoomInfo";
import RoomInput from "./components/RoomInput";
import Timetable from "./components/Timetable";
import Report from "./components/Report";
import Debug from "./components/Debug";

const app = document.querySelector("#app")!;

let components: ComponentInfo[] = [
    {
        tagName: "not-found",
        type: NotFoundError,
        path: "/404.html",
    },
    {
        tagName: "zelia-ocr",
        type: OCR,
        path: "/OCR.html",
    },
    {
        tagName: "zelia-link",
        type: Link,
        path: "/Link.html",
    },
    {
        tagName: "zelia-room-info",
        type: RoomInfo,
        path: "/RoomInfo.html",
    },
    {
        tagName: "zelia-room-input",
        type: RoomInput,
        path: "/RoomInput.html",
    },
    {
        tagName: "zelia-timetable",
        type: Timetable,
        path: "/Timetable.html",
    },
    {
        tagName: "zelia-report",
        type: Report,
        path: "/Report.html",
    },
    {
        tagName: "zelia-debug",
        type: Debug,
        path: "/Debug.html",
    },
];

initializeComponents(components).then(main);

function main() {
    logger.info("Loaded components!");

    router.on("/", rootPage);
    router.on("404", notFoundPage);
    router.on("/ocr", ocrPage);
    router.on("/room/:roomNumber", roomPage);
    router.on("/room/:roomNumber/report", reportPage);

    router.redirect(window.location.pathname);
}

function notFoundPage() {
    const testComponent = document.createElement("not-found");
    app.append(testComponent);
}
function rootPage() {
    const testComponent = document.createElement("test-component");
    const roomInput = document.createElement("zelia-room-input");

    app.append(testComponent);
    app.append(roomInput);
}

function ocrPage() {
    appendLink("<- Back", "/");

    const ocr = document.createElement("zelia-ocr");
    app.append(ocr);
}

async function roomPage(variables?: PathVariables) {
    logger.info(variables?.roomNumber);

    appendLink("<- Back", "/");

    const info = document.createElement("zelia-room-info") as RoomInfo;
    if (variables?.roomNumber) info.roomNumber = variables?.roomNumber;
    app.append(info);

    const timetable = document.createElement("zelia-timetable") as Timetable;
    if (variables?.roomNumber) timetable.roomNumber = variables?.roomNumber;
    app.append(timetable);

    const reportLink = document.createElement("zelia-link") as Link;
    reportLink.href = `/room/${variables?.roomNumber}/report`;
    reportLink.innerText = "Report a Problem";
    app.append(reportLink);
}

function reportPage(variables?: PathVariables) {
    logger.info(variables?.roomNumber);

    const report = document.createElement("zelia-report") as Report;
    if (variables?.roomNumber) report.roomNumber = variables?.roomNumber;

    if (variables?.roomNumber) {
        appendLink("<- Back to " + variables?.roomNumber, "/room/" + variables?.roomNumber);
    }
    app.append(report);
}

function appendLink(text: string, path: string) {
    const backLink = document.createElement("zelia-link") as Link;
    backLink.textContent = text;
    backLink.href = path;
    app.append(backLink);
}
