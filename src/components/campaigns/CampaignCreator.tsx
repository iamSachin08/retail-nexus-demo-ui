
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Users, 
  Target, 
  Plus,
  Trash2,
  Edit
} from "lucide-react";

interface CampaignCreatorProps {
  searchQuery: string;
}

export function CampaignCreator({ searchQuery }: CampaignCreatorProps) {
  const [campaignName, setCampaignName] = useState("");
  const [selectedSegments, setSelectedSegments] = useState<string[]>([]);

  const customerSegments = [
    { id: "premium", label: "Premium Customers", count: 1247, description: "High-value customers with AOV > ₹25k" },
    { id: "frequent", label: "Frequent Buyers", count: 892, description: "Customers with 5+ purchases in last 3 months" },
    { id: "new", label: "New Customers", count: 456, description: "Customers acquired in last 30 days" },
    { id: "lapsed", label: "Lapsed Customers", count: 623, description: "No purchase in last 90 days" },
    { id: "mobile", label: "Mobile Enthusiasts", count: 1834, description: "Primarily buy smartphones and accessories" },
    { id: "appliance", label: "Home Appliance Buyers", count: 567, description: "Focus on large appliances" }
  ];

  const locations = [
    { id: "store1", label: "Phoenix MarketCity", radius: "5km" },
    { id: "store2", label: "Select City Walk", radius: "3km" },
    { id: "store3", label: "DLF Mall of India", radius: "7km" },
    { id: "area1", label: "South Delhi", radius: "15km" },
    { id: "area2", label: "Gurgaon", radius: "20km" }
  ];

  const filteredSegments = customerSegments.filter(segment => 
    segment.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Campaign Setup */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Create New Campaign
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="campaignName">Campaign Name</Label>
                <Input
                  id="campaignName"
                  placeholder="Enter campaign name..."
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Campaign Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your campaign objectives..."
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Campaign Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="promotion">Promotional Campaign</SelectItem>
                      <SelectItem value="launch">Product Launch</SelectItem>
                      <SelectItem value="retention">Customer Retention</SelectItem>
                      <SelectItem value="acquisition">Customer Acquisition</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Budget</Label>
                  <Input placeholder="Enter budget in ₹" type="number" />
                </div>
              </div>

              <div className="space-y-3">
                <Label>Target Locations</Label>
                <div className="space-y-2">
                  {locations.map((location) => (
                    <div key={location.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Checkbox id={location.id} />
                        <div>
                          <Label htmlFor={location.id} className="font-medium">
                            {location.label}
                          </Label>
                          <p className="text-sm text-gray-600">Radius: {location.radius}</p>
                        </div>
                      </div>
                      <MapPin className="h-4 w-4 text-gray-400" />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Customer Segments */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Customer Segments
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {filteredSegments.map((segment) => (
                <div key={segment.id} className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-sm">{segment.label}</h3>
                        <Badge variant="outline" className="text-xs">
                          {segment.count}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-600 mb-2">{segment.description}</p>
                      <div className="flex gap-1">
                        <Button size="sm" variant="outline" className="h-6 text-xs">
                          <Plus className="h-3 w-3 mr-1" />
                          Add
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* AI Suggestions */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>AI Suggestions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm font-medium text-blue-800">High ROI Segment</p>
                <p className="text-xs text-blue-600">Premium customers show 3x higher engagement with product launches</p>
              </div>
              
              <div className="p-3 bg-green-50 rounded-lg">
                <p className="text-sm font-medium text-green-800">Optimal Timing</p>
                <p className="text-xs text-green-600">Weekend campaigns perform 25% better for electronics</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Campaign Actions */}
      <div className="flex gap-3">
        <Button className="flex-1">
          Create Campaign
        </Button>
        <Button variant="outline">
          Save Draft
        </Button>
        <Button variant="outline">
          Preview
        </Button>
      </div>
    </div>
  );
}
