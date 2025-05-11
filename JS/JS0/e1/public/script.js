const $lista = document.getElementById("lista");

async function fetchData() {
  try {
    const response = await fetch("http://localhost:3000/obtener");
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      $lista.innerHTML = data
        .map(
          (user) =>
            `<li class="border-b-2 border-violet-300 px-6 py-2 text-center w-full">${user.name}, ${user.surname}</li>`
        )
        .join("");
    }
    console.log(response);
  } catch (err) {
    console.log(err);
  }
}

async function sendData(data) {
  try {
    const response = await fetch("/enviar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        surname: data.surname,
      }),
    });
    if (response.ok) {
      console.log(response);
    }
  } catch (err) {
    console.log(err);
  }
}

document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();

  const $name = document.getElementById("name").value;
  const $surname = document.getElementById("surname").value;

  const data = { name: $name, surname: $surname };

  sendData(data);

  fetchData();
});

fetchData();
