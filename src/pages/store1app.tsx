import React, { useState } from 'react';

export default function StoreOpsMarketingPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Contact form submitted:', contactForm);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <div className="hidden">
        <title>Store Operations One App | Unified Retail Platform</title>
        <meta name="description" content="The all-in-one digital backbone for modern retail. 33 modules. Real-time insights. AI-powered automation. Empower every store team." />
        <meta name="keywords" content="Retail Management, Store Operations, POS Integration, Inventory Management, Staff Management, Customer 360, Campaign Manager, Loyalty Engine, AI Retail, Unified Platform" />
        <meta property="og:title" content="Store Operations One App | Unified Retail Platform" />
        <meta property="og:description" content="Empower your retail operations with a single, intelligent platform. Sales, inventory, CRM, campaigns, compliance, and more." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://storeoperationsoneapp.com" />
        <link rel="canonical" href="https://storeoperationsoneapp.com" />
      </div>

      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-blue-600">StoreOps</div>
              <span className="ml-2 text-sm text-gray-500">by RetailHub AI</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-700 hover:text-blue-600 transition">Features</a>
              <a href="#ai-capabilities" className="text-gray-700 hover:text-blue-600 transition">AI Capabilities</a>
              <a href="#benefits" className="text-gray-700 hover:text-blue-600 transition">Benefits</a>
              <a href="#demo" className="text-gray-700 hover:text-blue-600 transition">Demo</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 transition">Contact</a>
            </nav>
            <div className="flex items-center space-x-4">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                Get Demo
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">
            AI-Powered Store Operations Management
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Transform your retail operations with StoreOps' intelligent automation and analytics. 
            One unified platform for sales, staff, inventory, customer management, and strategic insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
              Start Free Trial
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition">
              Explore Features
            </button>
          </div>
        </div>
      </section>

      {/* All 33 Modules - Comprehensive Business Solutions */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16">All 33 Modules - Complete Retail Solution</h2>
          <p className="text-xl text-center text-gray-600 mb-12">
            Comprehensive coverage across all retail operations with AI-powered automation
          </p>
          
          {/* Core Operational Modules */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-blue-800 mb-8">Core Operational Modules</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
                <div className="text-3xl mb-4">📊</div>
                <h4 className="text-lg font-bold mb-3">1. Dashboard</h4>
                <p className="text-gray-600 mb-3 text-sm">Real-time KPIs, alerts, performance visualization</p>
                <p className="text-xs text-gray-500 mb-3">Purpose: Centralized overview of key operational metrics</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Metrics Grid with daily store KPIs</li>
                  <li>• Sales Performance Charts</li>
                  <li>• AI-Generated Alerts Feed</li>
                  <li>• Top Performer Leaderboard</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
                <div className="text-3xl mb-4">📦</div>
                <h4 className="text-lg font-bold mb-3">2. Inventory Management</h4>
                <p className="text-gray-600 mb-3 text-sm">Multi-store stock, movements, audits, service issues</p>
                <p className="text-xs text-gray-500 mb-3">Purpose: Comprehensive stock control across locations</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Real-time Stock Overview</li>
                  <li>• SLOC to SLOC Transfers</li>
                  <li>• Stock Movement Log</li>
                  <li>• Service Issue Management</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
                <div className="text-3xl mb-4">👥</div>
                <h4 className="text-lg font-bold mb-3">3. Staff Management</h4>
                <p className="text-gray-600 mb-3 text-sm">Attendance, rostering, tasking, performance</p>
                <p className="text-xs text-gray-500 mb-3">Purpose: Centralize all employee-related processes</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Employee Directory</li>
                  <li>• Task & Training Assignments</li>
                  <li>• Attendance Logging</li>
                  <li>• Performance Dashboard</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
                <div className="text-3xl mb-4">📋</div>
                <h4 className="text-lg font-bold mb-3">4. Daily Tracker</h4>
                <p className="text-gray-600 mb-3 text-sm">Task inbox, training, NHQ compliance</p>
                <p className="text-xs text-gray-500 mb-3">Purpose: Bridge operational gap between NHQ and stores</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Attendance Clock-In/Out</li>
                  <li>• Task Inbox and Reminders</li>
                  <li>• Training Progress Tracker</li>
                  <li>• Self-Performance Dashboard</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
                <div className="text-3xl mb-4">🏷️</div>
                <h4 className="text-lg font-bold mb-3">5. Price & SEL</h4>
                <p className="text-gray-600 mb-3 text-sm">Price lists, promotions, label printing, margin tracking</p>
                <p className="text-xs text-gray-500 mb-3">Purpose: Control product pricing and promotions</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Create/Edit Price Lists</li>
                  <li>• Dynamic Pricing Strategy</li>
                  <li>• Promotion Rule Management</li>
                  <li>• SEL Format Templates</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
                <div className="text-3xl mb-4">🎨</div>
                <h4 className="text-lg font-bold mb-3">6. Planogram & Visual Merchandising</h4>
                <p className="text-gray-600 mb-3 text-sm">VM uploads, planogram builder, compliance audit</p>
                <p className="text-xs text-gray-500 mb-3">Purpose: Visual merchandising standards</p>
                <ul className="text-xs text-gray-600 space-y-1">
                    <li>• Planogram Creation Interface</li>
                    <li>• Photo Upload & Tagging</li>
                    <li>• Compliance Checklist</li>
                    <li>• AI Visual Validation</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Customer, CRM & Loyalty Modules */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-blue-800 mb-8">Customer, CRM & Loyalty Modules</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
                <div className="text-3xl mb-4">👤</div>
                <h4 className="text-lg font-bold mb-3">7. Customer 360</h4>
                <p className="text-gray-600 mb-3 text-sm">Unified customer view: purchases, loyalty, communication</p>
                <p className="text-xs text-gray-500 mb-3">Purpose: Single source of truth for customer data</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Purchase History & Preferences</li>
                  <li>• Loyalty Status & Points</li>
                  <li>• Communication History</li>
                  <li>• Service Requests & Feedback</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
                <div className="text-3xl mb-4">🎯</div>
                <h4 className="text-lg font-bold mb-3">8. Campaign Manager</h4>
                <p className="text-gray-600 mb-3 text-sm">Hyperlocal AI-powered campaign creation and performance</p>
                <p className="text-xs text-gray-500 mb-3">Purpose: Intelligent campaign orchestration</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Campaign Builder with Templates</li>
                  <li>• AI Creative Assistant (LLM)</li>
                  <li>• Customer Segmentation (RFM)</li>
                  <li>• Multi-Channel Publishing</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
                <div className="text-3xl mb-4">🏆</div>
                <h4 className="text-lg font-bold mb-3">9. Loyalty & Rewards Engine</h4>
                <p className="text-gray-600 mb-3 text-sm">Tier logic, earn-burn, gamification, NPS</p>
                <p className="text-xs text-gray-500 mb-3">Purpose: Centralized loyalty program management</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Multi-brand, Multi-tier Rules</li>
                  <li>• Points, Cashback, Vouchers</li>
                  <li>• Offer Mapping to Segments</li>
                  <li>• Transaction-linked Automation</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
                <div className="text-3xl mb-4">↩️</div>
                <h4 className="text-lg font-bold mb-3">10. Returns Management</h4>
                <p className="text-gray-600 mb-3 text-sm">Maker-checker returns workflow with finance sync</p>
                <p className="text-xs text-gray-500 mb-3">Purpose: Streamlined returns with compliance</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Return Entry & Validation</li>
                  <li>• Approval Workflow</li>
                  <li>• Damage Assessment</li>
                  <li>• Finance Integration</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
                <div className="text-3xl mb-4">🎯</div>
                <h4 className="text-lg font-bold mb-3">11. Store Lead Management</h4>
                <p className="text-gray-600 mb-3 text-sm">Lead intake, follow-up, status updates, CRM integration</p>
                <p className="text-xs text-gray-500 mb-3">Purpose: Convert walk-ins into sales</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Lead Entry & Tagging</li>
                  <li>• Follow-up Scheduler</li>
                  <li>• Status Updates</li>
                  <li>• Lead Analytics Dashboard</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
                <div className="text-3xl mb-4">🤖</div>
                <h4 className="text-lg font-bold mb-3">12. AI Product Selector Chatbot</h4>
                <p className="text-gray-600 mb-3 text-sm">Q&A-based guided product discovery for staff/customers</p>
                <p className="text-xs text-gray-500 mb-3">Purpose: Assist with product discovery</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Voice/Text Q&A Interface</li>
                  <li>• Need-based Recommendations</li>
                  <li>• Product Comparison</li>
                  <li>• Custom Purchase Links</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Pricing, Financing & Offers */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-blue-800 mb-8">Pricing, Financing & Offers</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

              <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
                <div className="text-3xl mb-4">💳</div>
                <h4 className="text-lg font-bold mb-3">13. Paper Finance</h4>
                <p className="text-gray-600 mb-3 text-sm">NBFC loan application, eligibility, EMI tracking</p>
                <p className="text-xs text-gray-500 mb-3">Purpose: In-store customer financing</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Eligibility Check Wizard</li>
                  <li>• Loan Application Intake</li>
                  <li>• Document Upload & Validation</li>
                  <li>• Approval Status Tracker</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
                <div className="text-3xl mb-4">🎁</div>
                <h4 className="text-lg font-bold mb-3">14. Promotions & Offer Engine</h4>
                <p className="text-gray-600 mb-3 text-sm">Rule-based brand-funded offers, couponing, tracking</p>
                <p className="text-xs text-gray-500 mb-3">Purpose: Manage promotional campaigns</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Rule-based Offer Creation</li>
                  <li>• Brand-funded Promotions</li>
                  <li>• Coupon Management</li>
                  <li>• Performance Tracking</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
                <div className="text-3xl mb-4">💳</div>
                <h4 className="text-lg font-bold mb-3">15. MOP Management</h4>
                <p className="text-gray-600 mb-3 text-sm">Mode of payment reconciliation, dispute tracking</p>
                <p className="text-xs text-gray-500 mb-3">Purpose: Payment method management</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Payment Method Tracking</li>
                  <li>• Reconciliation Reports</li>
                  <li>• Dispute Management</li>
                  <li>• Settlement Tracking</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
                <div className="text-3xl mb-4">🛒</div>
                <h4 className="text-lg font-bold mb-3">16. Local Procurement</h4>
                <p className="text-gray-600 mb-3 text-sm">Store-level POs, GRN, consumables, vendor scorecards</p>
                <p className="text-xs text-gray-500 mb-3">Purpose: Local store procurement</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Store-level Purchase Orders</li>
                  <li>• GRN Processing</li>
                  <li>• Consumables Management</li>
                  <li>• Vendor Performance Tracking</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Service & Support */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-blue-800 mb-8">Service & Support</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
                <div className="text-3xl mb-4">🔧</div>
                <h4 className="text-lg font-bold mb-3">17. Services Management</h4>
                <p className="text-gray-600 mb-3 text-sm">Installation, repair, technician assignment, feedback</p>
                <p className="text-xs text-gray-500 mb-3">Purpose: Manage service operations</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Service Request Management</li>
                  <li>• Technician Assignment</li>
                  <li>• Installation Scheduling</li>
                  <li>• Service Feedback Collection</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
                <div className="text-3xl mb-4">🆘</div>
                <h4 className="text-lg font-bold mb-3">18. Support & Quick Assist</h4>
                <p className="text-gray-600 mb-3 text-sm">Ticketing, BOC chat, SOP search, AI helpdesk</p>
                <p className="text-xs text-gray-500 mb-3">Purpose: Provide support and assistance</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Ticketing System</li>
                  <li>• BOC Chat Integration</li>
                  <li>• SOP Search Engine</li>
                  <li>• AI Helpdesk Assistant</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
                <div className="text-3xl mb-4">📚</div>
                <h4 className="text-lg font-bold mb-3">19. Know Your Product</h4>
                <p className="text-gray-600 mb-3 text-sm">Product specs, USP sheets, visual guides, staff quiz</p>
                <p className="text-xs text-gray-500 mb-3">Purpose: Product knowledge management</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Product Specifications</li>
                  <li>• USP Sheets & Guides</li>
                  <li>• Visual Product Guides</li>
                  <li>• Staff Training Quizzes</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Analytics, Documents & Configuration */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-blue-800 mb-8">Analytics, Documents & Configuration</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
                <div className="text-3xl mb-4">📈</div>
                <h4 className="text-lg font-bold mb-3">20. Analytics & Reports</h4>
                <p className="text-gray-600 mb-3 text-sm">Role-wise dashboards, smart alerts, AI copilots</p>
                <p className="text-xs text-gray-500 mb-3">Purpose: Business intelligence and insights</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Role-wise Dashboards</li>
                  <li>• Smart Alerts</li>
                  <li>• AI Copilots</li>
                  <li>• Custom Report Builder</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
                <div className="text-3xl mb-4">💰</div>
                <h4 className="text-lg font-bold mb-3">21. Sales & Billing</h4>
                <p className="text-gray-600 mb-3 text-sm">POS sync, invoice, returns, transaction tracking</p>
                <p className="text-xs text-gray-500 mb-3">Purpose: Handle all customer-facing transactions</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• POS Integration & Sync</li>
                  <li>• New Sales Entry</li>
                  <li>• Invoice Lookup & Reprint</li>
                  <li>• Returns & Exchange Workflow</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
                <div className="text-3xl mb-4">📄</div>
                <h4 className="text-lg font-bold mb-3">22. Document Management System</h4>
                <p className="text-gray-600 mb-3 text-sm">SOPs, contracts, checklists, approvals, expiry alerts</p>
                <p className="text-xs text-gray-500 mb-3">Purpose: Centralized document management</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• SOP Repository</li>
                  <li>• Contract Management</li>
                  <li>• Checklist Templates</li>
                  <li>• Approval Workflows</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
                <div className="text-3xl mb-4">⚙️</div>
                <h4 className="text-lg font-bold mb-3">23. Settings & Configuration</h4>
                <p className="text-gray-600 mb-3 text-sm">Roles, permissions, API/webhook settings</p>
                <p className="text-xs text-gray-500 mb-3">Purpose: System configuration management</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• User Management & Roles</li>
                  <li>• Security Controls</li>
                  <li>• Integration Settings</li>
                  <li>• Backup & Recovery</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Delivery & Quick-Commerce */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-blue-800 mb-8">Delivery & Quick-Commerce</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

              <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
                <div className="text-3xl mb-4">🚚</div>
                <h4 className="text-lg font-bold mb-3">24. Delivery Management</h4>
                <p className="text-gray-600 mb-3 text-sm">Home delivery scheduling, route optimization, 3PL tracking</p>
                <p className="text-xs text-gray-500 mb-3">Purpose: Coordinate delivery workflows</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Delivery Scheduling Interface</li>
                  <li>• Route Optimization Tool</li>
                  <li>• Real-Time Tracking View</li>
                  <li>• Exception Handling Workflow</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
                <div className="text-3xl mb-4">📱</div>
                <h4 className="text-lg font-bold mb-3">25. Q-Commerce Operations</h4>
                <p className="text-gray-600 mb-3 text-sm">Quick commerce order management and fulfillment</p>
                <p className="text-xs text-gray-500 mb-3">Purpose: Handle quick commerce orders</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Order Management</li>
                  <li>• Picker Assignment</li>
                  <li>• Real-time Tracking</li>
                  <li>• Delivery Coordination</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
                <div className="text-3xl mb-4">🚚</div>
                <h4 className="text-lg font-bold mb-3">26. Hyperlocal Delivery Partner Management</h4>
                <p className="text-gray-600 mb-3 text-sm">3PL coordination for Q-commerce orders</p>
                <p className="text-xs text-gray-500 mb-3">Purpose: Manage delivery partnerships</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Partner Integration APIs</li>
                  <li>• Pickup Request Generation</li>
                  <li>• Rider Assignment Tracker</li>
                  <li>• Live Order Status Map</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
                <div className="text-3xl mb-4">↩️</div>
                <h4 className="text-lg font-bold mb-3">27. Instant Returns & Failed Delivery Reconciliation</h4>
                <p className="text-gray-600 mb-3 text-sm">Failed delivery handling and reconciliation</p>
                <p className="text-xs text-gray-500 mb-3">Purpose: Handle delivery failures</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Return Logging Interface</li>
                  <li>• Damage/Expiry Detection</li>
                  <li>• Automatic Restock Routing</li>
                  <li>• Refund API Sync</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Enterprise, Expansion & ESG */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-blue-800 mb-8">Enterprise, Expansion & ESG</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
                <div className="text-3xl mb-4">🏢</div>
                <h4 className="text-lg font-bold mb-3">28. Franchise & Partner Store Management</h4>
                <p className="text-gray-600 mb-3 text-sm">Onboarding, revenue share, SOPs, partner tracking</p>
                <p className="text-xs text-gray-500 mb-3">Purpose: Manage franchise and partner stores</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Franchisee Onboarding</li>
                  <li>• Revenue Share Calculations</li>
                  <li>• Partner Agreement Repository</li>
                  <li>• Training & Audits</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
                <div className="text-3xl mb-4">🏭</div>
                <h4 className="text-lg font-bold mb-3">29. Warehouse & DC Operations</h4>
                <p className="text-gray-600 mb-3 text-sm">Bin management, putaway, GRNs, ASN, replenishment</p>
                <p className="text-xs text-gray-500 mb-3">Purpose: Manage warehouse operations</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• GRN & ASN Integration</li>
                  <li>• Bin Allocation & Storage</li>
                  <li>• Picking Queues</li>
                  <li>• Replenishment Orders</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
                <div className="text-3xl mb-4">🔄</div>
                <h4 className="text-lg font-bold mb-3">30. Omnichannel Order Orchestration</h4>
                <p className="text-gray-600 mb-3 text-sm">Unified order routing across stores, dark stores, ecom</p>
                <p className="text-xs text-gray-500 mb-3">Purpose: Orchestrate order fulfillment</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Order Source Integration</li>
                  <li>• Inventory Availability Engine</li>
                  <li>• Rules-based Order Routing</li>
                  <li>• Returns & Cancellations Sync</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
                <div className="text-3xl mb-4">🤝</div>
                <h4 className="text-lg font-bold mb-3">31. Brand Relationship & JBP</h4>
                <p className="text-gray-600 mb-3 text-sm">Trade terms, space allocation, joint marketing plans</p>
                <p className="text-xs text-gray-500 mb-3">Purpose: Manage brand relationships</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Trade Terms Management</li>
                  <li>• Space Allocation Tracking</li>
                  <li>• Joint Marketing Plans</li>
                  <li>• Brand Performance Analytics</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
                <div className="text-3xl mb-4">🚀</div>
                <h4 className="text-lg font-bold mb-3">32. Store Launch & Expansion Tracker</h4>
                <p className="text-gray-600 mb-3 text-sm">Timelines, budget tracking, launch readiness</p>
                <p className="text-xs text-gray-500 mb-3">Purpose: Track store expansion</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Launch Timeline Management</li>
                  <li>• Budget Tracking</li>
                  <li>• Launch Readiness Checklist</li>
                  <li>• Post-Launch Analytics</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
                <div className="text-3xl mb-4">🌱</div>
                <h4 className="text-lg font-bold mb-3">33. ESG, CSR & Sustainability Tracker</h4>
                <p className="text-gray-600 mb-3 text-sm">Waste, carbon, CSR programs, ESG board reporting</p>
                <p className="text-xs text-gray-500 mb-3">Purpose: Track sustainability initiatives</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Waste Management Tracking</li>
                  <li>• Carbon Footprint Monitoring</li>
                  <li>• CSR Program Management</li>
                  <li>• ESG Board Reporting</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comprehensive User Personas */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16">Who Uses StoreOps?</h2>
          <p className="text-xl text-center text-gray-600 mb-12">
            Designed for every role in retail - from store staff to headquarters leadership
          </p>

          {/* Store-Level Personas */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-blue-800 mb-8">Store-Level Personas</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-blue-500">
                <h4 className="text-lg font-bold mb-3">Store Manager</h4>
                <p className="text-sm text-gray-600 mb-3">Overall store operations, sales target achievement, staff supervision</p>
                <p className="text-xs text-blue-600 font-semibold mb-2">Gets from StoreOps:</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Unified visibility of KPIs</li>
                  <li>• Real-time alerts and notifications</li>
                  <li>• Team performance tracking</li>
                  <li>• Daily compliance dashboards</li>
                  <li>• Sales trend analysis</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-green-500">
                <h4 className="text-lg font-bold mb-3">Store Associate (Sales Floor/Counter)</h4>
                <p className="text-sm text-gray-600 mb-3">Customer interaction, billing, product recommendation, upselling</p>
                <p className="text-xs text-green-600 font-semibold mb-2">Gets from StoreOps:</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Fast POS access and integration</li>
                  <li>• Real-time stock visibility</li>
                  <li>• Pricing clarity and updates</li>
                  <li>• AI-assisted product suggestions</li>
                  <li>• Customer history access</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-purple-500">
                <h4 className="text-lg font-bold mb-3">Store CRM Agent / Loyalty Desk</h4>
                <p className="text-sm text-gray-600 mb-3">Customer query handling, loyalty enrolments, returns, feedback</p>
                <p className="text-xs text-purple-600 font-semibold mb-2">Gets from StoreOps:</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• 360° customer view</li>
                  <li>• Loyalty dashboard and management</li>
                  <li>• Instant issue resolution workflows</li>
                  <li>• Customer communication history</li>
                  <li>• Returns processing tools</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-orange-500">
                <h4 className="text-lg font-bold mb-3">Store Delivery Agent</h4>
                <p className="text-sm text-gray-600 mb-3">Home deliveries, pickups, order handover coordination</p>
                <p className="text-xs text-orange-600 font-semibold mb-2">Gets from StoreOps:</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Rider instructions and coordination</li>
                  <li>• GPS/route access</li>
                  <li>• OTP validation system</li>
                  <li>• Real-time delivery updates</li>
                  <li>• Exception handling tools</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-red-500">
                <h4 className="text-lg font-bold mb-3">Store Inventory Incharge</h4>
                <p className="text-sm text-gray-600 mb-3">Stock intake, shelf replenishment, transfers, audits</p>
                <p className="text-xs text-red-600 font-semibold mb-2">Gets from StoreOps:</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Easy item scanning and tracking</li>
                  <li>• Transfer workflows</li>
                  <li>• Shortage alerts</li>
                  <li>• Stock-level intelligence</li>
                  <li>• Audit management tools</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-indigo-500">
                <h4 className="text-lg font-bold mb-3">Store Visual Merchandiser (VM)</h4>
                <p className="text-sm text-gray-600 mb-3">Planogram implementation, display execution</p>
                <p className="text-xs text-indigo-600 font-semibold mb-2">Gets from StoreOps:</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• SOP checklist and guidelines</li>
                  <li>• Visual upload tools</li>
                  <li>• Compliance tracking</li>
                  <li>• AI-based VM validation</li>
                  <li>• Brand guideline access</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Zonal / Regional Personas */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-blue-800 mb-8">Zonal / Regional Personas</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-blue-600">
                <h4 className="text-lg font-bold mb-3">Cluster / Zonal Manager</h4>
                <p className="text-sm text-gray-600 mb-3">Multi-store performance, audit readiness, escalations</p>
                <p className="text-xs text-blue-600 font-semibold mb-2">Gets from StoreOps:</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Cross-store comparison analytics</li>
                  <li>• Staff heatmap and performance</li>
                  <li>• Low-performer detection</li>
                  <li>• Centralized reporting</li>
                  <li>• Audit readiness dashboards</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-green-600">
                <h4 className="text-lg font-bold mb-3">Regional Merchandising Lead</h4>
                <p className="text-sm text-gray-600 mb-3">Local promotions, stock health, pricing coordination</p>
                <p className="text-xs text-green-600 font-semibold mb-2">Gets from StoreOps:</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Real-time SKU performance</li>
                  <li>• Price override approval workflows</li>
                  <li>• Brand promo tagging</li>
                  <li>• Stock health monitoring</li>
                  <li>• Regional campaign management</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-purple-600">
                <h4 className="text-lg font-bold mb-3">Regional Sales Manager</h4>
                <p className="text-sm text-gray-600 mb-3">Revenue growth, conversion rate, customer experience</p>
                <p className="text-xs text-purple-600 font-semibold mb-2">Gets from StoreOps:</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Dashboard-driven insights</li>
                  <li>• Campaign effectiveness tracking</li>
                  <li>• Team training status</li>
                  <li>• Sales performance analytics</li>
                  <li>• Customer satisfaction metrics</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-orange-600">
                <h4 className="text-lg font-bold mb-3">Regional Supply Chain Coordinator</h4>
                <p className="text-sm text-gray-600 mb-3">SLOC transfers, delivery adherence, vendor sync</p>
                <p className="text-xs text-orange-600 font-semibold mb-2">Gets from StoreOps:</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Stock movement log</li>
                  <li>• GRN accuracy tracking</li>
                  <li>• Replenishment alerts</li>
                  <li>• Route intelligence</li>
                  <li>• Vendor performance metrics</li>
                </ul>
              </div>
            </div>
          </div>

          {/* National HQ Personas */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-blue-800 mb-8">National HQ Personas</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-red-600">
                <h4 className="text-lg font-bold mb-3">Business Operations Control (BOC)</h4>
                <p className="text-sm text-gray-600 mb-3">Support ticketing, exception handling, SOP clarification</p>
                <p className="text-xs text-red-600 font-semibold mb-2">Gets from StoreOps:</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Quick assist dashboard</li>
                  <li>• AI-based resolution engine</li>
                  <li>• SLA tracking</li>
                  <li>• Exception monitoring</li>
                  <li>• SOP repository access</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-indigo-600">
                <h4 className="text-lg font-bold mb-3">NHQ Program Manager</h4>
                <p className="text-sm text-gray-600 mb-3">National initiatives, SOP rollout, compliance</p>
                <p className="text-xs text-indigo-600 font-semibold mb-2">Gets from StoreOps:</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Task deployment engine</li>
                  <li>• Real-time status feed</li>
                  <li>• Store-wise scorecards</li>
                  <li>• Compliance tracking</li>
                  <li>• Initiative roll-out tools</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-blue-700">
                <h4 className="text-lg font-bold mb-3">Retail Operations Head</h4>
                <p className="text-sm text-gray-600 mb-3">Strategic oversight, leadership reporting, system ROI</p>
                <p className="text-xs text-blue-700 font-semibold mb-2">Gets from StoreOps:</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• National health dashboard</li>
                  <li>• Module usage analytics</li>
                  <li>• AI-generated summaries</li>
                  <li>• ROI tracking</li>
                  <li>• Strategic insights</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-green-700">
                <h4 className="text-lg font-bold mb-3">HR / Training Team</h4>
                <p className="text-sm text-gray-600 mb-3">Staff onboarding, learning completion, policy deployment</p>
                <p className="text-xs text-green-700 font-semibold mb-2">Gets from StoreOps:</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Roster and attendance audit</li>
                  <li>• Training nudges</li>
                  <li>• Policy push workflows</li>
                  <li>• Learning completion tracking</li>
                  <li>• Staff development insights</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-purple-700">
                <h4 className="text-lg font-bold mb-3">Category / Brand Manager</h4>
                <p className="text-sm text-gray-600 mb-3">Brand-level sales, visibility compliance, campaign rollout</p>
                <p className="text-xs text-purple-700 font-semibold mb-2">Gets from StoreOps:</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Planogram snapshots</li>
                  <li>• Sales attribution</li>
                  <li>• JBP fulfillment tracking</li>
                  <li>• Brand performance analytics</li>
                  <li>• Campaign effectiveness</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-orange-700">
                <h4 className="text-lg font-bold mb-3">IT / Digital Transformation Lead</h4>
                <p className="text-sm text-gray-600 mb-3">Tech stack governance, integrations, performance</p>
                <p className="text-xs text-orange-700 font-semibold mb-2">Gets from StoreOps:</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• System uptime logs</li>
                  <li>• Integration matrix</li>
                  <li>• App latency insights</li>
                  <li>• Performance monitoring</li>
                  <li>• Technical health dashboards</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI-Powered Intelligence */}
      <section id="ai-capabilities" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16">AI-Powered Intelligence</h2>
          <p className="text-xl text-center text-gray-600 mb-12">
            Leverage cutting-edge artificial intelligence to optimize your retail operations
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🧠</div>
              <h3 className="text-lg font-bold mb-2">AI Assistant & Analytics</h3>
              <p className="text-gray-600">Chat-based Q&A and intelligent analysis for instant business insights</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-lg font-bold mb-2">Intelligent Gap Analysis</h3>
              <p className="text-gray-600">Automated gap identification with actionable recommendations</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">📈</div>
              <h3 className="text-lg font-bold mb-2">Predictive Forecasting</h3>
              <p className="text-gray-600">AI-powered demand forecasting and optimal stock calculation</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-lg font-bold mb-2">Smart Automation</h3>
              <p className="text-gray-600">Automated workflows and intelligent task prioritization</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose StoreOps */}
      <section id="benefits" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16">Why Choose StoreOps?</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">85%</div>
              <h3 className="text-lg font-bold mb-2">Process Efficiency</h3>
              <p className="text-gray-600">Reduce manual work and processing time with intelligent automation</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">60%</div>
              <h3 className="text-lg font-bold mb-2">Cost Reduction</h3>
              <p className="text-gray-600">Lower operational costs through optimized inventory management</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">95%</div>
              <h3 className="text-lg font-bold mb-2">Accuracy Improvement</h3>
              <p className="text-gray-600">Eliminate errors with AI-powered validation and automation</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
              <h3 className="text-lg font-bold mb-2">Real-time Monitoring</h3>
              <p className="text-gray-600">Continuous monitoring and instant alerts for critical events</p>
            </div>
          </div>
        </div>
      </section>

      {/* Ready to Transform */}
      <section id="demo" className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Store Operations?</h2>
          <p className="text-xl mb-8">
            Join leading retail companies using StoreOps to streamline their operations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
              Schedule Demo
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition">
              Call Sales
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16">Get in Touch</h2>
          <p className="text-xl text-center text-gray-600 mb-12">
            Ready to transform your store operations? Let's discuss how StoreOps can help your business.
          </p>
          
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h3 className="text-2xl font-bold mb-6">Send us a Message</h3>
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={contactForm.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={contactForm.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="company"
                    placeholder="Company"
                    value={contactForm.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <textarea
                    name="message"
                    placeholder="Message"
                    value={contactForm.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="text-2xl mr-4">📧</div>
                  <div>
                    <h4 className="font-bold">Email Us</h4>
                    <p className="text-gray-600">admin@retailhubmanager.com</p>
                    <p className="text-gray-600">support@retailhubmanager.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="text-2xl mr-4">📱</div>
                  <div>
                    <h4 className="font-bold">Call or WhatsApp</h4>
                    <p className="text-gray-600">+91-9876543210</p>
                    <p className="text-gray-600">WhatsApp Chat</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="text-2xl mr-4">📍</div>
                  <div>
                    <h4 className="font-bold">Location</h4>
                    <p className="text-gray-600">Mumbai, India</p>
                    <p className="text-gray-600">Available for remote consultations worldwide</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="text-2xl mr-4">🕒</div>
                  <div>
                    <h4 className="font-bold">Business Hours</h4>
                    <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM IST</p>
                    <p className="text-gray-600">Saturday: 10:00 AM - 2:00 PM IST</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-bold mb-2">How quickly can we get started?</h3>
              <p className="text-gray-600">We can have you up and running within 2-4 weeks, depending on your integration requirements and data migration needs.</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-bold mb-2">Do you offer training and support?</h3>
              <p className="text-gray-600">Yes, we provide comprehensive training for your team and 24/7 technical support to ensure smooth operations.</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-bold mb-2">Can StoreOps integrate with our existing systems?</h3>
              <p className="text-gray-600">Absolutely! StoreOps supports integration with popular POS systems, ERP software, and custom APIs.</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-bold mb-2">Is there a free trial available?</h3>
              <p className="text-gray-600">Yes, we offer a 30-day free trial with full access to all features and dedicated support.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold text-white mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#features" className="hover:text-white transition">Features</a></li>
                <li><a href="#demo" className="hover:text-white transition">Try Demo</a></li>
                <li><a href="#ai-capabilities" className="hover:text-white transition">AI Capabilities</a></li>
                <li><a href="#benefits" className="hover:text-white transition">Benefits</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition">API Reference</a></li>
                <li><a href="#" className="hover:text-white transition">Integrations</a></li>
                <li><a href="#" className="hover:text-white transition">Support</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition">About Us</a></li>
                <li><a href="#" className="hover:text-white transition">Careers</a></li>
                <li><a href="#" className="hover:text-white transition">Press</a></li>
                <li><a href="#" className="hover:text-white transition">Partners</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-4">Contact</h3>
              <p className="mb-2">admin@retailhubmanager.com</p>
              <p className="mb-2">WhatsApp: +91-9876543210</p>
              <p>Call: +91-9876543210</p>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p>Mumbai, India</p>
            <p className="mt-2">© 2024 RetailHub AI. StoreOps is a product of RetailHub AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
