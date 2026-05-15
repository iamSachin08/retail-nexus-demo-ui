
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Building, 
  MapPin, 
  Users, 
  Edit,
  Plus,
  Trash2,
  Eye
} from "lucide-react";

interface StoreHierarchyProps {
  searchQuery: string;
}

export function StoreHierarchy({ searchQuery }: StoreHierarchyProps) {
  const storeHierarchy = [
    {
      id: "R001",
      name: "North Region",
      type: "Region",
      manager: "Rajesh Kumar",
      stores: 8,
      totalStaff: 156,
      children: [
        {
          id: "Z001",
          name: "Delhi NCR Zone",
          type: "Zone", 
          manager: "Priya Sharma",
          stores: 5,
          totalStaff: 98,
          children: [
            {
              id: "S001",
              name: "Phoenix MarketCity",
              type: "Store",
              manager: "Amit Singh",
              address: "Sector 14, Gurgaon",
              staff: 23,
              area: "2500 sq ft"
            },
            {
              id: "S002",
              name: "Select City Walk",
              type: "Store", 
              manager: "Sneha Patel",
              address: "Saket, New Delhi",
              staff: 19,
              area: "2200 sq ft"
            }
          ]
        }
      ]
    },
    {
      id: "R002",
      name: "West Region",
      type: "Region",
      manager: "Vikram Joshi",
      stores: 6,
      totalStaff: 124,
      children: [
        {
          id: "Z002",
          name: "Mumbai Zone",
          type: "Zone",
          manager: "Anita Desai", 
          stores: 4,
          totalStaff: 87,
          children: [
            {
              id: "S003",
              name: "Palladium Mall",
              type: "Store",
              manager: "Rohit Kulkarni",
              address: "Lower Parel, Mumbai",
              staff: 21,
              area: "2800 sq ft"
            }
          ]
        }
      ]
    }
  ];

  const renderHierarchyNode = (node: any, level: number = 0) => {
    const indentClass = level > 0 ? `ml-${level * 6}` : "";
    
    return (
      <div key={node.id} className="space-y-3">
        <Card className={`${indentClass} ${level > 0 ? 'border-l-4 border-blue-200' : ''}`}>
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-3">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    {node.type === "Region" && <Building className="h-5 w-5 text-blue-600" />}
                    {node.type === "Zone" && <MapPin className="h-5 w-5 text-blue-600" />}
                    {node.type === "Store" && <Building className="h-5 w-5 text-blue-600" />}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{node.name}</h3>
                    <p className="text-sm text-gray-600">{node.id}</p>
                  </div>
                </div>
                <Badge variant="outline" className="mb-2">
                  {node.type}
                </Badge>
              </div>
              
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <Edit className="h-3 w-3" />
                </Button>
                <Button size="sm" variant="outline">
                  <Eye className="h-3 w-3" />
                </Button>
                <Button size="sm" variant="outline">
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Manager:</p>
                <p className="font-medium">{node.manager}</p>
              </div>
              
              {node.type === "Store" ? (
                <>
                  <div>
                    <p className="text-gray-600">Address:</p>
                    <p className="font-medium">{node.address}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Area:</p>
                    <p className="font-medium">{node.area}</p>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <p className="text-gray-600">Stores:</p>
                    <p className="font-medium">{node.stores}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Total Staff:</p>
                    <p className="font-medium">{node.totalStaff || node.staff}</p>
                  </div>
                </>
              )}
            </div>

            {node.type === "Store" && (
              <div className="mt-4 pt-4 border-t">
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span>{node.staff} Staff Members</span>
                  </div>
                  <Badge variant="outline" className="text-green-600">
                    Active
                  </Badge>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {node.children && node.children.map((child: any) => renderHierarchyNode(child, level + 1))}
      </div>
    );
  };

  const filteredHierarchy = storeHierarchy.filter(node => 
    node.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    node.manager.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Hierarchy Tree */}
      <div className="space-y-4">
        {filteredHierarchy.map((node) => renderHierarchyNode(node))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Hierarchy Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-16 flex-col gap-2">
              <Plus className="h-5 w-5" />
              <span className="text-sm">Add Region</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col gap-2">
              <MapPin className="h-5 w-5" />
              <span className="text-sm">Add Zone</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col gap-2">
              <Building className="h-5 w-5" />
              <span className="text-sm">Add Store</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col gap-2">
              <Eye className="h-5 w-5" />
              <span className="text-sm">View Map</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Building className="h-8 w-8 mx-auto mb-2 text-blue-600" />
            <p className="text-2xl font-bold">2</p>
            <p className="text-sm text-gray-600">Regions</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <MapPin className="h-8 w-8 mx-auto mb-2 text-green-600" />
            <p className="text-2xl font-bold">5</p>
            <p className="text-sm text-gray-600">Zones</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Building className="h-8 w-8 mx-auto mb-2 text-purple-600" />
            <p className="text-2xl font-bold">23</p>
            <p className="text-sm text-gray-600">Stores</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="h-8 w-8 mx-auto mb-2 text-orange-600" />
            <p className="text-2xl font-bold">280</p>
            <p className="text-sm text-gray-600">Total Staff</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
