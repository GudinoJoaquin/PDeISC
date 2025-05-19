async function fetchData(endpoint, HTMLDisplay, func) {
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
      console.log(data);
      HTMLDisplay.innerHTML = generateList(data, func);
    }
  } catch (err) {
    console.log(err);
  }
}

const generateList = (data, func) => {
  const newArray = data.filter((e) => func(e));
  const html = newArray.map((e) => {
    if (typeof e === "object") {
      return `<p>${e.nombre}</p>`;
    } else {
      return `<p>${e}</p>`;
    }
  });
  return html.join("");
};

const numberFunc = (e) => e > 10;
const wordFunc = (e) => e.length > 5;
const userFunc = (e) => e.activo === true;

fetchData(
  "http://localhost:3000/getNumeros",
  document.getElementById("numeros"),
  numberFunc
);

fetchData(
  "http://localhost:3000/getPalabras",
  document.getElementById("palabras"),
  wordFunc
);

fetchData(
  "http://localhost:3000/getUsuarios",
  document.getElementById("usuarios"),
  userFunc
);
