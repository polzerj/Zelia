import router from "../router";
import Component from "../types/Component";

export default class Link extends Component<{}> {
    constructor() {
        super("zelia-link", { useShadowRoot: false });
    }

    bindMethodsCallback() {
        this.onClick = this.onClick.bind(this);
    }

    registerEventListenerCallback() {
        this.addEventListener("click", this.onClick);
    }

    removeEventListenerCallback() {
        this.removeEventListener("click", this.onClick);
    }

    private onClick(e: MouseEvent) {
        router.redirect(this.href);
    }

    get href(): string {
        return this.getAttribute("href") ?? "";
    }

    set href(value: string) {
        this.setAttribute("href", value);
    }
}
