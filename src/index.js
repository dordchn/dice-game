
import { loadAssets } from "./assets.js";
import { setupGame } from "./screens/game.js";
import { setupIntro } from "./screens/intro.js";

window.addEventListener('load', async () => {
  loadAssets()

  setupIntro()
  setupGame()
})
