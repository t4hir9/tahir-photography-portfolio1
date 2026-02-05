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

  // Seed data if empty
  const existingItems = await storage.getPortfolioItems();
  if (existingItems.length === 0) {
    // Seed some photography
    await storage.createPortfolioItem({
      title: "Mountain Landscape",
      type: "photo",
      url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80",
      category: "Landscape",
      thumbnailUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80"
    });
    await storage.createPortfolioItem({
      title: "Urban Portrait",
      type: "photo",
      url: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80",
      category: "Portrait",
      thumbnailUrl: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80"
    });
    await storage.createPortfolioItem({
      title: "Drone View",
      type: "photo",
      url: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&q=80",
      category: "Drone",
      thumbnailUrl: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&q=80"
    });
    await storage.createPortfolioItem({
      title: "Cinematic Reel",
      type: "video",
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder
      category: "Reel",
      thumbnailUrl: "https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&q=80"
    });
  }

  return httpServer;
}
