export const select = (selector) => document.querySelector(selector);

export const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export const loadImage = (src) =>
  new Promise((res) => {
    const img = new Image();
    img.src = src;
    img.onload = () => res(img);
  });

export function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function formatTime(dt) {
  const min = Math.floor(dt / 60)
    .toString()
    .padStart(2, "0");
  const sec = Math.floor(dt % 60)
    .toString()
    .padStart(2, "0");
  return min + ":" + sec;
}
