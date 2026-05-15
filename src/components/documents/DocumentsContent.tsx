import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Upload, 
  Search, 
  FolderOpen, 
  FileText,
  Download,
  Filter,
  AlertTriangle,
  Calendar,
  Tag
} from "lucide-react";

export function DocumentsContent() {
  const [searchQuery, setSearchQuery] = useState("");
  
  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Document Management</h1>
          <p className="text-gray-600">Upload, organize, and track all store documents</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export List
          </Button>
          <Button size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Upload Document
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Documents</p>
                <p className="text-xl font-semibold">486</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Expiring Soon</p>
                <p className="text-xl font-semibold">8</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <FolderOpen className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Categories</p>
                <p className="text-xl font-semibold">12</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Upload className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">This Month</p>
                <p className="text-xl font-semibold">24</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search documents by name, category, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Tag className="h-4 w-4 mr-2" />
                Tags
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
          <TabsTrigger value="upload">Upload</TabsTrigger>
          <TabsTrigger value="repository">Repository</TabsTrigger>
          <TabsTrigger value="expiry">Expiry Tracker</TabsTrigger>
          <TabsTrigger value="search">Search & Tag</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upload" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Upload New Document
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-900 mb-2">Drop files here or click to upload</p>
                <p className="text-gray-600 mb-4">Support for PDF, DOC, XLS, JPG, PNG files up to 10MB</p>
                <Button>Choose Files</Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Document Category</label>
                  <select className="w-full p-2 border rounded-lg">
                    <option>Select category</option>
                    <option>DOA Certificate</option>
                    <option>Invoice</option>
                    <option>Audit Report</option>
                    <option>Compliance Certificate</option>
                    <option>Vendor Agreement</option>
                    <option>Training Material</option>
                    <option>Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Expiry Date (Optional)</label>
                  <Input type="date" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Tags</label>
                <Input placeholder="Enter tags separated by commas (e.g., vendor, samsung, warranty)" />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea 
                  className="w-full p-2 border rounded-lg" 
                  rows={3}
                  placeholder="Brief description of the document..."
                />
              </div>
              
              <Button className="w-full">
                <Upload className="h-4 w-4 mr-2" />
                Upload Document
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="repository" className="mt-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { name: "Samsung DOA Certificate", category: "DOA Certificate", date: "2024-01-20", expiry: "2024-12-31", tags: ["samsung", "warranty"] },
                { name: "Q3 Audit Report", category: "Audit Report", date: "2024-01-15", expiry: null, tags: ["audit", "compliance"] },
                { name: "LG Vendor Agreement", category: "Vendor Agreement", date: "2024-01-10", expiry: "2024-06-30", tags: ["lg", "vendor"] },
                { name: "Staff Training Manual", category: "Training Material", date: "2024-01-05", expiry: null, tags: ["training", "staff"] },
                { name: "December Invoice Summary", category: "Invoice", date: "2024-01-02", expiry: null, tags: ["invoice", "paper-finance"] },
                { name: "Fire Safety Certificate", category: "Compliance Certificate", date: "2023-12-28", expiry: "2024-03-15", tags: ["safety", "compliance"] }
              ].map((doc, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <FileText className="h-8 w-8 text-blue-600 flex-shrink-0 mt-1" />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm truncate">{doc.name}</h3>
                        <p className="text-xs text-gray-500 mt-1">{doc.category}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline" className="text-xs">{doc.date}</Badge>
                          {doc.expiry && (
                            <Badge variant="secondary" className="text-xs">
                              <Calendar className="h-3 w-3 mr-1" />
                              {doc.expiry}
                            </Badge>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {doc.tags.map((tag, tagIndex) => (
                            <Badge key={tagIndex} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex gap-1 mt-3">
                          <Button size="sm" variant="outline" className="text-xs h-7">
                            <Download className="h-3 w-3 mr-1" />
                            Download
                          </Button>
                          <Button size="sm" variant="outline" className="text-xs h-7">
                            View
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="expiry" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                Expiry & Compliance Tracker
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Fire Safety Certificate", expiry: "2024-03-15", daysLeft: 20, status: "warning" },
                  { name: "Insurance Policy", expiry: "2024-02-28", daysLeft: 5, status: "critical" },
                  { name: "LG Vendor Agreement", expiry: "2024-06-30", daysLeft: 95, status: "normal" },
                  { name: "Compliance Audit", expiry: "2024-04-15", daysLeft: 51, status: "normal" }
                ].map((item, index) => (
                  <div key={index} className={`p-4 rounded-lg border-l-4 ${
                    item.status === 'critical' ? 'border-l-red-500 bg-red-50' :
                    item.status === 'warning' ? 'border-l-yellow-500 bg-yellow-50' :
                    'border-l-green-500 bg-green-50'
                  }`}>
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-600">Expires: {item.expiry}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant={
                          item.status === 'critical' ? 'destructive' :
                          item.status === 'warning' ? 'secondary' : 'default'
                        }>
                          {item.daysLeft} days left
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="search" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Advanced Search & Tagging
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Document Type</label>
                  <select className="w-full p-2 border rounded-lg">
                    <option>All Types</option>
                    <option>PDF</option>
                    <option>DOC</option>
                    <option>XLS</option>
                    <option>Image</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <select className="w-full p-2 border rounded-lg">
                    <option>All Categories</option>
                    <option>DOA Certificate</option>
                    <option>Invoice</option>
                    <option>Audit Report</option>
                    <option>Compliance</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Date Range</label>
                  <select className="w-full p-2 border rounded-lg">
                    <option>All Time</option>
                    <option>Last 7 days</option>
                    <option>Last 30 days</option>
                    <option>Last 3 months</option>
                    <option>Last year</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Search by Tags</label>
                <Input placeholder="Enter tags to search (e.g., samsung, vendor, warranty)" />
              </div>
              
              <Button className="w-full">
                <Search className="h-4 w-4 mr-2" />
                Search Documents
              </Button>
              
              <div className="mt-6">
                <h3 className="font-medium mb-3">Popular Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {["samsung", "lg", "sony", "vendor", "warranty", "compliance", "audit", "training", "invoice", "certificate"].map((tag) => (
                    <Badge key={tag} variant="outline" className="cursor-pointer hover:bg-gray-100">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
