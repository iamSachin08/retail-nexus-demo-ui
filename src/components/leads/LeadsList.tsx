
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Phone,
  Mail,
  Calendar,
  DollarSign,
  User,
  CheckCircle,
  XCircle,
  Clock
} from "lucide-react";

interface LeadsListProps {
  searchQuery: string;
}

export function LeadsList({ searchQuery }: LeadsListProps) {
  const leads = [
    {
      id: "LD001",
      name: "Rajesh Kumar",
      phone: "+91 98765 43210",
      email: "rajesh@email.com",
      category: "Television",
      brand: "Samsung",
      budget: "₹50,000 - ₹1,00,000",
      expectedDate: "2024-02-15",
      source: "Walk-in",
      status: "new",
      createdDate: "2024-01-24",
      notes: "Looking for 55 inch smart TV with good sound quality"
    },
    {
      id: "LD002",
      name: "Priya Sharma",
      phone: "+91 87654 32109",
      email: "priya.sharma@email.com",
      category: "Air Conditioner",
      brand: "LG",
      budget: "₹25,000 - ₹50,000",
      expectedDate: "2024-01-30",
      source: "Referral",
      status: "contacted",
      createdDate: "2024-01-23",
      notes: "Needs 1.5 ton AC for bedroom, energy efficient preferred"
    },
    {
      id: "LD003",
      name: "Amit Patel",
      phone: "+91 76543 21098",
      email: "",
      category: "Washing Machine",
      brand: "Whirlpool",
      budget: "Under ₹25,000",
      expectedDate: "2024-02-01",
      source: "Online Search",
      status: "converted",
      createdDate: "2024-01-20",
      notes: "Front load washing machine for small family"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'default';
      case 'contacted': return 'secondary';
      case 'converted': return 'default';
      case 'lost': return 'destructive';
      default: return 'outline';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new': return Clock;
      case 'contacted': return Phone;
      case 'converted': return CheckCircle;
      case 'lost': return XCircle;
      default: return Clock;
    }
  };

  const filteredLeads = leads.filter(lead =>
    lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.phone.includes(searchQuery) ||
    lead.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {filteredLeads.map((lead) => {
        const StatusIcon = getStatusIcon(lead.status);
        return (
          <Card key={lead.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 md:p-6">
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
                    <h3 className="font-semibold text-lg">{lead.id}</h3>
                    <Badge variant={getStatusColor(lead.status)}>
                      <StatusIcon className="h-3 w-3 mr-1" />
                      {lead.status}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <div>
                      <p className="text-sm text-gray-600">Customer</p>
                      <p className="font-medium">{lead.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Phone className="h-3 w-3 text-gray-400" />
                        <span className="text-sm text-gray-600">{lead.phone}</span>
                      </div>
                      {lead.email && (
                        <div className="flex items-center gap-2 mt-1">
                          <Mail className="h-3 w-3 text-gray-400" />
                          <span className="text-sm text-gray-600">{lead.email}</span>
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Product Interest</p>
                      <p className="font-medium">{lead.category}</p>
                      <p className="text-sm text-gray-500">Brand: {lead.brand}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3 p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-blue-600" />
                      <div>
                        <p className="text-xs text-gray-600">Budget</p>
                        <p className="font-medium text-sm">{lead.budget}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-blue-600" />
                      <div>
                        <p className="text-xs text-gray-600">Expected Date</p>
                        <p className="font-medium text-sm">{lead.expectedDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-blue-600" />
                      <div>
                        <p className="text-xs text-gray-600">Source</p>
                        <p className="font-medium text-sm">{lead.source}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-600 mb-2">
                    <strong>Notes:</strong> {lead.notes}
                  </div>
                  
                  <div className="text-xs text-gray-500">
                    Created: {lead.createdDate}
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button size="sm" variant="outline">
                    <Phone className="h-4 w-4 mr-2" />
                    Call
                  </Button>
                  {lead.status === 'new' && (
                    <Button size="sm">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Convert
                    </Button>
                  )}
                  {lead.status === 'contacted' && (
                    <Button size="sm" variant="secondary">
                      Follow Up
                    </Button>
                  )}
                  <Button size="sm" variant="outline">
                    Edit
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
