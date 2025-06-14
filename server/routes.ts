import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertJerseySchema, insertBannerSchema, insertOrderSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Jersey routes
  app.get("/api/jerseys", async (req, res) => {
    try {
      const jerseys = await storage.getJerseys();
      res.json(jerseys);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch jerseys" });
    }
  });

  app.get("/api/jerseys/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const jersey = await storage.getJersey(id);
      if (!jersey) {
        return res.status(404).json({ error: "Jersey not found" });
      }
      res.json(jersey);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch jersey" });
    }
  });

  app.post("/api/jerseys", async (req, res) => {
    try {
      const jersey = insertJerseySchema.parse(req.body);
      const created = await storage.createJersey(jersey);
      res.status(201).json(created);
    } catch (error) {
      res.status(400).json({ error: "Invalid jersey data" });
    }
  });

  app.put("/api/jerseys/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = insertJerseySchema.partial().parse(req.body);
      const updated = await storage.updateJersey(id, updates);
      if (!updated) {
        return res.status(404).json({ error: "Jersey not found" });
      }
      res.json(updated);
    } catch (error) {
      res.status(400).json({ error: "Invalid jersey data" });
    }
  });

  app.delete("/api/jerseys/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteJersey(id);
      if (!deleted) {
        return res.status(404).json({ error: "Jersey not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete jersey" });
    }
  });

  // Banner routes
  app.get("/api/banners", async (req, res) => {
    try {
      const banners = await storage.getBanners();
      res.json(banners);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch banners" });
    }
  });

  app.post("/api/banners", async (req, res) => {
    try {
      const banner = insertBannerSchema.parse(req.body);
      const created = await storage.createBanner(banner);
      res.status(201).json(created);
    } catch (error) {
      res.status(400).json({ error: "Invalid banner data" });
    }
  });

  app.put("/api/banners/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = insertBannerSchema.partial().parse(req.body);
      const updated = await storage.updateBanner(id, updates);
      if (!updated) {
        return res.status(404).json({ error: "Banner not found" });
      }
      res.json(updated);
    } catch (error) {
      res.status(400).json({ error: "Invalid banner data" });
    }
  });

  app.delete("/api/banners/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteBanner(id);
      if (!deleted) {
        return res.status(404).json({ error: "Banner not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete banner" });
    }
  });

  // Order routes
  app.get("/api/orders", async (req, res) => {
    try {
      const orders = await storage.getOrders();
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch orders" });
    }
  });

  app.post("/api/orders", async (req, res) => {
    try {
      const order = insertOrderSchema.parse(req.body);
      const created = await storage.createOrder(order);
      res.status(201).json(created);
    } catch (error) {
      res.status(400).json({ error: "Invalid order data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
