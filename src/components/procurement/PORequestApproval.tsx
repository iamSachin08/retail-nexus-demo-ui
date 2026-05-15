
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, Edit, Check, X, AlertCircle, Clock, FileText, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PORequestApprovalProps {
  searchQuery: string;
}

export function PORequestApproval({ searchQuery }: PORequestApprovalProps) {
  const [selectedPO, setSelectedPO] = useState<any>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const { toast } = useToast();

  const poRequests = [
    {
      id: "PO-2024-001",
      vendor: "Samsung Electronics",
      requestedBy: "Amit Kumar",
      totalAmount: "₹8,50,000",
      items: 15,
      priority: "High",
      status: "Pending Approval",
      requestDate: "2024-01-15",
      expectedDelivery: "2024-01-25",
      department: "Electronics",
      approver: "Rajesh Sharma"
    },
    {
      id: "PO-2024-002",
      vendor: "LG India",
      requestedBy: "Priya Singh",
      totalAmount: "₹6,25,000",
      items: 8,
      priority: "Medium",
      status: "Approved",
      requestDate: "2024-01-12",
      expectedDelivery: "2024-01-22",
      department: "Home Appliances",
      approver: "Suresh Patel"
    },
    {
      id: "PO-2024-003",
      vendor: "Sony Corporation",
      requestedBy: "Vikram Joshi",
      totalAmount: "₹4,75,000",
      items: 12,
      priority: "Low",
      status: "Rejected",
      requestDate: "2024-01-10",
      expectedDelivery: "2024-01-28",
      department: "Audio Systems",
      approver: "Rajesh Sharma"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved": return "bg-green-100 text-green-800";
      case "Pending Approval": return "bg-yellow-100 text-yellow-800";
      case "Rejected": return "bg-red-100 text-red-800";
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

  const filteredPOs = poRequests.filter(po => 
    po.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    po.vendor.toLowerCase().includes(searchQuery.toLowerCase()) ||
    po.requestedBy.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleApprove = (poId: string) => {
    toast({
      title: "PO Approved",
      description: `Purchase Order ${poId} has been approved successfully.`,
    });
  };

  const handleReject = (poId: string) => {
    toast({
      title: "PO Rejected",
      description: `Purchase Order ${poId} has been rejected.`,
      variant: "destructive",
    });
  };

  const handleCreatePO = () => {
    toast({
      title: "PO Created",
      description: "New Purchase Order has been created and sent for approval.",
    });
    setIsCreateDialogOpen(false);
  };

  return (
    <div className="space-y-4">
      {/* Create PO Button */}
      <div className="flex justify-end">
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Create New PO
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Purchase Order</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="vendor">Vendor</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Vendor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="samsung">Samsung Electronics</SelectItem>
                      <SelectItem value="lg">LG India</SelectItem>
                      <SelectItem value="sony">Sony Corporation</SelectItem>
                      <SelectItem value="whirlpool">Whirlpool India</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="department">Department</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="appliances">Home Appliances</SelectItem>
                      <SelectItem value="audio">Audio Systems</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="deliveryDate">Expected Delivery Date</Label>
                  <Input type="date" />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="totalAmount">Total Amount</Label>
                  <Input placeholder="Enter total amount" />
                </div>
                <div>
                  <Label htmlFor="items">Number of Items</Label>
                  <Input type="number" placeholder="Enter number of items" />
                </div>
                <div>
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea placeholder="Additional notes or requirements" className="h-24" />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button onClick={handleCreatePO} className="bg-blue-600 hover:bg-blue-700">
                Create PO
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* PO List */}
      {filteredPOs.map((po) => (
        <Card key={po.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex-1 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <h3 className="font-semibold text-gray-900">{po.id}</h3>
                  <div className="flex gap-2">
                    <Badge className={getStatusColor(po.status)}>
                      {po.status}
                    </Badge>
                    <Badge className={getPriorityColor(po.priority)}>
                      {po.priority}
                    </Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                  <div>
                    <span className="font-medium">Vendor:</span> {po.vendor}
                  </div>
                  <div>
                    <span className="font-medium">Requested By:</span> {po.requestedBy}
                  </div>
                  <div>
                    <span className="font-medium">Amount:</span> {po.totalAmount}
                  </div>
                  <div>
                    <span className="font-medium">Items:</span> {po.items}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-600">
                  <div>
                    <span className="font-medium">Request Date:</span> {po.requestDate}
                  </div>
                  <div>
                    <span className="font-medium">Expected Delivery:</span> {po.expectedDelivery}
                  </div>
                  <div>
                    <span className="font-medium">Approver:</span> {po.approver}
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl">
                    <DialogHeader>
                      <DialogTitle>Purchase Order Details - {po.id}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Order Information</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">PO ID:</span>
                              <span>{po.id}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Vendor:</span>
                              <span>{po.vendor}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Total Amount:</span>
                              <span>{po.totalAmount}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Items:</span>
                              <span>{po.items}</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Request Details</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Requested By:</span>
                              <span>{po.requestedBy}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Department:</span>
                              <span>{po.department}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Priority:</span>
                              <Badge className={getPriorityColor(po.priority)}>
                                {po.priority}
                              </Badge>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Status:</span>
                              <Badge className={getStatusColor(po.status)}>
                                {po.status}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                
                {po.status === "Pending Approval" && (
                  <>
                    <Button 
                      size="sm" 
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => handleApprove(po.id)}
                    >
                      <Check className="h-4 w-4 mr-2" />
                      Approve
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-red-200 text-red-600 hover:bg-red-50"
                      onClick={() => handleReject(po.id)}
                    >
                      <X className="h-4 w-4 mr-2" />
                      Reject
                    </Button>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      
      {filteredPOs.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-gray-500">No purchase orders found matching your search criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
