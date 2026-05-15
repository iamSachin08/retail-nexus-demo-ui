import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MobileTabs } from "@/components/ui/mobile-tabs";
import { MobileTable } from "@/components/ui/mobile-table";
import { ResponsiveDialog } from "@/components/ui/responsive-dialog";
import { useIsMobile } from "@/hooks/use-mobile";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Users, 
  Search, 
  Filter, 
  Download, 
  Plus,
  Clock,
  Target,
  Award,
  GraduationCap,
  Eye,
  Edit,
  Trash2,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Star,
  AlertCircle,
  CheckCircle,
  XCircle,
  BarChart3,
  FileText,
  Send
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AttendanceRosters } from "./AttendanceRosters";
import { TaskAssignment } from "./TaskAssignment";
import { StaffPerformance } from "./StaffPerformance";
import { TrainingQuiz } from "./TrainingQuiz";

export function StaffContent() {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("directory");
  const [isAddStaffOpen, setIsAddStaffOpen] = useState(false);
  const [isViewStaffOpen, setIsViewStaffOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<any>(null);
  const [filterDepartment, setFilterDepartment] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterLocation, setFilterLocation] = useState("");

  const staffData = [
    {
      id: "EMP001",
      name: "Ravi Kumar",
      email: "ravi.kumar@retailhub.com",
      phone: "+91 98765 43210",
      department: "Sales",
      position: "Senior Sales Executive",
      location: "Mumbai Central",
      status: "Active",
      joinDate: "2022-03-15",
      performance: "Excellent",
      attendance: "95%",
      tasks: 3,
      completed: 2
    },
    {
      id: "EMP002",
      name: "Priya Sharma",
      email: "priya.sharma@retailhub.com",
      phone: "+91 98765 43211",
      department: "Customer Service",
      position: "Customer Service Manager",
      location: "Andheri West",
      status: "Active",
      joinDate: "2021-08-20",
      performance: "Good",
      attendance: "92%",
      tasks: 5,
      completed: 4
    },
    {
      id: "EMP003",
      name: "Amit Patel",
      email: "amit.patel@retailhub.com",
      phone: "+91 98765 43212",
      department: "Inventory",
      position: "Inventory Specialist",
      location: "Bandra East",
      status: "On Leave",
      joinDate: "2023-01-10",
      performance: "Average",
      attendance: "88%",
      tasks: 2,
      completed: 1
    }
  ];

  const handleAddStaff = () => {
    toast({
      title: "Staff Added",
      description: "New staff member has been added successfully",
    });
    setIsAddStaffOpen(false);
  };

  const handleEditStaff = () => {
    toast({
      title: "Staff Updated",
      description: "Staff information has been updated successfully",
    });
  };

  const handleDeleteStaff = (id: string) => {
    toast({
      title: "Staff Removed",
      description: `Staff member ${id} has been removed successfully`,
    });
  };

  const handleBulkTraining = () => {
    toast({
      title: "Bulk Training",
      description: "Training has been assigned to selected staff members",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800";
      case "On Leave": return "bg-yellow-100 text-yellow-800";
      case "Inactive": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Active": return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "On Leave": return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      case "Inactive": return <XCircle className="h-4 w-4 text-red-600" />;
      default: return <User className="h-4 w-4 text-gray-600" />;
    }
  };

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case "Excellent": return "bg-green-100 text-green-800";
      case "Good": return "bg-blue-100 text-blue-800";
      case "Average": return "bg-yellow-100 text-yellow-800";
      case "Poor": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredStaff = staffData.filter(staff => {
    const matchesSearch = staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.department.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDepartment = !filterDepartment || filterDepartment === "all" || staff.department === filterDepartment;
    const matchesStatus = !filterStatus || filterStatus === "all" || staff.status === filterStatus;
    const matchesLocation = !filterLocation || filterLocation === "all" || staff.location === filterLocation;
    
    return matchesSearch && matchesDepartment && matchesStatus && matchesLocation;
  });

  const uniqueDepartments = [...new Set(staffData.map(staff => staff.department))];
  const uniqueStatuses = [...new Set(staffData.map(staff => staff.status))];
  const uniqueLocations = [...new Set(staffData.map(staff => staff.location))];

  const tabs = [
    { value: "directory", label: "Staff Directory", icon: <Users className="h-4 w-4" /> },
    { value: "attendance", label: "Attendance", icon: <Clock className="h-4 w-4" /> },
    { value: "tasks", label: "Task Assignment", icon: <Target className="h-4 w-4" /> },
    { value: "performance", label: "Performance", icon: <Award className="h-4 w-4" /> },
    { value: "training", label: "Training", icon: <GraduationCap className="h-4 w-4" /> },
  ];

  return (
    <div className="space-y-4 sm:space-y-6 p-4 sm:p-6">
      {/* Header Section */}
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Staff Management</h1>
          <p className="text-sm sm:text-base text-gray-600">Manage staff attendance, tasks, performance and training</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Dialog open={isAddStaffOpen} onOpenChange={setIsAddStaffOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Staff
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Staff Member</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="Enter full name" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Enter email address" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" placeholder="Enter phone number" />
                  </div>
                  <div>
                    <Label htmlFor="department">Department</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sales">Sales</SelectItem>
                        <SelectItem value="customer-service">Customer Service</SelectItem>
                        <SelectItem value="inventory">Inventory</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="finance">Paper Finance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="position">Position</Label>
                    <Input id="position" placeholder="Enter position/title" />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mumbai-central">Mumbai Central</SelectItem>
                        <SelectItem value="andheri-west">Andheri West</SelectItem>
                        <SelectItem value="bandra-east">Bandra East</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Textarea id="address" placeholder="Enter address" />
                </div>
                
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsAddStaffOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddStaff}>
                    Add Staff
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          
          <Button variant="outline" size="sm" onClick={handleBulkTraining}>
            <GraduationCap className="h-4 w-4 mr-2" />
            Bulk Training
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
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Staff</p>
                <p className="text-xl font-semibold">24</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Clock className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Present Today</p>
                <p className="text-xl font-semibold">22</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Target className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Tasks Pending</p>
                <p className="text-xl font-semibold">8</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Award className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Top Performer</p>
                <p className="text-xl font-semibold">Ravi K</p>
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
                placeholder="Search staff by name, ID, or department..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={filterDepartment} onValueChange={setFilterDepartment}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {uniqueDepartments.map(dept => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
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
              
              <Select value={filterLocation} onValueChange={setFilterLocation}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  {uniqueLocations.map(location => (
                    <SelectItem key={location} value={location}>{location}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Staff List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Staff Directory
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredStaff.map((staff) => (
              <div key={staff.id} className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex-1 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(staff.status)}
                      <h3 className="font-semibold text-gray-900">{staff.name}</h3>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={getStatusColor(staff.status)}>
                        {staff.status}
                      </Badge>
                      <Badge className={getPerformanceColor(staff.performance)}>
                        {staff.performance}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>{staff.id}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{staff.department}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Target className="h-4 w-4" />
                      <span>{staff.position}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{staff.location}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Mail className="h-4 w-4" />
                      <span>{staff.email}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone className="h-4 w-4" />
                      <span>{staff.phone}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>Joined: {staff.joinDate}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-green-600" />
                      <span>Attendance: {staff.attendance}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Target className="h-4 w-4 text-blue-600" />
                      <span>Tasks: {staff.completed}/{staff.tasks}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setSelectedStaff(staff)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl">
                      <DialogHeader>
                        <DialogTitle>Staff Details - {staff.name}</DialogTitle>
                      </DialogHeader>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold mb-2">Personal Information</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-600">Employee ID:</span>
                                <span>{staff.id}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Name:</span>
                                <span>{staff.name}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Email:</span>
                                <span>{staff.email}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Phone:</span>
                                <span>{staff.phone}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold mb-2">Work Information</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-600">Department:</span>
                                <span>{staff.department}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Position:</span>
                                <span>{staff.position}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Location:</span>
                                <span>{staff.location}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Join Date:</span>
                                <span>{staff.joinDate}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold mb-2">Performance Metrics</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-600">Performance Rating:</span>
                                <Badge className={getPerformanceColor(staff.performance)}>
                                  {staff.performance}
                                </Badge>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Attendance Rate:</span>
                                <span>{staff.attendance}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Tasks Completed:</span>
                                <span>{staff.completed}/{staff.tasks}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Status:</span>
                                <Badge className={getStatusColor(staff.status)}>
                                  {staff.status}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            <Button size="sm">
                              <BarChart3 className="h-4 w-4 mr-2" />
                              View Performance
                            </Button>
                            <Button variant="outline" size="sm">
                              <FileText className="h-4 w-4 mr-2" />
                              View Reports
                            </Button>
                            <Button variant="outline" size="sm">
                              <Send className="h-4 w-4 mr-2" />
                              Send Message
                            </Button>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleEditStaff()}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-red-200 text-red-600 hover:bg-red-50"
                    onClick={() => handleDeleteStaff(staff.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Remove
                  </Button>
                </div>
              </div>
            ))}
            
            {filteredStaff.length === 0 && (
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No staff members found matching your criteria.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      {isMobile ? (
        <>
          <MobileTabs 
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            className="mb-4"
          />
          
          <div className="mt-4">
            {activeTab === "directory" && (
              <div className="space-y-4">
                {filteredStaff.map((staff) => (
                  <MobileTable
                    key={staff.id}
                    data={[staff]}
                    columns={[
                      { key: "name", label: "Name" },
                      { key: "department", label: "Department" },
                      { key: "position", label: "Position" },
                      { key: "status", label: "Status" },
                    ]}
                    primaryField="name"
                    secondaryField="position"
                    statusField="status"
                  />
                ))}
              </div>
            )}
            {activeTab === "attendance" && <AttendanceRosters searchQuery={searchQuery} />}
            {activeTab === "tasks" && <TaskAssignment searchQuery={searchQuery} />}
            {activeTab === "performance" && <StaffPerformance searchQuery={searchQuery} />}
            {activeTab === "training" && <TrainingQuiz searchQuery={searchQuery} />}
          </div>
        </>
      ) : (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 h-auto">
            <TabsTrigger value="directory" className="text-xs md:text-sm">Staff Directory</TabsTrigger>
            <TabsTrigger value="attendance" className="text-xs md:text-sm">Attendance</TabsTrigger>
            <TabsTrigger value="tasks" className="text-xs md:text-sm">Tasks</TabsTrigger>
            <TabsTrigger value="performance" className="text-xs md:text-sm">Performance</TabsTrigger>
            <TabsTrigger value="training" className="text-xs md:text-sm">Training</TabsTrigger>
          </TabsList>
          
          <TabsContent value="directory" className="mt-6">
            <div className="space-y-4">
              {filteredStaff.map((staff) => (
                <div key={staff.id} className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 border rounded-lg hover:bg-gray-50">
                  {/* ... keep existing staff card content ... */}
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="attendance" className="mt-6">
            <AttendanceRosters searchQuery={searchQuery} />
          </TabsContent>
          
          <TabsContent value="tasks" className="mt-6">
            <TaskAssignment searchQuery={searchQuery} />
          </TabsContent>
          
          <TabsContent value="performance" className="mt-6">
            <StaffPerformance searchQuery={searchQuery} />
          </TabsContent>
          
          <TabsContent value="training" className="mt-6">
            <TrainingQuiz searchQuery={searchQuery} />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
