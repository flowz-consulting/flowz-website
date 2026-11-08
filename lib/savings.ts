const MAX_SPEND = 100_000_000_000;
const MAX_PERCENT = 80;

export type SavingsIllustration = {
  spend: number;
  percent: number;
  nextCost: number;
  savings: number;
  fee: number;
  net: number;
};

export function illustrateSavings(spend: number, percent: number): SavingsIllustration {
  const safeSpend = Math.min(
    MAX_SPEND,
    Math.max(0, Number.isFinite(spend) ? Math.round(spend) : 0),
  );
  const safePercent = Math.min(
    MAX_PERCENT,
    Math.max(0, Number.isFinite(percent) ? Math.round(percent) : 0),
  );
  const savings = Math.round((safeSpend * safePercent) / 100);
  const fee = Math.round((savings * 20) / 100);

  return {
    spend: safeSpend,
    percent: safePercent,
    nextCost: safeSpend - savings,
    savings,
    fee,
    net: savings - fee,
  };
}
