
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, ShoppingCart, Package, Eye, Plus } from "lucide-react";
import { useState } from "react";

export function EndlessAisle() {
  const [searchQuery, setSearchQuery] = useState("");
  
  const products = [
    {
      sku: "SKU-001",
      name: "Samsung 55' QLED TV",
      brand: "Samsung",
      category: "TV",
      price: 65000,
      storeStock: 0,
      warehouseStock: 15,
      totalStock: 15,
      image: "/placeholder.svg"
    },
    {
      sku: "SKU-002",
      name: "LG Double Door Refrigerator",
      brand: "LG",
      category: "Refrigerator",
      price: 45000,
      storeStock: 2,
      warehouseStock: 8,
      totalStock: 10,
      image: "/placeholder.svg"
    },
    {
      sku: "SKU-003",
      name: "Sony Wireless Headphones",
      brand: "Sony",
      category: "Audio",
      price: 8500,
      storeStock: 0,
      warehouseStock: 25,
      totalStock: 25,
      image: "/placeholder.svg"
    }
  ];

  const recentOrders = [
    {
      orderId: "EA-2024-001",
      customer: "Rajesh Kumar",
      product: "Samsung 55' QLED TV",
      amount: 65000,
      status: "Processing",
      orderTime: "2024-01-15 11:30:00"
    },
    {
      orderId: "EA-2024-002",
      customer: "Priya Sharma",
      product: "LG Double Door Refrigerator",
      amount: 45000,
      status: "Confirmed",
      orderTime: "2024-01-15 10:15:00"
    }
  ];

  const getStockBadge = (storeStock: number, warehouseStock: number) => {
    if (storeStock > 0) return <Badge className="bg-green-100 text-green-800">In Store</Badge>;
    if (warehouseStock > 0) return <Badge className="bg-blue-100 text-blue-800">Warehouse Only</Badge>;
    return <Badge className="bg-red-100 text-red-800">Out of Stock</Badge>;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmed": return "bg-green-100 text-green-800";
      case "Processing": return "bg-yellow-100 text-yellow-800";
      case "Cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Endless Aisle - Product Catalog</h2>
          <p className="text-gray-600">Browse and order products from warehouse inventory</p>
        </div>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Create Order
        </Button>
      </div>

      {/* Search Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search products by name, brand, or SKU..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Product Catalog */}
        <Card>
          <CardHeader>
            <CardTitle>Available Products</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y max-h-96 overflow-y-auto">
              {filteredProducts.map((product) => (
                <div key={product.sku} className="p-4 hover:bg-gray-50">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Package className="h-8 w-8 text-gray-400" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <h4 className="font-medium text-gray-900">{product.name}</h4>
                        <span className="text-lg font-bold text-blue-600">₹{product.price.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">{product.brand} • {product.category}</span>
                        {getStockBadge(product.storeStock, product.warehouseStock)}
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-xs text-gray-600">
                        <div>Store: {product.storeStock} units</div>
                        <div>Warehouse: {product.warehouseStock} units</div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                      <Button size="sm" disabled={product.totalStock === 0}>
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Order
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Endless Aisle Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Endless Aisle Orders</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {recentOrders.map((order) => (
                <div key={order.orderId} className="p-4 hover:bg-gray-50">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-900">{order.orderId}</h4>
                      <Badge className={getStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                    </div>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div><span className="font-medium">Customer:</span> {order.customer}</div>
                      <div><span className="font-medium">Product:</span> {order.product}</div>
                      <div><span className="font-medium">Amount:</span> ₹{order.amount.toLocaleString()}</div>
                    </div>
                    <p className="text-xs text-gray-500">Ordered: {order.orderTime}</p>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                      <Button size="sm" variant="outline">
                        Track Order
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
