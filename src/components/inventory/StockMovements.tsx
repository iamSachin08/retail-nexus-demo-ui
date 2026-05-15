
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, ArrowDown, RefreshCw } from "lucide-react";

export function StockMovements() {
  const movements = [
    {
      id: "MOV-001",
      sku: "SAM-TV-55-4K-001",
      product: "Samsung 55\" 4K Smart TV",
      type: "Inward",
      quantity: 10,
      source: "Main Warehouse",
      destination: "Phoenix Mall Store",
      timestamp: "2024-01-15 10:30 AM",
      reference: "PO-2024-001"
    },
    {
      id: "MOV-002",
      sku: "LG-REF-450L-002",
      product: "LG 450L Double Door Refrigerator",
      type: "Outward",
      quantity: 2,
      source: "Phoenix Mall Store",
      destination: "Customer Sale",
      timestamp: "2024-01-15 02:15 PM",
      reference: "INV-2024-156"
    },
    {
      id: "MOV-003",
      sku: "SON-HT-5.1-003",
      product: "Sony 5.1 Home Theater System",
      type: "Transfer",
      quantity: 3,
      source: "Phoenix Mall Store",
      destination: "Central Mall Store",
      timestamp: "2024-01-14 04:45 PM",
      reference: "TRF-2024-023"
    },
    {
      id: "MOV-004",
      sku: "WHI-WM-7KG-004",
      product: "Whirlpool 7kg Front Load",
      type: "Return",
      quantity: 1,
      source: "Customer",
      destination: "Phoenix Mall Store",
      timestamp: "2024-01-14 11:20 AM",
      reference: "RET-2024-089"
    }
  ];

  const getMovementIcon = (type: string) => {
    switch (type) {
      case "Inward": return <ArrowDown className="h-4 w-4 text-green-600" />;
      case "Outward": return <ArrowUp className="h-4 w-4 text-red-600" />;
      case "Transfer": return <RefreshCw className="h-4 w-4 text-blue-600" />;
      case "Return": return <RefreshCw className="h-4 w-4 text-orange-600" />;
      default: return <RefreshCw className="h-4 w-4 text-gray-600" />;
    }
  };

  const getMovementColor = (type: string) => {
    switch (type) {
      case "Inward": return "bg-green-100 text-green-800";
      case "Outward": return "bg-red-100 text-red-800";
      case "Transfer": return "bg-blue-100 text-blue-800";
      case "Return": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Recent Stock Movements</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {movements.map((movement) => (
              <div key={movement.id} className="p-6 hover:bg-gray-50">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      {getMovementIcon(movement.type)}
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                        <h4 className="font-medium text-gray-900">{movement.product}</h4>
                        <Badge className={getMovementColor(movement.type)}>
                          {movement.type}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600">
                        <p><span className="font-medium">SKU:</span> {movement.sku}</p>
                        <p><span className="font-medium">Quantity:</span> {movement.quantity}</p>
                        <p><span className="font-medium">From:</span> {movement.source}</p>
                        <p><span className="font-medium">To:</span> {movement.destination}</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="text-sm font-medium">{movement.reference}</p>
                    <p className="text-xs text-gray-500">{movement.timestamp}</p>
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
