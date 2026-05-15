import { Routes, Route } from 'react-router-dom';
import { DemoThemeProvider } from './context/DemoThemeContext';
import { EditModeProvider } from './context/EditModeContext';
import { LeadsProvider } from './context/LeadsContext';
import { ShopAssistantProvider } from './assistant/ShopAssistantContext';
import { ShopAssistant } from './assistant/ShopAssistant';
import { DemoLayout } from './layouts/DemoLayout';
import { HomePage } from './pages/HomePage';
import { InventoryPage } from './pages/InventoryPage';
import { LeadPage } from './pages/LeadPage';
import { SalesPage } from './pages/SalesPage';

export default function DemoApp() {
  return (
    <DemoThemeProvider>
      <EditModeProvider>
        <LeadsProvider>
          <ShopAssistantProvider>
            <DemoLayout>
              <Routes>
                <Route index element={<HomePage />} />
                <Route path="inventory" element={<InventoryPage />} />
                <Route path="lead" element={<LeadPage />} />
                <Route path="sales" element={<SalesPage />} />
              </Routes>
            </DemoLayout>
            <ShopAssistant />
          </ShopAssistantProvider>
        </LeadsProvider>
      </EditModeProvider>
    </DemoThemeProvider>
  );
}
