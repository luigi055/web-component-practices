const styleDefinitions = `
  slot[name="header"] {
    color: blue;
  }

  slot[name="footer"] {
    color: red;
  }
`;

const styleContent = document.createTextNode(styleDefinitions);
const styles = document.createElement("style");
const template = document.createElement("template");
const article = document.createElement("article");
const defaultSlot = document.createElement("slot");

const headerSlot = document.createElement("slot");
headerSlot.setAttribute("name", "header");

const footerSlot = document.createElement("slot");
footerSlot.setAttribute("name", "footer");

styles.appendChild(styleContent);
article.appendChild(headerSlot);
article.appendChild(defaultSlot);
article.appendChild(footerSlot);
template.appendChild(styles);
template.appendChild(article);

class XCard extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.append(...template.childNodes);
  }
}

customElements.define("x-card", XCard);
