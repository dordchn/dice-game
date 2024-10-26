import { loadImage } from "./utils.js";

export const assets = {};

export async function loadAssets() {
  const assetPromises = {
    "die-170": loadImage("res/die-170.png"),
    "die-85": loadImage("res/die-85.png"),
    kubi: loadImage("res/kubi-200.png"),
  };
  const x = await Promise.all(Object.values(assetPromises));
  for (const key in assetPromises) {
    assets[key] = await assetPromises[key];
  }
}
