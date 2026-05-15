import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Check, AlertTriangle, Info, ShoppingCart, CreditCard, Truck, Calendar } from "lucide-react";

interface ProductDetailsProps {
  product: any; // In a real app, this would be a proper type
  pincode: string;
}

export function ProductDetails({ product, pincode }: ProductDetailsProps) {
  const [tab, setTab] = useState("specs");
  const [deliveryDate, setDeliveryDate] = useState<string>(() => {
    // Calculate a delivery date 3-5 days from now
    const date = new Date();
    date.setDate(date.getDate() + Math.floor(Math.random() * 3) + 3);
    return date.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
  });

  const [installationDate, setInstallationDate] = useState<string>(() => {
    // Calculate an installation date 1-2 days after delivery
    const date = new Date();
    date.setDate(date.getDate() + Math.floor(Math.random() * 3) + 4);
    return date.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
  });

  const renderStarRating = (rating: number) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
            }`}
          />
        ))}
        <span className="ml-2 text-sm font-medium">{rating.toFixed(1)}</span>
      </div>
    );
  };

  const getBestOffer = () => {
    if (!product.offers || product.offers.length === 0) return null;
    
    // In a real app, you'd have logic to determine the best offer
    return product.offers[0];
  };

  const bestOffer = getBestOffer();

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="bg-white rounded-lg overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-auto object-contain"
                style={{ maxHeight: "400px" }}
              />
            </div>

            {/* Product Info */}
            <div className="space-y-4">
              <div>
                <h2 className="text-2xl font-bold">{product.name}</h2>
                <div className="flex items-center mt-1">
                  <Badge variant="outline" className="mr-2">
                    {product.brand}
                  </Badge>
                  {renderStarRating(product.rating)}
                </div>
              </div>

              {/* Price Section */}
              <div className="mt-4">
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold">
                    ₹{product.discountedPrice.toLocaleString()}
                  </span>
                  {product.price !== product.discountedPrice && (
                    <span className="ml-2 text-lg text-gray-500 line-through">
                      ₹{product.price.toLocaleString()}
                    </span>
                  )}
                  {product.price !== product.discountedPrice && (
                    <Badge className="ml-2 bg-green-600">
                      {Math.round(((product.price - product.discountedPrice) / product.price) * 100)}% OFF
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-1">Inclusive of all taxes</p>
              </div>

              {/* Best Offer */}
              {bestOffer && (
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mt-4">
                  <div className="flex items-start">
                    <Info className="h-5 w-5 text-orange-500 mt-0.5 mr-2" />
                    <div>
                      <p className="font-medium text-orange-800">Best Offer</p>
                      <p className="text-sm text-orange-700">{bestOffer.description}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* EMI */}
              {product.emi && (
                <div className="mt-4">
                  <div className="flex items-center">
                    <CreditCard className="h-4 w-4 mr-2 text-gray-600" />
                    <span className="text-sm text-gray-700">{product.emi}</span>
                  </div>
                </div>
              )}

              {/* Stock & Delivery */}
              <div className="mt-4 space-y-2">
                {product.stock > 0 ? (
                  <div className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-green-600" />
                    <span className="text-sm text-green-700">In Stock</span>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <AlertTriangle className="h-4 w-4 mr-2 text-red-600" />
                    <span className="text-sm text-red-700">Out of Stock</span>
                  </div>
                )}

                {product.stock > 0 && pincode && (
                  <>
                    <div className="flex items-center">
                      <Truck className="h-4 w-4 mr-2 text-gray-600" />
                      <span className="text-sm text-gray-700">
                        Delivery to {pincode} by {deliveryDate}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-gray-600" />
                      <span className="text-sm text-gray-700">
                        Installation available on {installationDate}
                      </span>
                    </div>
                  </>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-6 grid grid-cols-2 gap-4">
                <Button variant="outline" className="w-full">
                  <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                </Button>
                <Button className="w-full">Buy Now</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Product Details Tabs */}
      <Card>
        <CardContent className="p-6">
          <Tabs value={tab} onValueChange={setTab} className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="specs">Specifications</TabsTrigger>
              <TabsTrigger value="offers">Offers & EMI</TabsTrigger>
              <TabsTrigger value="delivery">Delivery & Installation</TabsTrigger>
            </TabsList>
            
            <TabsContent value="specs">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Technical Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.specs && Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} className="flex justify-between border-b pb-2">
                      <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                      <span className="font-medium">{value as string}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="offers">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Available Offers</h3>
                {product.offers && product.offers.length > 0 ? (
                  <div className="space-y-4">
                    {product.offers.map((offer: any, index: number) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-start">
                          <Badge variant={offer.type === "bank" ? "outline" : "default"} className="mt-0.5 mr-2">
                            {offer.type === "bank" ? "Bank" : offer.type === "brand" ? "Brand" : "Store"}
                          </Badge>
                          <div>
                            <p className="font-medium">{offer.description}</p>
                            {offer.value && <p className="text-sm text-gray-600">Value: {offer.value}</p>}
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {product.emi && (
                      <div className="mt-6">
                        <h3 className="text-lg font-semibold mb-2">EMI Options</h3>
                        <p className="text-gray-700">{product.emi}</p>
                        <p className="text-sm text-gray-600 mt-1">
                          EMI available on major credit cards. Contact store for more details.
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-600">No offers available at this time.</p>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="delivery">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Delivery Information</h3>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-start">
                    <Truck className="h-5 w-5 text-blue-600 mt-0.5 mr-3" />
                    <div>
                      <p className="font-medium">Standard Delivery</p>
                      <p className="text-sm text-gray-600">
                        Estimated delivery to {pincode} by {deliveryDate}
                      </p>
                    </div>
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold mt-6">Installation Service</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 text-green-600 mt-0.5 mr-3" />
                    <div>
                      <p className="font-medium">Professional Installation</p>
                      <p className="text-sm text-gray-600">
                        Installation available on {installationDate}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        Our trained professionals will install and set up your product.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
