import type { ReactNode } from 'react';

export type TileSize = 'small' | 'medium' | 'large';

export interface TileSpan {
  xs: number;
  sm: number;
  md: number;
  aspect: number;
}

export const TILE_SPANS: Record<TileSize, TileSpan> = {
  // iPhone-style app-icon size: 4 small tiles per row (3/12 columns).
  // Spans align cleanly with medium (6/12) and large (12/12) for any mix.
  small: { xs: 3, sm: 3, md: 3, aspect: 1 },
  medium: { xs: 6, sm: 6, md: 6, aspect: 1 },
  large: { xs: 12, sm: 12, md: 12, aspect: 0.55 },
};

export type Tone = 'positive' | 'warning' | 'critical' | 'neutral' | 'info';

export interface MetricStat {
  label: string;
  value: string;
  total?: string;
  tone?: Tone;
}

export interface CTAButton {
  text: string;
  tone?: 'red' | 'amber' | 'success';
}

export interface ModuleSummary {
  /** iPhone-style count shown on the tile corner. */
  badge?: string | number;

  /** Primary KPI displayed prominently (e.g. "₹4.1L"). */
  primary?: string;
  primaryLabel?: string;
  secondary?: string;
  secondaryLabel?: string;
  tertiary?: string;
  deltaPct?: number;
  needsAttention?: boolean;
  context?: string;

  /** Module-specific structured fields (consumed by per-module renderers). */
  target?: string;
  vsYesterday?: string;
  vsYesterdayDelta?: number;
  health?: { score: number; label: string; tone?: Tone };
  conversion?: { converted: number; total: number; pct: number };
  topSource?: { label: string; meta: string };
  maxLeads?: { label: string; meta: string };
  demand?: string;
  statusBreakdown?: MetricStat[];
  prediction?: { headline: string; sub: string };
  pending?: number;
  pendingBreakdown?: MetricStat[];
  cta?: CTAButton;

  /** Campaigns module fields */
  liveCount?: number;
  performance?: { value: string; label: string };
  reachDelta?: number;
}

export type ModuleStyle = 'kpi' | 'launcher';

export interface ModuleConfig {
  id: string;
  title: string;
  /** Optional override for small tiles — supports "\n" for explicit line breaks. */
  titleSmall?: string;
  /**
   * Rendering style:
   *  - 'kpi'      → dark surface with rich KPI data (Sales, Lead, Inventory, Tasks)
   *  - 'launcher' → solid colored tile, centered icon + title (KYP, KYC, AYO, Procurement)
   * Default: 'kpi'.
   */
  style?: ModuleStyle;
  /** MUI icon node */
  icon: ReactNode;
  /** Accent gradient (from tokens). */
  gradient: string;
  /** Solid background color — used for app-icon small tiles + icon chip. */
  solidBg: string;
  /** Route to navigate to when tile is tapped (within existing app). */
  route?: string;
  /** Supported sizes — for the resize picker. */
  supportedSizes: TileSize[];
  defaultSize: TileSize;
  /** Hook that returns the peek summary for this module. */
  useSummary: () => { data: ModuleSummary | null; loading: boolean };
  /** Optional custom renderer for medium/large body content. */
  renderContent?: (props: { data: ModuleSummary; size: TileSize }) => ReactNode;
}

export interface TileLayoutItem {
  moduleId: string;
  size: TileSize;
}

export interface ModuleTileProps {
  config: ModuleConfig;
  size: TileSize;
}

/** Tone → color helper used by the per-module renderers. */
export const toneColor = (tone: Tone | undefined): string => {
  switch (tone) {
    case 'positive':
      return '#22C55E';
    case 'warning':
      return '#F59E0B';
    case 'critical':
      return '#EF4444';
    case 'info':
      return '#3B82F6';
    default:
      return 'rgba(255,255,255,0.78)';
  }
};
