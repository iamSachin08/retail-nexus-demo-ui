
import { MetricsGrid } from "./MetricsGrid";
import { SalesChart } from "./SalesChart";
import { AlertsFeed } from "./AlertsFeed";
import { TopPerformers } from "./TopPerformers";
import { QuickActions } from "./QuickActions";

export function DashboardContent() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Good Morning, Rahul! 🌅</h2>
        <p className="text-blue-100">
          Today's target: ₹2.5L | Current: ₹1.8L (72% achieved)
        </p>
        <div className="mt-4 bg-white/20 rounded-lg p-3 w-fit">
          <p className="text-sm">🎯 Just ₹70,000 more to hit today's target!</p>
        </div>
      </div>

      {/* Quick Actions */}
      <QuickActions />

      {/* Metrics Grid */}
      <MetricsGrid />

      {/* Charts and Alerts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SalesChart />
        <AlertsFeed />
      </div>

      {/* Top Performers */}
      <TopPerformers />
    </div>
  );
}
