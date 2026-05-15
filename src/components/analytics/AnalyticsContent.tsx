
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Eye, 
  TrendingUp, 
  Users, 
  BarChart3,
  RefreshCw,
  Download,
  MessageSquare,
  Bell
} from "lucide-react";
import { RoleBasedDashboard } from "./RoleBasedDashboard";
import { TeamPerformanceView } from "./TeamPerformanceView";
import { AnalyticsReportBuilder } from "./AnalyticsReportBuilder";
import { AnalyticsAlerts } from "./AnalyticsAlerts";
import { AnalyticsChatbot } from "./AnalyticsChatbot";

export function AnalyticsContent() {
  const [currentRole, setCurrentRole] = useState("store_manager");
  
  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Eye className="h-6 w-6 text-blue-600" />
            EYE: Performance & Sales Intelligence
          </h1>
          <p className="text-sm md:text-base text-gray-600">Real-time, role-based insights for data-driven decisions</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setCurrentRole(currentRole === "store_manager" ? "cluster_head" : "store_manager")}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Switch Role View
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Role Indicator */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Current View</p>
                <p className="font-semibold capitalize">
                  {currentRole.replace('_', ' ')}
                </p>
              </div>
            </div>
            <Badge variant="outline" className="text-green-700 border-green-200 bg-green-50">
              Real-time Data
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-xs md:text-sm text-gray-600">Sales vs Target</p>
                <p className="text-lg md:text-xl font-semibold">102%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <BarChart3 className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs md:text-sm text-gray-600">Conversion %</p>
                <p className="text-lg md:text-xl font-semibold">68%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Users className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-xs md:text-sm text-gray-600">Footfall</p>
                <p className="text-lg md:text-xl font-semibold">1,234</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <RefreshCw className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-xs md:text-sm text-gray-600">UPT</p>
                <p className="text-lg md:text-xl font-semibold">2.4</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 h-auto">
          <TabsTrigger value="dashboard" className="text-xs md:text-sm">My Dashboard</TabsTrigger>
          <TabsTrigger value="team" className="text-xs md:text-sm">Team Performance</TabsTrigger>
          <TabsTrigger value="reports" className="text-xs md:text-sm">Custom Reports</TabsTrigger>
          <TabsTrigger value="alerts" className="text-xs md:text-sm">
            <Bell className="h-4 w-4 mr-1" />
            Alerts
          </TabsTrigger>
          <TabsTrigger value="chatbot" className="text-xs md:text-sm">
            <MessageSquare className="h-4 w-4 mr-1" />
            AI Copilot
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard" className="mt-4 md:mt-6">
          <RoleBasedDashboard currentRole={currentRole} />
        </TabsContent>
        
        <TabsContent value="team" className="mt-4 md:mt-6">
          <TeamPerformanceView />
        </TabsContent>
        
        <TabsContent value="reports" className="mt-4 md:mt-6">
          <AnalyticsReportBuilder />
        </TabsContent>
        
        <TabsContent value="alerts" className="mt-4 md:mt-6">
          <AnalyticsAlerts />
        </TabsContent>
        
        <TabsContent value="chatbot" className="mt-4 md:mt-6">
          <AnalyticsChatbot />
        </TabsContent>
      </Tabs>
    </div>
  );
}
