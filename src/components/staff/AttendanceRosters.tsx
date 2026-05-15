import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, MapPin, CheckCircle, XCircle, AlertTriangle, Plus, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AttendanceRostersProps {
  searchQuery: string;
  viewType: "my" | "subordinates";
}

export function AttendanceRosters({ searchQuery, viewType }: AttendanceRostersProps) {
  const { toast } = useToast();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<any>(null);

  const staffData = [
    {
      id: "EMP001",
      name: "Ravi Kumar",
      role: "Sales Associate",
      shift: "Morning (9 AM - 6 PM)",
      status: "Present",
      checkIn: "08:58 AM",
      location: "Floor 1 - Electronics",
      performance: 92
    },
    {
      id: "EMP002",
      name: "Priya Sharma",
      role: "Floor Manager",
      shift: "Full Day (9 AM - 9 PM)",
      status: "Present",
      checkIn: "08:45 AM",
      location: "Manager Desk",
      performance: 95
    },
    {
      id: "EMP003",
      name: "Amit Patel",
      role: "Sales Associate",
      shift: "Evening (2 PM - 10 PM)",
      status: "Late",
      checkIn: "02:15 PM",
      location: "Floor 2 - Mobile",
      performance: 78
    },
    {
      id: "EMP004",
      name: "Sneha Reddy",
      role: "Cashier",
      shift: "Morning (9 AM - 6 PM)",
      status: "Absent",
      checkIn: "-",
      location: "-",
      performance: 88
    }
  ];

  // Filter data based on viewType
  const getFilteredData = () => {
    if (viewType === "my") {
      // Show only current user's data
      return staffData.filter(staff => staff.id === "EMP002"); // Assuming current user is Priya Sharma
    } else {
      // Show subordinates data
      return staffData.filter(staff => staff.id !== "EMP002");
    }
  };

  const filteredStaff = getFilteredData().filter(staff => 
    staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    staff.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    staff.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Present": return "bg-green-100 text-green-800";
      case "Late": return "bg-yellow-100 text-yellow-800";
      case "Absent": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Present": return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "Late": return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case "Absent": return <XCircle className="h-4 w-4 text-red-600" />;
      default: return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const handleMarkAttendance = (staffId: string, action: string) => {
    toast({
      title: "Attendance Updated",
      description: `${action} marked for staff ${staffId}`,
    });
  };

  const handleCreateRoster = (formData: any) => {
    toast({
      title: "Roster Created",
      description: "New roster has been created successfully",
    });
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Attendance Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-xl font-bold text-green-600">22</p>
                <p className="text-sm text-green-700">Present</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-8 w-8 text-yellow-600" />
              <div>
                <p className="text-xl font-bold text-yellow-600">1</p>
                <p className="text-sm text-yellow-700">Late</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <XCircle className="h-8 w-8 text-red-600" />
              <div>
                <p className="text-xl font-bold text-red-600">1</p>
                <p className="text-sm text-red-700">Absent</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-xl font-bold text-blue-600">91.7%</p>
                <p className="text-sm text-blue-700">Attendance Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Roster
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Roster</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="staff">Staff Member</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select staff" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="emp001">Ravi Kumar</SelectItem>
                    <SelectItem value="emp002">Priya Sharma</SelectItem>
                    <SelectItem value="emp003">Amit Patel</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="shift">Shift</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select shift" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="morning">Morning (9 AM - 6 PM)</SelectItem>
                    <SelectItem value="evening">Evening (2 PM - 10 PM)</SelectItem>
                    <SelectItem value="fullday">Full Day (9 AM - 9 PM)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="date">Date</Label>
                <Input type="date" />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input placeholder="Floor/Department" />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
              <Button onClick={() => handleCreateRoster({})}>Create Roster</Button>
            </div>
          </DialogContent>
        </Dialog>

        <Button variant="outline">
          <Calendar className="h-4 w-4 mr-2" />
          Weekly View
        </Button>
      </div>

      {/* Staff Attendance List */}
      <Card>
        <CardHeader>
          <CardTitle>Today's Attendance</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {filteredStaff.map((staff) => (
              <div key={staff.id} className="p-6 hover:bg-gray-50">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      {getStatusIcon(staff.status)}
                    </div>
                    <div className="flex-1 space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                        <h4 className="font-medium text-gray-900">{staff.name}</h4>
                        <Badge className={getStatusColor(staff.status)}>
                          {staff.status}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">ID:</span> {staff.id}
                        </div>
                        <div>
                          <span className="font-medium">Role:</span> {staff.role}
                        </div>
                        <div>
                          <span className="font-medium">Shift:</span> {staff.shift}
                        </div>
                        <div>
                          <span className="font-medium">Check-in:</span> {staff.checkIn}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="h-4 w-4" />
                        <span>{staff.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleMarkAttendance(staff.id, "Present")}>
                      Mark Present
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleMarkAttendance(staff.id, "Absent")}>
                      Mark Absent
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
