import { changeScreen, SCREENS } from "./screens.js";
import { delay, select } from "./utils.js";
import { renderDice } from './renderer.js'
import { generateDice } from "./generateDice.js";
import { loadAssets } from "./assets.js";

const INITIAL_DIE_SIZE = 150

const startBtn = select('#start-btn');
const backBtn = select('#back-btn');
const kubi = select('#kubi')
const canvas = select('canvas');
const foundPopup = select('.found-popup');

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
  const levelWinMessage = [
    'וווהוו!', 'מצאת אותי', 'בופ',
    'נייס', 'דייס!', 'קוב קוב קוב',
    'הנני כאן!', '20/20!', 'זה קצת כאב',
    'מרשים!', 'כבר??', 'כל הכבוד!',
    'הנה אני', 'רק עוד קצת', 'הו בוי'
  ]
  backBtn.addEventListener('click', () => {
    changeScreen(SCREENS.intro);
  })

  canvas.addEventListener('click', async evt => {
    if (!kubiPos) { return }
    const d = Math.hypot(evt.offsetX - kubiPos.x, evt.offsetY - kubiPos.y);
    if (d < dieSize / 2) {
      if (level == 15) {
        alert("You've completed the game!")
        changeScreen(SCREENS.intro);
      } else {
        // show popup
        foundPopup.style.top = kubiPos.y - dieSize / 4
        foundPopup.style.left = kubiPos.x
        foundPopup.textContent = levelWinMessage[level - 1]
        foundPopup.classList.add('pop')
        await delay(1000);
        foundPopup.classList.remove('pop')
        // level up
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
