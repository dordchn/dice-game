import { shuffleArray } from "./utils.js";

export function generateDice(dieSize, width, height) {
  const maxRandomOffset = dieSize * 0.1
  const diceDist = Math.floor(dieSize * 0.6)

  // const effectiveDiceWidth = Math.floor(width/diceDist) * diceDist
  // const diceMarginWidth = (width - effectiveDiceWidth) / 2
  const diceMarginWidth = 5 // TODO - use above calculation
  const diceMarginHeight = 20 // TODO - use above calculation

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

  return dice
}
