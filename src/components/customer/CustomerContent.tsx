import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MobileTabs } from "@/components/ui/mobile-tabs";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Users, 
  Search, 
  Filter, 
  Download, 
  Plus,
  UserCheck,
  ShoppingBag,
  Gift,
  TrendingUp
} from "lucide-react";
import { CustomerLookup } from "./CustomerLookup";
import { OrderHistory } from "./OrderHistory";
import { LoyaltyOffers } from "./LoyaltyOffers";
import { AIRecommendations } from "./AIRecommendations";

interface CustomerContentProps {
  defaultTab?: string;
}

export function CustomerContent({ defaultTab = "lookup" }: CustomerContentProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState(defaultTab);
  const isMobile = useIsMobile();
  
  const tabs = [
    { value: "lookup", label: "Customer Lookup", icon: <Users className="h-4 w-4" /> },
    { value: "history", label: "Order History", icon: <ShoppingBag className="h-4 w-4" /> },
    { value: "loyalty", label: "Loyalty & Offers", icon: <Gift className="h-4 w-4" /> },
    { value: "recommendations", label: "AI Recommendations", icon: <TrendingUp className="h-4 w-4" /> },
  ];
  
  return (
    <div className="space-y-4 sm:space-y-6 p-4 sm:p-6">
      {/* Header Section */}
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Customer 360</h1>
          <p className="text-sm sm:text-base text-gray-600">Complete customer profile, order history and AI-based recommendations</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size={isMobile ? "sm" : "sm"}>
            <Download className="h-4 w-4 mr-1 sm:mr-2" />
            {isMobile ? "Export" : "Export Data"}
          </Button>
          <Button size={isMobile ? "sm" : "sm"}>
            <Plus className="h-4 w-4 mr-1 sm:mr-2" />
            {isMobile ? "Add" : "Add Customer"}
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Customers</p>
                <p className="text-xl font-semibold">2,847</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <UserCheck className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Active Customers</p>
                <p className="text-xl font-semibold">1,923</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <ShoppingBag className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Avg. Order Value</p>
                <p className="text-xl font-semibold">₹15,420</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Gift className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Loyalty Members</p>
                <p className="text-xl font-semibold">1,456</p>
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
                placeholder="Search by name, mobile, email, or customer ID..."
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
                <TrendingUp className="h-4 w-4 mr-2" />
                Insights
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
            {activeTab === "lookup" && <CustomerLookup searchQuery={searchQuery} />}
            {activeTab === "history" && <OrderHistory searchQuery={searchQuery} />}
            {activeTab === "loyalty" && <LoyaltyOffers searchQuery={searchQuery} />}
            {activeTab === "recommendations" && <AIRecommendations searchQuery={searchQuery} />}
          </div>
        </>
      ) : (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
            <TabsTrigger value="lookup">Customer Lookup</TabsTrigger>
            <TabsTrigger value="history">Order History</TabsTrigger>
            <TabsTrigger value="loyalty">Loyalty & Offers</TabsTrigger>
            <TabsTrigger value="recommendations">AI Recommendations</TabsTrigger>
          </TabsList>
          
          <TabsContent value="lookup" className="mt-6">
            <CustomerLookup searchQuery={searchQuery} />
          </TabsContent>
          
          <TabsContent value="history" className="mt-6">
            <OrderHistory searchQuery={searchQuery} />
          </TabsContent>
          
          <TabsContent value="loyalty" className="mt-6">
            <LoyaltyOffers searchQuery={searchQuery} />
          </TabsContent>
          
          <TabsContent value="recommendations" className="mt-6">
            <AIRecommendations searchQuery={searchQuery} />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
