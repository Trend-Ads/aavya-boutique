"use client";

const INSTA_IMAGES = [
  { id: "ig-1", src: "/images/insta-1.jpg", alt: "Satin midi dress — @aavyaboutique.in" },
  { id: "ig-2", src: "/images/insta-2.jpg", alt: "Sage linen co-ord — @aavyaboutique.in" },
  { id: "ig-3", src: "/images/insta-3.jpg", alt: "Block print kurta — @aavyaboutique.in" },
  { id: "ig-4", src: "/images/insta-4.jpg", alt: "Teal anarkali — @aavyaboutique.in" },
  { id: "ig-5", src: "/images/insta-5.jpg", alt: "Off-shoulder linen top — @aavyaboutique.in" },
  { id: "ig-6", src: "/images/insta-6.jpg", alt: "Editorial burgundy co-ord — @aavyaboutique.in" },
];

export default function InstagramSection() {
  return (
    <section
      id="instagram"
      aria-label="Aavya Boutique on Instagram"
      style={{
        backgroundColor: "var(--color-ivory)",
        paddingTop: "4rem",
        paddingBottom: "4rem",
      }}
    >
      <div className="container-brand">
        {/* Header */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "2rem",
          }}
        >
          <p className="section-eyebrow" style={{ marginBottom: "0.5rem" }}>
            Instagram
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.75rem, 5vw, 2.5rem)",
              fontWeight: 400,
              color: "var(--color-charcoal)",
              marginBottom: "0.5rem",
            }}
          >
            Follow the Aavya Edit
          </h2>
          <a
            href="https://www.instagram.com/aavyaboutique.in"
            target="_blank"
            rel="noopener noreferrer"
            id="instagram-handle"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.8rem",
              color: "var(--color-taupe)",
              textDecoration: "none",
              letterSpacing: "0.06em",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-charcoal)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-taupe)")}
          >
            @aavyaboutique.in
          </a>
        </div>

        {/* Photo Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "0.5rem",
          }}
          className="md:grid-cols-3 lg:grid-cols-6"
        >
          {INSTA_IMAGES.map((img) => (
            <a
              key={img.id}
              href="https://www.instagram.com/aavyaboutique.in"
              target="_blank"
              rel="noopener noreferrer"
              id={img.id}
              aria-label={img.alt}
              style={{
                display: "block",
                position: "relative",
                aspectRatio: "1/1",
                overflow: "hidden",
                backgroundColor: "var(--color-cream)",
              }}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center top",
                  transition: "transform 0.5s var(--ease-smooth)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.06)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              />
              {/* Hover overlay */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundColor: "rgba(23,23,23,0)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "background-color 0.3s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(23,23,23,0.35)")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(23,23,23,0)")}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  style={{ opacity: 0, transition: "opacity 0.3s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "0")}
                  aria-hidden="true"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </div>
            </a>
          ))}
        </div>

        {/* Follow CTA */}
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <a
            href="https://www.instagram.com/aavyaboutique.in"
            target="_blank"
            rel="noopener noreferrer"
            id="instagram-follow-cta"
            className="btn-outline"
            style={{ display: "inline-flex" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" style={{ marginRight: 6 }} aria-hidden="true">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
            Follow Us →
          </a>
        </div>
      </div>
    </section>
  );
}
