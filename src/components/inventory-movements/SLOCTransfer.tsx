
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { 
  ArrowRightLeft, 
  Plus, 
  Search,
  Eye,
  CheckCircle,
  Clock,
  AlertTriangle
} from "lucide-react";

export function SLOCTransfer() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const transfers = [
    {
      id: "TRF001",
      articleId: "AC001",
      articleName: "Samsung AC 1.5 Ton",
      quantity: 2,
      sourceSloc: "SLOC-001",
      targetSloc: "SLOC-002",
      status: "pending",
      requestedBy: "Store Manager",
      requestDate: "2024-01-24",
      reason: "Stock balancing"
    },
    {
      id: "TRF002", 
      articleId: "TV002",
      articleName: "LG OLED 55 inch",
      quantity: 1,
      sourceSloc: "SLOC-002",
      targetSloc: "SLOC-003",
      status: "approved",
      requestedBy: "Sales Associate",
      requestDate: "2024-01-23",
      reason: "Customer display"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'default';
      case 'pending': return 'secondary';
      case 'rejected': return 'destructive';
      default: return 'outline';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return CheckCircle;
      case 'pending': return Clock;
      case 'rejected': return AlertTriangle;
      default: return Clock;
    }
  };

  return (
    <div className="space-y-6">
      {/* Actions Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search transfers by ID or article..."
            className="pl-10"
          />
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Transfer
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create SLOC Transfer</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="articleId">Article ID</Label>
                  <Input id="articleId" placeholder="Enter article ID" />
                </div>
                <div>
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input id="quantity" type="number" placeholder="0" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="sourceSloc">Source SLOC</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select source" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sloc-001">SLOC-001</SelectItem>
                      <SelectItem value="sloc-002">SLOC-002</SelectItem>
                      <SelectItem value="sloc-003">SLOC-003</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="targetSloc">Target SLOC</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select target" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sloc-001">SLOC-001</SelectItem>
                      <SelectItem value="sloc-002">SLOC-002</SelectItem>
                      <SelectItem value="sloc-003">SLOC-003</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="reason">Transfer Reason</Label>
                <Textarea id="reason" placeholder="Enter reason for transfer..." />
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button onClick={() => setIsCreateDialogOpen(false)} className="flex-1">
                  Create Transfer
                </Button>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Transfer Requests List */}
      <div className="space-y-4">
        {transfers.map((transfer) => {
          const StatusIcon = getStatusIcon(transfer.status);
          return (
            <Card key={transfer.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4 md:p-6">
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                      <h3 className="font-semibold text-lg">{transfer.id}</h3>
                      <Badge variant={getStatusColor(transfer.status)}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {transfer.status}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                      <div>
                        <p className="text-sm text-gray-600">Article: {transfer.articleId}</p>
                        <p className="font-medium">{transfer.articleName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Quantity: {transfer.quantity}</p>
                        <p className="font-medium">{transfer.sourceSloc} → {transfer.targetSloc}</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4 text-sm text-gray-500">
                      <span>Requested by: {transfer.requestedBy}</span>
                      <span>Date: {transfer.requestDate}</span>
                      <span>Reason: {transfer.reason}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                    {transfer.status === 'pending' && (
                      <>
                        <Button size="sm">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Approve
                        </Button>
                        <Button size="sm" variant="destructive">
                          Reject
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
