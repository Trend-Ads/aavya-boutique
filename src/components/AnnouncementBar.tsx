"use client";

export default function AnnouncementBar() {
  const message =
    "FREE SHIPPING ACROSS INDIA  •  EASY RETURNS  •  SHOP THE NEW EDIT  •  USE CODE AAVYA10 FOR 10% OFF  •  FREE SHIPPING ACROSS INDIA  •  EASY RETURNS  •  SHOP THE NEW EDIT  •  USE CODE AAVYA10 FOR 10% OFF  •  ";

  return (
    <div
      className="relative overflow-hidden bg-charcoal text-ivory"
      style={{ height: "34px" }}
      role="marquee"
      aria-label="Site announcement"
    >
      <div className="flex h-full items-center">
        <div className="animate-marquee whitespace-nowrap">
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.62rem",
              letterSpacing: "0.16em",
              fontWeight: 500,
            }}
          >
            {message}
          </span>
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.62rem",
              letterSpacing: "0.16em",
              fontWeight: 500,
            }}
          >
            {message}
          </span>
        </div>
      </div>
    </div>
  );
}
