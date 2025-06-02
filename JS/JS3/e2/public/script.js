const $form = document.getElementById("form");
const $input = document.getElementById("file");
const $display = document.getElementById("display");

let serverResponse = null;

function readFile(file) {
  return new Promise((resolve, rejects) => {
    const reader = new FileReader();
    reader.addEventListener("load", (event) => {
      const result = event.target.result;
      console.log(result);
      fetch(result)
        .then((response) => response.text())
        .then((data) =>
          fetch("http://localhost:3000/sendFile", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ file: data }),
          })
            .then((response) => response.json())
            .then((data) => resolve(data))
            .catch(rejects)
        );
    });

    reader.addEventListener("progress", (event) => {
      if (event.loaded && event.total) {
        const percent = (event.loaded / event.total) * 100;
        console.log(`Progress: ${Math.round(percent)}`);
      }
    });
    reader.readAsDataURL(file);
  });
}

$form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const $input = document.getElementById("file");
  const file = $input.files[0];
  console.log(file);

  if (file) {
    if (file.name.includes(".txt")) {
      try {
        const { numValidos, numInvalidos } = await readFile(file);
        $display.innerHTML += `<p>Nueros validos: ${numValidos
          .sort((a, b) => a - b)
          .map((el) => el)}</p>`;
        $display.innerHTML += `<p>Nueros invalidos: ${numInvalidos
          .sort((a, b) => a - b)
          .map((el) => el)}</p>`;
        $display.innerHTML += `<p>Porcentaje de validos: ${
          numValidos.length / ((numValidos.length + numInvalidos.length) / 100)
        }%</p>`;
        $display.innerHTML += `<p>Cantidad de validos : ${numValidos.length}</p>`;
        $display.innerHTML += `<p>Cantidad de validos : ${numInvalidos.length}</p>`;
      } catch (err) {
        console.log(err);
      }
    }
  }
});
