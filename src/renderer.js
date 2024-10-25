import { assets } from "./assets.js";

export function renderDice(canvas, dice, dieSize) {
  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  dice.forEach((die, i) => {
    const img = die.isKubi ? assets['kubi'] : assets['die']

    ctx.save();
    ctx.translate(die.x, die.y)
    ctx.rotate(die.r / 180 * Math.PI);

    if (!die.isKubi) {
      ctx.filter = ` invert(100%) contrast(80%) brightness(1.7) hue-rotate(${die.color})`
    } else {
      ctx.scale(1.2, 1.2)
    }

    ctx.drawImage(img, -dieSize / 2, -dieSize / 2, dieSize, dieSize);
    ctx.restore();
  })
}