
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, Package, Calendar, Star } from "lucide-react";

interface CustomerOrderHistoryProps {
  searchQuery: string;
}

export function CustomerOrderHistory({ searchQuery }: CustomerOrderHistoryProps) {
  const customers = [
    {
      customerId: "CUST-001",
      name: "Rajesh Kumar",
      phone: "+91 9876543210",
      totalOrders: 8,
      totalSpent: 285000,
      lastOrder: "2024-01-15",
      avgRating: 4.5,
      preferredSlot: "Evening",
      recentOrders: [
        { orderId: "HD-2024-001", date: "2024-01-15", amount: 45000, status: "Delivered" },
        { orderId: "HD-2024-015", date: "2024-01-10", amount: 28000, status: "Delivered" },
        { orderId: "HD-2024-008", date: "2024-01-05", amount: 67500, status: "Delivered" }
      ]
    },
    {
      customerId: "CUST-002",
      name: "Priya Sharma",
      phone: "+91 9876543211",
      totalOrders: 5,
      totalSpent: 142000,
      lastOrder: "2024-01-14",
      avgRating: 4.8,
      preferredSlot: "Afternoon",
      recentOrders: [
        { orderId: "EA-2024-002", date: "2024-01-14", amount: 28000, status: "In Transit" },
        { orderId: "HD-2024-012", date: "2024-01-08", amount: 35000, status: "Delivered" },
        { orderId: "EA-2024-005", date: "2024-01-03", amount: 22000, status: "Delivered" }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered": return "bg-green-100 text-green-800";
      case "In Transit": return "bg-blue-100 text-blue-800";
      case "Processing": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.phone.includes(searchQuery) ||
    customer.customerId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Customer Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <User className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-xl font-bold text-blue-600">1,247</p>
                <p className="text-sm text-blue-700">Total Customers</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Star className="h-8 w-8 text-yellow-600" />
              <div>
                <p className="text-xl font-bold text-yellow-600">4.6</p>
                <p className="text-sm text-yellow-700">Avg Rating</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Package className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-xl font-bold text-green-600">3.2</p>
                <p className="text-sm text-green-700">Avg Orders/Customer</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Customer List */}
      <div className="grid grid-cols-1 gap-6">
        {filteredCustomers.map((customer) => (
          <Card key={customer.customerId}>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <User className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{customer.name}</h3>
                    <p className="text-sm text-gray-600">{customer.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm font-medium">{customer.avgRating}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                <div className="text-center">
                  <p className="text-xl font-bold text-blue-600">{customer.totalOrders}</p>
                  <p className="text-xs text-gray-600">Total Orders</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-green-600">₹{(customer.totalSpent / 1000).toFixed(0)}K</p>
                  <p className="text-xs text-gray-600">Total Spent</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-900">{customer.lastOrder}</p>
                  <p className="text-xs text-gray-600">Last Order</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-900">{customer.preferredSlot}</p>
                  <p className="text-xs text-gray-600">Preferred Slot</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900">Recent Orders</h4>
                <div className="space-y-2">
                  {customer.recentOrders.map((order) => (
                    <div key={order.orderId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium">{order.orderId}</span>
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{order.date}</span>
                        </div>
                        <span className="font-medium">₹{order.amount.toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-2 mt-4">
                <Button size="sm" variant="outline">
                  View Full History
                </Button>
                <Button size="sm" variant="outline">
                  Create New Order
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
