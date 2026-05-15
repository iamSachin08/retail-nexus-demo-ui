
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Package, User, MapPin, Clock, Phone } from "lucide-react";

interface OrdersQueueProps {
  searchQuery: string;
}

export function OrdersQueue({ searchQuery }: OrdersQueueProps) {
  const orders = [
    {
      orderId: "HD-2024-001",
      customer: "Rajesh Kumar",
      phone: "+91 9876543210",
      address: "A-101, Sunrise Apartments, Koramangala, Bangalore - 560034",
      items: 2,
      amount: 45000,
      orderTime: "2024-01-15 10:30:00",
      priority: "High",
      status: "Ready for Pickup",
      deliverySlot: "2:00 PM - 4:00 PM",
      type: "Home Delivery"
    },
    {
      orderId: "EA-2024-002",
      customer: "Priya Sharma",
      phone: "+91 9876543211",
      address: "B-203, Green Valley, HSR Layout, Bangalore - 560102",
      items: 1,
      amount: 28000,
      orderTime: "2024-01-15 11:45:00",
      priority: "Medium",
      status: "Processing",
      deliverySlot: "4:00 PM - 6:00 PM",
      type: "Endless Aisle"
    },
    {
      orderId: "HD-2024-003",
      customer: "Amit Patel",
      phone: "+91 9876543212",
      address: "C-301, Palm Heights, Electronic City, Bangalore - 560100",
      items: 3,
      amount: 67500,
      orderTime: "2024-01-15 09:15:00",
      priority: "High",
      status: "Assigned",
      deliverySlot: "10:00 AM - 12:00 PM",
      type: "Home Delivery"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ready for Pickup": return "bg-green-100 text-green-800";
      case "Processing": return "bg-yellow-100 text-yellow-800";
      case "Assigned": return "bg-blue-100 text-blue-800";
      case "Delayed": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-red-100 text-red-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredOrders = orders.filter(order => 
    order.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.phone.includes(searchQuery)
  );

  return (
    <div className="space-y-6">
      {/* Order Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Package className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-xl font-bold text-blue-600">24</p>
                <p className="text-sm text-blue-700">Total Orders</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-xl font-bold text-orange-600">8</p>
                <p className="text-sm text-orange-700">Urgent Orders</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-bold">₹</span>
              </div>
              <div>
                <p className="text-xl font-bold text-green-600">₹3.2L</p>
                <p className="text-sm text-green-700">Total Value</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Orders List */}
      <Card>
        <CardHeader>
          <CardTitle>Orders Queue</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {filteredOrders.map((order) => (
              <div key={order.orderId} className="p-6 hover:bg-gray-50">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Package className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                        <h4 className="font-medium text-gray-900">{order.orderId}</h4>
                        <div className="flex gap-2">
                          <Badge className={getStatusColor(order.status)}>
                            {order.status}
                          </Badge>
                          <Badge className={getPriorityColor(order.priority)}>
                            {order.priority}
                          </Badge>
                          <Badge variant="outline">
                            {order.type}
                          </Badge>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          <span>{order.customer}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          <span>{order.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>{order.deliverySlot}</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        <span>{order.address}</span>
                      </div>
                      <p className="text-xs text-gray-500">
                        Order Time: {order.orderTime} • Items: {order.items} • Amount: ₹{order.amount.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button size="sm" variant="outline">
                      Assign Delivery
                    </Button>
                    <Button size="sm">
                      View Details
                    </Button>
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
