import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { CustomerContent } from "@/components/customer/CustomerContent";
import { Toaster } from "@/components/ui/toaster";
import { useSearchParams } from "react-router-dom";

const Customer = () => {
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'lookup';

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          <main className="flex-1 p-4 sm:p-6">
            <CustomerContent defaultTab={activeTab} />
          </main>
        </div>
      </div>
      <Toaster />
    </SidebarProvider>
  );
};

export default Customer;
