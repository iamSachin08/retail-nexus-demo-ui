import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Paperclip, Send, AlertTriangle, Clock, Info } from "lucide-react";

export function RaiseTicket() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    department: "",
    priority: "",
    category: "",
    attachments: []
  });

  const ticketCategories = [
    { value: "pos-issues", label: "POS System Issues" },
    { value: "inventory", label: "Inventory Management" },
    { value: "technical", label: "Technical Support" },
    { value: "finance", label: "Paper Finance" },
    { value: "hr", label: "HR Support" },
    { value: "infrastructure", label: "Store Infrastructure" },
    { value: "customer-complaint", label: "Customer Complaint" },
    { value: "other", label: "Other" }
  ];

  const departments = [
    { value: "boc", label: "Back Office Center (BOC)" },
    { value: "it", label: "IT Department" },
    { value: "finance", label: "Paper Finance Department" },
    { value: "hr", label: "HR Department" },
    { value: "operations", label: "Operations" },
    { value: "customer-service", label: "Customer Service" }
  ];

  const recentTickets = [
    {
      id: "TKT2024001",
      title: "POS System Down",
      status: "resolved",
      priority: "high",
      department: "IT",
      createdAt: "2024-01-23"
    },
    {
      id: "TKT2024002",
      title: "Billing Discrepancy",
      status: "in-progress",
      priority: "medium",
      department: "Finance",
      createdAt: "2024-01-24"
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Ticket Creation Form */}
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Send className="h-5 w-5" />
              Raise New Ticket
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {ticketCategories.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="department">Department</Label>
                <Select value={formData.department} onValueChange={(value) => setFormData({...formData, department: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept.value} value={dept.value}>{dept.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="title">Issue Title</Label>
              <Input
                id="title"
                placeholder="Brief description of the issue..."
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
              />
            </div>

            <div>
              <Label htmlFor="description">Detailed Description</Label>
              <Textarea
                id="description"
                placeholder="Please provide a detailed description of the issue, including steps to reproduce if applicable..."
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows={4}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="priority">Priority Level</Label>
                <Select value={formData.priority} onValueChange={(value) => setFormData({...formData, priority: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">
                      <div className="flex items-center gap-2">
                        <Info className="h-4 w-4 text-blue-500" />
                        Low - Minor issues
                      </div>
                    </SelectItem>
                    <SelectItem value="medium">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-yellow-500" />
                        Medium - Moderate impact
                      </div>
                    </SelectItem>
                    <SelectItem value="high">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                        High - Critical issues
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* File Attachment */}
            <div>
              <Label htmlFor="attachments">Attachments</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                <Paperclip className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-2">Attach screenshots, error logs, or relevant documents</p>
                <Button variant="outline" size="sm">
                  Choose Files
                </Button>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button>
                <Send className="h-4 w-4 mr-2" />
                Submit Ticket
              </Button>
              <Button variant="outline">Save as Draft</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Tickets & Guidelines */}
      <div className="space-y-4">
        {/* Quick Guidelines */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Quick Guidelines</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 bg-blue-50 rounded-lg">
              <h4 className="text-sm font-medium text-blue-900 mb-1">Before Raising a Ticket</h4>
              <p className="text-xs text-blue-700">Check if the issue is already reported or has a known solution in the knowledge base.</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <h4 className="text-sm font-medium text-green-900 mb-1">Provide Details</h4>
              <p className="text-xs text-green-700">Include error messages, screenshots, and steps to reproduce the issue.</p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <h4 className="text-sm font-medium text-yellow-900 mb-1">Expected Response</h4>
              <p className="text-xs text-yellow-700">High priority: 1 hour, Medium: 4 hours, Low: 24 hours</p>
            </div>
          </CardContent>
        </Card>

        {/* Recent Tickets */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recent Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentTickets.map((ticket) => (
                <div key={ticket.id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-sm">{ticket.title}</h4>
                    <Badge variant={ticket.status === 'resolved' ? 'default' : 'secondary'} className="text-xs">
                      {ticket.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-600 mb-1">ID: {ticket.id}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">{ticket.department}</span>
                    <span className="text-xs text-gray-500">{ticket.createdAt}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
