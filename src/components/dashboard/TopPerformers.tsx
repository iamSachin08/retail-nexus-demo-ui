
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Star, TrendingUp } from "lucide-react";

const topStaff = [
  { name: "Priya Sharma", sales: "₹95,000", target: 120, badge: "🏆 Top Seller" },
  { name: "Amit Kumar", sales: "₹78,000", target: 110, badge: "⭐ Rising Star" },
  { name: "Sneha Patel", sales: "₹65,000", target: 95, badge: "🔥 Hot Streak" },
];

const topProducts = [
  { name: "iPhone 15 Pro", sales: 12, revenue: "₹1,44,000" },
  { name: "Samsung Galaxy S24", sales: 8, revenue: "₹96,000" },
  { name: "MacBook Air M3", sales: 3, revenue: "₹3,60,000" },
];

export function TopPerformers() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Top Staff */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            Top Performers Today
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topStaff.map((staff, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    {staff.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{staff.name}</h4>
                    <p className="text-sm text-gray-600">{staff.sales}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className="bg-green-100 text-green-800 mb-1">
                    {staff.target}% of target
                  </Badge>
                  <p className="text-xs text-gray-500">{staff.badge}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Products */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500" />
            Best Selling Products
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">{product.name}</h4>
                  <p className="text-sm text-gray-600">{product.sales} units sold</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600">{product.revenue}</p>
                  <div className="flex items-center gap-1 text-green-600">
                    <TrendingUp className="h-3 w-3" />
                    <span className="text-xs">Trending</span>
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
