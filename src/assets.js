import { loadImage } from "./utils.js";

export const assets = {}

export async function loadAssets() {
  const assetPromises = {
    'die': loadImage('res/die.png'),
    'kubi': loadImage('res/afarsekubi.png'),
  }
  const x = await Promise.all(Object.values(assetPromises))
  for (const key in assetPromises) {
    assets[key] = await assetPromises[key]
  }
}
