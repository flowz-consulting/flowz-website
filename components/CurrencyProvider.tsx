"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { Currency } from "@/lib/currency";

type CurrencyState = {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
};

const CurrencyContext = createContext<CurrencyState | null>(null);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<Currency>("USD");
  const value = useMemo(() => ({ currency, setCurrency }), [currency]);

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useCurrency() {
  const value = useContext(CurrencyContext);
  if (!value) throw new Error("Currency is unavailable");
  return value;
}
