
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { DailyTrackerContent } from "@/components/daily-tracker/DailyTrackerContent";
import { Toaster } from "@/components/ui/toaster";

const DailyTracker = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          <main className="flex-1 p-4 md:p-6">
            <DailyTrackerContent />
          </main>
        </div>
      </div>
      <Toaster />
    </SidebarProvider>
  );
};

export default DailyTracker;
