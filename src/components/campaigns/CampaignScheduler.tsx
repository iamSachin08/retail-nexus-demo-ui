
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Clock, 
  Play, 
  Pause,
  Edit,
  Trash2,
  Send
} from "lucide-react";

interface CampaignSchedulerProps {
  searchQuery: string;
}

export function CampaignScheduler({ searchQuery }: CampaignSchedulerProps) {
  const campaigns = [
    {
      id: "C001",
      name: "iPhone 15 Launch Campaign",
      status: "Scheduled",
      startDate: "2024-01-15",
      endDate: "2024-01-30",
      channels: ["SMS", "WhatsApp", "Push"],
      audience: 2847,
      budget: "₹50,000"
    },
    {
      id: "C002",
      name: "Festival Sale - Smartphones",
      status: "Active",
      startDate: "2024-01-10",
      endDate: "2024-01-20",
      channels: ["SMS", "Email"],
      audience: 5234,
      budget: "₹75,000"
    },
    {
      id: "C003",
      name: "Customer Retention - Premium",
      status: "Draft",
      startDate: "2024-01-25",
      endDate: "2024-02-05",
      channels: ["WhatsApp", "Push"],
      audience: 1456,
      budget: "₹30,000"
    },
    {
      id: "C004",
      name: "Laptop Back-to-School",
      status: "Completed",
      startDate: "2024-01-01",
      endDate: "2024-01-10",
      channels: ["SMS", "WhatsApp", "Email"],
      audience: 3892,
      budget: "₹85,000"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800";
      case "Scheduled": return "bg-blue-100 text-blue-800";
      case "Draft": return "bg-yellow-100 text-yellow-800";
      case "Completed": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredCampaigns = campaigns.filter(campaign => 
    campaign.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Campaign Calendar View */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Campaign Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredCampaigns.map((campaign) => (
              <div key={campaign.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold">{campaign.name}</h3>
                      <Badge className={getStatusColor(campaign.status)}>
                        {campaign.status}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{campaign.startDate} to {campaign.endDate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Send className="h-4 w-4" />
                        <span>{campaign.channels.join(", ")}</span>
                      </div>
                      <div>
                        <span>Audience: {campaign.audience.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {campaign.status === "Active" && (
                      <Button size="sm" variant="outline">
                        <Pause className="h-4 w-4 mr-1" />
                        Pause
                      </Button>
                    )}
                    {campaign.status === "Scheduled" && (
                      <Button size="sm">
                        <Play className="h-4 w-4 mr-1" />
                        Start Now
                      </Button>
                    )}
                    {campaign.status === "Draft" && (
                      <Button size="sm">
                        <Send className="h-4 w-4 mr-1" />
                        Schedule
                      </Button>
                    )}
                    
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4" />
                    </Button>
                    
                    <Button size="sm" variant="outline">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="mt-3 pt-3 border-t">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Budget: {campaign.budget}</span>
                    <div className="flex gap-4">
                      <span>Sent: {Math.floor(campaign.audience * 0.85).toLocaleString()}</span>
                      <span>Delivered: {Math.floor(campaign.audience * 0.82).toLocaleString()}</span>
                      <span>Opened: {Math.floor(campaign.audience * 0.23).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Schedule Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start">
              <Play className="h-4 w-4 mr-2" />
              Start Campaign Now
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule for Later
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Clock className="h-4 w-4 mr-2" />
              Set Recurring
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Channel Performance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm">SMS</span>
              <span className="text-sm font-semibold">92% Delivery</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">WhatsApp</span>
              <span className="text-sm font-semibold">88% Delivery</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Push Notifications</span>
              <span className="text-sm font-semibold">76% Delivery</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Email</span>
              <span className="text-sm font-semibold">85% Delivery</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Best Times to Send</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-sm">
              <p className="font-medium">Weekdays</p>
              <p className="text-gray-600">10:00 AM - 11:00 AM</p>
              <p className="text-gray-600">2:00 PM - 4:00 PM</p>
            </div>
            <div className="text-sm">
              <p className="font-medium">Weekends</p>
              <p className="text-gray-600">11:00 AM - 1:00 PM</p>
              <p className="text-gray-600">6:00 PM - 8:00 PM</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
