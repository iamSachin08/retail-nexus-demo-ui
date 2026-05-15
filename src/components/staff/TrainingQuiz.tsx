import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { GraduationCap, BookOpen, Award, Plus, Play, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TrainingQuizProps {
  searchQuery: string;
  viewType: "my" | "subordinates";
}

export function TrainingQuiz({ searchQuery, viewType }: TrainingQuizProps) {
  const { toast } = useToast();
  const [isCreateTrainingOpen, setIsCreateTrainingOpen] = useState(false);
  const [isAssignTrainingOpen, setIsAssignTrainingOpen] = useState(false);

  const trainingModules = [
    {
      id: "TRN001",
      title: "Customer Service Excellence",
      type: "Course",
      duration: "2 hours",
      status: "Active",
      enrolled: 15,
      completed: 12,
      passing: 85
    },
    {
      id: "TRN002",
      title: "Product Knowledge - Electronics",
      type: "Quiz",
      duration: "30 mins",
      status: "Active",
      enrolled: 20,
      completed: 18,
      passing: 90
    },
    {
      id: "TRN003",
      title: "Safety Protocols",
      type: "Course",
      duration: "1 hour",
      status: "Draft",
      enrolled: 0,
      completed: 0,
      passing: 80
    }
  ];

  const staffProgress = [
    {
      staffId: "EMP001",
      name: "Ravi Kumar",
      completedCourses: 8,
      totalCourses: 10,
      avgScore: 92,
      certifications: ["Customer Service", "Sales Excellence"],
      status: "On Track"
    },
    {
      staffId: "EMP002",
      name: "Priya Sharma",
      completedCourses: 10,
      totalCourses: 10,
      avgScore: 96,
      certifications: ["Leadership", "Training", "Customer Service"],
      status: "Completed"
    },
    {
      staffId: "EMP003",
      name: "Amit Patel",
      completedCourses: 6,
      totalCourses: 10,
      avgScore: 78,
      certifications: ["Product Knowledge"],
      status: "Behind"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-800";
      case "On Track": return "bg-blue-100 text-blue-800";
      case "Behind": return "bg-red-100 text-red-800";
      case "Active": return "bg-green-100 text-green-800";
      case "Draft": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredStaff = staffProgress.filter(staff => 
    staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    staff.staffId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateTraining = () => {
    toast({
      title: "Training Created",
      description: "New training module has been created successfully",
    });
    setIsCreateTrainingOpen(false);
  };

  const handleAssignTraining = () => {
    toast({
      title: "Training Assigned",
      description: "Training has been assigned to selected staff members",
    });
    setIsAssignTrainingOpen(false);
  };

  const getCompletionPercentage = (completed: number, total: number) => {
    return Math.round((completed / total) * 100);
  };

  return (
    <div className="space-y-6">
      {/* Training Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-xl font-bold text-blue-600">12</p>
                <p className="text-sm text-blue-700">Training Modules</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <GraduationCap className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-xl font-bold text-green-600">156</p>
                <p className="text-sm text-green-700">Certifications</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Award className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-xl font-bold text-purple-600">87%</p>
                <p className="text-sm text-purple-700">Avg Score</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-xl font-bold text-orange-600">92%</p>
                <p className="text-sm text-orange-700">Completion Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Dialog open={isCreateTrainingOpen} onOpenChange={setIsCreateTrainingOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Training
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Training Module</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Training Title</Label>
                <Input placeholder="Enter training title" />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea placeholder="Enter training description" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="type">Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="course">Course</SelectItem>
                      <SelectItem value="quiz">Quiz</SelectItem>
                      <SelectItem value="video">Video</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="duration">Duration</Label>
                  <Input placeholder="e.g., 2 hours" />
                </div>
              </div>
              <div>
                <Label htmlFor="passing">Passing Score (%)</Label>
                <Input type="number" placeholder="85" />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setIsCreateTrainingOpen(false)}>Cancel</Button>
              <Button onClick={handleCreateTraining}>Create Training</Button>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={isAssignTrainingOpen} onOpenChange={setIsAssignTrainingOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Play className="h-4 w-4 mr-2" />
              Assign Training
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Assign Training to Staff</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="training">Training Module</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select training" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="trn001">Customer Service Excellence</SelectItem>
                    <SelectItem value="trn002">Product Knowledge - Electronics</SelectItem>
                    <SelectItem value="trn003">Safety Protocols</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="staff">Staff Members</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select staff" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Staff</SelectItem>
                    <SelectItem value="ravi">Ravi Kumar</SelectItem>
                    <SelectItem value="priya">Priya Sharma</SelectItem>
                    <SelectItem value="amit">Amit Patel</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="deadline">Completion Deadline</Label>
                <Input type="date" />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setIsAssignTrainingOpen(false)}>Cancel</Button>
              <Button onClick={handleAssignTraining}>Assign Training</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Training Modules */}
      <Card>
        <CardHeader>
          <CardTitle>Training Modules</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {trainingModules.map((module) => (
              <div key={module.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-medium">{module.title}</h4>
                    <Badge className={getStatusColor(module.status)}>
                      {module.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm text-gray-600">
                    <div>Type: {module.type}</div>
                    <div>Duration: {module.duration}</div>
                    <div>Enrolled: {module.enrolled}</div>
                    <div>Completed: {module.completed}</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">Edit</Button>
                  <Button size="sm" variant="outline">View</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Staff Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Staff Training Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {filteredStaff.map((staff) => (
              <div key={staff.staffId} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-medium">{staff.name}</h4>
                    <p className="text-sm text-gray-600">{staff.staffId}</p>
                  </div>
                  <Badge className={getStatusColor(staff.status)}>
                    {staff.status}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Course Progress</span>
                      <span>{getCompletionPercentage(staff.completedCourses, staff.totalCourses)}%</span>
                    </div>
                    <Progress value={getCompletionPercentage(staff.completedCourses, staff.totalCourses)} />
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">{staff.avgScore}%</p>
                    <p className="text-sm text-gray-600">Average Score</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">{staff.certifications.length}</p>
                    <p className="text-sm text-gray-600">Certifications</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {staff.certifications.map((cert, index) => (
                    <Badge key={index} className="bg-green-100 text-green-800">
                      <Award className="h-3 w-3 mr-1" />
                      {cert}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
