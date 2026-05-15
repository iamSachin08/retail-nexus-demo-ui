
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileCheck, Calendar, User } from "lucide-react";

export function StockAudit() {
  const audits = [
    {
      id: "AUD-001",
      date: "2024-01-15",
      auditor: "Rahul Sharma",
      category: "Electronics - TV",
      itemsChecked: 45,
      discrepancies: 2,
      status: "Completed",
      accuracy: "95.6%"
    },
    {
      id: "AUD-002",
      date: "2024-01-14",
      auditor: "Priya Patel",
      category: "Home Appliances",
      itemsChecked: 32,
      discrepancies: 0,
      status: "Completed",
      accuracy: "100%"
    },
    {
      id: "AUD-003",
      date: "2024-01-13",
      auditor: "Amit Kumar",
      category: "Mobile & Accessories",
      itemsChecked: 67,
      discrepancies: 5,
      status: "Under Review",
      accuracy: "92.5%"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-800";
      case "Under Review": return "bg-yellow-100 text-yellow-800";
      case "Pending": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Audit Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">98.2%</p>
              <p className="text-sm text-gray-600">Overall Accuracy</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">144</p>
              <p className="text-sm text-gray-600">Items Audited</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">7</p>
              <p className="text-sm text-gray-600">Discrepancies</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <Button>
          <FileCheck className="h-4 w-4 mr-2" />
          Start New Audit
        </Button>
        <Button variant="outline">
          <Calendar className="h-4 w-4 mr-2" />
          Schedule Audit
        </Button>
        <Button variant="outline">
          Download Report
        </Button>
      </div>

      {/* Recent Audits */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Audits</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {audits.map((audit) => (
              <div key={audit.id} className="p-6 hover:bg-gray-50">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <h4 className="font-medium text-gray-900">{audit.category}</h4>
                      <Badge className={getStatusColor(audit.status)}>
                        {audit.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {audit.date}
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        {audit.auditor}
                      </div>
                      <div>
                        <span className="font-medium">Items Checked:</span> {audit.itemsChecked}
                      </div>
                      <div>
                        <span className="font-medium">Discrepancies:</span> {audit.discrepancies}
                      </div>
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="text-lg font-semibold text-green-600">{audit.accuracy}</p>
                    <p className="text-xs text-gray-500">Accuracy Rate</p>
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
