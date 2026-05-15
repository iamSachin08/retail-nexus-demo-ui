
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Package, 
  AlertTriangle, 
  TrendingDown, 
  Clock,
  CheckCircle,
  XCircle
} from "lucide-react";

interface StockHealthReportsProps {
  searchQuery: string;
}

export function StockHealthReports({ searchQuery }: StockHealthReportsProps) {
  const stockData = [
    {
      id: "SH001",
      category: "Smartphones",
      totalItems: 1247,
      lowStock: 23,
      overstock: 45,
      expired: 2,
      healthScore: 89,
      status: "Good"
    },
    {
      id: "SH002",
      category: "Laptops", 
      totalItems: 567,
      lowStock: 12,
      overstock: 8,
      expired: 0,
      healthScore: 95,
      status: "Excellent"
    },
    {
      id: "SH003",
      category: "Accessories",
      totalItems: 2341,
      lowStock: 67,
      overstock: 123,
      expired: 15,
      healthScore: 72,
      status: "Attention"
    },
    {
      id: "SH004",
      category: "Home Appliances",
      totalItems: 456,
      lowStock: 34,
      overstock: 21,
      expired: 3,
      healthScore: 78,
      status: "Warning"
    }
  ];

  const filteredData = stockData.filter(item => 
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Excellent": return "text-green-600 bg-green-100";
      case "Good": return "text-blue-600 bg-blue-100";
      case "Warning": return "text-yellow-600 bg-yellow-100";
      case "Attention": return "text-red-600 bg-red-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredData.map((stock) => (
          <Card key={stock.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{stock.category}</CardTitle>
                  <p className="text-sm text-gray-600">Stock Health Analysis</p>
                </div>
                <Badge className={getStatusColor(stock.status)}>
                  {stock.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Health Score</span>
                <span className="text-lg font-bold">{stock.healthScore}%</span>
              </div>
              <Progress value={stock.healthScore} className="h-2" />
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-blue-600" />
                  <span>Total: {stock.totalItems}</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  <span>Low: {stock.lowStock}</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingDown className="h-4 w-4 text-orange-600" />
                  <span>Overstock: {stock.overstock}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-red-600" />
                  <span>Expired: {stock.expired}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Stock Alerts */}
      <Card>
        <CardHeader>
          <CardTitle>Critical Stock Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
              <div className="flex items-center gap-3">
                <XCircle className="h-5 w-5 text-red-600" />
                <div>
                  <p className="font-medium">iPhone 15 Pro Max - Gold 256GB</p>
                  <p className="text-sm text-gray-600">Only 2 units left</p>
                </div>
              </div>
              <Button size="sm" variant="outline">
                Reorder
              </Button>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                <div>
                  <p className="font-medium">Samsung Galaxy Buds Pro</p>
                  <p className="text-sm text-gray-600">Overstock: 45 units</p>
                </div>
              </div>
              <Button size="sm" variant="outline">
                Transfer
              </Button>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium">MacBook Air M2</p>
                  <p className="text-sm text-gray-600">Stock levels optimal</p>
                </div>
              </div>
              <Badge variant="outline" className="text-green-600">
                Optimal
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
