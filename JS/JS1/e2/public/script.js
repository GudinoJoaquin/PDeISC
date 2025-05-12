async function fetchAnimales() {
  try {
    const response = await fetch("http://localhost:3000/getAnimales", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "dffjonfnovwnovwfnovfjnodfwkmofmp",
      },
    });

    if (response.ok) {
      console.log(response);
      const data = await response.json();
      console.log(data);
      const $animales = document.getElementById("animales");
      $animales.innerHTML = data.map((animal) => `<p>${animal}</p>`);
    }
  } catch (err) {
    console.log(err);
  }
}

async function fetchCompras() {
  try {
    const response = await fetch("http://localhost:3000/getCompras", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "dffjonfnovwnovwfnovfjnodfwkmofmp",
      },
    });

    if (response.ok) {
      console.log(response);
      const data = await response.json();
      console.log(data);
      const $compras = document.getElementById("compras");
      $compras.innerHTML = data.map((compra) => `<p>${compra}</p>`);
    }
  } catch (err) {
    console.log(err);
  }
}

async function fetchArray() {
  try {
    const response = await fetch("http://localhost:3000/getArray", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "dffjonfnovwnovwfnovfjnodfwkmofmp",
      },
    });

    if (response.ok) {
      console.log(response);
      const data = await response.json();
      console.log(data);
      const $arrays = document.getElementById("arrays");
      $arrays.innerHTML = data.map((numero) => `<p>${numero}</p>`);
    }
  } catch (err) {
    console.log(err);
  }
}

async function deleteData(endpoint) {
  try {
    const response = await fetch(endpoint, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "dffjonfnovwnovwfnovfjnodfwkmofmp",
      },
    });

    if (response.ok) {
      console.log(response);
    }
  } catch (err) {
    console.log(err);
  }
}

async function deleteCompra() {
  try {
    const response = await fetch("http://localhost:3000/deleteCompra", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "dffjonfnovwnovwfnovfjnodfwkmofmp",
      },
    });

    if (response.ok) {
      console.log(response);
      const data = await response.json();
      console.log(data);
      const $eliminado = document.getElementById("eliminado");
      $eliminado.textContent = `Producto eliminado: ${data}`;
    }
  } catch (err) {
    console.log(err);
  }
}

fetchAnimales();
fetchCompras();
fetchArray();
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("deleteAnimalBtn").addEventListener("click", () => {
    deleteData("http://localhost:3000/deleteAnimal");
    fetchAnimales();
  });

  document.getElementById("deleteCompraBtn").addEventListener("click", () => {
    deleteCompra();
    fetchCompras();
  });

  document.getElementById("deleteArrayBtn").addEventListener("click", () => {
    deleteData("http://localhost:3000/deleteArray");
    fetchArray();
  });
});
