
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  User,
  Calendar
} from "lucide-react";

export function ApprovalQueue() {
  const pendingApprovals = [
    {
      id: "DR001",
      articleName: "Samsung AC 1.5 Ton",
      customerName: "Rajesh Kumar",
      discountPercent: 5,
      discountAmount: 2100,
      requestedBy: "John Smith",
      requestDate: "2024-01-24 10:30 AM",
      urgency: "high",
      awaitingApproval: "Store Manager",
      timeWaiting: "2 hours"
    },
    {
      id: "DR004",
      articleName: "iPhone 15 Pro Max",
      customerName: "Sarah Johnson",
      discountPercent: 3,
      discountAmount: 4500,
      requestedBy: "Mike Wilson",
      requestDate: "2024-01-24 9:15 AM",
      urgency: "high",
      awaitingApproval: "Regional Manager",
      timeWaiting: "3.5 hours"
    },
    {
      id: "DR005",
      articleName: "Sony 65 inch TV",
      customerName: "David Brown",
      discountPercent: 7,
      discountAmount: 8750,
      requestedBy: "Lisa Davis",
      requestDate: "2024-01-23 4:45 PM",
      urgency: "medium",
      awaitingApproval: "Store Manager",
      timeWaiting: "18 hours"
    }
  ];

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  const getTimeColor = (timeWaiting: string) => {
    if (timeWaiting.includes('hour') && parseInt(timeWaiting) > 4) return 'text-red-600';
    if (timeWaiting.includes('hour') && parseInt(timeWaiting) > 2) return 'text-yellow-600';
    return 'text-gray-600';
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-yellow-600" />
              <div>
                <p className="text-sm text-gray-600">Pending Approval</p>
                <p className="text-2xl font-bold">12</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-8 w-8 text-red-600" />
              <div>
                <p className="text-sm text-gray-600">Overdue (24h+)</p>
                <p className="text-2xl font-bold">3</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <User className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Requiring Manager</p>
                <p className="text-2xl font-bold">8</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Approval Queue List */}
      <div className="space-y-4">
        {pendingApprovals.map((approval) => (
          <Card key={approval.id} className="hover:shadow-md transition-shadow border-l-4 border-l-yellow-500">
            <CardContent className="p-4 md:p-6">
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
                    <h3 className="font-semibold text-lg">{approval.id}</h3>
                    <div className="flex gap-2">
                      <Badge variant={getUrgencyColor(approval.urgency)}>
                        {approval.urgency} priority
                      </Badge>
                      <Badge variant="outline" className={getTimeColor(approval.timeWaiting)}>
                        <Clock className="h-3 w-3 mr-1" />
                        {approval.timeWaiting}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <div>
                      <p className="text-sm text-gray-600">Product</p>
                      <p className="font-medium">{approval.articleName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Customer</p>
                      <p className="font-medium">{approval.customerName}</p>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-yellow-50 rounded-lg mb-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Requested Discount</p>
                        <p className="font-semibold text-lg">{approval.discountPercent}% (-₹{approval.discountAmount.toLocaleString()})</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Awaiting Approval From</p>
                        <p className="font-semibold text-blue-600">{approval.awaitingApproval}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      Requested by: {approval.requestedBy}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {approval.requestDate}
                    </span>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Approve
                  </Button>
                  <Button size="sm" variant="destructive">
                    <XCircle className="h-4 w-4 mr-2" />
                    Reject
                  </Button>
                  <Button size="sm" variant="outline">
                    Review Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
