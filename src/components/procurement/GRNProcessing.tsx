
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Package, CheckCircle, AlertTriangle, FileText, Scan, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface GRNProcessingProps {
  searchQuery: string;
}

export function GRNProcessing({ searchQuery }: GRNProcessingProps) {
  const [selectedGRN, setSelectedGRN] = useState<any>(null);
  const [isProcessDialogOpen, setIsProcessDialogOpen] = useState(false);
  const { toast } = useToast();

  const grnData = [
    {
      id: "GRN-2024-001",
      poNumber: "PO-2024-001",
      vendor: "Samsung Electronics",
      receivedDate: "2024-01-20",
      expectedItems: 15,
      receivedItems: 15,
      status: "Completed",
      totalValue: "₹8,50,000",
      receivedBy: "Warehouse Team",
      discrepancies: 0,
      notes: "All items received in good condition"
    },
    {
      id: "GRN-2024-002",
      poNumber: "PO-2024-002",
      vendor: "LG India",
      receivedDate: "2024-01-18",
      expectedItems: 8,
      receivedItems: 6,
      status: "Partial",
      totalValue: "₹4,68,750",
      receivedBy: "Suresh Kumar",
      discrepancies: 2,
      notes: "2 items damaged during transit, replacement requested"
    },
    {
      id: "GRN-2024-003",
      poNumber: "PO-2024-003",
      vendor: "Sony Corporation",
      receivedDate: "2024-01-22",
      expectedItems: 12,
      receivedItems: 0,
      status: "Pending",
      totalValue: "₹0",
      receivedBy: "",
      discrepancies: 0,
      notes: "Awaiting delivery"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-800";
      case "Partial": return "bg-yellow-100 text-yellow-800";
      case "Pending": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredGRNs = grnData.filter(grn => 
    grn.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    grn.poNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    grn.vendor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleProcessGRN = () => {
    toast({
      title: "GRN Processed",
      description: "Goods Receipt Note has been processed successfully.",
    });
    setIsProcessDialogOpen(false);
  };

  const handleQualityCheck = (grnId: string) => {
    toast({
      title: "Quality Check Initiated",
      description: `Quality check process started for ${grnId}.`,
    });
  };

  return (
    <div className="space-y-4">
      {/* Process New GRN Button */}
      <div className="flex justify-end">
        <Dialog open={isProcessDialogOpen} onOpenChange={setIsProcessDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Package className="h-4 w-4 mr-2" />
              Process New GRN
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Process Goods Receipt Note</DialogTitle>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="poNumber">PO Number</Label>
                    <div className="flex gap-2">
                      <Input placeholder="Enter PO Number" />
                      <Button variant="outline" size="icon">
                        <Scan className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="vendor">Vendor</Label>
                    <Input placeholder="Vendor name (auto-filled)" disabled />
                  </div>
                  <div>
                    <Label htmlFor="receivedBy">Received By</Label>
                    <Input placeholder="Enter receiver name" />
                  </div>
                  <div>
                    <Label htmlFor="receivedDate">Received Date</Label>
                    <Input type="date" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="expectedItems">Expected Items</Label>
                    <Input type="number" placeholder="Expected quantity" disabled />
                  </div>
                  <div>
                    <Label htmlFor="receivedItems">Received Items</Label>
                    <Input type="number" placeholder="Actual received quantity" />
                  </div>
                  <div>
                    <Label htmlFor="totalValue">Total Value</Label>
                    <Input placeholder="Total invoice value" />
                  </div>
                  <div>
                    <Label htmlFor="invoiceUpload">Upload Invoice</Label>
                    <div className="flex gap-2">
                      <Input type="file" accept=".pdf,.jpg,.png" />
                      <Button variant="outline" size="icon">
                        <Upload className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Quality Check Items */}
              <div>
                <Label>Quality Check Items</Label>
                <div className="space-y-3 mt-2 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="physical-condition" />
                    <label htmlFor="physical-condition" className="text-sm">Physical condition check</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="quantity-verification" />
                    <label htmlFor="quantity-verification" className="text-sm">Quantity verification</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="documentation" />
                    <label htmlFor="documentation" className="text-sm">Documentation verification</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="serial-numbers" />
                    <label htmlFor="serial-numbers" className="text-sm">Serial number verification</label>
                  </div>
                </div>
              </div>
              
              <div>
                <Label htmlFor="notes">Notes/Remarks</Label>
                <Textarea placeholder="Enter any discrepancies or additional notes" className="h-24" />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button onClick={handleProcessGRN} className="bg-blue-600 hover:bg-blue-700">
                Process GRN
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* GRN List */}
      {filteredGRNs.map((grn) => (
        <Card key={grn.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex-1 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <h3 className="font-semibold text-gray-900">{grn.id}</h3>
                  <Badge className={getStatusColor(grn.status)}>
                    {grn.status}
                  </Badge>
                  {grn.discrepancies > 0 && (
                    <Badge className="bg-orange-100 text-orange-800">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      {grn.discrepancies} Discrepancies
                    </Badge>
                  )}
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                  <div>
                    <span className="font-medium">PO Number:</span> {grn.poNumber}
                  </div>
                  <div>
                    <span className="font-medium">Vendor:</span> {grn.vendor}
                  </div>
                  <div>
                    <span className="font-medium">Total Value:</span> {grn.totalValue}
                  </div>
                  <div>
                    <span className="font-medium">Received Date:</span> {grn.receivedDate}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Expected Items:</span>
                    <span className="font-medium">{grn.expectedItems}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Received Items:</span>
                    <span className="font-medium">{grn.receivedItems}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Received By:</span>
                    <span className="font-medium">{grn.receivedBy || 'Pending'}</span>
                  </div>
                </div>
                
                {grn.notes && (
                  <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                    <span className="font-medium">Notes:</span> {grn.notes}
                  </p>
                )}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl">
                    <DialogHeader>
                      <DialogTitle>GRN Details - {grn.id}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Receipt Information</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">GRN ID:</span>
                              <span>{grn.id}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">PO Number:</span>
                              <span>{grn.poNumber}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Vendor:</span>
                              <span>{grn.vendor}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Total Value:</span>
                              <span>{grn.totalValue}</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Receipt Status</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Status:</span>
                              <Badge className={getStatusColor(grn.status)}>
                                {grn.status}
                              </Badge>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Expected:</span>
                              <span>{grn.expectedItems} items</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Received:</span>
                              <span>{grn.receivedItems} items</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Discrepancies:</span>
                              <span>{grn.discrepancies}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      {grn.notes && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Notes</h4>
                          <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                            {grn.notes}
                          </p>
                        </div>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
                
                {grn.status === "Completed" && (
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleQualityCheck(grn.id)}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Quality Check
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      
      {filteredGRNs.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-gray-500">No GRN records found matching your search criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
