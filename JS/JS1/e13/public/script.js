const API_KEY = "dffjonfnovwnovwfnovfjnodfwkmofmp";

const endpoints = {
  numeros: "http://localhost:3000/getNumeros",
  palabras: "http://localhost:3000/getPalabras",
  personas: "http://localhost:3000/getPersonas",
};

let numeros = [];
let palabras = [];
let personas = [];

// Fetch genérico
async function fetchData(url) {
  const res = await fetch(url, {
    headers: { "x-api-key": API_KEY },
  });
  if (!res.ok) throw new Error("Error en la petición");
  return await res.json();
}

// Mostrar array en el div con formato simple, usando flex-wrap para que se vean separados
function mostrarArray(containerId, arr, formatter) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";
  arr.forEach((item) => {
    const span = document.createElement("span");
    span.textContent = formatter ? formatter(item) : item;
    // Para que se vea parecido a como tienes con flex-wrap y gap, añadimos estilo:
    span.className = "bg-teal-100 border-2 border-teal-500 rounded-sm px-2 py-1 shadow-sm";
    container.appendChild(span);
  });
}

// Ordenar arrays
const ordenarNumeros = (arr) => [...arr].sort((a, b) => a - b);
const ordenarPalabras = (arr) => [...arr].sort((a, b) => a.localeCompare(b));
const ordenarPersonas = (arr) => [...arr].sort((a, b) => a.edad - b.edad);

// Inicializar y mostrar sin ordenar
async function init() {
  try {
    numeros = await fetchData(endpoints.numeros);
    palabras = await fetchData(endpoints.palabras);
    personas = await fetchData(endpoints.personas);

    mostrarArray("numeros", numeros);
    mostrarArray("palabras", palabras);
    mostrarArray("personas", personas, (p) => `${p.nombre} (${p.edad} años)`);
  } catch (e) {
    console.error(e);
  }
}

init();

// Eventos de los botones para ordenar y mostrar
document.getElementById("btn-ordenar-numeros").addEventListener("click", () => {
  mostrarArray("numeros", ordenarNumeros(numeros));
});

document.getElementById("btn-ordenar-palabras").addEventListener("click", () => {
  mostrarArray("palabras", ordenarPalabras(palabras));
});

document.getElementById("btn-ordenar-personas").addEventListener("click", () => {
  mostrarArray("personas", ordenarPersonas(personas), (p) => `${p.nombre} (${p.edad} años)`);
});
