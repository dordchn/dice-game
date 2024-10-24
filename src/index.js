import { changeScreen, SCREENS } from "./screens.js";
import { loadImage, select, shuffleArray } from "./utils.js";

const startBtn = select('#start-btn');
const backBtn = select('#back-btn');
const kubi = select('#kubi')
const canvas = select('canvas');

startBtn.addEventListener('click', () => {
  changeScreen(SCREENS.game);
  randomizeDice()
});

backBtn.addEventListener('click', () => {
  changeScreen(SCREENS.intro);
})

kubi.addEventListener("animationend", (event) => {
  kubi.classList.add('swing')
});

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
  const diceMarginWidth = 5 // TODO - use above calculation
  const diceMarginHeight = 20 // TODO - use above calculation

  // const imgDie = await loadImage('res/d1.png')
  const imgDie = await loadImage('res/die.png')
  const imgKubi = await loadImage('res/afarsekubi.png')

  const ctx = canvas.getContext('2d');

  // Generate random dice
  const dice = []
  for (let x = dieSize / 2; x < width - dieSize / 2; x += diceDist) {
    for (let y = dieSize / 2; y < height - dieSize / 2; y += diceDist) {
      const dieParams = {
        x: x + diceMarginWidth + Math.floor(Math.random() * maxRandomOffset * 2 - maxRandomOffset),
        y: y + diceMarginHeight + Math.floor(Math.random() * maxRandomOffset * 2 - maxRandomOffset),
        r: Math.floor(Math.random() * 360),
        color: Math.floor(Math.random() * 360) + 'deg',
      }
      dice.push(dieParams)
    }
  }

  // mix z-index
  shuffleArray(dice);

  // Add afersekubi
  const kubiPos = Math.floor(Math.random() * Math.floor(dice.length * 0.75))
  dice[kubiPos].isKubi = true

  // draw
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  dice.forEach((die, i) => {
    const img = die.isKubi ? imgKubi : imgDie
    
    ctx.save();
    ctx.translate(die.x, die.y)
    ctx.rotate(die.r / 180 * Math.PI);

    if (!die.isKubi) {
      ctx.filter = ` invert(100%) contrast(80%) brightness(1.7) hue-rotate(${die.color})`
    } else {
      ctx.scale(1.2,1.2)
    }

    ctx.drawImage(img, -dieSize / 2, -dieSize / 2, dieSize, dieSize);
    ctx.restore()
  })
}
