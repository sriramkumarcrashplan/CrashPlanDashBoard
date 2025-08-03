import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertPolicySchema, type InsertPolicy } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
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
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
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
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create policy",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertPolicy) => {
    createPolicyMutation.mutate(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Policy</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Policy Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter policy name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter policy description"
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Tabs defaultValue="general" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="email">Email Alert Configurations</TabsTrigger>
                <TabsTrigger value="user">User Action Preferences</TabsTrigger>
                <TabsTrigger value="search">Search</TabsTrigger>
                <TabsTrigger value="advanced">Advanced</TabsTrigger>
              </TabsList>

              <TabsContent value="general" className="space-y-4">
                <FormField
                  control={form.control}
                  name="autoBackup"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Enable automatic backup</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />

                {policyType === "gmail" && (
                  <FormField
                    control={form.control}
                    name="backupAllEmails"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Backup all emails by default</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                )}
              </TabsContent>

              <TabsContent value="email">
                <p className="text-sm text-gray-600">
                  Email alert configuration options will be implemented here.
                </p>
              </TabsContent>

              <TabsContent value="user">
                <p className="text-sm text-gray-600">
                  User action preferences will be implemented here.
                </p>
              </TabsContent>

              <TabsContent value="search">
                <p className="text-sm text-gray-600">
                  Search configuration options will be implemented here.
                </p>
              </TabsContent>

              <TabsContent value="advanced">
                <p className="text-sm text-gray-600">
                  Advanced settings will be implemented here.
                </p>
              </TabsContent>
            </Tabs>

            <DialogFooter className="flex justify-end space-x-3">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-brand-blue hover:bg-brand-blue-dark"
                disabled={createPolicyMutation.isPending}
              >
                {createPolicyMutation.isPending ? "Creating..." : "Create Policy"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
