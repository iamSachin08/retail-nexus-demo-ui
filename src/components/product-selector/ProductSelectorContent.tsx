import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QrCode, Search, Settings, ListChecks, UserCheck, FileText } from "lucide-react";
import { FindMyFit } from "./FindMyFit";
import { ScanQR } from "./ScanQR";
import { AdminPanel } from "./AdminPanel";

interface ProductSelectorContentProps {
  defaultTab?: string;
}

export function ProductSelectorContent({ defaultTab = "fit" }: ProductSelectorContentProps) {
  const [tab, setTab] = useState(defaultTab);
  const [search, setSearch] = useState("");

  // Mock stats data - would come from API in production
  const stats = {
    totalProducts: 1245,
    activeFlows: 6,
    scanToday: 87,
    recommendations: 156,
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Product Selector & KYP</h1>
          <p className="text-muted-foreground">
            Find the perfect product for customers through guided recommendations or QR scanning.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search products..."
              className="pl-8 w-[200px] md:w-[300px]"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button>Search</Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProducts}</div>
            <p className="text-xs text-muted-foreground">
              Products available in the catalog
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Flows</CardTitle>
            <ListChecks className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeFlows}</div>
            <p className="text-xs text-muted-foreground">
              Question flows across categories
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scans Today</CardTitle>
            <QrCode className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.scanToday}</div>
            <p className="text-xs text-muted-foreground">
              QR scans in the last 24 hours
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recommendations</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.recommendations}</div>
            <p className="text-xs text-muted-foreground">
              Products recommended today
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs */}
      <Card>
        <CardContent className="p-6">
          <Tabs value={tab} onValueChange={setTab} className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="fit" className="flex items-center">
                <ListChecks className="mr-2 h-4 w-4" /> Find My Fit
              </TabsTrigger>
              <TabsTrigger value="scan" className="flex items-center">
                <QrCode className="mr-2 h-4 w-4" /> Scan QR / Article
              </TabsTrigger>
              <TabsTrigger value="admin" className="flex items-center">
                <Settings className="mr-2 h-4 w-4" /> Admin
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="fit">
              <FindMyFit />
            </TabsContent>
            
            <TabsContent value="scan">
              <ScanQR />
            </TabsContent>
            
            <TabsContent value="admin">
              <AdminPanel />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
} 