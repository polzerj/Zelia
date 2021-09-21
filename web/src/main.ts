import ComponentInfo from "./types/ComponentInfo";
import { initializeComponents } from "./loader";
import logger from "./logger";
import router from "./router";

import OCR from "./components/OCR";
import RoomInput from "./components/RoomInput";
import Link from "./components/Link";
import Debug from "./components/Debug";

const app = document.querySelector("#app")!;

let components: ComponentInfo[] = [
    {
        tagName: "zelia-ocr",
        type: OCR,
        path: "/OCR.html",
    },
    {
        tagName: "zelia-room-input",
        type: RoomInput,
        path: "/RoomInput.html",
    },
    {
        tagName: "zelia-link",
        type: Link,
        path: "/Link.html",
    },
    {
        tagName: "zelia-debug",
        type: Debug,
        path: "/Debug.html",
    },
];

initializeComponents(components).then(main);

const isMobile = window.navigator.userAgent.toLowerCase().includes("mobile");


function main() {

    if (isMobile) {
        logger.appendDebug();   
    }

    logger.info(window.innerWidth, window.innerHeight);

    logger.info("Components loaded!");

    router.on("/room", roomPage);
    router.on("/", mainPage);
}

function mainPage() {
    let ocr = document.createElement("zelia-ocr");
    let roomInput = document.createElement("zelia-room-input");

    if (isMobile) app.append(ocr);
    app.append(roomInput);
}

function roomPage() {
    let backArrow = document.createElement("zelia-link") as Link;
    backArrow.href = "/";
    backArrow.textContent = "<- back";

    let head = document.createElement("h1");
    head.textContent = getUrlParams().get("number") ?? "";
    if (head.textContent === "") head.textContent = "Hmm something is wrong :(";

    app.append(backArrow);
    app.append(head);
}

function getUrlParams(): URLSearchParams {
    return new URLSearchParams(document.location.search.substring(1));
}
