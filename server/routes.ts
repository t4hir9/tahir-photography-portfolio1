import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { insertPortfolioItemSchema } from "@shared/schema";
import { z } from "zod";
import fs from "fs";
import path from "path";
import crypto from "crypto";

function titleFromFilename(filename: string): string {
  return filename
    .replace(/\.[^.]+$/, "")
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}

function verifyAdmin(req: any, res: any): boolean {
  const password = req.headers["x-admin-password"];
  if (!process.env.ADMIN_PASSWORD || password !== process.env.ADMIN_PASSWORD) {
    res.status(401).json({ message: "Unauthorized" });
    return false;
  }
  return true;
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // ── Contact ────────────────────────────────────────────────────────────────
  app.post(api.contact.create.path, async (req, res) => {
    try {
      const input = api.contact.create.input.parse(req.body);
      const message = await storage.createMessage(input);
      res.status(201).json(message);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join("."),
        });
      }
      throw err;
    }
  });

  // ── Portfolio – list ────────────────────────────────────────────────────────
  app.get(api.portfolio.list.path, async (_req, res) => {
    const items = await storage.getPortfolioItems();
    res.json(items);
  });

  // ── Portfolio – create (admin) ──────────────────────────────────────────────
  app.post(api.portfolio.list.path, async (req, res) => {
    if (!verifyAdmin(req, res)) return;
    try {
      const input = insertPortfolioItemSchema.parse(req.body);
      const item = await storage.createPortfolioItem(input);
      res.status(201).json(item);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      throw err;
    }
  });

  // ── Portfolio – delete (admin) ──────────────────────────────────────────────
  app.delete("/api/portfolio/:id", async (req, res) => {
    if (!verifyAdmin(req, res)) return;
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid id" });
    await storage.deletePortfolioItem(id);
    res.status(204).end();
  });

  // ── Cloudinary signature (admin) ────────────────────────────────────────────
  app.get("/api/cloudinary-signature", (req, res) => {
    if (!verifyAdmin(req, res)) return;

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
      return res
        .status(503)
        .json({ message: "Cloudinary env vars not configured" });
    }

    const timestamp = Math.round(Date.now() / 1000);
    const folder = "tahir-portfolio";
    const paramsToSign = `folder=${folder}&timestamp=${timestamp}`;
    const signature = crypto
      .createHash("sha256")
      .update(paramsToSign + apiSecret)
      .digest("hex");

    res.json({ signature, timestamp, cloudName, apiKey, folder });
  });

  // ── Seed data – dynamically from files on disk ──────────────────────────────
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
