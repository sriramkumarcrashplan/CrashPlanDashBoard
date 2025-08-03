import { 
  type User, 
  type InsertUser, 
  type Asset, 
  type InsertAsset,
  type Policy,
  type InsertPolicy,
  type BackupJob,
  type InsertBackupJob,
  type RestoreJob,
  type InsertRestoreJob,
  type DashboardMetrics,
  type InsertDashboardMetrics,
  type AppUser,
  type InsertAppUser
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Assets
  getAssets(): Promise<Asset[]>;
  getAssetsByType(type: string): Promise<Asset[]>;
  createAsset(asset: InsertAsset): Promise<Asset>;
  
  // Policies
  getPolicies(): Promise<Policy[]>;
  getPoliciesByType(type: string): Promise<Policy[]>;
  createPolicy(policy: InsertPolicy): Promise<Policy>;
  
  // Backup Jobs
  getRunningBackups(): Promise<BackupJob[]>;
  createBackupJob(job: InsertBackupJob): Promise<BackupJob>;
  
  // Restore Jobs
  getRunningRestores(): Promise<RestoreJob[]>;
  createRestoreJob(job: InsertRestoreJob): Promise<RestoreJob>;
  
  // Dashboard Metrics
  getDashboardMetrics(): Promise<DashboardMetrics>;
  updateDashboardMetrics(metrics: InsertDashboardMetrics): Promise<DashboardMetrics>;
  
  // App Users
  getAppUsers(): Promise<AppUser[]>;
  createAppUser(user: InsertAppUser): Promise<AppUser>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private assets: Map<string, Asset>;
  private policies: Map<string, Policy>;
  private backupJobs: Map<string, BackupJob>;
  private restoreJobs: Map<string, RestoreJob>;
  private dashboardMetrics: DashboardMetrics;
  private appUsers: Map<string, AppUser>;

  constructor() {
    this.users = new Map();
    this.assets = new Map();
    this.policies = new Map();
    this.backupJobs = new Map();
    this.restoreJobs = new Map();
    this.appUsers = new Map();
    
    // Initialize with sample data
    this.initializeData();
  }

  private initializeData() {
    // Dashboard metrics
    this.dashboardMetrics = {
      id: randomUUID(),
      activeUsers: 1247,
      activeAssets: 3842,
      fullBackupsCompleted: 2194,
      assetsNotProtected: 47,
      totalDataBackedUp: "247.8 TB",
      currentlyRunningBackups: 23,
      completedRestores: 156,
      usersWithoutActiveAssets: 12,
      updatedAt: new Date(),
    };

    // Sample assets
    const asset1: Asset = {
      id: randomUUID(),
      name: "john.doe@company.com",
      type: "gmail",
      userName: "John Doe",
      userEmail: "john.doe@company.com",
      status: "active",
      configuredOn: new Date("2024-01-15"),
    };
    
    const asset2: Asset = {
      id: randomUUID(),
      name: "sarah.wilson@company.com",
      type: "gmail",
      userName: "Sarah Wilson",
      userEmail: "sarah.wilson@company.com",
      status: "pending",
      configuredOn: new Date("2024-01-14"),
    };
    
    const asset3: Asset = {
      id: randomUUID(),
      name: "mike.chen@company.com",
      type: "drive",
      userName: "Mike Chen",
      userEmail: "mike.chen@company.com",
      status: "active",
      configuredOn: new Date("2024-01-12"),
    };

    this.assets.set(asset1.id, asset1);
    this.assets.set(asset2.id, asset2);
    this.assets.set(asset3.id, asset3);

    // Sample policies
    const policy1: Policy = {
      id: randomUUID(),
      name: "Default Gmail Policy",
      description: "Standard backup policy for Gmail accounts",
      type: "gmail",
      usersMapped: 847,
      autoBackup: true,
      backupAllEmails: true,
      createdAt: new Date(),
    };
    
    const policy2: Policy = {
      id: randomUUID(),
      name: "Standard Drive Policy",
      description: "Standard backup policy for Google Drive accounts",
      type: "drive",
      usersMapped: 623,
      autoBackup: true,
      backupAllEmails: false,
      createdAt: new Date(),
    };

    this.policies.set(policy1.id, policy1);
    this.policies.set(policy2.id, policy2);

    // Sample running backups
    const backup1: BackupJob = {
      id: randomUUID(),
      userEmail: "john.doe@company.com",
      type: "gmail",
      status: "running",
      startedAt: new Date(),
    };
    
    const backup2: BackupJob = {
      id: randomUUID(),
      userEmail: "sarah.wilson@company.com",
      type: "drive",
      status: "running",
      startedAt: new Date(),
    };

    this.backupJobs.set(backup1.id, backup1);
    this.backupJobs.set(backup2.id, backup2);

    // Sample running restore
    const restore1: RestoreJob = {
      id: randomUUID(),
      userEmail: "mike.chen@company.com",
      type: "gmail",
      status: "running",
      startedAt: new Date(),
    };

    this.restoreJobs.set(restore1.id, restore1);

    // Sample app users
    const appUser1: AppUser = {
      id: randomUUID(),
      userId: "USR-001",
      displayName: "John Doe",
      emailAddress: "john.doe@company.com",
      status: "active",
      lastModified: new Date("2024-01-15T10:30:00"),
    };
    
    const appUser2: AppUser = {
      id: randomUUID(),
      userId: "USR-002",
      displayName: "Sarah Wilson",
      emailAddress: "sarah.wilson@company.com",
      status: "pending",
      lastModified: new Date("2024-01-14T15:45:00"),
    };

    this.appUsers.set(appUser1.id, appUser1);
    this.appUsers.set(appUser2.id, appUser2);
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAssets(): Promise<Asset[]> {
    return Array.from(this.assets.values());
  }

  async getAssetsByType(type: string): Promise<Asset[]> {
    return Array.from(this.assets.values()).filter(asset => asset.type === type);
  }

  async createAsset(insertAsset: InsertAsset): Promise<Asset> {
    const id = randomUUID();
    const asset: Asset = { ...insertAsset, id, configuredOn: new Date() };
    this.assets.set(id, asset);
    return asset;
  }

  async getPolicies(): Promise<Policy[]> {
    return Array.from(this.policies.values());
  }

  async getPoliciesByType(type: string): Promise<Policy[]> {
    return Array.from(this.policies.values()).filter(policy => policy.type === type);
  }

  async createPolicy(insertPolicy: InsertPolicy): Promise<Policy> {
    const id = randomUUID();
    const policy: Policy = { ...insertPolicy, id, createdAt: new Date() };
    this.policies.set(id, policy);
    return policy;
  }

  async getRunningBackups(): Promise<BackupJob[]> {
    return Array.from(this.backupJobs.values()).filter(job => job.status === "running");
  }

  async createBackupJob(insertJob: InsertBackupJob): Promise<BackupJob> {
    const id = randomUUID();
    const job: BackupJob = { ...insertJob, id, startedAt: new Date() };
    this.backupJobs.set(id, job);
    return job;
  }

  async getRunningRestores(): Promise<RestoreJob[]> {
    return Array.from(this.restoreJobs.values()).filter(job => job.status === "running");
  }

  async createRestoreJob(insertJob: InsertRestoreJob): Promise<RestoreJob> {
    const id = randomUUID();
    const job: RestoreJob = { ...insertJob, id, startedAt: new Date() };
    this.restoreJobs.set(id, job);
    return job;
  }

  async getDashboardMetrics(): Promise<DashboardMetrics> {
    return this.dashboardMetrics;
  }

  async updateDashboardMetrics(insertMetrics: InsertDashboardMetrics): Promise<DashboardMetrics> {
    this.dashboardMetrics = { ...this.dashboardMetrics, ...insertMetrics, updatedAt: new Date() };
    return this.dashboardMetrics;
  }

  async getAppUsers(): Promise<AppUser[]> {
    return Array.from(this.appUsers.values());
  }

  async createAppUser(insertUser: InsertAppUser): Promise<AppUser> {
    const id = randomUUID();
    const user: AppUser = { ...insertUser, id, lastModified: new Date() };
    this.appUsers.set(id, user);
    return user;
  }
}

export const storage = new MemStorage();
