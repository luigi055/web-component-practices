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
    return ["text"];
  }

  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.append(...template.childNodes);
  }

  connectedCallback() {
    // Invoked each time the custom element is appended into a document-connected element. This will happen each time the node is moved, and may happen before the element's contents have been fully parsed.
    console.warn("connectedCallback", this.isConnected);
  }

  attributeChangedCallback(attributeName, oldValue, newValue) {
    // Invoked each time one of the custom element's attributes is added, removed, or changed. Which attributes to notice change for is specified in a static get observedAttributes method
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

  adoptedCallback() {
    // Invoked each time the custom element is moved to a new document.
    console.warn("adopted Callback");
  }

  disconnectedCallback() {
    // Invoked each time the custom element is disconnected from the document's DOM.
    console.warn("disconnectedCallback", this.isConnected);
  }
}

customElements.define("x-title", XTitle);
