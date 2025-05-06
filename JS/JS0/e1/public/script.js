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
      .map((user) => `<li>${user.name}, ${user.surname}</li>`)
      .join("");
  });
}

document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();

  const $name = document.getElementById("name").value;
  const $surname = document.getElementById("surname").value;

  const formData = new URLSearchParams();
  formData.append("name", $name);
  formData.append("surname", $surname);

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
