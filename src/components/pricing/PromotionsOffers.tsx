import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Gift, 
  Search, 
  Filter, 
  Plus, 
  Eye, 
  Edit, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  Calendar,
  Percent,
  Tag,
  Users,
  Target
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PromotionsOffersProps {
  searchQuery: string;
}

export function PromotionsOffers({ searchQuery }: PromotionsOffersProps) {
  const { toast } = useToast();
  const [isCreatePromotionOpen, setIsCreatePromotionOpen] = useState(false);
  const [isProductSearchOpen, setIsProductSearchOpen] = useState(false);
  const [selectedPromotion, setSelectedPromotion] = useState<any>(null);
  const [productSearchQuery, setProductSearchQuery] = useState("");

  // Mock promotions data
  const promotions = [
    {
      id: "PROM-001",
      title: "Electronics Festival",
      description: "Up to 30% off on all electronics",
      type: "Percentage Discount",
      discount: "30%",
      startDate: "2024-01-15",
      endDate: "2024-02-15",
      status: "Active",
      priority: "High",
      targetAudience: "All Customers",
      applicableProducts: ["Smartphones", "Laptops", "Tablets"],
      conditions: "Min purchase ₹5000",
      approvalStatus: "Approved",
      createdBy: "Marketing Team",
      createdAt: "2024-01-10"
    },
    {
      id: "PROM-002",
      title: "Student Special",
      description: "15% off for students with valid ID",
      type: "Percentage Discount",
      discount: "15%",
      startDate: "2024-01-20",
      endDate: "2024-03-20",
      status: "Active",
      priority: "Medium",
      targetAudience: "Students",
      applicableProducts: ["All Products"],
      conditions: "Valid student ID required",
      approvalStatus: "Approved",
      createdBy: "Store Manager",
      createdAt: "2024-01-18"
    },
    {
      id: "PROM-003",
      title: "Buy 2 Get 1 Free",
      description: "Buy any 2 accessories, get 1 free",
      type: "Buy X Get Y",
      discount: "Buy 2 Get 1",
      startDate: "2024-01-25",
      endDate: "2024-02-25",
      status: "Pending",
      priority: "Low",
      targetAudience: "All Customers",
      applicableProducts: ["Accessories"],
      conditions: "Valid on accessories only",
      approvalStatus: "Pending",
      createdBy: "Sales Team",
      createdAt: "2024-01-22"
    }
  ];

  // Mock products for search
  const products = [
    { id: "PROD-001", name: "iPhone 15 Pro", category: "Smartphones", currentPrice: "₹1,25,000", applicablePromotions: ["PROM-001"] },
    { id: "PROD-002", name: "Samsung Galaxy S24", category: "Smartphones", currentPrice: "₹85,000", applicablePromotions: ["PROM-001", "PROM-002"] },
    { id: "PROD-003", name: "MacBook Air M2", category: "Laptops", currentPrice: "₹95,000", applicablePromotions: ["PROM-001"] },
    { id: "PROD-004", name: "AirPods Pro", category: "Accessories", currentPrice: "₹25,000", applicablePromotions: ["PROM-003"] },
    { id: "PROD-005", name: "iPad Pro", category: "Tablets", currentPrice: "₹89,000", applicablePromotions: ["PROM-001", "PROM-002"] }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800";
      case "Pending": return "bg-yellow-100 text-yellow-800";
      case "Expired": return "bg-red-100 text-red-800";
      case "Draft": return "bg-gray-100 text-gray-800";
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

  const getApprovalColor = (status: string) => {
    switch (status) {
      case "Approved": return "bg-green-100 text-green-800";
      case "Pending": return "bg-yellow-100 text-yellow-800";
      case "Rejected": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Percentage Discount": return "bg-blue-100 text-blue-800";
      case "Buy X Get Y": return "bg-purple-100 text-purple-800";
      case "Fixed Discount": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredPromotions = promotions.filter(promotion => 
    promotion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    promotion.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    promotion.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(productSearchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(productSearchQuery.toLowerCase()) ||
    product.id.toLowerCase().includes(productSearchQuery.toLowerCase())
  );

  const handleCreatePromotion = (formData: any) => {
    toast({
      title: "Promotion Created",
      description: "New promotion has been created successfully",
    });
    setIsCreatePromotionOpen(false);
  };

  const handleApprovePromotion = (promotionId: string) => {
    toast({
      title: "Promotion Approved",
      description: `Promotion ${promotionId} has been approved`,
    });
  };

  const handleRejectPromotion = (promotionId: string) => {
    toast({
      title: "Promotion Rejected",
      description: `Promotion ${promotionId} has been rejected`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Action Buttons */}
      <div className="flex gap-4">
        <Dialog open={isCreatePromotionOpen} onOpenChange={setIsCreatePromotionOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Create Promotion
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Promotion</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Promotion Title</Label>
                  <Input id="title" placeholder="Enter promotion title" />
                </div>
                <div>
                  <Label htmlFor="type">Promotion Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Percentage Discount</SelectItem>
                      <SelectItem value="fixed">Fixed Discount</SelectItem>
                      <SelectItem value="buyxgety">Buy X Get Y</SelectItem>
                      <SelectItem value="cashback">Cashback</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Enter promotion description" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="discount">Discount Value</Label>
                  <Input id="discount" placeholder="e.g., 30% or ₹500" />
                </div>
                <div>
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input id="startDate" type="date" />
                </div>
                <div>
                  <Label htmlFor="endDate">End Date</Label>
                  <Input id="endDate" type="date" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="targetAudience">Target Audience</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select audience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Customers</SelectItem>
                      <SelectItem value="students">Students</SelectItem>
                      <SelectItem value="seniors">Senior Citizens</SelectItem>
                      <SelectItem value="new">New Customers</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="conditions">Terms & Conditions</Label>
                <Textarea id="conditions" placeholder="Enter terms and conditions" />
              </div>
              
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsCreatePromotionOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => handleCreatePromotion({})}>
                  Create Promotion
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        
        <Dialog open={isProductSearchOpen} onOpenChange={setIsProductSearchOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Search className="h-4 w-4 mr-2" />
              Search Product Promotions
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Search Product Promotions</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="productSearch">Search Products</Label>
                <Input 
                  id="productSearch"
                  placeholder="Search by product name, category, or SKU..."
                  value={productSearchQuery}
                  onChange={(e) => setProductSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{product.name}</h4>
                        <p className="text-sm text-gray-600">{product.category}</p>
                        <p className="text-sm font-medium">{product.currentPrice}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-600">Applicable Promotions:</div>
                        <div className="space-y-1 mt-1">
                          {product.applicablePromotions.map((promoId) => {
                            const promo = promotions.find(p => p.id === promoId);
                            return promo ? (
                              <Badge key={promoId} className={getStatusColor(promo.status)}>
                                {promo.title}
                              </Badge>
                            ) : null;
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Promotions List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="h-5 w-5" />
            Active Promotions & Offers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredPromotions.map((promotion) => (
              <div key={promotion.id} className="p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <h4 className="font-medium text-gray-900">{promotion.title}</h4>
                      <div className="flex gap-2">
                        <Badge className={getStatusColor(promotion.status)}>
                          {promotion.status}
                        </Badge>
                        <Badge className={getPriorityColor(promotion.priority)}>
                          {promotion.priority}
                        </Badge>
                        <Badge className={getTypeColor(promotion.type)}>
                          {promotion.type}
                        </Badge>
                        <Badge className={getApprovalColor(promotion.approvalStatus)}>
                          {promotion.approvalStatus}
                        </Badge>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600">{promotion.description}</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Discount:</span>
                        <div className="font-medium text-green-600">{promotion.discount}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Duration:</span>
                        <div className="font-medium">{promotion.startDate} to {promotion.endDate}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Target:</span>
                        <div className="font-medium">{promotion.targetAudience}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Created:</span>
                        <div className="font-medium">{promotion.createdAt}</div>
                      </div>
                    </div>
                    
                    <div>
                      <span className="text-sm text-gray-600">Applicable Products: </span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {promotion.applicableProducts.map((product, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {product}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    {promotion.conditions && (
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">Conditions:</span> {promotion.conditions}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    {promotion.approvalStatus === "Pending" && (
                      <>
                        <Button 
                          size="sm" 
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => handleApprovePromotion(promotion.id)}
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Approve
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="border-red-200 text-red-600 hover:bg-red-50"
                          onClick={() => handleRejectPromotion(promotion.id)}
                        >
                          <AlertTriangle className="h-4 w-4 mr-2" />
                          Reject
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {filteredPromotions.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No promotions found matching your search criteria.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 