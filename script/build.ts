import { build as esbuild } from "esbuild";
import { build as viteBuild } from "vite";
import { rm, readFile, readdir, writeFile } from "fs/promises";

// server deps to bundle to reduce openat(2) syscalls
// which helps cold start times
const allowlist = [
  "@google/generative-ai",
  "axios",
  "connect-pg-simple",
  "cors",
  "date-fns",
  "drizzle-orm",
  "drizzle-zod",
  "express",
  "express-rate-limit",
  "express-session",
  "jsonwebtoken",
  "memorystore",
  "multer",
  "nanoid",
  "nodemailer",
  "openai",
  "passport",
  "passport-local",
  "pg",
  "stripe",
  "uuid",
  "ws",
  "xlsx",
  "zod",
  "zod-validation-error",
];

const photoExtensions = /\.(jpg|jpeg|JPG|JPEG|png|PNG|webp|WEBP)$/;
const videoExtensions = /\.(mp4|MP4|mov|MOV|avi|AVI|webm|WEBM)$/;

async function generateMediaManifest() {
  const photos = (await readdir("client/public/photos")).filter((f) =>
    photoExtensions.test(f)
  );
  const videos = (await readdir("client/public/videos")).filter((f) =>
    videoExtensions.test(f)
  );
  const manifest = { photos, videos };
  await writeFile("api/media-list.json", JSON.stringify(manifest, null, 2));
  console.log(
    `Generated media manifest: ${photos.length} photos, ${videos.length} videos`
  );
}

async function buildAll() {
  await rm("dist", { recursive: true, force: true });

  console.log("generating media manifest...");
  await generateMediaManifest();

  console.log("building client...");
  await viteBuild();

  console.log("building server...");
  const pkg = JSON.parse(await readFile("package.json", "utf-8"));
  const allDeps = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.devDependencies || {}),
  ];
  const externals = allDeps.filter((dep) => !allowlist.includes(dep));

  await esbuild({
    entryPoints: ["server/index.ts"],
    platform: "node",
    bundle: true,
    format: "cjs",
    outfile: "dist/index.cjs",
    define: {
      "process.env.NODE_ENV": '"production"',
    },
    minify: true,
    external: externals,
    logLevel: "info",
  });
}

buildAll().catch((err) => {
  console.error(err);
  process.exit(1);
});
