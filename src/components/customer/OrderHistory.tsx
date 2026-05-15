import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Package, Calendar, CreditCard, Star, Eye, RefreshCw, ArrowLeft } from "lucide-react";

interface OrderHistoryProps {
  searchQuery: string;
}

export function OrderHistory({ searchQuery }: OrderHistoryProps) {
  const orders = [
    {
      id: "ORD-2024-001",
      customerName: "Rajesh Kumar",
      customerId: "CUST-2024-001",
      orderDate: "2024-01-20",
      items: [
        { name: "iPhone 15 Pro", quantity: 1, price: "₹1,29,900" },
        { name: "AirPods Pro", quantity: 1, price: "₹24,900" }
      ],
      totalAmount: "₹1,54,800",
      paymentMode: "Credit Card",
      status: "Delivered",
      deliveryDate: "2024-01-22",
      feedback: { rating: 5, comment: "Excellent service and fast delivery!" }
    },
    {
      id: "ORD-2024-002",
      customerName: "Priya Singh",
      customerId: "CUST-2024-002",
      orderDate: "2024-01-18",
      items: [
        { name: "Samsung 55\" 4K Smart TV", quantity: 1, price: "₹65,000" },
        { name: "Soundbar", quantity: 1, price: "₹15,000" }
      ],
      totalAmount: "₹80,000",
      paymentMode: "EMI",
      status: "Delivered",
      deliveryDate: "2024-01-20",
      feedback: { rating: 4, comment: "Good product, installation was smooth." }
    },
    {
      id: "ORD-2024-003",
      customerName: "Amit Sharma",
      customerId: "CUST-2024-003",
      orderDate: "2024-01-15",
      items: [
        { name: "Dell Laptop", quantity: 1, price: "₹75,000" }
      ],
      totalAmount: "₹75,000",
      paymentMode: "Paper Finance",
      status: "In Transit",
      deliveryDate: "2024-01-25",
      feedback: null
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered": return "bg-green-100 text-green-800";
      case "In Transit": return "bg-blue-100 text-blue-800";
      case "Processing": return "bg-yellow-100 text-yellow-800";
      case "Cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPaymentModeColor = (mode: string) => {
    switch (mode) {
      case "Credit Card": return "bg-purple-100 text-purple-800";
      case "EMI": return "bg-orange-100 text-orange-800";
      case "Paper Finance": return "bg-blue-100 text-blue-800";
      case "Cash": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} />
    ));
  };

  const filteredOrders = orders.filter(order => 
    order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.customerId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {filteredOrders.map((order) => (
        <Card key={order.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex-1 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-full">
                      <Package className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{order.id}</h3>
                      <p className="text-sm text-gray-600">{order.customerName}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Badge className={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                    <Badge className={getPaymentModeColor(order.paymentMode)}>
                      {order.paymentMode}
                    </Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Order Date:</span>
                    <div className="font-medium flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {order.orderDate}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600">Total Amount:</span>
                    <div className="font-medium">{order.totalAmount}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Items:</span>
                    <div className="font-medium">{order.items.length} item(s)</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Delivery Date:</span>
                    <div className="font-medium">{order.deliveryDate}</div>
                  </div>
                </div>
                
                <div>
                  <span className="text-sm text-gray-600">Items: </span>
                  <div className="mt-1">
                    {order.items.slice(0, 2).map((item, index) => (
                      <div key={index} className="text-sm text-gray-900">
                        {item.name} (Qty: {item.quantity}) - {item.price}
                      </div>
                    ))}
                    {order.items.length > 2 && (
                      <div className="text-sm text-gray-500">
                        +{order.items.length - 2} more items
                      </div>
                    )}
                  </div>
                </div>
                
                {order.feedback && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Rating:</span>
                    <div className="flex gap-1">
                      {renderStars(order.feedback.rating)}
                    </div>
                    <span className="text-sm text-gray-900">({order.feedback.rating}/5)</span>
                  </div>
                )}
              </div>
              
              <div className="flex flex-col sm:flex-row lg:flex-col gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl">
                    <DialogHeader>
                      <DialogTitle>Order Details - {order.id}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Order Information</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Order ID:</span>
                              <span>{order.id}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Customer:</span>
                              <span>{order.customerName}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Order Date:</span>
                              <span>{order.orderDate}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Status:</span>
                              <Badge className={getStatusColor(order.status)}>
                                {order.status}
                              </Badge>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Payment Mode:</span>
                              <Badge className={getPaymentModeColor(order.paymentMode)}>
                                {order.paymentMode}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Delivery Information</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Delivery Date:</span>
                              <span>{order.deliveryDate}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Total Amount:</span>
                              <span className="font-medium">{order.totalAmount}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Order Items</h4>
                        <div className="space-y-3">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                              <div>
                                <div className="font-medium">{item.name}</div>
                                <div className="text-sm text-gray-600">Quantity: {item.quantity}</div>
                              </div>
                              <div className="font-medium">{item.price}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {order.feedback && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Customer Feedback</h4>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-600">Rating:</span>
                              <div className="flex gap-1">
                                {renderStars(order.feedback.rating)}
                              </div>
                              <span className="text-sm">({order.feedback.rating}/5)</span>
                            </div>
                            <div>
                              <span className="text-sm text-gray-600">Comment:</span>
                              <p className="text-sm mt-1 p-2 bg-gray-50 rounded">{order.feedback.comment}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
                
                <Button variant="outline" size="sm">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Reorder
                </Button>
                
                {order.status === "Delivered" && (
                  <Button variant="outline" size="sm">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Return
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      
      {filteredOrders.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Orders Found</h3>
            <p className="text-gray-500">No order history matches your search criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
