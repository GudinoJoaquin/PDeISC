//Recuperamos elementos del DOM
const $form = document.getElementById("form");
const $input = document.getElementById("file");
const $display = document.getElementById("display");

//Funcion para leer el archivo
function readFile(file) {
  //Devuelve una promesa
  return new Promise((resolve, rejects) => {
    //Instanciamos un FileReader
    const reader = new FileReader();
    //Cuando el archivo termina de cargarse
    reader.addEventListener("load", (event) => {
      //Tomamos el resultado del archivo y se muestra
      const result = event.target.result;
      console.log(result);
      //Fetch al link del resultado para obtener el texto del archivo
      fetch(result)
        .then((response) => response.text())
        .then((data) =>
          //Se toma el texto y se envia al servidor
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

    //Mientras se esta leyendo el archivo mostrar el porcentaje de cargado
    reader.addEventListener("progress", (event) => {
      if (event.loaded && event.total) {
        const percent = (event.loaded / event.total) * 100;
        console.log(`Progress: ${Math.round(percent)}`);
      }
    });
    reader.readAsDataURL(file);
  });
}

//Al enviar el formulario
$form.addEventListener("submit", async (e) => {
  //Prevenir que se recargue la pagina
  e.preventDefault();

  //Tomar el input y el archivo
  const $input = document.getElementById("file");
  const file = $input.files[0];
  console.log(file);

  //Si hay archivo y es de tipo .txt
  if (file) {
    if (file.name.includes(".txt")) {
      try {
        //Llama a la funcion readFile con el archivo y recupera los numeros validos y los no validos
        const { numValidos, numInvalidos } = await readFile(file);
        //Muestra toda la infromación pertinente en pantalla
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
