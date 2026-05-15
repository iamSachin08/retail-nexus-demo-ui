export const formatINR = (n: number): string => {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(1)}Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
  if (n >= 1000) return `₹${(n / 1000).toFixed(1)}K`;
  return `₹${n}`;
};

export const formatPct = (n: number, withSign = false): string => {
  const sign = withSign && n > 0 ? '+' : '';
  return `${sign}${n.toFixed(n < 10 ? 1 : 0)}%`;
};

export const greetingFor = (now = new Date()): string => {
  const h = now.getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
};
