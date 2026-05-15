import { useTheme } from '@mui/material';
import ReactECharts from 'echarts-for-react';
import type { EChartsOption } from 'echarts';
import { useMemo } from 'react';

interface EChartProps {
  option: EChartsOption;
  height?: number | string;
  style?: React.CSSProperties;
}

export function EChart({ option, height = 220, style }: EChartProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const themed = useMemo<EChartsOption>(() => {
    const axisColor = isDark ? 'rgba(255,255,255,0.55)' : 'rgba(11,15,26,0.55)';
    const splitColor = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(11,15,26,0.06)';
    return {
      textStyle: {
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Inter", "Helvetica Neue", Arial, sans-serif',
        color: theme.palette.text.primary,
      },
      tooltip: {
        backgroundColor: isDark ? 'rgba(11,15,26,0.94)' : 'rgba(11,15,26,0.94)',
        borderColor: 'rgba(255,255,255,0.08)',
        borderWidth: 1,
        padding: [6, 10],
        textStyle: { color: '#fff', fontSize: 11 },
        extraCssText: 'border-radius:8px; box-shadow: 0 6px 18px rgba(11,15,26,0.18);',
        ...(option.tooltip ?? {}),
      },
      grid: {
        left: 8,
        right: 12,
        top: 16,
        bottom: 8,
        containLabel: true,
        ...(option.grid ?? {}),
      },
      ...option,
      xAxis: option.xAxis
        ? mergeAxis(option.xAxis, axisColor, splitColor)
        : option.xAxis,
      yAxis: option.yAxis
        ? mergeAxis(option.yAxis, axisColor, splitColor)
        : option.yAxis,
    } as EChartsOption;
  }, [option, isDark, theme.palette.text.primary]);

  return (
    <ReactECharts
      option={themed}
      style={{ height, width: '100%', ...style }}
      opts={{ renderer: 'svg' }}
      notMerge
      lazyUpdate
    />
  );
}

function mergeAxis(axis: unknown, axisColor: string, splitColor: string): unknown {
  if (Array.isArray(axis)) return axis.map(a => mergeAxisOne(a, axisColor, splitColor));
  return mergeAxisOne(axis, axisColor, splitColor);
}

function mergeAxisOne(axis: unknown, axisColor: string, splitColor: string): unknown {
  const a = (axis ?? {}) as Record<string, unknown>;
  return {
    axisLabel: { color: axisColor, fontSize: 10.5, ...((a.axisLabel as object) ?? {}) },
    axisLine: { lineStyle: { color: splitColor }, ...((a.axisLine as object) ?? {}) },
    axisTick: { show: false, ...((a.axisTick as object) ?? {}) },
    splitLine: { lineStyle: { color: splitColor }, ...((a.splitLine as object) ?? {}) },
    ...a,
  };
}
