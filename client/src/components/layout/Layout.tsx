import Header from "./Header";
import Sidebar from "./Sidebar";
import Chatbot from "../chatbot/Chatbot";
import { useSidebar } from "./SidebarProvider";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { isCollapsed } = useSidebar();

  return (
    <div className="min-h-screen bg-background dark:bg-background">
      <Header />
      <Sidebar />
      <main 
        className={`mt-16 p-6 transition-all duration-300 ${
          isCollapsed ? 'ml-16' : 'ml-64'
        }`}
      >
        {children}
      </main>
      <Chatbot />
    </div>
  );
}
