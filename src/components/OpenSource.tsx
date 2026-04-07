"use client";

import { useEffect, useRef } from "react";

const contributions = [
  { label: "WordPress Core & Meta", detail: "Multiple merged SVN changesets across Core, Meta, and bbPress.", badge: "Contributor", href: "https://profiles.wordpress.org/hilayt24/" },
  { label: "Gutenberg", detail: "PRs merged into WordPress/gutenberg: block colour support updates and embedded preview block improvements.", badge: "Contributor", href: "https://github.com/WordPress/gutenberg" },
  { label: "RevisionBuster", detail: "Plugin author — published on WordPress.org with full WP-CLI support and admin UI.", badge: "Plugin Author", href: "https://wordpress.org/plugins/" },
  { label: "Translation Contributor", detail: "100+ strings translated for WooCommerce, Jetpack, and WordPress core in Gujarati.", badge: "GlotPress", href: "https://translate.wordpress.org/" },
  { label: "Built By WordPress (BBWPC)", detail: "Contributed PHP theme templates, block patterns, and SSR blocks to the global BBWPC open-source initiative.", badge: "Open Source", href: "https://github.com/WordPress" },
  { label: "Community", detail: "WordCamp Ahmedabad 2025 and WordCamp Asia 2026 attendee. Active WordPress Slack member.", badge: "WordCamp", href: "https://wordpress.org/news/category/wordcamp/" },
];

export default function OpenSource() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 80);
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
      ref={ref}
      className="section-mobile-pad"
      style={{
        position: "relative",
        paddingTop: "128px",
        paddingBottom: "128px",
        borderTop: "1px solid var(--border)",
        zIndex: 1,
      }}
    >
      <div className="ht-container">
        <div className="reveal" style={{ marginBottom: "48px" }}>
          <div className="section-label" style={{ marginBottom: "16px" }}>Open Source</div>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "16px" }}>
            <h2
              className="ht-font-display"
              style={{ fontWeight: 800, fontSize: "clamp(32px, 4vw, 48px)", letterSpacing: "-0.02em", color: "var(--white)", lineHeight: 1.1 }}
            >
              Giving back to the<br />
              <span style={{ color: "var(--lime)" }}>community</span>
            </h2>
            <a
              href="https://wp.org/hilayt24"
              target="_blank"
              rel="noopener noreferrer"
              className="ht-font-mono hover-underline"
              style={{ fontSize: "12px", color: "var(--lime)", textDecoration: "none" }}
            >
              WordPress.org profile →
            </a>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "16px",
          }}
        >
          {contributions.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="skill-group reveal"
              style={{ textDecoration: "none", display: "block" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "var(--border-hover)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "var(--border)")}
            >
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "12px", gap: "8px" }}>
                <h3 className="ht-font-display" style={{ fontSize: "15px", fontWeight: 600, color: "var(--white)" }}>
                  {item.label}
                </h3>
                <span
                  className="ht-font-mono"
                  style={{
                    fontSize: "10px",
                    padding: "2px 8px",
                    borderRadius: "2px",
                    background: "rgba(200,255,0,0.08)",
                    color: "var(--lime)",
                    border: "1px solid rgba(200,255,0,0.15)",
                    letterSpacing: "0.08em",
                    flexShrink: 0,
                  }}
                >
                  {item.badge}
                </span>
              </div>
              <p style={{ fontSize: "13px", color: "var(--white-60)", lineHeight: "1.6" }}>{item.detail}</p>
              <div
                className="ht-font-mono"
                style={{ marginTop: "12px", fontSize: "11px", color: "var(--lime)", opacity: 0, transition: "opacity 0.2s ease" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
              >
                View →
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
