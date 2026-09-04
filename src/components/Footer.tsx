"use client";

const SHOP_LINKS = [
  { label: "New Arrivals", href: "#new-arrivals" },
  { label: "Dresses", href: "#dresses" },
  { label: "Kurtis", href: "#kurtis" },
  { label: "Co-ords", href: "#coords" },
  { label: "Tops", href: "#tops" },
  { label: "Ethnic", href: "#ethnic" },
  { label: "Sale", href: "#sale" },
];

const HELP_LINKS = [
  { label: "Contact Us", href: "#contact" },
  { label: "Shipping", href: "#shipping" },
  { label: "Returns", href: "#returns" },
  { label: "Size Guide", href: "#size-guide" },
  { label: "Track Order", href: "#track" },
  { label: "FAQs", href: "#faqs" },
];

const ABOUT_LINKS = [
  { label: "Our Story", href: "#about" },
  { label: "Instagram", href: "https://instagram.com/aavyaboutique" },
  { label: "WhatsApp", href: "https://wa.me/919000000000" },
  { label: "Contact", href: "#contact" },
];

const PAYMENT_ICONS = [
  { name: "Visa", symbol: "VISA" },
  { name: "Mastercard", symbol: "MC" },
  { name: "UPI", symbol: "UPI" },
  { name: "Razorpay", symbol: "RP" },
  { name: "Net Banking", symbol: "NB" },
];

export default function Footer() {
  return (
    <footer
      id="footer"
      aria-label="Site footer"
      style={{
        backgroundColor: "var(--color-charcoal)",
        color: "var(--color-ivory)",
        paddingTop: "4rem",
      }}
    >
      <div className="container-brand">
        {/* Top — Logo + tagline + columns */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "2.5rem 2rem",
          }}
          className="md:grid-cols-[1.5fr_1fr_1fr_1fr_1fr]"
        >
          {/* Brand column */}
          <div
            style={{ gridColumn: "1 / -1" }}
            className="md:col-span-1 md:col-start-1"
          >
            <a
              href="/"
              aria-label="Aavya Boutique home"
              style={{ textDecoration: "none", display: "inline-block", marginBottom: "1rem" }}
            >
              <span
                style={{
                  display: "block",
                  fontFamily: "var(--font-display)",
                  fontSize: "2rem",
                  fontWeight: 400,
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "var(--color-ivory)",
                  lineHeight: 1,
                }}
              >
                AAVYA
              </span>
              <span
                style={{
                  display: "block",
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.55rem",
                  letterSpacing: "0.4em",
                  textTransform: "uppercase",
                  color: "rgba(248,245,240,0.4)",
                  marginTop: "4px",
                }}
              >
                BOUTIQUE
              </span>
            </a>

            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.825rem",
                color: "rgba(248,245,240,0.5)",
                lineHeight: 1.7,
                maxWidth: "28ch",
                marginBottom: "1.25rem",
              }}
            >
              Contemporary women's fashion curated in Kochi. Delivered across India.
            </p>

            <div style={{ display: "flex", gap: "1rem" }}>
              <a
                href="https://instagram.com/aavyaboutique"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                style={{ color: "rgba(248,245,240,0.45)", transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-ivory)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(248,245,240,0.45)")}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://wa.me/919000000000"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                style={{ color: "rgba(248,245,240,0.45)", transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-ivory)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(248,245,240,0.45)")}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Shop column */}
          <FooterColumn title="Shop" links={SHOP_LINKS} />

          {/* Help column */}
          <FooterColumn title="Help" links={HELP_LINKS} />

          {/* About column */}
          <FooterColumn title="About" links={ABOUT_LINKS} />

          {/* Contact column */}
          <div>
            <h3
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.65rem",
                fontWeight: 500,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(248,245,240,0.4)",
                marginBottom: "1rem",
              }}
            >
              Contact
            </h3>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.8rem",
                color: "rgba(248,245,240,0.55)",
                lineHeight: 1.7,
              }}
            >
              Kochi, Kerala
              <br />
              India
              <br />
              <br />
              All India Delivery
            </p>
            <a
              href="https://wa.me/919000000000"
              target="_blank"
              rel="noopener noreferrer"
              id="footer-whatsapp"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                marginTop: "1.25rem",
                fontFamily: "var(--font-sans)",
                fontSize: "0.7rem",
                fontWeight: 500,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--color-ivory)",
                textDecoration: "none",
                borderBottom: "1px solid rgba(248,245,240,0.2)",
                paddingBottom: "2px",
                transition: "border-color 0.2s",
              }}
            >
              Chat on WhatsApp →
            </a>
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            height: "1px",
            backgroundColor: "rgba(248,245,240,0.08)",
            margin: "3rem 0 1.5rem",
          }}
        />

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1rem",
            paddingBottom: "1.5rem",
          }}
        >
          {/* Copyright */}
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.72rem",
              color: "rgba(248,245,240,0.3)",
              letterSpacing: "0.04em",
            }}
          >
            © 2026 Aavya Boutique. All rights reserved.
          </p>

          {/* Legal Links */}
          <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
            {["Privacy Policy", "Terms", "Shipping Policy", "Returns"].map((link) => (
              <a
                key={link}
                href="#"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.7rem",
                  color: "rgba(248,245,240,0.3)",
                  textDecoration: "none",
                  transition: "color 0.2s",
                  letterSpacing: "0.04em",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(248,245,240,0.6)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(248,245,240,0.3)")}
              >
                {link}
              </a>
            ))}
          </div>

          {/* Payment Icons */}
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            {PAYMENT_ICONS.map((icon) => (
              <div
                key={icon.name}
                title={icon.name}
                style={{
                  backgroundColor: "rgba(248,245,240,0.07)",
                  border: "1px solid rgba(248,245,240,0.1)",
                  padding: "0.2rem 0.5rem",
                  borderRadius: "2px",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.55rem",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    color: "rgba(248,245,240,0.4)",
                  }}
                >
                  {icon.symbol}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h3
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "0.65rem",
          fontWeight: 500,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "rgba(248,245,240,0.4)",
          marginBottom: "1rem",
        }}
      >
        {title}
      </h3>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.625rem" }}>
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.825rem",
                color: "rgba(248,245,240,0.55)",
                textDecoration: "none",
                transition: "color 0.2s",
                display: "inline-block",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-ivory)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(248,245,240,0.55)")}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
