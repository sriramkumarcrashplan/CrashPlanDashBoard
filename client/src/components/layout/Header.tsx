import { Search, Bell, Settings, Shield, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSidebar } from "./SidebarProvider";
import ThemeToggle from "../theme/ThemeToggle";

export default function Header() {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="fixed top-0 left-0 right-0 bg-nav-blue shadow-lg z-40 h-16">
      <div className="flex items-center justify-between h-full px-6">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="p-2 text-white hover:text-gray-200 hover:bg-white/10 rounded-lg transition-colors"
          >
            <Menu className="w-5 h-5" />
          </Button>
          <div className="flex items-center space-x-2">
            <Shield className="w-8 h-8 text-white" />
            <span className="text-xl font-bold text-white">CrashPlan</span>
          </div>
        </div>
        
        <div className="flex-1 max-w-md mx-6">
          <div className="relative">
            <Input 
              type="text" 
              placeholder="Search..." 
              className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/70 focus:ring-2 focus:ring-white/30 focus:border-white/30 focus:bg-white/20"
            />
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70" />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <button className="p-2 text-white hover:text-gray-200 hover:bg-white/10 rounded-lg transition-colors">
            <Bell className="w-5 h-5" />
          </button>
          <button className="p-2 text-white hover:text-gray-200 hover:bg-white/10 rounded-lg transition-colors">
            <Settings className="w-5 h-5" />
          </button>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">JD</span>
            </div>
            <span className="text-sm font-medium text-white">John Doe</span>
          </div>
        </div>
      </div>
    </header>
  );
}
