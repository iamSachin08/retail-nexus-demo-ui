
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Layout, Edit, Eye, Copy, Plus, Settings } from "lucide-react";

interface SELFormatsProps {
  searchQuery: string;
}

export function SELFormats({ searchQuery }: SELFormatsProps) {
  const formats = [
    {
      id: "standard",
      name: "Standard SEL",
      description: "Default format for most products",
      size: "2x1 inch",
      category: "General",
      status: "Active",
      fields: ["Product Name", "Brand", "Price", "Discount Price", "Barcode", "SKU"],
      usageCount: 1250,
      lastModified: "2024-01-15",
      template: {
        backgroundColor: "#ffffff",
        borderColor: "#000000",
        fontSize: "10px",
        layout: "vertical"
      }
    },
    {
      id: "large",
      name: "Large SEL",
      description: "For premium products requiring more information",
      size: "3x2 inch",
      category: "Premium",
      status: "Active",
      fields: ["Product Name", "Brand", "Model", "Price", "Discount Price", "Features", "Barcode", "SKU", "QR Code"],
      usageCount: 450,
      lastModified: "2024-01-18",
      template: {
        backgroundColor: "#ffffff",
        borderColor: "#000000",
        fontSize: "12px",
        layout: "horizontal"
      }
    },
    {
      id: "promo",
      name: "Promotional SEL",
      description: "Special format for sale and promotional items",
      size: "2x1.5 inch",
      category: "Promotional",
      status: "Active",
      fields: ["Product Name", "Original Price", "Sale Price", "Discount %", "Offer Details", "Barcode"],
      usageCount: 320,
      lastModified: "2024-01-20",
      template: {
        backgroundColor: "#ff0000",
        borderColor: "#ffffff",
        fontSize: "11px",
        layout: "promotional"
      }
    },
    {
      id: "barcode",
      name: "Barcode Only",
      description: "Minimal format with just barcode and price",
      size: "1x0.5 inch",
      category: "Minimal",
      status: "Active",
      fields: ["Barcode", "Price", "SKU"],
      usageCount: 890,
      lastModified: "2024-01-10",
      template: {
        backgroundColor: "#ffffff",
        borderColor: "#000000",
        fontSize: "8px",
        layout: "minimal"
      }
    },
    {
      id: "electronics",
      name: "Electronics Special",
      description: "Format for electronics with specifications",
      size: "2.5x1.5 inch",
      category: "Electronics",
      status: "Draft",
      fields: ["Product Name", "Brand", "Model", "Key Specs", "Price", "Warranty", "Barcode"],
      usageCount: 0,
      lastModified: "2024-01-22",
      template: {
        backgroundColor: "#f0f8ff",
        borderColor: "#0066cc",
        fontSize: "10px",
        layout: "technical"
      }
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800";
      case "Draft": return "bg-yellow-100 text-yellow-800";
      case "Archived": return "bg-gray-100 text-gray-800";
      default: return "bg-blue-100 text-blue-800";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "General": return "bg-blue-100 text-blue-800";
      case "Premium": return "bg-purple-100 text-purple-800";
      case "Promotional": return "bg-red-100 text-red-800";
      case "Minimal": return "bg-gray-100 text-gray-800";
      case "Electronics": return "bg-indigo-100 text-indigo-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredFormats = formats.filter(format => 
    format.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    format.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    format.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderPreview = (format: any) => {
    const isPromo = format.id === "promo";
    const isMinimal = format.id === "barcode";
    const isLarge = format.id === "large";
    
    return (
      <div 
        className={`border-2 border-dashed p-4 text-center relative ${
          isPromo ? 'bg-red-50 border-red-300' : 'bg-white border-gray-300'
        }`}
        style={{ 
          minHeight: isLarge ? '120px' : isMinimal ? '60px' : '80px',
          fontSize: format.template.fontSize 
        }}
      >
        {!isMinimal && (
          <>
            <div className={`text-xs ${isPromo ? 'text-white' : 'text-gray-600'} mb-1`}>
              Electronics
            </div>
            <div className={`font-bold text-sm ${isPromo ? 'text-white' : 'text-gray-900'} mb-1`}>
              Sample Product Name
            </div>
            <div className={`text-xs ${isPromo ? 'text-red-100' : 'text-gray-600'} mb-2`}>
              Samsung
            </div>
          </>
        )}
        
        {isPromo ? (
          <>
            <div className="text-xs text-red-100 line-through">₹25,000</div>
            <div className="text-lg font-bold text-white">₹20,000</div>
            <div className="text-xs text-yellow-200">20% OFF</div>
          </>
        ) : (
          <div className={`text-lg font-bold ${isMinimal ? 'text-sm' : ''} text-green-600 mb-1`}>
            ₹15,000
          </div>
        )}
        
        <div className={`text-xs font-mono bg-gray-100 p-1 rounded mt-2 ${isPromo ? 'bg-red-200' : ''}`}>
          123456789012
        </div>
        
        {!isMinimal && (
          <div className="text-xs text-gray-600 mt-1">SKU-2024-001</div>
        )}
        
        {isLarge && (
          <div className="text-xs text-gray-600 mt-1 border-t pt-1">
            Key Features: Feature 1, Feature 2
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Add New Format Button */}
      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-semibold text-gray-900">SEL Format Templates</h4>
              <p className="text-sm text-gray-600">Manage and customize your shelf edge label formats</p>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Format
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Format List */}
      {filteredFormats.map((format) => (
        <Card key={format.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="space-y-4">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <Layout className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{format.name}</h3>
                    <p className="text-sm text-gray-600">{format.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(format.status)}>
                    {format.status}
                  </Badge>
                  <Badge className={getCategoryColor(format.category)}>
                    {format.category}
                  </Badge>
                </div>
              </div>

              {/* Format Details */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Size:</span>
                      <div className="font-medium">{format.size}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Usage Count:</span>
                      <div className="font-medium">{format.usageCount.toLocaleString()}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Last Modified:</span>
                      <div className="font-medium">{format.lastModified}</div>
                    </div>
                  </div>

                  <div>
                    <span className="text-sm text-gray-600">Fields:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {format.fields.map((field, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {field}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Background:</span>
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-4 h-4 rounded border"
                          style={{ backgroundColor: format.template.backgroundColor }}
                        />
                        <span className="font-mono text-xs">{format.template.backgroundColor}</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-600">Font Size:</span>
                      <div className="font-medium">{format.template.fontSize}</div>
                    </div>
                  </div>
                </div>

                {/* Preview */}
                <div>
                  <span className="text-sm text-gray-600 block mb-2">Preview:</span>
                  {renderPreview(format)}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-2 pt-4 border-t">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl">
                    <DialogHeader>
                      <DialogTitle>Format Details - {format.name}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h5 className="font-medium mb-3">Format Information</h5>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Name:</span>
                              <span>{format.name}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Size:</span>
                              <span>{format.size}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Category:</span>
                              <Badge className={getCategoryColor(format.category)}>
                                {format.category}
                              </Badge>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Status:</span>
                              <Badge className={getStatusColor(format.status)}>
                                {format.status}
                              </Badge>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Usage Count:</span>
                              <span>{format.usageCount.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h5 className="font-medium mb-3">Template Settings</h5>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Background:</span>
                              <div className="flex items-center gap-2">
                                <div 
                                  className="w-4 h-4 rounded border"
                                  style={{ backgroundColor: format.template.backgroundColor }}
                                />
                                <span className="font-mono text-xs">{format.template.backgroundColor}</span>
                              </div>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Border:</span>
                              <span className="font-mono text-xs">{format.template.borderColor}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Font Size:</span>
                              <span>{format.template.fontSize}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Layout:</span>
                              <span className="capitalize">{format.template.layout}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="font-medium mb-3">Fields ({format.fields.length})</h5>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {format.fields.map((field, index) => (
                            <Badge key={index} variant="outline" className="justify-center">
                              {field}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h5 className="font-medium mb-3">Preview</h5>
                        <div className="flex justify-center">
                          {renderPreview(format)}
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                
                <Button variant="outline" size="sm">
                  <Copy className="h-4 w-4 mr-2" />
                  Duplicate
                </Button>
                
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Configure
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      
      {filteredFormats.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Layout className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Formats Found</h3>
            <p className="text-gray-500">No SEL formats match your search criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
