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
  Download
} from "lucide-react";

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

  return (
    <nav className="fixed left-0 top-16 bottom-0 w-64 bg-nav-blue shadow-lg z-30 overflow-y-auto">
      <div className="p-4">


        <ul className="space-y-2">
          {navigation.map((item) => {
            const isActive = location === item.href;
            const Icon = item.icon;
            
            return (
              <li key={item.name}>
                <Link href={item.href}>
                  <button
                    className={`w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg transition-colors ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "text-white/80 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span className="font-medium truncate">{item.name}</span>
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
