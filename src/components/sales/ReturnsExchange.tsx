
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RefreshCcw, CheckCircle, XCircle, Clock } from "lucide-react";

export function ReturnsExchange() {
  const returns = [
    {
      id: "RET-001",
      invoiceNo: "INV-2024-125",
      customer: "Rajesh Kumar",
      product: "Samsung 55\" 4K Smart TV",
      reason: "Defective Product",
      amount: 45000,
      requestDate: "2024-01-15",
      status: "Pending Approval",
      refundMethod: "Original Payment"
    },
    {
      id: "RET-002",
      invoiceNo: "INV-2024-098",
      customer: "Priya Sharma",
      product: "LG 450L Refrigerator",
      reason: "Size Issue",
      amount: 35000,
      requestDate: "2024-01-14",
      status: "Approved",
      refundMethod: "Store Credit"
    },
    {
      id: "RET-003",
      invoiceNo: "INV-2024-156",
      customer: "Amit Patel",
      product: "Sony Headphones",
      reason: "Change of Mind",
      amount: 2500,
      requestDate: "2024-01-13",
      status: "Rejected",
      refundMethod: "N/A"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved": return "bg-green-100 text-green-800";
      case "Pending Approval": return "bg-yellow-100 text-yellow-800";
      case "Rejected": return "bg-red-100 text-red-800";
      case "Processing": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Approved": return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "Rejected": return <XCircle className="h-4 w-4 text-red-600" />;
      default: return <Clock className="h-4 w-4 text-yellow-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Returns Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <RefreshCcw className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-xl font-bold text-blue-600">23</p>
                <p className="text-sm text-blue-700">Total Returns</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-yellow-600" />
              <div>
                <p className="text-xl font-bold text-yellow-600">8</p>
                <p className="text-sm text-yellow-700">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-xl font-bold text-green-600">12</p>
                <p className="text-sm text-green-700">Approved</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <XCircle className="h-8 w-8 text-red-600" />
              <div>
                <p className="text-xl font-bold text-red-600">3</p>
                <p className="text-sm text-red-700">Rejected</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Returns List */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Return Requests</CardTitle>
            <Button size="sm">
              Process Returns
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {returns.map((returnItem) => (
              <div key={returnItem.id} className="p-6 hover:bg-gray-50">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      {getStatusIcon(returnItem.status)}
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                        <h4 className="font-medium text-gray-900">{returnItem.product}</h4>
                        <Badge className={getStatusColor(returnItem.status)}>
                          {returnItem.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">Invoice:</span> {returnItem.invoiceNo}
                        </div>
                        <div>
                          <span className="font-medium">Customer:</span> {returnItem.customer}
                        </div>
                        <div>
                          <span className="font-medium">Reason:</span> {returnItem.reason}
                        </div>
                        <div>
                          <span className="font-medium">Amount:</span> ₹{returnItem.amount.toLocaleString()}
                        </div>
                      </div>
                      <p className="text-xs text-gray-500">Requested on: {returnItem.requestDate}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {returnItem.status === "Pending Approval" && (
                      <>
                        <Button size="sm" variant="outline">
                          Approve
                        </Button>
                        <Button size="sm" variant="outline">
                          Reject
                        </Button>
                      </>
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
