import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Mail, HardDrive, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CreatePolicyModal from "@/components/modals/CreatePolicyModal";
import { type Policy } from "@shared/schema";

export default function PolicyManagement() {
  const [activeTab, setActiveTab] = useState("gmail");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const { data: gmailPolicies, isLoading: gmailLoading } = useQuery<Policy[]>({
    queryKey: ["/api/policies", { type: "gmail" }],
    queryFn: async () => {
      const response = await fetch("/api/policies?type=gmail");
      return response.json();
    },
  });

  const { data: drivePolicies, isLoading: driveLoading } = useQuery<Policy[]>({
    queryKey: ["/api/policies", { type: "drive" }],
    queryFn: async () => {
      const response = await fetch("/api/policies?type=drive");
      return response.json();
    },
  });

  const PolicySection = ({ policies, loading, type }: { policies: Policy[], loading: boolean, type: string }) => {
    if (loading) {
      return (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-48 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
                <div className="h-10 bg-gray-200 rounded w-32"></div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Policy Configuration</h3>
            <p className="text-gray-600 mb-4">
              Create and modify backup policies for {type === "gmail" ? "Gmail" : "Google Drive"} accounts.
            </p>
            <Button 
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-brand-blue text-white hover:bg-brand-blue-dark"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create New Policy
            </Button>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Policy Mapping</h3>
            <p className="text-gray-600 mb-4">
              Map policies to users and groups for automatic application.
            </p>
            <Button variant="outline">Manage Mappings</Button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              {type === "gmail" ? "Gmail Policies" : "Google Drive Policies"}
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Policy Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Users Mapped to Policy
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {policies && policies.length > 0 ? (
                  policies.map((policy) => (
                    <tr key={policy.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                        {policy.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                        {policy.usersMapped.toLocaleString()} users
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm" className="text-brand-blue hover:text-brand-blue-dark">
                            View
                          </Button>
                          <Button variant="ghost" size="sm" className="text-brand-blue hover:text-brand-blue-dark">
                            Edit
                          </Button>
                          <Button variant="ghost" size="sm" className="text-brand-blue hover:text-brand-blue-dark">
                            Clone
                          </Button>
                          <Button variant="ghost" size="sm" className="text-brand-blue hover:text-brand-blue-dark">
                            Download
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                      No {type === "gmail" ? "Gmail" : "Google Drive"} policies found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Policy Management</h1>
        <p className="text-muted-foreground mt-1">Create and manage backup policies for your organization</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-fit grid-cols-2">
          <TabsTrigger value="gmail" className="flex items-center space-x-2">
            <Mail className="w-4 h-4" />
            <span>Gmail Policies</span>
          </TabsTrigger>
          <TabsTrigger value="drive" className="flex items-center space-x-2">
            <HardDrive className="w-4 h-4" />
            <span>Google Drive Policies</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="gmail">
          <PolicySection policies={gmailPolicies || []} loading={gmailLoading} type="gmail" />
        </TabsContent>

        <TabsContent value="drive">
          <PolicySection policies={drivePolicies || []} loading={driveLoading} type="drive" />
        </TabsContent>
      </Tabs>

      <CreatePolicyModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        policyType={activeTab as "gmail" | "drive"}
      />
    </div>
  );
}
