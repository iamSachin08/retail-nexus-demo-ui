import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  ShoppingBag, 
  Star, 
  Edit, 
  Eye, 
  MessageCircle,
  ArrowLeft,
  Package,
  CreditCard,
  Gift,
  Brain,
  RotateCcw,
  Ticket,
  Plus,
  Download,
  Filter
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CustomerDetailsProps {
  customerId: string;
}

export function CustomerDetails({ customerId }: CustomerDetailsProps) {
  const { toast } = useToast();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateTicketOpen, setIsCreateTicketOpen] = useState(false);

  // Mock customer data
  const customer = {
    id: customerId,
    name: "Rajesh Kumar",
    mobile: "9876543210",
    email: "rajesh.kumar@email.com",
    address: "123 MG Road, Bangalore",
    joinDate: "2023-05-15",
    totalOrders: 12,
    totalSpent: "₹1,85,000",
    loyaltyPoints: 1850,
    tier: "Gold",
    lastPurchase: "2024-01-20",
    preferences: ["Smartphones", "Laptops", "Gaming"],
    segmentScore: 85,
    status: "Active"
  };

  // Mock order history
  const orderHistory = [
    {
      id: "ORD-2024-001",
      date: "2024-01-20",
      items: ["iPhone 15 Pro 256GB", "AirPods Pro"],
      total: "₹1,25,000",
      status: "Delivered",
      rating: 5,
      feedback: "Excellent service and product quality"
    },
    {
      id: "ORD-2024-002", 
      date: "2024-01-15",
      items: ["Samsung Galaxy S24", "Wireless Charger"],
      total: "₹85,000",
      status: "Delivered",
      rating: 4,
      feedback: "Good experience, fast delivery"
    },
    {
      id: "ORD-2024-003",
      date: "2024-01-10", 
      items: ["MacBook Air M2"],
      total: "₹95,000",
      status: "Delivered",
      rating: 5,
      feedback: "Perfect laptop, highly recommended"
    }
  ];

  // Mock loyalty data
  const loyaltyData = {
    currentPoints: 1850,
    tier: "Gold",
    nextTier: "Platinum",
    pointsToNextTier: 150,
    availableOffers: [
      {
        id: "OFF-001",
        title: "10% off on Electronics",
        description: "Get 10% discount on all electronics",
        validUntil: "2024-02-15",
        pointsRequired: 500
      },
      {
        id: "OFF-002", 
        title: "Free Delivery",
        description: "Free delivery on orders above ₹5000",
        validUntil: "2024-02-28",
        pointsRequired: 200
      }
    ],
    pointHistory: [
      { date: "2024-01-20", points: 125, description: "Purchase - iPhone 15 Pro" },
      { date: "2024-01-15", points: 85, description: "Purchase - Samsung Galaxy S24" },
      { date: "2024-01-10", points: 95, description: "Purchase - MacBook Air M2" }
    ]
  };

  // Mock AI recommendations
  const aiRecommendations = [
    {
      id: "REC-001",
      product: "iPad Pro 12.9",
      reason: "Based on your laptop purchase",
      confidence: 92,
      price: "₹89,000",
      category: "Tablets"
    },
    {
      id: "REC-002",
      product: "Sony WH-1000XM5",
      reason: "Popular with iPhone users",
      confidence: 88,
      price: "₹25,000", 
      category: "Audio"
    },
    {
      id: "REC-003",
      product: "Apple Watch Series 9",
      reason: "Complements your iPhone",
      confidence: 85,
      price: "₹35,000",
      category: "Wearables"
    }
  ];

  // Mock returns data
  const returnsData = [
    {
      id: "RET-001",
      orderId: "ORD-2024-004",
      product: "Samsung Galaxy Buds",
      reason: "Not satisfied with sound quality",
      status: "Approved",
      refundAmount: "₹8,000",
      date: "2024-01-18"
    },
    {
      id: "RET-002",
      orderId: "ORD-2024-005", 
      product: "iPhone Case",
      reason: "Wrong size received",
      status: "Processed",
      refundAmount: "₹1,500",
      date: "2024-01-12"
    }
  ];

  // Mock tickets data
  const ticketsData = [
    {
      id: "TKT-001",
      subject: "Delivery delay inquiry",
      status: "Resolved",
      priority: "Medium",
      createdDate: "2024-01-19",
      resolvedDate: "2024-01-20",
      category: "Delivery"
    },
    {
      id: "TKT-002",
      subject: "Product warranty question",
      status: "Open",
      priority: "Low", 
      createdDate: "2024-01-22",
      resolvedDate: null,
      category: "Warranty"
    }
  ];

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "Gold": return "bg-yellow-100 text-yellow-800";
      case "Silver": return "bg-gray-100 text-gray-800";
      case "Bronze": return "bg-orange-100 text-orange-800";
      case "Platinum": return "bg-purple-100 text-purple-800";
      default: return "bg-blue-100 text-blue-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800";
      case "Delivered": return "bg-green-100 text-green-800";
      case "Approved": return "bg-green-100 text-green-800";
      case "Resolved": return "bg-green-100 text-green-800";
      case "Open": return "bg-yellow-100 text-yellow-800";
      case "Processed": return "bg-blue-100 text-blue-800";
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Customer Details</h1>
            <p className="text-gray-600">Complete customer profile and history</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <Edit className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
        </div>
      </div>

      {/* Customer Info Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <User className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{customer.name}</h2>
                <p className="text-gray-600">{customer.id}</p>
                <div className="flex gap-2 mt-2">
                  <Badge className={getTierColor(customer.tier)}>
                    {customer.tier} Tier
                  </Badge>
                  <Badge className={getStatusColor(customer.status)}>
                    {customer.status}
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gray-400" />
                <span className="text-sm">{customer.mobile}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-400" />
                <span className="text-sm truncate">{customer.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span className="text-sm">Joined {customer.joinDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-4 w-4 text-gray-400" />
                <span className="text-sm">{customer.totalOrders} orders</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="orders" className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5">
          <TabsTrigger value="orders">Order History</TabsTrigger>
          <TabsTrigger value="loyalty">Loyalty & Offers</TabsTrigger>
          <TabsTrigger value="recommendations">AI Recommendations</TabsTrigger>
          <TabsTrigger value="returns">Returns & Refunds</TabsTrigger>
          <TabsTrigger value="tickets">Support Tickets</TabsTrigger>
        </TabsList>
        
        <TabsContent value="orders" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Order History & Feedback
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orderHistory.map((order) => (
                  <div key={order.id} className="p-4 border rounded-lg">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{order.id}</h4>
                          <Badge className={getStatusColor(order.status)}>
                            {order.status}
                          </Badge>
                          <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }, (_, i) => (
                              <Star 
                                key={i} 
                                className={`h-4 w-4 ${i < order.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                              />
                            ))}
                          </div>
                        </div>
                        <div className="text-sm text-gray-600">
                          <div>Date: {order.date}</div>
                          <div>Items: {order.items.join(", ")}</div>
                          <div>Total: {order.total}</div>
                          {order.feedback && (
                            <div className="mt-2 p-2 bg-gray-50 rounded">
                              <span className="font-medium">Feedback:</span> {order.feedback}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                        <Button variant="outline" size="sm">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Contact
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="loyalty" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gift className="h-5 w-5" />
                Loyalty & Offers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Loyalty Summary */}
                <div className="space-y-4">
                  <h4 className="font-semibold">Loyalty Summary</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{loyaltyData.currentPoints}</div>
                      <div className="text-sm text-blue-700">Current Points</div>
                    </div>
                    <div className="p-4 bg-yellow-50 rounded-lg">
                      <div className="text-2xl font-bold text-yellow-600">{loyaltyData.tier}</div>
                      <div className="text-sm text-yellow-700">Current Tier</div>
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-600">Points to {loyaltyData.nextTier}: {loyaltyData.pointsToNextTier}</div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div 
                        className="bg-yellow-500 h-2 rounded-full" 
                        style={{ width: `${((loyaltyData.currentPoints - (loyaltyData.currentPoints - loyaltyData.pointsToNextTier)) / loyaltyData.currentPoints) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Available Offers */}
                <div className="space-y-4">
                  <h4 className="font-semibold">Available Offers</h4>
                  <div className="space-y-3">
                    {loyaltyData.availableOffers.map((offer) => (
                      <div key={offer.id} className="p-3 border rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <h5 className="font-medium">{offer.title}</h5>
                            <p className="text-sm text-gray-600">{offer.description}</p>
                            <p className="text-xs text-gray-500">Valid until: {offer.validUntil}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium">{offer.pointsRequired} pts</div>
                            <Button size="sm" className="mt-1">
                              Redeem
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="recommendations" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                AI-Based Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {aiRecommendations.map((rec) => (
                  <div key={rec.id} className="p-4 border rounded-lg">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{rec.product}</h4>
                          <Badge variant="outline">{rec.category}</Badge>
                          <div className="text-sm text-gray-600">
                            Confidence: {rec.confidence}%
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">{rec.reason}</p>
                        <div className="text-lg font-semibold text-blue-600">{rec.price}</div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View Product
                        </Button>
                        <Button size="sm">
                          <ShoppingBag className="h-4 w-4 mr-2" />
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="returns" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <RotateCcw className="h-5 w-5" />
                Returns & Refunds
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {returnsData.map((ret) => (
                  <div key={ret.id} className="p-4 border rounded-lg">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{ret.id}</h4>
                          <Badge className={getStatusColor(ret.status)}>
                            {ret.status}
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-600">
                          <div>Order: {ret.orderId}</div>
                          <div>Product: {ret.product}</div>
                          <div>Reason: {ret.reason}</div>
                          <div>Date: {ret.date}</div>
                          <div className="font-medium">Refund: {ret.refundAmount}</div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                        <Button variant="outline" size="sm">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Contact
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tickets" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Ticket className="h-5 w-5" />
                  Support Tickets
                </CardTitle>
                <Dialog open={isCreateTicketOpen} onOpenChange={setIsCreateTicketOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Create Ticket
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create Support Ticket</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="subject">Subject</Label>
                        <Input id="subject" placeholder="Enter ticket subject" />
                      </div>
                      <div>
                        <Label htmlFor="category">Category</Label>
                        <select className="w-full p-2 border rounded-lg">
                          <option>Delivery</option>
                          <option>Warranty</option>
                          <option>Product</option>
                          <option>Payment</option>
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="priority">Priority</Label>
                        <select className="w-full p-2 border rounded-lg">
                          <option>Low</option>
                          <option>Medium</option>
                          <option>High</option>
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" placeholder="Describe your issue..." />
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setIsCreateTicketOpen(false)}>
                          Cancel
                        </Button>
                        <Button>Create Ticket</Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {ticketsData.map((ticket) => (
                  <div key={ticket.id} className="p-4 border rounded-lg">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{ticket.id}</h4>
                          <Badge className={getStatusColor(ticket.status)}>
                            {ticket.status}
                          </Badge>
                          <Badge className={getPriorityColor(ticket.priority)}>
                            {ticket.priority}
                          </Badge>
                          <Badge variant="outline">{ticket.category}</Badge>
                        </div>
                        <div className="text-sm text-gray-600">
                          <div>Subject: {ticket.subject}</div>
                          <div>Created: {ticket.createdDate}</div>
                          {ticket.resolvedDate && (
                            <div>Resolved: {ticket.resolvedDate}</div>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                        <Button variant="outline" size="sm">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Reply
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 