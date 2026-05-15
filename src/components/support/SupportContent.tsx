import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MessageCircle, 
  Search, 
  Filter, 
  Download, 
  Plus,
  CheckCircle,
  Clock,
  AlertTriangle,
  BookOpen,
  Ticket,
  MessageSquare,
  Headphones,
  Users
} from "lucide-react";
import { ChatbotInterface } from "./ChatbotInterface";
import { TicketManager } from "./TicketManager";
import { KnowledgeBase } from "./KnowledgeBase";
import { MyTickets } from "./MyTickets";
import { RaiseTicket } from "../quick-assist/RaiseTicket";
import { ChatPanel } from "../quick-assist/ChatPanel";
import { BOCReview } from "../quick-assist/BOCReview";

export function SupportContent() {
  const [searchQuery, setSearchQuery] = useState("");
  
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Headphones className="h-6 w-6 text-blue-600" />
            Support & Quick Assist
          </h1>
          <p className="text-gray-600">Get help, raise tickets, access knowledge base and real-time chat support</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Tickets
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New Ticket
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Ticket className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Tickets</p>
                <p className="text-xl font-semibold">323</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Open Tickets</p>
                <p className="text-xl font-semibold">57</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Resolved</p>
                <p className="text-xl font-semibold">253</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">High Priority</p>
                <p className="text-xl font-semibold">18</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search tickets, ask questions, or browse help topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <MessageSquare className="h-4 w-4 mr-2" />
                Live Chat
              </Button>
              <Button variant="outline" size="sm">
                <BookOpen className="h-4 w-4 mr-2" />
                Quick Help
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="raise-ticket" className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6 h-auto">
          <TabsTrigger value="raise-ticket" className="text-xs md:text-sm">Raise Ticket</TabsTrigger>
          <TabsTrigger value="my-tickets" className="text-xs md:text-sm">My Tickets</TabsTrigger>
          <TabsTrigger value="chat" className="text-xs md:text-sm">Chat Panel</TabsTrigger>
          <TabsTrigger value="boc-review" className="text-xs md:text-sm">BOC Review</TabsTrigger>
          <TabsTrigger value="chatbot" className="text-xs md:text-sm">AI Assistant</TabsTrigger>
          <TabsTrigger value="knowledge" className="text-xs md:text-sm">Knowledge Base</TabsTrigger>
        </TabsList>
        
        <TabsContent value="raise-ticket" className="mt-6">
          <RaiseTicket />
        </TabsContent>
        
        <TabsContent value="my-tickets" className="mt-6">
          <MyTickets searchQuery={searchQuery} />
        </TabsContent>
        
        <TabsContent value="chat" className="mt-6">
          <ChatPanel />
        </TabsContent>
        
        <TabsContent value="boc-review" className="mt-6">
          <BOCReview />
        </TabsContent>
        
        <TabsContent value="chatbot" className="mt-6">
          <ChatbotInterface searchQuery={searchQuery} />
        </TabsContent>
        
        <TabsContent value="knowledge" className="mt-6">
          <KnowledgeBase searchQuery={searchQuery} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
