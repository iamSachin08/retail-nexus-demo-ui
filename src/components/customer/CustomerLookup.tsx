import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { User, Phone, Mail, MapPin, Calendar, ShoppingBag, Star, Edit, Eye, MessageCircle } from "lucide-react";

interface CustomerLookupProps {
  searchQuery: string;
}

export function CustomerLookup({ searchQuery }: CustomerLookupProps) {
  const customers = [
    {
      id: "CUST-2024-001",
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
    },
    {
      id: "CUST-2024-002",
      name: "Priya Singh",
      mobile: "9876543211",
      email: "priya.singh@email.com",
      address: "456 Park Street, Delhi",
      joinDate: "2023-08-22",
      totalOrders: 8,
      totalSpent: "₹95,000",
      loyaltyPoints: 950,
      tier: "Silver",
      lastPurchase: "2024-01-18",
      preferences: ["Home Appliances", "Smart TV", "Audio"],
      segmentScore: 72,
      status: "Active"
    },
    {
      id: "CUST-2024-003",
      name: "Amit Sharma",
      mobile: "9876543212",
      email: "amit.sharma@email.com",
      address: "789 Main Street, Mumbai",
      joinDate: "2023-12-10",
      totalOrders: 3,
      totalSpent: "₹45,000",
      loyaltyPoints: 450,
      tier: "Bronze",
      lastPurchase: "2024-01-15",
      preferences: ["Smartphones", "Accessories"],
      segmentScore: 58,
      status: "New"
    }
  ];

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "Gold": return "bg-yellow-100 text-yellow-800";
      case "Silver": return "bg-gray-100 text-gray-800";
      case "Bronze": return "bg-orange-100 text-orange-800";
      default: return "bg-blue-100 text-blue-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800";
      case "New": return "bg-blue-100 text-blue-800";
      case "Inactive": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.mobile.includes(searchQuery) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {filteredCustomers.map((customer) => (
        <Card key={customer.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex-1 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-full">
                      <User className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{customer.name}</h3>
                      <p className="text-sm text-gray-600">{customer.id}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Badge className={getTierColor(customer.tier)}>
                      {customer.tier}
                    </Badge>
                    <Badge className={getStatusColor(customer.status)}>
                      {customer.status}
                    </Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="h-4 w-4" />
                    <span>{customer.mobile}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="h-4 w-4" />
                    <span className="truncate">{customer.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span className="truncate">{customer.address}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Total Orders:</span>
                    <div className="font-medium">{customer.totalOrders}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Total Spent:</span>
                    <div className="font-medium">{customer.totalSpent}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Loyalty Points:</span>
                    <div className="font-medium">{customer.loyaltyPoints}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Segment Score:</span>
                    <div className="font-medium flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-500" />
                      {customer.segmentScore}
                    </div>
                  </div>
                </div>
                
                <div>
                  <span className="text-sm text-gray-600">Preferences: </span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {customer.preferences.map((pref, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {pref}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row lg:flex-col gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => window.location.href = `/customer/details/${customer.id}`}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Quick Chat
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Quick Chat with {customer.name}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="h-64 bg-gray-50 rounded-lg p-4 overflow-y-auto">
                        <div className="space-y-3">
                          <div className="flex justify-end">
                            <div className="bg-blue-600 text-white p-3 rounded-lg max-w-xs">
                              <p className="text-sm">Hello! How can I help you today?</p>
                            </div>
                          </div>
                          <div className="flex justify-start">
                            <div className="bg-gray-200 p-3 rounded-lg max-w-xs">
                              <p className="text-sm">I have a question about my recent order</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          placeholder="Type your message..." 
                          className="flex-1 px-3 py-2 border rounded-lg"
                        />
                        <Button size="sm">Send</Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      
      {filteredCustomers.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Customers Found</h3>
            <p className="text-gray-500">No customers match your search criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
