import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { QCommerceContent } from "@/components/qcommerce/QCommerceContent";
import { Toaster } from "@/components/ui/toaster";
import { useSearchParams } from "react-router-dom";

const QCommerce = () => {
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'new-orders';

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          <main className="flex-1 p-4 sm:p-6">
            <QCommerceContent defaultTab={activeTab} />
          </main>
        </div>
      </div>
      <Toaster />
    </SidebarProvider>
  );
};

export default QCommerce;