class HelloComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    /** @type {HTMLTemplateElement}*/
    const template = document.querySelector("#hello-template");
    const templateContent = template.content;
    this.shadowRoot.append(templateContent.cloneNode(true));
  }
}
window.customElements.define("hello-component", HelloComponent);
