
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Truck, MapPin, Clock, CheckCircle, AlertTriangle, User } from "lucide-react";

export function DeliveryTracking() {
  const deliveries = [
    {
      orderId: "HD-2024-001",
      customer: "Rajesh Kumar",
      deliveryBoy: "Suresh Kumar",
      phone: "+91 9876543210",
      status: "On the Way",
      estimatedTime: "30 mins",
      currentLocation: "Koramangala 5th Block",
      progress: 75,
      lastUpdate: "2 mins ago"
    },
    {
      orderId: "HD-2024-002",
      customer: "Priya Sharma",
      deliveryBoy: "Ravi Raj",
      phone: "+91 9876543211",
      status: "Delivered",
      estimatedTime: "Completed",
      currentLocation: "HSR Layout",
      progress: 100,
      lastUpdate: "1 hour ago"
    },
    {
      orderId: "HD-2024-003",
      customer: "Amit Patel",
      deliveryBoy: "Vikash Singh",
      phone: "+91 9876543212",
      status: "Delayed",
      estimatedTime: "1 hour delay",
      currentLocation: "Electronic City",
      progress: 45,
      lastUpdate: "15 mins ago"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "On the Way": return "bg-blue-100 text-blue-800";
      case "Delivered": return "bg-green-100 text-green-800";
      case "Delayed": return "bg-red-100 text-red-800";
      case "Picked Up": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "On the Way": return <Truck className="h-4 w-4 text-blue-600" />;
      case "Delivered": return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "Delayed": return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default: return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Delivery Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Truck className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-xl font-bold text-blue-600">12</p>
                <p className="text-sm text-blue-700">On the Way</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-xl font-bold text-green-600">45</p>
                <p className="text-sm text-green-700">Delivered</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-8 w-8 text-red-600" />
              <div>
                <p className="text-xl font-bold text-red-600">3</p>
                <p className="text-sm text-red-700">Delayed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-xl font-bold text-orange-600">28</p>
                <p className="text-sm text-orange-700">Avg Delivery Time (mins)</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Deliveries */}
      <Card>
        <CardHeader>
          <CardTitle>Active Deliveries</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {deliveries.map((delivery) => (
              <div key={delivery.orderId} className="p-6 hover:bg-gray-50">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      {getStatusIcon(delivery.status)}
                    </div>
                    <div className="flex-1 space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                        <h4 className="font-medium text-gray-900">{delivery.orderId}</h4>
                        <Badge className={getStatusColor(delivery.status)}>
                          {delivery.status}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          <span>{delivery.customer}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Truck className="h-4 w-4" />
                          <span>{delivery.deliveryBoy}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>ETA: {delivery.estimatedTime}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="h-4 w-4" />
                        <span>Current: {delivery.currentLocation}</span>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>Progress</span>
                          <span>{delivery.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                            style={{ width: `${delivery.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <p className="text-xs text-gray-500">Last updated: {delivery.lastUpdate}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button size="sm" variant="outline">
                      Track Live
                    </Button>
                    <Button size="sm" variant="outline">
                      Contact Delivery Boy
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
