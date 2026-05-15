import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare, 
  Clock, 
  CheckCircle,
  AlertTriangle,
  Calendar,
  User,
  Eye
} from "lucide-react";

interface MyTicketsProps {
  searchQuery: string;
}

export function MyTickets({ searchQuery }: MyTicketsProps) {
  const tickets = [
    {
      id: "TKT2024001",
      title: "POS System Freezing During Peak Hours",
      description: "The POS system freezes intermittently during busy periods, affecting customer service.",
      status: "resolved",
      priority: "high",
      department: "IT Department",
      createdAt: "2024-01-20",
      updatedAt: "2024-01-23",
      assignedTo: "John Doe",
      resolutionTime: "2 hours",
      comments: 8
    },
    {
      id: "TKT2024002",
      title: "Billing Discrepancy in Daily Report",
      description: "Daily sales report showing incorrect totals compared to POS transactions.",
      status: "in-progress",
      priority: "medium",
      department: "Paper Finance",
      createdAt: "2024-01-22",
      updatedAt: "2024-01-24",
      assignedTo: "Jane Smith",
      resolutionTime: null,
      comments: 5
    },
    {
      id: "TKT2024003",
      title: "Air Conditioning Not Working",
      description: "Store AC unit in main sales area is not cooling properly.",
      status: "new",
      priority: "medium",
      department: "Maintenance",
      createdAt: "2024-01-24",
      updatedAt: "2024-01-24",
      assignedTo: null,
      resolutionTime: null,
      comments: 1
    },
    {
      id: "TKT2024004",
      title: "Inventory Count Mismatch",
      description: "Physical stock count does not match system records for electronics section.",
      status: "escalated",
      priority: "high",
      department: "Operations",
      createdAt: "2024-01-23",
      updatedAt: "2024-01-24",
      assignedTo: "Mike Johnson",
      resolutionTime: null,
      comments: 12
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved': return 'default';
      case 'in-progress': return 'secondary';
      case 'escalated': return 'destructive';
      case 'new': return 'outline';
      default: return 'outline';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-green-600 bg-green-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'resolved': return CheckCircle;
      case 'in-progress': return Clock;
      case 'escalated': return AlertTriangle;
      default: return Clock;
    }
  };

  const filteredTickets = tickets.filter(ticket =>
    ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ticket.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ticket.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">4</div>
            <div className="text-sm text-gray-600">Total Tickets</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">2</div>
            <div className="text-sm text-gray-600">In Progress</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">1</div>
            <div className="text-sm text-gray-600">Resolved</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">1</div>
            <div className="text-sm text-gray-600">Escalated</div>
          </CardContent>
        </Card>
      </div>

      {/* Tickets List */}
      <div className="space-y-4">
        {filteredTickets.map((ticket) => {
          const StatusIcon = getStatusIcon(ticket.status);
          return (
            <Card key={ticket.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4 md:p-6">
                <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
                      <h3 className="font-semibold text-lg">{ticket.title}</h3>
                      <div className="flex gap-2">
                        <Badge variant={getStatusColor(ticket.status)}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {ticket.status}
                        </Badge>
                        <Badge className={getPriorityColor(ticket.priority)}>
                          {ticket.priority}
                        </Badge>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-3">{ticket.description}</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <span className="font-medium">ID:</span>
                        <span>{ticket.id}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        <span>{ticket.department}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>Created: {ticket.createdAt}</span>
                      </div>
                      {ticket.assignedTo && (
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          <span>Assigned to: {ticket.assignedTo}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4" />
                        <span>{ticket.comments} comments</span>
                      </div>
                      {ticket.resolutionTime && (
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>Resolved in: {ticket.resolutionTime}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row lg:flex-col gap-2">
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                    <Button size="sm" variant="outline">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Chat
                    </Button>
                    {ticket.status !== 'resolved' && (
                      <Button size="sm">
                        Update
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
