import { loadAssets } from "./assets.js";
import { setupGame } from "./screens/game.js";
import { setupIntro } from "./screens/intro.js";
import { setupWin } from "./screens/win.js";
import sounds from "./sounds.js";
import { select } from "./utils.js";

window.addEventListener("load", async () => {
  loadAssets();
  setupSound();
  // screens
  setupIntro();
  setupGame();
  setupWin();
});

function setupSound() {
  let muted = false;
  select("#sound-btn").addEventListener("click", () => {
    muted = !muted;
    muted ? sounds.mute() : sounds.unmute();
    select("#sound-on-icon").style.display = muted ? "none" : "";
    select("#sound-off-icon").style.display = muted ? "" : "none";
    if (!muted) {
      sounds.playBackground(); // make sure background is playing (especially for main screen)
    }
  });
}
