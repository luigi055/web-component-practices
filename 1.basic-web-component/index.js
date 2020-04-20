class XComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = "<h1>Hello From Web Component</h1>";
  }
}

customElements.define("x-component", XComponent);
