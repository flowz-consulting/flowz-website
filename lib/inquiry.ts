import { isCurrency, isSpendBand, type Currency } from "@/lib/currency";

export const VENDOR_OPTIONS = [
  "Under 10",
  "10–30",
  "31–75",
  "76–150",
  "150+",
  "Not sure",
] as const;

export const RENEWAL_OPTIONS = [
  "Within 3 months",
  "3–6 months",
  "6–12 months",
  "Not sure",
] as const;

export const INQUIRY_FIELDS = [
  "name",
  "email",
  "company",
  "spend",
  "vendors",
  "renewal",
  "message",
] as const;

export type InquiryField = (typeof INQUIRY_FIELDS)[number];

export type FieldErrors = Partial<Record<InquiryField, string>>;

export type InquiryInput = {
  name: string;
  email: string;
  company: string;
  spend: string;
  currency: Currency;
  vendors: string;
  renewal: string;
  message: string;
};

export type InquiryState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: FieldErrors;
};

export const initialInquiryState: InquiryState = { status: "idle" };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function fieldText(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

function singleLine(value: string) {
  return value.replace(/[\r\n\t]+/g, " ").replace(/\s{2,}/g, " ").trim();
}

function allowed(value: string, options: readonly string[]) {
  return value === "" || options.includes(value);
}

export function honeypotFilled(formData: FormData) {
  const value = formData.get("company_website");
  return typeof value === "string" && value.trim() !== "";
}

export function parseInquiry(
  formData: FormData,
): { ok: true; value: InquiryInput } | { ok: false; fieldErrors: FieldErrors } {
  const fieldErrors: FieldErrors = {};
  const name = singleLine(fieldText(formData.get("name")));
  const email = singleLine(fieldText(formData.get("email"))).toLowerCase();
  const company = singleLine(fieldText(formData.get("company")));
  const spend = fieldText(formData.get("spend"));
  const currencyText = fieldText(formData.get("currency"));
  const currency = currencyText === "" ? "USD" : currencyText;
  const vendors = fieldText(formData.get("vendors"));
  const renewal = fieldText(formData.get("renewal"));
  const message = fieldText(formData.get("message"));

  if (name.length < 2 || name.length > 120) {
    fieldErrors.name = "Enter your full name.";
  }
  if (!EMAIL_PATTERN.test(email) || email.length > 200) {
    fieldErrors.email = "Enter a valid work email.";
  }
  if (company.length < 2 || company.length > 160) {
    fieldErrors.company = "Enter your company name.";
  }
  if ((spend !== "" && !isSpendBand(spend)) || !isCurrency(currency)) {
    fieldErrors.spend = "Choose a spend range from the list.";
  }
  if (!allowed(vendors, VENDOR_OPTIONS)) {
    fieldErrors.vendors = "Choose a vendor range from the list.";
  }
  if (!allowed(renewal, RENEWAL_OPTIONS)) {
    fieldErrors.renewal = "Choose a renewal window from the list.";
  }
  if (message.length > 2000) {
    fieldErrors.message = "Keep the message under 2,000 characters.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { ok: false, fieldErrors };
  }

  return {
    ok: true,
    value: {
      name,
      email,
      company,
      spend,
      currency: isCurrency(currency) ? currency : "USD",
      vendors,
      renewal,
      message,
    },
  };
}
