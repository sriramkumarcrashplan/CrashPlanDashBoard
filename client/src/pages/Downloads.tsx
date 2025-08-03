import { Download, Monitor, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Downloads() {
  const downloads = [
    {
      name: "CrashPlan for Windows",
      version: "Version 11.0.1 - Windows 10, 11",
      icon: Monitor,
      iconColor: "text-blue-600",
    },
    {
      name: "CrashPlan for Mac",
      version: "Version 11.0.1 - macOS 10.15+",
      icon: Monitor,
      iconColor: "text-gray-600",
    },
    {
      name: "CrashPlan Mobile App",
      version: "Version 2.1.0 - iOS & Android",
      icon: Smartphone,
      iconColor: "text-green-600",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Downloads</h1>
        <p className="text-gray-600 mt-1">Download CrashPlan clients and tools</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Downloads</h3>
        <div className="space-y-4">
          {downloads.map((download, index) => {
            const Icon = download.icon;
            return (
              <div
                key={index}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-brand-blue transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <Icon className={`${download.iconColor} w-8 h-8`} />
                  <div>
                    <h4 className="font-medium text-gray-900">{download.name}</h4>
                    <p className="text-sm text-gray-500">{download.version}</p>
                  </div>
                </div>
                <Button className="bg-brand-blue text-white hover:bg-brand-blue-dark">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
