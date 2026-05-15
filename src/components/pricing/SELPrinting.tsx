
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Printer, Eye, Download, Settings, Package, AlertCircle } from "lucide-react";

interface SELPrintingProps {
  searchQuery: string;
}

export function SELPrinting({ searchQuery }: SELPrintingProps) {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [selectedFormat, setSelectedFormat] = useState("standard");
  const [selectedPrinter, setSelectedPrinter] = useState("printer1");

  const products = [
    {
      sku: "SKU-2024-001",
      name: "Samsung Galaxy S24 Ultra",
      barcode: "8901030891234",
      currentPrice: "₹1,29,900",
      discountPrice: "₹1,19,900",
      category: "Smartphones",
      brand: "Samsung",
      lastPrinted: "2024-01-20",
      status: "Active",
      needsReprint: false
    },
    {
      sku: "SKU-2024-002", 
      name: "iPhone 15 Pro",
      barcode: "1234567890123",
      currentPrice: "₹1,34,900",
      discountPrice: null,
      category: "Smartphones",
      brand: "Apple",
      lastPrinted: "2024-01-18",
      status: "Active",
      needsReprint: true
    },
    {
      sku: "SKU-2024-003",
      name: "Sony 65\" 4K OLED TV",
      barcode: "4901771234567",
      currentPrice: "₹1,99,900",
      discountPrice: "₹1,79,900",
      category: "Television",
      brand: "Sony",
      lastPrinted: "2024-01-15",
      status: "Active",
      needsReprint: false
    },
    {
      sku: "SKU-2024-004",
      name: "Dell XPS 13 Laptop",
      barcode: "1234123412341",
      currentPrice: "₹89,900",
      discountPrice: null,
      category: "Laptops",
      brand: "Dell",
      lastPrinted: "Never",
      status: "New",
      needsReprint: true
    }
  ];

  const printers = [
    { id: "printer1", name: "SEL Printer 1", location: "Electronics Section", status: "Online" },
    { id: "printer2", name: "SEL Printer 2", location: "Mobile Section", status: "Online" },
    { id: "printer3", name: "SEL Printer 3", location: "Home Appliances", status: "Offline" }
  ];

  const formats = [
    { id: "standard", name: "Standard SEL", size: "2x1 inch" },
    { id: "large", name: "Large SEL", size: "3x2 inch" },
    { id: "promo", name: "Promotional SEL", size: "2x1.5 inch" },
    { id: "barcode", name: "Barcode Only", size: "1x0.5 inch" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800";
      case "New": return "bg-blue-100 text-blue-800";
      case "Discontinued": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPrinterStatusColor = (status: string) => {
    switch (status) {
      case "Online": return "bg-green-100 text-green-800";
      case "Offline": return "bg-red-100 text-red-800";
      case "Busy": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredProducts = products.filter(product => 
    product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.barcode.includes(searchQuery) ||
    product.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(filteredProducts.map(product => product.sku));
    } else {
      setSelectedItems([]);
    }
  };

  const handleItemSelect = (sku: string, checked: boolean) => {
    if (checked) {
      setSelectedItems(prev => [...prev, sku]);
    } else {
      setSelectedItems(prev => prev.filter(item => item !== sku));
    }
  };

  const handleBulkPrint = () => {
    // Simulate printing
    console.log('Printing SEL labels for:', selectedItems);
    setSelectedItems([]);
  };

  return (
    <div className="space-y-4">
      {/* Bulk Actions */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="flex items-center gap-3">
              <Checkbox
                checked={selectedItems.length === filteredProducts.length && filteredProducts.length > 0}
                onCheckedChange={handleSelectAll}
              />
              <span className="text-sm font-medium">
                {selectedItems.length > 0 ? `${selectedItems.length} selected` : 'Select All'}
              </span>
            </div>
            
            {selectedItems.length > 0 && (
              <div className="flex flex-col sm:flex-row gap-3 flex-1">
                <Select value={selectedFormat} onValueChange={setSelectedFormat}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Select Format" />
                  </SelectTrigger>
                  <SelectContent>
                    {formats.map((format) => (
                      <SelectItem key={format.id} value={format.id}>
                        {format.name} ({format.size})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={selectedPrinter} onValueChange={setSelectedPrinter}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Select Printer" />
                  </SelectTrigger>
                  <SelectContent>
                    {printers.map((printer) => (
                      <SelectItem 
                        key={printer.id} 
                        value={printer.id}
                        disabled={printer.status === "Offline"}
                      >
                        {printer.name} - {printer.location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Button onClick={handleBulkPrint}>
                  <Printer className="h-4 w-4 mr-2" />
                  Print Selected ({selectedItems.length})
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Product List */}
      {filteredProducts.map((product) => (
        <Card key={product.sku} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Checkbox
                checked={selectedItems.includes(product.sku)}
                onCheckedChange={(checked) => handleItemSelect(product.sku, checked as boolean)}
              />
              
              <div className="flex-1 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-full">
                      <Package className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{product.name}</h3>
                      <p className="text-sm text-gray-600">{product.sku} • {product.brand}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(product.status)}>
                      {product.status}
                    </Badge>
                    {product.needsReprint && (
                      <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-300">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        Needs Reprint
                      </Badge>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Barcode:</span>
                    <div className="font-medium">{product.barcode}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Current Price:</span>
                    <div className="font-medium">{product.currentPrice}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Discount Price:</span>
                    <div className="font-medium">
                      {product.discountPrice ? (
                        <span className="text-red-600">{product.discountPrice}</span>
                      ) : (
                        <span className="text-gray-400">None</span>
                      )}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600">Last Printed:</span>
                    <div className="font-medium">{product.lastPrinted}</div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>SEL Preview - {product.name}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="border-2 border-dashed border-gray-300 p-6 text-center bg-white">
                        <div className="space-y-2">
                          <div className="text-xs text-gray-600">{product.category}</div>
                          <div className="font-bold text-lg">{product.name}</div>
                          <div className="text-sm text-gray-600">{product.brand}</div>
                          <div className="text-2xl font-bold text-green-600">
                            {product.discountPrice || product.currentPrice}
                          </div>
                          {product.discountPrice && (
                            <div className="text-sm text-gray-500 line-through">
                              {product.currentPrice}
                            </div>
                          )}
                          <div className="text-xs font-mono bg-gray-100 p-1 rounded">
                            {product.barcode}
                          </div>
                          <div className="text-xs text-gray-600">{product.sku}</div>
                        </div>
                      </div>
                      <div className="text-center text-sm text-gray-600">
                        Preview for Standard SEL format (2x1 inch)
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                
                <Button size="sm">
                  <Printer className="h-4 w-4 mr-2" />
                  Print
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      
      {filteredProducts.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Products Found</h3>
            <p className="text-gray-500">No products match your search criteria.</p>
          </CardContent>
        </Card>
      )}

      {/* Printer Status */}
      <Card>
        <CardContent className="p-4">
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Printer Status
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {printers.map((printer) => (
              <div key={printer.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-sm">{printer.name}</div>
                  <div className="text-xs text-gray-600">{printer.location}</div>
                </div>
                <Badge className={getPrinterStatusColor(printer.status)}>
                  {printer.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
