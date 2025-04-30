const fetchIndex = async () => {
  let hijos = [];
  try {
    const response = await fetch("/e2");
    const data = await response.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(data, "text/html");

    hijos[0] = doc.body.children.length;
    hijos[1] = doc.body.children;
  } catch (err) {
    console.log(err);
    hijos = null;
  }
  return hijos;
};

document.addEventListener("DOMContentLoaded", async () => {
  const $btn = document.getElementById("btn");
  const $hijos = document.getElementById("hijos");
  const $nodos = document.getElementById("nodos");
  const data = await fetchIndex();

  const cantidadHijos = data[0]
  const nodos = data[1]

  console.log(nodos)

  $hijos.textContent += `${cantidadHijos} hijos`;

  for (const nodo of nodos){
    $nodos.innerHTML += `<li>${nodo.localName}</li>`
  }

});
