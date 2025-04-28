function agregarH1() {
  let $h1 = null;
  const $addH1Btn = document.getElementById("addH1Btn");
  if (!$h1) {
    $h1 = document.createElement("h1");
    $h1.textContent = "Hola mundo";
    $h1.id = "h1-content";
    document.body.appendChild($h1);
    $addH1Btn.textContent = "Eliminar H1";
  } else {
    document.body.remove($h1);
    $addH1Btn.textContent = "Agregar H1";
  }
}

function cambiarH1() {
  const $h1 = document.getElementById("h1-content");
  $h1.textContent = "Chau mundo";
}

function colorH1() {
  const $h1 = document.getElementById("h1-content");
  $h1.style.color = "red";
}

function agregarImg() {
  const $img = document.createElement("img");
  $img.id = "imagen";
  $img.src = "https://placehold.co/600x400";
  document.body.appendChild($img);
}

function cambiarImg() {
  const $img = document.getElementById("imagen");
  $img.src = "./img/mount-fuji-at-kawaguchi-lake.webp";
}

function resizeImg() {
  const $img = document.getElementById("imagen");
  $img.style.width = "100px";
  $img.style.height = "100px";
}
