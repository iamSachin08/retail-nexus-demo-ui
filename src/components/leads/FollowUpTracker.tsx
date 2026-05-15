
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar,
  Clock,
  Phone,
  MessageCircle,
  AlertTriangle,
  CheckCircle
} from "lucide-react";

export function FollowUpTracker() {
  const followUps = [
    {
      id: "LD001",
      customerName: "Rajesh Kumar",
      phone: "+91 98765 43210",
      category: "Television",
      lastContact: "2024-01-22",
      nextFollowUp: "2024-01-25",
      priority: "high",
      status: "due",
      notes: "Interested in Samsung 55 inch, waiting for festival offer"
    },
    {
      id: "LD004",
      customerName: "Sneha Reddy",
      phone: "+91 98123 45678",
      category: "Refrigerator",
      lastContact: "2024-01-20",
      nextFollowUp: "2024-01-24",
      priority: "medium",
      status: "overdue",
      notes: "Comparing prices with other stores"
    },
    {
      id: "LD007",
      customerName: "Vikram Singh",
      phone: "+91 87654 32109",
      category: "Air Conditioner",
      lastContact: "2024-01-23",
      nextFollowUp: "2024-01-26",
      priority: "low",
      status: "upcoming",
      notes: "Will decide after checking room measurements"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'overdue': return 'destructive';
      case 'due': return 'secondary';
      case 'upcoming': return 'outline';
      default: return 'outline';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'overdue': return AlertTriangle;
      case 'due': return Clock;
      case 'upcoming': return Calendar;
      default: return Clock;
    }
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-8 w-8 text-red-600" />
              <div>
                <p className="text-sm text-gray-600">Overdue</p>
                <p className="text-2xl font-bold">3</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-yellow-600" />
              <div>
                <p className="text-sm text-gray-600">Due Today</p>
                <p className="text-2xl font-bold">8</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Calendar className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">This Week</p>
                <p className="text-2xl font-bold">15</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold">12</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Follow-up List */}
      <Card>
        <CardHeader>
          <CardTitle>Follow-up Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {followUps.map((followUp) => {
              const StatusIcon = getStatusIcon(followUp.status);
              return (
                <div key={followUp.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                        <h3 className="font-semibold">{followUp.id} - {followUp.customerName}</h3>
                        <div className="flex gap-2">
                          <Badge variant={getStatusColor(followUp.status)}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {followUp.status}
                          </Badge>
                          <Badge variant={getPriorityColor(followUp.priority)}>
                            {followUp.priority} priority
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                        <div>
                          <p className="text-sm text-gray-600">Contact</p>
                          <p className="font-medium">{followUp.phone}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Product Interest</p>
                          <p className="font-medium">{followUp.category}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Next Follow-up</p>
                          <p className="font-medium">{followUp.nextFollowUp}</p>
                        </div>
                      </div>
                      
                      <div className="text-sm text-gray-600 mb-2">
                        <strong>Notes:</strong> {followUp.notes}
                      </div>
                      
                      <div className="text-xs text-gray-500">
                        Last contacted: {followUp.lastContact}
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button size="sm">
                        <Phone className="h-4 w-4 mr-2" />
                        Call Now
                      </Button>
                      <Button size="sm" variant="outline">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Send SMS
                      </Button>
                      <Button size="sm" variant="outline">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Complete
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
