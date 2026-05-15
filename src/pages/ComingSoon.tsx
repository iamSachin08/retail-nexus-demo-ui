import React from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { Construction, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Toaster } from "@/components/ui/toaster";

export default function ComingSoon() {
  const { moduleName } = useParams<{ moduleName: string }>();
  
  // Convert URL parameter to readable module name
  const getModuleDisplayName = (urlName: string | undefined) => {
    if (!urlName) return 'Module';
    
    const nameMap: { [key: string]: string } = {
      'loyalty': 'Loyalty & Rewards Engine',
      'promotions': 'Promotions & Offer Engine',
      'mop-management': 'MOP Management',
      'kyp': 'Know Your Product',
      'franchise': 'Franchise & Partner Store Management',
      'warehouse': 'Warehouse & DC Operations',
      'omnichannel': 'Omnichannel Order Orchestration',
      'brand-relationship': 'Brand Relationship & JBP',
      'expansion': 'Store Launch & Expansion Tracker',
      'esg': 'ESG, CSR & Sustainability Tracker',
      'qcommerce': 'Q-Commerce Operations',
      'hyperlocal-delivery': 'Hyperlocal Delivery Partner Management',
      'instant-returns': 'Instant Returns & Failed Delivery Reconciliation',
      'documents': 'Document Management System',
      'vm': 'Planogram & Visual Merchandising',
      'settings': 'Settings & Configuration',
      'campaigns': 'Campaign Manager',
      'returns': 'Returns Management',
      'leads': 'Store Lead Management',
      'product-selector': 'AI Product Selector Chatbot',
      'pricing': 'Price & SEL',
      'finance': 'Paper Finance',
      'procurement': 'Local Procurement',
      'services': 'Services Management',
      'delivery': 'Delivery Management',
      'support': 'Support & Quick Assist',
      'reports': 'Analytics & Reports',
      'staff': 'Staff Management',
      'daily-tracker': 'Daily Tracker',
      'customer': 'Customer 360',
      'sales': 'Sales & Billing',
      'inventory': 'Inventory Management'
    };
    
    return nameMap[urlName] || urlName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const displayName = getModuleDisplayName(moduleName);

  return (
    <SidebarProvider>
      <Helmet>
        <title>{displayName} - Coming Soon | StoreOps</title>
        <meta name="description" content={`${displayName} module is coming soon to StoreOps retail operations platform.`} />
      </Helmet>
      
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          <main className="flex-1 p-6">
            <div className="max-w-2xl mx-auto text-center">
              <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
                <div className="mb-8">
                  <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Construction className="w-10 h-10 text-yellow-600" />
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    {displayName}
                  </h1>
                  <p className="text-xl text-gray-600 mb-2">
                    Coming Soon
                  </p>
                  <p className="text-gray-500">
                    We're working hard to bring you this amazing feature
                  </p>
                </div>

                <div className="bg-blue-50 rounded-lg p-6 mb-8">
                  <h3 className="text-lg font-semibold text-blue-900 mb-3">
                    What to expect from {displayName}:
                  </h3>
                  <ul className="text-left text-blue-800 space-y-2">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>Advanced functionality for retail operations</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>AI-powered insights and automation</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>Seamless integration with existing modules</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>Real-time data and analytics</span>
                    </li>
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Dashboard
                  </Link>
                  <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    Get Notified
                  </button>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-500">
                    Expected release: Q2 2024
                  </p>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <Toaster />
    </SidebarProvider>
  );
} 