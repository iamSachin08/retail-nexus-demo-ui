import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RotateCcw, DollarSign, Clock, AlertTriangle, Package, RefreshCw, Trash, CreditCard } from "lucide-react";

interface InstantReturnsContentProps {
  defaultTab?: string;
}

export function InstantReturnsContent({ defaultTab = "process-doorstep-return" }: InstantReturnsContentProps) {
  const [tab, setTab] = useState(defaultTab);

  // Mock data
  const stats = {
    instantReturnRate: "5.2%",
    restockTimeSLA: "15.3 min",
    refundProcessingSLA: "2.4 hrs",
    penaltyClaimedRate: "78.5%"
  };

  const doorstepReturns = [
    { 
      id: "RET001", 
      orderId: "QC001", 
      reason: "Customer Rejection", 
      value: "₹1,245", 
      status: "Pending Processing", 
      returnedAt: "10:30 AM",
      partner: "Swiggy Instamart"
    },
    { 
      id: "RET002", 
      orderId: "QC002", 
      reason: "Damaged Product", 
      value: "₹890", 
      status: "Awaiting Inspection", 
      returnedAt: "11:15 AM",
      partner: "Blinkit"
    },
    { 
      id: "RET008", 
      orderId: "QC008", 
      reason: "Quality Issue", 
      value: "₹1,680", 
      status: "Pending Processing", 
      returnedAt: "1:45 PM",
      partner: "Zepto"
    },
    { 
      id: "RET009", 
      orderId: "QC009", 
      reason: "Wrong Size", 
      value: "₹2,340", 
      status: "Awaiting Inspection", 
      returnedAt: "2:20 PM",
      partner: "BigBasket"
    },
  ];

  const approvalReturns = [
    { 
      id: "RET004", 
      orderId: "QC004", 
      reason: "Delivery Delay", 
      value: "₹1,120", 
      status: "Awaiting Approval", 
      returnedAt: "Yesterday 6:15 PM",
      partner: "Grofers",
      customerRequest: "Refund requested due to 2 hour delay"
    },
    { 
      id: "RET005", 
      orderId: "QC005", 
      reason: "Product Mismatch", 
      value: "₹895", 
      status: "Awaiting Approval", 
      returnedAt: "Yesterday 8:30 PM",
      partner: "Swiggy Instamart",
      customerRequest: "Received different brand than ordered"
    },
  ];

  const refundPending = [
    { 
      id: "RET003", 
      orderId: "QC003", 
      reason: "Wrong Item", 
      value: "₹675", 
      status: "Refund Initiated", 
      returnedAt: "Yesterday 4:30 PM",
      partner: "Dunzo"
    },
    { 
      id: "RET006", 
      orderId: "QC006", 
      reason: "Damaged Package", 
      value: "₹1,450", 
      status: "Refund Processing", 
      returnedAt: "Yesterday 7:45 PM",
      partner: "Blinkit"
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Instant Returns & Failed Delivery Reconciliation</h1>
          <p className="text-muted-foreground">
            Handle Q-commerce returns, refunds, and partner SLA penalties
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button>
            <RotateCcw className="mr-2 h-4 w-4" />
            Log Return
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Instant Return %</CardTitle>
            <RotateCcw className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.instantReturnRate}</div>
            <p className="text-xs text-muted-foreground">
              Target: &lt;8%
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Restock Time SLA</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.restockTimeSLA}</div>
            <p className="text-xs text-muted-foreground">
              Target: &lt;20 min
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Refund Processing SLA</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.refundProcessingSLA}</div>
            <p className="text-xs text-muted-foreground">
              Target: &lt;4 hrs
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Penalty Claimed %</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.penaltyClaimedRate}</div>
            <p className="text-xs text-muted-foreground">
              Target: &gt;70%
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs */}
      <Card>
        <CardContent className="p-6">
          <Tabs value={tab} onValueChange={setTab} className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="process-doorstep-return">Process Doorstep Return</TabsTrigger>
              <TabsTrigger value="approve-doorstep-return">Approve Doorstep Return</TabsTrigger>
              <TabsTrigger value="goods-receiving">Goods Receiving</TabsTrigger>
              <TabsTrigger value="refund-pending">Refund Pending</TabsTrigger>
              <TabsTrigger value="scrap-queue">Scrap Queue</TabsTrigger>
              <TabsTrigger value="partner-recovery">Partner Recovery Log</TabsTrigger>
            </TabsList>
            
            <TabsContent value="process-doorstep-return">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Process Doorstep Returns</h3>
                  <Badge variant="secondary">{doorstepReturns.length} Returns</Badge>
                </div>
                
                {doorstepReturns.map((returnItem) => (
                  <Card key={returnItem.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">Return {returnItem.id}</h4>
                          <Badge variant="outline">{returnItem.partner}</Badge>
                          <Badge className="bg-orange-100 text-orange-800">{returnItem.status}</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <p>Order: {returnItem.orderId} • Reason: {returnItem.reason}</p>
                          <p>Value: {returnItem.value} • Returned at: {returnItem.returnedAt}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">Process Return</Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Process Return {returnItem.id}</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <label className="text-sm font-medium">Return Decision</label>
                                <Select>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select action" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="restock">Restock to Inventory</SelectItem>
                                    <SelectItem value="scrap">Mark as Scrap</SelectItem>
                                    <SelectItem value="vendor-return">Return to Vendor</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Notes</label>
                                <Textarea placeholder="Add processing notes..." />
                              </div>
                              <div className="flex gap-2">
                                <Button className="flex-1">
                                  <RefreshCw className="mr-2 h-4 w-4" />
                                  Mark Repacked
                                </Button>
                                <Button variant="destructive" className="flex-1">
                                  <CreditCard className="mr-2 h-4 w-4" />
                                  Trigger Refund
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="refund-pending">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Refund Pending</h3>
                  <Badge variant="secondary">{refundPending.length} Pending</Badge>
                </div>
                
                {refundPending.map((returnItem) => (
                  <Card key={returnItem.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">Return {returnItem.id}</h4>
                          <Badge variant="outline">{returnItem.partner}</Badge>
                          <Badge className="bg-blue-100 text-blue-800">{returnItem.status}</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <p>Order: {returnItem.orderId} • Reason: {returnItem.reason}</p>
                          <p>Value: {returnItem.value} • Returned at: {returnItem.returnedAt}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">Track Refund</Button>
                        <Button size="sm">Notify Finance</Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="approve-doorstep-return">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Approve Doorstep Returns</h3>
                  <Badge variant="secondary">{approvalReturns.length} Pending Approval</Badge>
                </div>
                
                {approvalReturns.map((returnItem) => (
                  <Card key={returnItem.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">Return {returnItem.id}</h4>
                          <Badge variant="outline">{returnItem.partner}</Badge>
                          <Badge className="bg-yellow-100 text-yellow-800">{returnItem.status}</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <p>Order: {returnItem.orderId} • Reason: {returnItem.reason}</p>
                          <p>Value: {returnItem.value} • Returned at: {returnItem.returnedAt}</p>
                          <p className="text-blue-600">Request: {returnItem.customerRequest}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">Reject</Button>
                        <Button size="sm">Approve Return</Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="goods-receiving">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Goods Receiving at Store</h3>
                  <Badge variant="secondary">2 Items to Receive</Badge>
                </div>
                
                <Card className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">Return RET007</h4>
                        <Badge variant="outline">Dunzo</Badge>
                        <Badge className="bg-green-100 text-green-800">Approved</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <p>Order: QC007 • Reason: Package Damage</p>
                        <p>Value: ₹1,890 • Expected delivery: Today 4:00 PM</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline">Mark Received</Button>
                      <Button size="sm">Process to Inventory</Button>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">Return RET010</h4>
                        <Badge variant="outline">Blinkit</Badge>
                        <Badge className="bg-green-100 text-green-800">Approved</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <p>Order: QC010 • Reason: Quality Issue</p>
                        <p>Value: ₹2,340 • Expected delivery: Today 5:30 PM</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline">Mark Received</Button>
                      <Button size="sm">Process to Inventory</Button>
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="scrap-queue">
              <div className="text-center py-8">
                <Trash className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No Items in Scrap Queue</h3>
                <p className="text-muted-foreground">All returned items have been processed successfully</p>
              </div>
            </TabsContent>
            
            <TabsContent value="partner-recovery">
              <div className="text-center py-8">
                <DollarSign className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Partner Recovery Log</h3>
                <p className="text-muted-foreground">Track penalties and recoveries from delivery partners</p>
                <Button className="mt-4">View Recovery Report</Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}