
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

interface ReturnSummaryProps {
  searchQuery: string;
}

export function ReturnSummary({ searchQuery }: ReturnSummaryProps) {
  const monthlyData = [
    { month: "Jan", returns: 45, amount: 125000 },
    { month: "Feb", returns: 38, amount: 98000 },
    { month: "Mar", returns: 52, amount: 145000 },
    { month: "Apr", returns: 41, amount: 112000 },
    { month: "May", returns: 47, amount: 134000 },
    { month: "Jun", returns: 39, amount: 89000 }
  ];

  const reasonData = [
    { reason: "Defective", count: 89, percentage: 36 },
    { reason: "Damaged", count: 67, percentage: 27 },
    { reason: "Changed Mind", count: 45, percentage: 18 },
    { reason: "Wrong Item", count: 32, percentage: 13 },
    { reason: "Not as Described", count: 14, percentage: 6 }
  ];

  const COLORS = ['#ef4444', '#f97316', '#3b82f6', '#8b5cf6', '#10b981'];

  const getReasonColor = (reason: string) => {
    switch (reason) {
      case "Defective": return "bg-red-100 text-red-800";
      case "Damaged": return "bg-orange-100 text-orange-800";
      case "Changed Mind": return "bg-blue-100 text-blue-800";
      case "Wrong Item": return "bg-purple-100 text-purple-800";
      case "Not as Described": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">247</div>
              <div className="text-sm text-gray-600">Total Returns</div>
              <div className="text-xs text-green-600 mt-1">↓ 12% from last month</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">₹7.2L</div>
              <div className="text-sm text-gray-600">Return Value</div>
              <div className="text-xs text-red-600 mt-1">↑ 8% from last month</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">2.8%</div>
              <div className="text-sm text-gray-600">Return Rate</div>
              <div className="text-xs text-gray-600 mt-1">Industry avg: 3.2%</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">4.2</div>
              <div className="text-sm text-gray-600">Avg Process Days</div>
              <div className="text-xs text-green-600 mt-1">↓ 0.8 days improved</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Returns Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Return Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [
                    name === 'returns' ? value : `₹${(Number(value) / 1000).toFixed(0)}K`,
                    name === 'returns' ? 'Returns' : 'Amount'
                  ]}
                />
                <Bar dataKey="returns" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Return Reasons Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Return Reasons Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={reasonData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ reason, percentage }) => `${reason} (${percentage}%)`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {reasonData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Return Reasons Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Return Reasons Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reasonData.map((item, index) => (
              <div key={item.reason} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: COLORS[index] }}
                  />
                  <div>
                    <Badge className={getReasonColor(item.reason)}>
                      {item.reason}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="font-medium">{item.count} returns</span>
                  <span className="text-gray-600">{item.percentage}%</span>
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full" 
                      style={{ 
                        width: `${item.percentage}%`, 
                        backgroundColor: COLORS[index] 
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Returned Products */}
      <Card>
        <CardHeader>
          <CardTitle>Top Returned Products</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { product: "Samsung 55\" 4K Smart TV", returns: 23, amount: "₹14.95L" },
              { product: "iPhone 15 Pro", returns: 18, amount: "₹23.38L" },
              { product: "LG 450L Refrigerator", returns: 15, amount: "₹5.25L" },
              { product: "Sony 5.1 Home Theater", returns: 12, amount: "₹3.00L" },
              { product: "Whirlpool Washing Machine", returns: 9, amount: "₹2.52L" }
            ].map((item, index) => (
              <div key={item.product} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </div>
                  <span className="font-medium">{item.product}</span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span>{item.returns} returns</span>
                  <span className="font-medium text-red-600">{item.amount}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
