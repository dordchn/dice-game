import { shuffleArray } from "./utils.js";

export function generateDice(dieSize, width, height) {
  const maxRandomOffset = dieSize * 0.1
  const diceDist = Math.ceil(dieSize * 0.63)

  // console.log(width / diceDist)
  const boardSize = {
    cols: Math.floor((width - dieSize) / diceDist) + 1,
    rows: Math.floor((height - dieSize) / diceDist) + 1,
  }
  const diceMarginWidth = (width - (boardSize.cols - 1) * diceDist) / 2;
  const diceMarginHeight = (height - (boardSize.rows - 1) * diceDist) / 2

  // Generate random dice
  const dice = []
  for (let col = 0; col < boardSize.cols; col++) {
    for (let row = 0; row < boardSize.rows; row++) {
      const x = col * diceDist + diceMarginWidth
      const y = row * diceDist + diceMarginHeight
      const dieParams = {
        x: x + Math.floor(Math.random() * maxRandomOffset * 2 - maxRandomOffset),
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
  const kubiIndex = Math.floor(Math.random() * Math.floor(dice.length * 0.75))
  dice[kubiIndex].isKubi = true

  return {
    dice, kubiPos: {
      x: dice[kubiIndex].x,
      y: dice[kubiIndex].y
    }
  }
}
