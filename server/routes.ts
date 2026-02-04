
import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.get(api.photos.list.path, async (req, res) => {
    const photos = await storage.getPhotos();
    res.json(photos);
  });

  app.post(api.photos.create.path, async (req, res) => {
    const photo = await storage.createPhoto(req.body);
    res.status(201).json(photo);
  });

  // Seed data check
  const existingPhotos = await storage.getPhotos();
  if (existingPhotos.length === 0) {
    console.log("Seeding database with initial photos...");
    const seedPhotos = [
      // Nature
      { title: "Misty Mountains", description: "Fog rolling over peaks", category: "Nature", url: "/images/nature-1.jpg" },
      { title: "Forest Path", description: "A quiet walk in the woods", category: "Nature", url: "/images/nature-2.jpg" },
      { title: "Ocean Sunset", description: "Golden hour at the beach", category: "Nature", url: "/images/nature-3.jpg" },
      { title: "Desert Dunes", description: "Sands of time", category: "Nature", url: "/images/nature-4.jpg" },
      
      // Architecture
      { title: "Modern Skyscraper", description: "Glass and steel", category: "Architecture", url: "/images/arch-1.jpg" },
      { title: "Concrete Angles", description: "Brutalist geometry", category: "Architecture", url: "/images/arch-2.jpg" },
      { title: "City Lights", description: "Urban nightlife", category: "Architecture", url: "/images/arch-3.jpg" },
      { title: "Spiral Staircase", description: "Infinite loop", category: "Architecture", url: "/images/arch-4.jpg" },

      // Portrait
      { title: "Studio Light", description: "Dramatic lighting", category: "Portrait", url: "/images/portrait-1.jpg" },
      { title: "Street Candid", description: "Urban life", category: "Portrait", url: "/images/portrait-2.jpg" },
      { title: "Natural Smile", description: "Outdoor session", category: "Portrait", url: "/images/portrait-3.jpg" },
      { title: "Monochrome", description: "Black and white mood", category: "Portrait", url: "/images/portrait-4.jpg" },

       // Travel
      { title: "Kyoto Temple", description: "Ancient traditions", category: "Travel", url: "/images/travel-1.jpg" },
      { title: "Paris Streets", description: "Romance in the air", category: "Travel", url: "/images/travel-2.jpg" },
      { title: "Safari", description: "Wild encounters", category: "Travel", url: "/images/travel-3.jpg" },
      { title: "Island Escape", description: "Tropical paradise", category: "Travel", url: "/images/travel-4.jpg" },
    ];

    for (const photo of seedPhotos) {
      await storage.createPhoto(photo);
    }
    console.log("Seeding complete!");
  }

  return httpServer;
}
