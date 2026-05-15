
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  Trophy, 
  TrendingUp, 
  Target,
  Star,
  Award
} from "lucide-react";

export function TeamPerformanceView() {
  const teamMembers = [
    { name: "Rajesh Kumar", role: "Senior SA", sales: "₹85K", target: 92, rating: 4.8, badge: "Top Performer" },
    { name: "Priya Sharma", role: "Sales Associate", sales: "₹78K", target: 89, rating: 4.6, badge: "Rising Star" },
    { name: "Amit Singh", role: "Sales Associate", sales: "₹72K", target: 85, rating: 4.4, badge: "" },
    { name: "Sneha Patel", role: "Junior SA", sales: "₹65K", target: 78, rating: 4.2, badge: "" },
  ];

  const storeRankings = [
    { store: "Electronics Hub - MG Road", sales: "₹12.5L", rank: 1, growth: "+15%" },
    { store: "TechZone - Brigade Road", sales: "₹11.8L", rank: 2, growth: "+12%" },
    { store: "GadgetWorld - Koramangala", sales: "₹10.2L", rank: 3, growth: "+8%" },
    { store: "Digital Store - Indiranagar", sales: "₹9.8L", rank: 4, growth: "+5%" },
  ];

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Team Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Team Size</p>
                <p className="text-xl font-semibold">12</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Target className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Avg Performance</p>
                <p className="text-xl font-semibold">86%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Trophy className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Top Achievers</p>
                <p className="text-xl font-semibold">4</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Team Performance */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base md:text-lg flex items-center gap-2">
              <Users className="h-5 w-5" />
              Team Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teamMembers.map((member, index) => (
                <div key={index} className="flex flex-col sm:flex-row sm:items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3 flex-1">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="" />
                      <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                        <p className="font-medium text-sm">{member.name}</p>
                        {member.badge && (
                          <Badge variant="secondary" className="text-xs self-start sm:self-center">
                            <Star className="h-3 w-3 mr-1" />
                            {member.badge}
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-gray-600">{member.role}</p>
                      <div className="mt-2 space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Sales: {member.sales}</span>
                          <span>Rating: {member.rating}★</span>
                        </div>
                        <Progress value={member.target} className="h-2" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Store Rankings */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base md:text-lg flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              Store Rankings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {storeRankings.map((store, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
                    <span className="text-sm font-semibold text-blue-600">#{store.rank}</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{store.store}</p>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mt-1">
                      <p className="text-xs text-gray-600">Sales: {store.sales}</p>
                      <Badge 
                        variant="outline" 
                        className="text-green-700 border-green-200 bg-green-50 text-xs self-start sm:self-center"
                      >
                        <TrendingUp className="h-3 w-3 mr-1" />
                        {store.growth}
                      </Badge>
                    </div>
                  </div>
                  {store.rank === 1 && (
                    <Award className="h-5 w-5 text-yellow-500" />
                  )}
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Button variant="outline" className="w-full text-sm">
                View Full Rankings
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
