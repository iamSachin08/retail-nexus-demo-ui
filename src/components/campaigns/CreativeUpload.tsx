import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Upload, 
  Image, 
  Video, 
  FileText,
  Eye,
  Download,
  Trash2,
  Edit
} from "lucide-react";

interface CreativeUploadProps {
  searchQuery: string;
}

export function CreativeUpload({ searchQuery }: CreativeUploadProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const creativeAssets = [
    {
      id: "A001",
      name: "iPhone 15 Launch Banner",
      type: "Image",
      format: "JPG",
      size: "2.4 MB",
      dimensions: "1920x1080",
      uploadDate: "2024-01-10",
      campaign: "iPhone 15 Launch",
      status: "Active"
    },
    {
      id: "A002",
      name: "Festival Sale Video",
      type: "Video",
      format: "MP4",
      size: "15.8 MB",
      dimensions: "1920x1080",
      uploadDate: "2024-01-08",
      campaign: "Festival Sale",
      status: "Active"
    },
    {
      id: "A003",
      name: "SMS Template - Offers",
      type: "Text",
      format: "TXT",
      size: "1.2 KB",
      dimensions: "N/A",
      uploadDate: "2024-01-05",
      campaign: "Customer Retention",
      status: "Draft"
    },
    {
      id: "A004",
      name: "WhatsApp Banner",
      type: "Image",
      format: "PNG",
      size: "800 KB",
      dimensions: "800x600",
      uploadDate: "2024-01-03",
      campaign: "Laptop Promotion",
      status: "Active"
    }
  ];

  const filteredAssets = creativeAssets.filter(asset => 
    asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    asset.campaign.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Image": return <Image className="h-4 w-4" />;
      case "Video": return <Video className="h-4 w-4" />;
      case "Text": return <FileText className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    return status === "Active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800";
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upload New Creative */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Upload Creative Assets
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-lg font-medium mb-2">Drop files here or click to upload</p>
                <p className="text-sm text-gray-600 mb-4">Support for images, videos, and text files up to 50MB</p>
                <Button>
                  <Upload className="h-4 w-4 mr-2" />
                  Choose Files
                </Button>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="assetName">Asset Name</Label>
                  <Input id="assetName" placeholder="Enter asset name..." />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="campaign">Campaign</Label>
                  <Input id="campaign" placeholder="Select or enter campaign..." />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Describe the creative asset..." rows={3} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Asset Type</Label>
                    <select className="w-full p-2 border rounded-md">
                      <option>Banner Image</option>
                      <option>Video Ad</option>
                      <option>SMS Template</option>
                      <option>WhatsApp Creative</option>
                      <option>Email Template</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Channel</Label>
                    <select className="w-full p-2 border rounded-md">
                      <option>SMS</option>
                      <option>WhatsApp</option>
                      <option>Push Notification</option>
                      <option>Email</option>
                      <option>Social Media</option>
                    </select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Creative Guidelines */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Creative Guidelines</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Image Requirements</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Max size: 10MB</li>
                  <li>• Formats: JPG, PNG, GIF</li>
                  <li>• Recommended: 1920x1080</li>
                  <li>• Minimum: 800x600</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Video Requirements</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Max size: 50MB</li>
                  <li>• Formats: MP4, MOV, AVI</li>
                  <li>• Duration: 15-60 seconds</li>
                  <li>• Resolution: 1920x1080</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Text Guidelines</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• SMS: Max 160 characters</li>
                  <li>• WhatsApp: Max 1024 characters</li>
                  <li>• Push: Max 100 characters</li>
                  <li>• Include clear CTA</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Existing Creative Assets */}
      <Card>
        <CardHeader>
          <CardTitle>Creative Asset Library</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredAssets.map((asset) => (
              <Card key={asset.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(asset.type)}
                      <span className="font-medium text-sm">{asset.name}</span>
                    </div>
                    <Badge className={getStatusColor(asset.status)}>
                      {asset.status}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Type:</span>
                      <span>{asset.type} ({asset.format})</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Size:</span>
                      <span>{asset.size}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Dimensions:</span>
                      <span>{asset.dimensions}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Campaign:</span>
                      <span className="font-medium">{asset.campaign}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-4">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Eye className="h-3 w-3 mr-1" />
                      Preview
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
