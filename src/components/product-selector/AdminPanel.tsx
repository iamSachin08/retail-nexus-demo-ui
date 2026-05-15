import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Search, Plus, Edit, Trash2, BarChart2, PieChart as PieChartIcon, LineChart as LineChartIcon, Save, Download, Upload } from "lucide-react";
import * as Recharts from "recharts";

// Simple chart components using Recharts directly
const SimpleBarChart = ({ data, index, categories, colors, valueFormatter }) => (
  <Recharts.ResponsiveContainer width="100%" height={300}>
    <Recharts.BarChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
      <Recharts.CartesianGrid strokeDasharray="3 3" />
      <Recharts.XAxis dataKey={index} />
      <Recharts.YAxis />
      <Recharts.Tooltip formatter={valueFormatter} />
      <Recharts.Legend />
      {categories.map((category, i) => (
        <Recharts.Bar key={category} dataKey={category} fill={colors[i]} />
      ))}
    </Recharts.BarChart>
  </Recharts.ResponsiveContainer>
);

const SimplePieChart = ({ data, index, categories, colors, valueFormatter }) => (
  <Recharts.ResponsiveContainer width="100%" height={300}>
    <Recharts.PieChart margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
      <Recharts.Tooltip formatter={valueFormatter} />
      <Recharts.Legend />
      <Recharts.Pie 
        data={data} 
        dataKey={categories[0]} 
        nameKey={index} 
        cx="50%" 
        cy="50%" 
        outerRadius={80}
        label
      >
        {data.map((entry, i) => (
          <Recharts.Cell key={`cell-${i}`} fill={colors[i % colors.length]} />
        ))}
      </Recharts.Pie>
    </Recharts.PieChart>
  </Recharts.ResponsiveContainer>
);

const SimpleLineChart = ({ data, index, categories, colors, valueFormatter }) => (
  <Recharts.ResponsiveContainer width="100%" height={300}>
    <Recharts.LineChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
      <Recharts.CartesianGrid strokeDasharray="3 3" />
      <Recharts.XAxis dataKey={index} />
      <Recharts.YAxis />
      <Recharts.Tooltip formatter={valueFormatter} />
      <Recharts.Legend />
      {categories.map((category, i) => (
        <Recharts.Line 
          key={category} 
          type="monotone" 
          dataKey={category} 
          stroke={colors[i]} 
          activeDot={{ r: 8 }} 
        />
      ))}
    </Recharts.LineChart>
  </Recharts.ResponsiveContainer>
);

// Mock data - would come from API in production
const MOCK_PRODUCTS = [
  {
    id: "tv1",
    name: "Samsung Crystal 4K Pro 55-inch Smart TV",
    brand: "Samsung",
    category: "tv",
    articleCode: "SAM55CRY4K",
    ean: "8806090618123",
    lastUpdated: "2023-10-15",
  },
  {
    id: "tv2",
    name: "Sony Bravia X80K 65-inch 4K Smart TV",
    brand: "Sony",
    category: "tv",
    articleCode: "SON65BRV4K",
    ean: "4548736134386",
    lastUpdated: "2023-11-02",
  },
  {
    id: "mob1",
    name: "iPhone 15 Pro 256GB Deep Blue",
    brand: "Apple",
    category: "mob",
    articleCode: "APL15PRO256BLU",
    ean: "194253184775",
    lastUpdated: "2023-09-28",
  },
];

// Mock question flow data
const MOCK_QUESTION_FLOWS = [
  {
    id: "tv-flow",
    name: "Television Selection Flow",
    category: "tv",
    questionCount: 4,
    lastUpdated: "2023-10-10",
  },
  {
    id: "ac-flow",
    name: "Air Conditioner Selection Flow",
    category: "ac",
    questionCount: 5,
    lastUpdated: "2023-09-15",
  },
  {
    id: "mob-flow",
    name: "Mobile Phone Selection Flow",
    category: "mob",
    questionCount: 6,
    lastUpdated: "2023-11-05",
  },
];

// Mock analytics data
const MOCK_ANALYTICS = {
  productViews: [
    { name: "Samsung TV", value: 1245 },
    { name: "Sony TV", value: 890 },
    { name: "iPhone", value: 1560 },
    { name: "LG AC", value: 720 },
    { name: "Whirlpool Ref", value: 650 },
  ],
  categoryEngagement: [
    { name: "Televisions", value: 35 },
    { name: "Mobile Phones", value: 25 },
    { name: "Air Conditioners", value: 15 },
    { name: "Refrigerators", value: 12 },
    { name: "Washing Machines", value: 8 },
    { name: "Laptops", value: 5 },
  ],
  dailyUsage: Array.from({ length: 30 }, (_, i) => ({
    date: new Date(2023, 10, i + 1).toISOString().split('T')[0],
    users: Math.floor(Math.random() * 100) + 50,
  })),
};

