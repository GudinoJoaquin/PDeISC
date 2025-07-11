//Clase DOM para crear instancias de DOMWrapper con los elemntos
export class $ {
  //Metodo para crear elementos
  static create(tag) {
    const el = document.createElement(tag);
    return new DOM(el);
  }

  //Metodo para convertir un elemento a una instancia de DOM
  static wrap(el) {
    return new DOM(el);
  }

  //Metodo para toamr elemento
  static get(selector) {
    const el = document.querySelector(selector);
    if (!el) throw new Error(`No se encontró el elemento: ${selector}`);
    return new DOM(el);
  }

  //Metodo para obtener varios elementos
  static getAll(selector) {
    const el = document.querySelectorAll(selector);
    if (!el) throw new Error(`No se encontro el elemento: ${selector}`);
    return new DOM(el);
  }
}

//Clase DOMWrapper donde se definen metodos para manipular el DOM mas comodamente
class DOM {
  //Constructor para instanciar la clase
  constructor(el) {
    this.el = el;
  }

  //Metodo style para estilar los elementos
  style(classes) {
    //Recibe un array de classNames como parametro y las aplica al elemento
    this.el.classList.add(...classes);
    return this; //Devuelve el mismo objeto para poder concatenar metodos --> el.style().text() por ejemplo
  }

  //Metodo para eliminar estilos de los elementos
  rmStyle(classes) {
    this.el.classList.remove(...classes);
    return this;
  }

  //Metodo para obtener el elemnto html, util para acceder a una propiedad o metodo que no este definida en la clase
  getEl() {
    return this.el;
  }

  //Metodo para ingresar texto al elemento a travez de textContent
  text(content) {
    this.el.textContent = content;
    return this;
  }

  //Metodo para obtener el valor de textContent
  getText() {
    return this.el.textContent;
  }

  //Metodo para poder agregar los elementos creados el body del DOM u otros contenedores
  appendTo(parent) {
    if (parent instanceof DOMWrapper) parent = parent.el;
    parent.appendChild(this.el);
    return this;
  }

  //Metodo para escuchar eventos
  on(event, handler) {
    this.el.addEventListener(event, handler);
    return this;
  }

  //Metodo para eliminar la escucha de eventos
  off(event, handler) {
    this.el.removeEventListener(event, handler);
    return this;
  }

  //Metodo para obtener valores de los elementos, util para inputs
  getValue() {
    return typeof this.el.value === "string" //Si el valor es un string lo parsea a minuscula y sino lo deja como esta
      ? this.el.value.toLowerCase()
      : this.el.value || null;
  }

  //Metodo para settear valores en inputs
  setValue(newValue) {
    this.el.value = newValue;
    return this;
  }

  //Metodo para settear atributos a elementos html, por ejemplo --> <div data-attribute="attribute"></div>
  setAttribute(attributes) {
    Object.entries(attributes).forEach(([attr, value]) => {
      //Transforma la entrada en un objeto literal y recorre cada objeto que tenga dentro con sus claves y valores
      this.el.setAttribute(attr, value);
    });
    return this;
  }
}
