import { changeScreen, SCREENS } from "./screens.js";
import { loadImage, select, shuffleArray } from "./utils.js";

const startBtn = select('#start-btn');
const canvas = select('canvas');

startBtn.addEventListener('click', () => {
  changeScreen(SCREENS.game);
  randomizeDice()
})

async function randomizeDice() {
  const width = canvas.clientWidth
  const height = canvas.clientHeight
  canvas.width = width
  canvas.height = height

  const dieSize = 100
  const maxRandomOffset = dieSize * 0.1
  const diceDist = Math.floor(dieSize * 0.6)

  // const effectiveDiceWidth = Math.floor(width/diceDist) * diceDist
  // const diceMarginWidth = (width - effectiveDiceWidth) / 2
  const diceMarginWidth = 12 // TODO - use above calculation

  // const imgDie = await loadImage('res/d1.png')
  const imgDie = await loadImage('res/gold.png')
  const imgKubi = await loadImage('res/afarsekubi.png')

  const ctx = canvas.getContext('2d');

  // Generate random dice
  const dice = []
  for (let x = dieSize / 2; x < width - dieSize / 2; x += diceDist) {
    for (let y = dieSize / 2; y < height - dieSize / 2; y += diceDist) {
      const dieParams = {
        x: x + diceMarginWidth + Math.floor(Math.random() * maxRandomOffset * 2 - maxRandomOffset),
        y: y + Math.floor(Math.random() * maxRandomOffset * 2 - maxRandomOffset),
        r: Math.floor(Math.random() * 360),
        color: Math.floor(Math.random() * 360) + 'deg',
      }
      dice.push(dieParams)
    }
  }

  // mix z-index
  shuffleArray(dice);

  // Add afersekubi
  const kubiPos = Math.floor(Math.random() * dice.length)
  dice[kubiPos].isKubi = true

  // draw
  dice.forEach((die, i) => {
    const img = die.isKubi ? imgKubi : imgDie
    ctx.save();
    if (!die.isKubi) {
      ctx.filter = `hue-rotate(${die.color})`
    }
    ctx.translate(die.x, die.y)
    ctx.rotate(die.r / 180 * Math.PI);
    ctx.drawImage(img, -dieSize / 2, -dieSize / 2, dieSize, dieSize);
    ctx.restore()
  })
}
