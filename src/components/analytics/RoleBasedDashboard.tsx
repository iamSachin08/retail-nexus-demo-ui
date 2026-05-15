
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  TrendingDown, 
  ShoppingBag, 
  Users, 
  Target,
  AlertTriangle,
  Award,
  BarChart3
} from "lucide-react";

interface RoleBasedDashboardProps {
  currentRole: string;
}

export function RoleBasedDashboard({ currentRole }: RoleBasedDashboardProps) {
  const roleData = {
    store_manager: {
      title: "Store Manager Dashboard",
      kpis: [
        { name: "Daily Sales", value: "₹2,45,600", change: "+12%", trend: "up", target: 85 },
        { name: "Margin %", value: "18.5%", change: "+2.1%", trend: "up", target: 92 },
        { name: "Conversion", value: "68%", change: "-3%", trend: "down", target: 68 },
        { name: "UPT", value: "2.4", change: "+0.2", trend: "up", target: 80 },
      ],
      categories: [
        { name: "Smartphones", sales: "₹85K", margin: "12%", returns: "2%" },
        { name: "Laptops", sales: "₹65K", margin: "15%", returns: "1%" },
        { name: "TVs", sales: "₹45K", margin: "22%", returns: "3%" },
        { name: "AC", sales: "₹35K", margin: "18%", returns: "1%" },
      ]
    },
    cluster_head: {
      title: "Cluster Head Dashboard",
      kpis: [
        { name: "Cluster Sales", value: "₹12.5L", change: "+8%", trend: "up", target: 78 },
        { name: "Avg Margin", value: "16.8%", change: "+1.2%", trend: "up", target: 84 },
        { name: "Store Performance", value: "7/8", change: "87.5%", trend: "up", target: 87 },
        { name: "Team Efficiency", value: "82%", change: "+5%", trend: "up", target: 82 },
      ],
      categories: [
        { name: "Store A", sales: "₹2.8L", margin: "18%", returns: "2%" },
        { name: "Store B", sales: "₹2.1L", margin: "16%", returns: "3%" },
        { name: "Store C", sales: "₹1.9L", margin: "15%", returns: "2%" },
        { name: "Store D", sales: "₹1.7L", margin: "17%", returns: "1%" },
      ]
    }
  };

  const data = roleData[currentRole as keyof typeof roleData];

  return (
    <div className="space-y-4 md:space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg md:text-xl">{data.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {data.kpis.map((kpi, index) => (
              <div key={index} className="space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs md:text-sm text-gray-600">{kpi.name}</p>
                    <p className="text-lg md:text-xl font-semibold">{kpi.value}</p>
                  </div>
                  <Badge 
                    variant={kpi.trend === 'up' ? 'default' : 'destructive'}
                    className="text-xs"
                  >
                    {kpi.trend === 'up' ? (
                      <TrendingUp className="h-3 w-3 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 mr-1" />
                    )}
                    {kpi.change}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>Target Progress</span>
                    <span>{kpi.target}%</span>
                  </div>
                  <Progress value={kpi.target} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Performance Breakdown */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base md:text-lg flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              {currentRole === 'store_manager' ? 'Category Performance' : 'Store Performance'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.categories.map((item, index) => (
                <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      {currentRole === 'store_manager' ? (
                        <ShoppingBag className="h-4 w-4 text-blue-600" />
                      ) : (
                        <Users className="h-4 w-4 text-blue-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-sm md:text-base">{item.name}</p>
                      <p className="text-xs md:text-sm text-gray-600">
                        Margin: {item.margin} | Returns: {item.returns}
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className="self-start sm:self-center">
                    {item.sales}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Alerts & Actions */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base md:text-lg flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              Key Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-red-800">Low Stock Alert</p>
                    <p className="text-xs text-red-600">iPhone 15 Pro - Only 3 units left</p>
                  </div>
                  <Button size="sm" variant="outline" className="text-xs">
                    Action
                  </Button>
                </div>
              </div>
              
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <Target className="h-4 w-4 text-yellow-500 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-yellow-800">Target Achievement</p>
                    <p className="text-xs text-yellow-600">15% behind monthly target</p>
                  </div>
                  <Button size="sm" variant="outline" className="text-xs">
                    View
                  </Button>
                </div>
              </div>
              
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <Award className="h-4 w-4 text-green-500 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-green-800">Achievement</p>
                    <p className="text-xs text-green-600">Best performing store this week</p>
                  </div>
                  <Button size="sm" variant="outline" className="text-xs">
                    Details
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
