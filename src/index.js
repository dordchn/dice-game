import { changeScreen, SCREENS } from "./screens.js";
import { select } from "./utils.js";
import { renderDice } from './renderer.js'
import { generateDice } from "./generateDice.js";
import { loadAssets } from "./assets.js";

const INITIAL_DIE_SIZE = 150

const startBtn = select('#start-btn');
const backBtn = select('#back-btn');
const kubi = select('#kubi')
const canvas = select('canvas');

let level, dieSize, kubiPos

window.addEventListener('load', async () => {
  loadAssets()

  setupIntro()
  setupGame()
})

function setupIntro() {
  startBtn.addEventListener('click', () => {
    changeScreen(SCREENS.game);
    level = 1;
    dieSize = INITIAL_DIE_SIZE;
    randomizeDice()
  });

  kubi.addEventListener("animationend", (event) => {
    kubi.classList.add('swing')
  });
}

function setupGame() {
  backBtn.addEventListener('click', () => {
    changeScreen(SCREENS.intro);
  })

  canvas.addEventListener('click', evt => {
    if (!kubiPos) { return }
    const d = Math.hypot(evt.offsetX - kubiPos.x, evt.offsetY - kubiPos.y);
    if (d < dieSize / 2) {
      if (level == 16) {
        alert("You've completed the game!")
        changeScreen(SCREENS.intro);
      } else {
        level++;
        dieSize *= 0.9;
        randomizeDice()
      }
    }
  })
}

function randomizeDice() {
  canvas.width = canvas.clientWidth
  canvas.height = canvas.clientHeight
  const { dice, kubiPos: generateKubiPos } = generateDice(dieSize, canvas.width, canvas.height)
  kubiPos = generateKubiPos
  renderDice(canvas, dice, dieSize)
}
