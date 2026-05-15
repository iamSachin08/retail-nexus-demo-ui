
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Clock, AlertTriangle, Camera, Upload, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface VMChecklistProps {
  searchQuery: string;
}

export function VMChecklist({ searchQuery }: VMChecklistProps) {
  const [selectedArea, setSelectedArea] = useState<any>(null);
  const [checklistItems, setChecklistItems] = useState<any>({});
  const { toast } = useToast();

  const vmAreas = [
    {
      id: "VM-001",
      area: "Store Entrance",
      brand: "Samsung",
      lastChecked: "2024-01-22",
      checkedBy: "Rahul Sharma",
      status: "Compliant",
      score: 95,
      totalItems: 8,
      completedItems: 8,
      priority: "High",
      checklistItems: [
        { id: 1, item: "Welcome signage properly positioned", completed: true, required: true },
        { id: 2, item: "Brand logo clearly visible", completed: true, required: true },
        { id: 3, item: "Promotional banners updated", completed: true, required: false },
        { id: 4, item: "Floor clean and obstacle-free", completed: true, required: true },
        { id: 5, item: "Lighting adequate", completed: true, required: true },
        { id: 6, item: "Product displays attractive", completed: true, required: false },
        { id: 7, item: "Price tags visible", completed: true, required: true },
        { id: 8, item: "Staff positioning appropriate", completed: true, required: false }
      ]
    },
    {
      id: "VM-002",
      area: "Television Display Wall",
      brand: "LG",
      lastChecked: "2024-01-21",
      checkedBy: "Priya Singh",
      status: "Pending",
      score: 75,
      totalItems: 10,
      completedItems: 7,
      priority: "Medium",
      checklistItems: [
        { id: 1, item: "All displays powered on", completed: true, required: true },
        { id: 2, item: "Demo content playing", completed: true, required: true },
        { id: 3, item: "Price cards updated", completed: false, required: true },
        { id: 4, item: "Feature highlights visible", completed: true, required: false },
        { id: 5, item: "Cables hidden/organized", completed: true, required: true },
        { id: 6, item: "Dust-free screens", completed: false, required: true },
        { id: 7, item: "Proper spacing between units", completed: true, required: true },
        { id: 8, item: "Brand positioning correct", completed: true, required: true },
        { id: 9, item: "Accessories displayed nearby", completed: true, required: false },
        { id: 10, item: "Staff demonstration ready", completed: false, required: false }
      ]
    },
    {
      id: "VM-003",
      area: "Refrigerator Section",
      brand: "Whirlpool",
      lastChecked: "2024-01-20",
      checkedBy: "Amit Kumar",
      status: "Non-Compliant",
      score: 60,
      totalItems: 12,
      completedItems: 6,
      priority: "High",
      checklistItems: [
        { id: 1, item: "Models properly spaced", completed: true, required: true },
        { id: 2, item: "Energy rating labels visible", completed: false, required: true },
        { id: 3, item: "Interior lighting working", completed: true, required: true },
        { id: 4, item: "Door seals clean", completed: false, required: true },
        { id: 5, item: "Price tags current", completed: false, required: true },
        { id: 6, item: "Feature cards displayed", completed: true, required: false },
        { id: 7, item: "Brand signage positioned", completed: true, required: true },
        { id: 8, item: "Demo units functioning", completed: false, required: true },
        { id: 9, item: "Comparison charts updated", completed: true, required: false },
        { id: 10, item: "Floor markings clear", completed: false, required: true },
        { id: 11, item: "Accessories available", completed: true, required: false },
        { id: 12, item: "Staff knowledgeable", completed: false, required: true }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Compliant": return "bg-green-100 text-green-800";
      case "Pending": return "bg-yellow-100 text-yellow-800";
      case "Non-Compliant": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-red-100 text-red-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 75) return "text-yellow-600";
    return "text-red-600";
  };

  const filteredAreas = vmAreas.filter(area => 
    area.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
    area.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleChecklistUpdate = (areaId: string, itemId: number, completed: boolean) => {
    setChecklistItems(prev => ({
      ...prev,
      [`${areaId}-${itemId}`]: completed
    }));
  };

  const handleSubmitChecklist = (areaId: string) => {
    toast({
      title: "Checklist Submitted",
      description: `VM checklist for ${areaId} has been submitted successfully.`,
    });
  };

  const calculateProgress = (area: any) => {
    const completedCount = area.checklistItems.filter((item: any) => item.completed).length;
    return (completedCount / area.totalItems) * 100;
  };

  return (
    <div className="space-y-4">
      {filteredAreas.map((area) => (
        <Card key={area.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex-1 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <h3 className="font-semibold text-gray-900">{area.area}</h3>
                  <div className="flex gap-2">
                    <Badge className={getStatusColor(area.status)}>
                      {area.status}
                    </Badge>
                    <Badge className={getPriorityColor(area.priority)}>
                      {area.priority}
                    </Badge>
                    <Badge variant="outline">
                      {area.brand}
                    </Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                  <div>
                    <span className="font-medium">Last Checked:</span> {area.lastChecked}
                  </div>
                  <div>
                    <span className="font-medium">Checked By:</span> {area.checkedBy}
                  </div>
                  <div>
                    <span className="font-medium">Progress:</span> {area.completedItems}/{area.totalItems}
                  </div>
                  <div>
                    <span className="font-medium">Score:</span> 
                    <span className={`ml-1 font-bold ${getScoreColor(area.score)}`}>
                      {area.score}%
                    </span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Completion Progress</span>
                    <span>{Math.round(calculateProgress(area))}%</span>
                  </div>
                  <Progress value={calculateProgress(area)} className="h-2" />
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setSelectedArea(area)}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Review Checklist
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>VM Checklist - {area.area}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-900">{area.completedItems}/{area.totalItems}</div>
                          <div className="text-sm text-gray-600">Items Completed</div>
                        </div>
                        <div className="text-center">
                          <div className={`text-2xl font-bold ${getScoreColor(area.score)}`}>{area.score}%</div>
                          <div className="text-sm text-gray-600">Compliance Score</div>
                        </div>
                        <div className="text-center">
                          <Badge className={getStatusColor(area.status)}>
                            {area.status}
                          </Badge>
                          <div className="text-sm text-gray-600 mt-1">Current Status</div>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <h4 className="font-semibold text-gray-900">Checklist Items</h4>
                        {area.checklistItems.map((item: any) => (
                          <div key={item.id} className="flex items-start gap-3 p-3 border rounded-lg">
                            <Checkbox
                              id={`item-${item.id}`}
                              checked={checklistItems[`${area.id}-${item.id}`] ?? item.completed}
                              onCheckedChange={(checked) => 
                                handleChecklistUpdate(area.id, item.id, checked as boolean)
                              }
                            />
                            <label 
                              htmlFor={`item-${item.id}`} 
                              className="flex-1 text-sm cursor-pointer"
                            >
                              {item.item}
                              {item.required && (
                                <span className="text-red-500 ml-1">*</span>
                              )}
                            </label>
                            {item.required && (
                              <Badge variant="outline" className="text-xs">
                                Required
                              </Badge>
                            )}
                          </div>
                        ))}
                      </div>
                      
                      <div>
                        <Label htmlFor="notes">Additional Notes</Label>
                        <Textarea
                          id="notes"
                          placeholder="Add any observations or comments..."
                          className="h-20"
                        />
                      </div>
                      
                      <div className="flex justify-between">
                        <Button variant="outline">
                          <Camera className="h-4 w-4 mr-2" />
                          Take Photos
                        </Button>
                        <div className="flex gap-2">
                          <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                          </DialogClose>
                          <Button onClick={() => handleSubmitChecklist(area.id)}>
                            Submit Checklist
                          </Button>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                
                <Button size="sm" variant="outline">
                  <Camera className="h-4 w-4 mr-2" />
                  Photos
                </Button>
                
                {area.status !== "Compliant" && (
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    Start Check
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      
      {filteredAreas.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-gray-500">No VM areas found matching your search criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
