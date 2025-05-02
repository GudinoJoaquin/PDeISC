//Función para navegar entre paginas
function navegar(pagina) {
  window.open(pagina, "_self");
}

//Funcion para el componente 1
function componente1() {
  document.addEventListener("DOMContentLoaded", () => { // <- Cuando el DOM ya esta cargado
    //Tomamos los controladores y el display para los eventos
    const $input = document.getElementById("name") || "";
    const $cleanerBtn = document.getElementById("cleanerBtn");
    const $display = document.getElementById("display");

    //Escucha un evento de input en el input
    $input.addEventListener("input", (e) => {
      const text = `${e.target.value}`.toLowerCase(); // <- Toma el valor del evento y lo transforma a minuscula

      // Inicializar conteo de vocales
      const conteo = { a: 0, e: 0, i: 0, o: 0, u: 0 };

      // Recorrer cada letra y contar
      for (const letra of text) {
        if (conteo.hasOwnProperty(letra)) {
          conteo[letra]++;
        }
      }

      // Limpiar el contenido de la tabla
      $display.innerHTML = '';

      // Mostrar resultados en formato tabla
      for (const [vocal, cantidad] of Object.entries(conteo)) {
        $display.innerHTML += `
          <tr>
            <td class="px-4 py-2 border-b">${vocal.toUpperCase()}</td>
            <td class="px-4 py-2 border-b">${cantidad}</td>
          </tr>
        `;
      }
    });

    //Escucha el boton de click en el boton y reinicia los valores
    $cleanerBtn.addEventListener("click", () => {
      $input.value = "";
      $display.innerHTML = "";
    });
  });
}

//Funcion del componente 2
function componente2() {
  document.addEventListener("DOMContentLoaded", () => {
    // Define un abecedario
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    const display = document.getElementById("display");
    const keyDisplay = document.getElementById("key");
    const scoreDisplay = document.getElementById("score");
    const timerDisplay = document.getElementById("timer");

    //Controladores de puntuacion, tiempo, etc
    let score = 0;
    let timeLeft = 10;
    let currentLetter = "";
    let playing = true;

    //Obtiene una letra random
    const getRandomLetter = () => {
      const index = Math.floor(Math.random() * alphabet.length);
      return alphabet[index];
    };

    //Actualiza el display para mostrar la letra a teclear
    const nextLetter = () => {
      currentLetter = getRandomLetter();
      display.textContent = currentLetter;
    };

    //Define el fin del juego
    const endGame = () => {
      playing = false;
      display.textContent = "🎉";
      document.removeEventListener("keypress", handleKeyPress); //<- Remueve la escucha del evento
    };

    //Controlador para el tecleo, verifica si la letra es igual a la tecla presionada
    const handleKeyPress = (e) => {
      if (!playing) return;

      keyDisplay.textContent = e.key;

      if (e.key.toLowerCase() === currentLetter) {
        score++;
        scoreDisplay.textContent = score;
      }

      nextLetter();
    };

    //Reinicia los controladores para volver a empezar
    score = 0;
    timeLeft = 10;
    playing = true;
    scoreDisplay.textContent = score;
    keyDisplay.textContent = "-";
    timerDisplay.textContent = timeLeft;
    nextLetter();

    document.addEventListener("keypress", handleKeyPress);

    //Intervalo para el contador regresivo
    const countdown = setInterval(() => {
      timeLeft--;
      timerDisplay.textContent = timeLeft;

      if (timeLeft <= 0) {
        clearInterval(countdown);
        endGame();
      }
    }, 1000);
  });
}

//Funcion del componente 3
function componente3(color) {
  document.body.style.backgroundColor = color; // <- Cambia el color de fondo
}

//Funcion del componente 4

function componente4() {
  document.addEventListener("DOMContentLoaded", () => {
    //Escucha el evento de resize en la ventana y muestra la altura y ancho de la ventana en tiempo real
    const $info = document.getElementById("info");
    $info.textContent = `${window.innerWidth}x${window.innerHeight}`;
    window.addEventListener("resize", () => {
      $info.textContent = `${window.innerWidth}x${window.innerHeight}`;
    });
  });
}

//Funcion del componente 5
function componente5() {
  document.addEventListener("DOMContentLoaded", () => {
    const $indicator = document.getElementById("scroll-indicator");

    //Toma el porcentaje de scroll
    function actualizarPorcentajeScroll() {
      const scrollTop = window.scrollY; //Dfine donde esta el scroll
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight; //Obtiene cuando de la pagina se puede scrollear
      const porcentaje = Math.round((scrollTop / scrollHeight) * 100); //Saca el porcentaje
      $indicator.textContent = `${porcentaje ? porcentaje : "0"}%`; //Lo muestra en el indicador
    }

    window.addEventListener("scroll", actualizarPorcentajeScroll);
    window.addEventListener("load", actualizarPorcentajeScroll);
  });
}

componente1();
componente2();
componente4();
componente5();
