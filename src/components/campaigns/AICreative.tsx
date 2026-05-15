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
  Sparkles, 
  Search, 
  Plus, 
  Eye, 
  Edit, 
  Image, 
  Palette,
  Download,
  Share2,
  CheckCircle,
  Clock,
  AlertTriangle,
  Wand2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AICreativeProps {
  searchQuery: string;
}

export function AICreative({ searchQuery }: AICreativeProps) {
  const { toast } = useToast();
  const [isCreateCreativeOpen, setIsCreateCreativeOpen] = useState(false);
  const [selectedCreative, setSelectedCreative] = useState<any>(null);
  const [llmPrompt, setLlmPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  // Mock AI creatives data
  const aiCreatives = [
    {
      id: "CRE-AI-001",
      title: "Electronics Festival Banner",
      description: "Eye-catching banner for electronics sale campaign",
      prompt: "Create a modern, vibrant banner for an electronics festival sale. Include smartphone, laptop, and tablet imagery with bold discount text. Use blue and orange color scheme.",
      type: "Banner",
      format: "1920x1080",
      status: "Ready",
      createdBy: "AI Assistant",
      createdAt: "2024-01-20",
      lastUpdated: "2024-01-22",
      performance: {
        impressions: 15420,
        clicks: 892,
        ctr: 5.8
      },
      preview: "https://via.placeholder.com/300x200/3B82F6/FFFFFF?text=Electronics+Sale"
    },
    {
      id: "CRE-AI-002",
      title: "Student Special Post",
      description: "Social media post targeting student audience",
      prompt: "Design a social media post for student discounts. Include laptop, headphones, and accessories. Use youthful colors and student-friendly messaging.",
      type: "Social Media",
      format: "1080x1080",
      status: "Ready",
      createdBy: "AI Assistant",
      createdAt: "2024-01-18",
      lastUpdated: "2024-01-21",
      performance: {
        impressions: 8920,
        clicks: 567,
        ctr: 6.4
      },
      preview: "https://via.placeholder.com/300x300/10B981/FFFFFF?text=Student+Special"
    },
    {
      id: "CRE-AI-003",
      title: "Home Appliances Email",
      description: "Email template for home appliance promotions",
      prompt: "Create an email template for home appliance upgrades. Include refrigerator, washing machine, and microwave imagery. Professional design with clear call-to-action buttons.",
      type: "Email Template",
      format: "600x800",
      status: "Draft",
      createdBy: "AI Assistant",
      createdAt: "2024-01-22",
      lastUpdated: "2024-01-22",
      performance: {
        impressions: 0,
        clicks: 0,
        ctr: 0
      },
      preview: "https://via.placeholder.com/300x400/F59E0B/FFFFFF?text=Home+Appliances"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ready": return "bg-green-100 text-green-800";
      case "Draft": return "bg-yellow-100 text-yellow-800";
      case "Processing": return "bg-blue-100 text-blue-800";
      case "Failed": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Banner": return "bg-blue-100 text-blue-800";
      case "Social Media": return "bg-purple-100 text-purple-800";
      case "Email Template": return "bg-orange-100 text-orange-800";
      case "Video": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredCreatives = aiCreatives.filter(creative => 
    creative.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    creative.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    creative.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateCreative = (formData: any) => {
    toast({
      title: "AI Creative Created",
      description: "New AI-powered creative has been created successfully",
    });
    setIsCreateCreativeOpen(false);
  };

  const handleGenerateCreative = async () => {
    setIsGenerating(true);
    // Simulate AI processing
    setTimeout(() => {
      toast({
        title: "Creative Generated",
        description: "AI has generated a new creative based on your prompt",
      });
      setIsGenerating(false);
      setIsCreateCreativeOpen(false);
    }, 4000);
  };

  const handleRefineCreative = (creativeId: string) => {
    toast({
      title: "Creative Refined",
      description: `AI creative ${creativeId} has been refined and updated`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Action Buttons */}
      <div className="flex gap-4">
        <Dialog open={isCreateCreativeOpen} onOpenChange={setIsCreateCreativeOpen}>
          <DialogTrigger asChild>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              Create AI Creative
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                Create AI-Powered Creative
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="creativeTitle">Creative Title</Label>
                  <Input id="creativeTitle" placeholder="Enter creative title" />
                </div>
                <div>
                  <Label htmlFor="creativeType">Creative Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="banner">Banner</SelectItem>
                      <SelectItem value="social">Social Media Post</SelectItem>
                      <SelectItem value="email">Email Template</SelectItem>
                      <SelectItem value="video">Video</SelectItem>
                      <SelectItem value="poster">Poster</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Describe what this creative should represent" />
              </div>
              
              <div>
                <Label htmlFor="llmPrompt" className="flex items-center gap-2">
                  <Wand2 className="h-4 w-4" />
                  AI Creative Prompt
                </Label>
                <Textarea 
                  id="llmPrompt"
                  placeholder="Describe the creative you want to generate. Include style, colors, imagery, messaging, and any specific requirements."
                  value={llmPrompt}
                  onChange={(e) => setLlmPrompt(e.target.value)}
                  className="h-24"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Example: "Create a modern banner for electronics sale with smartphone imagery, blue color scheme, and bold discount text"
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="format">Format</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1920x1080">Banner (1920x1080)</SelectItem>
                      <SelectItem value="1080x1080">Square (1080x1080)</SelectItem>
                      <SelectItem value="1080x1920">Story (1080x1920)</SelectItem>
                      <SelectItem value="600x800">Email (600x800)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="style">Style Preference</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="modern">Modern</SelectItem>
                      <SelectItem value="minimalist">Minimalist</SelectItem>
                      <SelectItem value="bold">Bold & Vibrant</SelectItem>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="playful">Playful</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsCreateCreativeOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleGenerateCreative}
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
          <Palette className="h-4 w-4 mr-2" />
          View All Creatives
        </Button>
      </div>

      {/* AI Creatives List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            AI-Generated Creatives
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredCreatives.map((creative) => (
              <div key={creative.id} className="p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <h4 className="font-medium text-gray-900">{creative.title}</h4>
                      <div className="flex gap-2">
                        <Badge className={getStatusColor(creative.status)}>
                          {creative.status}
                        </Badge>
                        <Badge className={getTypeColor(creative.type)}>
                          {creative.type}
                        </Badge>
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Sparkles className="h-3 w-3" />
                          AI Generated
                        </Badge>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600">{creative.description}</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Format:</span>
                        <div className="font-medium">{creative.format}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Created:</span>
                        <div className="font-medium">{creative.createdAt}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Impressions:</span>
                        <div className="font-medium">{creative.performance.impressions.toLocaleString()}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">CTR:</span>
                        <div className="font-medium">{creative.performance.ctr}%</div>
                      </div>
                    </div>
                    
                    <div>
                      <span className="text-sm text-gray-600">AI Prompt: </span>
                      <div className="text-sm text-gray-700 mt-1 p-2 bg-gray-50 rounded">
                        {creative.prompt}
                      </div>
                    </div>
                    
                    {/* Preview Image */}
                    <div>
                      <span className="text-sm text-gray-600">Preview: </span>
                      <div className="mt-2">
                        <img 
                          src={creative.preview} 
                          alt={creative.title}
                          className="w-32 h-24 object-cover rounded border"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View Full
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      Refine
                    </Button>
                    <Button 
                      size="sm" 
                      className="bg-purple-600 hover:bg-purple-700"
                      onClick={() => handleRefineCreative(creative.id)}
                    >
                      <Sparkles className="h-4 w-4 mr-2" />
                      AI Refine
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            
            {filteredCreatives.length === 0 && (
              <div className="text-center py-8">
                <Sparkles className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No AI creatives found. Create your first AI-powered creative!</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 