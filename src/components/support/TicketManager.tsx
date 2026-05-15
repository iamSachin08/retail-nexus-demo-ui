
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Plus, Upload, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TicketManagerProps {
  searchQuery: string;
}

export function TicketManager({ searchQuery }: TicketManagerProps) {
  const [ticketData, setTicketData] = useState({
    title: "",
    category: "",
    priority: "",
    description: "",
    attachments: []
  });
  const { toast } = useToast();

  const ticketCategories = [
    "Technical Issues",
    "Inventory Problems", 
    "Staff Management",
    "Customer Complaints",
    "POS/Billing Issues",
    "Returns & Refunds",
    "System Access",
    "Training Request",
    "Feature Request",
    "Other"
  ];

  const priorityLevels = [
    { value: "low", label: "Low", description: "General inquiry, can wait" },
    { value: "medium", label: "Medium", description: "Affects daily operations" },
    { value: "high", label: "High", description: "Critical business impact" },
    { value: "urgent", label: "Urgent", description: "System down, immediate attention needed" }
  ];

  const suggestedSolutions = [
    {
      category: "Technical Issues",
      solutions: [
        "Restart the application",
        "Check internet connection", 
        "Clear browser cache",
        "Update to latest version"
      ]
    },
    {
      category: "POS/Billing Issues",
      solutions: [
        "Restart POS terminal",
        "Check printer connections",
        "Verify network connectivity",
        "Manual sync with server"
      ]
    },
    {
      category: "Inventory Problems",
      solutions: [
        "Refresh inventory data",
        "Check barcode scanner",
        "Verify product details",
        "Contact warehouse team"
      ]
    }
  ];

  const handleSubmitTicket = () => {
    if (!ticketData.title || !ticketData.category || !ticketData.description) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Ticket Created Successfully",
      description: `Your ticket has been submitted. Ticket ID: TKT-${Date.now()}`,
    });

    setTicketData({
      title: "",
      category: "",
      priority: "",
      description: "",
      attachments: []
    });
  };

  const getSuggestedSolutions = (category: string) => {
    return suggestedSolutions.find(s => s.category === category)?.solutions || [];
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Ticket Creation Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Create New Ticket
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="title">Ticket Title *</Label>
            <Input
              id="title"
              placeholder="Brief description of the issue"
              value={ticketData.title}
              onChange={(e) => setTicketData({...ticketData, title: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category">Category *</Label>
              <Select value={ticketData.category} onValueChange={(value) => setTicketData({...ticketData, category: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {ticketCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="priority">Priority</Label>
              <Select value={ticketData.priority} onValueChange={(value) => setTicketData({...ticketData, priority: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  {priorityLevels.map((priority) => (
                    <SelectItem key={priority.value} value={priority.value}>
                      <div>
                        <div>{priority.label}</div>
                        <div className="text-xs text-gray-500">{priority.description}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="description">Detailed Description *</Label>
            <Textarea
              id="description"
              placeholder="Please provide detailed information about the issue..."
              value={ticketData.description}
              onChange={(e) => setTicketData({...ticketData, description: e.target.value})}
              className="h-32"
            />
          </div>

          <div>
            <Label htmlFor="attachments">Attachments</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">
                Drag & drop files here or <Button variant="link" className="p-0 h-auto">browse files</Button>
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Supported formats: PNG, JPG, PDF, DOC (Max 10MB)
              </p>
            </div>
          </div>

          <Button onClick={handleSubmitTicket} className="w-full">
            Submit Ticket
          </Button>
        </CardContent>
      </Card>

      {/* Suggested Solutions & Help */}
      <div className="space-y-6">
        {ticketData.category && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                Try These Solutions First
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-3">
                Before creating a ticket, try these common solutions for <strong>{ticketData.category}</strong>:
              </p>
              <div className="space-y-2">
                {getSuggestedSolutions(ticketData.category).map((solution, index) => (
                  <div key={index} className="flex items-start gap-2 p-2 bg-yellow-50 rounded">
                    <div className="w-5 h-5 bg-yellow-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-medium text-yellow-800">{index + 1}</span>
                    </div>
                    <span className="text-sm">{solution}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  💡 <strong>Still having issues?</strong> Please include steps you've already tried in your ticket description.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Recent Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { id: "TKT-2024-001", title: "POS not syncing", status: "Open", priority: "High" },
                { id: "TKT-2024-002", title: "Inventory mismatch", status: "In Progress", priority: "Medium" },
                { id: "TKT-2024-003", title: "Staff login issue", status: "Resolved", priority: "Low" }
              ].map((ticket) => (
                <div key={ticket.id} className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <div className="font-medium text-sm">{ticket.id}</div>
                    <div className="text-xs text-gray-600">{ticket.title}</div>
                  </div>
                  <div className="text-right">
                    <div className={`text-xs px-2 py-1 rounded ${
                      ticket.status === 'Open' ? 'bg-red-100 text-red-800' :
                      ticket.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {ticket.status}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{ticket.priority}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="font-medium text-sm">Technical Support</div>
              <div className="text-xs text-gray-600">Phone: +91 1800-123-4567</div>
              <div className="text-xs text-gray-600">Email: support@retailhub.com</div>
              <div className="text-xs text-gray-600">Hours: 24/7</div>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="font-medium text-sm">Regional Manager</div>
              <div className="text-xs text-gray-600">Phone: +91 98765-43210</div>
              <div className="text-xs text-gray-600">Email: region@retailhub.com</div>
              <div className="text-xs text-gray-600">Hours: 9 AM - 6 PM</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
