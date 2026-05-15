
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CheckCircle, Clock, XCircle, AlertTriangle, Eye, Phone } from "lucide-react";

interface ApprovalTrackerProps {
  searchQuery: string;
}

export function ApprovalTracker({ searchQuery }: ApprovalTrackerProps) {
  const applications = [
    {
      id: "FIN-2024-001",
      customerName: "Rajesh Kumar",
      mobile: "9876543210",
      productName: "Samsung 55\" 4K Smart TV",
      loanAmount: "₹65,000",
      nbfcPartner: "Bajaj Finserv",
      status: "Under Review",
      stage: "Document Verification",
      progress: 60,
      submittedDate: "2024-01-22",
      expectedDecision: "2024-01-25",
      timeline: [
        { stage: "Application Submitted", status: "completed", date: "2024-01-22" },
        { stage: "Eligibility Check", status: "completed", date: "2024-01-22" },
        { stage: "Document Verification", status: "in-progress", date: "2024-01-23" },
        { stage: "Credit Assessment", status: "pending", date: "" },
        { stage: "Final Approval", status: "pending", date: "" }
      ]
    },
    {
      id: "FIN-2024-002",
      customerName: "Priya Singh",
      mobile: "9876543211", 
      productName: "iPhone 15 Pro",
      loanAmount: "₹1,29,900",
      nbfcPartner: "HDFC Bank",
      status: "Approved",
      stage: "Loan Disbursed",
      progress: 100,
      submittedDate: "2024-01-20",
      expectedDecision: "2024-01-23",
      timeline: [
        { stage: "Application Submitted", status: "completed", date: "2024-01-20" },
        { stage: "Eligibility Check", status: "completed", date: "2024-01-20" },
        { stage: "Document Verification", status: "completed", date: "2024-01-21" },
        { stage: "Credit Assessment", status: "completed", date: "2024-01-22" },
        { stage: "Final Approval", status: "completed", date: "2024-01-23" }
      ]
    },
    {
      id: "FIN-2024-003",
      customerName: "Amit Sharma",
      mobile: "9876543212",
      productName: "Dell Laptop",
      loanAmount: "₹75,000",
      nbfcPartner: "Tata Capital",
      status: "Rejected",
      stage: "Credit Assessment",
      progress: 75,
      submittedDate: "2024-01-19",
      expectedDecision: "2024-01-22",
      timeline: [
        { stage: "Application Submitted", status: "completed", date: "2024-01-19" },
        { stage: "Eligibility Check", status: "completed", date: "2024-01-19" },
        { stage: "Document Verification", status: "completed", date: "2024-01-20" },
        { stage: "Credit Assessment", status: "rejected", date: "2024-01-21" },
        { stage: "Final Approval", status: "cancelled", date: "" }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved": return "bg-green-100 text-green-800";
      case "Under Review": return "bg-yellow-100 text-yellow-800";
      case "Rejected": return "bg-red-100 text-red-800";
      case "Pending": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStageIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "in-progress": return <Clock className="h-5 w-5 text-yellow-600" />;
      case "rejected": return <XCircle className="h-5 w-5 text-red-600" />;
      case "cancelled": return <XCircle className="h-5 w-5 text-gray-400" />;
      default: return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  const filteredApplications = applications.filter(app => 
    app.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.mobile.includes(searchQuery)
  );

  return (
    <div className="space-y-4">
      {filteredApplications.map((app) => (
        <Card key={app.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex-1 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <h3 className="font-semibold text-gray-900">{app.id}</h3>
                  <Badge className={getStatusColor(app.status)}>
                    {app.status}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                  <div>
                    <span className="font-medium">Customer:</span> {app.customerName}
                  </div>
                  <div>
                    <span className="font-medium">Product:</span> {app.productName}
                  </div>
                  <div>
                    <span className="font-medium">Amount:</span> {app.loanAmount}
                  </div>
                  <div>
                    <span className="font-medium">NBFC:</span> {app.nbfcPartner}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">Current Stage: {app.stage}</span>
                    <span>{app.progress}% Complete</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        app.status === 'Approved' ? 'bg-green-600' : 
                        app.status === 'Rejected' ? 'bg-red-600' : 'bg-yellow-600'
                      }`}
                      style={{ width: `${app.progress}%` }}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
                  <div>
                    <span className="font-medium">Submitted:</span> {app.submittedDate}
                  </div>
                  <div>
                    <span className="font-medium">Expected Decision:</span> {app.expectedDecision}
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View Timeline
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl">
                    <DialogHeader>
                      <DialogTitle>Application Timeline - {app.id}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Application Details</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Customer:</span>
                              <span>{app.customerName}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Product:</span>
                              <span>{app.productName}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Loan Amount:</span>
                              <span>{app.loanAmount}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">NBFC Partner:</span>
                              <span>{app.nbfcPartner}</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Status Overview</h4>
                          <div className="space-y-2">
                            <Badge className={getStatusColor(app.status)}>
                              {app.status}
                            </Badge>
                            <div className="text-sm">
                              <div>Current Stage: {app.stage}</div>
                              <div>Progress: {app.progress}%</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Application Timeline</h4>
                        <div className="space-y-4">
                          {app.timeline.map((step, index) => (
                            <div key={step.stage} className="flex items-center gap-4">
                              <div className="flex-shrink-0">
                                {getStageIcon(step.status)}
                              </div>
                              <div className="flex-1">
                                <div className="flex justify-between items-center">
                                  <span className="font-medium">{step.stage}</span>
                                  {step.date && (
                                    <span className="text-sm text-gray-600">{step.date}</span>
                                  )}
                                </div>
                                {step.status === 'in-progress' && (
                                  <div className="text-sm text-yellow-600">In Progress</div>
                                )}
                                {step.status === 'rejected' && (
                                  <div className="text-sm text-red-600">Application rejected at this stage</div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                
                <Button variant="outline" size="sm">
                  <Phone className="h-4 w-4 mr-2" />
                  Contact Customer
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      
      {filteredApplications.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Applications Found</h3>
            <p className="text-gray-500">No finance applications match your search criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
