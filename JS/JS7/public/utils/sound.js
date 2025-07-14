export function playSound(key) {
  const sound = new Audio(`../sound/${key}.mp3`);
  sound.currentTime = 0;
  const delay = 100;

  if (delay > 0) {
    setTimeout(() => sound.play(), delay);
  } else {
    sound.play();
  }
}