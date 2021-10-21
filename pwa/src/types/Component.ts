import { getComponentTemplateAsString } from "../loader";
import StringResolvable from "../types/StringResolvable";

type SearchQueries = { [key: string]: string }; //Map<string,string>

export default abstract class Component<T> extends HTMLElement {
    private readonly htmlSoucre: string;
    private state: Map<string, string | StringResolvable> = new Map();

    private searchQueries: SearchQueries;
    private _elements: any = {};

    constructor(
        tagName: string,
        queries: SearchQueries = {},
        autoRender: boolean = true
    ) {
        super();
        this.searchQueries = queries;

        this.attachShadow({ mode: "open" });
        this.htmlSoucre = getComponentTemplateAsString(tagName);

        this.bindMethodsCallback();
        if (autoRender) this.render(true);
    }

    private searchElements() {
        for (const key in this.searchQueries) {
            let e = this.shadowRoot?.querySelector(this.searchQueries[key]);
            if (e) this._elements[key] = e;
        }
    }

    get elements(): T {
        return this._elements as T;
    }

    connectedCallback(): void {}
    disconnectedCallback(): void {
        this.removeEventListenerCallback();
    }
    adoptedCallback(): void {}
    attributeChangedCallback(
        name: string,
        oldValue: string,
        newValue: string
    ): void {}

    setState(name: string, value: string) {
        this.state.set(name, value);
        this.render();
    }

    removeState(name: string) {
        this.state.delete(name);
        this.render();
    }

    registerEventListenerCallback() {}
    removeEventListenerCallback() {}
    bindMethodsCallback() {}

    // static get observedAttributes(): string[];
    render(firstRender = false) {
        let source = this.htmlSoucre;
        if (!firstRender) this.removeEventListenerCallback();

        for (const [key, val] of this.state.entries()) {
            source = source.replaceAll(`{{${key}}}`, val.toString());
        }
        this.shadowRoot!.innerHTML =
            source ?? '</span style="color:red">No tag source found</span>';

        this.searchElements();
        this.registerEventListenerCallback();
    }
}
