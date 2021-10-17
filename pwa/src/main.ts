import ComponentInfo from "./types/ComponentInfo";
import { initializeComponents } from "./loader";
import router, { PathVariables } from "./router";
import { getRoomInfoByRoomNumber } from "./services/roominfo";

import Test from "./components/Test";
import NotFoundError from "./components/404";
import OCR from "./components/OCR";
import logger from "./util/logger";
import Link from "./components/Link";
import RoomInfo from "./components/RoomInfo";

const app = document.querySelector("#app")!;

let components: ComponentInfo[] = [
    {
        tagName: "test-component",
        type: Test,
        path: "/Test.html",
    },
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
];

initializeComponents(components).then(main);

function main() {
    logger.info("Loaded components!");

    router.on("/", rootPage);
    router.on("404", notFoundPage);
    router.on("/ocr", ocrPage);
    router.on("/room/:roomNumber", roomPage);
}

function notFoundPage() {
    const testComponent = document.createElement("not-found");
    app.append(testComponent);
}
function rootPage() {
    const testComponent = document.createElement("test-component");
    app.append(testComponent);
}

function ocrPage() {
    const ocr = document.createElement("zelia-ocr");
    app.append(ocr);
}

async function roomPage(variables?: PathVariables) {
    const info = document.createElement("zelia-room-info") as RoomInfo;
    const backLink = document.createElement("zelia-link") as Link;
    backLink.textContent = "<- Back";
    backLink.href = "/";
    app.append(backLink);

    if (variables?.roomNumber) {
        try {
            info.roomInfo = await getRoomInfoByRoomNumber(
                variables?.roomNumber
            );
        } catch (e) {
            logger.error(e);
        }
    }
    app.append(info);
}
