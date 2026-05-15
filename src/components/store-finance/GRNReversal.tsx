
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  XCircle, 
  Search, 
  Package,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
  Calendar,
  User
} from "lucide-react";

export function GRNReversal() {
  const [searchGRN, setSearchGRN] = useState("");
  const [formData, setFormData] = useState({
    grnNumber: "",
    reason: "",
    description: ""
  });

  const grnReversals = [
    {
      id: "REV001",
      grnNumber: "GRN240124001",
      vendor: "Samsung Electronics",
      amount: 156800,
      items: 12,
      originalDate: "2024-01-24",
      reason: "Wrong Items Received",
      requestedBy: "Store Manager",
      requestDate: "2024-01-24",
      status: "pending",
      approver: "Area Manager",
      description: "Received mobile accessories instead of laptops"
    },
    {
      id: "REV002",
      grnNumber: "GRN240123003",
      vendor: "LG Electronics",
      amount: 89450,
      items: 8,
      originalDate: "2024-01-23",
      reason: "Quality Issues",
      requestedBy: "Store Manager",
      requestDate: "2024-01-23",
      status: "approved",
      approver: "Area Manager",
      description: "Multiple units found to be defective during inspection"
    },
    {
      id: "REV003",
      grnNumber: "GRN240122005",
      vendor: "Sony India",
      amount: 245600,
      items: 15,
      originalDate: "2024-01-22",
      reason: "Duplicate Entry",
      requestedBy: "Store Manager",
      requestDate: "2024-01-22",
      status: "rejected",
      approver: "Area Manager",
      description: "GRN was entered twice by mistake"
    }
  ];

  const recentGRNs = [
    {
      grnNumber: "GRN240124005",
      vendor: "HP India",
      amount: 125600,
      items: 6,
      date: "2024-01-24",
      status: "active"
    },
    {
      grnNumber: "GRN240124004",
      vendor: "Dell Technologies",
      amount: 198750,
      items: 10,
      date: "2024-01-24",
      status: "active"
    },
    {
      grnNumber: "GRN240124003",
      vendor: "Apple India",
      amount: 356800,
      items: 8,
      date: "2024-01-24",
      status: "active"
    }
  ];

  const reasons = [
    "Wrong Items Received",
    "Quality Issues",
    "Quantity Mismatch",
    "Duplicate Entry",
    "Pricing Error",
    "Vendor Cancellation",
    "Damaged in Transit",
    "System Error",
    "Other"
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
      {/* New Reversal Request */}
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <XCircle className="h-5 w-5" />
              Cancel GRN Request
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* GRN Search */}
            <div>
              <Label htmlFor="searchGRN">Search GRN</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="searchGRN"
                  placeholder="Enter GRN number to search..."
                  value={searchGRN}
                  onChange={(e) => setSearchGRN(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* GRN Details (if found) */}
            {searchGRN && (
              <div className="p-4 bg-blue-50 rounded-lg border">
                <h3 className="font-medium text-blue-900 mb-2">GRN Details</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-blue-700">GRN Number:</span>
                    <span className="ml-2 font-medium">GRN240124001</span>
                  </div>
                  <div>
                    <span className="text-blue-700">Vendor:</span>
                    <span className="ml-2 font-medium">Samsung Electronics</span>
                  </div>
                  <div>
                    <span className="text-blue-700">Amount:</span>
                    <span className="ml-2 font-medium">₹1,56,800</span>
                  </div>
                  <div>
                    <span className="text-blue-700">Items:</span>
                    <span className="ml-2 font-medium">12 items</span>
                  </div>
                  <div>
                    <span className="text-blue-700">Date:</span>
                    <span className="ml-2 font-medium">2024-01-24</span>
                  </div>
                  <div>
                    <span className="text-blue-700">Status:</span>
                    <Badge variant="default" className="ml-2">Active</Badge>
                  </div>
                </div>
              </div>
            )}

            <div>
              <Label htmlFor="grnNumber">GRN Number</Label>
              <Input
                id="grnNumber"
                placeholder="Enter GRN number to cancel"
                value={formData.grnNumber}
                onChange={(e) => setFormData({...formData, grnNumber: e.target.value})}
              />
            </div>

            <div>
              <Label htmlFor="reason">Reason for Cancellation</Label>
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
                placeholder="Provide detailed explanation for GRN cancellation..."
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows={4}
              />
            </div>

            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-yellow-800">Important Notice</h4>
                  <p className="text-sm text-yellow-700 mt-1">
                    GRN cancellation will reverse all inventory updates and financial entries. 
                    This action requires manager approval and cannot be undone once approved.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="destructive">
                <XCircle className="h-4 w-4 mr-2" />
                Submit Cancellation Request
              </Button>
              <Button variant="outline">Clear Form</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent GRNs & Guidelines */}
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recent GRNs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentGRNs.map((grn, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-sm">{grn.grnNumber}</h4>
                    <Badge variant="outline">Active</Badge>
                  </div>
                  <p className="text-xs text-gray-600 mb-1">{grn.vendor}</p>
                  <div className="flex justify-between items-center text-xs">
                    <span>₹{grn.amount.toLocaleString()}</span>
                    <span>{grn.items} items</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{grn.date}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Cancellation Guidelines</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 bg-red-50 rounded-lg">
              <h4 className="text-sm font-medium text-red-900 mb-1">Time Limit</h4>
              <p className="text-xs text-red-700">GRN can be cancelled within 7 days of creation.</p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <h4 className="text-sm font-medium text-yellow-900 mb-1">Manager Approval</h4>
              <p className="text-xs text-yellow-700">All cancellations require manager/area manager approval.</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <h4 className="text-sm font-medium text-blue-900 mb-1">Impact</h4>
              <p className="text-xs text-blue-700">Cancellation will reverse stock and financial entries.</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Quick Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>This Month:</span>
                <span className="font-medium">156 GRNs</span>
              </div>
              <div className="flex justify-between">
                <span>Cancelled:</span>
                <span className="font-medium text-red-600">8</span>
              </div>
              <div className="flex justify-between">
                <span>Success Rate:</span>
                <span className="font-medium text-green-600">94.9%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Cancellation Requests */}
      <div className="lg:col-span-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Recent Cancellation Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {grnReversals.map((reversal) => {
                const StatusIcon = getStatusIcon(reversal.status);
                return (
                  <div key={reversal.id} className="p-4 border rounded-lg hover:shadow-sm transition-shadow">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                          <h3 className="font-semibold">GRN: {reversal.grnNumber}</h3>
                          <Badge variant={getStatusColor(reversal.status)}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {reversal.status}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600 mb-2">
                          <div>
                            <span className="font-medium">Vendor:</span> {reversal.vendor}
                          </div>
                          <div>
                            <span className="font-medium">Amount:</span> ₹{reversal.amount.toLocaleString()}
                          </div>
                          <div>
                            <span className="font-medium">Items:</span> {reversal.items} items
                          </div>
                          <div>
                            <span className="font-medium">Reason:</span> {reversal.reason}
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-700 mb-2">{reversal.description}</p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            <span>Requested by: {reversal.requestedBy}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>Request Date: {reversal.requestDate}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            <span>Approver: {reversal.approver}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Button size="sm" variant="outline">
                          <FileText className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                        {reversal.status === 'pending' && (
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
