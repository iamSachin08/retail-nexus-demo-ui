
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  DollarSign, 
  CreditCard, 
  AlertTriangle, 
  FileText,
  Plus,
  Download,
  TrendingUp,
  Wallet
} from "lucide-react";
import { CashReconciliation } from "./CashReconciliation";
import { PettyCashManager } from "./PettyCashManager";
import { MOPChangeRequest } from "./MOPChangeRequest";
import { GRNReversal } from "./GRNReversal";

export function StoreFinanceContent() {
  const [searchQuery, setSearchQuery] = useState("");
  
  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Store Finance</h1>
          <p className="text-gray-600">Cash management and operational adjustments</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New Entry
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Today's Collection</p>
                <p className="text-xl font-semibold">₹2,45,680</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Wallet className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Petty Cash</p>
                <p className="text-xl font-semibold">₹8,450</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <CreditCard className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Pending MOP Changes</p>
                <p className="text-xl font-semibold">3</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Cash Variance</p>
                <p className="text-xl font-semibold">₹125</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Daily Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Daily Financial Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-medium text-blue-900 mb-2">Cash Sales</h3>
              <p className="text-2xl font-bold text-blue-700">₹1,25,340</p>
              <p className="text-sm text-blue-600">145 transactions</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-medium text-green-900 mb-2">Card Sales</h3>
              <p className="text-2xl font-bold text-green-700">₹95,680</p>
              <p className="text-sm text-green-600">78 transactions</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <h3 className="font-medium text-purple-900 mb-2">UPI Sales</h3>
              <p className="text-2xl font-bold text-purple-700">₹24,660</p>
              <p className="text-sm text-purple-600">32 transactions</p>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg">
              <h3 className="font-medium text-orange-900 mb-2">Bank Drop</h3>
              <p className="text-2xl font-bold text-orange-700">₹1,20,000</p>
              <p className="text-sm text-orange-600">Deposited at 2:30 PM</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="cash-reconciliation" className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
          <TabsTrigger value="cash-reconciliation">Cash Reconciliation</TabsTrigger>
          <TabsTrigger value="petty-cash">Petty Cash</TabsTrigger>
          <TabsTrigger value="mop-change">MOP Change</TabsTrigger>
          <TabsTrigger value="grn-reversal">Cancel GRN</TabsTrigger>
        </TabsList>
        
        <TabsContent value="cash-reconciliation" className="mt-6">
          <CashReconciliation />
        </TabsContent>
        
        <TabsContent value="petty-cash" className="mt-6">
          <PettyCashManager />
        </TabsContent>
        
        <TabsContent value="mop-change" className="mt-6">
          <MOPChangeRequest />
        </TabsContent>
        
        <TabsContent value="grn-reversal" className="mt-6">
          <GRNReversal />
        </TabsContent>
      </Tabs>
    </div>
  );
}
