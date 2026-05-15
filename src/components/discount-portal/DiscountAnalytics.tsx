
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

export function DiscountAnalytics() {
  const monthlyDiscounts = [
    { month: 'Oct', requests: 45, approved: 32, rejected: 13, value: 28500 },
    { month: 'Nov', requests: 52, approved: 38, rejected: 14, value: 35200 },
    { month: 'Dec', requests: 68, approved: 51, rejected: 17, value: 48600 },
    { month: 'Jan', requests: 89, approved: 58, rejected: 31, value: 45680 },
  ];

  const discountReasons = [
    { name: 'Price Negotiation', value: 35, color: '#8884d8' },
    { name: 'Competitor Match', value: 25, color: '#82ca9d' },
    { name: 'EOL Clearance', value: 20, color: '#ffc658' },
    { name: 'Bulk Purchase', value: 12, color: '#ff7300' },
    { name: 'Loyalty Customer', value: 8, color: '#00ff88' },
  ];

  const categoryWiseDiscounts = [
    { category: 'Television', avgDiscount: 8.5, totalValue: 15200 },
    { category: 'Air Conditioner', avgDiscount: 12.2, totalValue: 18600 },
    { category: 'Washing Machine', avgDiscount: 9.8, totalValue: 12400 },
    { category: 'Refrigerator', avgDiscount: 7.3, totalValue: 9800 },
    { category: 'Mobile Phone', avgDiscount: 4.2, totalValue: 8200 },
  ];

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">₹1.58L</p>
              <p className="text-sm text-gray-600">Total Discount Value</p>
              <p className="text-xs text-green-600">+12% from last month</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">65%</p>
              <p className="text-sm text-gray-600">Approval Rate</p>
              <p className="text-xs text-green-600">+5% from last month</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">8.7%</p>
              <p className="text-sm text-gray-600">Average Discount</p>
              <p className="text-xs text-red-600">+1.2% from last month</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">2.4h</p>
              <p className="text-sm text-gray-600">Avg Approval Time</p>
              <p className="text-xs text-green-600">-0.6h from last month</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Discount Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyDiscounts}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="approved" fill="#82ca9d" name="Approved" />
                <Bar dataKey="rejected" fill="#ff7300" name="Rejected" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Discount Reasons */}
        <Card>
          <CardHeader>
            <CardTitle>Discount Reasons Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={discountReasons}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {discountReasons.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Category-wise Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Category-wise Discount Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Category</th>
                  <th className="text-right p-2">Avg Discount %</th>
                  <th className="text-right p-2">Total Value</th>
                  <th className="text-right p-2">Trend</th>
                </tr>
              </thead>
              <tbody>
                {categoryWiseDiscounts.map((category) => (
                  <tr key={category.category} className="border-b hover:bg-gray-50">
                    <td className="p-2 font-medium">{category.category}</td>
                    <td className="p-2 text-right">{category.avgDiscount}%</td>
                    <td className="p-2 text-right">₹{category.totalValue.toLocaleString()}</td>
                    <td className="p-2 text-right">
                      <span className="text-green-600">↗ +2.1%</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Discount Requesters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="font-medium">John Smith</span>
                <span className="text-sm text-gray-600">23 requests</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="font-medium">Sarah Johnson</span>
                <span className="text-sm text-gray-600">18 requests</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="font-medium">Mike Wilson</span>
                <span className="text-sm text-gray-600">15 requests</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Approval Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                <span className="font-medium">Manager A</span>
                <span className="text-sm text-green-600">98% approval rate</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-yellow-50 rounded">
                <span className="font-medium">Manager B</span>
                <span className="text-sm text-yellow-600">87% approval rate</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-red-50 rounded">
                <span className="font-medium">Manager C</span>
                <span className="text-sm text-red-600">72% approval rate</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
