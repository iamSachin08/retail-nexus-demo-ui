import { 
  BarChart3, 
  Package, 
  ShoppingCart, 
  Truck, 
  Users, 
  Wrench, 
  RotateCcw, 
  CreditCard, 
  MessageCircle, 
  UserCircle, 
  Tag, 
  FileText, 
  Megaphone,
  Settings,
  Home,
  Layout,
  Eye,
  ShoppingBag,
  CheckSquare,
  Headphones,
  Wallet,
  ArrowRightLeft,
  Percent,
  FolderOpen,
  UserPlus,
  TrendingUp,
  Calendar,
  Target,
  Award,
  Building,
  Warehouse,
  Globe,
  Handshake,
  Rocket,
  Leaf,
  Zap,
  Clock,
  MapPin,
  BookOpen,
  Cog,
  Store,
  Box,
  RefreshCw,
  HelpCircle,
  BookMarked,
  Palette,
  Shield,
  Users2,
  Factory,
  Network,
  Star,
  Sprout
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

// All 33 modules organized by hierarchy
const moduleGroups = [
  {
    title: "Core Operational Modules",
    modules: [
      { title: "Dashboard", url: "/", icon: Home },
      { title: "Inventory Management", url: "/inventory", icon: Package },
      { title: "Staff Management", url: "/staff", icon: Users },
      { title: "Daily Tracker", url: "/daily-tracker", icon: Calendar },
      { title: "Price & SEL", url: "/pricing", icon: Tag },
      { title: "Planogram & Visual Merchandising", url: "/vm", icon: Layout },
    ]
  },
  {
    title: "Customer, CRM & Loyalty",
    modules: [
      { title: "Customer 360", url: "/customer", icon: UserCircle },
      { title: "Campaign Manager", url: "/campaigns", icon: Target },
      { title: "Loyalty & Rewards Engine", url: "/customer?tab=loyalty", icon: Award },
      { title: "Returns Management", url: "/returns", icon: RotateCcw },
      { title: "Store Lead Management", url: "/leads", icon: UserPlus },
      { title: "AI Product Selector Chatbot", url: "/product-selector", icon: MessageCircle },
    ]
  },
  {
    title: "Pricing, Financing & Offers",
    modules: [
      { title: "Paper Finance", url: "/finance", icon: CreditCard },
      { title: "Promotions & Offer Engine", url: "/discount-portal", icon: Percent },
      { title: "MOP & Cash Management", url: "/store-finance", icon: Wallet },
      { title: "Local Procurement", url: "/procurement", icon: ShoppingBag },
    ]
  },
  {
    title: "Service & Support",
    modules: [
      { title: "Services Management", url: "/services", icon: Wrench },
      { title: "Support & Quick Assist", url: "/support", icon: HelpCircle },
      { title: "Know Your Product", url: "/product-selector?tab=scan", icon: BookOpen },
    ]
  },
  {
    title: "Delivery & Quick-Commerce",
    modules: [
      { title: "Home Delivery Management", url: "/delivery", icon: Truck },
      { title: "Q-Commerce Operations", url: "/qcommerce", icon: Zap },
      { title: "Hyperlocal Delivery Partner Management", url: "/hyperlocal-delivery", icon: Truck },
      { title: "Instant Returns & Failed Delivery Reconciliation", url: "/instant-returns", icon: RefreshCw },
    ]
  },
  {
    title: "Analytics, Documents & Configuration",
    modules: [
      { title: "Analytics & Reports", url: "/reports", icon: BarChart3 },
      { title: "Sales & Billing", url: "/sales", icon: ShoppingCart },
      { title: "Document Management System", url: "/documents", icon: FileText },
      { title: "Settings & Configuration", url: "/settings", icon: Cog },
    ]
  },
  {
    title: "Enterprise, Expansion & ESG",
    modules: [
      { title: "Franchise & Partner Store Management", url: "/coming-soon/franchise", icon: Store },
      { title: "Warehouse & DC Operations", url: "/coming-soon/warehouse", icon: Warehouse },
      { title: "Omnichannel Order Orchestration", url: "/coming-soon/omnichannel", icon: Globe },
      { title: "Brand Relationship & JBP", url: "/coming-soon/brand-relationship", icon: Handshake },
      { title: "Store Launch & Expansion Tracker", url: "/coming-soon/expansion", icon: Star },
      { title: "ESG, CSR & Sustainability Tracker", url: "/coming-soon/esg", icon: Leaf },
    ]
  }
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const isCollapsed = state === "collapsed";
  
  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    // Handle URL with query parameters
    if (path.includes("?")) {
      const [pathname, query] = path.split("?");
      return location.pathname === pathname && location.search.includes(query);
    }
    return location.pathname.startsWith(path);
  };

  return (
    <Sidebar className={isCollapsed ? "w-16" : "w-64"} collapsible="icon">
      <div className="p-4 border-b bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center overflow-hidden">
            <img src="/logo.png" alt="Logo" className="h-7 w-7 object-contain" />
          </div>
          {!isCollapsed && (
            <div>
              <h2 className="font-bold text-white text-sm">StoreOps</h2>
              <p className="text-blue-100 text-xs">Retail Operations Platform</p>
            </div>
          )}
        </div>
      </div>
      
      <SidebarTrigger className="m-2 self-end" />
      
      <SidebarContent className="px-2 py-4">
        {moduleGroups.map((group, groupIndex) => (
          <SidebarGroup key={groupIndex}>
            <SidebarGroupLabel className={isCollapsed ? "hidden" : ""}>
              {group.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                {group.modules.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        className={({ isActive: navIsActive }) =>
                          `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                            isActive(item.url) || navIsActive
                              ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
                              : "hover:bg-gray-100 text-gray-700"
                          }`
                        }
                      >
                        <item.icon className="h-5 w-5 flex-shrink-0" />
                        {!isCollapsed && <span className="font-medium text-sm">{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
