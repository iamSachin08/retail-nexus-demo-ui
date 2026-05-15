
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Upload, 
  RotateCcw, 
  Bell, 
  CheckCircle,
  Clock,
  AlertTriangle,
  Calendar,
  User
} from "lucide-react";

interface TaskInboxProps {
  searchQuery: string;
  onTaskSelect: (taskId: string) => void;
}

export function TaskInbox({ searchQuery, onTaskSelect }: TaskInboxProps) {
  const tasks = [
    {
      id: "TSK001",
      title: "SEL Printing - AC Category",
      assignedBy: "NHQ Team",
      dueDate: "2024-01-25",
      status: "pending",
      priority: "high",
      description: "Print and update shelf edge labels for all AC products",
      assignedDate: "2024-01-23"
    },
    {
      id: "TSK002", 
      title: "GRN Processing - Samsung Order",
      assignedBy: "Cluster Manager",
      dueDate: "2024-01-24",
      status: "in-progress",
      priority: "medium",
      description: "Process goods receipt note for Samsung delivery",
      assignedDate: "2024-01-22"
    },
    {
      id: "TSK003",
      title: "Planogram Audit - Mobile Section",
      assignedBy: "NHQ Team",
      dueDate: "2024-01-22",
      status: "overdue",
      priority: "high",
      description: "Conduct planogram compliance audit for mobile section",
      assignedDate: "2024-01-20"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'default';
      case 'in-progress': return 'secondary';
      case 'overdue': return 'destructive';
      default: return 'outline';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-green-600 bg-green-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'in-progress': return Clock;
      case 'overdue': return AlertTriangle;
      default: return Clock;
    }
  };

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.assignedBy.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {filteredTasks.map((task) => {
        const StatusIcon = getStatusIcon(task.status);
        return (
          <Card key={task.id} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-4 md:p-6">
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                    <h3 className="font-semibold text-lg">{task.title}</h3>
                    <div className="flex gap-2">
                      <Badge variant={getStatusColor(task.status)}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {task.status}
                      </Badge>
                      <Badge className={getPriorityColor(task.priority)}>
                        {task.priority}
                      </Badge>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-3">{task.description}</p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>Assigned by: {task.assignedBy}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>Due: {task.dueDate}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => onTaskSelect(task.id)}
                  >
                    View Details
                  </Button>
                  <Button size="sm" variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Proof
                  </Button>
                  <Button size="sm" variant="outline">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reassign
                  </Button>
                  <Button size="sm">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Complete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
