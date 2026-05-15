
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, User, Phone, MapPin, Wrench, Camera, Edit3 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface JobStatusTrackerProps {
  searchQuery: string;
}

export function JobStatusTracker({ searchQuery }: JobStatusTrackerProps) {
  const { toast } = useToast();
  const [isUpdateStatusOpen, setIsUpdateStatusOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<string>("");

  const jobs = [
    {
      id: "SRV001",
      customerName: "Rajesh Patel",
      phone: "+91 9876543210",
      address: "123 MG Road, Pune",
      serviceType: "Installation",
      product: "Samsung 55\" Smart TV",
      technician: "Rohit Technician",
      status: "In Progress",
      priority: "High",
      scheduledDate: "2024-01-22",
      startTime: "10:00 AM",
      estimatedCompletion: "12:00 PM",
      actualCompletion: "",
      notes: "Customer available after 10 AM",
      slaStatus: "On Time",
      amount: "₹1,500"
    },
    {
      id: "SRV002",
      customerName: "Priya Sharma",
      phone: "+91 8765432109",
      address: "456 FC Road, Pune",
      serviceType: "Repair",
      product: "LG Washing Machine",
      technician: "Suresh Kumar",
      status: "Completed",
      priority: "Medium",
      scheduledDate: "2024-01-21",
      startTime: "09:00 AM",
      estimatedCompletion: "11:00 AM",
      actualCompletion: "10:45 AM",
      notes: "Motor replacement completed successfully",
      slaStatus: "On Time",
      amount: "₹800"
    },
    {
      id: "SRV003",
      customerName: "Amit Kumar",
      phone: "+91 7654321098",
      address: "789 Camp Area, Pune",
      serviceType: "Maintenance",
      product: "Whirlpool AC",
      technician: "Prakash Technician",
      status: "Delayed",
      priority: "Low",
      scheduledDate: "2024-01-22",
      startTime: "02:00 PM",
      estimatedCompletion: "04:00 PM",
      actualCompletion: "",
      notes: "Waiting for spare parts",
      slaStatus: "Delayed",
      amount: "₹1,200"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-800";
      case "In Progress": return "bg-blue-100 text-blue-800";
      case "Scheduled": return "bg-yellow-100 text-yellow-800";
      case "Delayed": return "bg-red-100 text-red-800";
      case "Cancelled": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getSLAColor = (sla: string) => {
    switch (sla) {
      case "On Time": return "bg-green-100 text-green-800";
      case "Delayed": return "bg-red-100 text-red-800";
      case "At Risk": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredJobs = jobs.filter(job => 
    job.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.technician.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUpdateStatus = () => {
    toast({
      title: "Status Updated",
      description: "Job status has been updated successfully",
    });
    setIsUpdateStatusOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Job Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">12</p>
              <p className="text-sm text-blue-700">In Progress</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">156</p>
              <p className="text-sm text-green-700">Completed</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">3</p>
              <p className="text-sm text-red-700">Delayed</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">94%</p>
              <p className="text-sm text-purple-700">SLA Met</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Update Status Button */}
      <div className="flex justify-start">
        <Dialog open={isUpdateStatusOpen} onOpenChange={setIsUpdateStatusOpen}>
          <DialogTrigger asChild>
            <Button>
              <Edit3 className="h-4 w-4 mr-2" />
              Update Job Status
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Update Job Status</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="jobId">Job ID</Label>
                <Select value={selectedJob} onValueChange={setSelectedJob}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select job" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="srv001">SRV001 - TV Installation</SelectItem>
                    <SelectItem value="srv002">SRV002 - Washing Machine Repair</SelectItem>
                    <SelectItem value="srv003">SRV003 - AC Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="delayed">Delayed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="completionTime">Completion Time</Label>
                  <Input type="time" />
                </div>
              </div>
              <div>
                <Label htmlFor="notes">Service Notes</Label>
                <Textarea placeholder="Enter service notes and observations" />
              </div>
              <div>
                <Label htmlFor="images">Upload Images</Label>
                <Input type="file" multiple accept="image/*" />
                <p className="text-sm text-gray-500 mt-1">Upload before/after images or service documentation</p>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setIsUpdateStatusOpen(false)}>Cancel</Button>
              <Button onClick={handleUpdateStatus}>Update Status</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Jobs List */}
      <div className="space-y-4">
        {filteredJobs.map((job) => (
          <Card key={job.id}>
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Job Header */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="font-semibold text-gray-900">{job.id}</h4>
                      <Badge className={getStatusColor(job.status)}>
                        {job.status}
                      </Badge>
                      <Badge className={getSLAColor(job.slaStatus)}>
                        SLA: {job.slaStatus}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-500" />
                        <span>{job.customerName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <span>{job.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Wrench className="h-4 w-4 text-gray-500" />
                        <span>{job.technician}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <Button size="sm" variant="outline">
                      <Edit3 className="h-4 w-4 mr-2" />
                      Update
                    </Button>
                    <Button size="sm" variant="outline">
                      <Camera className="h-4 w-4 mr-2" />
                      Images
                    </Button>
                  </div>
                </div>
                
                {/* Job Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm bg-gray-50 p-4 rounded-lg">
                  <div>
                    <span className="font-medium">Service:</span>
                    <p>{job.serviceType}</p>
                    <p className="text-gray-600">{job.product}</p>
                  </div>
                  <div>
                    <span className="font-medium">Schedule:</span>
                    <p>{job.scheduledDate}</p>
                    <p className="text-gray-600">{job.startTime}</p>
                  </div>
                  <div>
                    <span className="font-medium">Timeline:</span>
                    <p>Est: {job.estimatedCompletion}</p>
                    {job.actualCompletion && (
                      <p className="text-green-600">Act: {job.actualCompletion}</p>
                    )}
                  </div>
                  <div>
                    <span className="font-medium">Amount:</span>
                    <p className="text-lg font-semibold text-green-600">{job.amount}</p>
                  </div>
                </div>
                
                {/* Address and Notes */}
                <div className="space-y-2">
                  <div className="flex items-start gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
                    <span>{job.address}</span>
                  </div>
                  {job.notes && (
                    <div className="text-sm bg-blue-50 p-3 rounded-lg">
                      <span className="font-medium">Notes:</span> {job.notes}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
