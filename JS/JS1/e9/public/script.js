async function fetchData(endpoint, HTMLDisplay, formatFn) {
  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "dffjonfnovwnovwfnovfjnodfwkmofmp",
      },
    });

    if (response.ok) {
      const data = await response.json();
      HTMLDisplay.innerHTML = generateList(data, formatFn);
    }
  } catch (err) {
    console.log(err);
  }
}

// Función generadora de HTML genérica
function generateList(data, formatFn) {
  let html = "";
  data.forEach((item) => {
    html += formatFn(item);
  });
  return html;
}

// Formatos personalizados
const nameFormat = (name) => `<li>Hola, ${name}</li>`;
const numberFormat = (num) => `<li>${num} x2 = ${num * 2}</li>`;
const personFormat = (p) => `<li>${p.nombre}, ${p.edad} años</li>`;

// Ejecuciones
fetchData(
  "http://localhost:3000/getNombres",
  document.getElementById("nombres"),
  nameFormat
);

fetchData(
  "http://localhost:3000/getNumeros",
  document.getElementById("numeros"),
  numberFormat
);

fetchData(
  "http://localhost:3000/getPersonas",
  document.getElementById("personas"),
  personFormat
);
