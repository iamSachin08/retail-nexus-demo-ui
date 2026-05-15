import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Users, 
  Edit, 
  Trash2, 
  Lock,
  Unlock,
  Mail,
  Phone,
  MapPin
} from "lucide-react";

interface UserManagementProps {
  searchQuery: string;
}

export function UserManagement({ searchQuery }: UserManagementProps) {
  const users = [
    {
      id: "U001",
      name: "Rajesh Kumar",
      email: "rajesh.kumar@store.com",
      phone: "+91 98765 43210",
      role: "Store Manager",
      store: "Phoenix MarketCity",
      status: "Active",
      lastLogin: "2024-01-15 09:30 AM",
      permissions: ["Full Access"]
    },
    {
      id: "U002",
      name: "Priya Sharma",
      email: "priya.sharma@store.com",
      phone: "+91 98765 43211",
      role: "Sales Associate", 
      store: "Select City Walk",
      status: "Active",
      lastLogin: "2024-01-15 10:15 AM",
      permissions: ["Sales", "Inventory View"]
    },
    {
      id: "U003",
      name: "Amit Singh",
      email: "amit.singh@store.com",
      phone: "+91 98765 43212",
      role: "Inventory Manager",
      store: "DLF Mall of India",
      status: "Inactive",
      lastLogin: "2024-01-12 03:45 PM",
      permissions: ["Inventory", "Local Procurement"]
    },
    {
      id: "U004",
      name: "Sneha Patel",
      email: "sneha.patel@store.com",
      phone: "+91 98765 43213",
      role: "Customer Service",
      store: "Phoenix MarketCity",
      status: "Active",
      lastLogin: "2024-01-15 11:20 AM",
      permissions: ["Customer Support", "Returns"]
    }
  ];

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    return status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800";
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Store Manager": return "bg-purple-100 text-purple-800";
      case "Sales Associate": return "bg-blue-100 text-blue-800";
      case "Inventory Manager": return "bg-orange-100 text-orange-800";
      case "Customer Service": return "bg-teal-100 text-teal-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* User List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredUsers.map((user) => (
          <Card key={user.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} />
                    <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-lg">{user.name}</h3>
                    <p className="text-sm text-gray-600">{user.id}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Badge className={getStatusColor(user.status)}>
                    {user.status}
                  </Badge>
                  <Badge className={getRoleColor(user.role)}>
                    {user.role}
                  </Badge>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span>{user.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span>{user.store}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm text-gray-600">Last Login:</span>
                  <span className="text-sm font-medium">{user.lastLogin}</span>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Permissions:</p>
                  <div className="flex flex-wrap gap-1">
                    {user.permissions.map((permission, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {permission}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                  <Button size="sm" variant="outline">
                    {user.status === "Active" ? <Lock className="h-3 w-3" /> : <Unlock className="h-3 w-3" />}
                  </Button>
                  <Button size="sm" variant="outline">
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Users className="h-6 w-6" />
              <span className="text-sm">Bulk User Import</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Lock className="h-6 w-6" />
              <span className="text-sm">Reset Passwords</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Mail className="h-6 w-6" />
              <span className="text-sm">Send Invites</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
