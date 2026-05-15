
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Eye, MessageCircle, Clock, CheckCircle, XCircle, AlertTriangle } from "lucide-react";

interface MyTicketsProps {
  searchQuery: string;
}

export function MyTickets({ searchQuery }: MyTicketsProps) {
  const myTickets = [
    {
      id: "TKT-2024-001",
      title: "POS terminal not syncing with server",
      category: "Technical Issues",
      priority: "High",
      status: "In Progress", 
      createdDate: "2024-01-22",
      lastUpdate: "2024-01-23",
      assignedTo: "Technical Team",
      description: "POS terminal #3 is not syncing sales data with the central server. Tried restarting but issue persists.",
      updates: [
        { date: "2024-01-23 10:30 AM", author: "Tech Support", message: "Investigating network connectivity issues" },
        { date: "2024-01-22 03:45 PM", author: "Rahul Sharma", message: "Ticket created" }
      ]
    },
    {
      id: "TKT-2024-002",
      title: "Inventory count mismatch for Samsung TVs",
      category: "Inventory Problems",
      priority: "Medium",
      status: "Open",
      createdDate: "2024-01-21",
      lastUpdate: "2024-01-21",
      assignedTo: "Inventory Team",
      description: "Physical count shows 15 units but system shows 12 units for Samsung 55\" 4K TVs.",
      updates: [
        { date: "2024-01-21 02:15 PM", author: "Rahul Sharma", message: "Ticket created with photo evidence attached" }
      ]
    },
    {
      id: "TKT-2024-003",
      title: "New staff member cannot access system",
      category: "System Access",
      priority: "Low",
      status: "Resolved",
      createdDate: "2024-01-20",
      lastUpdate: "2024-01-21",
      assignedTo: "Admin Team",
      description: "New employee Priya Singh cannot login to the system with provided credentials.",
      updates: [
        { date: "2024-01-21 11:20 AM", author: "Admin Team", message: "Issue resolved. User account activated." },
        { date: "2024-01-20 09:30 AM", author: "Rahul Sharma", message: "Ticket created for new employee access" }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open": return "bg-red-100 text-red-800";
      case "In Progress": return "bg-yellow-100 text-yellow-800";
      case "Resolved": return "bg-green-100 text-green-800";
      case "Closed": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-red-100 text-red-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Low": return "bg-green-100 text-green-800";
      case "Urgent": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Open": return <AlertTriangle className="h-4 w-4" />;
      case "In Progress": return <Clock className="h-4 w-4" />;
      case "Resolved": return <CheckCircle className="h-4 w-4" />;
      case "Closed": return <XCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const filteredTickets = myTickets.filter(ticket => 
    ticket.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ticket.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {filteredTickets.map((ticket) => (
        <Card key={ticket.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex-1 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(ticket.status)}
                    <h3 className="font-semibold text-gray-900">{ticket.id}</h3>
                  </div>
                  <div className="flex gap-2">
                    <Badge className={getStatusColor(ticket.status)}>
                      {ticket.status}
                    </Badge>
                    <Badge className={getPriorityColor(ticket.priority)}>
                      {ticket.priority} Priority
                    </Badge>
                  </div>
                </div>
                
                <div className="text-sm font-medium text-gray-900">
                  {ticket.title}
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                  <div>
                    <span className="font-medium">Category:</span> {ticket.category}
                  </div>
                  <div>
                    <span className="font-medium">Created:</span> {ticket.createdDate}
                  </div>
                  <div>
                    <span className="font-medium">Last Update:</span> {ticket.lastUpdate}
                  </div>
                  <div>
                    <span className="font-medium">Assigned To:</span> {ticket.assignedTo}
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                  {ticket.description}
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl">
                    <DialogHeader>
                      <DialogTitle>Ticket Details - {ticket.id}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Ticket Information</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Ticket ID:</span>
                              <span>{ticket.id}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Title:</span>
                              <span className="text-right">{ticket.title}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Category:</span>
                              <span>{ticket.category}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Created Date:</span>
                              <span>{ticket.createdDate}</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Status & Priority</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Status:</span>
                              <Badge className={getStatusColor(ticket.status)}>
                                {ticket.status}
                              </Badge>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Priority:</span>
                              <Badge className={getPriorityColor(ticket.priority)}>
                                {ticket.priority}
                              </Badge>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Assigned To:</span>
                              <span>{ticket.assignedTo}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Last Update:</span>
                              <span>{ticket.lastUpdate}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
                        <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                          {ticket.description}
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Updates & Communication</h4>
                        <div className="space-y-3">
                          {ticket.updates.map((update, index) => (
                            <div key={index} className="border-l-2 border-blue-200 pl-4">
                              <div className="flex justify-between items-center mb-1">
                                <span className="font-medium text-sm">{update.author}</span>
                                <span className="text-xs text-gray-500">{update.date}</span>
                              </div>
                              <p className="text-sm text-gray-600">{update.message}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Add Comment
                      </Button>
                      {ticket.status === 'Resolved' && (
                        <Button>
                          Close Ticket
                        </Button>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
                
                <Button variant="outline" size="sm">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Comment
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      
      {filteredTickets.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <CheckCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Tickets Found</h3>
            <p className="text-gray-500">No support tickets match your search criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
