export default abstract class Component<T> extends HTMLElement {
    constructor(tagName: string, ...);
    get elements(): T;
    connectedCallback(): void;
    disconnectedCallback(): void;
    adoptedCallback(): void;
    setState(name: string, value: string): void;
    removeState(name: string): void;
    registerEventListenerCallback(): void;
    removeEventListenerCallback(): void;
    bindMethodsCallback(): void;
    render(firstRender?: boolean): void;
}