const template = document.createElement("template");
template.innerHTML = `
  <style>
    :host {
      --color: white;
      --background: blue
    }

    :host([dark-mode]) div {
      color: white;
      background: black;
    }

    div {
      background: var(--background);
      color: var(--color);
      font-size: var(--root-font-size,16px);
    }
  </style>

  <div>
    Inner Component Blue DIV styles encapsulated because this content is inside the shadow DOM :D!
    so, outer styles doesn't affect me
  </div>
`;

class XBlock extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define("x-block", XBlock);
