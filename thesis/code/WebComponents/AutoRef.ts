interface HtmlElementReferenceTypes {
  button: HTMLButtonElement;
}
class Test extends Component<HtmlElementReferenceTypes> {
  constructor() {
    super("test-component", { button: "#btnInfo" });
    this.setState("infoText ", "Click");
    this.elements.button.textContent += " Me";
  }
}
