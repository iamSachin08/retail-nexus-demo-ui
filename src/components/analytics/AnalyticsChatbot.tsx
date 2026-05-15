
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare, 
  Send, 
  Bot, 
  User,
  TrendingUp,
  BarChart3,
  HelpCircle
} from "lucide-react";

export function AnalyticsChatbot() {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    {
      type: "bot",
      message: "Hello! I'm your AI Analytics Assistant. Ask me anything about your store performance, sales data, or business insights.",
      time: "09:30 AM"
    }
  ]);

  const quickQuestions = [
    "Show week-on-week sales dip for AC category",
    "Which SKUs have highest return rate?",
    "Compare my store performance with region",
    "What are top 5 selling products today?",
    "Show footfall trends for last month",
    "Which staff member has best conversion rate?"
  ];

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newUserMessage = {
      type: "user",
      message: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const botResponse = {
      type: "bot",
      message: `I understand you're asking about "${message}". Let me analyze the data for you. Based on current trends, here are the insights...`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatHistory([...chatHistory, newUserMessage, botResponse]);
    setMessage("");
  };

  const handleQuickQuestion = (question: string) => {
    setMessage(question);
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Chat Interface */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-base md:text-lg flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              AI Analytics Copilot
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Chat Messages */}
            <div className="h-64 md:h-80 overflow-y-auto space-y-3 mb-4 p-3 bg-gray-50 rounded-lg">
              {chatHistory.map((chat, index) => (
                <div key={index} className={`flex gap-3 ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex items-start gap-2 max-w-[80%] ${chat.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`p-2 rounded-full ${chat.type === 'user' ? 'bg-blue-100' : 'bg-gray-200'}`}>
                      {chat.type === 'user' ? (
                        <User className="h-4 w-4 text-blue-600" />
                      ) : (
                        <Bot className="h-4 w-4 text-gray-600" />
                      )}
                    </div>
                    <div className={`p-3 rounded-lg ${chat.type === 'user' ? 'bg-blue-600 text-white' : 'bg-white border'}`}>
                      <p className="text-sm">{chat.message}</p>
                      <p className={`text-xs mt-1 ${chat.type === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                        {chat.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="flex gap-2">
              <Input
                placeholder="Ask me about your analytics..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1"
              />
              <Button onClick={handleSendMessage}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <HelpCircle className="h-5 w-5" />
              Quick Questions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {quickQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full text-left justify-start h-auto p-3 text-xs"
                  onClick={() => handleQuickQuestion(question)}
                >
                  {question}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            AI-Generated Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="h-4 w-4 text-blue-600" />
                <Badge variant="default" className="text-xs">Sales Insight</Badge>
              </div>
              <p className="text-sm text-blue-800">
                Your smartphone sales are trending 20% higher than last month. Consider increasing inventory for iPhone and Samsung models.
              </p>
            </div>
            
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <Badge variant="secondary" className="text-xs">Performance</Badge>
              </div>
              <p className="text-sm text-green-800">
                Your team's conversion rate is 15% above regional average. Great job! Focus on maintaining this momentum.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
