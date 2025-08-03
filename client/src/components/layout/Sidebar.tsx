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
    <nav className="fixed left-0 top-16 bottom-0 w-64 bg-white border-r border-gray-200 z-30 overflow-y-auto">
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
                        ? "bg-brand-blue-light text-brand-blue"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
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
