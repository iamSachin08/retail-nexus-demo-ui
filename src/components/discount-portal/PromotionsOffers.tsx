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
                      <SelectItem value="buy-x-get-y">Buy X Get Y</SelectItem>
                      <SelectItem value="cashback">Cashback</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Enter promotion description" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <Label htmlFor="discount">Discount Value</Label>
                  <Input id="discount" placeholder="e.g., 30% or ₹500" />
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
              Search Products
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Search Products for Promotions</DialogTitle>
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
              
              <div className="max-h-60 overflow-y-auto">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="flex items-center justify-between p-3 border rounded-lg mb-2">
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-gray-600">{product.category} • {product.currentPrice}</p>
                    </div>
                    <div className="flex gap-2">
                      {product.applicablePromotions.map((promoId) => (
                        <Badge key={promoId} variant="outline" className="text-xs">
                          {promoId}
                        </Badge>
                      ))}
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
          <CardTitle>Active Promotions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredPromotions.map((promotion) => (
              <div key={promotion.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold">{promotion.title}</h3>
                      <Badge className={getStatusColor(promotion.status)}>
                        {promotion.status}
                      </Badge>
                      <Badge className={getPriorityColor(promotion.priority)}>
                        {promotion.priority}
                      </Badge>
                      <Badge className={getTypeColor(promotion.type)}>
                        {promotion.type}
                      </Badge>
                    </div>
                    
                    <p className="text-gray-600 mb-2">{promotion.description}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Discount:</span>
                        <span className="ml-1 font-medium">{promotion.discount}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Duration:</span>
                        <span className="ml-1">{promotion.startDate} - {promotion.endDate}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Target:</span>
                        <span className="ml-1">{promotion.targetAudience}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Approval:</span>
                        <Badge className={`ml-1 ${getApprovalColor(promotion.approvalStatus)}`}>
                          {promotion.approvalStatus}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <span className="text-gray-500 text-sm">Applicable Products:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {promotion.applicableProducts.map((product, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {product}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    {promotion.conditions && (
                      <div className="mt-3">
                        <span className="text-gray-500 text-sm">Conditions:</span>
                        <p className="text-sm mt-1">{promotion.conditions}</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-col gap-2 ml-4">
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    {promotion.approvalStatus === "Pending" && (
                      <>
                        <Button 
                          size="sm" 
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => handleApprovePromotion(promotion.id)}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => handleRejectPromotion(promotion.id)}
                        >
                          <AlertTriangle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </>
                    )}
                  </div>
                </div>
                
                <div className="mt-3 pt-3 border-t text-xs text-gray-500">
                  Created by {promotion.createdBy} on {promotion.createdAt}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 