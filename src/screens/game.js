import { changeScreen, SCREENS } from "../screens.js";
import { delay, select } from "../utils.js";
import { renderDice } from "../renderer.js";
import { generateDice } from "../generateDice.js";

const INITIAL_DIE_SIZE = 150;
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
  "הו בוי",
];

let level, dieSize, kubiPos, isLevelTransition;
let startTime, timer;

const backBtn = select("#back-btn");
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
      isLevelTransition = true;
      if (level == 15) {
        alert("You've completed the game!");
        changeScreen(SCREENS.intro);
      } else {
        // show popup
        foundPopup.style.top = kubiPos.y - dieSize / 4;
        foundPopup.style.left = kubiPos.x;
        foundPopup.textContent = LEVEL_WIN_MSG[level - 1];
        foundPopup.classList.add("pop");
        await delay(1000);
        foundPopup.classList.remove("pop");
        // level up
        level++;
        dieSize *= 0.9;
        startLevel();
      }
      isLevelTransition = false;
    }
  });
}

export function resetGame() {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;

  level = 1;
  dieSize = INITIAL_DIE_SIZE;
  startTime = Date.now();
  if (timer) {
    clearInterval(timer);
  }
  timeEl.textContent = "00:00";
  setInterval(() => {
    const dt = (Date.now() - startTime) / 1e3;
    const min = Math.floor(dt / 60)
      .toString()
      .padStart(2, "0");
    const sec = Math.floor(dt % 60)
      .toString()
      .padStart(2, "0");
    timeEl.textContent = min + ":" + sec;
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
