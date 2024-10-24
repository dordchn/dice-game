import { loadImage } from "./utils.js";

const assets = {
  die: loadImage('res/die.png'),
  kubi: loadImage('res/afarsekubi.png')
}

export async function renderDice(canvas, dice, dieSize) {
  const imgDie = await assets.die
  const imgKubi = await assets.kubi

  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  dice.forEach((die, i) => {
    const img = die.isKubi ? imgKubi : imgDie

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