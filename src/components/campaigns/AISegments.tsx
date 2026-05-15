import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Brain, 
  Search, 
  Plus, 
  Eye, 
  Edit, 
  Users, 
  Target,
  Sparkles,
  CheckCircle,
  Clock,
  AlertTriangle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AISegmentsProps {
  searchQuery: string;
}

export function AISegments({ searchQuery }: AISegmentsProps) {
  const { toast } = useToast();
  const [isCreateSegmentOpen, setIsCreateSegmentOpen] = useState(false);
  const [selectedSegment, setSelectedSegment] = useState<any>(null);
  const [llmPrompt, setLlmPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  // Mock AI segments data
  const aiSegments = [
    {
      id: "SEG-AI-001",
      name: "High-Value Electronics Buyers",
      description: "Customers who frequently purchase premium electronics",
      prompt: "Find customers who have purchased electronics above ₹50,000 in the last 6 months and show high engagement with premium brands",
      criteria: "Purchase value > ₹50K, Electronics category, Last 6 months",
      customerCount: 1247,
      accuracy: 94,
      status: "Active",
      createdBy: "AI Assistant",
      createdAt: "2024-01-20",
      lastUpdated: "2024-01-22",
      performance: {
        openRate: 23.5,
        clickRate: 8.7,
        conversionRate: 4.2
      }
    },
    {
      id: "SEG-AI-002",
      name: "Student Tech Enthusiasts",
      description: "Young customers interested in latest technology trends",
      prompt: "Identify students aged 18-25 who follow tech trends, purchase accessories, and engage with mobile/tablet content",
      criteria: "Age 18-25, Student status, Tech accessories, Mobile engagement",
      customerCount: 892,
      accuracy: 89,
      status: "Active",
      createdBy: "AI Assistant",
      createdAt: "2024-01-18",
      lastUpdated: "2024-01-21",
      performance: {
        openRate: 31.2,
        clickRate: 12.4,
        conversionRate: 6.8
      }
    },
    {
      id: "SEG-AI-003",
      name: "Home Appliance Upgraders",
      description: "Customers likely to upgrade home appliances",
      prompt: "Find customers who own appliances older than 3 years, have stable income, and show interest in energy-efficient products",
      criteria: "Appliance age > 3 years, Stable income, Energy efficiency interest",
      customerCount: 567,
      accuracy: 91,
      status: "Draft",
      createdBy: "AI Assistant",
      createdAt: "2024-01-22",
      lastUpdated: "2024-01-22",
      performance: {
        openRate: 18.9,
        clickRate: 6.3,
        conversionRate: 3.1
      }
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800";
      case "Draft": return "bg-yellow-100 text-yellow-800";
      case "Inactive": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 90) return "text-green-600";
    if (accuracy >= 80) return "text-yellow-600";
    return "text-red-600";
  };

  const filteredSegments = aiSegments.filter(segment => 
    segment.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    segment.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    segment.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateSegment = (formData: any) => {
    toast({
      title: "AI Segment Created",
      description: "New AI-powered customer segment has been created successfully",
    });
    setIsCreateSegmentOpen(false);
  };

  const handleGenerateSegment = async () => {
    setIsGenerating(true);
    // Simulate AI processing
    setTimeout(() => {
      toast({
        title: "Segment Generated",
        description: "AI has generated a new customer segment based on your prompt",
      });
      setIsGenerating(false);
      setIsCreateSegmentOpen(false);
    }, 3000);
  };

  const handleRefineSegment = (segmentId: string) => {
    toast({
      title: "Segment Refined",
      description: `AI segment ${segmentId} has been refined and updated`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Action Buttons */}
      <div className="flex gap-4">
        <Dialog open={isCreateSegmentOpen} onOpenChange={setIsCreateSegmentOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Create AI Segment
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Create AI-Powered Customer Segment
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="segmentName">Segment Name</Label>
                  <Input id="segmentName" placeholder="Enter segment name" />
                </div>
                <div>
                  <Label htmlFor="segmentType">Segment Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="behavioral">Behavioral</SelectItem>
                      <SelectItem value="demographic">Demographic</SelectItem>
                      <SelectItem value="purchase">Purchase History</SelectItem>
                      <SelectItem value="engagement">Engagement</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Describe what this segment represents" />
              </div>
              
              <div>
                <Label htmlFor="llmPrompt" className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  AI Prompt
                </Label>
                <Textarea 
                  id="llmPrompt"
                  placeholder="Describe the customer segment you want to create in natural language. Be specific about behaviors, preferences, demographics, etc."
                  value={llmPrompt}
                  onChange={(e) => setLlmPrompt(e.target.value)}
                  className="h-24"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Example: "Find customers who purchase premium electronics above ₹50,000 and show high engagement with tech content"
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="location">Target Location</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      <SelectItem value="bangalore">Bangalore</SelectItem>
                      <SelectItem value="mumbai">Mumbai</SelectItem>
                      <SelectItem value="delhi">Delhi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsCreateSegmentOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleGenerateSegment}
                  disabled={isGenerating || !llmPrompt.trim()}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  {isGenerating ? (
                    <>
                      <Clock className="h-4 w-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Generate with AI
                    </>
                  )}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        
        <Button variant="outline">
          <Target className="h-4 w-4 mr-2" />
          View All Segments
        </Button>
      </div>

      {/* AI Segments List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            AI-Generated Customer Segments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredSegments.map((segment) => (
              <div key={segment.id} className="p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <h4 className="font-medium text-gray-900">{segment.name}</h4>
                      <div className="flex gap-2">
                        <Badge className={getStatusColor(segment.status)}>
                          {segment.status}
                        </Badge>
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Brain className="h-3 w-3" />
                          AI Generated
                        </Badge>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600">{segment.description}</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Customers:</span>
                        <div className="font-medium">{segment.customerCount.toLocaleString()}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Accuracy:</span>
                        <div className={`font-medium ${getAccuracyColor(segment.accuracy)}`}>
                          {segment.accuracy}%
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-600">Created:</span>
                        <div className="font-medium">{segment.createdAt}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Performance:</span>
                        <div className="font-medium">{segment.performance.conversionRate}% conversion</div>
                      </div>
                    </div>
                    
                    <div>
                      <span className="text-sm text-gray-600">AI Prompt: </span>
                      <div className="text-sm text-gray-700 mt-1 p-2 bg-gray-50 rounded">
                        {segment.prompt}
                      </div>
                    </div>
                    
                    <div>
                      <span className="text-sm text-gray-600">Generated Criteria: </span>
                      <div className="text-sm text-gray-700 mt-1">{segment.criteria}</div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      Refine
                    </Button>
                    <Button 
                      size="sm" 
                      className="bg-purple-600 hover:bg-purple-700"
                      onClick={() => handleRefineSegment(segment.id)}
                    >
                      <Sparkles className="h-4 w-4 mr-2" />
                      AI Refine
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            
            {filteredSegments.length === 0 && (
              <div className="text-center py-8">
                <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No AI segments found. Create your first AI-powered customer segment!</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 