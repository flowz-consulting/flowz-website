"use client";

import { useActionState, useEffect, useMemo, useRef, useState, type FormEvent, type ReactNode } from "react";
import { submitInquiry } from "@/app/actions/inquiry";
import { useCurrency } from "@/components/CurrencyProvider";
import { MenuSelect } from "@/components/MenuSelect";
import { site } from "@/content/site";
import { buttonClass, fieldClass } from "@/lib/classes";
import { SPEND_BANDS, spendBandLabel } from "@/lib/currency";
import {
  INQUIRY_FIELDS,
  RENEWAL_OPTIONS,
  VENDOR_OPTIONS,
  initialInquiryState,
  parseInquiry,
  type FieldErrors,
  type InquiryField,
} from "@/lib/inquiry";

export function LeadForm() {
  const { currency } = useCurrency();
  const [state, formAction, pending] = useActionState(submitInquiry, initialInquiryState);
  const [clientErrors, setClientErrors] = useState<FieldErrors>({});
  const [values, setValues] = useState({
    name: "",
    email: "",
    company: "",
    spend: "",
    vendors: "",
    renewal: "",
    message: "",
  });
  const alertRef = useRef<HTMLParagraphElement>(null);
  const fieldErrors =
    Object.keys(clientErrors).length > 0 ? clientErrors : (state.fieldErrors ?? {});
  const spendOptions = useMemo(
    () =>
      SPEND_BANDS.flatMap((band) => {
        const label = spendBandLabel(band.id, currency);
        return label ? [{ value: band.id, label }] : [];
      }),
    [currency],
  );
  const vendorOptions = useMemo(
    () => VENDOR_OPTIONS.map((option) => ({ value: option, label: option })),
    [],
  );
  const renewalOptions = useMemo(
    () => RENEWAL_OPTIONS.map((option) => ({ value: option, label: option })),
    [],
  );

  useEffect(() => {
    if (state.status !== "error") return;
    const first = INQUIRY_FIELDS.find((field) => state.fieldErrors?.[field]);
    if (first) {
      document.getElementById(`lead-${first}`)?.focus();
      return;
    }
    if (state.message) alertRef.current?.focus();
  }, [state]);

  function update(field: InquiryField, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    const parsed = parseInquiry(new FormData(event.currentTarget));
    if (!parsed.ok) {
      event.preventDefault();
      setClientErrors(parsed.fieldErrors);
      const first = INQUIRY_FIELDS.find((field) => parsed.fieldErrors[field]);
      if (first) document.getElementById(`lead-${first}`)?.focus();
      return;
    }
    setClientErrors({});
  }

  if (state.status === "success") {
    return (
      <div className="border border-line bg-background p-8" role="status" aria-live="polite">
        <h3 className="font-serif text-2xl tracking-tight">Request received</h3>
        <p className="mt-4 text-base leading-7 text-muted">{state.message}</p>
        <p className="mt-4 text-sm leading-6 text-muted">{site.contact.reassurance}</p>
      </div>
    );
  }

  return (
    <form action={formAction} onSubmit={onSubmit} noValidate className="relative space-y-5" aria-busy={pending}>
      {state.status === "error" && state.message ? (
        <p
          ref={alertRef}
          tabIndex={-1}
          role="alert"
          className="border border-danger/30 bg-background px-4 py-3 text-sm leading-6 text-danger outline-none"
        >
          {state.message}
        </p>
      ) : null}
      <Honeypot />
      <input type="hidden" name="currency" value={currency} />
      <TextField
        id="lead-name"
        name="name"
        label="Full name (required)"
        autoComplete="name"
        required
        maxLength={120}
        value={values.name}
        onChange={(value) => update("name", value)}
        error={fieldErrors.name}
      />
      <TextField
        id="lead-email"
        name="email"
        type="email"
        label="Work email (required)"
        autoComplete="email"
        required
        maxLength={200}
        value={values.email}
        onChange={(value) => update("email", value)}
        error={fieldErrors.email}
      />
      <TextField
        id="lead-company"
        name="company"
        label="Company name (required)"
        autoComplete="organization"
        required
        maxLength={160}
        value={values.company}
        onChange={(value) => update("company", value)}
        error={fieldErrors.company}
      />
      <MenuSelect
        id="lead-spend"
        name="spend"
        label="Approximate annual software spend (optional)"
        options={spendOptions}
        value={values.spend}
        onChange={(value) => update("spend", value)}
        error={fieldErrors.spend}
      />
      <MenuSelect
        id="lead-vendors"
        name="vendors"
        label="Approximate number of software vendors (optional)"
        options={vendorOptions}
        value={values.vendors}
        onChange={(value) => update("vendors", value)}
        error={fieldErrors.vendors}
      />
      <MenuSelect
        id="lead-renewal"
        name="renewal"
        label="Next major renewal (optional)"
        options={renewalOptions}
        value={values.renewal}
        onChange={(value) => update("renewal", value)}
        error={fieldErrors.renewal}
      />
      <TextField
        id="lead-message"
        name="message"
        label="Message (optional)"
        hint="Please do not include contracts or confidential pricing."
        maxLength={2000}
        multiline
        value={values.message}
        onChange={(value) => update("message", value)}
        error={fieldErrors.message}
      />
      <div className="pt-2">
        <button type="submit" className={buttonClass} disabled={pending}>
          {pending ? "Sending…" : site.contact.submit}
        </button>
        <p className="mt-4 text-sm leading-6 text-muted">{site.contact.reassurance}</p>
      </div>
    </form>
  );
}

function Honeypot() {
  return (
    <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
      <label htmlFor="company-website">Company website</label>
      <input
        id="company-website"
        name="company_website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
      />
    </div>
  );
}

function FieldShell({
  id,
  label,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
      </label>
      {hint ? (
        <p id={`${id}-hint`} className="mt-1 text-sm leading-6 text-muted">
          {hint}
        </p>
      ) : null}
      <div className="mt-2">{children}</div>
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-sm leading-6 text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function describedBy(id: string, hint: boolean, error?: string) {
  const ids = [hint ? `${id}-hint` : "", error ? `${id}-error` : ""].filter(Boolean);
  return ids.length > 0 ? ids.join(" ") : undefined;
}

function TextField({
  id,
  name,
  label,
  type = "text",
  autoComplete,
  required,
  maxLength,
  hint,
  multiline,
  value,
  onChange,
  error,
}: {
  id: string;
  name: InquiryField;
  label: string;
  type?: "text" | "email";
  autoComplete?: string;
  required?: boolean;
  maxLength: number;
  hint?: string;
  multiline?: boolean;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}) {
  const shared = {
    id,
    name,
    required,
    maxLength,
    value,
    onChange: (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      onChange(event.currentTarget.value),
    "aria-invalid": error ? true : undefined,
    "aria-describedby": describedBy(id, Boolean(hint), error),
    className: `${fieldClass} ${error ? "border-danger" : ""}`,
  };

  return (
    <FieldShell id={id} label={label} hint={hint} error={error}>
      {multiline ? <textarea {...shared} rows={5} /> : <input {...shared} type={type} autoComplete={autoComplete} />}
    </FieldShell>
  );
}

