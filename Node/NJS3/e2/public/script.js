function navegar(pagina) {
  window.open(pagina, "_self");
}

function componente1() {
  document.addEventListener("DOMContentLoaded", () => {
    const $input = document.getElementById("name") || "";
    const $cleanerBtn = document.getElementById("cleanerBtn");
    const $display = document.getElementById("display");

    $input.addEventListener("input", (e) => {
      const text = `${e.target.value}`.toLowerCase();

      // Inicializar conteo de vocales
      const conteo = { a: 0, e: 0, i: 0, o: 0, u: 0 };

      // Recorrer cada letra y contar
      for (const letra of text) {
        if (conteo.hasOwnProperty(letra)) {
          conteo[letra]++;
        }
      }

      // Mostrar resultados
      $display.textContent = `
        Texto escrito: ${text}
        A: ${conteo.a} | E: ${conteo.e} | I: ${conteo.i} | O: ${conteo.o} | U: ${conteo.u}
      `;
    });

    $cleanerBtn.addEventListener("click", () => {
      $input.value = "";
      $display.textContent = "";
    });
  });
}

function componente2() {
  document.addEventListener("DOMContentLoaded", () => {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    const display = document.getElementById("display");
    const keyDisplay = document.getElementById("key");
    const scoreDisplay = document.getElementById("score");
    const timerDisplay = document.getElementById("timer");

    let score = 0;
    let timeLeft = 10;
    let currentLetter = "";
    let playing = true;

    const getRandomLetter = () => {
      const index = Math.floor(Math.random() * alphabet.length);
      return alphabet[index];
    };

    const nextLetter = () => {
      currentLetter = getRandomLetter();
      display.textContent = currentLetter;
    };

    const endGame = () => {
      playing = false;
      display.textContent = "🎉";
      document.removeEventListener("keypress", handleKeyPress);
    };

    const handleKeyPress = (e) => {
      if (!playing) return;

      keyDisplay.textContent = e.key;

      if (e.key.toLowerCase() === currentLetter) {
        score++;
        scoreDisplay.textContent = score;
      }

      nextLetter();
    };

    score = 0;
    timeLeft = 10;
    playing = true;
    scoreDisplay.textContent = score;
    keyDisplay.textContent = "-";
    timerDisplay.textContent = timeLeft;
    nextLetter();

    document.addEventListener("keypress", handleKeyPress);

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

function componente3(color) {
  document.body.style.backgroundColor = color;
}

function componente4() {
  document.addEventListener("DOMContentLoaded", () => {
    const $info = document.getElementById("info");
    $info.textContent = `${window.innerWidth}x${window.innerHeight}`;
    window.addEventListener("resize", () => {
      $info.textContent = `${window.innerWidth}x${window.innerHeight}`;
    });
  });
}

function componente5() {
  document.addEventListener("DOMContentLoaded", () => {
    const $indicator = document.getElementById("scroll-indicator");

    function actualizarPorcentajeScroll() {
      const scrollTop = window.scrollY;
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const porcentaje = Math.round((scrollTop / scrollHeight) * 100);
      $indicator.textContent = `${porcentaje ? porcentaje : "0"}%`;
    }

    window.addEventListener("scroll", actualizarPorcentajeScroll);
    window.addEventListener("load", actualizarPorcentajeScroll);
  });
}

componente1();
componente2();
// componente3();
componente4();
componente5();
