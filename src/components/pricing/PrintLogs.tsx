
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Printer, Calendar, User, Eye, Download, AlertCircle, CheckCircle, Clock } from "lucide-react";

interface PrintLogsProps {
  searchQuery: string;
}

export function PrintLogs({ searchQuery }: PrintLogsProps) {
  const printLogs = [
    {
      id: "LOG-2024-001",
      jobId: "PRINT-001",
      timestamp: "2024-01-23 10:30:45",
      user: "Rajesh Kumar",
      printer: "SEL Printer 1",
      format: "Standard SEL",
      itemsCount: 25,
      status: "Completed",
      duration: "45 seconds",
      errorCount: 0,
      retryCount: 0,
      products: [
        { sku: "SKU-001", name: "Samsung Galaxy S24", status: "Printed" },
        { sku: "SKU-002", name: "iPhone 15 Pro", status: "Printed" },
        { sku: "SKU-003", name: "OnePlus 12", status: "Printed" }
      ]
    },
    {
      id: "LOG-2024-002",
      jobId: "PRINT-002",
      timestamp: "2024-01-23 09:15:22",
      user: "Priya Singh",
      printer: "SEL Printer 2",
      format: "Large SEL",
      itemsCount: 12,
      status: "Completed",
      duration: "32 seconds",
      errorCount: 0,
      retryCount: 1,
      products: [
        { sku: "SKU-010", name: "Sony 65\" OLED TV", status: "Printed" },
        { sku: "SKU-011", name: "LG 55\" 4K TV", status: "Printed" }
      ]
    },
    {
      id: "LOG-2024-003",
      jobId: "PRINT-003",
      timestamp: "2024-01-23 08:45:18",
      user: "Amit Sharma",
      printer: "SEL Printer 1",
      format: "Promotional SEL",
      itemsCount: 8,
      status: "Failed",
      duration: "15 seconds",
      errorCount: 3,
      retryCount: 2,
      errorMessage: "Printer paper jam detected",
      products: [
        { sku: "SKU-020", name: "Dell Laptop", status: "Failed" },
        { sku: "SKU-021", name: "HP Printer", status: "Failed" }
      ]
    },
    {
      id: "LOG-2024-004",
      jobId: "PRINT-004",
      timestamp: "2024-01-23 08:20:33",
      user: "Neha Patel",
      printer: "SEL Printer 3",
      format: "Barcode Only",
      itemsCount: 50,
      status: "In Progress",
      duration: "Running...",
      errorCount: 0,
      retryCount: 0,
      products: [
        { sku: "SKU-030", name: "Various Items", status: "Printing" }
      ]
    },
    {
      id: "LOG-2024-005",
      jobId: "PRINT-005",
      timestamp: "2024-01-22 16:30:15",
      user: "Store Manager",
      printer: "SEL Printer 1",
      format: "Standard SEL",
      itemsCount: 100,
      status: "Completed",
      duration: "2 minutes 30 seconds",
      errorCount: 2,
      retryCount: 0,
      products: [
        { sku: "Multiple", name: "Bulk Print Job", status: "Completed" }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-800";
      case "Failed": return "bg-red-100 text-red-800";
      case "In Progress": return "bg-blue-100 text-blue-800";
      case "Cancelled": return "bg-gray-100 text-gray-800";
      default: return "bg-yellow-100 text-yellow-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed": return <CheckCircle className="h-4 w-4" />;
      case "Failed": return <AlertCircle className="h-4 w-4" />;
      case "In Progress": return <Clock className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getFormatColor = (format: string) => {
    switch (format) {
      case "Standard SEL": return "bg-blue-100 text-blue-800";
      case "Large SEL": return "bg-purple-100 text-purple-800";
      case "Promotional SEL": return "bg-red-100 text-red-800";
      case "Barcode Only": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredLogs = printLogs.filter(log => 
    log.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.jobId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.printer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDownloadLog = (logId: string) => {
    console.log('Downloading log:', logId);
  };

  const handleRetryJob = (logId: string) => {
    console.log('Retrying print job:', logId);
  };

  return (
    <div className="space-y-4">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Successful Jobs</p>
                <p className="text-xl font-semibold">87</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertCircle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Failed Jobs</p>
                <p className="text-xl font-semibold">3</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Printer className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Labels Printed</p>
                <p className="text-xl font-semibold">2,847</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Clock className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Avg. Job Time</p>
                <p className="text-xl font-semibold">1.2 min</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Print Logs */}
      {filteredLogs.map((log) => (
        <Card key={log.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="space-y-4">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <Printer className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{log.jobId}</h3>
                    <p className="text-sm text-gray-600 flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {log.timestamp}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(log.status)}>
                    {getStatusIcon(log.status)}
                    <span className="ml-1">{log.status}</span>
                  </Badge>
                  <Badge className={getFormatColor(log.format)}>
                    {log.format}
                  </Badge>
                </div>
              </div>

              {/* Job Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">User:</span>
                  <div className="font-medium flex items-center gap-1">
                    <User className="h-3 w-3" />
                    {log.user}
                  </div>
                </div>
                <div>
                  <span className="text-gray-600">Printer:</span>
                  <div className="font-medium">{log.printer}</div>
                </div>
                <div>
                  <span className="text-gray-600">Items Count:</span>
                  <div className="font-medium">{log.itemsCount}</div>
                </div>
                <div>
                  <span className="text-gray-600">Duration:</span>
                  <div className="font-medium">{log.duration}</div>
                </div>
              </div>

              {/* Job Statistics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">Errors:</span>
                  <Badge variant={log.errorCount > 0 ? "destructive" : "outline"}>
                    {log.errorCount}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">Retries:</span>
                  <Badge variant={log.retryCount > 0 ? "secondary" : "outline"}>
                    {log.retryCount}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">Success Rate:</span>
                  <span className="font-medium text-green-600">
                    {Math.round(((log.itemsCount - log.errorCount) / log.itemsCount) * 100)}%
                  </span>
                </div>
              </div>

              {/* Error Message (if any) */}
              {log.errorMessage && (
                <div className="p-3 bg-red-50 border-l-4 border-red-400 rounded">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    <span className="text-sm font-medium text-red-800">Error:</span>
                  </div>
                  <p className="text-sm text-red-700 mt-1">{log.errorMessage}</p>
                </div>
              )}

              {/* Sample Products */}
              <div>
                <span className="text-sm text-gray-600">Sample Items:</span>
                <div className="mt-1 space-y-1">
                  {log.products.slice(0, 3).map((product, index) => (
                    <div key={index} className="flex justify-between items-center text-sm">
                      <span>{product.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {product.status}
                      </Badge>
                    </div>
                  ))}
                  {log.products.length > 3 && (
                    <div className="text-sm text-gray-500">
                      +{log.products.length - 3} more items
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-2 pt-4 border-t">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl">
                    <DialogHeader>
                      <DialogTitle>Print Job Details - {log.jobId}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h5 className="font-medium mb-3">Job Information</h5>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Job ID:</span>
                              <span>{log.jobId}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Timestamp:</span>
                              <span>{log.timestamp}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">User:</span>
                              <span>{log.user}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Printer:</span>
                              <span>{log.printer}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Format:</span>
                              <Badge className={getFormatColor(log.format)}>
                                {log.format}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h5 className="font-medium mb-3">Job Statistics</h5>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Status:</span>
                              <Badge className={getStatusColor(log.status)}>
                                {log.status}
                              </Badge>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Items Count:</span>
                              <span>{log.itemsCount}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Duration:</span>
                              <span>{log.duration}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Errors:</span>
                              <span className={log.errorCount > 0 ? 'text-red-600' : 'text-green-600'}>
                                {log.errorCount}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Retries:</span>
                              <span>{log.retryCount}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="font-medium mb-3">Printed Items ({log.products.length})</h5>
                        <div className="max-h-40 overflow-y-auto space-y-2">
                          {log.products.map((product, index) => (
                            <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                              <div>
                                <div className="font-medium text-sm">{product.name}</div>
                                <div className="text-xs text-gray-600">{product.sku}</div>
                              </div>
                              <Badge variant="outline" className="text-xs">
                                {product.status}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                
                <Button variant="outline" size="sm" onClick={() => handleDownloadLog(log.id)}>
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                
                {log.status === "Failed" && (
                  <Button size="sm" onClick={() => handleRetryJob(log.id)}>
                    <Printer className="h-4 w-4 mr-2" />
                    Retry
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      
      {filteredLogs.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Printer className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Print Logs Found</h3>
            <p className="text-gray-500">No print logs match your search criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
