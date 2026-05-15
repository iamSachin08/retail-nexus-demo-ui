
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Camera, Upload, Eye, Download, Trash2, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PhotoUploadsProps {
  searchQuery: string;
}

export function PhotoUploads({ searchQuery }: PhotoUploadsProps) {
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const { toast } = useToast();

  const photoUploads = [
    {
      id: "PH-001",
      area: "Store Entrance",
      brand: "Samsung",
      uploadDate: "2024-01-22",
      uploadedBy: "Rahul Sharma",
      photoCount: 5,
      status: "Approved",
      category: "Compliance Check",
      description: "Store entrance display compliance verification",
      lastReview: "2024-01-22",
      reviewedBy: "VM Manager"
    },
    {
      id: "PH-002",
      area: "Television Display Wall",
      brand: "LG",
      uploadDate: "2024-01-21",
      uploadedBy: "Priya Singh",
      photoCount: 8,
      status: "Under Review",
      category: "Setup Verification",
      description: "New display wall setup for review",
      lastReview: "2024-01-21",
      reviewedBy: "Pending"
    },
    {
      id: "PH-003",
      area: "Refrigerator Section",
      brand: "Whirlpool",
      uploadDate: "2024-01-20",
      uploadedBy: "Amit Kumar",
      photoCount: 3,
      status: "Rejected",
      category: "Issue Documentation",
      description: "Documentation of non-compliance issues",
      lastReview: "2024-01-20",
      reviewedBy: "VM Manager"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved": return "bg-green-100 text-green-800";
      case "Under Review": return "bg-yellow-100 text-yellow-800";
      case "Rejected": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Compliance Check": return "bg-blue-100 text-blue-800";
      case "Setup Verification": return "bg-purple-100 text-purple-800";
      case "Issue Documentation": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredUploads = photoUploads.filter(upload => 
    upload.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
    upload.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
    upload.uploadedBy.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePhotoUpload = () => {
    toast({
      title: "Photos Uploaded",
      description: "Photos have been uploaded successfully for review.",
    });
    setIsUploadDialogOpen(false);
  };

  const handlePhotoAction = (photoId: string, action: string) => {
    let message = "";
    switch (action) {
      case "approve":
        message = `Photos ${photoId} have been approved.`;
        break;
      case "reject":
        message = `Photos ${photoId} have been rejected.`;
        break;
      case "delete":
        message = `Photos ${photoId} have been deleted.`;
        break;
    }
    
    toast({
      title: action === "delete" ? "Photos Deleted" : "Status Updated",
      description: message,
      variant: action === "delete" ? "destructive" : "default",
    });
  };

  return (
    <div className="space-y-4">
      {/* Upload Photos Button */}
      <div className="flex justify-end">
        <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Upload Photos
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Upload VM Photos</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="area">VM Area</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select area" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="entrance">Store Entrance</SelectItem>
                      <SelectItem value="tv-wall">Television Display Wall</SelectItem>
                      <SelectItem value="refrigerator">Refrigerator Section</SelectItem>
                      <SelectItem value="audio">Audio Systems</SelectItem>
                      <SelectItem value="mobile">Mobile Section</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="brand">Brand</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select brand" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="samsung">Samsung</SelectItem>
                      <SelectItem value="lg">LG</SelectItem>
                      <SelectItem value="sony">Sony</SelectItem>
                      <SelectItem value="whirlpool">Whirlpool</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="compliance">Compliance Check</SelectItem>
                    <SelectItem value="setup">Setup Verification</SelectItem>
                    <SelectItem value="issue">Issue Documentation</SelectItem>
                    <SelectItem value="training">Training Material</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe what these photos show..."
                  className="h-20"
                />
              </div>
              
              <div>
                <Label htmlFor="photos">Upload Photos</Label>
                <Input
                  id="photos"
                  type="file"
                  multiple
                  accept="image/*"
                  className="cursor-pointer"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Select multiple photos (JPG, PNG). Max 10MB per file.
                </p>
              </div>
              
              <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                <Camera className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-blue-900">Photo Guidelines</p>
                  <p className="text-xs text-blue-700">
                    Ensure good lighting, clear focus, and capture the entire display area
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button onClick={handlePhotoUpload}>
                <Upload className="h-4 w-4 mr-2" />
                Upload Photos
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Photo Uploads List */}
      {filteredUploads.map((upload) => (
        <Card key={upload.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex-1 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <h3 className="font-semibold text-gray-900">{upload.id}</h3>
                  <div className="flex gap-2">
                    <Badge className={getStatusColor(upload.status)}>
                      {upload.status}
                    </Badge>
                    <Badge className={getCategoryColor(upload.category)}>
                      {upload.category}
                    </Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                  <div>
                    <span className="font-medium">Area:</span> {upload.area}
                  </div>
                  <div>
                    <span className="font-medium">Brand:</span> {upload.brand}
                  </div>
                  <div>
                    <span className="font-medium">Photos:</span> {upload.photoCount}
                  </div>
                  <div>
                    <span className="font-medium">Upload Date:</span> {upload.uploadDate}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
                  <div>
                    <span className="font-medium">Uploaded By:</span> {upload.uploadedBy}
                  </div>
                  <div>
                    <span className="font-medium">Reviewed By:</span> {upload.reviewedBy}
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                  {upload.description}
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View Photos
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl">
                    <DialogHeader>
                      <DialogTitle>Photos - {upload.area}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Upload Details</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Upload ID:</span>
                              <span>{upload.id}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Area:</span>
                              <span>{upload.area}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Brand:</span>
                              <span>{upload.brand}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Photos:</span>
                              <span>{upload.photoCount}</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Review Status</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Status:</span>
                              <Badge className={getStatusColor(upload.status)}>
                                {upload.status}
                              </Badge>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Category:</span>
                              <Badge className={getCategoryColor(upload.category)}>
                                {upload.category}
                              </Badge>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Uploaded By:</span>
                              <span>{upload.uploadedBy}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Reviewed By:</span>
                              <span>{upload.reviewedBy}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Photo Gallery</h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {Array.from({ length: upload.photoCount }, (_, i) => (
                            <div key={i} className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                              <Camera className="h-8 w-8 text-gray-400" />
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {upload.status === "Under Review" && (
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="outline" 
                            className="border-red-200 text-red-600 hover:bg-red-50"
                            onClick={() => handlePhotoAction(upload.id, "reject")}
                          >
                            Reject
                          </Button>
                          <Button 
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => handlePhotoAction(upload.id, "approve")}
                          >
                            Approve
                          </Button>
                        </div>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
                
                <Button size="sm" variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="border-red-200 text-red-600 hover:bg-red-50"
                  onClick={() => handlePhotoAction(upload.id, "delete")}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      
      {filteredUploads.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Photos Found</h3>
            <p className="text-gray-500">No photo uploads found matching your search criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
