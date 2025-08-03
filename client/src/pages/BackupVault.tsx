import { Vault } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BackupVault() {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Backup Vault</h1>
        <p className="text-gray-600 mt-1">Manage your backed up data and files</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Vault className="text-gray-400 w-8 h-8" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Assets Configured</h3>
        <p className="text-gray-500 mb-6">
          You haven't configured any assets for backup yet. Get started by adding your first backup asset.
        </p>
        <Button className="bg-brand-blue text-white hover:bg-brand-blue-dark">
          Configure First Asset
        </Button>
      </div>
    </div>
  );
}
