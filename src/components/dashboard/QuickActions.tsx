
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Package, 
  ShoppingCart, 
  Truck, 
  Users, 
  FileText, 
  RotateCcw,
  Zap,
  Plus
} from "lucide-react";

const quickActions = [
  { icon: Package, label: "Add Stock", color: "bg-blue-500 hover:bg-blue-600" },
  { icon: ShoppingCart, label: "New Sale", color: "bg-green-500 hover:bg-green-600" },
  { icon: Truck, label: "Track Delivery", color: "bg-purple-500 hover:bg-purple-600" },
  { icon: RotateCcw, label: "Process Return", color: "bg-orange-500 hover:bg-orange-600" },
  { icon: Users, label: "Staff Check-in", color: "bg-indigo-500 hover:bg-indigo-600" },
  { icon: FileText, label: "Generate Report", color: "bg-gray-500 hover:bg-gray-600" },
];

export function QuickActions() {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Zap className="h-5 w-5 text-yellow-500" />
          <h3 className="font-semibold text-gray-900">Quick Actions</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="ghost"
              className={`${action.color} text-white flex flex-col items-center gap-2 h-auto py-4 hover:scale-105 transition-all duration-200`}
            >
              <action.icon className="h-6 w-6" />
              <span className="text-xs font-medium">{action.label}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
