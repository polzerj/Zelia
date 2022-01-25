class HelloTemplate extends HTMLElement {
  constructor() {
    super();
    /** @type {HTMLTemplateElement} */
    const template = document.querySelector("#hello-template");
    const templateContent = template.content;
    this.append(templateContent.cloneNode(true));
  }
}
window.customElements.define("hello-template", HelloTemplate);
