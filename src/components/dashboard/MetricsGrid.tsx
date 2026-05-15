
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Users, ShoppingCart, Package, RotateCcw, IndianRupee, Target } from "lucide-react";

const metrics = [
  {
    title: "Today's Sales",
    value: "₹1,85,000",
    target: "₹2,50,000",
    percentage: 72,
    trend: "up",
    icon: IndianRupee,
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    title: "Footfall",
    value: "245",
    target: "300",
    percentage: 82,
    trend: "up",
    icon: Users,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    title: "UPT (Units Per Transaction)",
    value: "2.4",
    target: "2.8",
    percentage: 86,
    trend: "up",
    icon: ShoppingCart,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    title: "ATV (Average Transaction Value)",
    value: "₹7,755",
    target: "₹8,333",
    percentage: 93,
    trend: "up",
    icon: Target,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
  {
    title: "Stock Value",
    value: "₹45.2L",
    target: "₹50L",
    percentage: 90,
    trend: "down",
    icon: Package,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
  },
  {
    title: "Returns Rate",
    value: "2.1%",
    target: "<3%",
    percentage: 70,
    trend: "down",
    icon: RotateCcw,
    color: "text-red-600",
    bgColor: "bg-red-50",
  },
];

export function MetricsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {metrics.map((metric, index) => (
        <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {metric.title}
            </CardTitle>
            <div className={`p-2 rounded-lg ${metric.bgColor}`}>
              <metric.icon className={`h-4 w-4 ${metric.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
                <div className="text-sm text-gray-500">Target: {metric.target}</div>
              </div>
              <div className="text-right">
                <Badge 
                  variant={metric.trend === "up" ? "default" : "secondary"}
                  className={`flex items-center gap-1 ${
                    metric.trend === "up" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}
                >
                  {metric.trend === "up" ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  {metric.percentage}%
                </Badge>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="mt-3">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Progress</span>
                <span>{metric.percentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    metric.percentage >= 80 ? "bg-green-500" :
                    metric.percentage >= 60 ? "bg-yellow-500" : "bg-red-500"
                  }`}
                  style={{ width: `${Math.min(metric.percentage, 100)}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
