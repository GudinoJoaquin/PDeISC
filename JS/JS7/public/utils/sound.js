//Funcion para reproducir sonido
export function playSound(key) {
  //Reproduce un sonido en base a la tecla seleccionada
  const sound = new Audio(`../sounds/${key}.mp3`);
  sound.currentTime = 0;
  const delay = 100;

  //Se le agrega un delay de 0.1 segundos
  if (delay > 0) {
    setTimeout(() => sound.play(), delay);
  } else {
    sound.play();
  }
}