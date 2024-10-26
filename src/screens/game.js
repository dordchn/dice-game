import { changeScreen, SCREENS } from "../screens.js";
import { delay, formatTime, select } from "../utils.js";
import { renderDice } from "../renderer.js";
import { generateDice } from "../generateDice.js";
import { updateWin } from "./win.js";

const INITIAL_DIE_SIZE = 150;
const NUM_OF_LEVELS = 15;
const LEVEL_WIN_MSG = [
  "וווהוו!",
  "מצאת אותי",
  "בופ",
  "נייס",
  "דייס!",
  "קוב קוב קוב",
  "הנני כאן!",
  "20/20",
  "זה קצת כאב",
  "מרשים!",
  "כבר??",
  "כל הכבוד!",
  "הנה אני",
  "רק עוד קצת",
  "מדהים!",
];

let level, dieSize, kubiPos, isLevelTransition;
let startTime, timer;

const backBtn = select("#game-back-btn");
const canvas = select("canvas");
const foundPopup = select(".found-popup");
const timeEl = select("#game-time");

export function setupGame() {
  backBtn.addEventListener("click", () => {
    if (isLevelTransition) {
      return;
    }
    changeScreen(SCREENS.intro);
  });

  canvas.addEventListener("click", async (evt) => {
    if (!kubiPos || isLevelTransition) {
      return;
    }
    const d = Math.hypot(evt.offsetX - kubiPos.x, evt.offsetY - kubiPos.y);
    if (d < dieSize / 2) {
      // show popup
      isLevelTransition = true; // prevent navigation
      foundPopup.style.top = kubiPos.y - dieSize / 4;
      foundPopup.style.left = kubiPos.x;
      foundPopup.textContent = LEVEL_WIN_MSG[level - 1];
      foundPopup.classList.add("pop");
      await delay(1000);
      foundPopup.classList.remove("pop");
      isLevelTransition = false;

      if (level == NUM_OF_LEVELS) {
        completeGame();
      } else {
        level++;
        dieSize *= 0.9;
        startLevel();
      }
    }
  });
}

function resetGame() {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;

  level = 1;
  dieSize = INITIAL_DIE_SIZE;
  isLevelTransition = false;
  if (timer) {
    clearInterval(timer);
  }
  timeEl.textContent = "00:00";
}

export function startGame() {
  resetGame();

  // Start timer
  startTime = Date.now();
  setInterval(() => {
    const dt = (Date.now() - startTime) / 1e3;
    timeEl.textContent = formatTime(dt);
  }, 1000);

  startLevel();
}

function startLevel() {
  const { dice, kubiPos: generateKubiPos } = generateDice(
    dieSize,
    canvas.width,
    canvas.height
  );
  kubiPos = generateKubiPos;
  renderDice(canvas, dice, dieSize);
  select("#game-level").textContent = "שלב " + level.toString();
}

function completeGame() {
  // Stop timer
  if (timer) {
    clearInterval(timer);
  }
  const totalTime = (Date.now() - startTime) / 1e3;
  updateWin(totalTime);
  changeScreen(SCREENS.win);
}
