import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  CheckCircle, 
  XCircle, 
  RotateCcw, 
  Clock,
  AlertTriangle,
  MessageSquare,
  User,
  Calendar
} from "lucide-react";

export function BOCReview() {
  const pendingTickets = [
    {
      id: "TKT2024005",
      title: "Barcode Scanner Not Working",
      description: "Handheld barcode scanner is not scanning properly. Tried restarting but issue persists.",
      store: "Store Alpha",
      submittedBy: "John Smith",
      submittedAt: "2024-01-24 2:30 PM",
      priority: "high",
      category: "technical",
      attachments: ["scanner_error.jpg"],
      estimatedResolution: "2 hours"
    },
    {
      id: "TKT2024006",
      title: "Customer Complaint - Warranty Issue",
      description: "Customer purchased laptop 3 months ago, now facing heating issues. Requesting exchange or refund.",
      store: "Store Beta", 
      submittedBy: "Sarah Johnson",
      submittedAt: "2024-01-24 1:15 PM",
      priority: "medium",
      category: "customer-complaint",
      attachments: [],
      estimatedResolution: "4 hours"
    },
    {
      id: "TKT2024007",
      title: "Billing System Slow Response",
      description: "Billing system is responding very slowly during peak hours, causing customer wait times.",
      store: "Store Gamma",
      submittedBy: "Mike Davis",
      submittedAt: "2024-01-24 11:45 AM",
      priority: "medium",
      category: "pos-issues",
      attachments: ["system_performance.png"],
      estimatedResolution: "6 hours"
    }
  ];

  const assignmentQueues = [
    { department: "IT Department", count: 8, avgResolution: "3.2 hours" },
    { department: "Customer Service", count: 5, avgResolution: "2.1 hours" },
    { department: "Paper Finance", count: 3, avgResolution: "4.5 hours" },
    { department: "Operations", count: 6, avgResolution: "2.8 hours" }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      {/* Review Queue Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">16</div>
            <div className="text-sm text-gray-600">Pending Review</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">8</div>
            <div className="text-sm text-gray-600">Assigned Today</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">24</div>
            <div className="text-sm text-gray-600">Resolved Today</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">3</div>
            <div className="text-sm text-gray-600">Escalated</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pending Tickets for Review */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Tickets Pending Review
              </CardTitle>
            </CardHeader>
          </Card>

          {pendingTickets.map((ticket) => (
            <Card key={ticket.id} className="border-l-4 border-l-blue-500">
              <CardContent className="p-4 md:p-6">
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <h3 className="font-semibold text-lg">{ticket.title}</h3>
                    <div className="flex gap-2">
                      <Badge variant={getPriorityColor(ticket.priority)}>
                        {ticket.priority}
                      </Badge>
                      <Badge variant="outline">{ticket.category}</Badge>
                    </div>
                  </div>

                  <p className="text-gray-600">{ticket.description}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <span className="font-medium">Ticket ID:</span>
                      <span>{ticket.id}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>{ticket.store}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>By: {ticket.submittedBy}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{ticket.submittedAt}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>Est. Resolution: {ticket.estimatedResolution}</span>
                    </div>
                  </div>

                  {ticket.attachments.length > 0 && (
                    <div>
                      <p className="text-sm font-medium mb-2">Attachments:</p>
                      <div className="flex flex-wrap gap-2">
                        {ticket.attachments.map((file, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {file}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium mb-2 block">BOC Review Comments:</label>
                      <Textarea placeholder="Add review comments, assignment notes, or escalation reasons..." rows={3} />
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button className="flex-1">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Approve & Assign
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Send Back
                      </Button>
                      <Button variant="destructive" className="flex-1">
                        <AlertTriangle className="h-4 w-4 mr-2" />
                        Escalate
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Assignment Queues & Department Stats */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Department Queues</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {assignmentQueues.map((dept, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium text-sm">{dept.department}</h4>
                      <Badge variant="outline">{dept.count} pending</Badge>
                    </div>
                    <p className="text-xs text-gray-600">Avg Resolution: {dept.avgResolution}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <MessageSquare className="h-4 w-4 mr-2" />
                Bulk Assignment
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <AlertTriangle className="h-4 w-4 mr-2" />
                View Escalated
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Clock className="h-4 w-4 mr-2" />
                SLA Monitoring
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Today's Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Tickets Reviewed:</span>
                  <span className="font-medium">32</span>
                </div>
                <div className="flex justify-between">
                  <span>Average Review Time:</span>
                  <span className="font-medium">12 min</span>
                </div>
                <div className="flex justify-between">
                  <span>Escalation Rate:</span>
                  <span className="font-medium">8.2%</span>
                </div>
                <div className="flex justify-between">
                  <span>Customer Satisfaction:</span>
                  <span className="font-medium">94%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
