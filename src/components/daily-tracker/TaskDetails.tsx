
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  FileText, 
  Calendar, 
  User, 
  Clock,
  Upload,
  MessageSquare,
  AlertTriangle,
  CheckCircle
} from "lucide-react";

interface TaskDetailsProps {
  taskId: string | null;
}

export function TaskDetails({ taskId }: TaskDetailsProps) {
  if (!taskId) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Task Selected</h3>
          <p className="text-gray-600">Select a task from the inbox to view details</p>
        </CardContent>
      </Card>
    );
  }

  const taskDetails = {
    id: "TSK001",
    title: "SEL Printing - AC Category",
    description: "Print and update shelf edge labels for all AC products in the store. Ensure all prices are current and comply with brand guidelines.",
    assignedBy: "NHQ Team",
    assignedTo: "Store Team Alpha",
    assignedDate: "2024-01-23",
    dueDate: "2024-01-25",
    status: "pending",
    priority: "high",
    category: "pricing",
    attachments: [
      { name: "AC_Price_List.pdf", size: "2.4 MB" },
      { name: "SEL_Guidelines.pdf", size: "1.8 MB" }
    ],
    comments: [
      {
        author: "NHQ Team",
        timestamp: "2024-01-23 10:30 AM",
        message: "Please ensure all AC products have updated SEL tags by end of day tomorrow."
      },
      {
        author: "Store Manager",
        timestamp: "2024-01-23 2:15 PM", 
        message: "Received the task. Will start printing after current customer rush."
      }
    ]
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Task Details */}
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
              <div>
                <CardTitle className="text-xl">{taskDetails.title}</CardTitle>
                <p className="text-gray-600 mt-1">Task ID: {taskDetails.id}</p>
              </div>
              <div className="flex gap-2">
                <Badge variant="outline">{taskDetails.priority}</Badge>
                <Badge variant="secondary">{taskDetails.status}</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Description</h4>
              <p className="text-gray-700">{taskDetails.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-gray-500" />
                <span className="text-sm">Assigned by: {taskDetails.assignedBy}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-gray-500" />
                <span className="text-sm">Assigned to: {taskDetails.assignedTo}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-sm">Assigned: {taskDetails.assignedDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className="text-sm">Due: {taskDetails.dueDate}</span>
              </div>
            </div>

            {/* Attachments */}
            <div>
              <h4 className="font-medium mb-2">Attachments</h4>
              <div className="space-y-2">
                {taskDetails.attachments.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{file.name}</span>
                      <span className="text-xs text-gray-500">({file.size})</span>
                    </div>
                    <Button size="sm" variant="outline">Download</Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Proof Upload */}
            <div>
              <h4 className="font-medium mb-2">Upload Completion Proof</h4>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-2">Drag and drop files or click to browse</p>
                <Button variant="outline" size="sm">
                  Choose Files
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Comments Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Comments & Updates
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {taskDetails.comments.map((comment, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-medium text-sm">{comment.author}</span>
                  <span className="text-xs text-gray-500">{comment.timestamp}</span>
                </div>
                <p className="text-sm text-gray-700">{comment.message}</p>
              </div>
            ))}
            
            <div className="mt-4">
              <Textarea placeholder="Add a comment..." rows={3} />
              <Button className="mt-2" size="sm">Post Comment</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions Sidebar */}
      <div>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full">
              <CheckCircle className="h-4 w-4 mr-2" />
              Mark Complete
            </Button>
            <Button variant="outline" className="w-full">
              <Upload className="h-4 w-4 mr-2" />
              Upload Proof
            </Button>
            <Button variant="outline" className="w-full">
              <User className="h-4 w-4 mr-2" />
              Reassign Task
            </Button>
            <Button variant="outline" className="w-full">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Report Issue
            </Button>
            <Button variant="outline" className="w-full">
              <Clock className="h-4 w-4 mr-2" />
              Request Extension
            </Button>
          </CardContent>
        </Card>

        {/* Task Timeline */}
        <Card className="mt-4">
          <CardHeader>
            <CardTitle className="text-base">Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium">Task Assigned</p>
                  <p className="text-xs text-gray-500">Jan 23, 10:30 AM</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-2 h-2 bg-gray-300 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium">Acknowledged</p>
                  <p className="text-xs text-gray-500">Jan 23, 2:15 PM</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-2 h-2 bg-gray-300 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium text-gray-400">In Progress</p>
                  <p className="text-xs text-gray-400">Pending</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
