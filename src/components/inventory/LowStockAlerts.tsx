
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, ShoppingCart, Package } from "lucide-react";

export function LowStockAlerts() {
  const alerts = [
    {
      sku: "LG-REF-450L-002",
      product: "LG 450L Double Door Refrigerator",
      currentStock: 3,
      minStock: 5,
      reorderLevel: 10,
      lastSold: "2 days ago",
      avgSalesPerWeek: 2,
      urgency: "High",
      suggestedOrder: 12
    },
    {
      sku: "WHI-WM-7KG-004",
      product: "Whirlpool 7kg Front Load",
      currentStock: 0,
      minStock: 2,
      reorderLevel: 8,
      lastSold: "1 day ago",
      avgSalesPerWeek: 3,
      urgency: "Critical",
      suggestedOrder: 15
    },
    {
      sku: "SON-AC-1.5T-005",
      product: "Sony 1.5 Ton Split AC",
      currentStock: 4,
      minStock: 6,
      reorderLevel: 12,
      lastSold: "3 days ago",
      avgSalesPerWeek: 4,
      urgency: "Medium",
      suggestedOrder: 18
    }
  ];

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "Critical": return "bg-red-100 text-red-800";
      case "High": return "bg-orange-100 text-orange-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getUrgencyIcon = (urgency: string) => {
    if (urgency === "Critical") {
      return <AlertTriangle className="h-5 w-5 text-red-600" />;
    }
    return <AlertTriangle className="h-5 w-5 text-orange-600" />;
  };

  return (
    <div className="space-y-6">
      {/* Alert Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-8 w-8 text-red-600" />
              <div>
                <p className="text-xl font-bold text-red-600">1</p>
                <p className="text-sm text-red-700">Critical Alerts</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-xl font-bold text-orange-600">1</p>
                <p className="text-sm text-orange-700">High Priority</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-8 w-8 text-yellow-600" />
              <div>
                <p className="text-xl font-bold text-yellow-600">1</p>
                <p className="text-sm text-yellow-700">Medium Priority</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Low Stock Items */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Low Stock Items
            </CardTitle>
            <Button>
              <ShoppingCart className="h-4 w-4 mr-2" />
              Create Purchase Order
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {alerts.map((alert) => (
              <div key={alert.sku} className="p-6 hover:bg-gray-50">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      {getUrgencyIcon(alert.urgency)}
                    </div>
                    <div className="flex-1 space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                        <h4 className="font-medium text-gray-900">{alert.product}</h4>
                        <Badge className={getUrgencyColor(alert.urgency)}>
                          {alert.urgency}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">Current:</span> {alert.currentStock}
                        </div>
                        <div>
                          <span className="font-medium">Min Stock:</span> {alert.minStock}
                        </div>
                        <div>
                          <span className="font-medium">Avg Weekly Sales:</span> {alert.avgSalesPerWeek}
                        </div>
                        <div>
                          <span className="font-medium">Last Sold:</span> {alert.lastSold}
                        </div>
                      </div>
                      <p className="text-xs text-gray-500">SKU: {alert.sku}</p>
                    </div>
                  </div>
                  <div className="text-right space-y-2">
                    <p className="text-lg font-semibold text-blue-600">
                      Order: {alert.suggestedOrder}
                    </p>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        Reorder
                      </Button>
                      <Button size="sm">
                        Quick Order
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
