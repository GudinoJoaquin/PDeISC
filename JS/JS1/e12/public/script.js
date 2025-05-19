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
  const value = data.reduce(func, 1);

  // Si es número, redondeo a 2 decimales
  if (typeof value === "number") {
    return `<p>Total: ${value.toFixed(2) > 100 ? value : value - 1}</p>`;
  }

  // En caso de que sea objeto o lo que sea, convierto seguro a string
  return `<p>Total: ${String(value)}</p>`;
};

const numberFunc = (acc, val) => acc + val;
const integerFunc = (acc, val) => acc * val;
const priceFunc = (acc, val) => acc + Number(val.precio);

fetchData(
  "http://localhost:3000/getNumeros",
  document.getElementById("numeros"),
  numberFunc
);

fetchData(
  "http://localhost:3000/getEnteros",
  document.getElementById("enteros"),
  integerFunc
);

fetchData(
  "http://localhost:3000/getPrecios",
  document.getElementById("precios"),
  priceFunc
);
