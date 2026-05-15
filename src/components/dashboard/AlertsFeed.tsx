
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Package, TrendingDown, Clock, Zap } from "lucide-react";

const alerts = [
  {
    id: 1,
    type: "urgent",
    icon: AlertTriangle,
    title: "Low Stock Alert",
    message: "iPhone 15 Pro has only 3 units left",
    time: "2 mins ago",
    priority: "High",
  },
  {
    id: 2,
    type: "warning",
    icon: TrendingDown,
    title: "Return Spike",
    message: "Samsung Galaxy returns increased by 40% today",
    time: "15 mins ago",
    priority: "Medium",
  },
  {
    id: 3,
    type: "info",
    icon: Package,
    title: "Stock Arrived",
    message: "New shipment of 50 Apple AirPods received",
    time: "1 hour ago",
    priority: "Low",
  },
  {
    id: 4,
    type: "urgent",
    icon: Clock,
    title: "SLA Breach",
    message: "Home delivery #HD001 is 2 hours overdue",
    time: "30 mins ago",
    priority: "High",
  },
  {
    id: 5,
    type: "success",
    icon: Zap,
    title: "Target Achieved",
    message: "Staff member Priya hit 120% of daily target!",
    time: "45 mins ago",
    priority: "Low",
  },
];

export function AlertsFeed() {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-red-100 text-red-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      default: return "bg-green-100 text-green-800";
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case "urgent": return "text-red-500";
      case "warning": return "text-yellow-500";
      case "success": return "text-green-500";
      default: return "text-blue-500";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          🚨 AI Alerts & Insights
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-80 overflow-y-auto">
          {alerts.map((alert) => (
            <div key={alert.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className={`p-1 rounded ${getIconColor(alert.type)}`}>
                <alert.icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium text-sm text-gray-900">{alert.title}</h4>
                  <Badge className={`text-xs ${getPriorityColor(alert.priority)}`}>
                    {alert.priority}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-1">{alert.message}</p>
                <p className="text-xs text-gray-400">{alert.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
