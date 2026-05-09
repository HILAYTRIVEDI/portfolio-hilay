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
              setTimeout(() => el.classList.add("visible"), i * 90);
            });
          }
        });
      },
      { threshold: 0.08 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="contact" ref={ref} style={{
      position: "relative",
      paddingTop: "160px", paddingBottom: "80px",
      borderTop: "1px solid var(--border)",
      zIndex: 1,
    }}>
      {/* Background glow */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(200,255,0,0.05) 0%, transparent 65%)",
      }} aria-hidden="true" />

      <div className="ht-container" style={{ position: "relative" }}>
        {/* Heading block */}
        <div className="reveal" style={{ textAlign: "center", marginBottom: "64px" }}>
          <div className="section-label" style={{ marginBottom: "24px", justifyContent: "center" }}>
            Contact
          </div>

          <h2 className="ht-font-display" style={{
            fontWeight: 700,
            fontSize: "clamp(40px, 7vw, 92px)",
            letterSpacing: "-0.04em",
            lineHeight: 1.02,
            color: "var(--white)",
          }}>
            Let&apos;s build something
            <br />
            <span style={{
              background: "linear-gradient(135deg, var(--lime) 0%, #a3cc00 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              extraordinary
            </span>
            <span style={{ color: "var(--white)" }}>.</span>
          </h2>

          <p style={{
            marginTop: "24px",
            maxWidth: "460px",
            marginLeft: "auto", marginRight: "auto",
            color: "var(--white-60)",
            fontSize: "15px", lineHeight: "1.85",
          }}>
            Available for full-time remote-first roles at WordPress agencies and product
            companies worldwide. Also open to consulting, technical reviews, and open-source
            collaboration.
          </p>

          {/* Availability badge */}
          <div style={{ marginTop: "24px", display: "flex", justifyContent: "center" }}>
            <div className="status-badge">
              <span className="dot" />
              Available · Responding within 24 hours
            </div>
          </div>

          <div style={{ marginTop: "36px" }}>
            <a href="mailto:hilaytrivedi1224@gmail.com"
              className="ht-font-display" style={{
                fontWeight: 600,
                fontSize: "15px",
                padding: "16px 40px",
                borderRadius: "8px",
                background: "var(--lime)",
                color: "var(--bg)",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                letterSpacing: "0.01em",
                transition: "transform 0.25s ease, box-shadow 0.25s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = "translateY(-2px)";
                el.style.boxShadow = "0 12px 32px rgba(200,255,0,0.3)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = "translateY(0)";
                el.style.boxShadow = "none";
              }}>
              Send me a message
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14m-7-7 7 7-7 7"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Socials grid */}
        <div className="reveal" style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: "10px",
        }}>
          {socials.map((social) => (
            <a key={social.label} href={social.href}
              target={social.href.startsWith("mailto") || social.href.startsWith("tel") ? "_self" : "_blank"}
              rel="noopener noreferrer"
              className="skill-group" style={{
                textDecoration: "none", display: "block",
                transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "rgba(200,255,0,0.22)";
                el.style.boxShadow = "0 4px 20px rgba(0,0,0,0.3)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "var(--border)";
                el.style.boxShadow = "none";
              }}>
              <div className="ht-font-mono" style={{
                fontSize: "10px", color: "var(--white-60)",
                letterSpacing: "0.12em", marginBottom: "8px",
              }}>
                {social.label.toUpperCase()}
              </div>
              <div className={social.mono ? "ht-font-mono" : "ht-font-display"} style={{
                fontSize: social.mono ? "11px" : "13px",
                fontWeight: social.mono ? 400 : 600,
                color: "var(--white-60)",
                wordBreak: "break-all",
                lineHeight: "1.4",
              }}>
                {social.value}
              </div>
            </a>
          ))}
        </div>

        {/* Footer */}
        <div style={{
          marginTop: "96px", paddingTop: "32px",
          borderTop: "1px solid var(--border)",
          display: "flex", flexWrap: "wrap",
          alignItems: "center", justifyContent: "space-between", gap: "16px",
        }}>
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
