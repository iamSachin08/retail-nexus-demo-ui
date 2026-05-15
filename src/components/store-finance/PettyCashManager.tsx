
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Wallet, 
  Plus, 
  Minus,
  Receipt,
  Calendar,
  User,
  DollarSign
} from "lucide-react";

export function PettyCashManager() {
  const [formData, setFormData] = useState({
    type: "",
    amount: "",
    category: "",
    description: "",
    receipt: ""
  });

  const pettyCashEntries = [
    {
      id: "PC001",
      date: "2024-01-24",
      type: "expense",
      category: "Office Supplies",
      description: "Printer ink cartridges",
      amount: 850,
      receipt: "RC240124001",
      approvedBy: "Store Manager",
      balance: 7600
    },
    {
      id: "PC002",
      date: "2024-01-24",
      type: "expense",
      category: "Maintenance",
      description: "AC service and cleaning",
      amount: 1200,
      receipt: "RC240124002",
      approvedBy: "Store Manager",
      balance: 8450
    },
    {
      id: "PC003",
      date: "2024-01-23",
      type: "replenishment",
      category: "Cash Float",
      description: "Petty cash replenishment",
      amount: 5000,
      receipt: "RC240123001",
      approvedBy: "Area Manager",
      balance: 9650
    },
    {
      id: "PC004",
      date: "2024-01-23",
      type: "expense",
      category: "Utilities",
      description: "Emergency electrician service",
      amount: 1500,
      receipt: "RC240123002",
      approvedBy: "Store Manager",
      balance: 4650
    }
  ];

  const categories = [
    "Office Supplies",
    "Maintenance",
    "Utilities",
    "Transportation",
    "Refreshments",
    "Emergency Repairs",
    "Cleaning Supplies",
    "Stationery",
    "Other"
  ];

  const currentBalance = 8450;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* New Entry Form */}
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              New Petty Cash Entry
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="type">Transaction Type</Label>
                <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="expense">
                      <div className="flex items-center gap-2">
                        <Minus className="h-4 w-4 text-red-500" />
                        Expense
                      </div>
                    </SelectItem>
                    <SelectItem value="replenishment">
                      <div className="flex items-center gap-2">
                        <Plus className="h-4 w-4 text-green-500" />
                        Replenishment
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="amount">Amount (₹)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount"
                  value={formData.amount}
                  onChange={(e) => setFormData({...formData, amount: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="receipt">Receipt/Reference No.</Label>
                <Input
                  id="receipt"
                  placeholder="Receipt number"
                  value={formData.receipt}
                  onChange={(e) => setFormData({...formData, receipt: e.target.value})}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Provide details about the transaction..."
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows={3}
              />
            </div>

            {/* File Upload */}
            <div>
              <Label htmlFor="attachment">Receipt Attachment</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                <Receipt className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-2">Upload receipt or bill</p>
                <Button variant="outline" size="sm">
                  Choose File
                </Button>
              </div>
            </div>

            <div className="flex gap-3">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Entry
              </Button>
              <Button variant="outline">Clear Form</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Balance & Summary */}
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Wallet className="h-5 w-5" />
              Current Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                ₹{currentBalance.toLocaleString()}
              </div>
              <p className="text-sm text-gray-600">As of {new Date().toLocaleDateString()}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Today's Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Opening Balance:</span>
                <span className="font-medium">₹9,650</span>
              </div>
              <div className="flex justify-between items-center text-red-600">
                <span className="text-sm">Total Expenses:</span>
                <span className="font-medium">₹2,050</span>
              </div>
              <div className="flex justify-between items-center text-green-600">
                <span className="text-sm">Replenishments:</span>
                <span className="font-medium">₹850</span>
              </div>
              <hr />
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Closing Balance:</span>
                <span className="font-semibold">₹8,450</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-start">
              <DollarSign className="h-4 w-4 mr-2" />
              Request Replenishment
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Receipt className="h-4 w-4 mr-2" />
              View All Receipts
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Calendar className="h-4 w-4 mr-2" />
              Monthly Report
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Entries */}
      <div className="lg:col-span-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Receipt className="h-5 w-5" />
              Recent Petty Cash Entries
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Date</th>
                    <th className="text-left p-2">Type</th>
                    <th className="text-left p-2">Category</th>
                    <th className="text-left p-2">Description</th>
                    <th className="text-right p-2">Amount</th>
                    <th className="text-right p-2">Balance</th>
                    <th className="text-left p-2">Approved By</th>
                  </tr>
                </thead>
                <tbody>
                  {pettyCashEntries.map((entry) => (
                    <tr key={entry.id} className="border-b hover:bg-gray-50">
                      <td className="p-2">{entry.date}</td>
                      <td className="p-2">
                        <Badge variant={entry.type === 'expense' ? 'destructive' : 'default'}>
                          {entry.type === 'expense' ? (
                            <Minus className="h-3 w-3 mr-1" />
                          ) : (
                            <Plus className="h-3 w-3 mr-1" />
                          )}
                          {entry.type}
                        </Badge>
                      </td>
                      <td className="p-2">{entry.category}</td>
                      <td className="p-2">{entry.description}</td>
                      <td className={`p-2 text-right font-medium ${entry.type === 'expense' ? 'text-red-600' : 'text-green-600'}`}>
                        {entry.type === 'expense' ? '-' : '+'}₹{entry.amount.toLocaleString()}
                      </td>
                      <td className="p-2 text-right font-medium">₹{entry.balance.toLocaleString()}</td>
                      <td className="p-2">
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          <span className="text-xs">{entry.approvedBy}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
