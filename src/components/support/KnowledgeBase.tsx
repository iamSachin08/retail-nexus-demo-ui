
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BookOpen, Search, Star, ThumbsUp, Eye } from "lucide-react";

interface KnowledgeBaseProps {
  searchQuery: string;
}

export function KnowledgeBase({ searchQuery }: KnowledgeBaseProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Topics", count: 45 },
    { id: "technical", name: "Technical Issues", count: 12 },
    { id: "inventory", name: "Inventory Management", count: 8 },
    { id: "sales", name: "Sales & Billing", count: 10 },
    { id: "staff", name: "Staff Management", count: 6 },
    { id: "returns", name: "Returns & Refunds", count: 5 },
    { id: "setup", name: "System Setup", count: 4 }
  ];

  const articles = [
    {
      id: 1,
      title: "How to Process Customer Returns",
      category: "returns",
      description: "Step-by-step guide to process customer returns and refunds",
      content: "1. Navigate to Returns Management module...",
      views: 234,
      rating: 4.8,
      helpful: 89,
      tags: ["returns", "refunds", "customer-service"],
      lastUpdated: "2024-01-20"
    },
    {
      id: 2,
      title: "POS Terminal Troubleshooting",
      category: "technical",
      description: "Common POS issues and their solutions",
      content: "If your POS terminal is not working properly...",
      views: 189,
      rating: 4.6,
      helpful: 67,
      tags: ["pos", "technical", "troubleshooting"],
      lastUpdated: "2024-01-18"
    },
    {
      id: 3,
      title: "Managing Low Stock Alerts",
      category: "inventory",
      description: "How to set up and manage inventory alerts",
      content: "To set up low stock alerts in your system...",
      views: 156,
      rating: 4.7,
      helpful: 78,
      tags: ["inventory", "alerts", "stock-management"],
      lastUpdated: "2024-01-15"
    },
    {
      id: 4,
      title: "Staff Attendance Tracking",
      category: "staff",
      description: "Complete guide to staff attendance management",
      content: "The staff attendance system allows you to...",
      views: 143,
      rating: 4.5,
      helpful: 65,
      tags: ["staff", "attendance", "management"],
      lastUpdated: "2024-01-12"
    },
    {
      id: 5,
      title: "Setting Up Price Overrides",
      category: "sales",
      description: "How to apply discounts and price overrides",
      content: "Price overrides allow you to adjust product prices...",
      views: 198,
      rating: 4.9,
      helpful: 92,
      tags: ["pricing", "discounts", "sales"],
      lastUpdated: "2024-01-10"
    }
  ];

  const faqs = [
    {
      question: "How do I reset my password?",
      answer: "To reset your password: 1) Click on 'Forgot Password' on the login screen, 2) Enter your registered email address, 3) Check your email for reset link, 4) Follow the instructions to create a new password."
    },
    {
      question: "Why is my inventory not syncing?",
      answer: "Inventory sync issues can occur due to: 1) Network connectivity problems, 2) Server maintenance, 3) Outdated app version. Try refreshing the inventory page or contact technical support."
    },
    {
      question: "How do I add a new staff member?",
      answer: "To add new staff: 1) Go to Staff Management, 2) Click 'Add New Staff', 3) Fill in employee details, 4) Assign roles and permissions, 5) Save and generate login credentials."
    },
    {
      question: "Can I process returns without receipts?",
      answer: "Returns without receipts can be processed with: 1) Customer ID verification, 2) Product serial number lookup, 3) Manager approval for high-value items, 4) Store credit option instead of cash refund."
    }
  ];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Categories Sidebar */}
      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Categories</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "secondary" : "ghost"}
                  className="w-full justify-between"
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <span>{category.name}</span>
                  <Badge variant="outline">{category.count}</Badge>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg">Popular Articles</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-3">
              {articles.slice(0, 3).map((article) => (
                <div key={article.id} className="text-sm">
                  <div className="font-medium line-clamp-2">{article.title}</div>
                  <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                    <Eye className="h-3 w-3" />
                    <span>{article.views} views</span>
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span>{article.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="lg:col-span-3 space-y-6">
        {/* Search Results */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">
            {selectedCategory === "all" ? "All Articles" : categories.find(c => c.id === selectedCategory)?.name}
          </h2>
          <Badge variant="outline">
            {filteredArticles.length} articles
          </Badge>
        </div>

        {/* Articles */}
        <div className="space-y-4">
          {filteredArticles.map((article) => (
            <Card key={article.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <BookOpen className="h-4 w-4 text-blue-600" />
                      <h3 className="font-semibold text-gray-900">{article.title}</h3>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-3">{article.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      {article.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        <span>{article.views} views</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span>{article.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ThumbsUp className="h-3 w-3" />
                        <span>{article.helpful} helpful</span>
                      </div>
                      <span>Updated: {article.lastUpdated}</span>
                    </div>
                  </div>
                  
                  <Button size="sm">
                    Read Article
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQs Section */}
        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        {filteredArticles.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Articles Found</h3>
              <p className="text-gray-500">No articles match your search criteria. Try different keywords or browse categories.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
