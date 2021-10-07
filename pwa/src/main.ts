import ComponentInfo from "./types/ComponentInfo";
import { initializeComponents } from "./loader";
import router from "./router";

import Test from "./components/Test";
import NotFoundError from "./components/404";

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
];

initializeComponents(components).then(main);

function main() {
    router.on("/", rootPage);
    router.on("404", notFoundPage);
}
function notFoundPage() {
    const testComponent = document.createElement("not-found");
    app.append(testComponent);
}
function rootPage() {
    const testComponent = document.createElement("test-component");
    app.append(testComponent);
}
