import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Wrench, 
  Search, 
  Filter, 
  Download, 
  Plus,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Eye,
  Edit,
  Trash2,
  User,
  MapPin,
  Phone,
  Mail,
  Star,
  MessageSquare,
  BarChart3,
  FileText,
  Send,
  Truck,
  Settings
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ServiceBooking } from "./ServiceBooking";
import { TechnicianScheduling } from "./TechnicianScheduling";
import { JobStatusTracker } from "./JobStatusTracker";
import { CustomerFeedback } from "./CustomerFeedback";

export function ServicesContent() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [isNewServiceOpen, setIsNewServiceOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [filterStatus, setFilterStatus] = useState("");
  const [filterServiceType, setFilterServiceType] = useState("");
  const [filterTechnician, setFilterTechnician] = useState("");

  const serviceData = [
    {
      id: "SRV-2024-001",
      customer: "Rahul Sharma",
      phone: "+91 98765 43210",
      email: "rahul.sharma@email.com",
      address: "123, Andheri West, Mumbai",
      serviceType: "Installation",
      product: "Samsung 55\" 4K TV",
      technician: "Amit Kumar",
      status: "In Progress",
      priority: "High",
      scheduledDate: "2024-01-15",
      estimatedDuration: "2 hours",
      description: "TV installation with wall mounting",
      notes: "Customer prefers evening slot"
    },
    {
      id: "SRV-2024-002",
      customer: "Priya Patel",
      phone: "+91 98765 43211",
      email: "priya.patel@email.com",
      address: "456, Bandra East, Mumbai",
      serviceType: "Repair",
      product: "LG Refrigerator",
      technician: "Rajesh Singh",
      status: "Scheduled",
      priority: "Medium",
      scheduledDate: "2024-01-16",
      estimatedDuration: "3 hours",
      description: "Refrigerator not cooling properly",
      notes: "Check compressor and cooling system"
    },
    {
      id: "SRV-2024-003",
      customer: "Amit Kumar",
      phone: "+91 98765 43212",
      email: "amit.kumar@email.com",
      address: "789, Mumbai Central, Mumbai",
      serviceType: "Maintenance",
      product: "Whirlpool Washing Machine",
      technician: "Suresh Verma",
      status: "Completed",
      priority: "Low",
      scheduledDate: "2024-01-14",
      estimatedDuration: "1 hour",
      description: "Regular maintenance and cleaning",
      notes: "Service completed successfully"
    }
  ];

  const handleNewService = () => {
    toast({
      title: "Service Created",
      description: "New service booking has been created successfully",
    });
    setIsNewServiceOpen(false);
  };

  const handleEditService = () => {
    toast({
      title: "Service Updated",
      description: "Service booking has been updated successfully",
    });
  };

  const handleDeleteService = (id: string) => {
    toast({
      title: "Service Cancelled",
      description: `Service ${id} has been cancelled successfully`,
    });
  };

  const handleScheduleService = () => {
    toast({
      title: "Service Scheduled",
      description: "Service has been scheduled with technician",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-800";
      case "In Progress": return "bg-blue-100 text-blue-800";
      case "Scheduled": return "bg-yellow-100 text-yellow-800";
      case "Cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed": return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "In Progress": return <Wrench className="h-4 w-4 text-blue-600" />;
      case "Scheduled": return <Clock className="h-4 w-4 text-yellow-600" />;
      case "Cancelled": return <AlertCircle className="h-4 w-4 text-red-600" />;
      default: return <Clock className="h-4 w-4 text-gray-600" />;
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

  const filteredServices = serviceData.filter(service => {
    const matchesSearch = service.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.technician.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = !filterStatus || filterStatus === "all" || service.status === filterStatus;
    const matchesServiceType = !filterServiceType || filterServiceType === "all" || service.serviceType === filterServiceType;
    const matchesTechnician = !filterTechnician || filterTechnician === "all" || service.technician === filterTechnician;
    
    return matchesSearch && matchesStatus && matchesServiceType && matchesTechnician;
  });

  const uniqueStatuses = [...new Set(serviceData.map(service => service.status))];
  const uniqueServiceTypes = [...new Set(serviceData.map(service => service.serviceType))];
  const uniqueTechnicians = [...new Set(serviceData.map(service => service.technician))];

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Installation, Repairs & Services</h1>
          <p className="text-gray-600">Manage service bookings, technician scheduling and job tracking</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Dialog open={isNewServiceOpen} onOpenChange={setIsNewServiceOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                New Service
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Service Booking</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="customer">Customer Name</Label>
                    <Input id="customer" placeholder="Enter customer name" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" placeholder="Enter phone number" />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Enter email address" />
                </div>
                
                <div>
                  <Label htmlFor="address">Service Address</Label>
                  <Textarea id="address" placeholder="Enter complete service address" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="serviceType">Service Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select service type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="installation">Installation</SelectItem>
                        <SelectItem value="repair">Repair</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                        <SelectItem value="upgrade">Upgrade</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="product">Product</Label>
                    <Input id="product" placeholder="Enter product name/model" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    <Label htmlFor="scheduledDate">Scheduled Date</Label>
                    <Input id="scheduledDate" type="date" />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="description">Service Description</Label>
                  <Textarea id="description" placeholder="Describe the service required" />
                </div>
                
                <div>
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea id="notes" placeholder="Any additional notes or special instructions" />
                </div>
                
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsNewServiceOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleNewService}>
                    Create Service
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          
          <Button variant="outline" size="sm" onClick={handleScheduleService}>
            <Calendar className="h-4 w-4 mr-2" />
            Schedule
          </Button>
          
          <Button variant="outline" size="sm">
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
                <Wrench className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Active Jobs</p>
                <p className="text-xl font-semibold">12</p>
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
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-xl font-semibold">8</p>
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
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-xl font-semibold">156</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertCircle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Overdue</p>
                <p className="text-xl font-semibold">3</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search by service ID, customer, or technician..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  {uniqueStatuses.map(status => (
                    <SelectItem key={status} value={status}>{status}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={filterServiceType} onValueChange={setFilterServiceType}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Service Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {uniqueServiceTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={filterTechnician} onValueChange={setFilterTechnician}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Technician" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Technicians</SelectItem>
                  {uniqueTechnicians.map(tech => (
                    <SelectItem key={tech} value={tech}>{tech}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Service Jobs List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wrench className="h-5 w-5" />
            Active Service Jobs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredServices.map((service) => (
              <div key={service.id} className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex-1 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(service.status)}
                      <h3 className="font-semibold text-gray-900">{service.id}</h3>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={getStatusColor(service.status)}>
                        {service.status}
                      </Badge>
                      <Badge className={getPriorityColor(service.priority)}>
                        {service.priority}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>{service.customer}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Wrench className="h-4 w-4" />
                      <span>{service.serviceType}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Settings className="h-4 w-4" />
                      <span>{service.product}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>{service.technician}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{service.address}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{service.scheduledDate}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{service.estimatedDuration}</span>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Description:</span> {service.description}
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setSelectedService(service)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl">
                      <DialogHeader>
                        <DialogTitle>Service Details - {service.id}</DialogTitle>
                      </DialogHeader>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold mb-2">Customer Information</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-600">Service ID:</span>
                                <span>{service.id}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Customer:</span>
                                <span>{service.customer}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Phone:</span>
                                <span>{service.phone}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Email:</span>
                                <span>{service.email}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold mb-2">Service Information</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-600">Service Type:</span>
                                <span>{service.serviceType}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Product:</span>
                                <span>{service.product}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Technician:</span>
                                <span>{service.technician}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Priority:</span>
                                <Badge className={getPriorityColor(service.priority)}>
                                  {service.priority}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold mb-2">Schedule & Status</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-600">Scheduled Date:</span>
                                <span>{service.scheduledDate}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Estimated Duration:</span>
                                <span>{service.estimatedDuration}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Status:</span>
                                <Badge className={getStatusColor(service.status)}>
                                  {service.status}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold mb-2">Service Address</h4>
                            <p className="text-sm text-gray-600">{service.address}</p>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold mb-2">Description</h4>
                            <p className="text-sm text-gray-600">{service.description}</p>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold mb-2">Notes</h4>
                            <p className="text-sm text-gray-600">{service.notes}</p>
                          </div>
                          
                          <div className="flex gap-2">
                            <Button size="sm">
                              <Truck className="h-4 w-4 mr-2" />
                              Assign Technician
                            </Button>
                            <Button variant="outline" size="sm">
                              <MessageSquare className="h-4 w-4 mr-2" />
                              Contact Customer
                            </Button>
                            <Button variant="outline" size="sm">
                              <BarChart3 className="h-4 w-4 mr-2" />
                              View Progress
                            </Button>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleEditService()}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleScheduleService()}
                    disabled={service.status === "Completed"}
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Reschedule
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-red-200 text-red-600 hover:bg-red-50"
                    onClick={() => handleDeleteService(service.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </div>
            ))}
            
            {filteredServices.length === 0 && (
              <div className="text-center py-8">
                <Wrench className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No service jobs found matching your criteria.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="booking" className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
          <TabsTrigger value="booking">New Service Booking</TabsTrigger>
          <TabsTrigger value="scheduling">Technician Scheduling</TabsTrigger>
          <TabsTrigger value="tracking">Job Status Tracker</TabsTrigger>
          <TabsTrigger value="feedback">Customer Feedback</TabsTrigger>
        </TabsList>
        
        <TabsContent value="booking" className="mt-6">
          <ServiceBooking searchQuery={searchQuery} />
        </TabsContent>
        
        <TabsContent value="scheduling" className="mt-6">
          <TechnicianScheduling searchQuery={searchQuery} />
        </TabsContent>
        
        <TabsContent value="tracking" className="mt-6">
          <JobStatusTracker searchQuery={searchQuery} />
        </TabsContent>
        
        <TabsContent value="feedback" className="mt-6">
          <CustomerFeedback searchQuery={searchQuery} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
