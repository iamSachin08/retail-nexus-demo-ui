
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  FileText, 
  Eye, 
  Download, 
  Filter,
  Clock,
  User,
  Shield,
  AlertTriangle
} from "lucide-react";

interface AuditTrailProps {
  searchQuery: string;
}

export function AuditTrail({ searchQuery }: AuditTrailProps) {
  const auditLogs = [
    {
      id: "A001",
      timestamp: "2024-01-15 14:30:25",
      user: "Rajesh Kumar",
      userRole: "Store Manager",
      action: "Price Override",
      module: "Sales",
      details: "Modified price for iPhone 15 Pro Max from ₹1,34,900 to ₹1,29,900",
      ipAddress: "192.168.1.45",
      status: "Success",
      severity: "Medium"
    },
    {
      id: "A002",
      timestamp: "2024-01-15 14:15:12",
      user: "Priya Sharma", 
      userRole: "Sales Associate",
      action: "Return Processing",
      module: "Returns",
      details: "Processed return for order #ORD123456 - MacBook Air M2",
      ipAddress: "192.168.1.23",
      status: "Success",
      severity: "Low"
    },
    {
      id: "A003",
      timestamp: "2024-01-15 13:45:08",
      user: "Amit Singh",
      userRole: "Inventory Manager",
      action: "Stock Adjustment",
      module: "Inventory",
      details: "Bulk stock adjustment - Samsung Galaxy S24 series",
      ipAddress: "192.168.1.67",
      status: "Success", 
      severity: "High"
    },
    {
      id: "A004",
      timestamp: "2024-01-15 13:20:33",
      user: "System",
      userRole: "System",
      action: "Login Attempt", 
      module: "Authentication",
      details: "Failed login attempt from unknown device",
      ipAddress: "203.45.67.89",
      status: "Failed",
      severity: "High"
    },
    {
      id: "A005",
      timestamp: "2024-01-15 12:55:17",
      user: "Sneha Patel",
      userRole: "Customer Service",
      action: "Customer Data Access",
      module: "Customer",
      details: "Viewed customer profile for Rahul Gupta (+91 98765 43210)",
      ipAddress: "192.168.1.34",
      status: "Success",
      severity: "Low"
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "High": return "bg-red-100 text-red-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    return status === "Success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800";
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case "Price Override": return <AlertTriangle className="h-4 w-4" />;
      case "Return Processing": return <FileText className="h-4 w-4" />;
      case "Stock Adjustment": return <FileText className="h-4 w-4" />;
      case "Login Attempt": return <Shield className="h-4 w-4" />;
      case "Customer Data Access": return <User className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const filteredLogs = auditLogs.filter(log => 
    log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.module.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.details.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Filter Controls */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-1">
              <select className="p-2 border rounded-md">
                <option>All Modules</option>
                <option>Sales</option>
                <option>Inventory</option>
                <option>Returns</option>
                <option>Authentication</option>
                <option>Customer</option>
              </select>
              
              <select className="p-2 border rounded-md">
                <option>All Severities</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
              
              <select className="p-2 border rounded-md">
                <option>Last 24 Hours</option>
                <option>Last Week</option>
                <option>Last Month</option>
                <option>Custom Range</option>
              </select>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Advanced Filter
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Audit Log Entries */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Audit Trail
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredLogs.map((log) => (
              <div key={log.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      {getActionIcon(log.action)}
                    </div>
                    <div>
                      <h3 className="font-semibold">{log.action}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="h-3 w-3" />
                        <span>{log.timestamp}</span>
                        <span>•</span>
                        <span>{log.module}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Badge className={getSeverityColor(log.severity)}>
                      {log.severity}
                    </Badge>
                    <Badge className={getStatusColor(log.status)}>
                      {log.status}
                    </Badge>
                  </div>
                </div>

                <div className="ml-14 space-y-2">
                  <p className="text-sm text-gray-700">{log.details}</p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-4">
                      <span>User: <strong>{log.user}</strong> ({log.userRole})</span>
                      <span>IP: {log.ipAddress}</span>
                      <span>ID: {log.id}</span>
                    </div>
                    
                    <Button size="sm" variant="ghost">
                      <Eye className="h-3 w-3 mr-1" />
                      Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Audit Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <FileText className="h-8 w-8 mx-auto mb-2 text-blue-600" />
            <p className="text-2xl font-bold">2,847</p>
            <p className="text-sm text-gray-600">Total Entries</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <AlertTriangle className="h-8 w-8 mx-auto mb-2 text-red-600" />
            <p className="text-2xl font-bold">23</p>
            <p className="text-sm text-gray-600">High Severity</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Shield className="h-8 w-8 mx-auto mb-2 text-orange-600" />
            <p className="text-2xl font-bold">7</p>
            <p className="text-sm text-gray-600">Failed Attempts</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <User className="h-8 w-8 mx-auto mb-2 text-green-600" />
            <p className="text-2xl font-bold">147</p>
            <p className="text-sm text-gray-600">Active Users</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
