
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Phone, MapPin, Calendar, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ServiceBookingProps {
  searchQuery: string;
}

export function ServiceBooking({ searchQuery }: ServiceBookingProps) {
  const { toast } = useToast();
  const [isCreateBookingOpen, setIsCreateBookingOpen] = useState(false);

  const bookings = [
    {
      id: "SRV001",
      customerName: "Rajesh Patel",
      phone: "+91 9876543210",
      address: "123 MG Road, Pune",
      serviceType: "Installation",
      product: "Samsung 55\" Smart TV",
      priority: "High",
      status: "Scheduled",
      scheduledDate: "2024-01-22",
      amount: "₹1,500"
    },
    {
      id: "SRV002",
      customerName: "Priya Sharma",
      phone: "+91 8765432109",
      address: "456 FC Road, Pune",
      serviceType: "Repair",
      product: "LG Washing Machine",
      priority: "Medium",
      status: "Pending",
      scheduledDate: "2024-01-23",
      amount: "₹800"
    },
    {
      id: "SRV003",
      customerName: "Amit Kumar",
      phone: "+91 7654321098",
      address: "789 Camp Area, Pune",
      serviceType: "Maintenance",
      product: "Whirlpool AC",
      priority: "Low",
      status: "Completed",
      scheduledDate: "2024-01-20",
      amount: "₹1,200"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-800";
      case "Scheduled": return "bg-blue-100 text-blue-800";
      case "Pending": return "bg-yellow-100 text-yellow-800";
      case "Cancelled": return "bg-red-100 text-red-800";
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

  const filteredBookings = bookings.filter(booking => 
    booking.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    booking.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    booking.product.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateBooking = () => {
    toast({
      title: "Service Booked",
      description: "New service booking has been created successfully",
    });
    setIsCreateBookingOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Service Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">45</p>
              <p className="text-sm text-blue-700">Total Bookings</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">₹67,500</p>
              <p className="text-sm text-green-700">Revenue</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">92%</p>
              <p className="text-sm text-purple-700">Success Rate</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Create Booking Button */}
      <div className="flex justify-start">
        <Dialog open={isCreateBookingOpen} onOpenChange={setIsCreateBookingOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Service Booking
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Service Booking</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="customerName">Customer Name</Label>
                  <Input placeholder="Enter customer name" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input placeholder="+91 XXXXXXXXXX" />
                </div>
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Textarea placeholder="Enter full address" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="serviceType">Service Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="installation">Installation</SelectItem>
                      <SelectItem value="repair">Repair</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="demo">Demo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="product">Product</Label>
                  <Input placeholder="Enter product name" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="amount">Service Amount</Label>
                  <Input placeholder="₹0" />
                </div>
              </div>
              <div>
                <Label htmlFor="scheduledDate">Preferred Date</Label>
                <Input type="date" />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setIsCreateBookingOpen(false)}>Cancel</Button>
              <Button onClick={handleCreateBooking}>Create Booking</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        {filteredBookings.map((booking) => (
          <Card key={booking.id}>
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <h4 className="font-semibold text-gray-900">{booking.id}</h4>
                    <div className="flex gap-2">
                      <Badge className={getStatusColor(booking.status)}>
                        {booking.status}
                      </Badge>
                      <Badge className={getPriorityColor(booking.priority)}>
                        {booking.priority}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-500" />
                      <span>{booking.customerName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span>{booking.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span className="truncate">{booking.address}</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Service:</span> {booking.serviceType}
                    </div>
                    <div>
                      <span className="font-medium">Product:</span> {booking.product}
                    </div>
                    <div>
                      <span className="font-medium">Amount:</span> {booking.amount}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span>Scheduled: {booking.scheduledDate}</span>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <Button size="sm" variant="outline">Edit</Button>
                  <Button size="sm" variant="outline">Assign Tech</Button>
                  <Button size="sm" variant="outline">Contact</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
