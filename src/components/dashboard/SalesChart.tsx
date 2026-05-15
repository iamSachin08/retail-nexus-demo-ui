
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const salesData = [
  { name: "10 AM", sales: 15000, target: 20000 },
  { name: "11 AM", sales: 28000, target: 40000 },
  { name: "12 PM", sales: 45000, target: 60000 },
  { name: "1 PM", sales: 62000, target: 80000 },
  { name: "2 PM", sales: 85000, target: 100000 },
  { name: "3 PM", sales: 125000, target: 140000 },
  { name: "4 PM", sales: 155000, target: 180000 },
  { name: "5 PM", sales: 185000, target: 220000 },
];

export function SalesChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          📈 Today's Sales Progress
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis 
              tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`}
            />
            <Tooltip 
              formatter={(value, name) => [
                `₹${(value as number).toLocaleString()}`, 
                name === "sales" ? "Actual Sales" : "Target"
              ]}
            />
            <Line 
              type="monotone" 
              dataKey="target" 
              stroke="#94a3b8" 
              strokeDasharray="5 5"
              name="target"
            />
            <Line 
              type="monotone" 
              dataKey="sales" 
              stroke="#3b82f6" 
              strokeWidth={3}
              name="sales"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
