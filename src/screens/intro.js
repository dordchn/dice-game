import { resetGame } from "./game.js";
import { changeScreen, SCREENS } from "../screens.js";
import { select } from "../utils.js";

const startBtn = select('#start-btn');

export function setupIntro() {
  startBtn.addEventListener('click', () => {
    changeScreen(SCREENS.game);
    resetGame()
  });

  kubi.addEventListener("animationend", () => {
    kubi.classList.add('swing')
  });
}
