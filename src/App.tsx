import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Inventory from "./pages/Inventory";
import Sales from "./pages/Sales";
import Delivery from "./pages/Delivery";
import Staff from "./pages/Staff";
import Procurement from "./pages/Procurement";
import Services from "./pages/Services";
import NotFound from "./pages/NotFound";
import Returns from "./pages/Returns";
import VM from "./pages/VM";
import Finance from "./pages/Finance";
import Support from "./pages/Support";
import Customer from "./pages/Customer";
import CustomerDetailsPage from "./pages/CustomerDetails";
import Pricing from "./pages/Pricing";
import Reports from "./pages/Reports";
import Campaigns from "./pages/Campaigns";
import Settings from "./pages/Settings";
import DailyTracker from "./pages/DailyTracker";
import StoreFinance from "./pages/StoreFinance";
import DiscountPortal from "./pages/DiscountPortal";
import Documents from "./pages/Documents";
import Leads from "./pages/Leads";
import ProductSelector from './pages/ProductSelector';
import QCommerce from './pages/QCommerce';
import HyperlocalDelivery from './pages/HyperlocalDelivery';
import InstantReturns from './pages/InstantReturns';
import StoreOpsMarketingPage from './pages/store1app';
import ComingSoon from './pages/ComingSoon';
import { lazy, Suspense } from 'react';
const DemoApp = lazy(() => import('./demo-ui/DemoApp'));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/delivery" element={<Delivery />} />
          <Route path="/staff" element={<Staff />} />
          <Route path="/procurement" element={<Procurement />} />
          <Route path="/services" element={<Services />} />
          <Route path="/returns" element={<Returns />} />
          <Route path="/vm" element={<VM />} />
          <Route path="/finance" element={<Finance />} />
          <Route path="/support" element={<Support />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/customer/details/:customerId" element={<CustomerDetailsPage />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/campaigns" element={<Campaigns />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/daily-tracker" element={<DailyTracker />} />
          <Route path="/store-finance" element={<StoreFinance />} />
          <Route path="/discount-portal" element={<DiscountPortal />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/leads" element={<Leads />} />
          <Route path="/product-selector" element={<ProductSelector />} />
          <Route path="/qcommerce" element={<QCommerce />} />
          <Route path="/hyperlocal-delivery" element={<HyperlocalDelivery />} />
          <Route path="/instant-returns" element={<InstantReturns />} />
          <Route path="/store1app" element={<StoreOpsMarketingPage />} />
          <Route path="/coming-soon/:moduleName" element={<ComingSoon />} />
          <Route
            path="/demo/*"
            element={
              <Suspense fallback={null}>
                <DemoApp />
              </Suspense>
            }
          />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
