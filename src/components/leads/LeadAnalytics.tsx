
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
  Cell,
  LineChart,
  Line
} from "recharts";

export function LeadAnalytics() {
  const monthlyLeads = [
    { month: 'Oct', new: 45, converted: 12, lost: 8 },
    { month: 'Nov', new: 52, converted: 15, lost: 10 },
    { month: 'Dec', new: 68, converted: 18, lost: 12 },
    { month: 'Jan', new: 89, converted: 28, lost: 15 },
  ];

  const leadSources = [
    { name: 'Walk-in', value: 40, color: '#8884d8' },
    { name: 'Referral', value: 25, color: '#82ca9d' },
    { name: 'Online Search', value: 20, color: '#ffc658' },
    { name: 'Social Media', value: 10, color: '#ff7300' },
    { name: 'Advertisement', value: 5, color: '#00ff88' },
  ];

  const conversionFunnel = [
    { stage: 'Leads Generated', count: 250 },
    { stage: 'Contacted', count: 180 },
    { stage: 'Interested', count: 120 },
    { stage: 'Quoted', count: 80 },
    { stage: 'Converted', count: 45 },
  ];

  const categoryPerformance = [
    { category: 'Television', leads: 45, converted: 12, rate: 27 },
    { category: 'Air Conditioner', leads: 38, converted: 8, rate: 21 },
    { category: 'Washing Machine', leads: 32, converted: 6, rate: 19 },
    { category: 'Refrigerator', leads: 28, converted: 5, rate: 18 },
    { category: 'Mobile Phone', leads: 25, converted: 4, rate: 16 },
  ];

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">18%</p>
              <p className="text-sm text-gray-600">Overall Conversion Rate</p>
              <p className="text-xs text-green-600">+3% from last month</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">₹8.2L</p>
              <p className="text-sm text-gray-600">Revenue from Leads</p>
              <p className="text-xs text-green-600">+15% from last month</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">5.2 days</p>
              <p className="text-sm text-gray-600">Avg Lead Response Time</p>
              <p className="text-xs text-red-600">+0.8 days from last month</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">₹18,400</p>
              <p className="text-sm text-gray-600">Avg Deal Value</p>
              <p className="text-xs text-green-600">+5% from last month</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Lead Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyLeads}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="new" fill="#8884d8" name="New Leads" />
                <Bar dataKey="converted" fill="#82ca9d" name="Converted" />
                <Bar dataKey="lost" fill="#ff7300" name="Lost" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Lead Sources */}
        <Card>
          <CardHeader>
            <CardTitle>Lead Sources Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={leadSources}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {leadSources.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Conversion Funnel */}
      <Card>
        <CardHeader>
          <CardTitle>Lead Conversion Funnel</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={conversionFunnel} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="stage" type="category" width={100} />
              <Tooltip />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Category Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Category-wise Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Category</th>
                  <th className="text-right p-2">Total Leads</th>
                  <th className="text-right p-2">Converted</th>
                  <th className="text-right p-2">Conversion Rate</th>
                </tr>
              </thead>
              <tbody>
                {categoryPerformance.map((category) => (
                  <tr key={category.category} className="border-b hover:bg-gray-50">
                    <td className="p-2 font-medium">{category.category}</td>
                    <td className="p-2 text-right">{category.leads}</td>
                    <td className="p-2 text-right">{category.converted}</td>
                    <td className="p-2 text-right">
                      <span className="text-green-600 font-semibold">{category.rate}%</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
