
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, Edit, Camera, Plus, Calendar, User, Package } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ReturnRequestsProps {
  searchQuery: string;
}

export function ReturnRequests({ searchQuery }: ReturnRequestsProps) {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedReturn, setSelectedReturn] = useState<any>(null);
  const { toast } = useToast();

  const returnRequests = [
    {
      id: "RET-2024-001",
      customerName: "Amit Kumar",
      productName: "Samsung 55\" 4K Smart TV",
      sku: "SAM-TV-55-4K-001",
      purchaseDate: "2024-01-10",
      returnDate: "2024-01-20",
      reason: "Defective",
      status: "Processing",
      amount: "₹65,000",
      invoiceNumber: "INV-2024-001234",
      requestedBy: "Store Staff",
      description: "Screen flickering issue reported by customer"
    },
    {
      id: "RET-2024-002",
      customerName: "Priya Singh",
      productName: "LG 450L Refrigerator",
      sku: "LG-REF-450L-002",
      purchaseDate: "2024-01-05",
      returnDate: "2024-01-18",
      reason: "Changed Mind",
      status: "Pending",
      amount: "₹35,000",
      invoiceNumber: "INV-2024-001567",
      requestedBy: "Customer",
      description: "Customer decided to go with different model"
    },
    {
      id: "RET-2024-003",
      customerName: "Vikram Joshi",
      productName: "Sony 5.1 Home Theater",
      sku: "SON-HT-5.1-003",
      purchaseDate: "2023-12-28",
      returnDate: "2024-01-15",
      reason: "Damaged",
      status: "Approved",
      amount: "₹25,000",
      invoiceNumber: "INV-2023-005678",
      requestedBy: "Store Staff",
      description: "Package damaged during delivery"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved": return "bg-green-100 text-green-800";
      case "Processing": return "bg-blue-100 text-blue-800";
      case "Pending": return "bg-yellow-100 text-yellow-800";
      case "Rejected": return "bg-red-100 text-red-800";
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

  const filteredReturns = returnRequests.filter(returnItem => 
    returnItem.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    returnItem.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    returnItem.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    returnItem.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateReturn = () => {
    toast({
      title: "Return Request Created",
      description: "New return request has been created successfully.",
    });
    setIsCreateDialogOpen(false);
  };

  const handleUpdateStatus = (returnId: string, newStatus: string) => {
    toast({
      title: "Status Updated",
      description: `Return ${returnId} status updated to ${newStatus}.`,
    });
  };

  return (
    <div className="space-y-4">
      {/* Create Return Button */}
      <div className="flex justify-end">
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Create Return Request
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Return Request</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="customerName">Customer Name</Label>
                  <Input placeholder="Enter customer name" />
                </div>
                <div>
                  <Label htmlFor="invoiceNumber">Invoice Number</Label>
                  <Input placeholder="Enter invoice number" />
                </div>
                <div>
                  <Label htmlFor="productName">Product Name</Label>
                  <Input placeholder="Enter product name" />
                </div>
                <div>
                  <Label htmlFor="sku">SKU</Label>
                  <Input placeholder="Enter product SKU" />
                </div>
                <div>
                  <Label htmlFor="purchaseDate">Purchase Date</Label>
                  <Input type="date" />
                </div>
                <div>
                  <Label htmlFor="returnDate">Return Date</Label>
                  <Input type="date" />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="amount">Return Amount</Label>
                  <Input placeholder="Enter return amount" />
                </div>
                <div>
                  <Label htmlFor="reason">Return Reason</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select reason" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="defective">Defective</SelectItem>
                      <SelectItem value="damaged">Damaged</SelectItem>
                      <SelectItem value="changed-mind">Changed Mind</SelectItem>
                      <SelectItem value="wrong-item">Wrong Item</SelectItem>
                      <SelectItem value="not-as-described">Not as Described</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="requestedBy">Requested By</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select requester" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="customer">Customer</SelectItem>
                      <SelectItem value="store-staff">Store Staff</SelectItem>
                      <SelectItem value="delivery-partner">Delivery Partner</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea placeholder="Describe the return reason in detail" className="h-24" />
                </div>
                <div>
                  <Label htmlFor="images">Upload Images</Label>
                  <Input type="file" multiple accept="image/*" />
                  <p className="text-xs text-gray-500 mt-1">Upload photos showing damage or defect</p>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button onClick={handleCreateReturn} className="bg-blue-600 hover:bg-blue-700">
                Create Return Request
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Return Requests List */}
      {filteredReturns.map((returnItem) => (
        <Card key={returnItem.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex-1 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <h3 className="font-semibold text-gray-900">{returnItem.id}</h3>
                  <div className="flex gap-2">
                    <Badge className={getStatusColor(returnItem.status)}>
                      {returnItem.status}
                    </Badge>
                    <Badge className={getReasonColor(returnItem.reason)}>
                      {returnItem.reason}
                    </Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{returnItem.customerName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4" />
                    <span>{returnItem.sku}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{returnItem.returnDate}</span>
                  </div>
                  <div>
                    <span className="font-medium">Amount:</span> {returnItem.amount}
                  </div>
                </div>
                
                <div className="text-sm">
                  <span className="font-medium">Product:</span> {returnItem.productName}
                </div>
                
                <div className="text-sm">
                  <span className="font-medium">Invoice:</span> {returnItem.invoiceNumber} | 
                  <span className="font-medium"> Requested by:</span> {returnItem.requestedBy}
                </div>
                
                {returnItem.description && (
                  <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                    {returnItem.description}
                  </p>
                )}
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
                      <DialogTitle>Return Details - {returnItem.id}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Return Information</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Return ID:</span>
                              <span>{returnItem.id}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Customer:</span>
                              <span>{returnItem.customerName}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Product:</span>
                              <span>{returnItem.productName}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">SKU:</span>
                              <span>{returnItem.sku}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Amount:</span>
                              <span>{returnItem.amount}</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Return Status</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Status:</span>
                              <Badge className={getStatusColor(returnItem.status)}>
                                {returnItem.status}
                              </Badge>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Reason:</span>
                              <Badge className={getReasonColor(returnItem.reason)}>
                                {returnItem.reason}
                              </Badge>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Purchase Date:</span>
                              <span>{returnItem.purchaseDate}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Return Date:</span>
                              <span>{returnItem.returnDate}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Requested By:</span>
                              <span>{returnItem.requestedBy}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      {returnItem.description && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
                          <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                            {returnItem.description}
                          </p>
                        </div>
                      )}
                      <div className="flex gap-2">
                        <Button size="sm" onClick={() => handleUpdateStatus(returnItem.id, 'Processing')}>
                          Process Return
                        </Button>
                        <Button variant="outline" size="sm">
                          <Camera className="h-4 w-4 mr-2" />
                          View Images
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleUpdateStatus(returnItem.id, 'Processing')}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Update
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      
      {filteredReturns.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-gray-500">No return requests found matching your search criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
