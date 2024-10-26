import { startGame } from "./game.js";
import { changeScreen, SCREENS } from "../screens.js";
import { select } from "../utils.js";

const startBtn = select("#start-btn");
const kubi = select("#intro-kubi");

export function setupIntro() {
  startBtn.addEventListener("click", () => {
    changeScreen(SCREENS.game);
    startGame();
  });

  kubi.addEventListener("animationend", () => {
    kubi.classList.add("swing");
  });
}
