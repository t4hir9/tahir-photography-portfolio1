import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import fs from "fs";
import path from "path";

function titleFromFilename(filename: string): string {
  return filename
    .replace(/\.[^.]+$/, "")
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Contact
  app.post(api.contact.create.path, async (req, res) => {
    try {
      const input = api.contact.create.input.parse(req.body);
      const message = await storage.createMessage(input);
      res.status(201).json(message);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  // Portfolio
  app.get(api.portfolio.list.path, async (req, res) => {
    const items = await storage.getPortfolioItems();
    res.json(items);
  });

  // Seed data — dynamically from the actual files on disk
  const photosDir = path.join(process.cwd(), "client/public/photos");
  const videosDir = path.join(process.cwd(), "client/public/videos");

  const photoExtensions = /\.(jpg|jpeg|JPG|JPEG|png|PNG|webp|WEBP)$/;
  const videoExtensions = /\.(mp4|MP4|mov|MOV|avi|AVI|webm|WEBM)$/;

  const photoFilenames = fs.existsSync(photosDir)
    ? fs.readdirSync(photosDir).filter((f) => photoExtensions.test(f))
    : [];

  const videoFilenames = fs.existsSync(videosDir)
    ? fs.readdirSync(videosDir).filter((f) => videoExtensions.test(f))
    : [];

  const existingItems = await storage.getPortfolioItems();
  const existingUrls = new Set(existingItems.map((item) => item.url));

  const firstPhoto = photoFilenames[0] ? `/photos/${photoFilenames[0]}` : null;

  for (const filename of photoFilenames) {
    const url = `/photos/${filename}`;
    if (!existingUrls.has(url)) {
      await storage.createPortfolioItem({
        title: titleFromFilename(filename),
        type: "photo",
        url,
        category: "Photography",
        thumbnailUrl: url,
      });
    }
  }

  for (const filename of videoFilenames) {
    const url = `/videos/${filename}`;
    if (!existingUrls.has(url)) {
      await storage.createPortfolioItem({
        title: titleFromFilename(filename),
        type: "video",
        url,
        category: "Videography",
        thumbnailUrl: firstPhoto ?? "/photos/1.jpg",
      });
    }
  }

  return httpServer;
}
