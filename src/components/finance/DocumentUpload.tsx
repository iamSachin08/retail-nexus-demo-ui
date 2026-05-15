
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Upload, FileText, Eye, CheckCircle, Clock, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DocumentUploadProps {
  searchQuery: string;
}

export function DocumentUpload({ searchQuery }: DocumentUploadProps) {
  const { toast } = useToast();

  const documentRequests = [
    {
      id: "DOC-2024-001",
      applicationId: "FIN-2024-001",
      customerName: "Rajesh Kumar",
      mobile: "9876543210",
      requiredDocs: ["Aadhaar Card", "PAN Card", "Salary Slip", "Bank Statement"],
      uploadedDocs: ["Aadhaar Card", "PAN Card"],
      pendingDocs: ["Salary Slip", "Bank Statement"],
      status: "Partially Uploaded",
      submittedDate: "2024-01-22",
      deadline: "2024-01-25"
    },
    {
      id: "DOC-2024-002",
      applicationId: "FIN-2024-002",
      customerName: "Priya Singh", 
      mobile: "9876543211",
      requiredDocs: ["Aadhaar Card", "PAN Card", "ITR", "Bank Statement"],
      uploadedDocs: ["Aadhaar Card", "PAN Card", "ITR", "Bank Statement"],
      pendingDocs: [],
      status: "Complete",
      submittedDate: "2024-01-21",
      deadline: "2024-01-24"
    },
    {
      id: "DOC-2024-003",
      applicationId: "FIN-2024-003",
      customerName: "Amit Sharma",
      mobile: "9876543212",
      requiredDocs: ["Aadhaar Card", "PAN Card", "Business Proof", "GST Certificate"],
      uploadedDocs: [],
      pendingDocs: ["Aadhaar Card", "PAN Card", "Business Proof", "GST Certificate"],
      status: "Pending",
      submittedDate: "2024-01-20",
      deadline: "2024-01-23"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Complete": return "bg-green-100 text-green-800";
      case "Partially Uploaded": return "bg-yellow-100 text-yellow-800";
      case "Pending": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredRequests = documentRequests.filter(request => 
    request.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    request.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    request.mobile.includes(searchQuery)
  );

  const handleFileUpload = (docType: string, requestId: string) => {
    toast({
      title: "Document Uploaded",
      description: `${docType} uploaded successfully for ${requestId}`,
    });
  };

  return (
    <div className="space-y-4">
      {filteredRequests.map((request) => (
        <Card key={request.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex-1 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <h3 className="font-semibold text-gray-900">{request.id}</h3>
                  <Badge className={getStatusColor(request.status)}>
                    {request.status}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                  <div>
                    <span className="font-medium">Customer:</span> {request.customerName}
                  </div>
                  <div>
                    <span className="font-medium">Mobile:</span> {request.mobile}
                  </div>
                  <div>
                    <span className="font-medium">Application:</span> {request.applicationId}
                  </div>
                  <div>
                    <span className="font-medium">Deadline:</span> {request.deadline}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="font-medium text-green-700">Uploaded ({request.uploadedDocs.length}):</span>
                    {request.uploadedDocs.length > 0 ? (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {request.uploadedDocs.map((doc) => (
                          <Badge key={doc} variant="outline" className="text-green-700 border-green-200">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            {doc}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <span className="text-gray-500 ml-2">None</span>
                    )}
                  </div>
                  
                  <div className="text-sm">
                    <span className="font-medium text-red-700">Pending ({request.pendingDocs.length}):</span>
                    {request.pendingDocs.length > 0 ? (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {request.pendingDocs.map((doc) => (
                          <Badge key={doc} variant="outline" className="text-red-700 border-red-200">
                            <Clock className="h-3 w-3 mr-1" />
                            {doc}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <span className="text-green-600 ml-2">All documents uploaded</span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View Documents
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl">
                    <DialogHeader>
                      <DialogTitle>Document Management - {request.id}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Application Details</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Customer:</span>
                              <span>{request.customerName}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Mobile:</span>
                              <span>{request.mobile}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Application ID:</span>
                              <span>{request.applicationId}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Deadline:</span>
                              <span>{request.deadline}</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Upload Progress</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Uploaded: {request.uploadedDocs.length}</span>
                              <span>Pending: {request.pendingDocs.length}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-green-600 h-2 rounded-full" 
                                style={{ 
                                  width: `${(request.uploadedDocs.length / request.requiredDocs.length) * 100}%` 
                                }}
                              />
                            </div>
                            <Badge className={getStatusColor(request.status)}>
                              {request.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Required Documents</h4>
                        <div className="space-y-3">
                          {request.requiredDocs.map((doc) => {
                            const isUploaded = request.uploadedDocs.includes(doc);
                            return (
                              <div key={doc} className="flex items-center justify-between p-3 border rounded-lg">
                                <div className="flex items-center gap-3">
                                  {isUploaded ? (
                                    <CheckCircle className="h-5 w-5 text-green-600" />
                                  ) : (
                                    <AlertTriangle className="h-5 w-5 text-red-600" />
                                  )}
                                  <span className="font-medium">{doc}</span>
                                  {isUploaded && (
                                    <Badge className="bg-green-100 text-green-800">
                                      Uploaded
                                    </Badge>
                                  )}
                                </div>
                                <div className="flex gap-2">
                                  {isUploaded ? (
                                    <Button variant="outline" size="sm">
                                      <Eye className="h-4 w-4 mr-2" />
                                      View
                                    </Button>
                                  ) : (
                                    <div className="flex gap-2">
                                      <Input type="file" className="hidden" id={`file-${doc}`} />
                                      <Label htmlFor={`file-${doc}`} asChild>
                                        <Button size="sm" onClick={() => handleFileUpload(doc, request.id)}>
                                          <Upload className="h-4 w-4 mr-2" />
                                          Upload
                                        </Button>
                                      </Label>
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <DialogClose asChild>
                        <Button variant="outline">Close</Button>
                      </DialogClose>
                      <Button>Send Reminder</Button>
                    </div>
                  </DialogContent>
                </Dialog>
                
                <Button 
                  size="sm" 
                  disabled={request.pendingDocs.length === 0}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Documents
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      
      {filteredRequests.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Document Requests Found</h3>
            <p className="text-gray-500">No document upload requests match your search criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
