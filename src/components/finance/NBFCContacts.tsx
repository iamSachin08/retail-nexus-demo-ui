
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Phone, Mail, Globe, MapPin, Users, TrendingUp } from "lucide-react";

interface NBFCContactsProps {
  searchQuery: string;
}

export function NBFCContacts({ searchQuery }: NBFCContactsProps) {
  const nbfcPartners = [
    {
      id: "NBFC-001",
      name: "Bajaj Finserv",
      logo: "/placeholder.svg",
      status: "Active",
      partnership: "Preferred Partner",
      contactPerson: "Ramesh Agarwal",
      designation: "Regional Manager",
      phone: "+91 98765 43210",
      email: "ramesh.agarwal@bajajfinserv.in",
      website: "www.bajajfinserv.in",
      address: "Mumbai, Maharashtra",
      productsOffered: ["Consumer Durables", "Electronics", "Two Wheeler"],
      interestRates: "12% - 18%",
      processingTime: "2-3 days",
      approvalRate: "85%",
      monthlyApplications: 45
    },
    {
      id: "NBFC-002", 
      name: "HDFC Bank",
      logo: "/placeholder.svg",
      status: "Active",
      partnership: "Premium Partner",
      contactPerson: "Priya Sharma",
      designation: "Business Head",
      phone: "+91 98765 43211",
      email: "priya.sharma@hdfcbank.com",
      website: "www.hdfcbank.com",
      address: "Delhi, NCR",
      productsOffered: ["Personal Loan", "Consumer Durables", "Electronics"],
      interestRates: "10% - 16%",
      processingTime: "1-2 days",
      approvalRate: "92%",
      monthlyApplications: 67
    },
    {
      id: "NBFC-003",
      name: "Tata Capital",
      logo: "/placeholder.svg",
      status: "Active",
      partnership: "Standard Partner",
      contactPerson: "Vikram Singh",
      designation: "Area Manager",
      phone: "+91 98765 43212",
      email: "vikram.singh@tatacapital.com",
      website: "www.tatacapital.com",
      address: "Pune, Maharashtra",
      productsOffered: ["Consumer Durables", "Home Appliances"],
      interestRates: "14% - 20%",
      processingTime: "3-4 days",
      approvalRate: "78%",
      monthlyApplications: 32
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800";
      case "Inactive": return "bg-red-100 text-red-800";
      case "On Hold": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPartnershipColor = (partnership: string) => {
    switch (partnership) {
      case "Premium Partner": return "bg-purple-100 text-purple-800";
      case "Preferred Partner": return "bg-blue-100 text-blue-800";
      case "Standard Partner": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredPartners = nbfcPartners.filter(partner => 
    partner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    partner.contactPerson.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {filteredPartners.map((partner) => (
        <Card key={partner.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex-1 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <TrendingUp className="h-6 w-6 text-gray-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900">{partner.name}</h3>
                  </div>
                  <div className="flex gap-2">
                    <Badge className={getStatusColor(partner.status)}>
                      {partner.status}
                    </Badge>
                    <Badge className={getPartnershipColor(partner.partnership)}>
                      {partner.partnership}
                    </Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                  <div>
                    <span className="font-medium">Contact:</span> {partner.contactPerson}
                  </div>
                  <div>
                    <span className="font-medium">Designation:</span> {partner.designation}
                  </div>
                  <div>
                    <span className="font-medium">Interest Rates:</span> {partner.interestRates}
                  </div>
                  <div>
                    <span className="font-medium">Approval Rate:</span> {partner.approvalRate}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-600">
                  <div>
                    <span className="font-medium">Processing Time:</span> {partner.processingTime}
                  </div>
                  <div>
                    <span className="font-medium">Monthly Apps:</span> {partner.monthlyApplications}
                  </div>
                  <div>
                    <span className="font-medium">Location:</span> {partner.address}
                  </div>
                </div>
                
                <div className="text-sm">
                  <span className="font-medium">Products:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {partner.productsOffered.map((product) => (
                      <Badge key={product} variant="outline" className="text-blue-700 border-blue-200">
                        {product}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Users className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl">
                    <DialogHeader>
                      <DialogTitle>NBFC Partner Details - {partner.name}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Partnership Information</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Company:</span>
                              <span>{partner.name}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Status:</span>
                              <Badge className={getStatusColor(partner.status)}>
                                {partner.status}
                              </Badge>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Partnership:</span>
                              <Badge className={getPartnershipColor(partner.partnership)}>
                                {partner.partnership}
                              </Badge>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Monthly Applications:</span>
                              <span>{partner.monthlyApplications}</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Contact Information</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Contact Person:</span>
                              <span>{partner.contactPerson}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Designation:</span>
                              <span>{partner.designation}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4 text-gray-400" />
                              <span>{partner.phone}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4 text-gray-400" />
                              <span>{partner.email}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Business Terms</h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="bg-blue-50 p-3 rounded-lg">
                            <div className="font-medium text-blue-900">Interest Rates</div>
                            <div className="text-blue-800">{partner.interestRates}</div>
                          </div>
                          <div className="bg-green-50 p-3 rounded-lg">
                            <div className="font-medium text-green-900">Processing Time</div>
                            <div className="text-green-800">{partner.processingTime}</div>
                          </div>
                          <div className="bg-purple-50 p-3 rounded-lg">
                            <div className="font-medium text-purple-900">Approval Rate</div>
                            <div className="text-purple-800">{partner.approvalRate}</div>
                          </div>
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <div className="font-medium text-gray-900">Location</div>
                            <div className="text-gray-800">{partner.address}</div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Products Offered</h4>
                        <div className="flex flex-wrap gap-2">
                          {partner.productsOffered.map((product) => (
                            <Badge key={product} variant="outline" className="text-blue-700 border-blue-200">
                              {product}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline">
                        <Phone className="h-4 w-4 mr-2" />
                        Call
                      </Button>
                      <Button variant="outline">
                        <Mail className="h-4 w-4 mr-2" />
                        Email
                      </Button>
                      <Button>
                        <Globe className="h-4 w-4 mr-2" />
                        Visit Website
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
                
                <Button size="sm">
                  <Phone className="h-4 w-4 mr-2" />
                  Contact
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      
      {filteredPartners.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No NBFC Partners Found</h3>
            <p className="text-gray-500">No NBFC partners match your search criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
