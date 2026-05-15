import { Bell, Search, User, Store, MapPin, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";

export function DashboardHeader() {
  const isMobile = useIsMobile();

  return (
    <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
          <SidebarTrigger />
          <div className="flex items-center gap-2 min-w-0">
            <img src="/logo.png" alt="Logo" className="h-6 w-6 sm:h-7 sm:w-7 object-contain flex-shrink-0" />
            <div className="min-w-0">
              <h1 className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                {isMobile ? "Phoenix Mall" : "Phoenix Mall Store"}
              </h1>
              <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-500">
                <MapPin className="h-3 w-3 flex-shrink-0" />
                <span className="truncate">{isMobile ? "Pune" : "Pune, Maharashtra"}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-4">
          {!isMobile && (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search products, orders, customers..."
                className="pl-10 w-80"
              />
            </div>
          )}
          
          {isMobile && (
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
          )}
          
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 h-4 w-4 sm:h-5 sm:w-5 p-0 flex items-center justify-center bg-red-500 text-xs">
              3
            </Badge>
          </Button>
          
          {!isMobile ? (
            <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg">
              <User className="h-5 w-5 text-gray-600" />
              <div className="text-sm">
                <div className="font-medium">Rahul Sharma</div>
                <div className="text-gray-500">Store Manager</div>
              </div>
            </div>
          ) : (
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
      
      {isMobile && (
        <div className="mt-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search..."
              className="pl-10 w-full"
            />
          </div>
        </div>
      )}
    </header>
  );
}
