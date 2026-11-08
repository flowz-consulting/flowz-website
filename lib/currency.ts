export const CURRENCIES = [
  "USD",
  "EUR",
  "GBP",
  "DKK",
  "SEK",
  "NOK",
  "CHF",
  "CAD",
  "AUD",
  "SGD",
  "JPY",
  "PLN",
] as const;

export type Currency = (typeof CURRENCIES)[number];

export const SPEND_BANDS = [
  { id: "under-250k", ceiling: 250_000 },
  { id: "250k-1m", floor: 250_000, ceiling: 1_000_000 },
  { id: "1m-5m", floor: 1_000_000, ceiling: 5_000_000 },
  { id: "5m-20m", floor: 5_000_000, ceiling: 20_000_000 },
  { id: "20m-plus", floor: 20_000_000 },
  { id: "not-sure" },
] as const;

export type SpendBandId = (typeof SPEND_BANDS)[number]["id"];

const CURRENCY_SET = new Set<string>(CURRENCIES);
const BAND_SET = new Set<string>(SPEND_BANDS.map((band) => band.id));

export function isCurrency(value: string): value is Currency {
  return CURRENCY_SET.has(value);
}

export function isSpendBand(value: string): value is SpendBandId {
  return BAND_SET.has(value);
}

export function formatMoney(amount: number, currency: Currency) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function spendBandLabel(bandId: string, currency: Currency) {
  const band = SPEND_BANDS.find((item) => item.id === bandId);
  if (!band) return "";
  if (band.id === "not-sure") return "Not sure";

  const money = (amount: number) => formatMoney(amount, currency);

  if ("ceiling" in band && !("floor" in band)) return `Under ${money(band.ceiling)}`;
  if ("floor" in band && "ceiling" in band) return `${money(band.floor)}–${money(band.ceiling)}`;
  if ("floor" in band) return `${money(band.floor)}+`;
  return "";
}
