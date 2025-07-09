export class DOM {
  static create(tag) {
    const el = document.createElement(tag);
    return new DOMWrapper(el);
  }

  static get(selector) {
    const el = document.querySelector(selector);
    if (!el) throw new Error(`No se encontró el elemento: ${selector}`);
    return new DOMWrapper(el);
  }
}

class DOMWrapper {
  constructor(el) {
    this.el = el;
  }

  style(classes) {
    this.el.classList.add(...classes);
    return this;
  }

  getEl() {
    return this.el;
  }

  text(content) {
    this.el.textContent = content;
    return this;
  }

  appendTo(parent) {
    if (parent instanceof DOMWrapper) parent = parent.el;
    parent.appendChild(this.el);
    return this;
  }

  on(event, handler) {
    this.el.addEventListener(event, handler);
    return this;
  }

  off(event, handler) {
    this.el.removeEventListener(event, handler);
    return this;
  }

  getValue() {
    return typeof this.el.value === "string"
      ? this.el.value.toLowerCase()
      : this.el.value || null;
  }

  setValue(newValue) {
    this.el.value = newValue;
    return this;
  }

  disable() {
    this.el.disabled = true;
    return this;
  }
}

window.DOM = DOM;
