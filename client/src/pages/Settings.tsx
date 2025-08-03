import { Globe, Key, IdCard } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Settings() {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">Configure your global settings and security options</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-card rounded-lg shadow-sm border border-border p-6">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mb-4">
            <Globe className="text-blue-600 dark:text-blue-400 w-6 h-6" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Global Settings</h3>
          <p className="text-muted-foreground mb-4">
            Configure system-wide settings, notifications, and default backup preferences.
          </p>
          <Button className="w-full bg-brand-blue text-white hover:bg-brand-blue-dark">
            Manage Global Settings
          </Button>
        </div>

        <div className="bg-card rounded-lg shadow-sm border border-border p-6">
          <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center mb-4">
            <Key className="text-green-600 dark:text-green-400 w-6 h-6" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Encryption Key Management</h3>
          <p className="text-muted-foreground mb-4">
            Manage encryption keys, configure security policies, and set up data protection.
          </p>
          <Button className="w-full bg-brand-blue text-white hover:bg-brand-blue-dark">
            Manage Encryption
          </Button>
        </div>

        <div className="bg-card rounded-lg shadow-sm border border-border p-6">
          <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mb-4">
            <IdCard className="text-purple-600 dark:text-purple-400 w-6 h-6" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Identity Provider Credentials</h3>
          <p className="text-muted-foreground mb-4">
            Configure authentication settings and manage identity provider connections.
          </p>
          <Button className="w-full bg-brand-blue text-white hover:bg-brand-blue-dark">
            Manage Credentials
          </Button>
        </div>
      </div>
    </div>
  );
}
