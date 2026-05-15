import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import ChecklistRtlOutlinedIcon from '@mui/icons-material/ChecklistRtlOutlined';
import { tokens } from '../theme/tokens';
import { useModuleSummary } from '../hooks/useModuleSummary';
import type { ModuleConfig, TileLayoutItem } from '../types/module';
import { renderSales, renderLead, renderInventory, renderTasks } from './renderers';

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
    icon: <LocalMallOutlinedIcon />,
    gradient: 'linear-gradient(135deg, #B47CFF 0%, #7C5CFF 100%)',
    solidBg: '#A78BFA',
    route: '/product-selector',
    supportedSizes: ['small', 'medium', 'large'],
    defaultSize: 'medium',
    style: 'launcher',
    useSummary: () => useModuleSummary('know-product'),
  },
  'know-customer': {
    id: 'know-customer',
    title: 'Know your Customer',
    titleSmall: 'Know your\nCustomer',
    icon: <PeopleAltOutlinedIcon />,
    gradient: 'linear-gradient(135deg, #FF8AB1 0%, #E5345C 100%)',
    solidBg: '#F472B6',
    route: '/customer',
    supportedSizes: ['small', 'medium', 'large'],
    defaultSize: 'medium',
    style: 'launcher',
    useSummary: () => useModuleSummary('know-customer'),
  },
  'ask-owner': {
    id: 'ask-owner',
    title: 'Ask your Owner',
    titleSmall: 'Ask your\nOwner',
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
    route: '/procurement',
    supportedSizes: ['small', 'medium', 'large'],
    defaultSize: 'medium',
    style: 'launcher',
    useSummary: () => useModuleSummary('procurement'),
  },
  'task-management': {
    id: 'task-management',
    title: 'Task Management',
    icon: <ChecklistRtlOutlinedIcon />,
    gradient: tokens.gradient.tasks,
    solidBg: '#2DD4BF',
    route: '/daily-tracker',
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
export const defaultHomeLayout: TileLayoutItem[] = [
  { moduleId: 'sales-orders', size: 'medium' },
  { moduleId: 'lead', size: 'medium' },
  { moduleId: 'inventory', size: 'large' },
  { moduleId: 'task-management', size: 'large' },
  { moduleId: 'know-product', size: 'medium' },
  { moduleId: 'know-customer', size: 'medium' },
  { moduleId: 'ask-owner', size: 'medium' },
  { moduleId: 'procurement', size: 'medium' },
];

export const listModules = (): ModuleConfig[] => Object.values(moduleRegistry);
