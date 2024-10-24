import { select } from "./utils.js";

export const SCREENS = {
  intro: select('#screen-intro'),
  game: select('#screen-game')
}

export function changeScreen(screen) {
  Object.values(SCREENS).forEach(s => s.classList.add('screen-hidden'));
  screen.classList.remove('screen-hidden');
}
