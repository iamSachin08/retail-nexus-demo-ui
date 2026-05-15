import { useParams } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { CustomerDetails } from "@/components/customer/CustomerDetails";
import { Toaster } from "@/components/ui/toaster";

const CustomerDetailsPage = () => {
  const { customerId } = useParams<{ customerId: string }>();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          <main className="flex-1 p-6">
            <CustomerDetails customerId={customerId || ""} />
          </main>
        </div>
      </div>
      <Toaster />
    </SidebarProvider>
  );
};

export default CustomerDetailsPage; 