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

async function randomizeDice() {
  canvas.width = canvas.clientWidth
  canvas.height = canvas.clientHeight
  const dieSize = 100;

  const dice = generateDice(dieSize, canvas.width, canvas.height)
  renderDice(canvas, dice, dieSize)
}
