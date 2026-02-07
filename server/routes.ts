import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

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

  // Instagram (Mock/Placeholder for now as we don't have a token)
  app.get(api.instagram.list.path, async (req, res) => {
    // In a real app, we would fetch from Instagram Graph API here using an access token
    // const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
    // ... fetch logic ...
    
    // Returning mock data for the portfolio demo
    const mockPosts = [
      {
        id: "1",
        media_url: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80",
        permalink: "https://instagram.com",
        caption: "Capturing moments #photography",
        media_type: "IMAGE",
      },
      {
        id: "2",
        media_url: "https://images.unsplash.com/photo-1517059224975-d10f9689363b?auto=format&fit=crop&q=80",
        permalink: "https://instagram.com",
        caption: "Cinematic vibes #video",
        media_type: "IMAGE",
      },
      {
        id: "3",
        media_url: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&q=80",
        permalink: "https://instagram.com",
        caption: "Drone shots from above #aerial",
        media_type: "IMAGE",
      },
       {
        id: "4",
        media_url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80",
        permalink: "https://instagram.com",
        caption: "Visual storytelling #create",
        media_type: "IMAGE",
      },
    ];
    res.json(mockPosts);
  });

  // Seed data
  const existingItems = await storage.getPortfolioItems();
  if (existingItems.length === 0) {
    // Photography
    const photoCount = 65; // Based on the find command output
    for (let i = 1; i <= photoCount; i++) {
      await storage.createPortfolioItem({
        title: `Photo ${i}`,
        type: "photo",
        url: `/photos/${i}.jpg`,
        category: "Photography",
        thumbnailUrl: `/photos/${i}.jpg`
      });
    }

    // Videography
    const videos = [
      { title: "Outfit 3 Redo", url: "/videos/Outfit_3_Redo.mp4" },
      { title: "Outfit 4", url: "/videos/Outfit_4.mp4" },
      { title: "Walima Second", url: "/videos/Walima_Second.mp4" }
    ];

    for (const video of videos) {
      await storage.createPortfolioItem({
        title: video.title,
        type: "video",
        url: video.url,
        category: "Videography",
        thumbnailUrl: "/photos/1.jpg" // Fallback thumbnail
      });
    }
  }

  return httpServer;
}
