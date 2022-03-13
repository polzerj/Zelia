class MyElement extends HTMLElement {
  btn: HTMLButtonElement;

  constructor() {
    super();
    this.btnClicked = this.btnClicked.bind(this);
    this.btn = document.createElement("button");
    this.btn.innerText = "Click me";
    this.appendChild(this.btn);
  }

  connectedCallback() {
    this.btn.addEventListener("click", this.btnClicked);
  }

  disconnectedCallback() {
    this.btn.removeEventListener("click", this.btnClicked);
  }

  btnClicked() {
    console.log("clicked");
  }

  adoptedCallback() {
    console.log("Custom element moved to new page.");
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(`Attribute ${name} changed from ${oldValue} to ${newValue}.`);
  }

  static get observedAttributes() {
    return ["to", "from"];
  }
}
