import Header from "./Header";
import Sidebar from "./Sidebar";
import Chatbot from "../chatbot/Chatbot";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />
      <main className="ml-64 mt-16 p-6">
        {children}
      </main>
      <Chatbot />
    </div>
  );
}
