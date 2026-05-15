import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { ProductSelectorContent } from "@/components/product-selector/ProductSelectorContent";
import { Toaster } from "@/components/ui/toaster";
import { useSearchParams } from "react-router-dom";

const ProductSelector = () => {
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'fit';

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          <main className="flex-1 p-6">
            <ProductSelectorContent defaultTab={activeTab} />
          </main>
        </div>
      </div>
      <Toaster />
    </SidebarProvider>
  );
};

export default ProductSelector; 