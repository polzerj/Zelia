import ComponentInfo from "./types/ComponentInfo";
import { initializeComponents } from "./loader";
import router from "./router";

import Test from "./components/Test";
import NotFoundError from "./components/404";
import OCR from "./components/OCR";
import logger from "./util/logger";
import Link from "./components/Link";
import RoomInput from "./components/RoomInput";

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
        tagName: "zelia-room-input",
        type: RoomInput,
        path: "/RoomInput.html",
    },
];

initializeComponents(components).then(main);

function main() {
    logger.info("Loaded components!");

    router.on("/", rootPage);
    router.on("404", notFoundPage);
    router.on("/ocr", ocrPage);
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
    const ocr = document.createElement("zelia-ocr");
    app.append(ocr);
}
