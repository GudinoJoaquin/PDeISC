function navegar(pagina) {
  window.open(pagina, "_self");
}

function componente1() {
  const $input = document.getElementById("name");
  const $cleanerBtn = document.getElementById("cleanerBtn");
  const $display = document.getElementById("display");

  $input.addEventListener("input", () => {
    $display.textContent = `Texto escrito: ${$input.value}`;
  });
  $cleanerBtn.addEventListener("click", () => {
    $input.value = "";
    $display.textContent = "";
  });
}

function componente2() {
  const abc = "abcdefghijklmnopqrstuvwxyz";

  const getKey = () => {
    let key = abc[Math.round(Math.random() * 10)];
    return key;
  };

  document.addEventListener("keypress", (e) => {
    console.log(getKey());
  });
}

componente1();
componente2();
