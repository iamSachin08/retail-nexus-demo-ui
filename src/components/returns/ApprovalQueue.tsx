
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Check, X, Eye, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ApprovalQueueProps {
  searchQuery: string;
}

export function ApprovalQueue({ searchQuery }: ApprovalQueueProps) {
  const [approvalNotes, setApprovalNotes] = useState("");
  const { toast } = useToast();

  const pendingApprovals = [
    {
      id: "RET-2024-004",
      customerName: "Rajesh Patel",
      productName: "Whirlpool 7kg Washing Machine",
      amount: "₹28,000",
      reason: "Defective",
      priority: "High",
      submittedBy: "Store Manager",
      submittedDate: "2024-01-22",
      description: "Motor making unusual noise, customer reported within warranty period"
    },
    {
      id: "RET-2024-005",
      customerName: "Sneha Gupta",
      productName: "iPhone 15 Pro",
      amount: "₹1,29,900",
      reason: "Changed Mind",
      priority: "High",
      submittedBy: "Sales Executive",
      submittedDate: "2024-01-21",
      description: "Customer wants to return within 7-day return policy"
    },
    {
      id: "RET-2024-006",
      customerName: "Arjun Singh",
      productName: "Dell Laptop",
      amount: "₹65,000",
      reason: "Wrong Item",
      priority: "Medium",
      submittedBy: "Customer Service",
      submittedDate: "2024-01-20",
      description: "Customer ordered different configuration"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-red-100 text-red-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getReasonColor = (reason: string) => {
    switch (reason) {
      case "Defective": return "bg-red-100 text-red-800";
      case "Damaged": return "bg-orange-100 text-orange-800";
      case "Changed Mind": return "bg-blue-100 text-blue-800";
      case "Wrong Item": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredApprovals = pendingApprovals.filter(item => 
    item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleApprove = (returnId: string) => {
    toast({
      title: "Return Approved",
      description: `Return request ${returnId} has been approved.`,
    });
  };

  const handleReject = (returnId: string) => {
    toast({
      title: "Return Rejected",
      description: `Return request ${returnId} has been rejected.`,
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-4">
      {filteredApprovals.map((item) => (
        <Card key={item.id} className="hover:shadow-md transition-shadow border-l-4 border-l-yellow-400">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex-1 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-600" />
                    <h3 className="font-semibold text-gray-900">{item.id}</h3>
                  </div>
                  <div className="flex gap-2">
                    <Badge className={getPriorityColor(item.priority)}>
                      {item.priority} Priority
                    </Badge>
                    <Badge className={getReasonColor(item.reason)}>
                      {item.reason}
                    </Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                  <div>
                    <span className="font-medium">Customer:</span> {item.customerName}
                  </div>
                  <div>
                    <span className="font-medium">Product:</span> {item.productName}
                  </div>
                  <div>
                    <span className="font-medium">Amount:</span> {item.amount}
                  </div>
                  <div>
                    <span className="font-medium">Submitted:</span> {item.submittedDate}
                  </div>
                </div>
                
                <div className="text-sm">
                  <span className="font-medium">Submitted by:</span> {item.submittedBy}
                </div>
                
                <p className="text-sm text-gray-600 bg-yellow-50 p-3 rounded border-l-2 border-yellow-200">
                  <span className="font-medium text-gray-900">Reason:</span> {item.description}
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      Review
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Review Return Request - {item.id}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Request Details</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Return ID:</span>
                              <span>{item.id}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Customer:</span>
                              <span>{item.customerName}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Product:</span>
                              <span>{item.productName}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Amount:</span>
                              <span>{item.amount}</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Approval Info</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Priority:</span>
                              <Badge className={getPriorityColor(item.priority)}>
                                {item.priority}
                              </Badge>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Reason:</span>
                              <Badge className={getReasonColor(item.reason)}>
                                {item.reason}
                              </Badge>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Submitted By:</span>
                              <span>{item.submittedBy}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Date:</span>
                              <span>{item.submittedDate}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
                        <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                          {item.description}
                        </p>
                      </div>
                      
                      <div>
                        <Label htmlFor="approvalNotes">Approval Notes</Label>
                        <Textarea
                          id="approvalNotes"
                          placeholder="Add notes for approval/rejection decision..."
                          value={approvalNotes}
                          onChange={(e) => setApprovalNotes(e.target.value)}
                          className="h-20"
                        />
                      </div>
                      
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          className="border-red-200 text-red-600 hover:bg-red-50"
                          onClick={() => handleReject(item.id)}
                        >
                          <X className="h-4 w-4 mr-2" />
                          Reject
                        </Button>
                        <Button 
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => handleApprove(item.id)}
                        >
                          <Check className="h-4 w-4 mr-2" />
                          Approve
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                
                <Button 
                  size="sm" 
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => handleApprove(item.id)}
                >
                  <Check className="h-4 w-4 mr-2" />
                  Approve
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-red-200 text-red-600 hover:bg-red-50"
                  onClick={() => handleReject(item.id)}
                >
                  <X className="h-4 w-4 mr-2" />
                  Reject
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      
      {filteredApprovals.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="text-center">
              <Check className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">All Caught Up!</h3>
              <p className="text-gray-500">No return requests pending approval.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
