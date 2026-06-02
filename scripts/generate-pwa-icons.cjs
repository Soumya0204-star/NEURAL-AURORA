const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const sizes = [192, 512];
const publicDir = path.resolve(__dirname, '..', 'public');
const imagesDir = path.join(publicDir, 'images');

if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

async function generate() {
  for (const size of sizes) {
    await sharp(path.join(imagesDir, 'neural_aurora_logo.svg'))
      .resize(size, size)
      .png()
      .toFile(path.join(imagesDir, `pwa-icon-${size}x${size}.png`));
    console.log(`Generated pwa-icon-${size}x${size}.png`);
  }
}

generate().catch(console.error);
