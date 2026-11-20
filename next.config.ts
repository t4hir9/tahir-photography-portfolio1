import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  transpilePackages: ["@remotion/player", "tip08-motion-graphics"],
  webpack(config) {
    config.module.rules.push({
      test: /\.(mov|mp4|webm)$/,
      type: "asset/resource",
      generator: {
        filename: "static/media/[name].[hash][ext]",
      },
    });

    config.resolve.alias = {
      ...config.resolve.alias,
      "@/tip08-motion-graphics": path.resolve("/Users/macbook/tip08-motion-graphics/src"),
    };

    return config;
  },
};

export default nextConfig;