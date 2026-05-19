"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, staggerContainerFast } from "@/lib/animationVariants";

const contributions = [
  {
    label: "WordPress Core & Meta",
    detail: "Multiple merged SVN changesets across Core, Meta, and bbPress.",
    badge: "Contributor",
    href: "https://profiles.wordpress.org/hilayt24/",
  },
  {
    label: "Gutenberg",
    detail: "PRs merged into WordPress/gutenberg: block colour support updates and embedded preview block improvements.",
    badge: "Contributor",
    href: "https://github.com/WordPress/gutenberg",
  },
  {
    label: "RevisionBuster",
    detail: "Plugin author — published on WordPress.org with full WP-CLI support and admin UI.",
    badge: "Plugin Author",
    href: "https://wordpress.org/plugins/",
  },
  {
    label: "Translation Contributor",
    detail: "100+ strings translated for WooCommerce, Jetpack, and WordPress core in Gujarati.",
    badge: "GlotPress",
    href: "https://translate.wordpress.org/",
  },
  {
    label: "Built By WordPress (BBWPC)",
    detail: "Contributed PHP theme templates, block patterns, and SSR blocks to the global BBWPC open-source initiative.",
    badge: "Open Source",
    href: "https://github.com/WordPress",
  },
  {
    label: "Community",
    detail: "WordCamp Ahmedabad 2025 and WordCamp Asia 2026 attendee. Active WordPress Slack member.",
    badge: "WordCamp",
    href: "https://wordpress.org/news/category/wordcamp/",
  },
];

function ArrowIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 17 17 7M7 7h10v10"/>
    </svg>
  );
}

export default function OpenSource() {
  return (
    <section id="open-source" className="section-mobile-pad" style={{
      position: "relative",
      paddingTop: "128px", paddingBottom: "128px",
      borderTop: "1px solid var(--border)",
      zIndex: 1,
    }}>
      <div className="ht-container">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{ marginBottom: "48px" }}
        >
          <motion.div variants={fadeUp}>
            <div className="section-label" style={{ marginBottom: "16px" }}>Open Source</div>
            <div style={{
              display: "flex", flexWrap: "wrap",
              alignItems: "flex-end", justifyContent: "space-between", gap: "16px",
            }}>
              <h2 className="ht-font-display" style={{
                fontWeight: 700,
                fontSize: "clamp(32px, 4vw, 48px)",
                letterSpacing: "-0.03em",
                color: "var(--white)",
                lineHeight: 1.1,
              }}>
                Giving back to the<br />
                <span style={{ color: "var(--lime)" }}>community</span>
              </h2>
              <a href="https://wp.org/hilayt24" target="_blank" rel="noopener noreferrer"
                className="ht-font-mono hover-underline" style={{
                  fontSize: "12px", color: "var(--lime)", textDecoration: "none",
                }}>
                WordPress.org profile →
              </a>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={staggerContainerFast}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "12px",
          }}
        >
          {contributions.map((item) => (
            <motion.a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="skill-group"
              variants={fadeUp}
              whileHover="cardHovered"
              style={{ textDecoration: "none", display: "block" }}
              transition={{ duration: 0.25 }}
            >
              <div style={{
                display: "flex", alignItems: "flex-start",
                justifyContent: "space-between", marginBottom: "10px", gap: "8px",
              }}>
                <h3 className="ht-font-display" style={{
                  fontSize: "15px", fontWeight: 600, color: "var(--white)", lineHeight: 1.3,
                }}>
                  {item.label}
                </h3>
                <span className="ht-font-mono" style={{
                  fontSize: "10px", padding: "2px 8px", borderRadius: "4px",
                  background: "rgba(200,255,0,0.07)", color: "var(--lime)",
                  border: "1px solid rgba(200,255,0,0.15)", letterSpacing: "0.07em",
                  flexShrink: 0,
                }}>
                  {item.badge}
                </span>
              </div>
              <p style={{ fontSize: "13px", color: "var(--white-60)", lineHeight: "1.65" }}>
                {item.detail}
              </p>
              <motion.div
                className="ht-font-mono"
                initial={{ opacity: 0 }}
                variants={{ cardHovered: { opacity: 1 } }}
                transition={{ duration: 0.2 }}
                style={{
                  marginTop: "14px",
                  fontSize: "11px", color: "var(--lime)",
                  display: "inline-flex", alignItems: "center", gap: "5px",
                }}
              >
                View <ArrowIcon />
              </motion.div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
