
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { 
  Wrench, 
  Plus, 
  Search,
  Eye,
  Truck,
  Clock,
  CheckCircle
} from "lucide-react";

export function ServiceCenterIssue() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const serviceIssues = [
    {
      id: "SRV001",
      articleId: "AC001",
      articleName: "Samsung AC 1.5 Ton",
      quantity: 1,
      serviceCenter: "Samsung Service Center - Bangalore",
      serviceTicketId: "ST-2024-001",
      status: "in-transit",
      issuedBy: "Service Manager",
      issueDate: "2024-01-24",
      reason: "Defective unit - customer complaint"
    },
    {
      id: "SRV002",
      articleId: "WM003", 
      articleName: "LG Front Load Washing Machine",
      quantity: 1,
      serviceCenter: "LG Service Center - HSR Layout",
      serviceTicketId: "ST-2024-002",
      status: "delivered",
      issuedBy: "Store Manager",
      issueDate: "2024-01-22",
      reason: "Warranty repair required"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'default';
      case 'in-transit': return 'secondary';
      case 'pending': return 'outline';
      default: return 'outline';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered': return CheckCircle;
      case 'in-transit': return Truck;
      case 'pending': return Clock;
      default: return Clock;
    }
  };

  return (
    <div className="space-y-6">
      {/* Actions Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search by service ticket or article..."
            className="pl-10"
          />
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Issue to Service Center
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Issue to Service Center</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="articleId">Article ID</Label>
                  <Input id="articleId" placeholder="Enter article ID" />
                </div>
                <div>
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input id="quantity" type="number" placeholder="1" />
                </div>
              </div>
              
              <div>
                <Label htmlFor="serviceCenter">Service Center</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select service center" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="samsung-blr">Samsung Service Center - Bangalore</SelectItem>
                    <SelectItem value="lg-hsr">LG Service Center - HSR Layout</SelectItem>
                    <SelectItem value="sony-mg">Sony Service Center - MG Road</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="serviceTicket">Service Ticket ID</Label>
                <Input id="serviceTicket" placeholder="Enter service ticket ID" />
              </div>
              
              <div>
                <Label htmlFor="reason">Issue Reason</Label>
                <Textarea id="reason" placeholder="Enter reason for service center issue..." />
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button onClick={() => setIsCreateDialogOpen(false)} className="flex-1">
                  Issue Item
                </Button>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Service Issues List */}
      <div className="space-y-4">
        {serviceIssues.map((issue) => {
          const StatusIcon = getStatusIcon(issue.status);
          return (
            <Card key={issue.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4 md:p-6">
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                      <h3 className="font-semibold text-lg">{issue.id}</h3>
                      <Badge variant={getStatusColor(issue.status)}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {issue.status}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                      <div>
                        <p className="text-sm text-gray-600">Article: {issue.articleId}</p>
                        <p className="font-medium">{issue.articleName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Service Ticket: {issue.serviceTicketId}</p>
                        <p className="font-medium">Qty: {issue.quantity}</p>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <p className="text-sm text-gray-600">Service Center:</p>
                      <p className="font-medium">{issue.serviceCenter}</p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4 text-sm text-gray-500">
                      <span>Issued by: {issue.issuedBy}</span>
                      <span>Date: {issue.issueDate}</span>
                    </div>
                    
                    <div className="mt-2">
                      <p className="text-sm text-gray-600">Reason: {issue.reason}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4 mr-2" />
                      Track Status
                    </Button>
                    <Button size="sm" variant="outline">
                      <Wrench className="h-4 w-4 mr-2" />
                      Service Details
                    </Button>
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
