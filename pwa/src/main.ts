import ComponentInfo from "./types/ComponentInfo";
import { initializeComponents } from "./loader";
import router from "./router";

import Test from "./components/Test";

const app = document.querySelector("#app")!;

let components: ComponentInfo[] = [
    {
        tagName: "test-component",
        type: Test,
        path: "/Test.html",
    },
];

initializeComponents(components).then(main);

function main() {
    router.on("/", rootPage);
}
function rootPage() {
    const testComponent = document.createElement("test-component");
    app.append(testComponent);
}
