
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, ThumbsUp, ThumbsDown, MessageSquare, Phone, User, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CustomerFeedbackProps {
  searchQuery: string;
}

export function CustomerFeedback({ searchQuery }: CustomerFeedbackProps) {
  const { toast } = useToast();
  const [isFollowUpOpen, setIsFollowUpOpen] = useState(false);

  const feedbacks = [
    {
      id: "FB001",
      jobId: "SRV001",
      customerName: "Rajesh Patel",
      phone: "+91 9876543210",
      service: "TV Installation",
      technician: "Rohit Technician",
      rating: 5,
      feedback: "Excellent service! Technician was very professional and completed the installation perfectly.",
      date: "2024-01-21",
      satisfaction: "Excellent",
      wouldRecommend: true,
      followUpRequired: false
    },
    {
      id: "FB002",
      jobId: "SRV002",
      customerName: "Priya Sharma",
      phone: "+91 8765432109",
      service: "Washing Machine Repair",
      technician: "Suresh Kumar",
      rating: 4,
      feedback: "Good service but took longer than expected. However, the repair was done well.",
      date: "2024-01-21",
      satisfaction: "Good",
      wouldRecommend: true,
      followUpRequired: false
    },
    {
      id: "FB003",
      jobId: "SRV003",
      customerName: "Amit Kumar",
      phone: "+91 7654321098",
      service: "AC Maintenance",
      technician: "Prakash Technician",
      rating: 2,
      feedback: "Service was delayed and technician did not explain the issue properly. Not satisfied with the experience.",
      date: "2024-01-20",
      satisfaction: "Poor",
      wouldRecommend: false,
      followUpRequired: true
    }
  ];

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return "text-green-600";
    if (rating >= 3) return "text-yellow-600";
    return "text-red-600";
  };

  const getSatisfactionColor = (satisfaction: string) => {
    switch (satisfaction) {
      case "Excellent": return "bg-green-100 text-green-800";
      case "Good": return "bg-blue-100 text-blue-800";
      case "Average": return "bg-yellow-100 text-yellow-800";
      case "Poor": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredFeedbacks = feedbacks.filter(feedback => 
    feedback.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    feedback.jobId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    feedback.technician.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFollowUp = () => {
    toast({
      title: "Follow-up Scheduled",
      description: "Customer follow-up has been scheduled successfully",
    });
    setIsFollowUpOpen(false);
  };

  const averageRating = feedbacks.reduce((sum, fb) => sum + fb.rating, 0) / feedbacks.length;
  const excellentCount = feedbacks.filter(fb => fb.satisfaction === "Excellent").length;
  const recommendationRate = (feedbacks.filter(fb => fb.wouldRecommend).length / feedbacks.length) * 100;
  const followUpRequired = feedbacks.filter(fb => fb.followUpRequired).length;

  return (
    <div className="space-y-6">
      {/* Feedback Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <span className="text-2xl font-bold text-yellow-600">{averageRating.toFixed(1)}</span>
                <Star className="h-5 w-5 text-yellow-500 fill-current" />
              </div>
              <p className="text-sm text-yellow-700">Average Rating</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{excellentCount}</p>
              <p className="text-sm text-green-700">Excellent Reviews</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{recommendationRate.toFixed(0)}%</p>
              <p className="text-sm text-blue-700">Would Recommend</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">{followUpRequired}</p>
              <p className="text-sm text-red-700">Follow-up Required</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Follow-up Button */}
      <div className="flex justify-start">
        <Dialog open={isFollowUpOpen} onOpenChange={setIsFollowUpOpen}>
          <DialogTrigger asChild>
            <Button>
              <Phone className="h-4 w-4 mr-2" />
              Schedule Follow-up
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Schedule Customer Follow-up</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="customer">Customer</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select customer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rajesh">Rajesh Patel - FB001</SelectItem>
                    <SelectItem value="priya">Priya Sharma - FB002</SelectItem>
                    <SelectItem value="amit">Amit Kumar - FB003</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="followUpDate">Follow-up Date</Label>
                  <Input type="date" />
                </div>
                <div>
                  <Label htmlFor="followUpTime">Follow-up Time</Label>
                  <Input type="time" />
                </div>
              </div>
              <div>
                <Label htmlFor="reason">Follow-up Reason</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select reason" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="poor-rating">Poor Rating Follow-up</SelectItem>
                    <SelectItem value="quality-check">Quality Check</SelectItem>
                    <SelectItem value="warranty">Warranty Follow-up</SelectItem>
                    <SelectItem value="feedback">Additional Feedback</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea placeholder="Enter follow-up notes and talking points" />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setIsFollowUpOpen(false)}>Cancel</Button>
              <Button onClick={handleFollowUp}>Schedule Follow-up</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Feedback List */}
      <div className="space-y-4">
        {filteredFeedbacks.map((feedback) => (
          <Card key={feedback.id}>
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Feedback Header */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="font-semibold text-gray-900">{feedback.id}</h4>
                      <Badge className={getSatisfactionColor(feedback.satisfaction)}>
                        {feedback.satisfaction}
                      </Badge>
                      {feedback.followUpRequired && (
                        <Badge className="bg-orange-100 text-orange-800">
                          Follow-up Required
                        </Badge>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-500" />
                        <span>{feedback.customerName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <span>{feedback.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span>{feedback.date}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <Button size="sm" variant="outline">
                      <Phone className="h-4 w-4 mr-2" />
                      Follow-up
                    </Button>
                    <Button size="sm" variant="outline">
                      View Job
                    </Button>
                  </div>
                </div>
                
                {/* Service Details */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm bg-gray-50 p-4 rounded-lg">
                  <div>
                    <span className="font-medium">Job ID:</span>
                    <p>{feedback.jobId}</p>
                  </div>
                  <div>
                    <span className="font-medium">Service:</span>
                    <p>{feedback.service}</p>
                  </div>
                  <div>
                    <span className="font-medium">Technician:</span>
                    <p>{feedback.technician}</p>
                  </div>
                </div>
                
                {/* Rating and Feedback */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="font-medium">Rating:</span>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star}
                          className={`h-4 w-4 ${
                            star <= feedback.rating 
                              ? 'text-yellow-500 fill-current' 
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className={`ml-2 font-semibold ${getRatingColor(feedback.rating)}`}>
                        {feedback.rating}/5
                      </span>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-start gap-2 mb-2">
                      <MessageSquare className="h-4 w-4 text-blue-600 mt-0.5" />
                      <span className="font-medium text-blue-900">Customer Feedback:</span>
                    </div>
                    <p className="text-gray-700">{feedback.feedback}</p>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      {feedback.wouldRecommend ? (
                        <ThumbsUp className="h-4 w-4 text-green-600" />
                      ) : (
                        <ThumbsDown className="h-4 w-4 text-red-600" />
                      )}
                      <span>
                        {feedback.wouldRecommend ? "Would recommend" : "Would not recommend"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
