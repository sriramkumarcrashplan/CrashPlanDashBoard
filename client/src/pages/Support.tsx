import { Book, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Support() {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Support</h1>
        <p className="text-muted-foreground mt-1">Get help and access support resources</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-lg shadow-sm border border-border p-6">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mb-4">
            <Book className="text-blue-600 dark:text-blue-400 w-6 h-6" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Documentation</h3>
          <p className="text-muted-foreground mb-4">
            Access comprehensive guides and documentation for CrashPlan.
          </p>
          <Button className="bg-brand-blue text-white hover:bg-brand-blue-dark">
            View Documentation
          </Button>
        </div>

        <div className="bg-card rounded-lg shadow-sm border border-border p-6">
          <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center mb-4">
            <Headphones className="text-green-600 dark:text-green-400 w-6 h-6" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Contact Support</h3>
          <p className="text-muted-foreground mb-4">
            Get in touch with our support team for personalized assistance.
          </p>
          <Button className="bg-brand-blue text-white hover:bg-brand-blue-dark">
            Contact Support
          </Button>
        </div>
      </div>
    </div>
  );
}
