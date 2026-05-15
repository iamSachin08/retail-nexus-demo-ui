
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Package, Trash2, RefreshCw, AlertTriangle, Camera } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface RestockingDecisionsProps {
  searchQuery: string;
}

export function RestockingDecisions({ searchQuery }: RestockingDecisionsProps) {
  const [decision, setDecision] = useState("");
  const [notes, setNotes] = useState("");
  const { toast } = useToast();

  const restockingItems = [
    {
      id: "REST-2024-001",
      returnId: "RET-2024-001",
      productName: "Samsung 55\" 4K Smart TV",
      sku: "SAM-TV-55-4K-001",
      customerName: "Amit Kumar",
      returnReason: "Defective",
      condition: "Minor Damage",
      originalValue: "₹65,000",
      inspectedBy: "Quality Team",
      inspectionDate: "2024-01-22",
      recommendation: "Repair & Restock",
      status: "Pending Decision"
    },
    {
      id: "REST-2024-002",
      returnId: "RET-2024-002",
      productName: "LG 450L Refrigerator",
      sku: "LG-REF-450L-002",
      customerName: "Priya Singh",
      returnReason: "Changed Mind",
      condition: "Excellent",
      originalValue: "₹35,000",
      inspectedBy: "Store Manager",
      inspectionDate: "2024-01-21",
      recommendation: "Direct Restock",
      status: "Approved for Restock"
    },
    {
      id: "REST-2024-003",
      returnId: "RET-2024-003",
      productName: "Sony 5.1 Home Theater",
      sku: "SON-HT-5.1-003",
      customerName: "Vikram Joshi",
      returnReason: "Damaged",
      condition: "Severely Damaged",
      originalValue: "₹25,000",
      inspectedBy: "Technical Team",
      inspectionDate: "2024-01-20",
      recommendation: "Scrap/Liquidate",
      status: "Marked for Disposal"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved for Restock": return "bg-green-100 text-green-800";
      case "Pending Decision": return "bg-yellow-100 text-yellow-800";
      case "Marked for Disposal": return "bg-red-100 text-red-800";
      case "Under Repair": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case "Excellent": return "bg-green-100 text-green-800";
      case "Good": return "bg-blue-100 text-blue-800";
      case "Minor Damage": return "bg-yellow-100 text-yellow-800";
      case "Severely Damaged": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredItems = restockingItems.filter(item => 
    item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRestockDecision = (itemId: string, decision: string) => {
    let message = "";
    switch (decision) {
      case "restock":
        message = `Item ${itemId} approved for restocking.`;
        break;
      case "repair":
        message = `Item ${itemId} sent for repair before restocking.`;
        break;
      case "scrap":
        message = `Item ${itemId} marked for disposal.`;
        break;
      case "liquidate":
        message = `Item ${itemId} marked for liquidation sale.`;
        break;
    }
    
    toast({
      title: "Decision Recorded",
      description: message,
    });
  };

  return (
    <div className="space-y-4">
      {filteredItems.map((item) => (
        <Card key={item.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex-1 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <h3 className="font-semibold text-gray-900">{item.id}</h3>
                  <div className="flex gap-2">
                    <Badge className={getStatusColor(item.status)}>
                      {item.status}
                    </Badge>
                    <Badge className={getConditionColor(item.condition)}>
                      {item.condition}
                    </Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                  <div>
                    <span className="font-medium">Product:</span> {item.productName}
                  </div>
                  <div>
                    <span className="font-medium">SKU:</span> {item.sku}
                  </div>
                  <div>
                    <span className="font-medium">Customer:</span> {item.customerName}
                  </div>
                  <div>
                    <span className="font-medium">Value:</span> {item.originalValue}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-600">
                  <div>
                    <span className="font-medium">Return Reason:</span> {item.returnReason}
                  </div>
                  <div>
                    <span className="font-medium">Inspected By:</span> {item.inspectedBy}
                  </div>
                  <div>
                    <span className="font-medium">Inspection Date:</span> {item.inspectionDate}
                  </div>
                </div>
                
                <div className="p-3 bg-blue-50 rounded-lg border-l-2 border-blue-200">
                  <span className="font-medium text-blue-900">Recommendation:</span>
                  <span className="text-blue-800"> {item.recommendation}</span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Camera className="h-4 w-4 mr-2" />
                      Inspect
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl">
                    <DialogHeader>
                      <DialogTitle>Quality Inspection - {item.id}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Product Information</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Product:</span>
                              <span>{item.productName}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">SKU:</span>
                              <span>{item.sku}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Return Reason:</span>
                              <span>{item.returnReason}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Original Value:</span>
                              <span>{item.originalValue}</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Inspection Details</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Condition:</span>
                              <Badge className={getConditionColor(item.condition)}>
                                {item.condition}
                              </Badge>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Inspected By:</span>
                              <span>{item.inspectedBy}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Date:</span>
                              <span>{item.inspectionDate}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Status:</span>
                              <Badge className={getStatusColor(item.status)}>
                                {item.status}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Recommendation</h4>
                        <p className="text-sm text-gray-600 bg-blue-50 p-3 rounded border-l-2 border-blue-200">
                          {item.recommendation}
                        </p>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="decision">Final Decision</Label>
                          <Select value={decision} onValueChange={setDecision}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select decision" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="restock">Direct Restock</SelectItem>
                              <SelectItem value="repair">Repair & Restock</SelectItem>
                              <SelectItem value="liquidate">Liquidation Sale</SelectItem>
                              <SelectItem value="scrap">Scrap/Dispose</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label htmlFor="notes">Decision Notes</Label>
                          <Textarea
                            id="notes"
                            placeholder="Add notes for the decision..."
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            className="h-20"
                          />
                        </div>
                      </div>
                      
                      <div className="flex justify-end gap-2">
                        <DialogClose asChild>
                          <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button 
                          onClick={() => handleRestockDecision(item.id, decision)}
                          disabled={!decision}
                        >
                          Confirm Decision
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                
                {item.status === "Pending Decision" && (
                  <>
                    <Button 
                      size="sm" 
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => handleRestockDecision(item.id, "restock")}
                    >
                      <Package className="h-4 w-4 mr-2" />
                      Restock
                    </Button>
                    
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleRestockDecision(item.id, "repair")}
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Repair
                    </Button>
                    
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="border-red-200 text-red-600 hover:bg-red-50"
                      onClick={() => handleRestockDecision(item.id, "scrap")}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Scrap
                    </Button>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      
      {filteredItems.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Items for Restocking</h3>
            <p className="text-gray-500">No returned items require restocking decisions at this time.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
