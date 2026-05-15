import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock, Package, CheckCircle, XCircle, Timer, User, MapPin, AlertTriangle, Search, Filter, ArrowUpDown } from "lucide-react";
import { MobileTabs } from "@/components/ui/mobile-tabs";
import { MobileTable } from "@/components/ui/mobile-table";
import { ResponsiveDialog, ResponsiveDialogTrigger, ResponsiveDialogContent } from "@/components/ui/responsive-dialog";
import { useIsMobile } from "@/hooks/use-mobile";

interface QCommerceContentProps {
  defaultTab?: string;
}

export function QCommerceContent({ defaultTab = "new-orders" }: QCommerceContentProps) {
  const [tab, setTab] = useState(defaultTab);
  const isMobile = useIsMobile();

  const tabs = [
    { value: "new-orders", label: "New Orders", icon: <Package className="h-4 w-4" /> },
    { value: "picking", label: "Picking", icon: <Timer className="h-4 w-4" /> },
    { value: "ready", label: "Ready", icon: <CheckCircle className="h-4 w-4" /> },
    { value: "cancelled", label: "Cancelled", icon: <XCircle className="h-4 w-4" /> },
    { value: "substitutions", label: "Substitutions", icon: <AlertTriangle className="h-4 w-4" /> },
  ];

  // Mock data
  const stats = {
    orderAcceptanceTAT: "2.3 min",
    pickToPackTime: "8.5 min",
    fulfillmentRate: "94.2%",
    cancellationRate: "3.1%"
  };

  const orders = [
    { id: "QC001", platform: "Swiggy Instamart", items: 8, value: "₹1,245", eta: "12 min", status: "New", picker: null },
    { id: "QC002", platform: "Blinkit", items: 12, value: "₹2,150", eta: "8 min", status: "Picking", picker: "Rahul Singh" },
    { id: "QC003", platform: "Dunzo", items: 5, value: "₹890", eta: "5 min", status: "Ready", picker: "Priya Sharma" },
    { id: "QC004", platform: "Zepto", items: 15, value: "₹3,450", eta: "15 min", status: "New", picker: null },
    { id: "QC005", platform: "Swiggy Instamart", items: 6, value: "₹1,890", eta: "10 min", status: "Picking", picker: "Amit Kumar" },
    { id: "QC006", platform: "BigBasket", items: 20, value: "₹4,250", eta: "18 min", status: "New", picker: null },
    { id: "QC007", platform: "Grofers", items: 9, value: "₹1,680", eta: "6 min", status: "Ready", picker: "Neha Patel" },
    { id: "QC008", platform: "Dunzo", items: 7, value: "₹1,120", eta: "14 min", status: "Picking", picker: "Raj Sharma" },
  ];

  const orderColumns = [
    { key: "id", label: "Order ID" },
    { key: "platform", label: "Platform" },
    { key: "items", label: "Items", render: (value: number) => `${value} items` },
    { key: "value", label: "Value" },
    { key: "eta", label: "ETA" },
    { key: "picker", label: "Picker" },
  ];

  const renderTabContent = () => {
    switch(tab) {
      case "new-orders":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">New Orders Queue</h3>
              <Badge variant="secondary">{orders.filter(o => o.status === "New").length} Pending</Badge>
            </div>
            
            {isMobile ? (
              <MobileTable
                data={orders.filter(o => o.status === "New")}
                columns={orderColumns}
                primaryField="id"
                secondaryField="platform"
                statusField="status"
                actionButtons={(order) => (
                  <>
                    <ResponsiveDialog>
                      <ResponsiveDialogTrigger asChild>
                        <Button variant="outline" size="sm">View Details</Button>
                      </ResponsiveDialogTrigger>
                      <ResponsiveDialogContent title={`Order ${order.id} Details`}>
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium">Platform</label>
                            <p>{order.platform}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium">Items</label>
                            <p>{order.items} items</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium">Value</label>
                            <p>{order.value}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium">Delivery ETA</label>
                            <p>{order.eta}</p>
                          </div>
                        </div>
                      </ResponsiveDialogContent>
                    </ResponsiveDialog>
                    <Button size="sm">Accept Order</Button>
                  </>
                )}
              />
            ) : (
              orders.filter(o => o.status === "New").map((order) => (
                <Card key={order.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">Order {order.id}</h4>
                        <Badge variant="outline">{order.platform}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {order.items} items • {order.value} • ETA: {order.eta}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">View Details</Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Order {order.id} Details</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <label className="text-sm font-medium">Platform</label>
                              <p>{order.platform}</p>
                            </div>
                            <div>
                              <label className="text-sm font-medium">Items</label>
                              <p>{order.items} items</p>
                            </div>
                            <div>
                              <label className="text-sm font-medium">Value</label>
                              <p>{order.value}</p>
                            </div>
                            <div>
                              <label className="text-sm font-medium">Delivery ETA</label>
                              <p>{order.eta}</p>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button size="sm">Accept Order</Button>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        );
      
      case "picking":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Orders In Picking</h3>
              <Badge variant="secondary">{orders.filter(o => o.status === "Picking").length} Active</Badge>
            </div>
            
            {isMobile ? (
              <MobileTable
                data={orders.filter(o => o.status === "Picking")}
                columns={orderColumns}
                primaryField="id"
                secondaryField="platform"
                statusField="status"
                actionButtons={(order) => (
                  <>
                    <Button size="sm" variant="outline">Report Stockout</Button>
                    <Button size="sm">Mark Order Picked</Button>
                  </>
                )}
              />
            ) : (
              orders.filter(o => o.status === "Picking").map((order) => (
                <Card key={order.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">Order {order.id}</h4>
                        <Badge variant="outline">{order.platform}</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{order.items} items • {order.value}</span>
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          <span>Picker: {order.picker}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                        {order.eta} remaining
                      </Badge>
                      <Button size="sm" variant="outline">Report Stockout</Button>
                      <Button size="sm">Mark Order Picked</Button>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        );
      
      case "ready":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Ready for Dispatch</h3>
              <Badge variant="secondary">{orders.filter(o => o.status === "Ready").length} Ready</Badge>
            </div>
            
            {isMobile ? (
              <MobileTable
                data={orders.filter(o => o.status === "Ready")}
                columns={orderColumns}
                primaryField="id"
                secondaryField="platform"
                statusField="status"
                actionButtons={(order) => (
                  <Button size="sm">Mark Ready for Pickup</Button>
                )}
              />
            ) : (
              orders.filter(o => o.status === "Ready").map((order) => (
                <Card key={order.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">Order {order.id}</h4>
                        <Badge variant="outline">{order.platform}</Badge>
                        <Badge className="bg-green-100 text-green-800">Ready</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{order.items} items • {order.value}</span>
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          <span>Packed by: {order.picker}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm">Mark Ready for Pickup</Button>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        );
      
      default:
        return (
          <div className="text-center py-8">
            <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No Data Available</h3>
            <p className="text-muted-foreground">Select a tab to view orders</p>
          </div>
        );
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6 p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Q-Commerce Order Fulfillment</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Manage ultra-fast delivery orders with 10-30 minute SLA compliance
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button size={isMobile ? "sm" : "default"}>
            <Timer className="mr-1 sm:mr-2 h-4 w-4" />
            {isMobile ? "Auto-Accept" : "Auto-Accept Orders"}
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Order Acceptance TAT</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.orderAcceptanceTAT}</div>
            <p className="text-xs text-muted-foreground">
              Target: &lt;3 min
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pick-to-Pack Time</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pickToPackTime}</div>
            <p className="text-xs text-muted-foreground">
              Target: &lt;10 min
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fulfillment Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.fulfillmentRate}</div>
            <p className="text-xs text-muted-foreground">
              Target: &gt;95%
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cancellation Rate</CardTitle>
            <XCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.cancellationRate}</div>
            <p className="text-xs text-muted-foreground">
              Target: &lt;5%
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs */}
      {isMobile ? (
        <>
          <MobileTabs 
            tabs={tabs}
            activeTab={tab}
            onTabChange={setTab}
            className="mb-4"
          />
          
          <div className="space-y-4">
            {renderTabContent()}
          </div>
        </>
      ) : (
        <Card>
          <CardContent className="p-6">
            <Tabs value={tab} onValueChange={setTab} className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="new-orders">New Orders</TabsTrigger>
                <TabsTrigger value="picking">Orders In Picking</TabsTrigger>
                <TabsTrigger value="ready">Ready for Dispatch</TabsTrigger>
                <TabsTrigger value="cancelled">Cancelled/Failed</TabsTrigger>
                <TabsTrigger value="substitutions">Substitution History</TabsTrigger>
              </TabsList>
              
              {renderTabContent()}
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
}