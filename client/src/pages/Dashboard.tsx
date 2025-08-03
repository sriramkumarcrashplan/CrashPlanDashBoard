import { useQuery } from "@tanstack/react-query";
import { Users, Server, CheckCircle, AlertTriangle, BarChart3, TrendingUp, Clock, UserX } from "lucide-react";
import MetricCard from "@/components/dashboard/MetricCard";
import CollapsibleSection from "@/components/dashboard/CollapsibleSection";
import { type DashboardMetrics, type BackupJob, type RestoreJob } from "@shared/schema";

export default function Dashboard() {
  const { data: metrics, isLoading: metricsLoading } = useQuery<DashboardMetrics>({
    queryKey: ["/api/dashboard/metrics"],
  });

  const { data: runningBackups, isLoading: backupsLoading } = useQuery<BackupJob[]>({
    queryKey: ["/api/dashboard/running-backups"],
  });

  const { data: runningRestores, isLoading: restoresLoading } = useQuery<RestoreJob[]>({
    queryKey: ["/api/dashboard/running-restores"],
  });

  if (metricsLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-48 mb-2"></div>
          <div className="h-5 bg-gray-200 rounded w-96"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-24 mb-4"></div>
              <div className="h-8 bg-gray-200 rounded w-16"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Overview of your backup and data management status</p>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Active Users"
          value={metrics?.activeUsers.toLocaleString() || "0"}
          icon={Users}
          iconColor="text-green-600"
          iconBgColor="bg-green-100"
          change="+12%"
          changeType="positive"
        />
        <MetricCard
          title="Active Assets"
          value={metrics?.activeAssets.toLocaleString() || "0"}
          icon={Server}
          iconColor="text-blue-600"
          iconBgColor="bg-blue-100"
          change="+8%"
          changeType="positive"
        />
        <MetricCard
          title="Full Backups Completed"
          value={metrics?.fullBackupsCompleted.toLocaleString() || "0"}
          icon={CheckCircle}
          iconColor="text-green-600"
          iconBgColor="bg-green-100"
          change="+15%"
          changeType="positive"
        />
        <MetricCard
          title="Assets Not Protected"
          value={metrics?.assetsNotProtected || "0"}
          icon={AlertTriangle}
          iconColor="text-red-600"
          iconBgColor="bg-red-100"
          change="-3%"
          changeType="negative"
        />
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Total Data Backed Up</h3>
          <p className="text-2xl font-bold text-gray-900">{metrics?.totalDataBackedUp || "0 TB"}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Currently Running Backups</h3>
          <p className="text-2xl font-bold text-blue-600">{metrics?.currentlyRunningBackups || "0"}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Completed Restores</h3>
          <p className="text-2xl font-bold text-green-600">{metrics?.completedRestores || "0"}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Users Without Active Assets</h3>
          <p className="text-2xl font-bold text-orange-600">{metrics?.usersWithoutActiveAssets || "0"}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Currently Running Backups */}
        <CollapsibleSection title="Currently Running Backups">
          <div className="space-y-4">
            {backupsLoading ? (
              <div className="animate-pulse space-y-3">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="flex items-center justify-between py-3 border-b border-gray-100">
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-48"></div>
                      <div className="h-3 bg-gray-200 rounded w-24"></div>
                    </div>
                    <div className="h-4 bg-gray-200 rounded w-16"></div>
                  </div>
                ))}
              </div>
            ) : runningBackups && runningBackups.length > 0 ? (
              runningBackups.map((backup) => (
                <div key={backup.id} className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div>
                    <p className="font-medium text-gray-900">{backup.userEmail}</p>
                    <p className="text-sm text-gray-500">
                      {backup.type === "gmail" ? "Gmail Backup" : "Google Drive Backup"}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-blue-600 font-medium">In Progress</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No running backups</p>
            )}
          </div>
        </CollapsibleSection>

        {/* Currently Running Restores */}
        <CollapsibleSection title="Currently Running Restores">
          <div className="space-y-4">
            {restoresLoading ? (
              <div className="animate-pulse space-y-3">
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-48"></div>
                    <div className="h-3 bg-gray-200 rounded w-24"></div>
                  </div>
                  <div className="h-4 bg-gray-200 rounded w-16"></div>
                </div>
              </div>
            ) : runningRestores && runningRestores.length > 0 ? (
              runningRestores.map((restore) => (
                <div key={restore.id} className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div>
                    <p className="font-medium text-gray-900">{restore.userEmail}</p>
                    <p className="text-sm text-gray-500">
                      {restore.type === "gmail" ? "Gmail Restore" : "Google Drive Restore"}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-green-600 font-medium">Restoring</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No running restores</p>
            )}
          </div>
        </CollapsibleSection>
      </div>

      {/* Reports Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Reports</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="text-left p-4 border border-gray-200 rounded-lg hover:border-brand-blue hover:bg-brand-blue-light transition-colors">
              <BarChart3 className="text-brand-blue w-6 h-6 mb-2" />
              <p className="font-medium text-gray-900">Data Protection Scorecard</p>
            </button>
            <button className="text-left p-4 border border-gray-200 rounded-lg hover:border-brand-blue hover:bg-brand-blue-light transition-colors">
              <TrendingUp className="text-brand-blue w-6 h-6 mb-2" />
              <p className="font-medium text-gray-900">Backup Overview</p>
            </button>
            <button className="text-left p-4 border border-gray-200 rounded-lg hover:border-brand-blue hover:bg-brand-blue-light transition-colors">
              <Clock className="text-brand-blue w-6 h-6 mb-2" />
              <p className="font-medium text-gray-900">Backup History</p>
            </button>
            <button className="text-left p-4 border border-gray-200 rounded-lg hover:border-brand-blue hover:bg-brand-blue-light transition-colors">
              <BarChart3 className="text-brand-blue w-6 h-6 mb-2" />
              <p className="font-medium text-gray-900">Custom Reports</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
