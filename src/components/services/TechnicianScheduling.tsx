
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, User, Phone, MapPin, Wrench } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TechnicianSchedulingProps {
  searchQuery: string;
}

export function TechnicianScheduling({ searchQuery }: TechnicianSchedulingProps) {
  const { toast } = useToast();
  const [isAssignTechOpen, setIsAssignTechOpen] = useState(false);

  const technicians = [
    {
      id: "TECH001",
      name: "Rohit Technician",
      phone: "+91 9876543210",
      skills: ["TV Installation", "AC Service", "Washing Machine"],
      rating: 4.8,
      status: "Available",
      currentJobs: 2,
      todaySchedule: [
        { time: "10:00 AM", job: "TV Installation - Pune", status: "Completed" },
        { time: "02:00 PM", job: "AC Service - Camp", status: "In Progress" },
        { time: "04:00 PM", job: "Free Slot", status: "Available" }
      ]
    },
    {
      id: "TECH002",
      name: "Suresh Kumar",
      phone: "+91 8765432109",
      skills: ["Refrigerator", "Microwave", "Dishwasher"],
      rating: 4.6,
      status: "Busy",
      currentJobs: 3,
      todaySchedule: [
        { time: "09:00 AM", job: "Refrigerator Repair - FC Road", status: "Completed" },
        { time: "11:00 AM", job: "Microwave Service - Kothrud", status: "Completed" },
        { time: "02:00 PM", job: "Dishwasher Install - Baner", status: "In Progress" }
      ]
    },
    {
      id: "TECH003",
      name: "Prakash Technician",
      phone: "+91 7654321098",
      skills: ["Mobile Repair", "Laptop Service", "Tablet"],
      rating: 4.9,
      status: "Available",
      currentJobs: 1,
      todaySchedule: [
        { time: "11:00 AM", job: "Laptop Service - Hadapsar", status: "Completed" },
        { time: "03:00 PM", job: "Free Slot", status: "Available" },
        { time: "05:00 PM", job: "Free Slot", status: "Available" }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available": return "bg-green-100 text-green-800";
      case "Busy": return "bg-red-100 text-red-800";
      case "Off Duty": return "bg-gray-100 text-gray-800";
      case "Completed": return "bg-green-100 text-green-800";
      case "In Progress": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredTechnicians = technicians.filter(tech => 
    tech.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tech.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tech.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleAssignTechnician = () => {
    toast({
      title: "Technician Assigned",
      description: "Technician has been assigned to the service job successfully",
    });
    setIsAssignTechOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Technician Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">8</p>
              <p className="text-sm text-green-700">Available</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">4</p>
              <p className="text-sm text-red-700">Busy</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-600">2</p>
              <p className="text-sm text-gray-700">Off Duty</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">4.7</p>
              <p className="text-sm text-blue-700">Avg Rating</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Assign Technician Button */}
      <div className="flex justify-start">
        <Dialog open={isAssignTechOpen} onOpenChange={setIsAssignTechOpen}>
          <DialogTrigger asChild>
            <Button>
              <User className="h-4 w-4 mr-2" />
              Assign Technician
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Assign Technician to Job</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="jobId">Service Job ID</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select job" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="srv001">SRV001 - TV Installation</SelectItem>
                      <SelectItem value="srv002">SRV002 - AC Repair</SelectItem>
                      <SelectItem value="srv003">SRV003 - Washing Machine</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="technician">Technician</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select technician" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tech001">Rohit Technician</SelectItem>
                      <SelectItem value="tech002">Suresh Kumar</SelectItem>
                      <SelectItem value="tech003">Prakash Technician</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Scheduled Date</Label>
                  <Input type="date" />
                </div>
                <div>
                  <Label htmlFor="time">Scheduled Time</Label>
                  <Input type="time" />
                </div>
              </div>
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
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setIsAssignTechOpen(false)}>Cancel</Button>
              <Button onClick={handleAssignTechnician}>Assign Technician</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Technicians List */}
      <div className="space-y-6">
        {filteredTechnicians.map((tech) => (
          <Card key={tech.id}>
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Technician Info */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <h4 className="font-semibold text-gray-900">{tech.name}</h4>
                      <Badge className={getStatusColor(tech.status)}>
                        {tech.status}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-500">★</span>
                        <span className="text-sm font-medium">{tech.rating}</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-500" />
                        <span>{tech.id}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <span>{tech.phone}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm">
                      <Wrench className="h-4 w-4 text-gray-500" />
                      <span>Skills: {tech.skills.join(", ")}</span>
                    </div>
                    
                    <div className="text-sm">
                      <span className="font-medium">Current Jobs:</span> {tech.currentJobs}
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <Button size="sm" variant="outline">View Profile</Button>
                    <Button size="sm" variant="outline">Assign Job</Button>
                    <Button size="sm" variant="outline">Contact</Button>
                  </div>
                </div>
                
                {/* Today's Schedule */}
                <div>
                  <h5 className="font-medium text-gray-900 mb-3">Today's Schedule</h5>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {tech.todaySchedule.map((schedule, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span className="font-medium">{schedule.time}</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{schedule.job}</p>
                        <Badge className={getStatusColor(schedule.status)} variant="outline">
                          {schedule.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
