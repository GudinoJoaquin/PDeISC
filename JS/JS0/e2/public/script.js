const $lista = document.getElementById("lista");
let data = null;

async function fetchData() {
  try {
    const response = await fetch("http://localhost:3000/obtener");
    if (response.ok) {
      data = await response.json();
      console.log(data);
    }
    console.log(response);
  } catch (err) {
    console.log(err);
  }
  data.map((user) => {
    $lista.innerHTML = data
      .map(
        (user) =>
          `<li>${user.jugador}, ${user.nacionalidad}, ${user.precio}, ${user.posicion}</li>`
      )
      .join("");
  });
}

document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();

  const $jugador = document.getElementById("jugador").value;
  const $nacionalidad = document.getElementById("nacionalidad").value;
  const $posicion = document.getElementById("posicion").value;
  const $precio = document.getElementById("precio").value;

  const formData = new URLSearchParams();
  formData.append("jugador", $jugador);
  formData.append("nacionalidad", $nacionalidad);
  formData.append("precio", $precio);
  formData.append("posicion", $posicion);

  fetch("/sendData", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData.toString(),
  });

  fetchData();
});

fetchData();

// document.getElementById("btn").addEventListener("click", fetchData);
