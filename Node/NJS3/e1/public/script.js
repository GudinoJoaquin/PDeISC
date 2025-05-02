//Declaramos variables de los elementos
let h1Element = null;
let imgElement = null;

//Funcion para agregar el h1
function agregarH1() {
  const $addH1Btn = document.getElementById("addH1Btn"); // <- Se obtiene el boton por su id

  //Si el elemento no existe
  if (!h1Element) {
    h1Element = document.createElement("h1"); // <- Crea un elemento h1
    h1Element.textContent = "Hola mundo"; // <- El agrega el texto Hola mundo
    h1Element.id = "h1-content"; // <- Le agrega un ID
    h1Element.className = "text-3xl font-bold mt-4 text-center text-gray-800"; // <- Le agrega className (Para el estilo con TailwindCSS)
    document.body.appendChild(h1Element); // <- Agrega el elemento h1 al body del documento
    $addH1Btn.textContent = "Eliminar H1"; // <- Cambia el texto del boton para eliminar el h1
  } else {
    document.body.removeChild(h1Element); // <- Elimina el h1 del body del documento
    h1Element = null; // <- Redefine la variable como null para poder repetir la creacion del elemento
    $addH1Btn.textContent = "Agregar H1"; // <- Cambia el texto del boton de nuevo a Agregar
  }
}

function cambiarH1() {
  if (h1Element) {
    h1Element.textContent =
      h1Element.textContent === "Hola mundo" ? "Chau mundo" : "Hola mundo"; //Operador ternario para cambiar el texto del h1
  }
}

function colorH1() {
  if (h1Element) {
    h1Element.style.color = h1Element.style.color === "red" ? "black" : "red"; //Operador ternario para cambiar el color del h1
  }
}


function agregarImg() {
  const $addImgBtn = document.querySelector("button[onclick='agregarImg()']");

  if (!imgElement) {
    imgElement = document.createElement("img");
    imgElement.id = "imagen";
    imgElement.src = "https://placehold.co/600x400"; // <- A la imagen agregada le agrega el siguiente link al atributo src
    imgElement.className = "mt-4 rounded shadow-md";
    document.body.appendChild(imgElement);
    $addImgBtn.textContent = "Eliminar imagen";
  } else {
    document.body.removeChild(imgElement);
    imgElement = null;
    $addImgBtn.textContent = "Agregar imagen";
  }
}

function cambiarImg() {
  if (imgElement) {
    imgElement.src = imgElement.src.includes("placehold.co")
      ? "./img/mount-fuji-at-kawaguchi-lake.webp"
      : "https://placehold.co/600x400";
  }
}

function resizeImg() {
  if (imgElement) {
    const isSmall = imgElement.style.width === "100px";
    imgElement.style.width = isSmall ? "600px" : "100px";
    imgElement.style.height = isSmall ? "400px" : "100px";
  }
}
