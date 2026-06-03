import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import ChecklistRtlOutlinedIcon from '@mui/icons-material/ChecklistRtlOutlined';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import { tokens } from '../theme/tokens';
import { useModuleSummary } from '../hooks/useModuleSummary';
import type { ModuleConfig, TileLayoutItem } from '../types/module';
import { renderSales, renderLead, renderInventory, renderTasks, renderCampaigns } from './renderers';

export const moduleRegistry: Record<string, ModuleConfig> = {
  'sales-orders': {
    id: 'sales-orders',
    title: 'Sales and Orders',
    icon: <ReceiptLongOutlinedIcon />,
    gradient: tokens.gradient.sales,
    solidBg: '#34D399',
    route: '/demo/sales',
    supportedSizes: ['small', 'medium', 'large'],
    defaultSize: 'medium',
    useSummary: () => useModuleSummary('sales-orders'),
    renderContent: renderSales,
  },
  lead: {
    id: 'lead',
    title: 'Lead',
    icon: <GroupsOutlinedIcon />,
    gradient: tokens.gradient.leads,
    solidBg: '#FB923C',
    route: '/demo/lead',
    supportedSizes: ['small', 'medium', 'large'],
    defaultSize: 'small',
    useSummary: () => useModuleSummary('lead'),
    renderContent: renderLead,
  },
  inventory: {
    id: 'inventory',
    title: 'Inventory',
    icon: <Inventory2OutlinedIcon />,
    gradient: tokens.gradient.inventory,
    solidBg: '#60A5FA',
    route: '/demo/inventory',
    supportedSizes: ['small', 'medium', 'large'],
    defaultSize: 'large',
    useSummary: () => useModuleSummary('inventory'),
    renderContent: renderInventory,
  },
  'know-product': {
    id: 'know-product',
    title: 'Know your Product',
    titleSmall: 'Know your\nProduct',
    iconLabel: 'Product',
    icon: <LocalMallOutlinedIcon />,
    gradient: 'linear-gradient(135deg, #B47CFF 0%, #7C5CFF 100%)',
    solidBg: '#A78BFA',
    route: '/demo/kyp/scan',
    supportedSizes: ['small', 'medium', 'large'],
    defaultSize: 'medium',
    style: 'launcher',
    useSummary: () => useModuleSummary('know-product'),
  },
  'know-customer': {
    id: 'know-customer',
    title: 'Know your Customer',
    titleSmall: 'Know your\nCustomer',
    iconLabel: 'Customer',
    icon: <PeopleAltOutlinedIcon />,
    gradient: 'linear-gradient(135deg, #FF8AB1 0%, #E5345C 100%)',
    solidBg: '#F472B6',
    route: '/demo/kyc',
    supportedSizes: ['small', 'medium', 'large'],
    defaultSize: 'medium',
    style: 'launcher',
    useSummary: () => useModuleSummary('know-customer'),
  },
  'ask-owner': {
    id: 'ask-owner',
    title: 'Ask your Owner',
    titleSmall: 'Ask your\nOwner',
    iconLabel: 'Owner',
    icon: <AutoAwesomeIcon />,
    gradient: tokens.gradient.aiAurora,
    solidBg: '#818CF8',
    supportedSizes: ['small', 'medium', 'large'],
    defaultSize: 'medium',
    style: 'launcher',
    useSummary: () => useModuleSummary('ask-owner'),
  },
  procurement: {
    id: 'procurement',
    title: 'Procurement',
    icon: <LocalShippingOutlinedIcon />,
    gradient: tokens.gradient.sop,
    solidBg: '#FBBF24',
    route: '/demo/procurement',
    supportedSizes: ['small', 'medium', 'large'],
    defaultSize: 'medium',
    style: 'launcher',
    useSummary: () => useModuleSummary('procurement'),
  },
  campaigns: {
    id: 'campaigns',
    title: 'Your Campaigns',
    titleSmall: 'Your\nCampaigns',
    icon: <CampaignOutlinedIcon />,
    gradient: 'linear-gradient(135deg, #FF6FA8 0%, #E54E8A 100%)',
    solidBg: '#E54E8A',
    route: '/demo/campaigns',
    supportedSizes: ['small', 'medium', 'large'],
    defaultSize: 'medium',
    useSummary: () => useModuleSummary('campaigns'),
    renderContent: renderCampaigns,
  },
  'task-management': {
    id: 'task-management',
    title: 'Task Management',
    icon: <ChecklistRtlOutlinedIcon />,
    gradient: tokens.gradient.tasks,
    solidBg: '#2DD4BF',
    route: '/demo/tasks',
    supportedSizes: ['small', 'medium', 'large'],
    defaultSize: 'medium',
    useSummary: () => useModuleSummary('task-management'),
    renderContent: renderTasks,
  },
};

/**
 * Default home layout — matches the wireframe order:
 *   Sales (medium) + Lead (small)
 *   Inventory (large)
 *   Know-Product + Know-Customer + Ask-Owner (small × 3)
 *   Procurement (small) + Task-Management (medium)
 */
/**
 * Default home layout — iPhone-style app icons that are always present.
 * Pinned items are locked to 'small' and cannot be removed; users add widgets
 * (medium/large) via the Add Widget gallery and those appear after the icons.
 */
export const defaultHomeLayout: TileLayoutItem[] = [
  { instanceId: 'sales-orders', moduleId: 'sales-orders', size: 'small', pinned: true },
  { instanceId: 'lead', moduleId: 'lead', size: 'small', pinned: true },
  { instanceId: 'inventory', moduleId: 'inventory', size: 'small', pinned: true },
  { instanceId: 'task-management', moduleId: 'task-management', size: 'small', pinned: true },
  { instanceId: 'campaigns', moduleId: 'campaigns', size: 'small', pinned: true },
  { instanceId: 'know-product', moduleId: 'know-product', size: 'small', pinned: true },
  { instanceId: 'know-customer', moduleId: 'know-customer', size: 'small', pinned: true },
  { instanceId: 'ask-owner', moduleId: 'ask-owner', size: 'small', pinned: true },
  { instanceId: 'procurement', moduleId: 'procurement', size: 'small', pinned: true },
];

export const listModules = (): ModuleConfig[] => Object.values(moduleRegistry);
