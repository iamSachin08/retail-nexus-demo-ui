import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, Check, RefreshCw } from "lucide-react";
import { ProductDetails } from "./ProductDetails";

// Mock data - would come from API in production
const CATEGORIES = [
  { id: "tv", name: "Televisions" },
  { id: "ac", name: "Air Conditioners" },
  { id: "ref", name: "Refrigerators" },
  { id: "wm", name: "Washing Machines" },
  { id: "mob", name: "Mobile Phones" },
  { id: "lap", name: "Laptops" },
];

// Mock questions - would come from API based on category
const QUESTIONS = {
  tv: [
    {
      id: "q1",
      text: "What size TV are you looking for?",
      options: [
        { id: "32", label: "32 inches (Small Room)" },
        { id: "43", label: "43 inches (Medium Room)" },
        { id: "55", label: "55 inches (Large Room)" },
        { id: "65+", label: "65+ inches (Home Theater)" },
      ],
    },
    {
      id: "q2",
      text: "What type of content do you watch most?",
      options: [
        { id: "movies", label: "Movies & TV Shows" },
        { id: "sports", label: "Sports" },
        { id: "gaming", label: "Gaming" },
        { id: "mixed", label: "Mixed Usage" },
      ],
    },
    {
      id: "q3",
      text: "What is your preferred display technology?",
      options: [
        { id: "led", label: "LED (Budget Friendly)" },
        { id: "qled", label: "QLED (Better Colors)" },
        { id: "oled", label: "OLED (Premium Experience)" },
        { id: "any", label: "No Preference" },
      ],
    },
    {
      id: "q4",
      text: "What is your budget range?",
      options: [
        { id: "budget", label: "₹15,000 - ₹30,000" },
        { id: "mid", label: "₹30,000 - ₹60,000" },
        { id: "premium", label: "₹60,000 - ₹1,00,000" },
        { id: "luxury", label: "Above ₹1,00,000" },
      ],
    },
  ],
  // Other categories would have their own questions
};

// Mock product data - would come from API based on answers
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
    tags: ["55", "movies", "led", "mid"],
    rating: 4.5,
  },
  {
    id: "tv2",
    name: "Sony Bravia X80K 65-inch 4K Smart TV",
    brand: "Sony",
    category: "tv",
    image: "https://via.placeholder.com/400x300?text=Sony+TV",
    price: 119990,
    discountedPrice: 94990,
    specs: {
      size: "65 inches",
      resolution: "4K Ultra HD (3840x2160)",
      displayType: "LED",
      refreshRate: "120Hz",
      hdmiPorts: 4,
      usbPorts: 2,
      smartFeatures: "Google TV, Voice Search, Chromecast built-in",
    },
    stock: 5,
    offers: [
      { type: "bank", description: "₹5,000 Instant Discount with SBI Cards", value: "₹5,000" },
      { type: "brand", description: "5 Year Warranty", value: "Extended Warranty" },
    ],
    emi: "EMI starting ₹4,583/month",
    tags: ["65+", "movies", "led", "premium"],
    rating: 4.7,
  },
  {
    id: "tv3",
    name: "LG C2 55-inch 4K OLED Smart TV",
    brand: "LG",
    category: "tv",
    image: "https://via.placeholder.com/400x300?text=LG+OLED+TV",
    price: 139990,
    discountedPrice: 119990,
    specs: {
      size: "55 inches",
      resolution: "4K Ultra HD (3840x2160)",
      displayType: "OLED",
      refreshRate: "120Hz",
      hdmiPorts: 4,
      usbPorts: 3,
      smartFeatures: "webOS, ThinQ AI, Magic Remote",
    },
    stock: 3,
    offers: [
      { type: "bank", description: "Up to ₹10,000 Cashback with AMEX", value: "₹10,000" },
      { type: "store", description: "Free Installation & Demo", value: "Free Service" },
    ],
    emi: "EMI starting ₹5,833/month",
    tags: ["55", "gaming", "oled", "premium"],
    rating: 4.9,
  },
];

