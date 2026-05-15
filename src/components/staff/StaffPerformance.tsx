import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Award, Target, Star } from "lucide-react";

interface StaffPerformanceProps {
  searchQuery: string;
  viewType: "my" | "subordinates";
}

export function StaffPerformance({ searchQuery, viewType }: StaffPerformanceProps) {
  const performanceData = [
    {
      id: "EMP001",
      name: "Ravi Kumar",
      role: "Sales Associate",
      salesTarget: 500000,
      salesAchieved: 560000,
      customerRating: 4.8,
      tasksCompleted: 28,
      tasksTotal: 30,
      badges: ["Top Seller", "Customer Favorite"],
      trend: "up"
    },
    {
      id: "EMP002",
      name: "Priya Sharma",
      role: "Floor Manager",
      salesTarget: 300000,
      salesAchieved: 285000,
      customerRating: 4.6,
      tasksCompleted: 25,
      tasksTotal: 25,
      badges: ["Team Leader", "Mentor"],
      trend: "up"
    },
    {
      id: "EMP003",
      name: "Amit Patel",
      role: "Sales Associate",
      salesTarget: 450000,
      salesAchieved: 380000,
      customerRating: 4.2,
      tasksCompleted: 22,
      tasksTotal: 28,
      badges: ["Consistent Performer"],
      trend: "down"
    }
  ];

  const filteredStaff = performanceData.filter(staff => 
    staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    staff.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    staff.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getAchievementPercentage = (achieved: number, target: number) => {
    return Math.round((achieved / target) * 100);
  };

  const getTaskCompletionPercentage = (completed: number, total: number) => {
    return Math.round((completed / total) * 100);
  };

  return (
    <div className="space-y-6">
      {/* Performance Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Award className="h-8 w-8 text-gold-600" />
              <div>
                <p className="text-xl font-bold text-yellow-600">12</p>
                <p className="text-sm text-yellow-700">Top Performers</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Target className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-xl font-bold text-blue-600">87%</p>
                <p className="text-sm text-blue-700">Avg Target Achievement</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Star className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-xl font-bold text-orange-600">4.5</p>
                <p className="text-sm text-orange-700">Avg Customer Rating</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Staff Performance Cards */}
      <div className="space-y-6">
        {filteredStaff.map((staff) => (
          <Card key={staff.id}>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Award className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{staff.name}</h3>
                    <p className="text-sm text-gray-600">{staff.role} • {staff.id}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {staff.trend === "up" ? (
                    <TrendingUp className="h-5 w-5 text-green-600" />
                  ) : (
                    <TrendingDown className="h-5 w-5 text-red-600" />
                  )}
                  <span className="text-sm font-medium">
                    {staff.trend === "up" ? "Improving" : "Declining"}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Sales Performance */}
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Sales Performance</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Target Achievement</span>
                      <span className="font-medium">
                        {getAchievementPercentage(staff.salesAchieved, staff.salesTarget)}%
                      </span>
                    </div>
                    <Progress 
                      value={getAchievementPercentage(staff.salesAchieved, staff.salesTarget)} 
                      className="h-2"
                    />
                    <div className="flex justify-between text-xs text-gray-600">
                      <span>₹{(staff.salesAchieved / 1000).toFixed(0)}K achieved</span>
                      <span>₹{(staff.salesTarget / 1000).toFixed(0)}K target</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm">Customer Rating: {staff.customerRating}/5.0</span>
                  </div>
                </div>

                {/* Task Performance */}
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Task Performance</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Tasks Completed</span>
                      <span className="font-medium">
                        {getTaskCompletionPercentage(staff.tasksCompleted, staff.tasksTotal)}%
                      </span>
                    </div>
                    <Progress 
                      value={getTaskCompletionPercentage(staff.tasksCompleted, staff.tasksTotal)} 
                      className="h-2"
                    />
                    <div className="flex justify-between text-xs text-gray-600">
                      <span>{staff.tasksCompleted} completed</span>
                      <span>{staff.tasksTotal} total</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {staff.badges.map((badge, index) => (
                      <Badge key={index} className="bg-purple-100 text-purple-800">
                        {badge}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2 mt-6">
                <Button size="sm" variant="outline">
                  View Details
                </Button>
                <Button size="sm" variant="outline">
                  Set Goals
                </Button>
                <Button size="sm" variant="outline">
                  Send Feedback
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
