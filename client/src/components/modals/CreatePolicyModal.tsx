import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertPolicySchema, type InsertPolicy } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { ChevronRight, Plus, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CreatePolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  policyType: "gmail" | "drive";
}

export default function CreatePolicyModal({
  isOpen,
  onClose,
  policyType,
}: CreatePolicyModalProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // Local state for the form fields
  const [policyName, setPolicyName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedSchedule, setSelectedSchedule] = useState("sch1");
  const [purgeDeletedEnabled, setPurgeDeletedEnabled] = useState(false);
  const [purgeDeletedDays, setPurgeDeletedDays] = useState("UNLIMITED");
  const [deleteArchiveEnabled, setDeleteArchiveEnabled] = useState(false);
  const [deleteArchiveDays, setDeleteArchiveDays] = useState("UNLIMITED");
  const [defaultFolderInput, setDefaultFolderInput] = useState("");
  const [exclusionFolderInput, setExclusionFolderInput] = useState("");
  const [defaultFolders, setDefaultFolders] = useState(["/"]); 
  const [excludedFolders, setExcludedFolders] = useState(["spam"]);

  const form = useForm<InsertPolicy>({
    resolver: zodResolver(insertPolicySchema),
    defaultValues: {
      name: "",
      description: "",
      type: policyType,
      usersMapped: 0,
      autoBackup: true,
      backupAllEmails: true,
    },
  });

  const createPolicyMutation = useMutation({
    mutationFn: async (data: InsertPolicy) => {
      const response = await apiRequest("POST", "/api/policies", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/policies"] });
      toast({
        title: "Success",
        description: "Policy created successfully",
      });
      onClose();
      resetForm();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create policy",
        variant: "destructive",
      });
    },
  });

  const resetForm = () => {
    setPolicyName("");
    setDescription("");
    setSelectedSchedule("sch1");
    setPurgeDeletedEnabled(false);
    setPurgeDeletedDays("UNLIMITED");
    setDeleteArchiveEnabled(false);
    setDeleteArchiveDays("UNLIMITED");
    setDefaultFolderInput("");
    setExclusionFolderInput("");
    setDefaultFolders(["/"]);
    setExcludedFolders(["spam"]);
  };

  const handleSave = () => {
    if (!policyName.trim()) {
      toast({
        title: "Error",
        description: "Policy name is required",
        variant: "destructive",
      });
      return;
    }

    const data: InsertPolicy = {
      name: policyName,
      description: description,
      type: policyType,
      usersMapped: 0,
      autoBackup: true,
      backupAllEmails: true,
    };

    createPolicyMutation.mutate(data);
  };

  const addDefaultFolder = () => {
    if (defaultFolderInput.trim() && !defaultFolders.includes(defaultFolderInput.trim())) {
      setDefaultFolders([...defaultFolders, defaultFolderInput.trim()]);
      setDefaultFolderInput("");
    }
  };

  const addExclusionFolder = () => {
    if (exclusionFolderInput.trim() && !excludedFolders.includes(exclusionFolderInput.trim())) {
      setExcludedFolders([...excludedFolders, exclusionFolderInput.trim()]);
      setExclusionFolderInput("");
    }
  };

  const removeDefaultFolder = (folder: string) => {
    setDefaultFolders(defaultFolders.filter(f => f !== folder));
  };

  const removeExcludedFolder = (folder: string) => {
    setExcludedFolders(excludedFolders.filter(f => f !== folder));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[95vh] overflow-y-auto p-0">
        <div className="flex flex-col h-full">
          {/* Header with Breadcrumb */}
          <div className="p-6 border-b border-gray-200 bg-white">
            <div className="flex items-center text-sm text-gray-600 mb-4">
              <span>Policy Management</span>
              <ChevronRight className="w-4 h-4 mx-2" />
              <span>{policyType === "gmail" ? "Gmail Policies" : "Google Drive Policies"}</span>
              <ChevronRight className="w-4 h-4 mx-2" />
              <span className="text-gray-900 font-medium">Create Policy</span>
            </div>
          </div>

          <div className="flex-1 p-6">
            {/* Policy Name and Description */}
            <div className="space-y-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Policy Name *
                </label>
                <Input
                  type="text"
                  placeholder="Enter Policy Name"
                  value={policyName}
                  onChange={(e) => setPolicyName(e.target.value)}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <Textarea
                  placeholder="Enter description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="w-full resize-y"
                />
              </div>
            </div>

            {/* Tabbed Interface */}
            <Tabs defaultValue="general" className="w-full">
              <TabsList className="grid w-full grid-cols-5 mb-6">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="email">Email Alert Configurations</TabsTrigger>
                <TabsTrigger value="user">User action preferences</TabsTrigger>
                <TabsTrigger value="search">Search</TabsTrigger>
                <TabsTrigger value="advanced">Advanced</TabsTrigger>
              </TabsList>

              <TabsContent value="general">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left Column */}
                  <div className="space-y-8">
                    {/* Backup Information Section */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Backup Information</h3>
                      
                      <div className="space-y-6">
                        {/* Schedules */}
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <label className="block text-sm font-medium text-gray-700">
                              Schedules
                            </label>
                            <button className="text-brand-blue text-sm hover:underline">
                              Create New Schedule
                            </button>
                          </div>
                          <Select value={selectedSchedule} onValueChange={setSelectedSchedule}>
                            <SelectTrigger className="w-full">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="sch1">sch1</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Purge deleted emails */}
                        <div>
                          <div className="flex items-center space-x-3 mb-2">
                            <Switch
                              checked={purgeDeletedEnabled}
                              onCheckedChange={setPurgeDeletedEnabled}
                            />
                            <label className="text-sm text-gray-700">
                              Purge deleted emails from the catalog after:
                            </label>
                          </div>
                          <div className="flex items-center space-x-2 ml-10">
                            <Input
                              type="text"
                              value={purgeDeletedDays}
                              onChange={(e) => setPurgeDeletedDays(e.target.value)}
                              disabled={!purgeDeletedEnabled}
                              className="w-32"
                            />
                            <span className="text-sm text-gray-600">days</span>
                          </div>
                        </div>

                        {/* Delete emails from archive */}
                        <div>
                          <div className="flex items-center space-x-3 mb-2">
                            <Switch
                              checked={deleteArchiveEnabled}
                              onCheckedChange={setDeleteArchiveEnabled}
                            />
                            <label className="text-sm text-gray-700">
                              Delete emails from the archive after:
                            </label>
                          </div>
                          <div className="flex items-center space-x-2 ml-10">
                            <Input
                              type="text"
                              value={deleteArchiveDays}
                              onChange={(e) => setDeleteArchiveDays(e.target.value)}
                              disabled={!deleteArchiveEnabled}
                              className="w-32"
                            />
                            <span className="text-sm text-gray-600">days</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Asset Information Section */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Asset Information</h3>
                      
                      <div className="space-y-4">
                        {/* Default Folders to Backup */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Default Folders to Backup
                          </label>
                          <div className="flex space-x-2">
                            <Input
                              type="text"
                              placeholder="Enter Default Folders to Backup"
                              value={defaultFolderInput}
                              onChange={(e) => setDefaultFolderInput(e.target.value)}
                              onKeyPress={(e) => e.key === 'Enter' && addDefaultFolder()}
                              className="flex-1"
                            />
                            <Button
                              type="button"
                              onClick={addDefaultFolder}
                              className="bg-brand-blue hover:bg-brand-blue-dark"
                            >
                              Add
                            </Button>
                          </div>
                        </div>

                        {/* Exclusion Folder Name */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Exclusion Folder Name
                          </label>
                          <div className="flex space-x-2">
                            <Input
                              type="text"
                              placeholder="Enter the full path of the folder"
                              value={exclusionFolderInput}
                              onChange={(e) => setExclusionFolderInput(e.target.value)}
                              onKeyPress={(e) => e.key === 'Enter' && addExclusionFolder()}
                              className="flex-1"
                            />
                            <Button
                              type="button"
                              onClick={addExclusionFolder}
                              className="bg-brand-blue hover:bg-brand-blue-dark"
                            >
                              Add
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    {/* Schedule Details Box */}
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <h4 className="text-md font-semibold text-gray-900 mb-3">Schedule Details</h4>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-700">{selectedSchedule}</p>
                          <p className="text-sm text-gray-500">9:45 hrs</p>
                        </div>
                        <Button size="sm" className="bg-brand-blue hover:bg-brand-blue-dark">
                          Edit
                        </Button>
                      </div>
                    </div>

                    {/* Folders List Box */}
                    <div className="bg-white border border-gray-200 rounded-lg p-4 max-h-96 overflow-y-auto">
                      {/* Default Folders Section */}
                      <div className="mb-6">
                        <h4 className="text-md font-semibold text-gray-900 mb-3">Default Folders</h4>
                        <div className="space-y-2">
                          {defaultFolders.map((folder, index) => (
                            <div key={index} className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded">
                              <span className="text-sm text-gray-700">{folder}</span>
                              <button
                                onClick={() => removeDefaultFolder(folder)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Excluded Folders Section */}
                      <div>
                        <h4 className="text-md font-semibold text-gray-900 mb-3">Excluded Folders</h4>
                        <div className="space-y-2">
                          {excludedFolders.map((folder, index) => (
                            <div key={index} className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded">
                              <span className="text-sm text-gray-700">{folder}</span>
                              <button
                                onClick={() => removeExcludedFolder(folder)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="email">
                <div className="text-center py-12 text-gray-500">
                  Email alert configuration options will be implemented here.
                </div>
              </TabsContent>

              <TabsContent value="user">
                <div className="text-center py-12 text-gray-500">
                  User action preferences will be implemented here.
                </div>
              </TabsContent>

              <TabsContent value="search">
                <div className="text-center py-12 text-gray-500">
                  Search configuration options will be implemented here.
                </div>
              </TabsContent>

              <TabsContent value="advanced">
                <div className="text-center py-12 text-gray-500">
                  Advanced settings will be implemented here.
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Footer Actions */}
          <div className="p-6 border-t border-gray-200 bg-gray-50">
            <div className="flex justify-end space-x-3">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleSave}
                className="bg-brand-blue hover:bg-brand-blue-dark"
                disabled={createPolicyMutation.isPending}
              >
                {createPolicyMutation.isPending ? "Saving..." : "Save"}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
