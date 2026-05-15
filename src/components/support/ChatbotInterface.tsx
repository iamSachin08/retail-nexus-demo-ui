
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Send, Bot, User, ThumbsUp, ThumbsDown, Copy, RotateCcw } from "lucide-react";

interface ChatbotInterfaceProps {
  searchQuery: string;
}

interface ChatMessage {
  id: number;
  type: 'user' | 'bot';
  message: string;
  timestamp: string;
  suggestions?: string[];
}

export function ChatbotInterface({ searchQuery }: ChatbotInterfaceProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      type: 'bot',
      message: 'Hi! I\'m your RetailHub Assistant. How can I help you today?',
      timestamp: '10:30 AM',
      suggestions: ['How to process a return?', 'Check stock levels', 'POS troubleshooting', 'Staff attendance query']
    }
  ]);
  
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: messages.length + 1,
      type: 'user',
      message: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestions: []
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: messages.length + 2,
        type: 'bot',
        message: getBotResponse(newMessage),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: getBotSuggestions(newMessage)
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const getBotResponse = (userMessage: string) => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('return') || lowerMessage.includes('refund')) {
      return 'To process a return: 1) Go to Returns module, 2) Scan product barcode, 3) Select return reason, 4) Upload damage photos if needed, 5) Submit for approval. Need more specific help?';
    } else if (lowerMessage.includes('stock') || lowerMessage.includes('inventory')) {
      return 'For stock queries: Check Inventory module for real-time stock levels, low stock alerts, and stock movements. You can also scan barcodes for quick stock lookup.';
    } else if (lowerMessage.includes('pos') || lowerMessage.includes('billing')) {
      return 'POS issues: 1) Check network connection, 2) Restart POS terminal, 3) Sync transactions manually from Sales module, 4) Contact IT support if problem persists.';
    } else if (lowerMessage.includes('staff') || lowerMessage.includes('attendance')) {
      return 'Staff management: Check Staff module for attendance tracking, task assignments, and performance metrics. You can mark attendance using face recognition or geo-tagging.';
    } else {
      return 'I understand you need help. Can you be more specific about what you\'re looking for? I can assist with returns, inventory, POS, staff management, and more.';
    }
  };

  const getBotSuggestions = (userMessage: string): string[] => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('return')) {
      return ['Return approval process', 'Damage photo guidelines', 'Refund timeline'];
    } else if (lowerMessage.includes('stock')) {
      return ['Low stock alerts', 'Stock transfer process', 'Barcode scanning'];
    } else if (lowerMessage.includes('pos')) {
      return ['POS sync issues', 'Payment reconciliation', 'Transaction reports'];
    } else {
      return ['Check documentation', 'Raise a ticket', 'Contact support'];
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setNewMessage(suggestion);
  };

  const clearChat = () => {
    setMessages([{
      id: 1,
      type: 'bot',
      message: 'Chat cleared! How can I help you today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestions: ['How to process a return?', 'Check stock levels', 'POS troubleshooting', 'Staff attendance query']
    }]);
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-0">
          {/* Chat Header */}
          <div className="flex items-center justify-between p-4 border-b bg-blue-50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-full">
                <Bot className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">RetailHub Assistant</h3>
                <p className="text-sm text-gray-600">Online • Ready to help</p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={clearChat}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Clear Chat
            </Button>
          </div>

          {/* Chat Messages */}
          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex gap-3 max-w-xs lg:max-w-md ${message.type === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`p-2 rounded-full flex-shrink-0 ${
                    message.type === 'user' ? 'bg-blue-100' : 'bg-gray-100'
                  }`}>
                    {message.type === 'user' ? (
                      <User className="h-4 w-4 text-blue-600" />
                    ) : (
                      <Bot className="h-4 w-4 text-gray-600" />
                    )}
                  </div>
                  <div className="space-y-2">
                    <div className={`p-3 rounded-lg ${
                      message.type === 'user' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      <p className="text-sm">{message.message}</p>
                    </div>
                    <p className="text-xs text-gray-500">{message.timestamp}</p>
                    
                    {/* Suggestions for bot messages */}
                    {message.type === 'bot' && message.suggestions && message.suggestions.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-xs text-gray-600">Quick suggestions:</p>
                        <div className="flex flex-wrap gap-2">
                          {message.suggestions.map((suggestion, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              size="sm"
                              className="text-xs h-6"
                              onClick={() => handleSuggestionClick(suggestion)}
                            >
                              {suggestion}
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Action buttons for bot messages */}
                    {message.type === 'bot' && (
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" className="h-6 px-2">
                          <ThumbsUp className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-6 px-2">
                          <ThumbsDown className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-6 px-2">
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex gap-3 max-w-xs">
                  <div className="p-2 bg-gray-100 rounded-full">
                    <Bot className="h-4 w-4 text-gray-600" />
                  </div>
                  <div className="bg-gray-100 text-gray-900 p-3 rounded-lg">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1"
              />
              <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardContent className="p-4">
          <h4 className="font-semibold text-gray-900 mb-3">Quick Actions</h4>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <Button variant="outline" size="sm" onClick={() => handleSuggestionClick('How to process a return?')}>
              Process Return
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleSuggestionClick('Check stock levels')}>
              Check Stock
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleSuggestionClick('POS troubleshooting')}>
              POS Help
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleSuggestionClick('Staff attendance query')}>
              Staff Query
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Frequently Asked */}
      <Card>
        <CardContent className="p-4">
          <h4 className="font-semibold text-gray-900 mb-3">Frequently Asked</h4>
          <div className="space-y-2">
            {[
              'How to sync POS transactions?',
              'Return policy for damaged items',
              'How to check staff performance?',
              'Stock transfer between stores',
              'Customer complaint resolution'
            ].map((faq, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                className="w-full justify-start text-left h-auto p-2"
                onClick={() => handleSuggestionClick(faq)}
              >
                <span className="text-sm text-gray-700">{faq}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
