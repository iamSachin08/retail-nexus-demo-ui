import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  ShoppingCart, 
  Search, 
  Filter, 
  Download, 
  Upload,
  CreditCard,
  RefreshCcw,
  TrendingUp,
  DollarSign,
  FileText,
  Plus,
  Eye,
  Edit,
  Trash2,
  Calendar,
  User,
  Package,
  AlertCircle,
  CheckCircle,
  Clock,
  BarChart3,
  Receipt,
  Users,
  Store
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { POSSync } from "./POSSync";
import { DailySalesReport } from "./DailySalesReport";
import { ReturnsExchange } from "./ReturnsExchange";
import { InvoiceLookup } from "./InvoiceLookup";

export function SalesContent() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [isNewTransactionOpen, setIsNewTransactionOpen] = useState(false);
  const [isViewTransactionOpen, setIsViewTransactionOpen] = useState(false);
  const [isEditTransactionOpen, setIsEditTransactionOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);
  const [filterDateRange, setFilterDateRange] = useState("");
  const [filterPaymentMethod, setFilterPaymentMethod] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterStore, setFilterStore] = useState("");

  const recentTransactions = [
    {
      id: "INV-2024-001",
      customer: "Rahul Sharma",
      items: 3,
      total: "₹45,000",
      paymentMethod: "Card",
      status: "Completed",
      date: "2024-01-15 14:30",
      store: "Mumbai Central",
      itemsList: [
        { name: "Samsung 55\" 4K TV", qty: 1, price: "₹45,000" },
        { name: "HDMI Cable", qty: 2, price: "₹500" }
      ]
    },
    {
      id: "INV-2024-002",
      customer: "Priya Patel",
      items: 2,
      total: "₹28,000",
      paymentMethod: "Cash",
      status: "Completed",
      date: "2024-01-15 13:45",
      store: "Mumbai Central",
      itemsList: [
        { name: "Whirlpool Washing Machine", qty: 1, price: "₹28,000" }
      ]
    },
    {
      id: "INV-2024-003",
      customer: "Amit Kumar",
      items: 1,
      total: "₹25,000",
      paymentMethod: "UPI",
      status: "Pending",
      date: "2024-01-15 12:20",
      store: "Andheri West",
      itemsList: [
        { name: "Sony Home Theater", qty: 1, price: "₹25,000" }
      ]
    }
  ];

  const handleNewTransaction = (formData: any) => {
    toast({
      title: "Transaction Created",
      description: "New sales transaction has been created successfully",
    });
    setIsNewTransactionOpen(false);
  };

  const handleEditTransaction = (formData: any) => {
    toast({
      title: "Transaction Updated",
      description: "Sales transaction has been updated successfully",
    });
    setIsEditTransactionOpen(false);
  };

  const handleDeleteTransaction = (id: string) => {
    toast({
      title: "Transaction Deleted",
      description: `Transaction ${id} has been deleted successfully`,
    });
  };

  const handleSyncPOS = () => {
    toast({
      title: "POS Sync Initiated",
      description: "Synchronizing with POS system...",
    });
  };

  const handleExportReport = () => {
    toast({
      title: "Report Export",
      description: "Sales report is being generated and downloaded",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-800";
      case "Pending": return "bg-yellow-100 text-yellow-800";
      case "Cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed": return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "Pending": return <Clock className="h-4 w-4 text-yellow-600" />;
      case "Cancelled": return <AlertCircle className="h-4 w-4 text-red-600" />;
      default: return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const filteredTransactions = recentTransactions.filter(transaction => {
    const matchesSearch = transaction.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.customer.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDateRange = !filterDateRange || filterDateRange === "all" || true; // Add date range logic
    const matchesPaymentMethod = !filterPaymentMethod || filterPaymentMethod === "all" || transaction.paymentMethod === filterPaymentMethod;
    const matchesStatus = !filterStatus || filterStatus === "all" || transaction.status === filterStatus;
    const matchesStore = !filterStore || filterStore === "all" || transaction.store === filterStore;
    
    return matchesSearch && matchesDateRange && matchesPaymentMethod && matchesStatus && matchesStore;
  });

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sales & Billing</h1>
          <p className="text-gray-600">Manage sales transactions and billing operations</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Dialog open={isNewTransactionOpen} onOpenChange={setIsNewTransactionOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                New Transaction
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Sales Transaction</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="customer">Customer Name</Label>
                    <Input id="customer" placeholder="Enter customer name" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" placeholder="Enter phone number" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="store">Store</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select store" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mumbai-central">Mumbai Central</SelectItem>
                        <SelectItem value="andheri-west">Andheri West</SelectItem>
                        <SelectItem value="bandra-east">Bandra East</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="paymentMethod">Payment Method</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select payment method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cash">Cash</SelectItem>
                        <SelectItem value="card">Card</SelectItem>
                        <SelectItem value="upi">UPI</SelectItem>
                        <SelectItem value="netbanking">Net Banking</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="items">Items</Label>
                  <div className="space-y-2">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                      <Input placeholder="Item name" />
                      <Input type="number" placeholder="Qty" />
                      <Input placeholder="Price" />
                    </div>
                    <Button variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Item
                    </Button>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea id="notes" placeholder="Enter any additional notes" />
                </div>
                
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsNewTransactionOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => handleNewTransaction({})}>
                    Create Transaction
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          
          <Button variant="outline" size="sm" onClick={handleSyncPOS}>
            <RefreshCcw className="h-4 w-4 mr-2" />
            Sync POS
          </Button>
          
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Import Sales
          </Button>
          
          <Button size="sm" onClick={handleExportReport}>
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <DollarSign className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Today's Sales</p>
                <p className="text-xl font-semibold">₹2,45,000</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <ShoppingCart className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Transactions</p>
                <p className="text-xl font-semibold">127</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <CreditCard className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Card Payments</p>
                <p className="text-xl font-semibold">67%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <RefreshCcw className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Returns Today</p>
                <p className="text-xl font-semibold">8</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search by invoice, customer, or item..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={filterDateRange} onValueChange={setFilterDateRange}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Date Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Dates</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={filterPaymentMethod} onValueChange={setFilterPaymentMethod}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Payment Method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Methods</SelectItem>
                  <SelectItem value="Cash">Cash</SelectItem>
                  <SelectItem value="Card">Card</SelectItem>
                  <SelectItem value="UPI">UPI</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={filterStore} onValueChange={setFilterStore}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Store" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Stores</SelectItem>
                  <SelectItem value="Mumbai Central">Mumbai Central</SelectItem>
                  <SelectItem value="Andheri West">Andheri West</SelectItem>
                  <SelectItem value="Bandra East">Bandra East</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" size="sm">
                <FileText className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Receipt className="h-5 w-5" />
            Recent Transactions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredTransactions.map((transaction) => (
              <div key={transaction.id} className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex-1 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(transaction.status)}
                      <h3 className="font-semibold text-gray-900">{transaction.id}</h3>
                    </div>
                    <Badge className={getStatusColor(transaction.status)}>
                      {transaction.status}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>{transaction.customer}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Package className="h-4 w-4" />
                      <span>{transaction.items} items</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4" />
                      <span>{transaction.total}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Store className="h-4 w-4" />
                      <span>{transaction.store}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{transaction.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CreditCard className="h-4 w-4" />
                      <span>{transaction.paymentMethod}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setSelectedTransaction(transaction)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl">
                      <DialogHeader>
                        <DialogTitle>Transaction Details - {transaction.id}</DialogTitle>
                      </DialogHeader>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold mb-2">Transaction Information</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-600">Invoice ID:</span>
                                <span>{transaction.id}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Customer:</span>
                                <span>{transaction.customer}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Store:</span>
                                <span>{transaction.store}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Date:</span>
                                <span>{transaction.date}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold mb-2">Payment Information</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-600">Payment Method:</span>
                                <span>{transaction.paymentMethod}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Total Amount:</span>
                                <span className="font-semibold">{transaction.total}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Status:</span>
                                <Badge className={getStatusColor(transaction.status)}>
                                  {transaction.status}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold mb-2">Items Purchased</h4>
                            <div className="space-y-2">
                              {transaction.itemsList.map((item, index) => (
                                <div key={index} className="flex justify-between text-sm p-2 bg-gray-50 rounded">
                                  <div>
                                    <div className="font-medium">{item.name}</div>
                                    <div className="text-gray-500">Qty: {item.qty}</div>
                                  </div>
                                  <div className="font-semibold">{item.price}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            <Button size="sm">
                              <Receipt className="h-4 w-4 mr-2" />
                              Print Invoice
                            </Button>
                            <Button variant="outline" size="sm">
                              <BarChart3 className="h-4 w-4 mr-2" />
                              View Analytics
                            </Button>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      setSelectedTransaction(transaction);
                      setIsEditTransactionOpen(true);
                    }}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-red-200 text-red-600 hover:bg-red-50"
                    onClick={() => handleDeleteTransaction(transaction.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            ))}
            
            {filteredTransactions.length === 0 && (
              <div className="text-center py-8">
                <Receipt className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No transactions found matching your criteria.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="pos-sync" className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
          <TabsTrigger value="pos-sync">POS Sync</TabsTrigger>
          <TabsTrigger value="daily-sales">Daily Sales</TabsTrigger>
          <TabsTrigger value="returns">Returns</TabsTrigger>
          <TabsTrigger value="invoices">Invoice Lookup</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pos-sync" className="mt-6">
          <POSSync searchQuery={searchQuery} />
        </TabsContent>
        
        <TabsContent value="daily-sales" className="mt-6">
          <DailySalesReport />
        </TabsContent>
        
        <TabsContent value="returns" className="mt-6">
          <ReturnsExchange />
        </TabsContent>
        
        <TabsContent value="invoices" className="mt-6">
          <InvoiceLookup searchQuery={searchQuery} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
