import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MobileTabs } from "@/components/ui/mobile-tabs";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Package, 
  Search, 
  Filter, 
  Download, 
  Upload,
  ArrowUpDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  Scan,
  ArrowRightLeft,
  Wrench,
  Package2,
  Plus,
  TrendingUp
} from "lucide-react";
import { StockOverview } from "./StockOverview";
import { StockMovements } from "./StockMovements";
import { StockAudit } from "./StockAudit";
import { LowStockAlerts } from "./LowStockAlerts";
import { SLOCTransfer } from "../inventory-movements/SLOCTransfer";
import { ServiceCenterIssue } from "../inventory-movements/ServiceCenterIssue";
import { ConsumablesPosting } from "../inventory-movements/ConsumablesPosting";

export function InventoryContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const isMobile = useIsMobile();

  const tabs = [
    { value: "overview", label: "Overview", icon: <Package className="h-4 w-4" /> },
    { value: "movements", label: "Movements", icon: <ArrowRightLeft className="h-4 w-4" /> },
    { value: "sloc-transfer", label: "SLOC Transfer", icon: <ArrowRightLeft className="h-4 w-4" /> },
    { value: "service-issue", label: "Service Center", icon: <Wrench className="h-4 w-4" /> },
    { value: "consumables", label: "Consumables", icon: <Package2 className="h-4 w-4" /> },
    { value: "audit", label: "Audit", icon: <CheckCircle className="h-4 w-4" /> },
    { value: "alerts", label: "Alerts", icon: <AlertTriangle className="h-4 w-4" /> },
  ];
  
  return (
    <div className="space-y-4 sm:space-y-6 p-4 sm:p-6">
      {/* Header Section */}
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Inventory Management</h1>
          <p className="text-sm sm:text-base text-gray-600">Track and manage your store inventory, movements, and transfers</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size={isMobile ? "sm" : "sm"}>
            <Scan className="h-4 w-4 mr-1 sm:mr-2" />
            {isMobile ? "Scan" : "Scan Item"}
          </Button>
          <Button variant="outline" size={isMobile ? "sm" : "sm"}>
            <Plus className="h-4 w-4 mr-1 sm:mr-2" />
            {isMobile ? "Transfer" : "Quick Transfer"}
          </Button>
          <Button variant="outline" size={isMobile ? "sm" : "sm"}>
            <Upload className="h-4 w-4 mr-1 sm:mr-2" />
            {isMobile ? "Import" : "Import Stock"}
          </Button>
          <Button size={isMobile ? "sm" : "sm"}>
            <Download className="h-4 w-4 mr-1 sm:mr-2" />
            {isMobile ? "Export" : "Export Report"}
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Package className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total SKUs</p>
                <p className="text-xl font-semibold">2,847</p>
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
                <p className="text-sm text-gray-600">In Stock</p>
                <p className="text-xl font-semibold">2,234</p>
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
                <p className="text-sm text-gray-600">Low Stock</p>
                <p className="text-xl font-semibold">89</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Clock className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Aging Stock</p>
                <p className="text-xl font-semibold">156</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Movement Stats */}
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

      {/* Search and Filter Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search by SKU, brand, or category..."
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
                <ArrowUpDown className="h-4 w-4 mr-2" />
                Sort
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      {isMobile ? (
        <>
          <MobileTabs 
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            className="mb-4"
          />
          
          <div className="mt-4">
            {activeTab === "overview" && <StockOverview searchQuery={searchQuery} />}
            {activeTab === "movements" && <StockMovements />}
            {activeTab === "sloc-transfer" && <SLOCTransfer />}
            {activeTab === "service-issue" && <ServiceCenterIssue />}
            {activeTab === "consumables" && <ConsumablesPosting />}
            {activeTab === "audit" && <StockAudit />}
            {activeTab === "alerts" && <LowStockAlerts />}
          </div>
        </>
      ) : (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-7 h-auto">
            <TabsTrigger value="overview" className="text-xs md:text-sm">Stock Overview</TabsTrigger>
            <TabsTrigger value="movements" className="text-xs md:text-sm">Movements</TabsTrigger>
            <TabsTrigger value="sloc-transfer" className="text-xs md:text-sm">SLOC Transfer</TabsTrigger>
            <TabsTrigger value="service-issue" className="text-xs md:text-sm">Service Center</TabsTrigger>
            <TabsTrigger value="consumables" className="text-xs md:text-sm">Consumables</TabsTrigger>
            <TabsTrigger value="audit" className="text-xs md:text-sm">Audit</TabsTrigger>
            <TabsTrigger value="alerts" className="text-xs md:text-sm">Alerts</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-6">
            <StockOverview searchQuery={searchQuery} />
          </TabsContent>
          
          <TabsContent value="movements" className="mt-6">
            <StockMovements />
          </TabsContent>
          
          <TabsContent value="sloc-transfer" className="mt-6">
            <SLOCTransfer />
          </TabsContent>
          
          <TabsContent value="service-issue" className="mt-6">
            <ServiceCenterIssue />
          </TabsContent>
          
          <TabsContent value="consumables" className="mt-6">
            <ConsumablesPosting />
          </TabsContent>
          
          <TabsContent value="audit" className="mt-6">
            <StockAudit />
          </TabsContent>
          
          <TabsContent value="alerts" className="mt-6">
            <LowStockAlerts />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
