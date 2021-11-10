class BahmniModal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        #backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background: rgba(0,0,0,0.75);
          z-index: 10;
          opacity: 0;
          pointer-events: none;
        }

        #modal {
          position: fixed;
          top: 10vh;
          left: 25%;
          width: 50%;
          z-index: 100;
          background: white;
          color: black;
          border-radius: 3px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.26);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          opacity: 0;
          pointer-events: none;
          transition: all 0.3s ease-out;
        }

        :host([opened]) #backdrop,
        :host([opened]) #modal {
            opacity: 0.8;
            pointer-events: all;
        }

        :host([opened]) #modal {
            top: 15vh;
        }

        header {
          padding: 1rem;
          border-bottom: 1px solid #ccc;
        }

        #main {
          padding: 1rem;
        }

        #actions {
            border-top: 1px solid #ccc;
            padding: 1rem;
            display: flex;
            justify-content: flex-end;
        }

        #actions button {
            margin: 0 0.25rem;
        }
      </style>
      <div id="backdrop"></div>
      <div id="modal">
          <header>
              <slot name="title">Some Title</slot>
          </header>
          <section id="main">
              <slot></slot>
          </section>
          <section id="actions">
              <button id="cancel-btn">Cancel</button>
              <button id="confirm-btn">Okay</button>
          </section>
      </div>
    `;

    const backdrop = this.shadowRoot.querySelector('#backdrop');
    const cancelButton = this.shadowRoot.querySelector('#cancel-btn');
    const confirmButton = this.shadowRoot.querySelector('#confirm-btn');
    backdrop.addEventListener('click', this._cancel.bind(this));
    cancelButton.addEventListener('click', this._cancel.bind(this));
    confirmButton.addEventListener('click', this._confirm.bind(this));
  }

  open() {
    this.setAttribute('opened', '');
  }

  hide() {
    if (this.hasAttribute('opened')) {
      this.removeAttribute('opened');
    }
  }

  _cancel() {
    this.hide();
    const cancelEvent = new Event('cancel', { bubbles: true, composed: true });
    this.dispatchEvent(cancelEvent);
  }

  _confirm() {
    this.hide();
    const confirmEvent = new Event('confirm');
    this.dispatchEvent(confirmEvent);
  }
}

customElements.define('bahmni-modal', BahmniModal);
