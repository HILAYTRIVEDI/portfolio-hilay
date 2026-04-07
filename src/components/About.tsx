"use client";

import { useEffect, useRef } from "react";

export default function About() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 120);
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
      id="about"
      ref={ref}
      style={{
        position: "relative",
        paddingTop: "128px",
        paddingBottom: "128px",
        borderTop: "1px solid var(--border)",
        zIndex: 1,
      }}
    >
      <div className="ht-container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "64px",
            alignItems: "start",
          }}
        >
          {/* Left */}
          <div className="reveal">
            <div className="section-label" style={{ marginBottom: "32px" }}>About</div>
            <h2
              className="ht-font-display"
              style={{
                fontWeight: 800,
                fontSize: "clamp(36px, 4vw, 54px)",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                color: "var(--white)",
              }}
            >
              I build systems<br />
              that <span style={{ color: "var(--lime)" }}>scale</span>.
            </h2>

            <p style={{ marginTop: "24px", color: "var(--white-60)", lineHeight: "1.8", fontSize: "15px" }}>
              I&apos;m a Senior Software Engineer at{" "}
              <a href="https://rtcamp.com" target="_blank" rel="noopener noreferrer"
                className="hover-underline" style={{ color: "var(--white)" }}>
                rtCamp
              </a>
              , a WordPress VIP Gold Agency, where I&apos;ve spent three years building
              enterprise-grade products for Canada&apos;s largest media house, U.S.-based fintech firms,
              and global publishing platforms.
            </p>

            <p style={{ marginTop: "16px", color: "var(--white-60)", lineHeight: "1.8", fontSize: "15px" }}>
              I specialise in WordPress VIP architecture — custom plugin development, REST API design,
              headless CMS with Next.js and GraphQL, and Gutenberg/FSE block development.
              I own projects end-to-end: client consultation, system design, sprint planning,
              delivery, and post-launch optimisation.
            </p>

            <p style={{ marginTop: "16px", color: "var(--white-60)", lineHeight: "1.8", fontSize: "15px" }}>
              Outside client work, I build full-stack AI products and contribute to
              WordPress Core, Gutenberg, and open-source plugins.
            </p>

            <div style={{ marginTop: "32px", display: "flex", flexWrap: "wrap", gap: "12px" }}>
              {[
                { label: "LinkedIn ↗", href: "https://linkedin.com/in/hilay-trivedi" },
                { label: "GitHub ↗", href: "https://github.com/HILAYTRIVEDI" },
                { label: "WordPress.org ↗", href: "https://wp.org/hilayt24" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ht-font-mono"
                  style={{
                    fontSize: "12px",
                    padding: "8px 16px",
                    borderRadius: "2px",
                    border: "1px solid var(--border)",
                    color: "var(--white-60)",
                    textDecoration: "none",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "var(--lime)";
                    el.style.color = "var(--lime)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "var(--border)";
                    el.style.color = "var(--white-60)";
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Right: stats grid */}
          <div
            className="reveal"
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}
          >
            {[
              { num: "5+", label: "Years of Experience", detail: "Enterprise WordPress & full-stack" },
              { num: "200+", label: "Landing Pages Shipped", detail: "Delivered in 6 weeks with a team of 8" },
              { num: "32%", label: "Sales Increase", detail: "Directly attributed to a VIP project I led" },
              { num: "200%", label: "Visitor Growth", detail: "Daily traffic doubled post-launch" },
              { num: "34%", label: "Revenue Lift", detail: "Post-.NET → WordPress VIP migration" },
              { num: "168+", label: "Git Commits", detail: "On CreatorNexus AI alone" },
            ].map((s) => (
              <div key={s.label} className="skill-group">
                <div className="ht-font-display"
                  style={{ fontSize: "36px", fontWeight: 800, color: "var(--lime)", lineHeight: 1, letterSpacing: "-0.02em" }}>
                  {s.num}
                </div>
                <div className="ht-font-display"
                  style={{ marginTop: "8px", fontSize: "13px", fontWeight: 600, color: "var(--white)" }}>
                  {s.label}
                </div>
                <div style={{ marginTop: "4px", fontSize: "12px", color: "var(--white-30)" }}>
                  {s.detail}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
