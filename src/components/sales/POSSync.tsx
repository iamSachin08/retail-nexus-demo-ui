
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, AlertCircle, RefreshCcw } from "lucide-react";

interface POSSyncProps {
  searchQuery: string;
}

export function POSSync({ searchQuery }: POSSyncProps) {
  const transactions = [
    {
      id: "TXN-001",
      invoiceNo: "INV-2024-001",
      customer: "Rajesh Kumar",
      amount: 45000,
      items: 2,
      paymentMode: "Card",
      timestamp: "2024-01-15 14:30:00",
      status: "Synced",
      posTerminal: "POS-01"
    },
    {
      id: "TXN-002",
      invoiceNo: "INV-2024-002",
      customer: "Priya Sharma",
      amount: 28000,
      items: 1,
      paymentMode: "UPI",
      timestamp: "2024-01-15 13:45:00",
      status: "Pending",
      posTerminal: "POS-02"
    },
    {
      id: "TXN-003",
      invoiceNo: "INV-2024-003",
      customer: "Amit Patel",
      amount: 12500,
      items: 3,
      paymentMode: "Cash",
      timestamp: "2024-01-15 12:15:00",
      status: "Failed",
      posTerminal: "POS-01"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Synced": return "bg-green-100 text-green-800";
      case "Pending": return "bg-yellow-100 text-yellow-800";
      case "Failed": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Synced": return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "Pending": return <Clock className="h-4 w-4 text-yellow-600" />;
      case "Failed": return <AlertCircle className="h-4 w-4 text-red-600" />;
      default: return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const filteredTransactions = transactions.filter(txn => 
    txn.invoiceNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
    txn.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    txn.paymentMode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Sync Status Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-xl font-bold text-green-600">156</p>
                <p className="text-sm text-green-700">Synced Today</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-yellow-600" />
              <div>
                <p className="text-xl font-bold text-yellow-600">23</p>
                <p className="text-sm text-yellow-700">Pending Sync</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-8 w-8 text-red-600" />
              <div>
                <p className="text-xl font-bold text-red-600">4</p>
                <p className="text-sm text-red-700">Failed Sync</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transaction List */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Recent Transactions</CardTitle>
            <Button size="sm">
              <RefreshCcw className="h-4 w-4 mr-2" />
              Sync All
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {filteredTransactions.map((txn) => (
              <div key={txn.id} className="p-6 hover:bg-gray-50">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      {getStatusIcon(txn.status)}
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                        <h4 className="font-medium text-gray-900">{txn.invoiceNo}</h4>
                        <Badge className={getStatusColor(txn.status)}>
                          {txn.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">Customer:</span> {txn.customer}
                        </div>
                        <div>
                          <span className="font-medium">Amount:</span> ₹{txn.amount.toLocaleString()}
                        </div>
                        <div>
                          <span className="font-medium">Payment:</span> {txn.paymentMode}
                        </div>
                        <div>
                          <span className="font-medium">Terminal:</span> {txn.posTerminal}
                        </div>
                      </div>
                      <p className="text-xs text-gray-500">{txn.timestamp}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {txn.status === "Failed" && (
                      <Button size="sm" variant="outline">
                        Retry Sync
                      </Button>
                    )}
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
