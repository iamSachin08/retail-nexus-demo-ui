
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { DeliveryContent } from "@/components/delivery/DeliveryContent";
import { Toaster } from "@/components/ui/toaster";

const Delivery = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          <main className="flex-1 p-6">
            <DeliveryContent />
          </main>
        </div>
      </div>
      <Toaster />
    </SidebarProvider>
  );
};

export default Delivery;
