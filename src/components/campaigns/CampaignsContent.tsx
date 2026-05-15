import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Megaphone, 
  Search, 
  Filter, 
  Download, 
  Plus,
  Target,
  Calendar,
  TrendingUp,
  Users,
  Brain,
  Sparkles
} from "lucide-react";
import { CampaignCreator } from "./CampaignCreator";
import { CampaignScheduler } from "./CampaignScheduler";
import { CreativeUpload } from "./CreativeUpload";
import { PerformanceDashboard } from "./PerformanceDashboard";
import { AISegments } from "./AISegments";
import { AICreative } from "./AICreative";

export function CampaignsContent() {
  const [searchQuery, setSearchQuery] = useState("");
  
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Hyperlocal Campaign Manager</h1>
          <p className="text-gray-600">Create, manage and track location-based marketing campaigns with AI-powered insights</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Analytics
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New Campaign
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Megaphone className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Active Campaigns</p>
                <p className="text-xl font-semibold">12</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Target className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Reach</p>
                <p className="text-xl font-semibold">45,892</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <TrendingUp className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Conversion Rate</p>
                <p className="text-xl font-semibold">8.7%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Users className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Customer Segments</p>
                <p className="text-xl font-semibold">8</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <Brain className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">AI Segments</p>
                <p className="text-xl font-semibold">5</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-pink-100 rounded-lg">
                <Sparkles className="h-5 w-5 text-pink-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">AI Creatives</p>
                <p className="text-xl font-semibold">15</p>
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
                placeholder="Search campaigns, segments, or performance metrics..."
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
                <Calendar className="h-4 w-4 mr-2" />
                Schedule
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="creator" className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6">
          <TabsTrigger value="creator">Campaign Creator</TabsTrigger>
          <TabsTrigger value="scheduler">Schedule & Publish</TabsTrigger>
          <TabsTrigger value="creative">Creative Upload</TabsTrigger>
          <TabsTrigger value="ai-segments">AI Segments</TabsTrigger>
          <TabsTrigger value="ai-creative">AI Creative</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="creator" className="mt-6">
          <CampaignCreator searchQuery={searchQuery} />
        </TabsContent>
        
        <TabsContent value="scheduler" className="mt-6">
          <CampaignScheduler searchQuery={searchQuery} />
        </TabsContent>
        
        <TabsContent value="creative" className="mt-6">
          <CreativeUpload searchQuery={searchQuery} />
        </TabsContent>
        
        <TabsContent value="ai-segments" className="mt-6">
          <AISegments searchQuery={searchQuery} />
        </TabsContent>
        
        <TabsContent value="ai-creative" className="mt-6">
          <AICreative searchQuery={searchQuery} />
        </TabsContent>
        
        <TabsContent value="performance" className="mt-6">
          <PerformanceDashboard searchQuery={searchQuery} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
