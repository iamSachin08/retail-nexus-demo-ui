import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Shield, 
  Edit, 
  Copy, 
  Trash2,
  Users,
  Eye
} from "lucide-react";

interface RolePermissionsProps {
  searchQuery: string;
}

export function RolePermissions({ searchQuery }: RolePermissionsProps) {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const roles = [
    {
      id: "R001",
      name: "Store Manager",
      description: "Full access to store operations and management",
      userCount: 23,
      permissions: ["Dashboard", "Inventory", "Sales", "Staff", "Reports", "Settings"],
      level: "High"
    },
    {
      id: "R002",
      name: "Sales Associate",
      description: "Access to sales, customer service and basic inventory",
      userCount: 67,
      permissions: ["Dashboard", "Sales", "Customer Service", "Inventory View"],
      level: "Medium"
    },
    {
      id: "R003",
      name: "Inventory Manager", 
      description: "Specialized access for inventory and local procurement",
      userCount: 12,
      permissions: ["Dashboard", "Inventory", "Local Procurement", "Reports"],
      level: "Medium"
    },
    {
      id: "R004",
      name: "Customer Service",
      description: "Customer support, returns and basic sales access",
      userCount: 34,
      permissions: ["Dashboard", "Customer Service", "Returns", "Sales View"],
      level: "Low"
    },
    {
      id: "R005",
      name: "Technician",
      description: "Service, installation and repair management",
      userCount: 18,
      permissions: ["Dashboard", "Services", "Customer Service"],
      level: "Low"
    }
  ];

  const allPermissions = [
    { id: "dashboard", name: "Dashboard", description: "View dashboard and analytics" },
    { id: "inventory", name: "Inventory Management", description: "Full inventory control" },
    { id: "inventory_view", name: "Inventory View", description: "Read-only inventory access" },
    { id: "sales", name: "Sales & Billing", description: "Process sales and billing" },
    { id: "sales_view", name: "Sales View", description: "Read-only sales access" },
    { id: "customer", name: "Customer Service", description: "Customer support and service" },
    { id: "returns", name: "Returns Management", description: "Handle returns and exchanges" },
    { id: "staff", name: "Staff Management", description: "Manage staff and schedules" },
    { id: "procurement", name: "Local Procurement", description: "Purchase orders and vendors" },
    { id: "services", name: "Services", description: "Installation and repair services" },
    { id: "reports", name: "Reports", description: "Generate and view reports" },
    { id: "settings", name: "Settings", description: "System configuration" }
  ];

  const filteredRoles = roles.filter(role => 
    role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    role.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getLevelColor = (level: string) => {
    switch (level) {
      case "High": return "bg-red-100 text-red-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Roles List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Role Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {filteredRoles.map((role) => (
                <div 
                  key={role.id} 
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedRole === role.id ? "bg-blue-50 border-blue-200" : "hover:bg-gray-50"
                  }`}
                  onClick={() => setSelectedRole(role.id)}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">{role.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{role.description}</p>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={getLevelColor(role.level)}>
                        {role.level}
                      </Badge>
                      <Badge variant="outline">
                        <Users className="h-3 w-3 mr-1" />
                        {role.userCount}
                      </Badge>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">Permissions:</p>
                    <div className="flex flex-wrap gap-1">
                      {role.permissions.map((permission, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {permission}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline">
                      <Copy className="h-3 w-3 mr-1" />
                      Duplicate
                    </Button>
                    <Button size="sm" variant="outline">
                      <Eye className="h-3 w-3 mr-1" />
                      View Users
                    </Button>
                    <Button size="sm" variant="outline">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Permission Editor */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Permission Editor</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedRole ? (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">
                      {roles.find(r => r.id === selectedRole)?.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Configure permissions for this role
                    </p>
                  </div>

                  <div className="space-y-3">
                    {allPermissions.map((permission) => (
                      <div key={permission.id} className="flex items-start space-x-3">
                        <Checkbox 
                          id={permission.id}
                          checked={roles.find(r => r.id === selectedRole)?.permissions.some(p => 
                            p.toLowerCase().includes(permission.name.toLowerCase().split(' ')[0])
                          )}
                        />
                        <div className="flex-1">
                          <label htmlFor={permission.id} className="text-sm font-medium cursor-pointer">
                            {permission.name}
                          </label>
                          <p className="text-xs text-gray-500">{permission.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t">
                    <Button className="w-full">
                      Save Changes
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  <Shield className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>Select a role to edit permissions</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-16 flex-col gap-2">
              <Shield className="h-5 w-5" />
              <span className="text-sm">Create Role</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col gap-2">
              <Copy className="h-5 w-5" />
              <span className="text-sm">Import Roles</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col gap-2">
              <Users className="h-5 w-5" />
              <span className="text-sm">Bulk Assign</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col gap-2">
              <Eye className="h-5 w-5" />
              <span className="text-sm">Permission Report</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
