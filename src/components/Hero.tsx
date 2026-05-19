"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { heroContainer, heroItem } from "@/lib/animationVariants";

const ParticleNetwork = dynamic(() => import("./ParticleNetwork"), {
  ssr: false,
  loading: () => null,
});

const roles = [
  "Full-Stack AI Builder",
  "LLM & Multi-Agent Systems Engineer",
  "Senior WordPress VIP Engineer",
  "Headless CMS Architect",
  "WordPress Core Contributor",
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { scrollY } = useScroll();
  const rawY = useTransform(scrollY, [0, 500], [0, -60]);
  const parallaxY = useSpring(rawY, { stiffness: 80, damping: 20 });

  useEffect(() => {
    const current = roles[roleIndex];
    const speed = isDeleting ? 35 : 72;

    const tick = () => {
      if (!isDeleting && displayed.length < current.length) {
        setDisplayed(current.slice(0, displayed.length + 1));
      } else if (!isDeleting && displayed.length === current.length) {
        timeoutRef.current = setTimeout(() => setIsDeleting(true), 2400);
        return;
      } else if (isDeleting && displayed.length > 0) {
        setDisplayed(current.slice(0, displayed.length - 1));
      } else {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }
    };

    timeoutRef.current = setTimeout(tick, speed);
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, [displayed, isDeleting, roleIndex]);

  return (
    <section id="hero" style={{
      position: "relative",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      overflow: "hidden",
      background: "var(--bg)",
    }}>
      {/* 3D particle network */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}>
        <ParticleNetwork />
      </div>

      {/* Radial glow */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
        background: "radial-gradient(ellipse 70% 55% at 25% 55%, rgba(200,255,0,0.05) 0%, transparent 65%)",
      }} />

      {/* Far-right ambient orb */}
      <div style={{
        position: "absolute", right: "-240px", top: "50%",
        transform: "translateY(-50%)",
        width: "640px", height: "640px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(200,255,0,0.025) 0%, transparent 70%)",
        zIndex: 1, pointerEvents: "none",
      }} />

      {/* Main content */}
      <div className="ht-container" style={{
        position: "relative", zIndex: 2,
        paddingTop: "128px", paddingBottom: "80px",
      }}>
        <motion.div
          variants={heroContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Status badge */}
          <motion.div variants={heroItem} style={{ marginBottom: "36px" }}>
            <div className="status-badge">
              <span className="dot" />
              Open to remote opportunities · Ahmedabad, India
            </div>
          </motion.div>

          {/* Name + Typewriter — with scroll parallax */}
          <motion.div variants={heroItem} style={{ y: parallaxY }}>
            <h1 className="ht-font-display" style={{
              fontWeight: 700,
              lineHeight: 0.93,
              letterSpacing: "-0.04em",
              fontSize: "clamp(58px, 9.5vw, 132px)",
              color: "var(--white)",
            }}>
              HILAY
              <br />
              <span style={{ WebkitTextStroke: "1px rgba(237,237,234,0.65)", color: "transparent" }}>
                TRIVEDI
              </span>
              <span style={{ color: "var(--lime)", WebkitTextStroke: "0px", WebkitTextFillColor: "var(--lime)" }}>.</span>
            </h1>
          </motion.div>

          <motion.div variants={heroItem} style={{ marginTop: "28px", y: parallaxY }}>
            <p className="ht-font-mono" style={{
              fontSize: "clamp(13px, 1.4vw, 15px)",
              color: "var(--white-60)",
              letterSpacing: "0.04em",
            }}>
              <span style={{ color: "var(--lime)" }}>$ </span>
              {displayed}
              <span className="cursor-dot" />
            </p>
          </motion.div>

          {/* Bio */}
          <motion.div variants={heroItem} style={{ marginTop: "24px" }}>
            <p style={{
              maxWidth: "510px",
              color: "var(--white-60)",
              fontSize: "15px",
              lineHeight: "1.8",
            }}>
              Building AI-powered products with LLMs, multi-agent systems, and full-stack
              engineering. 5+ years of enterprise WordPress VIP depth — Core contributor,
              growth engineer, and technical consultant.
            </p>
          </motion.div>

          {/* AI tech tags */}
          <motion.div variants={heroItem} style={{ marginTop: "20px", display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {["LLM Integration", "Multi-Agent Systems", "Python / FastAPI", "Gemini API", "RAG Pipelines", "Full-Stack AI"].map((tag) => (
              <span key={tag} className="tech-tag" style={{
                borderColor: "rgba(200,255,0,0.22)",
                color: "var(--lime)",
                background: "rgba(200,255,0,0.05)",
              }}>
                {tag}
              </span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div variants={heroItem} style={{
            marginTop: "40px",
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
          }}>
            <motion.a
              href="#projects"
              className="ht-font-display"
              style={{
                fontWeight: 600,
                padding: "13px 28px",
                borderRadius: "8px",
                fontSize: "14px",
                letterSpacing: "0.02em",
                background: "var(--lime)",
                color: "var(--bg)",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
              }}
              whileHover={{ y: -2, boxShadow: "0 10px 28px rgba(200,255,0,0.28)" }}
              transition={{ duration: 0.2 }}
            >
              View Work
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14m-7-7 7 7-7 7"/>
              </svg>
            </motion.a>

            <motion.a
              href="https://github.com/HILAYTRIVEDI"
              target="_blank"
              rel="noopener noreferrer"
              className="ht-font-display"
              style={{
                fontWeight: 600,
                padding: "13px 28px",
                borderRadius: "8px",
                fontSize: "14px",
                letterSpacing: "0.02em",
                border: "1px solid var(--border-strong)",
                color: "var(--white-60)",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
              }}
              whileHover={{ y: -2, borderColor: "rgba(200,255,0,0.3)", color: "var(--lime)" }}
              transition={{ duration: 0.2 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub ↗
            </motion.a>
          </motion.div>

          {/* Stats strip */}
          <motion.div variants={heroItem} style={{
            marginTop: "72px",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "0",
          }}>
            {[
              { num: "5+", label: "Years" },
              { num: "10+", label: "AI Projects" },
              { num: "20+", label: "WP VIP Projects" },
            ].map((s, i) => (
              <div key={s.label} style={{ display: "flex", alignItems: "center" }}>
                <div style={{ padding: i === 0 ? "0 32px 0 0" : "0 32px" }}>
                  <div className="ht-font-display stat-num" style={{
                    fontSize: "clamp(30px, 3.5vw, 44px)",
                    fontWeight: 700,
                    color: "var(--lime)",
                    lineHeight: 1,
                    letterSpacing: "-0.03em",
                  }}>
                    {s.num}
                  </div>
                  <div className="ht-font-mono" style={{
                    marginTop: "4px",
                    fontSize: "10px",
                    color: "var(--white-60)",
                    letterSpacing: "0.12em",
                  }}>
                    {s.label.toUpperCase()}
                  </div>
                </div>
                {i < 2 && (
                  <div style={{
                    width: "1px", height: "40px",
                    background: "var(--border-strong)",
                    flexShrink: 0,
                  }} />
                )}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: "absolute", bottom: "32px", left: "50%",
        transform: "translateX(-50%)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: "8px",
        zIndex: 2,
      }}>
        <span className="ht-font-mono" style={{ fontSize: "10px", color: "var(--white-60)", letterSpacing: "0.15em" }}>
          SCROLL
        </span>
        <div style={{
          width: "1px", height: "48px",
          background: "var(--white-10)",
          position: "relative", overflow: "hidden",
        }}>
          <motion.div
            style={{
              position: "absolute", top: 0, left: 0, width: "100%", height: "40%",
              background: "var(--lime)",
            }}
            animate={{ y: ["0%", "350%"] }}
            transition={{ duration: 1.6, ease: "easeInOut", repeat: Infinity }}
          />
        </div>
      </div>
    </section>
  );
}
