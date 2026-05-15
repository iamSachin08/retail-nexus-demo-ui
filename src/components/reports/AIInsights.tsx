import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  TrendingUp, 
  TrendingDown, 
  Lightbulb,
  Target,
  Users,
  AlertCircle,
  CheckCircle
} from "lucide-react";

interface AIInsightsProps {
  searchQuery: string;
}

export function AIInsights({ searchQuery }: AIInsightsProps) {
  const insights = [
    {
      id: "AI001",
      type: "Sales Prediction",
      title: "iPhone 15 series sales spike expected",
      description: "AI predicts 40% increase in iPhone 15 sales next week based on social media trends and historical data.",
      confidence: 89,
      impact: "High",
      category: "Sales Forecast",
      action: "Increase inventory",
      icon: TrendingUp,
      color: "text-green-600 bg-green-100"
    },
    {
      id: "AI002", 
      type: "Customer Behavior",
      title: "Premium customer segment growing",
      description: "Customers are shifting towards premium products. Average order value increased by 25% in accessories category.",
      confidence: 92,
      impact: "Medium",
      category: "Customer Insights",
      action: "Focus on premium brands",
      icon: Users,
      color: "text-blue-600 bg-blue-100"
    },
    {
      id: "AI003",
      type: "Inventory Alert",
      title: "Seasonal demand pattern detected",
      description: "Air conditioner sales will peak in next 3 weeks. Current stock may not meet demand.",
      confidence: 87,
      impact: "High", 
      category: "Inventory",
      action: "Emergency local procurement",
      icon: AlertCircle,
      color: "text-orange-600 bg-orange-100"
    },
    {
      id: "AI004",
      type: "Staff Performance",
      title: "Training impact shows positive results",
      description: "Staff who completed product training are showing 18% higher conversion rates.",
      confidence: 94,
      impact: "Medium",
      category: "HR Insights",
      action: "Expand training program",
      icon: CheckCircle,
      color: "text-purple-600 bg-purple-100"
    }
  ];

  const filteredInsights = insights.filter(insight => 
    insight.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    insight.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* AI Insights Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredInsights.map((insight) => (
          <Card key={insight.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${insight.color}`}>
                    <insight.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{insight.title}</CardTitle>
                    <p className="text-sm text-gray-600">{insight.type}</p>
                  </div>
                </div>
                <Badge variant="outline">{insight.category}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-700">{insight.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Confidence</p>
                    <p className="text-sm font-semibold">{insight.confidence}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Impact</p>
                    <Badge variant={insight.impact === "High" ? "destructive" : "secondary"}>
                      {insight.impact}
                    </Badge>
                  </div>
                </div>
                <Button size="sm">
                  {insight.action}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* AI Recommendations Summary */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Brain className="h-6 w-6 text-purple-600" />
            <CardTitle>AI Recommendations Summary</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="p-4 bg-green-100 rounded-lg mb-3">
                <Target className="h-8 w-8 text-green-600 mx-auto" />
              </div>
              <h3 className="font-semibold mb-2">Revenue Optimization</h3>
              <p className="text-sm text-gray-600">AI suggests focusing on premium products could increase revenue by 15%</p>
            </div>
            
            <div className="text-center">
              <div className="p-4 bg-blue-100 rounded-lg mb-3">
                <TrendingUp className="h-8 w-8 text-blue-600 mx-auto" />
              </div>
              <h3 className="font-semibold mb-2">Demand Forecasting</h3>
              <p className="text-sm text-gray-600">Predictive models show 92% accuracy in forecasting weekly demand</p>
            </div>
            
            <div className="text-center">
              <div className="p-4 bg-purple-100 rounded-lg mb-3">
                <Lightbulb className="h-8 w-8 text-purple-600 mx-auto" />
              </div>
              <h3 className="font-semibold mb-2">Smart Suggestions</h3>
              <p className="text-sm text-gray-600">AI-powered recommendations improving customer satisfaction by 23%</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
