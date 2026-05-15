import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Edit, 
  Eye, 
  MoreVertical, 
  Plus, 
  Trash2, 
  Package, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  Filter,
  Download,
  Upload,
  Search,
  BarChart3
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface StockOverviewProps {
  searchQuery: string;
}

export function StockOverview({ searchQuery }: StockOverviewProps) {
  const { toast } = useToast();
  const [isAddItemOpen, setIsAddItemOpen] = useState(false);
  const [isEditItemOpen, setIsEditItemOpen] = useState(false);
  const [isViewDetailsOpen, setIsViewDetailsOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [filterBrand, setFilterBrand] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const stockData = [
    {
      sku: "SAM-TV-55-4K-001",
      brand: "Samsung",
      category: "Television",
      name: "Samsung 55\" 4K Smart TV",
      currentStock: 15,
      minStock: 5,
      maxStock: 50,
      value: "₹45,000",
      status: "In Stock",
      lastUpdated: "2 hours ago",
      description: "4K Ultra HD Smart TV with HDR",
      location: "Warehouse A - Shelf 12",
      supplier: "Samsung Electronics",
      reorderPoint: 5,
      leadTime: "3-5 days",
      costPrice: "₹38,000",
      sellingPrice: "₹45,000",
      margin: "18.4%"
    },
    {
      sku: "LG-REF-450L-002",
      brand: "LG",
      category: "Refrigerator",
      name: "LG 450L Double Door Refrigerator",
      currentStock: 3,
      minStock: 5,
      maxStock: 25,
      value: "₹35,000",
      status: "Low Stock",
      lastUpdated: "1 hour ago",
      description: "Double door refrigerator with smart features",
      location: "Warehouse B - Shelf 8",
      supplier: "LG Electronics",
      reorderPoint: 5,
      leadTime: "2-4 days",
      costPrice: "₹29,000",
      sellingPrice: "₹35,000",
      margin: "20.7%"
    },
    {
      sku: "SON-HT-5.1-003",
      brand: "Sony",
      category: "Home Theater",
      name: "Sony 5.1 Home Theater System",
      currentStock: 8,
      minStock: 3,
      maxStock: 20,
      value: "₹25,000",
      status: "In Stock",
      lastUpdated: "3 hours ago",
      description: "5.1 channel surround sound system",
      location: "Warehouse A - Shelf 15",
      supplier: "Sony India",
      reorderPoint: 3,
      leadTime: "1-3 days",
      costPrice: "₹20,000",
      sellingPrice: "₹25,000",
      margin: "25%"
    },
    {
      sku: "WHI-WM-7KG-004",
      brand: "Whirlpool",
      category: "Washing Machine",
      name: "Whirlpool 7kg Front Load",
      currentStock: 0,
      minStock: 2,
      maxStock: 15,
      value: "₹28,000",
      status: "Out of Stock",
      lastUpdated: "5 hours ago",
      description: "Front load washing machine with 7kg capacity",
      location: "Warehouse B - Shelf 5",
      supplier: "Whirlpool India",
      reorderPoint: 2,
      leadTime: "4-6 days",
      costPrice: "₹23,000",
      sellingPrice: "₹28,000",
      margin: "21.7%"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Stock": return "bg-green-100 text-green-800";
      case "Low Stock": return "bg-yellow-100 text-yellow-800";
      case "Out of Stock": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "In Stock": return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "Low Stock": return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case "Out of Stock": return <XCircle className="h-4 w-4 text-red-600" />;
      default: return <Package className="h-4 w-4 text-gray-600" />;
    }
  };

  const filteredData = stockData.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesBrand = !filterBrand || filterBrand === "all" || item.brand === filterBrand;
    const matchesCategory = !filterCategory || filterCategory === "all" || item.category === filterCategory;
    const matchesStatus = !filterStatus || filterStatus === "all" || item.status === filterStatus;
    
    return matchesSearch && matchesBrand && matchesCategory && matchesStatus;
  });

  const handleAddItem = (formData: any) => {
    toast({
      title: "Item Added",
      description: "New inventory item has been added successfully",
    });
    setIsAddItemOpen(false);
  };

  const handleEditItem = (formData: any) => {
    toast({
      title: "Item Updated",
      description: "Inventory item has been updated successfully",
    });
    setIsEditItemOpen(false);
  };

  const handleDeleteItem = (sku: string) => {
    toast({
      title: "Item Deleted",
      description: `Item ${sku} has been deleted successfully`,
    });
    setIsDeleteConfirmOpen(false);
  };

  const handleReorder = (sku: string) => {
    toast({
      title: "Reorder Requested",
      description: `Reorder request for ${sku} has been submitted`,
    });
  };

  const uniqueBrands = [...new Set(stockData.map(item => item.brand))];
  const uniqueCategories = [...new Set(stockData.map(item => item.category))];
  const uniqueStatuses = [...new Set(stockData.map(item => item.status))];

  return (
    <div className="space-y-6">
      {/* Action Buttons and Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex gap-2">
          <Dialog open={isAddItemOpen} onOpenChange={setIsAddItemOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Inventory Item</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="sku">SKU</Label>
                    <Input id="sku" placeholder="Enter SKU" />
                  </div>
                  <div>
                    <Label htmlFor="name">Product Name</Label>
                    <Input id="name" placeholder="Enter product name" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="brand">Brand</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select brand" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="samsung">Samsung</SelectItem>
                        <SelectItem value="lg">LG</SelectItem>
                        <SelectItem value="sony">Sony</SelectItem>
                        <SelectItem value="whirlpool">Whirlpool</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="television">Television</SelectItem>
                        <SelectItem value="refrigerator">Refrigerator</SelectItem>
                        <SelectItem value="home-theater">Home Theater</SelectItem>
                        <SelectItem value="washing-machine">Washing Machine</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Enter product description" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="currentStock">Current Stock</Label>
                    <Input id="currentStock" type="number" placeholder="0" />
                  </div>
                  <div>
                    <Label htmlFor="minStock">Min Stock</Label>
                    <Input id="minStock" type="number" placeholder="0" />
                  </div>
                  <div>
                    <Label htmlFor="maxStock">Max Stock</Label>
                    <Input id="maxStock" type="number" placeholder="0" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="costPrice">Cost Price</Label>
                    <Input id="costPrice" placeholder="₹0" />
                  </div>
                  <div>
                    <Label htmlFor="sellingPrice">Selling Price</Label>
                    <Input id="sellingPrice" placeholder="₹0" />
                  </div>
                </div>
                
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsAddItemOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => handleAddItem({})}>
                    Add Item
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
        
        <div className="flex gap-2">
          <Select value={filterBrand} onValueChange={setFilterBrand}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by Brand" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Brands</SelectItem>
              {uniqueBrands.map(brand => (
                <SelectItem key={brand} value={brand}>{brand}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {uniqueCategories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              {uniqueStatuses.map(status => (
                <SelectItem key={status} value={status}>{status}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Stock Items List */}
      <div className="space-y-4">
        {filteredData.map((item) => (
          <Card key={item.sku} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(item.status)}
                      <h3 className="font-semibold text-gray-900">{item.name}</h3>
                    </div>
                    <Badge className={getStatusColor(item.status)}>
                      {item.status}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm text-gray-600">
                    <div>
                      <span className="font-medium">SKU:</span> {item.sku}
                    </div>
                    <div>
                      <span className="font-medium">Brand:</span> {item.brand}
                    </div>
                    <div>
                      <span className="font-medium">Category:</span> {item.category}
                    </div>
                    <div>
                      <span className="font-medium">Value:</span> {item.value}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Current Stock:</span>
                      <span className="font-medium">{item.currentStock}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Min Stock:</span>
                      <span className="font-medium">{item.minStock}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Max Stock:</span>
                      <span className="font-medium">{item.maxStock}</span>
                    </div>
                  </div>
                  
                  <p className="text-xs text-gray-500">Last updated: {item.lastUpdated}</p>
                </div>
                
                <div className="flex flex-col gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setSelectedItem(item)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl">
                      <DialogHeader>
                        <DialogTitle>Item Details - {item.name}</DialogTitle>
                      </DialogHeader>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold mb-2">Basic Information</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-600">SKU:</span>
                                <span>{item.sku}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Brand:</span>
                                <span>{item.brand}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Category:</span>
                                <span>{item.category}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Description:</span>
                                <span>{item.description}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold mb-2">Stock Information</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-600">Current Stock:</span>
                                <span>{item.currentStock}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Min Stock:</span>
                                <span>{item.minStock}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Max Stock:</span>
                                <span>{item.maxStock}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Location:</span>
                                <span>{item.location}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold mb-2">Pricing Information</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-600">Cost Price:</span>
                                <span>{item.costPrice}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Selling Price:</span>
                                <span>{item.sellingPrice}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Margin:</span>
                                <span className="text-green-600">{item.margin}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold mb-2">Supplier Information</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-600">Supplier:</span>
                                <span>{item.supplier}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Lead Time:</span>
                                <span>{item.leadTime}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Reorder Point:</span>
                                <span>{item.reorderPoint}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            <Button 
                              size="sm"
                              onClick={() => handleReorder(item.sku)}
                              disabled={item.currentStock > item.reorderPoint}
                            >
                              <Package className="h-4 w-4 mr-2" />
                              Reorder
                            </Button>
                            <Button variant="outline" size="sm">
                              <BarChart3 className="h-4 w-4 mr-2" />
                              View Analytics
                            </Button>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      setSelectedItem(item);
                      setIsEditItemOpen(true);
                    }}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleReorder(item.sku)}
                    disabled={item.currentStock > item.reorderPoint}
                  >
                    <Package className="h-4 w-4 mr-2" />
                    Reorder
                  </Button>
                  
                  <Dialog open={isDeleteConfirmOpen} onOpenChange={setIsDeleteConfirmOpen}>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="border-red-200 text-red-600 hover:bg-red-50"
                        onClick={() => setSelectedItem(item)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Confirm Deletion</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <p>Are you sure you want to delete "{selectedItem?.name}"?</p>
                        <p className="text-sm text-gray-600">This action cannot be undone.</p>
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" onClick={() => setIsDeleteConfirmOpen(false)}>
                            Cancel
                          </Button>
                          <Button 
                            className="bg-red-600 hover:bg-red-700"
                            onClick={() => handleDeleteItem(selectedItem?.sku)}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {filteredData.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No items found matching your search criteria.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
