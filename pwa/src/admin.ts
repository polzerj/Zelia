import ComponentInfo from "./types/ComponentInfo";
import { initializeComponents } from "./loader";

const app = document.querySelector("#app")!;

let components: ComponentInfo[] = [
    /*{
        tagName: "not-found",
        type: NotFoundError,
        path: "/404.html",
    },*/
];

initializeComponents(components).then(main);

function main() {
    // do login
    // get token
    // fetch reports and bookings -> put token in header or body
    // create compoents with this data
    // display components in app element
}
