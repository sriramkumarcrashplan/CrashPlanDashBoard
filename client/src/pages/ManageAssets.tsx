import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Mail, HardDrive, MoreVertical, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { type Asset } from "@shared/schema";

export default function ManageAssets() {
  const [activeTab, setActiveTab] = useState("gmail");

  const { data: gmailAssets, isLoading: gmailLoading } = useQuery<Asset[]>({
    queryKey: ["/api/assets", { type: "gmail" }],
    queryFn: async () => {
      const response = await fetch("/api/assets?type=gmail");
      return response.json();
    },
  });

  const { data: driveAssets, isLoading: driveLoading } = useQuery<Asset[]>({
    queryKey: ["/api/assets", { type: "drive" }],
    queryFn: async () => {
      const response = await fetch("/api/assets?type=drive");
      return response.json();
    },
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>;
      case "inactive":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Inactive</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const AssetTable = ({ assets, loading, type }: { assets: Asset[], loading: boolean, type: string }) => {
    if (loading) {
      return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200 animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-48"></div>
          </div>
          <div className="p-6 space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-gray-100 animate-pulse">
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-48"></div>
                  <div className="h-3 bg-gray-200 rounded w-24"></div>
                </div>
                <div className="h-4 bg-gray-200 rounded w-16"></div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {type === "gmail" ? "Gmail Assets" : "Google Drive Assets"}
              </h3>
              <p className="text-sm text-gray-600 mt-1">Total: {assets?.length || 0} assets</p>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline">Manage Assets in Bulk</Button>
              <Button className="bg-brand-blue hover:bg-brand-blue-dark">Export Assets</Button>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                  <div className="flex items-center space-x-1">
                    <span>Asset Name</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                  <div className="flex items-center space-x-1">
                    <span>User Name</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                  <div className="flex items-center space-x-1">
                    <span>Status</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                  <div className="flex items-center space-x-1">
                    <span>Asset Configured On</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {assets && assets.length > 0 ? (
                assets.map((asset) => (
                  <tr key={asset.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {type === "gmail" ? (
                          <Mail className="text-red-500 w-5 h-5 mr-3" />
                        ) : (
                          <HardDrive className="text-blue-500 w-5 h-5 mr-3" />
                        )}
                        <span className="font-medium text-gray-900">{asset.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">{asset.userName}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(asset.status)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      {new Date(asset.configuredOn).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Button variant="ghost" size="icon" className="text-brand-blue hover:text-brand-blue-dark">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    No {type === "gmail" ? "Gmail" : "Google Drive"} assets found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Manage Assets</h1>
        <p className="text-gray-600 mt-1">View and manage all your backup assets</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-fit grid-cols-2">
          <TabsTrigger value="gmail" className="flex items-center space-x-2">
            <Mail className="w-4 h-4" />
            <span>Gmail</span>
          </TabsTrigger>
          <TabsTrigger value="drive" className="flex items-center space-x-2">
            <HardDrive className="w-4 h-4" />
            <span>Google Drive</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="gmail">
          <AssetTable assets={gmailAssets || []} loading={gmailLoading} type="gmail" />
        </TabsContent>

        <TabsContent value="drive">
          <AssetTable assets={driveAssets || []} loading={driveLoading} type="drive" />
        </TabsContent>
      </Tabs>
    </div>
  );
}
