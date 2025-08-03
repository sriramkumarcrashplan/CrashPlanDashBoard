import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertAssetSchema, insertPolicySchema, insertAppUserSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Dashboard metrics
  app.get("/api/dashboard/metrics", async (req, res) => {
    try {
      const metrics = await storage.getDashboardMetrics();
      res.json(metrics);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch dashboard metrics" });
    }
  });

  // Running backups
  app.get("/api/dashboard/running-backups", async (req, res) => {
    try {
      const backups = await storage.getRunningBackups();
      res.json(backups);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch running backups" });
    }
  });

  // Running restores
  app.get("/api/dashboard/running-restores", async (req, res) => {
    try {
      const restores = await storage.getRunningRestores();
      res.json(restores);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch running restores" });
    }
  });

  // Assets
  app.get("/api/assets", async (req, res) => {
    try {
      const { type } = req.query;
      let assets;
      if (type) {
        assets = await storage.getAssetsByType(type as string);
      } else {
        assets = await storage.getAssets();
      }
      res.json(assets);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch assets" });
    }
  });

  app.post("/api/assets", async (req, res) => {
    try {
      const validatedData = insertAssetSchema.parse(req.body);
      const asset = await storage.createAsset(validatedData);
      res.status(201).json(asset);
    } catch (error) {
      res.status(400).json({ message: "Invalid asset data", error: error.message });
    }
  });

  // Policies
  app.get("/api/policies", async (req, res) => {
    try {
      const { type } = req.query;
      let policies;
      if (type) {
        policies = await storage.getPoliciesByType(type as string);
      } else {
        policies = await storage.getPolicies();
      }
      res.json(policies);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch policies" });
    }
  });

  app.post("/api/policies", async (req, res) => {
    try {
      const validatedData = insertPolicySchema.parse(req.body);
      const policy = await storage.createPolicy(validatedData);
      res.status(201).json(policy);
    } catch (error) {
      res.status(400).json({ message: "Invalid policy data", error: error.message });
    }
  });

  // App Users
  app.get("/api/users", async (req, res) => {
    try {
      const users = await storage.getAppUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch users" });
    }
  });

  app.post("/api/users", async (req, res) => {
    try {
      const validatedData = insertAppUserSchema.parse(req.body);
      const user = await storage.createAppUser(validatedData);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ message: "Invalid user data", error: error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
