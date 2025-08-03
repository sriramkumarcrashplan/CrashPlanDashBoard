import { useLocation } from "wouter";
import { Link } from "wouter";
import { 
  LayoutDashboard, 
  Vault, 
  Settings, 
  Server, 
  ClipboardList, 
  Users, 
  LifeBuoy, 
  Download,
  ChevronLeft
} from "lucide-react";
import { useSidebar } from "./SidebarProvider";
import { Button } from "@/components/ui/button";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "My Backup Vault", href: "/backup-vault", icon: Vault },
  { name: "Settings", href: "/settings", icon: Settings },
  { name: "Manage Assets", href: "/manage-assets", icon: Server },
  { name: "Policy Management", href: "/policy-management", icon: ClipboardList },
  { name: "Users", href: "/users", icon: Users },
  { name: "Support", href: "/support", icon: LifeBuoy },
  { name: "Downloads", href: "/downloads", icon: Download },
];

export default function Sidebar() {
  const [location] = useLocation();
  const { isCollapsed, toggleSidebar } = useSidebar();

  return (
    <nav 
      className={`fixed left-0 top-16 bottom-0 bg-white dark:bg-card shadow-lg z-30 overflow-y-auto sidebar-transition ${
        isCollapsed ? 'sidebar-collapsed' : 'sidebar-expanded'
      }`}
    >
      <div className="p-4">
        {/* Collapse Toggle Button */}
        <div className="flex justify-end mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <ChevronLeft 
              className={`w-5 h-5 rotate-transition ${isCollapsed ? 'rotate-180' : ''}`} 
            />
          </Button>
        </div>

        <ul className="space-y-2">
          {navigation.map((item) => {
            const isActive = location === item.href;
            const Icon = item.icon;
            
            return (
              <li key={item.name}>
                <Link href={item.href}>
                  <button
                    className={`w-full flex items-center ${
                      isCollapsed ? 'justify-center px-2' : 'space-x-3 px-4'
                    } py-3 text-left rounded-lg transition-colors ${
                      isActive
                        ? "bg-brand-blue-light dark:bg-brand-blue/20 text-brand-blue"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                    title={isCollapsed ? item.name : undefined}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    {!isCollapsed && (
                      <span className="font-medium truncate">{item.name}</span>
                    )}
                  </button>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
