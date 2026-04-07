"use client";

import { useEffect, useRef } from "react";

const socials = [
  { label: "Email", value: "hilaytrivedi1224@gmail.com", href: "mailto:hilaytrivedi1224@gmail.com", mono: true },
  { label: "LinkedIn", value: "linkedin.com/in/hilay-trivedi", href: "https://linkedin.com/in/hilay-trivedi", mono: false },
  { label: "GitHub", value: "github.com/HILAYTRIVEDI", href: "https://github.com/HILAYTRIVEDI", mono: false },
  { label: "WordPress", value: "wp.org/hilayt24", href: "https://wp.org/hilayt24", mono: false },
  { label: "Phone", value: "+91 7600196374", href: "tel:+917600196374", mono: true },
];

export default function Contact() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 100);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="contact"
      ref={ref}
      style={{
        position: "relative",
        paddingTop: "160px",
        paddingBottom: "80px",
        borderTop: "1px solid var(--border)",
        zIndex: 1,
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse 60% 40% at 50% 100%, rgba(200,255,0,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="ht-container" style={{ position: "relative" }}>
        {/* Heading block */}
        <div
          className="reveal"
          style={{ textAlign: "center", marginBottom: "64px" }}
        >
          <div
            className="section-label"
            style={{ marginBottom: "24px", justifyContent: "center" }}
          >
            Contact
          </div>

          <h2
            className="ht-font-display"
            style={{
              fontWeight: 800,
              fontSize: "clamp(40px, 6vw, 80px)",
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              color: "var(--white)",
            }}
          >
            Let&apos;s build something<br />
            <span style={{ color: "var(--lime)" }}>extraordinary</span>
            <span style={{ color: "var(--white)" }}>.</span>
          </h2>

          <p
            style={{
              marginTop: "24px",
              maxWidth: "480px",
              marginLeft: "auto",
              marginRight: "auto",
              color: "var(--white-60)",
              fontSize: "15px",
              lineHeight: "1.8",
            }}
          >
            Available for full-time remote-first roles at WordPress agencies and
            product companies worldwide. Also open to consulting, technical
            reviews, and open-source collaboration.
          </p>

          <div style={{ marginTop: "40px" }}>
            <a
              href="mailto:hilaytrivedi1224@gmail.com"
              className="ht-font-display"
              style={{
                fontWeight: 700,
                fontSize: "16px",
                padding: "16px 40px",
                borderRadius: "2px",
                background: "var(--lime)",
                color: "var(--bg)",
                textDecoration: "none",
                display: "inline-block",
                letterSpacing: "0.03em",
                transition: "transform 0.2s ease",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.transform = "scale(1.03)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.transform = "scale(1)")}
            >
              Send me a message
            </a>
          </div>
        </div>

        {/* Socials grid */}
        <div
          className="reveal"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            gap: "12px",
          }}
        >
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target={social.href.startsWith("mailto") || social.href.startsWith("tel") ? "_self" : "_blank"}
              rel="noopener noreferrer"
              className="skill-group"
              style={{ textDecoration: "none", display: "block", transition: "border-color 0.2s ease" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "var(--border-hover)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "var(--border)")}
            >
              <div
                className="ht-font-mono"
                style={{ fontSize: "10px", color: "var(--white-60)", letterSpacing: "0.12em", marginBottom: "8px" }}
              >
                {social.label.toUpperCase()}
              </div>
              <div
                className={social.mono ? "ht-font-mono" : "ht-font-display"}
                style={{
                  fontSize: social.mono ? "11px" : "13px",
                  fontWeight: social.mono ? 400 : 600,
                  color: "var(--white-60)",
                  wordBreak: "break-all",
                }}
              >
                {social.value}
              </div>
            </a>
          ))}
        </div>

        {/* Footer */}
        <div
          style={{
            marginTop: "96px",
            paddingTop: "32px",
            borderTop: "1px solid var(--border)",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
          }}
        >
          <div className="ht-font-display" style={{ fontWeight: 700, color: "var(--white-60)", fontSize: "13px" }}>
            HILAY TRIVEDI<span style={{ color: "var(--lime)" }}>.</span>
          </div>
          <div className="ht-font-mono" style={{ color: "var(--white-60)", fontSize: "11px", letterSpacing: "0.08em" }}>
            Built with Next.js · Ahmedabad, India · {new Date().getFullYear()}
          </div>
          <div className="ht-font-mono" style={{ color: "var(--white-60)", fontSize: "11px" }}>
            <span style={{ color: "var(--lime)" }}>Available</span> for remote roles
          </div>
        </div>
      </div>
    </section>
  );
}
