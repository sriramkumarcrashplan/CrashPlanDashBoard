import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "./components/theme/ThemeProvider";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import BackupVault from "./pages/BackupVault";
import Settings from "./pages/Settings";
import ManageAssets from "./pages/ManageAssets";
import PolicyManagement from "./pages/PolicyManagement";
import Users from "./pages/Users";
import Support from "./pages/Support";
import Downloads from "./pages/Downloads";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/backup-vault" component={BackupVault} />
        <Route path="/settings" component={Settings} />
        <Route path="/manage-assets" component={ManageAssets} />
        <Route path="/policy-management" component={PolicyManagement} />
        <Route path="/users" component={Users} />
        <Route path="/support" component={Support} />
        <Route path="/downloads" component={Downloads} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
