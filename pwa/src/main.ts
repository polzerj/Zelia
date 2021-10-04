import ComponentInfo from "./types/ComponentInfo";
import { initializeComponents } from "./loader";

import Test from "./components/Test";

let components: ComponentInfo[] = [
    {
        tagName: "test-component",
        type: Test,
        path: "/Test.html",
    },
];

initializeComponents(components);
