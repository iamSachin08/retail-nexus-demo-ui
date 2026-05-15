
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { 
  Package2, 
  Plus, 
  Search,
  Eye,
  CheckCircle,
  AlertTriangle,
  Clock
} from "lucide-react";

export function ConsumablesPosting() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const consumables = [
    {
      id: "CNS001",
      itemName: "Printer Ink Cartridge HP 805",
      category: "Office Supplies",
      quantity: 2,
      unitCost: 450,
      department: "Sales Floor",
      usedBy: "Store Associate",
      postingDate: "2024-01-24",
      reason: "Customer demo printing"
    },
    {
      id: "CNS002",
      itemName: "Cleaning Spray - Glass Cleaner",
      category: "Maintenance",
      quantity: 1,
      unitCost: 125,
      department: "Store Maintenance",
      usedBy: "Housekeeping Staff",
      postingDate: "2024-01-23",
      reason: "Daily store cleaning"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Actions Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search consumables by item or department..."
            className="pl-10"
          />
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Post Consumable
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Post Consumable Usage</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="itemName">Item Name</Label>
                <Input id="itemName" placeholder="Enter item name" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input id="quantity" type="number" placeholder="0" />
                </div>
                <div>
                  <Label htmlFor="unitCost">Unit Cost (₹)</Label>
                  <Input id="unitCost" type="number" placeholder="0" />
                </div>
              </div>
              
              <div>
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="office-supplies">Office Supplies</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="packaging">Packaging Materials</SelectItem>
                    <SelectItem value="cleaning">Cleaning Supplies</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="department">Department</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sales-floor">Sales Floor</SelectItem>
                    <SelectItem value="warehouse">Warehouse</SelectItem>
                    <SelectItem value="customer-service">Customer Service</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="reason">Usage Reason</Label>
                <Textarea id="reason" placeholder="Enter reason for usage..." />
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button onClick={() => setIsCreateDialogOpen(false)} className="flex-1">
                  Post Usage
                </Button>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Consumables Usage List */}
      <div className="space-y-4">
        {consumables.map((item) => (
          <Card key={item.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 md:p-6">
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                    <h3 className="font-semibold text-lg">{item.id}</h3>
                    <Badge variant="secondary">{item.category}</Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <div>
                      <p className="text-sm text-gray-600">Item: {item.itemName}</p>
                      <p className="font-medium">Qty: {item.quantity} | Cost: ₹{item.unitCost}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Department: {item.department}</p>
                      <p className="font-medium">Used by: {item.usedBy}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 text-sm text-gray-500">
                    <span>Posted: {item.postingDate}</span>
                    <span>Total Cost: ₹{item.quantity * item.unitCost}</span>
                  </div>
                  
                  <div className="mt-2">
                    <p className="text-sm text-gray-600">Reason: {item.reason}</p>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                  <Button size="sm" variant="outline">
                    <Package2 className="h-4 w-4 mr-2" />
                    Edit Entry
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
