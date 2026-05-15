
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart3, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";

export function TaskProgress() {
  const progressData = [
    {
      category: "Inventory Management",
      total: 45,
      completed: 38,
      inProgress: 5,
      overdue: 2,
      completionRate: 84
    },
    {
      category: "Visual Merchandising",
      total: 32,
      completed: 28,
      inProgress: 3,
      overdue: 1,
      completionRate: 88
    },
    {
      category: "Pricing & SEL",
      total: 28,
      completed: 24,
      inProgress: 2,
      overdue: 2,
      completionRate: 86
    },
    {
      category: "Compliance Check",
      total: 51,
      completed: 45,
      inProgress: 4,
      overdue: 2,
      completionRate: 88
    }
  ];

  const storePerformance = [
    { store: "Store Alpha", completion: 92, tasks: 156 },
    { store: "Store Beta", completion: 88, tasks: 134 },
    { store: "Store Gamma", completion: 85, tasks: 142 },
    { store: "Store Delta", completion: 79, tasks: 128 }
  ];

  return (
    <div className="space-y-6">
      {/* Overall Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Overall Progress Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">156</div>
              <div className="text-sm text-gray-600">Total Tasks</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">135</div>
              <div className="text-sm text-gray-600">Completed</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">14</div>
              <div className="text-sm text-gray-600">In Progress</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">7</div>
              <div className="text-sm text-gray-600">Overdue</div>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Overall Completion</span>
              <span className="text-sm text-gray-600">86%</span>
            </div>
            <Progress value={86} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Category-wise Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Category-wise Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {progressData.map((category) => (
              <div key={category.category} className="p-4 border rounded-lg">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3">
                  <h3 className="font-medium">{category.category}</h3>
                  <div className="flex gap-2">
                    <Badge variant="outline">{category.total} Total</Badge>
                    <Badge variant="default">{category.completed} Done</Badge>
                    {category.overdue > 0 && (
                      <Badge variant="destructive">{category.overdue} Overdue</Badge>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">Completion Rate</span>
                  <span className="text-sm font-medium">{category.completionRate}%</span>
                </div>
                <Progress value={category.completionRate} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Store Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Store Performance Leaderboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {storePerformance.map((store, index) => (
              <div key={store.store} className="flex items-center gap-4 p-3 border rounded-lg">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-blue-600">{index + 1}</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium">{store.store}</span>
                    <span className="text-sm font-medium">{store.completion}%</span>
                  </div>
                  <Progress value={store.completion} className="h-2" />
                  <p className="text-xs text-gray-600 mt-1">{store.tasks} tasks assigned</p>
                </div>
                {store.completion >= 90 && (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                )}
                {store.completion < 80 && (
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
