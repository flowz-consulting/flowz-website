"use client";

import { useId, useState } from "react";
import { MenuSelect } from "@/components/MenuSelect";
import { useCurrency } from "@/components/CurrencyProvider";
import { site } from "@/content/site";
import { fieldClass } from "@/lib/classes";
import { CURRENCIES, formatMoney, isCurrency } from "@/lib/currency";
import { illustrateSavings } from "@/lib/savings";

const rows = [
  { key: "nextCost", label: "New annual cost" },
  { key: "savings", label: "First-year savings" },
  { key: "fee", label: "Flowz fee, 20%" },
  { key: "net", label: "You keep" },
] as const;

const currencyOptions = CURRENCIES.map((code) => ({ value: code, label: code }));

export function SavingsCalculator() {
  const { currency, setCurrency } = useCurrency();
  const [spendInput, setSpendInput] = useState("100000");
  const [percent, setPercent] = useState(20);
  const exampleId = useId();
  const spend = Number(spendInput.replace(/[^\d]/g, "")) || 0;
  const result = illustrateSavings(spend, percent);

  function onPercent(value: string) {
    if (value.trim() === "") {
      setPercent(0);
      return;
    }
    const next = Number(value);
    if (!Number.isFinite(next)) return;
    setPercent(Math.min(80, Math.max(0, Math.round(next))));
  }

  function onCurrency(next: string) {
    if (!isCurrency(next) || next === currency) return;
    setCurrency(next);
  }

  return (
    <div className="mt-10 border border-line bg-background p-6 sm:p-8" aria-describedby={exampleId}>
      <p id={exampleId} className="text-sm font-medium text-foreground">
        {site.pricing.exampleLabel}
      </p>
      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12">
        <div className="space-y-6">
          <MenuSelect
            id="calc-currency"
            label="Currency"
            options={currencyOptions}
            value={currency}
            onChange={onCurrency}
          />
          <div>
            <label htmlFor="spend-before" className="text-sm font-medium text-foreground">
              Annual software cost
            </label>
            <input
              id="spend-before"
              className={`${fieldClass} mt-2`}
              inputMode="numeric"
              autoComplete="off"
              value={spendInput}
              onChange={(event) => {
                const digits = event.target.value.replace(/[^\d]/g, "").slice(0, 12);
                setSpendInput(digits);
              }}
            />
          </div>
          <div>
            <div className="flex items-end justify-between gap-4">
              <label htmlFor="savings-percent" className="text-sm font-medium text-foreground">
                Assumed savings percentage
              </label>
              <span className="font-serif text-2xl text-accent">{result.percent}%</span>
            </div>
            <input
              id="savings-percent"
              className={`${fieldClass} mt-2`}
              type="number"
              min={0}
              max={80}
              step={1}
              inputMode="numeric"
              value={percent}
              onChange={(event) => onPercent(event.target.value)}
            />
            <input
              className="mt-4 w-full accent-[#146c43]"
              type="range"
              min={0}
              max={80}
              step={1}
              aria-label="Assumed savings percentage slider"
              value={result.percent}
              onChange={(event) => onPercent(event.target.value)}
            />
          </div>
        </div>
        <dl className="divide-y divide-line border-y border-line">
          {rows.map((row) => (
            <div key={row.key} className="flex items-baseline justify-between gap-6 py-4">
              <dt className="text-sm text-muted">{row.label}</dt>
              <dd className="text-right font-serif text-xl tracking-tight text-foreground sm:text-2xl">
                {formatMoney(result[row.key], currency)}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
