import { Search, Bell, Settings, Shield } from "lucide-react";
import { Input } from "@/components/ui/input";
import ThemeToggle from "../theme/ThemeToggle";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white dark:bg-card border-b border-gray-200 dark:border-border shadow-sm z-40 h-16">
      <div className="flex items-center justify-between h-full px-6">
        <div className="flex items-center space-x-2">
          <Shield className="w-8 h-8 text-brand-blue" />
          <span className="text-xl font-bold text-foreground">CrashPlan</span>
        </div>
        
        <div className="flex-1 max-w-md mx-6">
          <div className="relative">
            <Input 
              type="text" 
              placeholder="Search..." 
              className="w-full pl-10 pr-4 py-2 border border-input rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-brand-blue"
            />
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors">
            <Bell className="w-5 h-5" />
          </button>
          <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors">
            <Settings className="w-5 h-5" />
          </button>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-brand-blue rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">JD</span>
            </div>
            <span className="text-sm font-medium text-foreground">John Doe</span>
          </div>
        </div>
      </div>
    </header>
  );
}
