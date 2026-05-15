
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Truck, 
  Search, 
  Filter, 
  Download, 
  Upload,
  Package,
  Clock,
  CheckCircle,
  AlertTriangle,
  MapPin,
  Phone
} from "lucide-react";
import { OrdersQueue } from "./OrdersQueue";
import { DeliveryTracking } from "./DeliveryTracking";
import { CustomerOrderHistory } from "./CustomerOrderHistory";
import { EndlessAisle } from "./EndlessAisle";

export function DeliveryContent() {
  const [searchQuery, setSearchQuery] = useState("");
  
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Home Delivery & Endless Aisle</h1>
          <p className="text-gray-600">Manage deliveries and endless aisle orders</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Bulk Update
          </Button>
          <Button size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Package className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Pending Orders</p>
                <p className="text-xl font-semibold">24</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">In Transit</p>
                <p className="text-xl font-semibold">12</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Delivered Today</p>
                <p className="text-xl font-semibold">45</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Delayed</p>
                <p className="text-xl font-semibold">3</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search by order ID, customer name, or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <MapPin className="h-4 w-4 mr-2" />
                Route Optimize
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="orders-queue" className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
          <TabsTrigger value="orders-queue">Orders Queue</TabsTrigger>
          <TabsTrigger value="delivery-tracking">Delivery Tracking</TabsTrigger>
          <TabsTrigger value="customer-history">Customer History</TabsTrigger>
          <TabsTrigger value="endless-aisle">Endless Aisle</TabsTrigger>
        </TabsList>
        
        <TabsContent value="orders-queue" className="mt-6">
          <OrdersQueue searchQuery={searchQuery} />
        </TabsContent>
        
        <TabsContent value="delivery-tracking" className="mt-6">
          <DeliveryTracking />
        </TabsContent>
        
        <TabsContent value="customer-history" className="mt-6">
          <CustomerOrderHistory searchQuery={searchQuery} />
        </TabsContent>
        
        <TabsContent value="endless-aisle" className="mt-6">
          <EndlessAisle />
        </TabsContent>
      </Tabs>
    </div>
  );
}
