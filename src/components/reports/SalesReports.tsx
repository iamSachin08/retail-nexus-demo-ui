
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  TrendingUp, 
  Download, 
  Calendar,
  Users,
  Package,
  DollarSign
} from "lucide-react";

interface SalesReportsProps {
  searchQuery: string;
}

export function SalesReports({ searchQuery }: SalesReportsProps) {
  const salesData = [
    {
      id: "SR001",
      title: "Daily Sales Summary",
      period: "Today",
      revenue: "₹2,45,890",
      orders: 156,
      trend: "+12%",
      category: "Overall"
    },
    {
      id: "SR002", 
      title: "Brand Performance",
      period: "This Week",
      revenue: "₹18,45,670",
      orders: 1247,
      trend: "+8%",
      category: "Samsung"
    },
    {
      id: "SR003",
      title: "Category Analysis", 
      period: "This Month",
      revenue: "₹67,89,340",
      orders: 4532,
      trend: "+15%",
      category: "Smartphones"
    },
    {
      id: "SR004",
      title: "Staff Performance",
      period: "This Week", 
      revenue: "₹12,34,560",
      orders: 892,
      trend: "+5%",
      category: "Raj Kumar"
    }
  ];

  const filteredData = salesData.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredData.map((report) => (
          <Card key={report.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{report.title}</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">{report.period}</p>
                </div>
                <Badge variant="outline" className="text-xs">
                  {report.category}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Revenue</p>
                  <p className="text-xl font-bold text-green-600">{report.revenue}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Orders</p>
                  <p className="text-xl font-bold">{report.orders}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-green-600">{report.trend}</span>
                </div>
                <Button size="sm" variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Action Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Button variant="outline" className="h-20 flex-col gap-2">
          <BarChart3 className="h-6 w-6" />
          <span className="text-sm">Sales Analytics</span>
        </Button>
        <Button variant="outline" className="h-20 flex-col gap-2">
          <Calendar className="h-6 w-6" />
          <span className="text-sm">Period Comparison</span>
        </Button>
        <Button variant="outline" className="h-20 flex-col gap-2">
          <Users className="h-6 w-6" />
          <span className="text-sm">Staff Reports</span>
        </Button>
        <Button variant="outline" className="h-20 flex-col gap-2">
          <Package className="h-6 w-6" />
          <span className="text-sm">Product Reports</span>
        </Button>
      </div>
    </div>
  );
}
