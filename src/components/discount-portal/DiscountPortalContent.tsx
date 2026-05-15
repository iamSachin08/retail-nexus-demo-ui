import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  DollarSign,
  Gift, 
  Search, 
  Filter, 
  Download, 
  Plus,
  Percent,
  Calendar,
  Target,
  Users,
  TrendingUp
} from "lucide-react";
import { DiscountRequests } from "./DiscountRequests";
import { ApprovalQueue } from "./ApprovalQueue";
import { EOLTagging } from "./EOLTagging";
import { DiscountAnalytics } from "./DiscountAnalytics";
import { PromotionsOffers } from "./PromotionsOffers";

interface DiscountPortalContentProps {
  defaultTab?: string;
}

export function DiscountPortalContent({ defaultTab = "promotions" }: DiscountPortalContentProps) {
  const [searchQuery, setSearchQuery] = useState("");
  
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Discount Portal</h1>
          <p className="text-gray-600">Manage promotions, offers, and discount requests, approvals, and EOL tagging</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Request Discount
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Gift className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Active Promotions</p>
                <p className="text-xl font-semibold">8</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Percent className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Avg. Discount</p>
                <p className="text-xl font-semibold">18.5%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="h-5 w-5 text-purple-600" />
              </div>
              <div>
              <p className="text-sm text-gray-600">Approved Discounts</p>
              <p className="text-xl font-semibold">58</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <TrendingUp className="h-5 w-5 text-orange-600" />
              </div>
              <div>
              <p className="text-sm text-gray-600">Total Discount Value</p>
              <p className="text-xl font-semibold">₹45,680</p>
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
                placeholder="Search promotions, article ID, customer, or request ID..."
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
                Date Range
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue={defaultTab} className="w-full">
        <TabsList className="grid w-full grid-cols-1 lg:grid-cols-5">
          <TabsTrigger value="promotions">Promotions & Offers</TabsTrigger>
          <TabsTrigger value="requests">Discount Requests</TabsTrigger>
          <TabsTrigger value="approval">Approval Queue</TabsTrigger>
          <TabsTrigger value="eol">EOL Tagging</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="promotions" className="mt-6">
          <PromotionsOffers searchQuery={searchQuery} />
        </TabsContent>

        <TabsContent value="requests" className="mt-6">
          <DiscountRequests searchQuery={searchQuery} />
        </TabsContent>
        
        <TabsContent value="approval" className="mt-6">
          <ApprovalQueue />
        </TabsContent>
        
        <TabsContent value="eol" className="mt-6">
          <EOLTagging />
        </TabsContent>
        
        <TabsContent value="analytics" className="mt-6">
          <DiscountAnalytics />
        </TabsContent>
      </Tabs>
    </div>
  );
}