export function AdminPanel() {
  const [tab, setTab] = useState("products");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showProductDialog, setShowProductDialog] = useState(false);
  const [showQuestionDialog, setShowQuestionDialog] = useState(false);
  
  // Filter products based on search term and category
  const filteredProducts = MOCK_PRODUCTS.filter(product => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.articleCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.ean.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  // Filter question flows based on search term and category
  const filteredQuestionFlows = MOCK_QUESTION_FLOWS.filter(flow => {
    const matchesSearch = flow.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || flow.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Product Selector Admin Panel</CardTitle>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={() => {}}>
              <Upload className="mr-2 h-4 w-4" /> Import
            </Button>
            <Button variant="outline" onClick={() => {}}>
              <Download className="mr-2 h-4 w-4" /> Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={tab} onValueChange={setTab} className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="products">Product Management</TabsTrigger>
              <TabsTrigger value="questions">Question Flows</TabsTrigger>
              <TabsTrigger value="analytics">Analytics & Reports</TabsTrigger>
            </TabsList>
            
            {/* Products Tab */}
            <TabsContent value="products">
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                      <Input
                        placeholder="Search products..."
                        className="pl-8 w-[300px]"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="tv">Televisions</SelectItem>
                        <SelectItem value="ac">Air Conditioners</SelectItem>
                        <SelectItem value="ref">Refrigerators</SelectItem>
                        <SelectItem value="wm">Washing Machines</SelectItem>
                        <SelectItem value="mob">Mobile Phones</SelectItem>
                        <SelectItem value="lap">Laptops</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={() => setShowProductDialog(true)}>
                    <Plus className="mr-2 h-4 w-4" /> Add Product
                  </Button>
                </div>
                
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product Name</TableHead>
                        <TableHead>Brand</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Article Code</TableHead>
                        <TableHead>EAN</TableHead>
                        <TableHead>Last Updated</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                          <TableRow key={product.id}>
                            <TableCell className="font-medium">{product.name}</TableCell>
                            <TableCell>{product.brand}</TableCell>
                            <TableCell>
                              <Badge variant="outline">
                                {product.category === "tv" ? "Television" :
                                 product.category === "ac" ? "Air Conditioner" :
                                 product.category === "ref" ? "Refrigerator" :
                                 product.category === "wm" ? "Washing Machine" :
                                 product.category === "mob" ? "Mobile Phone" :
                                 product.category === "lap" ? "Laptop" : product.category}
                              </Badge>
                            </TableCell>
                            <TableCell>{product.articleCode}</TableCell>
                            <TableCell>{product.ean}</TableCell>
                            <TableCell>{product.lastUpdated}</TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button variant="ghost" size="icon">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-4 text-gray-500">
                            No products found matching your search criteria.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </TabsContent>
            
            {/* Question Flows Tab */}
            <TabsContent value="questions">
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                      <Input
                        placeholder="Search question flows..."
                        className="pl-8 w-[300px]"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="tv">Televisions</SelectItem>
                        <SelectItem value="ac">Air Conditioners</SelectItem>
                        <SelectItem value="ref">Refrigerators</SelectItem>
                        <SelectItem value="wm">Washing Machines</SelectItem>
                        <SelectItem value="mob">Mobile Phones</SelectItem>
                        <SelectItem value="lap">Laptops</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={() => setShowQuestionDialog(true)}>
                    <Plus className="mr-2 h-4 w-4" /> Add Question Flow
                  </Button>
                </div>
                
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Flow Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Questions</TableHead>
                        <TableHead>Last Updated</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredQuestionFlows.length > 0 ? (
                        filteredQuestionFlows.map((flow) => (
                          <TableRow key={flow.id}>
                            <TableCell className="font-medium">{flow.name}</TableCell>
                            <TableCell>
                              <Badge variant="outline">
                                {flow.category === "tv" ? "Television" :
                                 flow.category === "ac" ? "Air Conditioner" :
                                 flow.category === "ref" ? "Refrigerator" :
                                 flow.category === "wm" ? "Washing Machine" :
                                 flow.category === "mob" ? "Mobile Phone" :
                                 flow.category === "lap" ? "Laptop" : flow.category}
                              </Badge>
                            </TableCell>
                            <TableCell>{flow.questionCount}</TableCell>
                            <TableCell>{flow.lastUpdated}</TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button variant="ghost" size="icon">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-4 text-gray-500">
                            No question flows found matching your search criteria.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </TabsContent>
            
            {/* Analytics Tab */}
            <TabsContent value="analytics">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Product Views Chart */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <BarChart2 className="mr-2 h-5 w-5" /> Top Product Views
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <SimpleBarChart
                        data={MOCK_ANALYTICS.productViews}
                        index="name"
                        categories={["value"]}
                        colors={["#3b82f6"]}
                        valueFormatter={(value) => `${value} views`}
                      />
                    </CardContent>
                  </Card>
                  
                  {/* Category Engagement Chart */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <PieChartIcon className="mr-2 h-5 w-5" /> Category Engagement
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <SimplePieChart
                        data={MOCK_ANALYTICS.categoryEngagement}
                        index="name"
                        categories={["value"]}
                        colors={["#3b82f6", "#06b6d4", "#4f46e5", "#7c3aed", "#16a34a", "#eab308"]}
                        valueFormatter={(value) => `${value}%`}
                      />
                    </CardContent>
                  </Card>
                  
                  {/* Daily Usage Chart */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <LineChartIcon className="mr-2 h-5 w-5" /> Daily Usage
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <SimpleLineChart
                        data={MOCK_ANALYTICS.dailyUsage}
                        index="date"
                        categories={["users"]}
                        colors={["#3b82f6"]}
                        valueFormatter={(value) => `${value} users`}
                      />
                    </CardContent>
                  </Card>
                </div>
                
                <div className="flex justify-end">
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" /> Export Reports
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      {/* Add Product Dialog */}
      <Dialog open={showProductDialog} onOpenChange={setShowProductDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
            <DialogDescription>
              Enter the product details below. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name</Label>
                <Input id="name" placeholder="Enter product name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="brand">Brand</Label>
                <Input id="brand" placeholder="Enter brand name" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tv">Television</SelectItem>
                    <SelectItem value="ac">Air Conditioner</SelectItem>
                    <SelectItem value="ref">Refrigerator</SelectItem>
                    <SelectItem value="wm">Washing Machine</SelectItem>
                    <SelectItem value="mob">Mobile Phone</SelectItem>
                    <SelectItem value="lap">Laptop</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price (₹)</Label>
                <Input id="price" type="number" placeholder="Enter price" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="articleCode">Article Code</Label>
                <Input id="articleCode" placeholder="Enter article code" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ean">EAN Number</Label>
                <Input id="ean" placeholder="Enter EAN number" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Enter product description" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowProductDialog(false)}>Cancel</Button>
            <Button onClick={() => setShowProductDialog(false)}>
              <Save className="mr-2 h-4 w-4" /> Save Product
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Add Question Flow Dialog */}
      <Dialog open={showQuestionDialog} onOpenChange={setShowQuestionDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create Question Flow</DialogTitle>
            <DialogDescription>
              Set up a new question flow for product recommendations.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="flowName">Flow Name</Label>
                <Input id="flowName" placeholder="Enter flow name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="flowCategory">Category</Label>
                <Select>
                  <SelectTrigger id="flowCategory">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tv">Television</SelectItem>
                    <SelectItem value="ac">Air Conditioner</SelectItem>
                    <SelectItem value="ref">Refrigerator</SelectItem>
                    <SelectItem value="wm">Washing Machine</SelectItem>
                    <SelectItem value="mob">Mobile Phone</SelectItem>
                    <SelectItem value="lap">Laptop</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Questions</Label>
              <div className="border rounded-md p-4 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="q1">Question 1</Label>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <Input id="q1" placeholder="Enter question" />
                  <div className="pl-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <Input placeholder="Option 1" className="flex-1" />
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-2">
                      <Input placeholder="Option 2" className="flex-1" />
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button variant="outline" size="sm">
                      <Plus className="mr-2 h-3 w-3" /> Add Option
                    </Button>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  <Plus className="mr-2 h-4 w-4" /> Add Question
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowQuestionDialog(false)}>Cancel</Button>
            <Button onClick={() => setShowQuestionDialog(false)}>
              <Save className="mr-2 h-4 w-4" /> Save Flow
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 