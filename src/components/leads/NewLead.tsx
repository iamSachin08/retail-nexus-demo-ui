
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { 
  UserPlus,
  Save,
  Phone,
  Mail,
  MapPin
} from "lucide-react";

export function NewLead() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    category: "",
    brand: "",
    budget: "",
    expectedPurchaseDate: "",
    source: "",
    notes: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("New lead data:", formData);
    toast.success("Lead created successfully!");
    setFormData({
      name: "",
      phone: "",
      email: "",
      address: "",
      category: "",
      brand: "",
      budget: "",
      expectedPurchaseDate: "",
      source: "",
      notes: ""
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserPlus className="h-5 w-5" />
          Add New Lead
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Customer Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter customer name"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 XXXXX XXXXX"
                  className="pl-10"
                  required
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="customer@email.com"
                  className="pl-10"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="address">Address</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Customer address"
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category">Product Category *</Label>
              <Select onValueChange={(value) => setFormData({ ...formData, category: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="television">Television</SelectItem>
                  <SelectItem value="air-conditioner">Air Conditioner</SelectItem>
                  <SelectItem value="washing-machine">Washing Machine</SelectItem>
                  <SelectItem value="refrigerator">Refrigerator</SelectItem>
                  <SelectItem value="mobile-phone">Mobile Phone</SelectItem>
                  <SelectItem value="laptop">Laptop</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="brand">Preferred Brand</Label>
              <Select onValueChange={(value) => setFormData({ ...formData, brand: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select brand" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="samsung">Samsung</SelectItem>
                  <SelectItem value="lg">LG</SelectItem>
                  <SelectItem value="sony">Sony</SelectItem>
                  <SelectItem value="whirlpool">Whirlpool</SelectItem>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="budget">Budget Range</Label>
              <Select onValueChange={(value) => setFormData({ ...formData, budget: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select budget range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="under-25k">Under ₹25,000</SelectItem>
                  <SelectItem value="25k-50k">₹25,000 - ₹50,000</SelectItem>
                  <SelectItem value="50k-1l">₹50,000 - ₹1,00,000</SelectItem>
                  <SelectItem value="1l-2l">₹1,00,000 - ₹2,00,000</SelectItem>
                  <SelectItem value="above-2l">Above ₹2,00,000</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="expectedDate">Expected Purchase Date</Label>
              <Input
                id="expectedDate"
                type="date"
                value={formData.expectedPurchaseDate}
                onChange={(e) => setFormData({ ...formData, expectedPurchaseDate: e.target.value })}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="source">Lead Source</Label>
            <Select onValueChange={(value) => setFormData({ ...formData, source: value })}>
              <SelectTrigger>
                <SelectValue placeholder="How did the customer find us?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="walk-in">Walk-in</SelectItem>
                <SelectItem value="referral">Referral</SelectItem>
                <SelectItem value="online-search">Online Search</SelectItem>
                <SelectItem value="social-media">Social Media</SelectItem>
                <SelectItem value="advertisement">Advertisement</SelectItem>
                <SelectItem value="exhibition">Exhibition/Event</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Any additional information about the customer or their requirements..."
              rows={3}
            />
          </div>

          <Button type="submit" className="w-full">
            <Save className="h-4 w-4 mr-2" />
            Create Lead
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
