import { $ as DOM } from "./dom.js";

const $leaderboardBtn = DOM.get("#leaderboardBtn");

const $leaderboard = DOM.get("#leaderboard").getEl();
const $saveBtn = DOM.get("#saveTable");
const $leaderboardMenu = DOM.get("#leaderboardMenu").getEl();
const $keyboard = DOM.get("#keyboard").getEl();
const $game = DOM.get("#game").getEl();
const $table = DOM.get("#table").getEl();
let shown = false;

const username = localStorage.getItem("username");

$leaderboardBtn.on("click", () => {
  if (!shown) {
    gsap.to($game, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        $game.classList.add("hidden");
        gsap.to($leaderboard, {
          opacity: 1,
          onStart: () => {
            $leaderboard.classList.remove("hidden");
            $keyboard.classList.add("hidden");
            $leaderboardMenu.classList.add("mr-4");
          },
        });
        shown = true;
      },
    });

    getUser((data, response) => {
      console.log(data);
      $table.innerHTML = "";
      data.data.map((user, index) => {
        const date = formatDate(user.fecha);
        $table.innerHTML += `
      <tr class="${user.nombre === username && "bg-slate-300"}">
        <td class="px-4 py-2">${index + 1}</td>
        <td class="px-4 py-2">${user.nombre}</td>
        <td class="px-4 py-2">${user.puntos}</td>
        <td class="px-4 py-2">${date}</td>
      </tr>
    `;
      });
    });
  } else {
    gsap.to($leaderboard, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        $leaderboard.classList.add("hidden");
        gsap.to($game, {
          opacity: 1,
          onStart: () => {
            $game.classList.remove("hidden");
            $keyboard.classList.remove("hidden");
            $leaderboardMenu.classList.remove("mr-4");
            $leaderboardMenu.classList.add("mr-8");
          },
        });
        shown = false;
      },
    });
  }
});

async function getUser(callback) {
  try {
    const response = await fetch("https://ahorcado-api.vercel.app/users");
    const data = await response.json();
    callback(data, response);
  } catch (error) {
    console.log(error);
  }
}

function formatDate(fecha) {
  const date = new Date(fecha);
  const dia = String(date.getDate()).padStart(2, "0");
  const mes = String(date.getMonth() + 1).padStart(2, "0"); // Los meses empiezan en 0
  const año = date.getFullYear();
  const horas = String(date.getHours()).padStart(2, "0");
  const minutos = String(date.getMinutes()).padStart(2, "0");

  return `${dia}-${mes}-${año} ${horas}:${minutos}`;
}

$saveBtn.on("click", async () => {
  try {
    // Clonar leaderboard para eliminar botón y no enviarlo en PDF
    const clone = $leaderboard.cloneNode(true);
    const btnEnClone = clone.querySelector("#saveTable");
    if (btnEnClone) btnEnClone.remove();

    // Añadir el clon a un contenedor oculto para html2canvas pueda leerlo bien
    const container = document.createElement("div");
    container.style.position = "fixed";
    container.style.left = "-9999px";
    container.appendChild(clone);
    document.body.appendChild(container);

    // Esperar a que se agregue y renderice el DOM
    await new Promise((r) => setTimeout(r, 100));

    // Usamos html2canvas para capturar la tabla
    const canvas = await html2canvas(clone, {
      scale: 2, // mejor resolución
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");

    // Usamos jsPDF para generar PDF
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "a4",
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

    // Descargar PDF
    pdf.save("tabla.pdf");

    // Limpiar DOM
    document.body.removeChild(container);
  } catch (error) {
    console.error(error);
    alert("Error al generar el PDF");
  }
});

