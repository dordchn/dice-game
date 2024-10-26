import { loadAssets } from "./assets.js";
import { setupGame } from "./screens/game.js";
import { setupIntro } from "./screens/intro.js";
import { setupWin } from "./screens/win.js";

window.addEventListener("load", async () => {
  loadAssets();

  setupIntro();
  setupGame();
  setupWin();
});
