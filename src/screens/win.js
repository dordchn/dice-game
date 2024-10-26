import { changeScreen, SCREENS } from "../screens.js";
import { formatTime, select } from "../utils.js";

const backBtn = select("#win-back-btn");
const timeEl = select("#win-time");

export function setupWin() {
  backBtn.addEventListener("click", () => {
    changeScreen(SCREENS.intro);
  });
}

export function updateWin(totalTime) {
  timeEl.textContent = formatTime(totalTime);
}
