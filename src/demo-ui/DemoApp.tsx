import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { DemoThemeProvider } from './context/DemoThemeContext';
import { EditModeProvider } from './context/EditModeContext';
import { LeadsProvider } from './context/LeadsContext';
import { AuthProvider } from './context/AuthContext';
import { AuthGate } from './auth/AuthGate';
import { DockProvider } from './context/DockContext';
import { ShopAssistantProvider } from './assistant/ShopAssistantContext';
import { ShopAssistant } from './assistant/ShopAssistant';
import { DemoLayout } from './layouts/DemoLayout';
import { HomePage } from './pages/HomePage';
import { ScanProductPage } from './kyp/ScanProductPage';
import { ProductDetailPage } from './kyp/ProductDetailPage';
import { ProductCategoryPage } from './kyp/ProductCategoryPage';
import { OpinionPage } from './kyp/OpinionPage';
import { AiSuggestPage } from './kyp/AiSuggestPage';
import { SearchCustomerPage } from './kyc/SearchCustomerPage';
import { CustomerProfilePage } from './kyc/CustomerProfilePage';
import { CampaignsPage } from './campaigns/CampaignsPage';
import { CampaignDetailPage } from './campaigns/CampaignDetailPage';
import { InventoryPage } from './pages/InventoryPage';
import { LeadPage } from './pages/LeadPage';
import { SalesPage } from './pages/SalesPage';
import { ProcurementPage } from './pages/ProcurementPage';
import { TasksPage } from './tasks/TasksPage';

function ShopAssistantGate() {
  const { pathname } = useLocation();
  if (pathname.includes('/kyp')) return null;
  return <ShopAssistant />;
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);
  return null;
}

export default function DemoApp() {
  return (
    <DemoThemeProvider>
      <AuthProvider>
        <AuthGate>
          <DockProvider>
            <EditModeProvider>
              <LeadsProvider>
                <ShopAssistantProvider>
                  <ScrollToTop />
            <Routes>
              <Route
                path="/"
                element={
                  <DemoLayout>
                    <HomePage />
                  </DemoLayout>
                }
              />
              <Route
                path="/inventory"
                element={
                  <DemoLayout>
                    <InventoryPage />
                  </DemoLayout>
                }
              />
              <Route
                path="/lead"
                element={
                  <DemoLayout>
                    <LeadPage />
                  </DemoLayout>
                }
              />
              <Route
                path="/sales"
                element={
                  <DemoLayout>
                    <SalesPage />
                  </DemoLayout>
                }
              />
              <Route
                path="/kyp/suggest"
                element={
                  <DemoLayout>
                    <AiSuggestPage />
                  </DemoLayout>
                }
              />
              <Route
                path="/kyp/scan"
                element={
                  <DemoLayout>
                    <ScanProductPage />
                  </DemoLayout>
                }
              />
              <Route
                path="/kyp/categories"
                element={
                  <DemoLayout>
                    <ProductCategoryPage />
                  </DemoLayout>
                }
              />
              <Route
                path="/kyp/opinion/:categoryId"
                element={
                  <DemoLayout>
                    <OpinionPage />
                  </DemoLayout>
                }
              />
              <Route
                path="/kyp/product/:articleId"
                element={
                  <DemoLayout>
                    <ProductDetailPage />
                  </DemoLayout>
                }
              />
              <Route
                path="/kyc"
                element={
                  <DemoLayout>
                    <SearchCustomerPage />
                  </DemoLayout>
                }
              />
              <Route
                path="/kyc/profile/:customerId"
                element={
                  <DemoLayout>
                    <CustomerProfilePage />
                  </DemoLayout>
                }
              />
              <Route
                path="/campaigns"
                element={
                  <DemoLayout>
                    <CampaignsPage />
                  </DemoLayout>
                }
              />
              <Route
                path="/campaigns/:campaignId"
                element={
                  <DemoLayout>
                    <CampaignDetailPage />
                  </DemoLayout>
                }
              />
              <Route
                path="/tasks"
                element={
                  <DemoLayout>
                    <TasksPage />
                  </DemoLayout>
                }
              />
              <Route
                path="/procurement"
                element={
                  <DemoLayout>
                    <ProcurementPage />
                  </DemoLayout>
                }
              />
                  </Routes>
                  <ShopAssistantGate />
                </ShopAssistantProvider>
              </LeadsProvider>
            </EditModeProvider>
          </DockProvider>
        </AuthGate>
      </AuthProvider>
    </DemoThemeProvider>
  );
}
