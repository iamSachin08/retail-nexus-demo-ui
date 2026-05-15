
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { InventoryContent } from "@/components/inventory/InventoryContent";
import { Toaster } from "@/components/ui/toaster";

const Inventory = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          <main className="flex-1 p-6">
            <InventoryContent />
          </main>
        </div>
      </div>
      <Toaster />
    </SidebarProvider>
  );
};

export default Inventory;
