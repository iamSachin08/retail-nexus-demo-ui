import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CheckSquare, 
  Clock, 
  AlertTriangle, 
  Plus,
  Upload,
  RotateCcw,
  Bell,
  CheckCircle,
  Filter,
  Download
} from "lucide-react";
import { TaskInbox } from "./TaskInbox";
import { TaskAssignment } from "../staff/TaskAssignment";
import { TaskProgress } from "./TaskProgress";
import { TaskDetails } from "./TaskDetails";
import { AttendanceRosters } from "../staff/AttendanceRosters";
import { StaffPerformance } from "../staff/StaffPerformance";
import { TrainingQuiz } from "../staff/TrainingQuiz";

export function DailyTrackerContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  
  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Daily Tracker</h1>
          <p className="text-gray-600">Centralized task assignment and progress monitoring</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Create Task
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <CheckSquare className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Tasks</p>
                <p className="text-xl font-semibold">156</p>
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
                <p className="text-xl font-semibold">28</p>
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
                <p className="text-xl font-semibold">121</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Overdue</p>
                <p className="text-xl font-semibold">7</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Input
                placeholder="Search tasks by ID, title, or assignee..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-4"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Alerts
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="inbox" className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-8">
          <TabsTrigger value="inbox">Task Inbox</TabsTrigger>
          <TabsTrigger value="assignment">Assignment</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
          <TabsTrigger value="details">Task Details</TabsTrigger>
          <TabsTrigger value="my-attendance">My Attendance</TabsTrigger>
          <TabsTrigger value="my-tasks">My Tasks</TabsTrigger>
          <TabsTrigger value="my-performance">My Performance</TabsTrigger>
          <TabsTrigger value="my-training">My Training</TabsTrigger>
        </TabsList>
        
        <TabsContent value="inbox" className="mt-6">
          <TaskInbox searchQuery={searchQuery} onTaskSelect={setSelectedTask} />
        </TabsContent>
        
        <TabsContent value="assignment" className="mt-6">
          <TaskAssignment searchQuery={searchQuery} viewType="subordinates" />
        </TabsContent>
        
        <TabsContent value="progress" className="mt-6">
          <TaskProgress />
        </TabsContent>
        
        <TabsContent value="details" className="mt-6">
          <TaskDetails taskId={selectedTask} />
        </TabsContent>
        
        <TabsContent value="my-attendance" className="mt-6">
          <AttendanceRosters searchQuery={searchQuery} viewType="my" />
        </TabsContent>
        
        <TabsContent value="my-tasks" className="mt-6">
          <TaskAssignment searchQuery={searchQuery} viewType="my" />
        </TabsContent>
        
        <TabsContent value="my-performance" className="mt-6">
          <StaffPerformance searchQuery={searchQuery} viewType="my" />
        </TabsContent>
        
        <TabsContent value="my-training" className="mt-6">
          <TrainingQuiz searchQuery={searchQuery} viewType="my" />
        </TabsContent>
      </Tabs>
    </div>
  );
}
