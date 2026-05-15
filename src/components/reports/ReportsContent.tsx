import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, 
  Search, 
  Filter, 
  Download, 
  Plus,
  BarChart3,
  TrendingUp,
  AlertTriangle,
  Target,
  Eye,
  Users,
  RefreshCw,
  MessageSquare,
  Bell
} from "lucide-react";
import { SalesReports } from "./SalesReports";
import { StockHealthReports } from "./StockHealthReports";
import { AIInsights } from "./AIInsights";
import { CustomReportBuilder } from "./CustomReportBuilder";
import { RoleBasedDashboard } from "../analytics/RoleBasedDashboard";
import { TeamPerformanceView } from "../analytics/TeamPerformanceView";
import { AnalyticsReportBuilder } from "../analytics/AnalyticsReportBuilder";
import { AnalyticsAlerts } from "../analytics/AnalyticsAlerts";
import { AnalyticsChatbot } from "../analytics/AnalyticsChatbot";

export function ReportsContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentRole, setCurrentRole] = useState("store_manager");
  
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Eye className="h-6 w-6 text-blue-600" />
            Analytics & Reports
          </h1>
          <p className="text-gray-600">Comprehensive analytics, role-based insights, reports and AI-powered business intelligence</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
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
            Export All
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Custom Report
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Sales vs Target</p>
                <p className="text-xl font-semibold">102%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Reports Generated</p>
                <p className="text-xl font-semibold">847</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Critical Alerts</p>
                <p className="text-xl font-semibold">7</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Target className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Target Achievement</p>
                <p className="text-xl font-semibold">89%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search reports, insights, or metrics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <BarChart3 className="h-4 w-4 mr-2" />
                Analytics
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6 h-auto">
          <TabsTrigger value="dashboard" className="text-xs md:text-sm">My Dashboard</TabsTrigger>
          <TabsTrigger value="team" className="text-xs md:text-sm">Team Performance</TabsTrigger>
          <TabsTrigger value="sales" className="text-xs md:text-sm">Sales Reports</TabsTrigger>
          <TabsTrigger value="stock" className="text-xs md:text-sm">Stock Health</TabsTrigger>
          <TabsTrigger value="insights" className="text-xs md:text-sm">AI Insights</TabsTrigger>
          <TabsTrigger value="builder" className="text-xs md:text-sm">Report Builder</TabsTrigger>
          <TabsTrigger value="alerts" className="text-xs md:text-sm">
            <Bell className="h-4 w-4 mr-1" />
            Alerts
          </TabsTrigger>
          <TabsTrigger value="chatbot" className="text-xs md:text-sm">
            <MessageSquare className="h-4 w-4 mr-1" />
            AI Copilot
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard" className="mt-6">
          <RoleBasedDashboard currentRole={currentRole} />
        </TabsContent>
        
        <TabsContent value="team" className="mt-6">
          <TeamPerformanceView />
        </TabsContent>
        
        <TabsContent value="sales" className="mt-6">
          <SalesReports searchQuery={searchQuery} />
        </TabsContent>
        
        <TabsContent value="stock" className="mt-6">
          <StockHealthReports searchQuery={searchQuery} />
        </TabsContent>
        
        <TabsContent value="insights" className="mt-6">
          <AIInsights searchQuery={searchQuery} />
        </TabsContent>
        
        <TabsContent value="builder" className="mt-6">
          <CustomReportBuilder searchQuery={searchQuery} />
        </TabsContent>
        
        <TabsContent value="alerts" className="mt-6">
          <AnalyticsAlerts />
        </TabsContent>
        
        <TabsContent value="chatbot" className="mt-6">
          <AnalyticsChatbot />
        </TabsContent>
      </Tabs>
    </div>
  );
}
