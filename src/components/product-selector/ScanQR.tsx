import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { QrCode, Search, AlertCircle, Loader2, Camera, X, Check } from "lucide-react";
import { ProductDetails } from "./ProductDetails";

// Mock product data - would come from API in production
const MOCK_PRODUCTS = [
  {
    id: "tv1",
    name: "Samsung Crystal 4K Pro 55-inch Smart TV",
    brand: "Samsung",
    category: "tv",
    image: "https://via.placeholder.com/400x300?text=Samsung+TV",
    price: 52990,
    discountedPrice: 47990,
    specs: {
      size: "55 inches",
      resolution: "4K Ultra HD (3840x2160)",
      displayType: "LED",
      refreshRate: "60Hz",
      hdmiPorts: 3,
      usbPorts: 2,
      smartFeatures: "Tizen OS, Voice Assistant, Screen Mirroring",
    },
    stock: 12,
    offers: [
      { type: "bank", description: "10% off with HDFC Credit Card", value: "10%" },
      { type: "brand", description: "Free Soundbar worth ₹5,999", value: "Bundled" },
    ],
    emi: "EMI starting ₹2,333/month",
    rating: 4.5,
    articleCode: "SAM55CRY4K",
    ean: "8806090618123",
  },
  {
    id: "mob1",
    name: "iPhone 15 Pro 256GB Deep Blue",
    brand: "Apple",
    category: "mob",
    image: "https://via.placeholder.com/400x300?text=iPhone+15+Pro",
    price: 129900,
    discountedPrice: 119900,
    specs: {
      display: "6.1 inches Super Retina XDR",
      processor: "A17 Pro chip",
      camera: "48MP main, 12MP ultra wide, 12MP telephoto",
      storage: "256GB",
      battery: "Up to 23 hours video playback",
      os: "iOS 17",
    },
    stock: 5,
    offers: [
      { type: "bank", description: "₹5,000 Instant Discount with HDFC Cards", value: "₹5,000" },
      { type: "store", description: "Free AirPods with purchase", value: "Bundled" },
    ],
    emi: "EMI starting ₹5,833/month",
    rating: 4.8,
    articleCode: "APL15PRO256BLU",
    ean: "194253184775",
  },
];

export function ScanQR() {
  const [mode, setMode] = useState<"scan" | "manual">("manual");
  const [articleCode, setArticleCode] = useState("");
  const [pincode, setPincode] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState<any>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Clean up camera stream when component unmounts
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const startScanner = async () => {
    setError("");
    setIsScanning(true);
    
    try {
      // Request camera access
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }
      });
      
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        
        // Start scanning for QR codes
        scanQRCode();
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      setError("Could not access camera. Please check permissions or try article code entry.");
      setIsScanning(false);
    }
  };

  const stopScanner = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsScanning(false);
  };

  const scanQRCode = () => {
    if (!videoRef.current || !canvasRef.current || !isScanning) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    if (!context || video.readyState !== video.HAVE_ENOUGH_DATA) {
      // If video is not ready yet, try again in 100ms
      setTimeout(scanQRCode, 100);
      return;
    }

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Draw current video frame to canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // In a real app, you'd use a QR code scanning library here
    // For this example, we'll simulate finding a QR code after a delay
    setTimeout(() => {
      if (isScanning) {
        // Simulate finding a QR code with an article code
        const simulatedArticleCode = "SAM55CRY4K"; // This matches our mock data
        setArticleCode(simulatedArticleCode);
        lookupProduct(simulatedArticleCode);
        stopScanner();
      }
    }, 3000);
  };

  const handleManualSearch = () => {
    if (articleCode.trim()) {
      lookupProduct(articleCode.trim());
    } else {
      setError("Please enter an article code or EAN number");
    }
  };

  const lookupProduct = (code: string) => {
    setLoading(true);
    setError("");
    
    // In a real app, this would be an API call
    setTimeout(() => {
      // Find product by article code or EAN
      const foundProduct = MOCK_PRODUCTS.find(
        p => p.articleCode.toLowerCase() === code.toLowerCase() || 
             p.ean === code
      );
      
      if (foundProduct) {
        setProduct(foundProduct);
      } else {
        setError(`No product found with article code or EAN: ${code}`);
      }
      
      setLoading(false);
    }, 1500);
  };

  const resetSearch = () => {
    setArticleCode("");
    setProduct(null);
    setError("");
    stopScanner();
  };

  // If a product is found, show its details
  if (product) {
    return (
      <div>
        <Button 
          variant="outline" 
          onClick={resetSearch} 
          className="mb-4"
        >
          <X className="mr-2 h-4 w-4" /> New Search
        </Button>
        <ProductDetails product={product} pincode={pincode} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Pincode Entry */}
      <Card>
        <CardHeader>
          <CardTitle>Enter Delivery Pincode</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600">
            Please enter your pincode to check product availability and delivery options.
          </p>
          <div className="flex gap-4">
            <Input
              placeholder="Enter 6-digit pincode"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              maxLength={6}
              className="max-w-xs"
            />
          </div>
        </CardContent>
      </Card>

      {/* Scan/Manual Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>Scan QR or Enter Article Code</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={mode} onValueChange={(v) => setMode(v as "scan" | "manual")} className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="scan">Scan QR Code</TabsTrigger>
              <TabsTrigger value="manual">Enter Article Code</TabsTrigger>
            </TabsList>
            
            <TabsContent value="scan">
              <div className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                
                {isScanning ? (
                  <div className="space-y-4">
                    <div className="relative aspect-video max-w-md mx-auto border-2 border-dashed border-gray-300 rounded-lg overflow-hidden">
                      <video 
                        ref={videoRef} 
                        className="absolute inset-0 w-full h-full object-cover"
                        playsInline
                      />
                      <canvas 
                        ref={canvasRef} 
                        className="absolute inset-0 w-full h-full hidden"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-48 h-48 border-4 border-blue-500 rounded-lg opacity-50"></div>
                      </div>
                    </div>
                    <p className="text-center text-gray-600">Position the QR code within the frame</p>
                    <Button variant="outline" onClick={stopScanner} className="w-full">
                      <X className="mr-2 h-4 w-4" /> Cancel Scan
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Camera className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <p className="mb-4">Scan the QR code on the product tag</p>
                    <Button onClick={startScanner}>
                      <QrCode className="mr-2 h-4 w-4" /> Start Camera
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="manual">
              <div className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                
                <div className="space-y-2">
                  <p className="text-gray-600 mb-2">
                    Enter the article code or EAN number from the product tag
                  </p>
                  <div className="flex gap-2">
                    <Input
                      placeholder="e.g., SAM55CRY4K or 8806090618123"
                      value={articleCode}
                      onChange={(e) => setArticleCode(e.target.value)}
                      className="flex-1"
                    />
                    <Button onClick={handleManualSearch} disabled={loading || !articleCode.trim()}>
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Searching
                        </>
                      ) : (
                        <>
                          <Search className="mr-2 h-4 w-4" /> Search
                        </>
                      )}
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500">
                    Hint: Try "SAM55CRY4K" for a sample TV or "APL15PRO256BLU" for a sample phone
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
