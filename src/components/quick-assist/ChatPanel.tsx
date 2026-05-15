import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare, 
  Send, 
  Users, 
  Clock,
  Circle,
  Phone,
  VideoIcon,
  Paperclip
} from "lucide-react";

export function ChatPanel() {
  const [selectedChat, setSelectedChat] = useState("boc-general");
  const [message, setMessage] = useState("");

  const chatRooms = [
    {
      id: "boc-general",
      name: "BOC - General Support",
      participants: 12,
      lastMessage: "Issue with POS system resolved",
      timestamp: "2 min ago",
      unreadCount: 3,
      status: "online"
    },
    {
      id: "it-department",
      name: "IT Department",
      participants: 8,
      lastMessage: "Server maintenance scheduled for tonight",
      timestamp: "15 min ago",
      unreadCount: 1,
      status: "online"
    },
    {
      id: "finance-team",
      name: "Paper Finance Team",
      participants: 6,
      lastMessage: "Daily report uploaded",
      timestamp: "1 hour ago",
      unreadCount: 0,
      status: "busy"
    },
    {
      id: "operations",
      name: "Operations Team",
      participants: 15,
      lastMessage: "Stock audit completed",
      timestamp: "2 hours ago",
      unreadCount: 0,
      status: "online"
    }
  ];

  const messages = [
    {
      id: 1,
      sender: "John Doe",
      role: "BOC Manager",
      message: "Good morning everyone! Please update on any pending issues.",
      timestamp: "9:00 AM",
      avatar: "JD"
    },
    {
      id: 2,
      sender: "You",
      role: "Store Manager",
      message: "POS system issue from yesterday has been resolved. Thank you for the quick support!",
      timestamp: "9:05 AM",
      avatar: "You"
    },
    {
      id: 3,
      sender: "Sarah Wilson",
      role: "IT Support",
      message: "Great to hear! The patch we deployed seems to be working well. Let us know if you face any other issues.",
      timestamp: "9:10 AM",
      avatar: "SW"
    },
    {
      id: 4,
      sender: "Mike Chen",
      role: "Store Associate",
      message: "We're experiencing slow internet in the store. Can someone look into this?",
      timestamp: "9:15 AM",
      avatar: "MC"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'busy': return 'bg-yellow-500';
      case 'away': return 'bg-gray-500';
      default: return 'bg-gray-300';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[600px]">
      {/* Chat Rooms List */}
      <div className="lg:col-span-1">
        <Card className="h-full">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Users className="h-5 w-5" />
              Chat Rooms
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1">
              {chatRooms.map((room) => (
                <div
                  key={room.id}
                  className={`p-3 cursor-pointer border-b hover:bg-gray-50 transition-colors ${
                    selectedChat === room.id ? 'bg-blue-50 border-r-2 border-blue-500' : ''
                  }`}
                  onClick={() => setSelectedChat(room.id)}
                >
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-sm truncate">{room.name}</h4>
                    <div className="flex items-center gap-1">
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(room.status)}`}></div>
                      {room.unreadCount > 0 && (
                        <Badge variant="destructive" className="text-xs px-1.5 py-0.5">
                          {room.unreadCount}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 truncate">{room.lastMessage}</p>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-xs text-gray-500">{room.participants} participants</span>
                    <span className="text-xs text-gray-500">{room.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chat Messages */}
      <div className="lg:col-span-3">
        <Card className="h-full flex flex-col">
          <CardHeader className="pb-3 border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <MessageSquare className="h-5 w-5" />
                <div>
                  <CardTitle className="text-base">
                    {chatRooms.find(room => room.id === selectedChat)?.name}
                  </CardTitle>
                  <p className="text-sm text-gray-600">
                    {chatRooms.find(room => room.id === selectedChat)?.participants} participants
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <VideoIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>

          {/* Messages Area */}
          <CardContent className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex gap-3 ${msg.sender === 'You' ? 'flex-row-reverse' : ''}`}>
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-medium text-blue-600">{msg.avatar}</span>
                  </div>
                  <div className={`flex-1 max-w-xs lg:max-w-md ${msg.sender === 'You' ? 'text-right' : ''}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium">{msg.sender}</span>
                      <span className="text-xs text-gray-500">{msg.role}</span>
                      <span className="text-xs text-gray-400">{msg.timestamp}</span>
                    </div>
                    <div className={`p-3 rounded-lg ${
                      msg.sender === 'You' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      <p className="text-sm">{msg.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>

          {/* Message Input */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Button size="sm" variant="outline">
                <Paperclip className="h-4 w-4" />
              </Button>
              <Input
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    // Handle send message
                    setMessage("");
                  }
                }}
              />
              <Button size="sm">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
