
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CheckCircle, XCircle, Clock, Eye, ArrowUpDown, Calendar, User, AlertTriangle } from "lucide-react";

interface PriceChangeQueueProps {
  searchQuery: string;
}

export function PriceChangeQueue({ searchQuery }: PriceChangeQueueProps) {
  const priceChanges = [
    {
      id: "PC-2024-001",
      sku: "SKU-2024-001",
      productName: "Samsung Galaxy S24 Ultra",
      currentPrice: "₹1,29,900",
      newPrice: "₹1,19,900",
      changeType: "Discount",
      reason: "Festival Sale",
      requestedBy: "Rajesh Kumar",
      requestDate: "2024-01-22",
      effectiveDate: "2024-01-25",
      approvalStatus: "Pending",
      priority: "High",
      approver: "Store Manager"
    },
    {
      id: "PC-2024-002",
      sku: "SKU-2024-002",
      productName: "iPhone 15 Pro",
      currentPrice: "₹1,34,900",
      newPrice: "₹1,39,900",
      changeType: "Price Increase",
      reason: "Supplier Price Revision",
      requestedBy: "Priya Singh",
      requestDate: "2024-01-21",
      effectiveDate: "2024-01-26",
      approvalStatus: "Approved",
      priority: "Medium",
      approver: "Regional Manager"
    },
    {
      id: "PC-2024-003",
      sku: "SKU-2024-003",
      productName: "Sony 65\" 4K OLED TV",
      currentPrice: "₹1,99,900",
      newPrice: "₹1,79,900",
      changeType: "Discount",
      reason: "Clearance Sale",
      requestedBy: "Amit Sharma",
      requestDate: "2024-01-20",
      effectiveDate: "2024-01-24",
      approvalStatus: "Rejected",
      priority: "Low",
      approver: "Store Manager",
      rejectionReason: "Margin too low"
    },
    {
      id: "PC-2024-004",
      sku: "SKU-2024-004",
      productName: "Dell XPS 13 Laptop",
      currentPrice: "₹89,900",
      newPrice: "₹85,900",
      changeType: "Discount",
      reason: "Competition Price Match",
      requestedBy: "Neha Patel",
      requestDate: "2024-01-23",
      effectiveDate: "2024-01-27",
      approvalStatus: "Pending",
      priority: "High",
      approver: "Store Manager"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved": return "bg-green-100 text-green-800";
      case "Pending": return "bg-yellow-100 text-yellow-800";
      case "Rejected": return "bg-red-100 text-red-800";
      case "Implemented": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-red-100 text-red-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getChangeTypeColor = (type: string) => {
    switch (type) {
      case "Discount": return "text-green-600";
      case "Price Increase": return "text-red-600";
      case "Price Correction": return "text-blue-600";
      default: return "text-gray-600";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Approved": return <CheckCircle className="h-4 w-4" />;
      case "Rejected": return <XCircle className="h-4 w-4" />;
      case "Pending": return <Clock className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const filteredChanges = priceChanges.filter(change => 
    change.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    change.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
    change.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    change.requestedBy.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleApprove = (changeId: string) => {
    console.log('Approving price change:', changeId);
  };

  const handleReject = (changeId: string) => {
    console.log('Rejecting price change:', changeId);
  };

  const handleImplement = (changeId: string) => {
    console.log('Implementing price change:', changeId);
  };

  return (
    <div className="space-y-4">
      {filteredChanges.map((change) => (
        <Card key={change.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="space-y-4">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <ArrowUpDown className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{change.id}</h3>
                    <p className="text-sm text-gray-600">{change.productName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(change.approvalStatus)}>
                    {getStatusIcon(change.approvalStatus)}
                    <span className="ml-1">{change.approvalStatus}</span>
                  </Badge>
                  <Badge className={getPriorityColor(change.priority)}>
                    {change.priority} Priority
                  </Badge>
                </div>
              </div>

              {/* Price Change Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <span className="text-sm text-gray-600">Current Price:</span>
                  <div className="font-medium text-lg">{change.currentPrice}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">New Price:</span>
                  <div className={`font-medium text-lg ${getChangeTypeColor(change.changeType)}`}>
                    {change.newPrice}
                  </div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Change Type:</span>
                  <div className="font-medium">{change.changeType}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Effective Date:</span>
                  <div className="font-medium flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {change.effectiveDate}
                  </div>
                </div>
              </div>

              {/* Request Details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Requested By:</span>
                  <div className="font-medium flex items-center gap-1">
                    <User className="h-3 w-3" />
                    {change.requestedBy}
                  </div>
                </div>
                <div>
                  <span className="text-gray-600">Request Date:</span>
                  <div className="font-medium">{change.requestDate}</div>
                </div>
                <div>
                  <span className="text-gray-600">Approver:</span>
                  <div className="font-medium">{change.approver}</div>
                </div>
              </div>

              {/* Reason */}
              <div>
                <span className="text-sm text-gray-600">Reason:</span>
                <div className="font-medium">{change.reason}</div>
              </div>

              {/* Rejection Reason (if applicable) */}
              {change.approvalStatus === "Rejected" && change.rejectionReason && (
                <div className="p-3 bg-red-50 border-l-4 border-red-400 rounded">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                    <span className="text-sm font-medium text-red-800">Rejection Reason:</span>
                  </div>
                  <p className="text-sm text-red-700 mt-1">{change.rejectionReason}</p>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-2 pt-4 border-t">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Price Change Details - {change.id}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h5 className="font-medium mb-3">Product Information</h5>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">SKU:</span>
                              <span>{change.sku}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Product:</span>
                              <span>{change.productName}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Current Price:</span>
                              <span>{change.currentPrice}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">New Price:</span>
                              <span className={getChangeTypeColor(change.changeType)}>
                                {change.newPrice}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h5 className="font-medium mb-3">Request Information</h5>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Change Type:</span>
                              <span>{change.changeType}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Reason:</span>
                              <span>{change.reason}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Requested By:</span>
                              <span>{change.requestedBy}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Request Date:</span>
                              <span>{change.requestDate}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Effective Date:</span>
                              <span>{change.effectiveDate}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="font-medium mb-3">Approval Status</h5>
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor(change.approvalStatus)}>
                            {getStatusIcon(change.approvalStatus)}
                            <span className="ml-1">{change.approvalStatus}</span>
                          </Badge>
                          <span className="text-sm text-gray-600">by {change.approver}</span>
                        </div>
                        {change.rejectionReason && (
                          <p className="text-sm text-red-600 mt-2">{change.rejectionReason}</p>
                        )}
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>

                {change.approvalStatus === "Pending" && (
                  <>
                    <Button size="sm" onClick={() => handleApprove(change.id)}>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Approve
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleReject(change.id)}>
                      <XCircle className="h-4 w-4 mr-2" />
                      Reject
                    </Button>
                  </>
                )}

                {change.approvalStatus === "Approved" && (
                  <Button size="sm" onClick={() => handleImplement(change.id)}>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Implement
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      
      {filteredChanges.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <ArrowUpDown className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Price Changes Found</h3>
            <p className="text-gray-500">No price change requests match your search criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
