import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MobileTabs } from "@/components/ui/mobile-tabs";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Tag, 
  Search, 
  Filter, 
  Download, 
  Plus,
  Printer,
  RefreshCw,
  Clock,
  CheckCircle
} from "lucide-react";
import { SELPrinting } from "./SELPrinting";
import { PriceChangeQueue } from "./PriceChangeQueue";
import { SELFormats } from "./SELFormats";
import { PrintLogs } from "./PrintLogs";

interface PricingContentProps {
  defaultTab?: string;
}

export function PricingContent({ defaultTab = "printing" }: PricingContentProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState(defaultTab);
  const isMobile = useIsMobile();
  
  const tabs = [
    { value: "printing", label: "SEL Printing", icon: <Printer className="h-4 w-4" /> },
    { value: "price-queue", label: "Price Changes", icon: <Clock className="h-4 w-4" /> },
    { value: "formats", label: "SEL Formats", icon: <Tag className="h-4 w-4" /> },
    { value: "logs", label: "Print Logs", icon: <CheckCircle className="h-4 w-4" /> },
  ];
  
  return (
    <div className="space-y-4 sm:space-y-6 p-4 sm:p-6">
      {/* Header Section */}
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Price & SEL</h1>
          <p className="text-sm sm:text-base text-gray-600">Manage shelf edge labels, price changes, and printing operations</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size={isMobile ? "sm" : "sm"}>
            <Download className="h-4 w-4 mr-1 sm:mr-2" />
            {isMobile ? "Export" : "Export Report"}
          </Button>
          <Button size={isMobile ? "sm" : "sm"}>
            <Plus className="h-4 w-4 mr-1 sm:mr-2" />
            {isMobile ? "Print" : "Bulk Print"}
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Tag className="h-5 w-5 text-blue-600" />
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
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Pending Price Changes</p>
                <p className="text-xl font-semibold">23</p>
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
                <p className="text-sm text-gray-600">Printed Today</p>
                <p className="text-xl font-semibold">156</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Printer className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Active Printers</p>
                <p className="text-xl font-semibold">3</p>
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
                placeholder="Search by SKU, product name, or barcode..."
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
                <RefreshCw className="h-4 w-4 mr-2" />
                Sync Prices
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
            {activeTab === "printing" && <SELPrinting searchQuery={searchQuery} />}
            {activeTab === "price-queue" && <PriceChangeQueue searchQuery={searchQuery} />}
            {activeTab === "formats" && <SELFormats searchQuery={searchQuery} />}
            {activeTab === "logs" && <PrintLogs searchQuery={searchQuery} />}
          </div>
        </>
      ) : (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
            <TabsTrigger value="printing">SEL Printing</TabsTrigger>
            <TabsTrigger value="price-queue">Price Change Queue</TabsTrigger>
            <TabsTrigger value="formats">SEL Formats</TabsTrigger>
            <TabsTrigger value="logs">Print Logs</TabsTrigger>
          </TabsList>
          
          <TabsContent value="printing" className="mt-6">
            <SELPrinting searchQuery={searchQuery} />
          </TabsContent>
          
          <TabsContent value="price-queue" className="mt-6">
            <PriceChangeQueue searchQuery={searchQuery} />
          </TabsContent>
          
          <TabsContent value="formats" className="mt-6">
            <SELFormats searchQuery={searchQuery} />
          </TabsContent>
          
          <TabsContent value="logs" className="mt-6">
            <PrintLogs searchQuery={searchQuery} />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
