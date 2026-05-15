
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { 
  Tag, 
  Plus, 
  Search,
  Calendar,
  Package,
  Percent
} from "lucide-react";

export function EOLTagging() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const eolItems = [
    {
      id: "EOL001",
      articleId: "TV001",
      articleName: "Samsung 43 inch Smart TV",
      brand: "Samsung",
      category: "Television",
      currentStock: 8,
      mrp: 45000,
      suggestedDiscount: 15,
      eolDate: "2024-02-15",
      reason: "New model launched",
      status: "active",
      totalValue: 360000
    },
    {
      id: "EOL002",
      articleId: "AC003",
      articleName: "LG 1 Ton Window AC",
      brand: "LG",
      category: "Air Conditioner",
      currentStock: 3,
      mrp: 28000,
      suggestedDiscount: 20,
      eolDate: "2024-01-31",
      reason: "Seasonal clearance",
      status: "active",
      totalValue: 84000
    },
    {
      id: "EOL003",
      articleId: "WM001",
      articleName: "Whirlpool Semi Automatic",
      brand: "Whirlpool",
      category: "Washing Machine",
      currentStock: 2,
      mrp: 18000,
      suggestedDiscount: 25,
      eolDate: "2024-01-20",
      reason: "Discontinued by brand",
      status: "expired",
      totalValue: 36000
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'expired': return 'destructive';
      case 'upcoming': return 'secondary';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      {/* Actions Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search EOL items by article or brand..."
            className="pl-10"
          />
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Tag EOL Item
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Tag End-of-Life Item</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="articleId">Article ID</Label>
                <Input id="articleId" placeholder="Enter article ID" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="currentStock">Current Stock</Label>
                  <Input id="currentStock" type="number" placeholder="0" />
                </div>
                <div>
                  <Label htmlFor="suggestedDiscount">Suggested Discount %</Label>
                  <Input id="suggestedDiscount" type="number" placeholder="0" />
                </div>
              </div>
              
              <div>
                <Label htmlFor="eolDate">EOL Date</Label>
                <Input id="eolDate" type="date" />
              </div>
              
              <div>
                <Label htmlFor="eolReason">EOL Reason</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select reason" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new-model">New model launched</SelectItem>
                    <SelectItem value="seasonal">Seasonal clearance</SelectItem>
                    <SelectItem value="discontinued">Discontinued by brand</SelectItem>
                    <SelectItem value="slow-moving">Slow moving stock</SelectItem>
                    <SelectItem value="damage">Damaged stock</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea id="notes" placeholder="Any additional information..." />
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button onClick={() => setIsCreateDialogOpen(false)} className="flex-1">
                  Tag Item
                </Button>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Tag className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Total EOL Items</p>
                <p className="text-2xl font-bold">24</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Package className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Stock Value</p>
                <p className="text-2xl font-bold">₹4.8L</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Percent className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">Avg Discount</p>
                <p className="text-2xl font-bold">18%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Calendar className="h-8 w-8 text-red-600" />
              <div>
                <p className="text-sm text-gray-600">Expiring Soon</p>
                <p className="text-2xl font-bold">6</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* EOL Items List */}
      <div className="space-y-4">
        {eolItems.map((item) => (
          <Card key={item.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 md:p-6">
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                    <h3 className="font-semibold text-lg">{item.id}</h3>
                    <Badge variant={getStatusColor(item.status)}>
                      {item.status}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <div>
                      <p className="text-sm text-gray-600">Article: {item.articleId}</p>
                      <p className="font-medium">{item.articleName}</p>
                      <p className="text-sm text-gray-500">{item.brand} | {item.category}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Stock: {item.currentStock} units</p>
                      <p className="font-medium">Total Value: ₹{item.totalValue.toLocaleString()}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3 p-3 bg-red-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-600">MRP</p>
                      <p className="font-semibold">₹{item.mrp.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Suggested Discount</p>
                      <p className="font-semibold text-red-600">{item.suggestedDiscount}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">EOL Date</p>
                      <p className="font-semibold">{item.eolDate}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 text-sm text-gray-500">
                    <span>Reason: {item.reason}</span>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button size="sm" variant="outline">
                    <Percent className="h-4 w-4 mr-2" />
                    Apply Discount
                  </Button>
                  <Button size="sm" variant="outline">
                    <Tag className="h-4 w-4 mr-2" />
                    Edit EOL
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
