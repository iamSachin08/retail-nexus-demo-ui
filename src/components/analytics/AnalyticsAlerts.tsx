
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  Bell, 
  AlertTriangle, 
  TrendingDown, 
  Package, 
  Users,
  Settings
} from "lucide-react";

export function AnalyticsAlerts() {
  const alerts = [
    {
      id: 1,
      type: "critical",
      title: "Sales Dip Alert",
      message: "Electronics category sales down 15% vs last week",
      time: "2 hours ago",
      icon: TrendingDown,
      enabled: true
    },
    {
      id: 2,
      type: "warning",
      title: "Inventory Alert",
      message: "iPhone 15 Pro stock below reorder level",
      time: "4 hours ago",
      icon: Package,
      enabled: true
    },
    {
      id: 3,
      type: "info",
      title: "Performance Alert",
      message: "Team achieved 95% of weekly target",
      time: "1 day ago",
      icon: Users,
      enabled: true
    }
  ];

  const alertSettings = [
    { name: "Sales Performance Alerts", description: "Get notified about sales targets and performance", enabled: true },
    { name: "Inventory Alerts", description: "Low stock and overstock notifications", enabled: true },
    { name: "Team Performance", description: "Staff performance and achievement alerts", enabled: false },
    { name: "Customer Insights", description: "Customer behavior and satisfaction alerts", enabled: true },
    { name: "Daily Summary", description: "End of day performance summary", enabled: true },
  ];

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'critical': return 'bg-red-50 border-red-200';
      case 'warning': return 'bg-yellow-50 border-yellow-200';
      default: return 'bg-blue-50 border-blue-200';
    }
  };

  const getAlertBadgeColor = (type: string) => {
    switch (type) {
      case 'critical': return 'destructive';
      case 'warning': return 'secondary';
      default: return 'default';
    }
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Active Alerts */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base md:text-lg flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Active Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alerts.map((alert) => (
                <div key={alert.id} className={`p-3 rounded-lg border ${getAlertColor(alert.type)}`}>
                  <div className="flex items-start gap-3">
                    <alert.icon className="h-5 w-5 mt-1 text-gray-600" />
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <p className="font-medium text-sm">{alert.title}</p>
                        <Badge variant={getAlertBadgeColor(alert.type)} className="text-xs self-start sm:self-center">
                          {alert.type}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">{alert.message}</p>
                      <p className="text-xs text-gray-500 mt-2">{alert.time}</p>
                    </div>
                    <Button size="sm" variant="outline" className="text-xs">
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Alert Settings */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base md:text-lg flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Alert Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alertSettings.map((setting, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-sm">{setting.name}</p>
                      <Switch checked={setting.enabled} />
                    </div>
                    <p className="text-xs text-gray-600 mt-1">{setting.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Button variant="outline" className="w-full text-sm">
                Configure Advanced Settings
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alert Subscriptions */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Subscribe to Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Button variant="outline" className="justify-start">
              <Bell className="h-4 w-4 mr-2" />
              Email Alerts
            </Button>
            <Button variant="outline" className="justify-start">
              <Bell className="h-4 w-4 mr-2" />
              SMS Alerts
            </Button>
            <Button variant="outline" className="justify-start">
              <Bell className="h-4 w-4 mr-2" />
              WhatsApp Alerts
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
