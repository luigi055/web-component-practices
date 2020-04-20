const template = document.createElement("template");
const slot = document.createElement("slot");

const button = document.createElement("button");

button.appendChild(slot);
template.appendChild(button);

class XButton extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.append(...template.childNodes);
    this.shadowRoot
      .querySelector("button")
      .addEventListener("click", () => this.handleClick());
  }

  handleClick() {
    this.dispatchEvent(
      new CustomEvent("customClick", { detail: Math.random() })
    );
  }
}

customElements.define("x-button", XButton);
