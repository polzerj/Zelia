class HelloComponent extends HTMLElement{
    constructor() {
        super();
        this.attachShadow({ mode: "open" }) ;
        /** @type {HTMLTemplateElement}*/
        cost template = document.querySelector("#hello-template");
        cost templateContent = template.content;
        this.shadowRoot.append(templateContent.cloneNode(true));
    }   
}
window.customElements.define("hello-component", HelloComponent);