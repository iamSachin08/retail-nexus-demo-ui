
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FileText, Download, Eye, ExternalLink, Search, Star } from "lucide-react";

interface BrandSOPsProps {
  searchQuery: string;
}

export function BrandSOPs({ searchQuery }: BrandSOPsProps) {
  const brandSOPs = [
    {
      id: "SOP-SAM-001",
      brand: "Samsung",
      title: "Television Display Standards",
      category: "Visual Merchandising",
      version: "v2.1",
      lastUpdated: "2024-01-15",
      status: "Active",
      department: "Electronics",
      rating: 4.8,
      downloads: 156,
      description: "Complete guide for Samsung TV display setup, spacing, and promotional material placement",
      keyPoints: [
        "Minimum 1.5m spacing between displays",
        "Demo content must play continuously",
        "Price cards positioned at bottom right",
        "Brand logo visible from 5m distance"
      ]
    },
    {
      id: "SOP-LG-002",
      brand: "LG",
      title: "Refrigerator Section Layout",
      category: "Store Layout",
      version: "v1.8",
      lastUpdated: "2024-01-10",
      status: "Active",
      department: "Home Appliances",
      rating: 4.6,
      downloads: 89,
      description: "Guidelines for LG refrigerator positioning, energy label display, and customer demonstration setup",
      keyPoints: [
        "Energy star ratings clearly visible",
        "Door opening space minimum 90cm",
        "Interior LED lighting must be on",
        "Feature comparison charts at eye level"
      ]
    },
    {
      id: "SOP-SON-003",
      brand: "Sony",
      title: "Audio System Demonstration",
      category: "Product Demo",
      version: "v1.5",
      lastUpdated: "2024-01-08",
      status: "Active",
      department: "Audio",
      rating: 4.7,
      downloads: 72,
      description: "Sony audio system setup for optimal sound demonstration and customer experience",
      keyPoints: [
        "Sound levels appropriate for store environment",
        "Demo playlist updated weekly",
        "Headphone testing stations available",
        "Accessory displays within reach"
      ]
    },
    {
      id: "SOP-WHI-004",
      brand: "Whirlpool",
      title: "Washing Machine Display",
      category: "Visual Merchandising",
      version: "v2.0",
      lastUpdated: "2023-12-20",
      status: "Under Review",
      department: "Home Appliances",
      rating: 4.3,
      downloads: 45,
      description: "Whirlpool washing machine display standards and demonstration procedures",
      keyPoints: [
        "Load capacity clearly indicated",
        "Demo cycle videos playing",
        "Water and energy efficiency ratings prominent",
        "Installation service information available"
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800";
      case "Under Review": return "bg-yellow-100 text-yellow-800";
      case "Inactive": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Visual Merchandising": return "bg-blue-100 text-blue-800";
      case "Store Layout": return "bg-purple-100 text-purple-800";
      case "Product Demo": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
      />
    ));
  };

  const filteredSOPs = brandSOPs.filter(sop => 
    sop.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sop.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sop.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-gray-900">12</div>
            <div className="text-sm text-gray-600">Total SOPs</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">10</div>
            <div className="text-sm text-gray-600">Active</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">2</div>
            <div className="text-sm text-gray-600">Under Review</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">4.6</div>
            <div className="text-sm text-gray-600">Avg Rating</div>
          </CardContent>
        </Card>
      </div>

      {/* SOPs List */}
      {filteredSOPs.map((sop) => (
        <Card key={sop.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
              <div className="flex-1 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-blue-600" />
                    <h3 className="font-semibold text-gray-900">{sop.title}</h3>
                  </div>
                  <div className="flex gap-2">
                    <Badge className={getStatusColor(sop.status)}>
                      {sop.status}
                    </Badge>
                    <Badge className={getCategoryColor(sop.category)}>
                      {sop.category}
                    </Badge>
                    <Badge variant="outline">
                      {sop.brand}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="flex">{getRatingStars(sop.rating)}</div>
                  <span className="text-sm text-gray-600">({sop.rating}/5.0)</span>
                  <span className="text-sm text-gray-500">• {sop.downloads} downloads</span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-600">
                  <div>
                    <span className="font-medium">Version:</span> {sop.version}
                  </div>
                  <div>
                    <span className="font-medium">Department:</span> {sop.department}
                  </div>
                  <div>
                    <span className="font-medium">Last Updated:</span> {sop.lastUpdated}
                  </div>
                </div>
                
                <p className="text-sm text-gray-600">
                  {sop.description}
                </p>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Key Requirements:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {sop.keyPoints.map((point, index) => (
                      <div key={index} className="flex items-start gap-2 text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>{sop.title} - {sop.brand}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">SOP Information</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">SOP ID:</span>
                              <span>{sop.id}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Brand:</span>
                              <span>{sop.brand}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Version:</span>
                              <span>{sop.version}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Department:</span>
                              <span>{sop.department}</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Status & Metrics</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Status:</span>
                              <Badge className={getStatusColor(sop.status)}>
                                {sop.status}
                              </Badge>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Category:</span>
                              <Badge className={getCategoryColor(sop.category)}>
                                {sop.category}
                              </Badge>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Rating:</span>
                              <div className="flex items-center gap-1">
                                <div className="flex">{getRatingStars(sop.rating)}</div>
                                <span>({sop.rating})</span>
                              </div>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Downloads:</span>
                              <span>{sop.downloads}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
                        <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                          {sop.description}
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Key Requirements</h4>
                        <div className="space-y-2">
                          {sop.keyPoints.map((point, index) => (
                            <div key={index} className="flex items-start gap-3 p-2 bg-blue-50 rounded">
                              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0">
                                {index + 1}
                              </div>
                              <span className="text-sm text-gray-700">{point}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex justify-end gap-2">
                        <Button variant="outline">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Open Full SOP
                        </Button>
                        <Button>
                          <Download className="h-4 w-4 mr-2" />
                          Download PDF
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                
                <Button size="sm" variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                
                <Button size="sm">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Open
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      
      {filteredSOPs.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No SOPs Found</h3>
            <p className="text-gray-500">No brand SOPs found matching your search criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
