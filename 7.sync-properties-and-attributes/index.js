const styleDefinitions = `
  h1 {
    padding: 5px;
    background: red;
    color: white;
  }
`;

const styleContent = document.createTextNode(styleDefinitions);
const styles = document.createElement("style");
const template = document.createElement("template");
const title = document.createElement("h1");
const slot = document.createElement("slot");

styles.appendChild(styleContent);
title.appendChild(slot);
template.appendChild(styles);
template.appendChild(title);

class XTitle extends HTMLElement {
  static get observedAttributes() {
    return ["custom-title"];
  }

  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.append(...template.childNodes);
    this.titleElement = this.shadowRoot.querySelector("h1");
  }

  get customTitle() {
    return this._customTitle;
  }

  set customTitle(title) {
    this._customTitle = title;
    this.titleElement.innerText = title;
  }

  attributeChangedCallback(attributeName, oldValue, newValue) {
    console.warn(
      "attributeChangedCallback: ",
      attributeName,
      oldValue,
      newValue
    );
    if (attributeName === "custom-title") {
      this.customTitle = newValue;
    }
  }
}

customElements.define("x-title", XTitle);
