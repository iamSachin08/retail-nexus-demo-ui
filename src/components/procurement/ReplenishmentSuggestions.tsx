import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TrendingUp, AlertTriangle, Package, ShoppingCart, Calendar, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ReplenishmentSuggestionsProps {
  searchQuery: string;
}

export function ReplenishmentSuggestions({ searchQuery }: ReplenishmentSuggestionsProps) {
  const { toast } = useToast();
  const [isCreatePOOpen, setIsCreatePOOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const suggestions = [
    {
      sku: "PEN-BALL-001",
      productName: "Ball Point Pens (Pack of 10)",
      currentStock: 8,
      reorderLevel: 15,
      suggestedQuantity: 25,
      lastSaleDate: "2024-01-20",
      avgSalesPerWeek: 12,
      vendor: "Local Stationery Supplier",
      urgency: "High",
      forecastAccuracy: 94
    },
    {
      sku: "NOTEBOOK-A4-100",
      productName: "A4 Notebooks (100 pages)",
      currentStock: 12,
      reorderLevel: 10,
      suggestedQuantity: 20,
      lastSaleDate: "2024-01-19",
      avgSalesPerWeek: 8,
      vendor: "Paper Products Co.",
      urgency: "Medium",
      forecastAccuracy: 89
    },
    {
      sku: "BULB-LED-9W",
      productName: "LED Bulbs 9W (Pack of 5)",
      currentStock: 3,
      reorderLevel: 12,
      suggestedQuantity: 30,
      lastSaleDate: "2024-01-21",
      avgSalesPerWeek: 15,
      vendor: "Electrical Supplies Ltd",
      urgency: "Critical",
      forecastAccuracy: 97
    },
    {
      sku: "CABLE-USB-C",
      productName: "USB-C Cables (Pack of 3)",
      currentStock: 5,
      reorderLevel: 8,
      suggestedQuantity: 15,
      lastSaleDate: "2024-01-18",
      avgSalesPerWeek: 10,
      vendor: "Electronics Accessories",
      urgency: "High",
      forecastAccuracy: 91
    },
    {
      sku: "ADAPTER-MULTI",
      productName: "Multi-Port USB Adapters",
      currentStock: 2,
      reorderLevel: 6,
      suggestedQuantity: 12,
      lastSaleDate: "2024-01-22",
      avgSalesPerWeek: 7,
      vendor: "Tech Accessories Co.",
      urgency: "Critical",
      forecastAccuracy: 88
    }
  ];

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "Critical": return "bg-red-100 text-red-800";
      case "High": return "bg-orange-100 text-orange-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredSuggestions = suggestions.filter(item => 
    item.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.vendor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreatePO = (item: any) => {
    setSelectedItem(item);
    setIsCreatePOOpen(true);
  };

  const handleSubmitPO = () => {
    toast({
      title: "PO Created",
      description: `Purchase Order created for ${selectedItem?.productName}`,
    });
    setIsCreatePOOpen(false);
    setSelectedItem(null);
  };

  const handleIgnoreSuggestion = (sku: string) => {
    toast({
      title: "Suggestion Ignored",
      description: `Replenishment suggestion for ${sku} has been ignored`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-8 w-8 text-red-600" />
              <div>
                <p className="text-xl font-bold text-red-600">8</p>
                <p className="text-sm text-red-700">Critical Items</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-xl font-bold text-blue-600">92%</p>
                <p className="text-sm text-blue-700">Forecast Accuracy</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Package className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-xl font-bold text-green-600">₹2.4L</p>
                <p className="text-sm text-green-700">Est. PO Value</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Calendar className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-xl font-bold text-purple-600">3-5</p>
                <p className="text-sm text-purple-700">Days Lead Time</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Replenishment Suggestions */}
      <Card>
        <CardHeader>
          <CardTitle>AI-Powered Replenishment Suggestions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredSuggestions.map((item) => (
              <div key={item.sku} className="p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <h4 className="font-medium text-gray-900">{item.productName}</h4>
                      <Badge className={getUrgencyColor(item.urgency)}>
                        {item.urgency}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Current Stock:</span>
                        <p className="font-medium">{item.currentStock} units</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Reorder Level:</span>
                        <p className="font-medium">{item.reorderLevel} units</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Suggested Qty:</span>
                        <p className="font-medium text-blue-600">{item.suggestedQuantity} units</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Vendor:</span>
                        <p className="font-medium">{item.vendor}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm text-gray-600">
                      <div>SKU: {item.sku}</div>
                      <div>Avg Sales: {item.avgSalesPerWeek}/week</div>
                      <div>Accuracy: {item.forecastAccuracy}%</div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <Button 
                      size="sm" 
                      onClick={() => handleCreatePO(item)}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Create PO
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleIgnoreSuggestion(item.sku)}
                    >
                      Ignore
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Create PO Dialog */}
      <Dialog open={isCreatePOOpen} onOpenChange={setIsCreatePOOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create Purchase Order</DialogTitle>
          </DialogHeader>
          {selectedItem && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Product</Label>
                  <Input value={selectedItem.productName} disabled />
                </div>
                <div>
                  <Label>SKU</Label>
                  <Input value={selectedItem.sku} disabled />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Vendor</Label>
                  <Input value={selectedItem.vendor} disabled />
                </div>
                <div>
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input 
                    id="quantity"
                    type="number" 
                    defaultValue={selectedItem.suggestedQuantity}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="unitPrice">Unit Price (₹)</Label>
                  <Input id="unitPrice" type="number" placeholder="Enter unit price" />
                </div>
                <div>
                  <Label htmlFor="expectedDate">Expected Delivery</Label>
                  <Input id="expectedDate" type="date" />
                </div>
              </div>
              <div>
                <Label htmlFor="notes">Notes</Label>
                <Input id="notes" placeholder="Additional notes..." />
              </div>
            </div>
          )}
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setIsCreatePOOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmitPO}>
              Create PO
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
