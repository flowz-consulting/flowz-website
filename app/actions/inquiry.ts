"use server";

import { email } from "@/content/site";
import { spendBandLabel, type Currency } from "@/lib/currency";
import {
  honeypotFilled,
  parseInquiry,
  type InquiryInput,
  type InquiryState,
} from "@/lib/inquiry";

const sendError = `We could not send your request just now. Please email ${email} instead.`;

const WEBHOOK_PATTERN =
  /^https:\/\/(?:discord\.com|discordapp\.com)\/api\/webhooks\/\d+\/[\w.-]+(?:\?thread_id=\d+)?$/;

function webhookUrl() {
  const value = process.env.DISCORD_WEBHOOK_URL?.trim();
  if (!value || value.length > 500 || !WEBHOOK_PATTERN.test(value)) return null;
  return value;
}

function clip(value: string, max: number) {
  const cleaned = value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "").trim();
  const text = cleaned || "Not provided";
  return text.length > max ? `${text.slice(0, max - 1)}…` : text;
}

function describeSpend(band: string, currency: Currency) {
  if (!band) return "Not provided";
  return spendBandLabel(band, currency) || "Not provided";
}

function discordBody(value: InquiryInput) {
  return {
    username: "Flowz",
    allowed_mentions: { parse: [] },
    embeds: [
      {
        title: clip(`Inquiry: ${value.company}`, 256),
        description: clip(value.message, 4096),
        color: 0x146c43,
        fields: [
          { name: "Name", value: clip(value.name, 256), inline: true },
          { name: "Work email", value: clip(value.email, 256), inline: true },
          { name: "Company", value: clip(value.company, 256), inline: true },
          { name: "Annual software spend", value: clip(value.spend, 256), inline: true },
          { name: "Software vendors", value: clip(value.vendors, 256), inline: true },
          { name: "Next major renewal", value: clip(value.renewal, 256), inline: true },
        ],
      },
    ],
  };
}

export async function submitInquiry(
  _previous: InquiryState,
  formData: FormData,
): Promise<InquiryState> {
  if (honeypotFilled(formData)) {
    return { status: "error", message: sendError };
  }

  const parsed = parseInquiry(formData);
  if (!parsed.ok) {
    return {
      status: "error",
      message: "Check the highlighted fields and try again.",
      fieldErrors: parsed.fieldErrors,
    };
  }

  const webhook = webhookUrl();
  if (!webhook) {
    console.error("Inquiry Discord webhook is not configured");
    return { status: "error", message: sendError };
  }

  const endpoint = webhook.includes("?") ? `${webhook}&wait=true` : `${webhook}?wait=true`;
  const spend = describeSpend(parsed.value.spend, parsed.value.currency);

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(discordBody({ ...parsed.value, spend })),
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      console.error("Inquiry Discord delivery failed", response.status);
      return { status: "error", message: sendError };
    }
  } catch (error) {
    console.error(
      "Inquiry Discord delivery failed",
      error instanceof Error ? error.name : "unknown",
    );
    return { status: "error", message: sendError };
  }

  return {
    status: "success",
    message: `Request received. We will reply to ${parsed.value.email}.`,
  };
}
