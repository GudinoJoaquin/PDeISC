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

async function fetchEnteros() {
  try {
    const response = await fetch("http://localhost:3000/getEnteros", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "dffjonfnovwnovwfnovfjnodfwkmofmp",
      },
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      const $enteros = document.getElementById("enteros");
      $enteros.innerHTML = data.map((entero) => `<p>${entero}</p>`);
    }
  } catch (err) {
    console.log(err);
  }
}

async function fetchMensajes() {
  try {
    const response = await fetch("http://localhost:3000/getMensajes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "dffjonfnovwnovwfnovfjnodfwkmofmp",
      },
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      const $mensajes = document.getElementById("mensajes");
      $mensajes.innerHTML = data.map((mensaje) => `<p>${mensaje}</p>`);
    }
  } catch (err) {
    console.log(err);
  }
}

async function fetchClientes() {
  try {
    const response = await fetch("http://localhost:3000/getClientes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "dffjonfnovwnovwfnovfjnodfwkmofmp",
      },
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      const $clientes = document.getElementById("clientes");
      $clientes.innerHTML = data.map((cliente) => `<p>${cliente}</p>`);
    }
  } catch (err) {
    console.log(err);
  }
}

document.getElementById("deleteEnteroBtn").addEventListener("click", () => {
  deleteData("http://localhost:3000/deleteEntero");
  fetchEnteros();
});
fetchEnteros();

document.getElementById("deleteMensajeBtn").addEventListener("click", () => {
  deleteData("http://localhost:3000/deleteMensaje");
  fetchMensajes();
});
fetchMensajes();

document.getElementById("deleteClienteBtn").addEventListener("click", () => {
  deleteData("http://localhost:3000/deleteCliente");
  fetchClientes();
});
fetchClientes();
