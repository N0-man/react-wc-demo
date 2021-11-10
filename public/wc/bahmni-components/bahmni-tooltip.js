class BahmniTooltip extends HTMLElement {
  constructor() {
    super(); //sugar for HTMLElement
    this._toolTipContainer;
    this._toolTipText = 'some pure stuff...';
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        div {
          font-size: 1rem;
          color: red
        }
        span {
          background: black;
          color: white;
          border-radius: 50%;
          padding: 2px 8px;
        }
      </style>
      <slot>Web Compooooo</slot>
      <span>?</span>
    `;
  }

  //Called when the element is mounted on the DOM
  connectedCallback() {
    if (this.hasAttribute('text')) {
      this._toolTipText = this.getAttribute('text');
    }
    const tooltipIcon = this.shadowRoot.querySelector('span');
    tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this));
    tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this));
    this.shadowRoot.appendChild(tooltipIcon);
  }

  _showTooltip() {
    this._toolTipContainer = document.createElement('div');
    this._toolTipContainer.textContent = this._toolTipText;
    this.shadowRoot.appendChild(this._toolTipContainer);
  }

  _hideTooltip() {
    this.shadowRoot.removeChild(this._toolTipContainer);
  }
}

customElements.define('bahmni-tooltip', BahmniTooltip);
