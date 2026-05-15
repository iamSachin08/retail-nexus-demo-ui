
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart } from "lucide-react";

export function DailySalesReport() {
  const salesData = {
    today: {
      revenue: 245000,
      transactions: 127,
      avgTicketSize: 1929,
      topCategory: "Television",
      growth: 12.5
    },
    paymentModes: [
      { mode: "Card", amount: 164300, percentage: 67, transactions: 85 },
      { mode: "UPI", amount: 61250, percentage: 25, transactions: 32 },
      { mode: "Cash", amount: 19450, percentage: 8, transactions: 10 }
    ],
    topProducts: [
      { name: "Samsung 55\" 4K Smart TV", sales: 8, revenue: 360000 },
      { name: "LG 450L Refrigerator", sales: 5, revenue: 175000 },
      { name: "Sony 5.1 Home Theater", sales: 12, revenue: 300000 }
    ],
    hourlyData: [
      { hour: "10-11", sales: 15000, transactions: 8 },
      { hour: "11-12", sales: 28000, transactions: 15 },
      { hour: "12-13", sales: 45000, transactions: 23 },
      { hour: "13-14", sales: 38000, transactions: 19 },
      { hour: "14-15", sales: 52000, transactions: 27 },
      { hour: "15-16", sales: 35000, transactions: 18 },
      { hour: "16-17", sales: 32000, transactions: 17 }
    ]
  };

  return (
    <div className="space-y-6">
      {/* Daily Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold">₹{salesData.today.revenue.toLocaleString()}</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
              <span className="text-sm text-green-600">+{salesData.today.growth}%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Transactions</p>
                <p className="text-2xl font-bold">{salesData.today.transactions}</p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <ShoppingCart className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">Avg: ₹{salesData.today.avgTicketSize}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Top Category</p>
                <p className="text-xl font-bold">{salesData.today.topCategory}</p>
              </div>
              <Badge className="bg-purple-100 text-purple-800">Best Seller</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Ticket Size</p>
                <p className="text-2xl font-bold">₹{salesData.today.avgTicketSize}</p>
              </div>
              <div className="p-2 bg-orange-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Mode Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Mode Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {salesData.paymentModes.map((payment) => (
              <div key={payment.mode} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="font-medium">{payment.mode}</div>
                  <Badge variant="outline">{payment.transactions} txns</Badge>
                </div>
                <div className="text-right">
                  <div className="font-semibold">₹{payment.amount.toLocaleString()}</div>
                  <div className="text-sm text-gray-500">{payment.percentage}%</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Products */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Products</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {salesData.topProducts.map((product, index) => (
              <div key={product.name} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-medium">{product.name}</div>
                    <div className="text-sm text-gray-500">{product.sales} units sold</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">₹{product.revenue.toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Hourly Sales Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Hourly Sales Pattern</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {salesData.hourlyData.map((hour) => (
              <div key={hour.hour} className="flex items-center gap-4">
                <div className="w-16 text-sm font-medium">{hour.hour}</div>
                <div className="flex-1 bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-blue-600 h-3 rounded-full"
                    style={{ width: `${(hour.sales / 52000) * 100}%` }}
                  ></div>
                </div>
                <div className="w-24 text-right text-sm">
                  ₹{hour.sales.toLocaleString()}
                </div>
                <div className="w-16 text-right text-sm text-gray-500">
                  {hour.transactions} txns
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
