
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Edit, Plus, Building, Star, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface VendorContactsProps {
  searchQuery: string;
}

export function VendorContacts({ searchQuery }: VendorContactsProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState<any>(null);
  const { toast } = useToast();

  const vendors = [
    {
      id: "V001",
      name: "Samsung Electronics India",
      category: "Electronics",
      rating: 4.8,
      status: "Active",
      contactPerson: "Rajesh Kumar",
      phone: "+91-9876543210",
      email: "rajesh.kumar@samsung.com",
      address: "Sector 50, Gurugram, Haryana 122018",
      totalOrders: 145,
      totalValue: "₹2,45,00,000",
      paymentTerms: "30 days",
      establishedYear: "2010"
    },
    {
      id: "V002",
      name: "LG Electronics India",
      category: "Home Appliances",
      rating: 4.6,
      status: "Active",
      contactPerson: "Priya Sharma",
      phone: "+91-9876543211",
      email: "priya.sharma@lge.com",
      address: "Noida, Uttar Pradesh 201301",
      totalOrders: 98,
      totalValue: "₹1,85,50,000",
      paymentTerms: "45 days",
      establishedYear: "2008"
    },
    {
      id: "V003",
      name: "Sony India Private Limited",
      category: "Audio Systems",
      rating: 4.7,
      status: "Active",
      contactPerson: "Amit Patel",
      phone: "+91-9876543212",
      email: "amit.patel@sony.com",
      address: "Mumbai, Maharashtra 400001",
      totalOrders: 72,
      totalValue: "₹1,25,75,000",
      paymentTerms: "30 days",
      establishedYear: "2012"
    },
    {
      id: "V004",
      name: "Whirlpool of India Limited",
      category: "Home Appliances",
      rating: 4.3,
      status: "Inactive",
      contactPerson: "Sneha Gupta",
      phone: "+91-9876543213",
      email: "sneha.gupta@whirlpool.com",
      address: "Pune, Maharashtra 411057",
      totalOrders: 34,
      totalValue: "₹78,25,000",
      paymentTerms: "60 days",
      establishedYear: "2015"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800";
      case "Inactive": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
      />
    ));
  };

  const filteredVendors = vendors.filter(vendor => 
    vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    vendor.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    vendor.contactPerson.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddVendor = () => {
    toast({
      title: "Vendor Added",
      description: "New vendor has been added successfully.",
    });
    setIsAddDialogOpen(false);
  };

  const handleEditVendor = () => {
    toast({
      title: "Vendor Updated",
      description: "Vendor information has been updated successfully.",
    });
    setIsEditDialogOpen(false);
    setSelectedVendor(null);
  };

  const handleStatusToggle = (vendorId: string, currentStatus: string) => {
    const newStatus = currentStatus === "Active" ? "Inactive" : "Active";
    toast({
      title: "Status Updated",
      description: `Vendor status changed to ${newStatus}.`,
    });
  };

  return (
    <div className="space-y-4">
      {/* Add Vendor Button */}
      <div className="flex justify-end">
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Add New Vendor
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Vendor</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="vendorName">Vendor Name</Label>
                  <Input placeholder="Enter vendor name" />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Input placeholder="e.g., Electronics, Home Appliances" />
                </div>
                <div>
                  <Label htmlFor="contactPerson">Contact Person</Label>
                  <Input placeholder="Enter contact person name" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input placeholder="Enter phone number" />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input type="email" placeholder="Enter email address" />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Textarea placeholder="Enter complete address" className="h-20" />
                </div>
                <div>
                  <Label htmlFor="paymentTerms">Payment Terms</Label>
                  <Input placeholder="e.g., 30 days, 45 days" />
                </div>
                <div>
                  <Label htmlFor="establishedYear">Established Year</Label>
                  <Input type="number" placeholder="Enter year" />
                </div>
                <div>
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea placeholder="Additional notes about the vendor" className="h-20" />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button onClick={handleAddVendor} className="bg-blue-600 hover:bg-blue-700">
                Add Vendor
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Vendor List */}
      {filteredVendors.map((vendor) => (
        <Card key={vendor.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
              <div className="flex-1 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <div className="flex items-center gap-2">
                    <Building className="h-5 w-5 text-blue-600" />
                    <h3 className="font-semibold text-gray-900">{vendor.name}</h3>
                  </div>
                  <div className="flex gap-2">
                    <Badge className={getStatusColor(vendor.status)}>
                      {vendor.status}
                    </Badge>
                    <Badge variant="outline">
                      {vendor.category}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="flex">{getRatingStars(vendor.rating)}</div>
                  <span className="text-sm text-gray-600">({vendor.rating}/5.0)</span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="h-4 w-4" />
                    <span>{vendor.contactPerson}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="h-4 w-4" />
                    <span>{vendor.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="h-4 w-4" />
                    <span>{vendor.email}</span>
                  </div>
                </div>
                
                <div className="flex items-start gap-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>{vendor.address}</span>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 border-t border-gray-100">
                  <div className="text-center">
                    <div className="text-lg font-semibold text-gray-900">{vendor.totalOrders}</div>
                    <div className="text-xs text-gray-500">Total Orders</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-gray-900">{vendor.totalValue}</div>
                    <div className="text-xs text-gray-500">Total Value</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-gray-900">{vendor.paymentTerms}</div>
                    <div className="text-xs text-gray-500">Payment Terms</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-gray-900">{vendor.establishedYear}</div>
                    <div className="text-xs text-gray-500">Established</div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    setSelectedVendor(vendor);
                    setIsEditDialogOpen(true);
                  }}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                
                <Button 
                  variant={vendor.status === "Active" ? "outline" : "default"}
                  size="sm"
                  onClick={() => handleStatusToggle(vendor.id, vendor.status)}
                  className={vendor.status === "Active" 
                    ? "border-red-200 text-red-600 hover:bg-red-50" 
                    : "bg-green-600 hover:bg-green-700"
                  }
                >
                  {vendor.status === "Active" ? "Deactivate" : "Activate"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Edit Vendor Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Vendor - {selectedVendor?.name}</DialogTitle>
          </DialogHeader>
          {selectedVendor && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="vendorName">Vendor Name</Label>
                  <Input defaultValue={selectedVendor.name} />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Input defaultValue={selectedVendor.category} />
                </div>
                <div>
                  <Label htmlFor="contactPerson">Contact Person</Label>
                  <Input defaultValue={selectedVendor.contactPerson} />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input defaultValue={selectedVendor.phone} />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input defaultValue={selectedVendor.email} />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Textarea defaultValue={selectedVendor.address} className="h-20" />
                </div>
                <div>
                  <Label htmlFor="paymentTerms">Payment Terms</Label>
                  <Input defaultValue={selectedVendor.paymentTerms} />
                </div>
                <div>
                  <Label htmlFor="establishedYear">Established Year</Label>
                  <Input defaultValue={selectedVendor.establishedYear} />
                </div>
                <div>
                  <Label htmlFor="rating">Rating</Label>
                  <Input type="number" step="0.1" min="0" max="5" defaultValue={selectedVendor.rating} />
                </div>
              </div>
            </div>
          )}
          <div className="flex justify-end gap-2">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleEditVendor} className="bg-blue-600 hover:bg-blue-700">
              Update Vendor
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      {filteredVendors.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-gray-500">No vendors found matching your search criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
