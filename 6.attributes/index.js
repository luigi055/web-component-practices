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
    console.warn("ObservedAttributes");
    return ["isstrong"];
  }

  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.append(...template.childNodes);
  }

  attributeChangedCallback(attributeName, oldValue, newValue) {
    console.warn(
      "attributeChangedCallback: ",
      "attribute name: ",
      attributeName,
      "attribute old value: ",
      oldValue,
      "attribute new value: ",
      newValue
    );
  }
}

customElements.define("x-title", XTitle);
