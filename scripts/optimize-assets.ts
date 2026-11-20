import sharp from "sharp";
import { readdir, stat, mkdir, rename } from "fs/promises";
import { join, extname, basename } from "path";
import { existsSync } from "fs";

const PUBLIC_DIR = join(process.cwd(), "public");
const IMAGES_DIR = join(PUBLIC_DIR, "images");
const VIDEOS_DIR = join(PUBLIC_DIR, "videos");
const FONTS_DIR = join(PUBLIC_DIR, "fonts");

interface AssetResult {
  path: string;
  originalSize: number;
  optimizedSize: number;
  savings: number;
}

async function optimizeImages(): Promise<AssetResult[]> {
  const results: AssetResult[] = [];

  if (!existsSync(IMAGES_DIR)) {
    console.log("Images directory does not exist, skipping image optimization");
    return results;
  }

  const files = await readdir(IMAGES_DIR);
  // Only process original source formats, not already-optimized outputs
  const imageFiles = files.filter(
    (f) => /\.(png|jpg|jpeg)$/i.test(f)
  );

  for (const file of imageFiles) {
    const inputPath = join(IMAGES_DIR, file);
    const stats = await stat(inputPath);
    const originalSize = stats.size;

    const ext = extname(file).toLowerCase();
    const name = basename(file, ext);

    // PNG/JPG - convert to WebP
    await sharp(inputPath)
      .webp({ quality: 80, effort: 6 })
      .toFile(join(IMAGES_DIR, `${name}.webp`));
    const outStats = await stat(join(IMAGES_DIR, `${name}.webp`));
    const optimizedSize = outStats.size;

    // Also create optimized PNG (write to temp then replace)
    const tempPngPath = join(IMAGES_DIR, `${name}.png.tmp`);
    await sharp(inputPath)
      .png({ quality: 80, effort: 6 })
      .toFile(tempPngPath);
    await rename(tempPngPath, join(IMAGES_DIR, `${name}.png`));

    const savings = ((originalSize - optimizedSize) / originalSize) * 100;
    results.push({
      path: file,
      originalSize,
      optimizedSize,
      savings: Math.round(savings * 100) / 100,
    });

    console.log(
      `Optimized ${file}: ${(originalSize / 1024).toFixed(1)}KB → ${(optimizedSize / 1024).toFixed(1)}KB (${savings.toFixed(1)}% savings)`
    );
  }

  return results;
}

async function verifyFonts(): Promise<void> {
  if (!existsSync(FONTS_DIR)) {
    console.log("Fonts directory does not exist");
    return;
  }

  const files = await readdir(FONTS_DIR);
  const woff2Files = files.filter((f) => f.endsWith(".woff2"));

  console.log(`\nFonts found (${woff2Files.length} WOFF2 files):`);
  for (const file of woff2Files) {
    const stats = await stat(join(FONTS_DIR, file));
    console.log(`  ${file} (${(stats.size / 1024).toFixed(1)}KB)`);
  }
}

async function verifyVideos(): Promise<void> {
  if (!existsSync(VIDEOS_DIR)) {
    console.log("Videos directory does not exist");
    return;
  }

  const files = await readdir(VIDEOS_DIR);
  console.log(`\nVideos found (${files.length} files):`);
  for (const file of files) {
    const stats = await stat(join(VIDEOS_DIR, file));
    console.log(`  ${file} (${(stats.size / 1024 / 1024).toFixed(1)}MB)`);
  }
}

async function main() {
  console.log("🔧 Starting asset optimization...\n");

  const imageResults = await optimizeImages();
  await verifyFonts();
  await verifyVideos();

  console.log("\n✅ Asset optimization complete!");

  if (imageResults.length > 0) {
    const totalOriginal = imageResults.reduce((a, b) => a + b.originalSize, 0);
    const totalOptimized = imageResults.reduce((a, b) => a + b.optimizedSize, 0);
    const totalSavings = ((totalOriginal - totalOptimized) / totalOriginal) * 100;
    console.log(
      `\n📊 Total image savings: ${(totalOriginal / 1024).toFixed(1)}KB → ${(totalOptimized / 1024).toFixed(1)}KB (${totalSavings.toFixed(1)}%)`
    );
  }
}

main().catch((err) => {
  console.error("❌ Optimization failed:", err);
  process.exit(1);
});