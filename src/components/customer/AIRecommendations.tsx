import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Brain, TrendingUp, Target, Zap, Send, Eye, Star, ShoppingCart } from "lucide-react";

interface AIRecommendationsProps {
  searchQuery: string;
}

export function AIRecommendations({ searchQuery }: AIRecommendationsProps) {
  const recommendations = [
    {
      customerId: "CUST-2024-001",
      customerName: "Rajesh Kumar",
      tier: "Gold",
      buyingPropensity: 92,
      recommendations: [
        {
          type: "Product",
          title: "iPhone 16 Pro",
          reason: "Based on previous iPhone purchases and upgrade pattern",
          confidence: 85,
          expectedValue: "₹1,29,900",
          category: "Smartphones",
          priority: "High"
        },
        {
          type: "Accessory",
          title: "MacBook Pro M3",
          reason: "Apple ecosystem expansion likely",
          confidence: 78,
          expectedValue: "₹2,49,900",
          category: "Laptops",
          priority: "Medium"
        },
        {
          type: "Service",
          title: "Premium Support Plan",
          reason: "High-value customer, premium service alignment",
          confidence: 71,
          expectedValue: "₹4,999",
          category: "Services",
          priority: "Medium"
        }
      ],
      insights: [
        "Prefers premium Apple products",
        "Buys during festival seasons",
        "High brand loyalty score (9.2/10)",
        "Price-insensitive for quality products"
      ],
      nextBestAction: "Send iPhone 16 Pro launch notification with early access offer"
    },
    {
      customerId: "CUST-2024-002",
      customerName: "Priya Singh",
      tier: "Silver",
      buyingPropensity: 67,
      recommendations: [
        {
          type: "Product",
          title: "Samsung Refrigerator",
          reason: "Home appliance purchase pattern + kitchen upgrade trend",
          confidence: 72,
          expectedValue: "₹45,000",
          category: "Home Appliances",
          priority: "High"
        },
        {
          type: "Product",
          title: "Dyson V15 Vacuum",
          reason: "Premium home care product alignment",
          confidence: 65,
          expectedValue: "₹58,900",
          category: "Home Care",
          priority: "Medium"
        }
      ],
      insights: [
        "Focus on home improvement",
        "Prefers energy-efficient products",
        "Comparison shopper",
        "Values after-sales service"
      ],
      nextBestAction: "Share home appliance combo offers during upcoming sale"
    },
    {
      customerId: "CUST-2024-003",
      customerName: "Amit Sharma",
      tier: "Bronze",
      buyingPropensity: 45,
      recommendations: [
        {
          type: "Product",
          title: "Gaming Accessories",
          reason: "Young demographic, tech-savvy profile",
          confidence: 58,
          expectedValue: "₹15,000",
          category: "Gaming",
          priority: "Medium"
        },
        {
          type: "Paper Finance",
          title: "Easy EMI Options",
          reason: "Price-sensitive segment, enable larger purchases",
          confidence: 75,
          expectedValue: "₹25,000",
          category: "Paper Finance",
          priority: "High"
        }
      ],
      insights: [
        "Budget-conscious buyer",
        "Interested in latest tech trends",
        "Potential for growth",
        "EMI preference for big purchases"
      ],
      nextBestAction: "Offer attractive EMI schemes for gaming laptop"
    }
  ];

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return "bg-green-100 text-green-800";
    if (confidence >= 65) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-red-100 text-red-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPropensityColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const filteredRecommendations = recommendations.filter(rec => 
    rec.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    rec.customerId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {filteredRecommendations.map((customer) => (
        <Card key={customer.customerId} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="space-y-6">
              {/* Customer Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-full">
                    <Brain className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{customer.customerName}</h3>
                    <p className="text-sm text-gray-600">{customer.customerId}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-center">
                    <div className={`text-lg font-bold ${getPropensityColor(customer.buyingPropensity)}`}>
                      {customer.buyingPropensity}%
                    </div>
                    <div className="text-xs text-gray-600">Buying Propensity</div>
                  </div>
                  <Badge variant="outline">{customer.tier}</Badge>
                </div>
              </div>

              {/* AI Recommendations */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  AI Recommendations ({customer.recommendations.length})
                </h4>
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                  {customer.recommendations.map((rec, index) => (
                    <div key={index} className="border rounded-lg p-4 bg-gradient-to-r from-blue-50 to-purple-50">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h5 className="font-medium text-gray-900">{rec.title}</h5>
                          <p className="text-xs text-gray-600">{rec.category}</p>
                        </div>
                        <div className="flex flex-col gap-1">
                          <Badge className={getPriorityColor(rec.priority)} variant="outline">
                            {rec.priority}
                          </Badge>
                          <Badge className={getConfidenceColor(rec.confidence)} variant="outline">
                            {rec.confidence}%
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 mb-3">{rec.reason}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-green-600">{rec.expectedValue}</span>
                        <Button size="sm" variant="outline">
                          <Send className="h-3 w-3 mr-1" />
                          Suggest
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Customer Insights */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Customer Insights
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {customer.insights.map((insight, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                      <Zap className="h-3 w-3 text-yellow-500" />
                      <span className="text-sm text-gray-700">{insight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Next Best Action */}
              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border-l-4 border-green-500">
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Star className="h-4 w-4 text-green-600" />
                  Recommended Next Action
                </h4>
                <p className="text-sm text-gray-700 mb-3">{customer.nextBestAction}</p>
                <div className="flex gap-2">
                  <Button size="sm">
                    <Send className="h-4 w-4 mr-2" />
                    Execute Action
                  </Button>
                  <Button size="sm" variant="outline">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Create Campaign
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 pt-4 border-t">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View AI Analysis
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl">
                    <DialogHeader>
                      <DialogTitle>AI Analysis - {customer.customerName}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h5 className="font-medium mb-3">Buying Behavior Analysis</h5>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Propensity Score:</span>
                              <span className={`font-medium ${getPropensityColor(customer.buyingPropensity)}`}>
                                {customer.buyingPropensity}%
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Customer Tier:</span>
                              <Badge variant="outline">{customer.tier}</Badge>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Recommendations:</span>
                              <span>{customer.recommendations.length} items</span>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h5 className="font-medium mb-3">Confidence Scores</h5>
                          <div className="space-y-2">
                            {customer.recommendations.map((rec, index) => (
                              <div key={index} className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">{rec.title}:</span>
                                <Badge className={getConfidenceColor(rec.confidence)} variant="outline">
                                  {rec.confidence}%
                                </Badge>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="font-medium mb-3">Detailed Insights</h5>
                        <div className="space-y-2">
                          {customer.insights.map((insight, index) => (
                            <div key={index} className="flex items-start gap-2 p-3 bg-gray-50 rounded">
                              <Zap className="h-4 w-4 text-yellow-500 mt-0.5" />
                              <span className="text-sm text-gray-700">{insight}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                
                <Button size="sm">
                  <Brain className="h-4 w-4 mr-2" />
                  Refresh Analysis
                </Button>
                
                <Button size="sm" variant="outline">
                  <Target className="h-4 w-4 mr-2" />
                  Create Target Campaign
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      
      {filteredRecommendations.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No AI Recommendations Found</h3>
            <p className="text-gray-500">No AI recommendations match your search criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
