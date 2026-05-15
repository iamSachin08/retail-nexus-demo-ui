import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Truck, Clock, MapPin, AlertTriangle, CheckCircle, XCircle, User, Phone } from "lucide-react";

interface HyperlocalDeliveryContentProps {
  defaultTab?: string;
}

export function HyperlocalDeliveryContent({ defaultTab = "active-pickups" }: HyperlocalDeliveryContentProps) {
  const [tab, setTab] = useState(defaultTab);

  // Mock data
  const stats = {
    pickupSLACompliance: "92.5%",
    failedPickupRatio: "4.2%",
    deliveryETAAccuracy: "89.1%",
    liveStatusAccuracy: "96.8%"
  };

  const activePickups = [
    { 
      id: "QC001", 
      orderId: "ORD-2024-001", 
      partner: "Shadowfax", 
      rider: "Amit Kumar", 
      phone: "+91 98765 43210",
      eta: "8 min", 
      status: "En Route", 
      address: "Store Location" 
    },
    { 
      id: "QC002", 
      orderId: "ORD-2024-002", 
      partner: "Dunzo", 
      rider: "Rajesh Singh", 
      phone: "+91 87654 32109",
      eta: "15 min", 
      status: "Assigned", 
      address: "Store Location" 
    },
    { 
      id: "QC009", 
      orderId: "ORD-2024-009", 
      partner: "Swiggy Genie", 
      rider: "Manish Verma", 
      phone: "+91 98123 45678",
      eta: "6 min", 
      status: "En Route", 
      address: "Store Location" 
    },
    { 
      id: "QC010", 
      orderId: "ORD-2024-010", 
      partner: "Porter", 
      rider: "Suresh Gupta", 
      phone: "+91 87456 23109",
      eta: "20 min", 
      status: "Assigned", 
      address: "Store Location" 
    },
  ];

  const delayedPickups = [
    { 
      id: "QC003", 
      orderId: "ORD-2024-003", 
      partner: "Uber Direct", 
      rider: "Vikash Yadav", 
      phone: "+91 76543 21098",
      eta: "Delayed 12 min", 
      status: "Overdue", 
      address: "Store Location" 
    },
    { 
      id: "QC011", 
      orderId: "ORD-2024-011", 
      partner: "Rapido", 
      rider: "Kiran Singh", 
      phone: "+91 89765 43210",
      eta: "Delayed 8 min", 
      status: "Overdue", 
      address: "Store Location" 
    },
  ];

  const partnerContacts = [
    { name: "Shadowfax", contact: "+91 8800123456", zone: "North Delhi", activeRiders: 25 },
    { name: "Dunzo", contact: "+91 8800234567", zone: "Central Delhi", activeRiders: 18 },
    { name: "Uber Direct", contact: "+91 8800345678", zone: "South Delhi", activeRiders: 32 },
    { name: "Swiggy Genie", contact: "+91 8800456789", zone: "East Delhi", activeRiders: 22 },
    { name: "Porter", contact: "+91 8800567890", zone: "West Delhi", activeRiders: 15 },
    { name: "Rapido", contact: "+91 8800678901", zone: "Gurgaon", activeRiders: 28 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Hyperlocal Delivery Partner Management</h1>
          <p className="text-muted-foreground">
            Coordinate with 3PL partners for real-time pickup and delivery
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button>
            <Truck className="mr-2 h-4 w-4" />
            Request Pickup
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pickup SLA Compliance</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.pickupSLACompliance}</div>
            <p className="text-xs text-muted-foreground">
              Target: &gt;90%
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed Pickup Ratio</CardTitle>
            <XCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.failedPickupRatio}</div>
            <p className="text-xs text-muted-foreground">
              Target: &lt;5%
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Delivery ETA Accuracy</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.deliveryETAAccuracy}</div>
            <p className="text-xs text-muted-foreground">
              Target: &gt;85%
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Live Status Accuracy</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.liveStatusAccuracy}</div>
            <p className="text-xs text-muted-foreground">
              Target: &gt;95%
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs */}
      <Card>
        <CardContent className="p-6">
          <Tabs value={tab} onValueChange={setTab} className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="active-pickups">Active Pickups</TabsTrigger>
              <TabsTrigger value="delayed-pickups">Delayed Pickups</TabsTrigger>
              <TabsTrigger value="partner-contacts">Partner Contacts</TabsTrigger>
              <TabsTrigger value="completed-deliveries">Completed Deliveries</TabsTrigger>
              <TabsTrigger value="exception-log">Exception Log</TabsTrigger>
            </TabsList>
            
            <TabsContent value="active-pickups">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Active Pickups</h3>
                  <Badge variant="secondary">{activePickups.length} Active</Badge>
                </div>
                
                {activePickups.map((pickup) => (
                  <Card key={pickup.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">Order {pickup.orderId}</h4>
                          <Badge variant="outline">{pickup.partner}</Badge>
                          <Badge className="bg-blue-100 text-blue-800">{pickup.status}</Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            <span>{pickup.rider}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Phone className="h-4 w-4" />
                            <span>{pickup.phone}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>ETA: {pickup.eta}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">Track Rider</Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Rider Tracking - {pickup.rider}</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <label className="text-sm font-medium">Current Status</label>
                                <p>{pickup.status}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium">ETA</label>
                                <p>{pickup.eta}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Contact</label>
                                <p>{pickup.phone}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Partner</label>
                                <p>{pickup.partner}</p>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button size="sm">Confirm Arrival</Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="delayed-pickups">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Delayed Pickups</h3>
                  <Badge variant="destructive">{delayedPickups.length} Delayed</Badge>
                </div>
                
                {delayedPickups.map((pickup) => (
                  <Card key={pickup.id} className="p-4 border-red-200">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-red-500" />
                          <h4 className="font-medium">Order {pickup.orderId}</h4>
                          <Badge variant="outline">{pickup.partner}</Badge>
                          <Badge variant="destructive">{pickup.status}</Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            <span>{pickup.rider}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Phone className="h-4 w-4" />
                            <span>{pickup.phone}</span>
                          </div>
                          <div className="flex items-center gap-1 text-red-600">
                            <Clock className="h-4 w-4" />
                            <span>{pickup.eta}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">Escalate</Button>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="destructive">Reassign Rider</Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Reassign Rider for Order {pickup.orderId}</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <label className="text-sm font-medium">Current Rider</label>
                                <p className="text-muted-foreground">{pickup.rider} ({pickup.partner})</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Select New Partner</label>
                                <Select>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Choose partner" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {partnerContacts.map((partner) => (
                                      <SelectItem key={partner.name} value={partner.name}>
                                        {partner.name} ({partner.activeRiders} riders available)
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Reassignment Reason</label>
                                <Select>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select reason" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="rider-unavailable">Rider Unavailable</SelectItem>
                                    <SelectItem value="delayed-pickup">Delayed Pickup</SelectItem>
                                    <SelectItem value="rider-request">Rider Request</SelectItem>
                                    <SelectItem value="emergency">Emergency</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <Button className="w-full">Confirm Reassignment</Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="completed-deliveries">
              <div className="text-center py-8">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">All Deliveries Completed</h3>
                <p className="text-muted-foreground">No completed deliveries to show at the moment</p>
              </div>
            </TabsContent>
            
            <TabsContent value="partner-contacts">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Delivery Partner Contacts</h3>
                  <Badge variant="secondary">{partnerContacts.length} Partners</Badge>
                </div>
                
                {partnerContacts.map((partner) => (
                  <Card key={partner.name} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{partner.name}</h4>
                          <Badge variant="outline">{partner.zone}</Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Phone className="h-4 w-4" />
                            <span>{partner.contact}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            <span>{partner.activeRiders} riders available</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">Call Partner</Button>
                        <Button size="sm">Request Riders</Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="completed-deliveries">
              <div className="text-center py-8">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">All Deliveries Completed</h3>
                <p className="text-muted-foreground">No completed deliveries to show at the moment</p>
              </div>
            </TabsContent>
            
            <TabsContent value="exception-log">
              <div className="text-center py-8">
                <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No Exceptions Logged</h3>
                <p className="text-muted-foreground">All pickups and deliveries are running smoothly</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}