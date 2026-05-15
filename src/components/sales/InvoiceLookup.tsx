import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Eye } from "lucide-react";

interface InvoiceLookupProps {
  searchQuery: string;
}

export function InvoiceLookup({ searchQuery }: InvoiceLookupProps) {
  const invoices = [
    {
      invoiceNo: "INV-2024-001",
      customer: "Rajesh Kumar",
      date: "2024-01-15",
      amount: 45000,
      items: 2,
      paymentMode: "Card",
      status: "Paid",
      salesPerson: "Amit Kumar"
    },
    {
      invoiceNo: "INV-2024-002",
      customer: "Priya Sharma",
      date: "2024-01-15",
      amount: 28000,
      items: 1,
      paymentMode: "UPI",
      status: "Paid",
      salesPerson: "Rahul Patel"
    },
    {
      invoiceNo: "INV-2024-003",
      customer: "Suman Singh",
      date: "2024-01-14",
      amount: 67500,
      items: 3,
      paymentMode: "Paper Finance",
      status: "Partial",
      salesPerson: "Priya Shah"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid": return "bg-green-100 text-green-800";
      case "Partial": return "bg-yellow-100 text-yellow-800";
      case "Pending": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredInvoices = invoices.filter(invoice => 
    invoice.invoiceNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
    invoice.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    invoice.salesPerson.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Invoice Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <FileText className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-xl font-bold text-blue-600">247</p>
                <p className="text-sm text-blue-700">Total Invoices</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-bold">₹</span>
              </div>
              <div>
                <p className="text-xl font-bold text-green-600">₹24.5L</p>
                <p className="text-sm text-green-700">Total Value</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-orange-600 font-bold">%</span>
              </div>
              <div>
                <p className="text-xl font-bold text-orange-600">12</p>
                <p className="text-sm text-orange-700">Pending Payment</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Invoice List */}
      <Card>
        <CardHeader>
          <CardTitle>Invoice Details</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {filteredInvoices.map((invoice) => (
              <div key={invoice.invoiceNo} className="p-6 hover:bg-gray-50">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <FileText className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                        <h4 className="font-medium text-gray-900">{invoice.invoiceNo}</h4>
                        <Badge className={getStatusColor(invoice.status)}>
                          {invoice.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">Customer:</span> {invoice.customer}
                        </div>
                        <div>
                          <span className="font-medium">Amount:</span> ₹{invoice.amount.toLocaleString()}
                        </div>
                        <div>
                          <span className="font-medium">Payment:</span> {invoice.paymentMode}
                        </div>
                        <div>
                          <span className="font-medium">Sales Person:</span> {invoice.salesPerson}
                        </div>
                      </div>
                      <p className="text-xs text-gray-500">Date: {invoice.date} • Items: {invoice.items}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download
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
