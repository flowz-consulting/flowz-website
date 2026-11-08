import { ImageResponse } from "next/og";

export const shareSize = { width: 1200, height: 630 };

export const shareAlt =
  "Flowz. Stop overpaying for software. No upfront fee. 20% of verified first-year savings.";

export function createShareImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#ffffff",
          color: "#141414",
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 20,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#146c43",
            }}
          >
            Software procurement and renewal negotiation
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 32,
              fontSize: 72,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              maxWidth: 920,
            }}
          >
            Stop overpaying for software.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: 32,
          }}
        >
          <div style={{ display: "flex", fontSize: 28, lineHeight: 1.35, color: "#5c5c5c", maxWidth: 760 }}>
            No upfront fee · 20% of first-year savings · No savings, no fee
          </div>
          <div style={{ display: "flex", fontSize: 36 }}>Flowz</div>
        </div>
      </div>
    ),
    shareSize,
  );
}
