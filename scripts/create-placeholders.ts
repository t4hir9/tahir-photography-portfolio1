import sharp from "sharp";
import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";

const IMAGES_DIR = join(process.cwd(), "public", "images");

function createSvgPlaceholder(
  width: number,
  height: number,
  text: string,
  bgColor = "#1E1E1E",
  textColor = "#6B6B6B"
): string {
  return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="${bgColor}"/>
  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="system-ui, sans-serif" font-size="24" fill="${textColor}">${text}</text>
</svg>`;
}

async function createPlaceholders() {
  if (!existsSync(IMAGES_DIR)) {
    mkdirSync(IMAGES_DIR, { recursive: true });
  }

  const placeholders = [
    { name: "logo", width: 200, height: 60, text: "4T9" },
    { name: "about-1", width: 800, height: 600, text: "About Image 1" },
    { name: "about-2", width: 800, height: 600, text: "About Image 2" },
    { name: "film-1", width: 400, height: 225, text: "Film Thumbnail 1" },
    { name: "film-2", width: 400, height: 225, text: "Film Thumbnail 2" },
    { name: "film-3", width: 400, height: 225, text: "Film Thumbnail 3" },
  ];

  for (const p of placeholders) {
    const svg = createSvgPlaceholder(p.width, p.height, p.text);
    const svgPath = join(IMAGES_DIR, `${p.name}.svg`);
    writeFileSync(svgPath, svg);

    const pngPath = join(IMAGES_DIR, `${p.name}.png`);
    await sharp(Buffer.from(svg)).png().toFile(pngPath);

    const webpPath = join(IMAGES_DIR, `${p.name}.webp`);
    await sharp(Buffer.from(svg)).webp({ quality: 80 }).toFile(webpPath);

    console.log(`Created ${p.name}: SVG, PNG, WebP (${p.width}x${p.height})`);
  }

  console.log("\n✅ Placeholder images created!");
}

createPlaceholders().catch((err) => {
  console.error("❌ Failed to create placeholders:", err);
  process.exit(1);
});