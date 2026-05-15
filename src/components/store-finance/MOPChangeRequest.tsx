
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  CreditCard, 
  Edit, 
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Calendar,
  User,
  FileText
} from "lucide-react";

export function MOPChangeRequest() {
  const [formData, setFormData] = useState({
    invoiceNo: "",
    originalMOP: "",
    newMOP: "",
    amount: "",
    reason: "",
    description: ""
  });

  const mopChangeRequests = [
    {
      id: "MOP001",
      invoiceNo: "INV240124001",
      originalMOP: "Cash",
      newMOP: "Card",
      amount: 15680,
      reason: "Customer Error",
      requestedBy: "John Smith",
      requestDate: "2024-01-24",
      status: "pending",
      approver: "Store Manager",
      description: "Customer paid cash but wanted to pay by card for reward points"
    },
    {
      id: "MOP002",
      invoiceNo: "INV240123005",
      originalMOP: "Card",
      newMOP: "UPI",
      amount: 8950,
      reason: "Technical Issue",
      requestedBy: "Sarah Johnson",
      requestDate: "2024-01-23",
      status: "approved",
      approver: "Store Manager",
      description: "Card machine was down, customer paid via UPI"
    },
    {
      id: "MOP003",
      invoiceNo: "INV240123003",
      originalMOP: "UPI",
      newMOP: "Cash",
      amount: 3450,
      reason: "Customer Request",
      requestedBy: "Mike Davis",
      requestDate: "2024-01-23",
      status: "rejected",
      approver: "Store Manager",
      description: "UPI transaction failed, customer paid cash"
    }
  ];

  const reasons = [
    "Customer Error",
    "Technical Issue",
    "System Malfunction", 
    "Customer Request",
    "Payment Gateway Issue",
    "Training Error",
    "Other"
  ];

  const paymentMethods = [
    "Cash",
    "Card",
    "UPI",
    "Net Banking",
    "Wallet",
    "Credit Note"
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
      default: return AlertTriangle;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* New Request Form */}
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Edit className="h-5 w-5" />
              Request MOP Change
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="invoiceNo">Invoice Number</Label>
                <Input
                  id="invoiceNo"
                  placeholder="Enter invoice number"
                  value={formData.invoiceNo}
                  onChange={(e) => setFormData({...formData, invoiceNo: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="amount">Transaction Amount (₹)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount"
                  value={formData.amount}
                  onChange={(e) => setFormData({...formData, amount: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="originalMOP">Original Payment Method</Label>
                <Select value={formData.originalMOP} onValueChange={(value) => setFormData({...formData, originalMOP: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select original MOP" />
                  </SelectTrigger>
                  <SelectContent>
                    {paymentMethods.map((method) => (
                      <SelectItem key={method} value={method}>{method}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="newMOP">New Payment Method</Label>
                <Select value={formData.newMOP} onValueChange={(value) => setFormData({...formData, newMOP: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select new MOP" />
                  </SelectTrigger>
                  <SelectContent>
                    {paymentMethods.map((method) => (
                      <SelectItem key={method} value={method}>{method}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="reason">Reason for Change</Label>
              <Select value={formData.reason} onValueChange={(value) => setFormData({...formData, reason: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select reason" />
                </SelectTrigger>
                <SelectContent>
                  {reasons.map((reason) => (
                    <SelectItem key={reason} value={reason}>{reason}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="description">Detailed Description</Label>
              <Textarea
                id="description"
                placeholder="Provide detailed explanation for the MOP change request..."
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows={3}
              />
            </div>

            <div className="flex gap-3">
              <Button>
                <Edit className="h-4 w-4 mr-2" />
                Submit Request
              </Button>
              <Button variant="outline">Clear Form</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Request Guidelines */}
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Request Guidelines</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 bg-blue-50 rounded-lg">
              <h4 className="text-sm font-medium text-blue-900 mb-1">Same Day Requests</h4>
              <p className="text-xs text-blue-700">MOP changes can be requested within 24 hours of transaction.</p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <h4 className="text-sm font-medium text-yellow-900 mb-1">Approval Required</h4>
              <p className="text-xs text-yellow-700">All MOP changes require manager approval before processing.</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <h4 className="text-sm font-medium text-green-900 mb-1">Documentation</h4>
              <p className="text-xs text-green-700">Provide detailed reason and any supporting evidence.</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Today's Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Total Requests:</span>
                <span className="font-medium">8</span>
              </div>
              <div className="flex justify-between">
                <span>Approved:</span>
                <span className="font-medium text-green-600">5</span>
              </div>
              <div className="flex justify-between">
                <span>Pending:</span>
                <span className="font-medium text-yellow-600">2</span>
              </div>
              <div className="flex justify-between">
                <span>Rejected:</span>
                <span className="font-medium text-red-600">1</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Requests */}
      <div className="lg:col-span-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Recent MOP Change Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mopChangeRequests.map((request) => {
                const StatusIcon = getStatusIcon(request.status);
                return (
                  <div key={request.id} className="p-4 border rounded-lg hover:shadow-sm transition-shadow">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                          <h3 className="font-semibold">Invoice: {request.invoiceNo}</h3>
                          <Badge variant={getStatusColor(request.status)}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {request.status}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600 mb-2">
                          <div>
                            <span className="font-medium">From:</span> {request.originalMOP}
                          </div>
                          <div>
                            <span className="font-medium">To:</span> {request.newMOP}
                          </div>
                          <div>
                            <span className="font-medium">Amount:</span> ₹{request.amount.toLocaleString()}
                          </div>
                          <div>
                            <span className="font-medium">Reason:</span> {request.reason}
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-700 mb-2">{request.description}</p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            <span>Requested by: {request.requestedBy}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>Date: {request.requestDate}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            <span>Approver: {request.approver}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Button size="sm" variant="outline">
                          <FileText className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                        {request.status === 'pending' && (
                          <>
                            <Button size="sm" variant="outline">
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
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
