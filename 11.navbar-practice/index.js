const styles = `

<style>
:host {
  --navbar-background: #e3e3e3;
  --buttons-color: #333;
}

:host([transparent-backdrop]) .backdrop{
  background: transparent;
}

*,
*::after,
*::before {
border: 0;
box-sizing: border-box;
margin: 0;
padding: 0;
}

.sr-only {
border: 0;
clip: rect(0, 0, 0, 0);
height: 1px;
margin: -1px;
overflow: hidden;
padding: 0;
position: absolute;
width: 1px;
}

.menu__open-button {
  background: none;
  color: var(--buttons-color);
  font-size: 1.25rem;
  padding: 5px;
  text-decoration: none;
}

.menu__close-wrapper {
  display: flex;
  justify-content: flex-end;
}

.menu__close-button {
  background: none;
  color: var(--buttons-color);
  text-align: right;
  text-decoration: none;
}

.menu__open-button:focus,
.menu__close-button:focus {
  outline-color: transparent;
}

.menu {
  background: var(--navbar-background);
  height: 100%;
  position: fixed;
  right: -300px;
  top: 0;
  width: 300px;
  padding: 15px;
  transition: right 0.3s;
  z-index: 15;
}

.backdrop {
  position: fixed;
  display: block;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgb(255, 255, 255);
  opacity: 0.8;
  cursor: default;
  z-index: 10;
}
</style>`;

const template = document.createElement("template");
template.innerHTML = `
 ${styles}

<button
  id="nav-menu-open"
  class="menu__open-button"
  aria-label="Open Navigation Menu"
>
<slot name="open-button"></slot>
</button>

<menu id="nav-menu" class="menu" aria-label="Navigation menu">
  <div class="menu__close-wrapper">
    <button
      id="nav-menu-close"
      class="menu__close-button"
      aria-label="Close navigation menu"
    >
      <slot name="close-button">
      </slot>
    </button>
  </div>

  <nav><slot></slot></nav>
</menu>
<button id="backdrop" tabindex="-1" hidden></a>
`;

class XNavbar extends HTMLElement {
  static get observedAttributes() {
    return ["enable-backdrop"];
  }

  constructor() {
    super();
    this.show = false;

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.openButton = this.shadowRoot.querySelector("#nav-menu-open");
    this.closeButton = this.shadowRoot.querySelector("#nav-menu-close");
    this.navMenu = this.shadowRoot.querySelector("#nav-menu");
    this.backdrop = this.shadowRoot.querySelector("#backdrop");

    this.navMenu.style.right = "-300px";

    this.openButton.addEventListener("click", this.toggleMenu());
    this.closeButton.addEventListener("click", this.toggleMenu());
    this.backdrop.addEventListener("click", this.toggleMenu());
  }

  get enableBackdrop() {
    return this._enableBackdrop;
  }

  set enableBackdrop(value) {
    this._enableBackdrop = value;
  }

  toggleMenu() {
    return () => {
      const backdropClassList = this.backdrop.classList;
      this.show = !this.show;

      this.navMenu.style.right = this.show ? "0" : "-300px";
      const isBackdropEnabled = this.enableBackdrop === "true" ? true : false;

      this.show && isBackdropEnabled
        ? backdropClassList.add("backdrop")
        : backdropClassList.remove("backdrop");

      this.dispatchEvent(new CustomEvent("show", { detail: this.show }));
    };
  }

  attributeChangedCallback(attributeName, oldValue, newValue) {
    if (attributeName === "enable-backdrop") {
      this.enableBackdrop = newValue;
    }
  }
}

customElements.define("x-navbar", XNavbar);
