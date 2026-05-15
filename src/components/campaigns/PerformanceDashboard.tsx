
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart3, 
  TrendingUp, 
  Eye, 
  MousePointer,
  ShoppingCart,
  DollarSign,
  Users,
  Send
} from "lucide-react";

interface PerformanceDashboardProps {
  searchQuery: string;
}

export function PerformanceDashboard({ searchQuery }: PerformanceDashboardProps) {
  const campaignPerformance = [
    {
      id: "P001",
      name: "iPhone 15 Launch Campaign",
      status: "Active",
      sent: 28470,
      delivered: 27123,
      opened: 6892,
      clicked: 1547,
      converted: 234,
      revenue: "₹18,67,890",
      roi: 245,
      ctr: 22.4,
      conversionRate: 15.1
    },
    {
      id: "P002",
      name: "Festival Sale - Smartphones",
      status: "Completed",
      sent: 52340,
      delivered: 49876,
      opened: 12456,
      clicked: 2789,
      converted: 456,
      revenue: "₹34,56,780",
      roi: 312,
      ctr: 25.1,
      conversionRate: 16.4
    },
    {
      id: "P003",
      name: "Customer Retention - Premium",
      status: "Active",
      sent: 14560,
      delivered: 13894,
      opened: 4167,
      clicked: 891,
      converted: 156,
      revenue: "₹9,87,650",
      roi: 198,
      ctr: 21.4,
      conversionRate: 17.5
    }
  ];

  const channelPerformance = [
    { channel: "SMS", sent: 45000, delivered: 41850, opened: 12555, ctr: 28.2, cost: "₹45,000" },
    { channel: "WhatsApp", sent: 32000, delivered: 28800, opened: 8640, ctr: 31.5, cost: "₹16,000" },
    { channel: "Push", sent: 18000, delivered: 13680, opened: 4104, ctr: 24.8, cost: "₹9,000" },
    { channel: "Email", sent: 25000, delivered: 21250, opened: 5312, ctr: 18.7, cost: "₹12,500" }
  ];

  const filteredCampaigns = campaignPerformance.filter(campaign => 
    campaign.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    return status === "Active" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800";
  };

  return (
    <div className="space-y-6">
      {/* Overall Performance Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Send className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Sent</p>
                <p className="text-xl font-semibold">95,370</p>
                <p className="text-xs text-green-600">+12% vs last month</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Eye className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Opens</p>
                <p className="text-xl font-semibold">23,515</p>
                <p className="text-xs text-green-600">24.7% open rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <MousePointer className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Clicks</p>
                <p className="text-xl font-semibold">5,227</p>
                <p className="text-xs text-green-600">22.2% CTR</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <DollarSign className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-xl font-semibold">₹63,12,320</p>
                <p className="text-xs text-green-600">251% ROI</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Campaign Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Campaign Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredCampaigns.map((campaign) => (
              <div key={campaign.id} className="p-4 border rounded-lg">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold">{campaign.name}</h3>
                      <Badge className={getStatusColor(campaign.status)}>
                        {campaign.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600">
                      Revenue: <span className="font-semibold text-green-600">{campaign.revenue}</span>
                      <span className="mx-2">•</span>
                      ROI: <span className="font-semibold">{campaign.roi}%</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <p className="text-xs text-gray-500">Sent</p>
                      <p className="font-semibold">{campaign.sent.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Opened</p>
                      <p className="font-semibold">{campaign.opened.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">{((campaign.opened/campaign.delivered) * 100).toFixed(1)}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Clicked</p>
                      <p className="font-semibold">{campaign.clicked.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">{campaign.ctr}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Converted</p>
                      <p className="font-semibold">{campaign.converted}</p>
                      <p className="text-xs text-gray-500">{campaign.conversionRate}%</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Delivery Rate</span>
                    <span>{((campaign.delivered/campaign.sent) * 100).toFixed(1)}%</span>
                  </div>
                  <Progress value={(campaign.delivered/campaign.sent) * 100} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Channel Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Channel Performance Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {channelPerformance.map((channel) => (
              <div key={channel.channel} className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-3">{channel.channel}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sent:</span>
                    <span className="font-medium">{channel.sent.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivered:</span>
                    <span className="font-medium">{channel.delivered.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Opened:</span>
                    <span className="font-medium">{channel.opened.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">CTR:</span>
                    <span className="font-semibold text-green-600">{channel.ctr}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cost:</span>
                    <span className="font-medium">{channel.cost}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
