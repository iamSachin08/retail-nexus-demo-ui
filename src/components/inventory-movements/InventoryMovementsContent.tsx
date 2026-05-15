
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRightLeft, 
  Wrench, 
  Package2, 
  Plus,
  TrendingUp,
  AlertTriangle,
  CheckCircle
} from "lucide-react";
import { SLOCTransfer } from "./SLOCTransfer";
import { ServiceCenterIssue } from "./ServiceCenterIssue";
import { ConsumablesPosting } from "./ConsumablesPosting";

export function InventoryMovementsContent() {
  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inventory Movements</h1>
          <p className="text-gray-600">Manage internal transfers, service issues, and consumables</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Quick Transfer
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <ArrowRightLeft className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">SLOC Transfers</p>
                <p className="text-xl font-semibold">24</p>
                <Badge variant="secondary" className="text-xs">This Month</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Wrench className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Service Issues</p>
                <p className="text-xl font-semibold">8</p>
                <Badge variant="outline" className="text-xs">Pending</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Package2 className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Consumables</p>
                <p className="text-xl font-semibold">156</p>
                <Badge variant="default" className="text-xs">Items Used</Badge>
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
                <p className="text-sm text-gray-600">Movement Value</p>
                <p className="text-xl font-semibold">₹2.4L</p>
                <Badge variant="secondary" className="text-xs">Today</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="sloc-transfer" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="sloc-transfer">SLOC Transfer</TabsTrigger>
          <TabsTrigger value="service-issue">Service Center</TabsTrigger>
          <TabsTrigger value="consumables">Consumables</TabsTrigger>
        </TabsList>
        
        <TabsContent value="sloc-transfer" className="mt-6">
          <SLOCTransfer />
        </TabsContent>
        
        <TabsContent value="service-issue" className="mt-6">
          <ServiceCenterIssue />
        </TabsContent>
        
        <TabsContent value="consumables" className="mt-6">
          <ConsumablesPosting />
        </TabsContent>
      </Tabs>
    </div>
  );
}