export function FindMyFit() {
  const [step, setStep] = useState("category"); // category -> pincode -> questions -> results
  const [category, setCategory] = useState("");
  const [pincode, setPincode] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [recommendedProducts, setRecommendedProducts] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const questions = category ? QUESTIONS[category as keyof typeof QUESTIONS] || [] : [];
  const currentQuestion = questions[currentQuestionIndex];
  const progress = step === "questions" 
    ? Math.round(((currentQuestionIndex + 1) / questions.length) * 100) 
    : step === "results" ? 100 : 0;

  // Reset answers when category changes
  useEffect(() => {
    setAnswers({});
    setCurrentQuestionIndex(0);
  }, [category]);

  const handleCategorySelect = (value: string) => {
    setCategory(value);
    setStep("pincode");
  };

  const handlePincodeSubmit = () => {
    if (pincode.length === 6 && !isNaN(Number(pincode))) {
      setStep("questions");
    }
  };

  const handleAnswerSelect = (questionId: string, answerId: string) => {
    setAnswers({
      ...answers,
      [questionId]: answerId,
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Last question answered, find recommendations
      findRecommendations();
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else {
      setStep("pincode");
    }
  };

  const findRecommendations = () => {
    setLoading(true);
    
    // In a real app, this would be an API call with the answers
    setTimeout(() => {
      // Simple mock recommendation logic based on tags matching
      const answerValues = Object.values(answers);
      
      const filteredProducts = MOCK_PRODUCTS.filter(product => {
        // Match products where at least 2 tags match the answers
        const matchingTags = product.tags.filter(tag => answerValues.includes(tag));
        return matchingTags.length >= 2;
      });
      
      setRecommendedProducts(filteredProducts.length > 0 ? filteredProducts : MOCK_PRODUCTS);
      setStep("results");
      setLoading(false);
    }, 1500);
  };

  const resetFlow = () => {
    setStep("category");
    setCategory("");
    setPincode("");
    setCurrentQuestionIndex(0);
    setAnswers({});
    setRecommendedProducts([]);
    setSelectedProduct(null);
  };

  // If a product is selected, show its details
  if (selectedProduct) {
    return (
      <div>
        <Button 
          variant="outline" 
          onClick={() => setSelectedProduct(null)} 
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Results
        </Button>
        <ProductDetails product={selectedProduct} pincode={pincode} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress indicator for questions */}
      {(step === "questions" || step === "results") && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
            <span>{progress}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      )}

      {/* Step 1: Category Selection */}
      {step === "category" && (
        <Card>
          <CardHeader>
            <CardTitle>Select Product Category</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">
              Choose a product category to start the guided recommendation process.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {CATEGORIES.map((cat) => (
                <Button
                  key={cat.id}
                  variant={category === cat.id ? "default" : "outline"}
                  className="h-24 flex flex-col items-center justify-center"
                  onClick={() => handleCategorySelect(cat.id)}
                >
                  <span className="text-lg">{cat.name}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Pincode Entry */}
      {step === "pincode" && (
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
              <Button onClick={handlePincodeSubmit} disabled={pincode.length !== 6 || isNaN(Number(pincode))}>
                Continue
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={resetFlow}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* Step 3: Questions */}
      {step === "questions" && currentQuestion && (
        <Card>
          <CardHeader>
            <CardTitle>{currentQuestion.text}</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={answers[currentQuestion.id] || ""}
              onValueChange={(value) => handleAnswerSelect(currentQuestion.id, value)}
              className="space-y-3"
            >
              {currentQuestion.options.map((option) => (
                <div key={option.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.id} id={option.id} />
                  <Label htmlFor={option.id} className="text-base">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handlePrevQuestion}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            <Button
              onClick={handleNextQuestion}
              disabled={!answers[currentQuestion.id]}
            >
              {currentQuestionIndex < questions.length - 1 ? (
                <>
                  Next <ArrowRight className="ml-2 h-4 w-4" />
                </>
              ) : (
                <>
                  Find Products <Check className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* Step 4: Results */}
      {step === "results" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recommended Products</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <RefreshCw className="h-8 w-8 animate-spin text-blue-600" />
                  <span className="ml-2 text-lg">Finding the best products for you...</span>
                </div>
              ) : recommendedProducts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recommendedProducts.map((product) => (
                    <Card key={product.id} className="overflow-hidden">
                      <div className="aspect-video overflow-hidden bg-gray-100">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold truncate">{product.name}</h3>
                        <div className="flex items-center justify-between mt-2">
                          <div>
                            <p className="text-lg font-bold">₹{product.discountedPrice.toLocaleString()}</p>
                            {product.price !== product.discountedPrice && (
                              <p className="text-sm text-gray-500 line-through">₹{product.price.toLocaleString()}</p>
                            )}
                          </div>
                          <Badge variant={product.stock > 0 ? "default" : "destructive"}>
                            {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                          </Badge>
                        </div>
                        <Button 
                          className="w-full mt-4" 
                          onClick={() => setSelectedProduct(product)}
                        >
                          View Details
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-lg">No products match your criteria. Please try different options.</p>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button variant="outline" onClick={resetFlow} className="w-full">
                Start Over
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
}
