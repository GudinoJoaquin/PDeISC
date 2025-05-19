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
  const newArray = data.map((e) => func(e));
  const html = newArray.map((e) => `<p>${e}</p>`);
  return html;
};

const numberFunc = (e) => e * 3;
const wordFunc = (e) => e.toUpperCase();
const priceFunc = (e) => e * 0.21;

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
  "http://localhost:3000/getPrecios",
  document.getElementById("precios"),
  priceFunc
);
