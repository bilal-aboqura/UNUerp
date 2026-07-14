import { mkdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const assets = ["hero-features", "hero-industries", "hero-products"];
const assetDir = path.resolve("public/assets");

await mkdir(assetDir, { recursive: true });

for (const asset of assets) {
  const source = path.join(assetDir, `${asset}.png`);
  const destination = path.join(assetDir, `${asset}.webp`);
  const metadata = await sharp(source).metadata();
  const sourceSize = (await stat(source)).size;

  await sharp(source)
    .resize({ width: metadata.width, height: metadata.height, withoutEnlargement: true })
    .webp({ quality: 82, effort: 6 })
    .toFile(destination);

  const destinationSize = (await stat(destination)).size;
  console.log(`${asset}: ${sourceSize} B -> ${destinationSize} B`);
}
