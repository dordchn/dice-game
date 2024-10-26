import { startGame } from "./game.js";
import { changeScreen, SCREENS } from "../screens.js";
import { select } from "../utils.js";
import sounds from "../sounds.js";

const startBtn = select("#start-btn");
const kubi = select("#intro-kubi");

export function setupIntro() {
  startBtn.addEventListener("click", () => {
    sounds.playBackground(); // can't play sound before user interaction
    changeScreen(SCREENS.game);
    startGame();
  });

  kubi.addEventListener("animationend", () => {
    kubi.classList.add("swing");
  });
}
