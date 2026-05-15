
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Gift, Star, Calendar, Percent, Send, Eye, Award } from "lucide-react";

interface LoyaltyOffersProps {
  searchQuery: string;
}

export function LoyaltyOffers({ searchQuery }: LoyaltyOffersProps) {
  const loyaltyData = [
    {
      customerId: "CUST-2024-001",
      customerName: "Rajesh Kumar",
      tier: "Gold",
      points: 1850,
      nextTierPoints: 2500,
      availableOffers: [
        {
          id: "OFF-001",
          title: "10% Off on Smartphones",
          description: "Valid on all smartphone purchases above ₹50,000",
          discount: "10%",
          validTill: "2024-02-15",
          category: "Electronics",
          used: false
        },
        {
          id: "OFF-002",
          title: "Free Extended Warranty",
          description: "Get 1 year extended warranty on laptop purchases",
          discount: "Free Service",
          validTill: "2024-03-01",
          category: "Laptops",
          used: false
        }
      ],
      recentRedemptions: [
        {
          date: "2024-01-10",
          offer: "5% Cashback",
          pointsUsed: 500,
          savings: "₹2,500"
        }
      ]
    },
    {
      customerId: "CUST-2024-002",
      customerName: "Priya Singh",
      tier: "Silver",
      points: 950,
      nextTierPoints: 1500,
      availableOffers: [
        {
          id: "OFF-003",
          title: "₹500 Off on Home Appliances",
          description: "Flat discount on washing machines and refrigerators",
          discount: "₹500",
          validTill: "2024-02-20",
          category: "Home Appliances",
          used: false
        }
      ],
      recentRedemptions: [
        {
          date: "2024-01-05",
          offer: "Free Installation",
          pointsUsed: 200,
          savings: "₹1,000"
        }
      ]
    },
    {
      customerId: "CUST-2024-003",
      customerName: "Amit Sharma",
      tier: "Bronze",
      points: 450,
      nextTierPoints: 1000,
      availableOffers: [
        {
          id: "OFF-004",
          title: "Welcome Bonus",
          description: "5% off on your next purchase",
          discount: "5%",
          validTill: "2024-02-28",
          category: "All Categories",
          used: false
        }
      ],
      recentRedemptions: []
    }
  ];

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "Gold": return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "Silver": return "bg-gray-100 text-gray-800 border-gray-300";
      case "Bronze": return "bg-orange-100 text-orange-800 border-orange-300";
      default: return "bg-blue-100 text-blue-800 border-blue-300";
    }
  };

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case "Gold": return <Award className="h-4 w-4 text-yellow-600" />;
      case "Silver": return <Award className="h-4 w-4 text-gray-600" />;
      case "Bronze": return <Award className="h-4 w-4 text-orange-600" />;
      default: return <Star className="h-4 w-4 text-blue-600" />;
    }
  };

  const filteredData = loyaltyData.filter(data => 
    data.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    data.customerId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {filteredData.map((customer) => (
        <Card key={customer.customerId} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="space-y-6">
              {/* Customer Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-full">
                    <Gift className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{customer.customerName}</h3>
                    <p className="text-sm text-gray-600">{customer.customerId}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={`${getTierColor(customer.tier)} border`}>
                    {getTierIcon(customer.tier)}
                    <span className="ml-1">{customer.tier} Member</span>
                  </Badge>
                </div>
              </div>

              {/* Loyalty Points Summary */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{customer.points}</div>
                  <div className="text-sm text-gray-600">Available Points</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{customer.nextTierPoints - customer.points}</div>
                  <div className="text-sm text-gray-600">Points to Next Tier</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{customer.availableOffers.length}</div>
                  <div className="text-sm text-gray-600">Available Offers</div>
                </div>
              </div>

              {/* Progress to Next Tier */}
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Progress to Next Tier</span>
                  <span className="font-medium">{Math.round((customer.points / customer.nextTierPoints) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${(customer.points / customer.nextTierPoints) * 100}%` }}
                  />
                </div>
              </div>

              {/* Available Offers */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Available Offers ({customer.availableOffers.length})</h4>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {customer.availableOffers.map((offer) => (
                    <div key={offer.id} className="border rounded-lg p-4 bg-gradient-to-r from-purple-50 to-blue-50">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="font-medium text-gray-900">{offer.title}</h5>
                        <Badge variant="outline" className="text-xs">
                          <Percent className="h-3 w-3 mr-1" />
                          {offer.discount}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{offer.description}</p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Calendar className="h-3 w-3" />
                          Valid till {offer.validTill}
                        </div>
                        <Button size="sm" variant="outline">
                          <Send className="h-3 w-3 mr-1" />
                          Send
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Redemptions */}
              {customer.recentRedemptions.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Recent Redemptions</h4>
                  <div className="space-y-2">
                    {customer.recentRedemptions.map((redemption, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium text-sm">{redemption.offer}</div>
                          <div className="text-xs text-gray-600">{redemption.date}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-green-600">{redemption.savings} saved</div>
                          <div className="text-xs text-gray-600">{redemption.pointsUsed} points</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 pt-4 border-t">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View Full History
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Loyalty History - {customer.customerName}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-medium mb-2">Current Status</h5>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Tier:</span>
                              <Badge className={getTierColor(customer.tier)}>
                                {customer.tier}
                              </Badge>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Points:</span>
                              <span>{customer.points}</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h5 className="font-medium mb-2">Next Tier Progress</h5>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Points Needed:</span>
                              <span>{customer.nextTierPoints - customer.points}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full" 
                                style={{ width: `${(customer.points / customer.nextTierPoints) * 100}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                
                <Button size="sm">
                  <Gift className="h-4 w-4 mr-2" />
                  Create Offer
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      
      {filteredData.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Gift className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Loyalty Data Found</h3>
            <p className="text-gray-500">No loyalty information matches your search criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
