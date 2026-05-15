import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, CheckCircle, Clock, AlertTriangle, Plus, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TaskAssignmentProps {
  searchQuery: string;
  viewType: "my" | "subordinates";
}

export function TaskAssignment({ searchQuery, viewType }: TaskAssignmentProps) {
  const { toast } = useToast();
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);

  const tasks = [
    {
      id: "TASK001",
      title: "Stock Audit - Electronics Section",
      assignedTo: "Ravi Kumar",
      priority: "High",
      status: "In Progress",
      dueDate: "2024-01-22",
      description: "Complete stock audit for all electronics items",
      completionRate: 60
    },
    {
      id: "TASK002",
      title: "Customer Service Training",
      assignedTo: "Priya Sharma",
      priority: "Medium",
      status: "Completed",
      dueDate: "2024-01-20",
      description: "Complete online customer service module",
      completionRate: 100
    },
    {
      id: "TASK003",
      title: "Floor Display Setup",
      assignedTo: "Amit Patel",
      priority: "Low",
      status: "Pending",
      dueDate: "2024-01-25",
      description: "Setup new mobile display for Samsung promotion",
      completionRate: 0
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-800";
      case "In Progress": return "bg-blue-100 text-blue-800";
      case "Pending": return "bg-yellow-100 text-yellow-800";
      case "Overdue": return "bg-red-100 text-red-800";
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

  const filteredTasks = tasks.filter(task => 
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.assignedTo.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateTask = (formData: any) => {
    toast({
      title: "Task Created",
      description: "New task has been assigned successfully",
    });
    setIsAddTaskOpen(false);
  };

  const handleUpdateTaskStatus = (taskId: string, newStatus: string) => {
    toast({
      title: "Task Updated",
      description: `Task ${taskId} status changed to ${newStatus}`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Task Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-xl font-bold text-green-600">15</p>
                <p className="text-sm text-green-700">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-xl font-bold text-blue-600">8</p>
                <p className="text-sm text-blue-700">In Progress</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-8 w-8 text-yellow-600" />
              <div>
                <p className="text-xl font-bold text-yellow-600">5</p>
                <p className="text-sm text-yellow-700">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-8 w-8 text-red-600" />
              <div>
                <p className="text-xl font-bold text-red-600">2</p>
                <p className="text-sm text-red-700">Overdue</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Create Task Button */}
      <div className="flex justify-start">
        <Dialog open={isAddTaskOpen} onOpenChange={setIsAddTaskOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Assign New Task
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Task</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Task Title</Label>
                <Input placeholder="Enter task title" />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea placeholder="Enter task description" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="assignedTo">Assign To</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select staff member" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ravi">Ravi Kumar</SelectItem>
                      <SelectItem value="priya">Priya Sharma</SelectItem>
                      <SelectItem value="amit">Amit Patel</SelectItem>
                    </SelectContent>
                  </Select>
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
              <div>
                <Label htmlFor="dueDate">Due Date</Label>
                <Input type="date" />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setIsAddTaskOpen(false)}>Cancel</Button>
              <Button onClick={() => handleCreateTask({})}>Create Task</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Tasks List */}
      <div className="space-y-4">
        {filteredTasks.map((task) => (
          <Card key={task.id}>
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <h4 className="font-semibold text-gray-900">{task.title}</h4>
                    <div className="flex gap-2">
                      <Badge className={getStatusColor(task.status)}>
                        {task.status}
                      </Badge>
                      <Badge className={getPriorityColor(task.priority)}>
                        {task.priority}
                      </Badge>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600">{task.description}</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-500" />
                      <span>Assigned to: {task.assignedTo}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span>Due: {task.dueDate}</span>
                    </div>
                    <div>
                      <span>Progress: {task.completionRate}%</span>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${task.completionRate}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleUpdateTaskStatus(task.id, "In Progress")}
                  >
                    Start Task
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleUpdateTaskStatus(task.id, "Completed")}
                  >
                    Mark Complete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
