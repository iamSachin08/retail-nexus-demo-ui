
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { 
  Plus, 
  Eye,
  CheckCircle,
  Clock,
  XCircle,
  Percent
} from "lucide-react";

interface DiscountRequestsProps {
  searchQuery: string;
}

export function DiscountRequests({ searchQuery }: DiscountRequestsProps) {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const discountRequests = [
    {
      id: "DR001",
      articleId: "AC001",
      articleName: "Samsung AC 1.5 Ton",
      mrp: 42000,
      requestedDiscount: 5,
      discountAmount: 2100,
      finalPrice: 39900,
      customerName: "Rajesh Kumar",
      customerPhone: "+91 98765 43210",
      requestedBy: "Sales Associate",
      requestDate: "2024-01-24",
      reason: "Customer price negotiation",
      status: "pending",
      urgency: "high"
    },
    {
      id: "DR002",
      articleId: "TV003",
      articleName: "LG OLED 55 inch",
      mrp: 135000,
      requestedDiscount: 8,
      discountAmount: 10800,
      finalPrice: 124200,
      customerName: "Priya Sharma",
      customerPhone: "+91 87654 32109",
      requestedBy: "Store Manager",
      requestDate: "2024-01-23",
      reason: "Competitor price matching",
      status: "approved",
      urgency: "medium"
    },
    {
      id: "DR003",
      articleId: "WM002",
      articleName: "Whirlpool Front Load",
      mrp: 28000,
      requestedDiscount: 12,
      discountAmount: 3360,
      finalPrice: 24640,
      customerName: "Amit Patel",
      customerPhone: "+91 76543 21098",
      requestedBy: "Sales Associate",
      requestDate: "2024-01-22",
      reason: "EOL clearance",
      status: "rejected",
      urgency: "low"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'default';
      case 'pending': return 'secondary';
      case 'rejected': return 'destructive';
      default: return 'outline';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return CheckCircle;
      case 'pending': return Clock;
      case 'rejected': return XCircle;
      default: return Clock;
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  const filteredRequests = discountRequests.filter(request =>
    request.articleId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    request.articleName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    request.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    request.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Create New Request */}
      <div className="flex justify-end">
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Discount Request
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create Discount Request</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="articleId">Article ID</Label>
                <Input id="articleId" placeholder="Enter article ID" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="mrp">MRP (₹)</Label>
                  <Input id="mrp" type="number" placeholder="0" />
                </div>
                <div>
                  <Label htmlFor="discountPercent">Discount %</Label>
                  <Input id="discountPercent" type="number" placeholder="0" />
                </div>
              </div>
              
              <div>
                <Label htmlFor="customerName">Customer Name</Label>
                <Input id="customerName" placeholder="Enter customer name" />
              </div>
              
              <div>
                <Label htmlFor="customerPhone">Customer Phone</Label>
                <Input id="customerPhone" placeholder="Enter phone number" />
              </div>
              
              <div>
                <Label htmlFor="discountReason">Discount Reason</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select reason" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="price-negotiation">Customer price negotiation</SelectItem>
                    <SelectItem value="competitor-matching">Competitor price matching</SelectItem>
                    <SelectItem value="eol-clearance">EOL clearance</SelectItem>
                    <SelectItem value="bulk-purchase">Bulk purchase discount</SelectItem>
                    <SelectItem value="loyalty-customer">Loyalty customer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="urgency">Urgency</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select urgency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High - Customer waiting</SelectItem>
                    <SelectItem value="medium">Medium - Within 24 hours</SelectItem>
                    <SelectItem value="low">Low - No rush</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea id="notes" placeholder="Any additional information..." />
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button onClick={() => setIsCreateDialogOpen(false)} className="flex-1">
                  Submit Request
                </Button>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Discount Requests List */}
      <div className="space-y-4">
        {filteredRequests.map((request) => {
          const StatusIcon = getStatusIcon(request.status);
          return (
            <Card key={request.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4 md:p-6">
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                      <h3 className="font-semibold text-lg">{request.id}</h3>
                      <div className="flex gap-2">
                        <Badge variant={getStatusColor(request.status)}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {request.status}
                        </Badge>
                        <Badge variant={getUrgencyColor(request.urgency)}>
                          {request.urgency}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                      <div>
                        <p className="text-sm text-gray-600">Article: {request.articleId}</p>
                        <p className="font-medium">{request.articleName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Customer: {request.customerName}</p>
                        <p className="font-medium">{request.customerPhone}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3 p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="text-sm text-gray-600">MRP</p>
                        <p className="font-semibold">₹{request.mrp.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Discount</p>
                        <p className="font-semibold text-red-600">{request.requestedDiscount}% (-₹{request.discountAmount.toLocaleString()})</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Final Price</p>
                        <p className="font-semibold text-green-600">₹{request.finalPrice.toLocaleString()}</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4 text-sm text-gray-500">
                      <span>Requested by: {request.requestedBy}</span>
                      <span>Date: {request.requestDate}</span>
                      <span>Reason: {request.reason}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                    {request.status === 'pending' && (
                      <>
                        <Button size="sm">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Approve
                        </Button>
                        <Button size="sm" variant="destructive">
                          <XCircle className="h-4 w-4 mr-2" />
                          Reject
                        </Button>
                      </>
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
