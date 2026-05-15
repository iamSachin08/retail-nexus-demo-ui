
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, CheckCircle, XCircle, Clock, User, Phone, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EligibilityCheckProps {
  searchQuery: string;
}

export function EligibilityCheck({ searchQuery }: EligibilityCheckProps) {
  const [customerMobile, setCustomerMobile] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const { toast } = useToast();

  const eligibilityResults = [
    {
      id: "ELG-2024-001",
      customerName: "Rajesh Kumar",
      mobile: "9876543210",
      productName: "Samsung 55\" 4K Smart TV",
      amount: "₹65,000",
      eligibilityScore: 85,
      status: "Eligible",
      nbfcPartner: "Bajaj Finserv",
      tenure: "12 months",
      interestRate: "14.5%",
      checkedDate: "2024-01-22"
    },
    {
      id: "ELG-2024-002", 
      customerName: "Priya Singh",
      mobile: "9876543211",
      productName: "iPhone 15 Pro",
      amount: "₹1,29,900",
      eligibilityScore: 92,
      status: "Eligible",
      nbfcPartner: "HDFC Bank",
      tenure: "24 months",
      interestRate: "12.5%",
      checkedDate: "2024-01-21"
    },
    {
      id: "ELG-2024-003",
      customerName: "Amit Sharma",
      mobile: "9876543212",
      productName: "Dell Laptop",
      amount: "₹75,000",
      eligibilityScore: 45,
      status: "Not Eligible",
      nbfcPartner: "N/A",
      tenure: "N/A",
      interestRate: "N/A",
      checkedDate: "2024-01-20"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Eligible": return "bg-green-100 text-green-800";
      case "Not Eligible": return "bg-red-100 text-red-800";
      case "Pending": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const filteredResults = eligibilityResults.filter(result => 
    result.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    result.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    result.mobile.includes(searchQuery)
  );

  const handleEligibilityCheck = () => {
    toast({
      title: "Eligibility Check Initiated",
      description: `Checking eligibility for ${customerMobile}...`,
    });
  };

  return (
    <div className="space-y-6">
      {/* New Eligibility Check Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            New Eligibility Check
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="mobile">Customer Mobile</Label>
              <Input 
                id="mobile"
                placeholder="Enter mobile number"
                value={customerMobile}
                onChange={(e) => setCustomerMobile(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="product">Product</Label>
              <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                <SelectTrigger>
                  <SelectValue placeholder="Select product" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tv">Samsung 55" 4K TV</SelectItem>
                  <SelectItem value="laptop">Dell Laptop</SelectItem>
                  <SelectItem value="phone">iPhone 15 Pro</SelectItem>
                  <SelectItem value="fridge">LG Refrigerator</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="amount">Loan Amount</Label>
              <Input 
                id="amount"
                placeholder="Enter amount"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
              />
            </div>
            <div className="flex items-end">
              <Button onClick={handleEligibilityCheck} className="w-full">
                Check Eligibility
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Eligibility Results */}
      <div className="space-y-4">
        {filteredResults.map((result) => (
          <Card key={result.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <h3 className="font-semibold text-gray-900">{result.id}</h3>
                    <Badge className={getStatusColor(result.status)}>
                      {result.status}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>{result.customerName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      <span>{result.mobile}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4" />
                      <span>{result.amount}</span>
                    </div>
                    <div>
                      <span className="font-medium">Score:</span> 
                      <span className={`font-bold ml-1 ${getScoreColor(result.eligibilityScore)}`}>
                        {result.eligibilityScore}/100
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-sm">
                    <span className="font-medium">Product:</span> {result.productName}
                  </div>
                  
                  {result.status === "Eligible" && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm bg-green-50 p-3 rounded-lg">
                      <div>
                        <span className="font-medium text-green-900">NBFC Partner:</span>
                        <div className="text-green-800">{result.nbfcPartner}</div>
                      </div>
                      <div>
                        <span className="font-medium text-green-900">Tenure:</span>
                        <div className="text-green-800">{result.tenure}</div>
                      </div>
                      <div>
                        <span className="font-medium text-green-900">Interest Rate:</span>
                        <div className="text-green-800">{result.interestRate}</div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col sm:flex-row gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Eligibility Details - {result.id}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Customer Information</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-600">Name:</span>
                                <span>{result.customerName}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Mobile:</span>
                                <span>{result.mobile}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Product:</span>
                                <span>{result.productName}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Amount:</span>
                                <span>{result.amount}</span>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Eligibility Score</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-600">Score:</span>
                                <span className={`font-bold ${getScoreColor(result.eligibilityScore)}`}>
                                  {result.eligibilityScore}/100
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Status:</span>
                                <Badge className={getStatusColor(result.status)}>
                                  {result.status}
                                </Badge>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Checked Date:</span>
                                <span>{result.checkedDate}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {result.status === "Eligible" && (
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Loan Details</h4>
                            <div className="bg-green-50 p-3 rounded-lg space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-green-900 font-medium">NBFC Partner:</span>
                                <span className="text-green-800">{result.nbfcPartner}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-green-900 font-medium">Tenure:</span>
                                <span className="text-green-800">{result.tenure}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-green-900 font-medium">Interest Rate:</span>
                                <span className="text-green-800">{result.interestRate}</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="flex justify-end gap-2">
                        <DialogClose asChild>
                          <Button variant="outline">Close</Button>
                        </DialogClose>
                        {result.status === "Eligible" && (
                          <Button>Proceed with Application</Button>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                  
                  {result.status === "Eligible" && (
                    <Button size="sm">
                      Create Application
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {filteredResults.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Eligibility Checks Found</h3>
            <p className="text-gray-500">No eligibility checks match your search criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
