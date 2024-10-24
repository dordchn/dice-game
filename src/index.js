import { changeScreen, SCREENS } from "./screens.js";
import { select } from "./utils.js";
import { renderDice } from './renderer.js'
import { generateDice } from "./generateDice.js";

const startBtn = select('#start-btn');
const backBtn = select('#back-btn');
const kubi = select('#kubi')
const canvas = select('canvas');

startBtn.addEventListener('click', () => {
  changeScreen(SCREENS.game);
  randomizeDice()
});

backBtn.addEventListener('click', () => {
  changeScreen(SCREENS.intro);
})

kubi.addEventListener("animationend", (event) => {
  kubi.classList.add('swing')
});

/************ Game (todo: arrange code) ************/

let kubiPos
let level = 0
let dieSize = 150
canvas.addEventListener('click', evt => {
  if (!kubiPos) { return }
  const d = Math.hypot(evt.offsetX - kubiPos.x, evt.offsetY - kubiPos.y);
  if (d < dieSize / 2) {
    level++;
    dieSize *= 0.9;
    randomizeDice()
  }
})

async function randomizeDice() {
  canvas.width = canvas.clientWidth
  canvas.height = canvas.clientHeight

  const { dice, kubiPos: generateKubiPos } = generateDice(dieSize, canvas.width, canvas.height)
  console.log(dice)
  kubiPos = generateKubiPos
  await renderDice(canvas, dice, dieSize)
}
