import { changeScreen, SCREENS } from "./screens.js";
import { select } from "./utils.js";
import { renderDice } from './renderer.js'
import { generateDice } from "./generateDice.js";

const INITIAL_DIE_SIZE = 150

let kubiPos
let level = 0
let dieSize = INITIAL_DIE_SIZE

const startBtn = select('#start-btn');
const backBtn = select('#back-btn');
const kubi = select('#kubi')
const canvas = select('canvas');

startBtn.addEventListener('click', () => {
  changeScreen(SCREENS.game);
  level = 0;
  dieSize = INITIAL_DIE_SIZE;
  randomizeDice()
});

backBtn.addEventListener('click', () => {
  changeScreen(SCREENS.intro);
})

kubi.addEventListener("animationend", (event) => {
  kubi.classList.add('swing')
});

/************ Game (todo: arrange code) ************/

canvas.addEventListener('click', evt => {
  if (!kubiPos) { return }
  const d = Math.hypot(evt.offsetX - kubiPos.x, evt.offsetY - kubiPos.y);
  if (d < dieSize / 2) {
    if (level == 15) {
      alert("You've completed the game!")
      level = 0;
      dieSize = INITIAL_DIE_SIZE;
    } else {
      level++;
      dieSize *= 0.9;
    }
    randomizeDice()
  }
})

async function randomizeDice() {
  canvas.width = canvas.clientWidth
  canvas.height = canvas.clientHeight

  const { dice, kubiPos: generateKubiPos } = generateDice(dieSize, canvas.width, canvas.height)
  kubiPos = generateKubiPos
  await renderDice(canvas, dice, dieSize)
}
