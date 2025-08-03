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
      className={`fixed left-0 top-16 bottom-0 bg-nav-blue shadow-lg z-30 overflow-y-auto sidebar-transition ${
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
            className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
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
                        ? "bg-white/20 text-white"
                        : "text-white/80 hover:text-white hover:bg-white/10"
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
