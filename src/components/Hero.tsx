"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

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

  useEffect(() => {
    const current = roles[roleIndex];
    const speed = isDeleting ? 40 : 80;

    const tick = () => {
      if (!isDeleting && displayed.length < current.length) {
        setDisplayed(current.slice(0, displayed.length + 1));
      } else if (!isDeleting && displayed.length === current.length) {
        timeoutRef.current = setTimeout(() => setIsDeleting(true), 2000);
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
    <section
      id="hero"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        overflow: "hidden",
        background: "var(--bg)",
      }}
    >
      {/* 3D particle network — sits behind everything */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        <ParticleNetwork />
      </div>

      {/* Radial glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse 70% 50% at 50% 60%, rgba(200,255,0,0.04) 0%, transparent 70%)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* Main content */}
      <div
        className="ht-container"
        style={{
          position: "relative",
          zIndex: 2,
          paddingTop: "128px",
          paddingBottom: "80px",
        }}
      >
        {/* Location label */}
        <div className="section-label hero-anim-1" style={{ marginBottom: "40px" }}>
          Ahmedabad, India · Available Worldwide
        </div>

        {/* Name */}
        <h1
          className="ht-font-display hero-anim-2"
          style={{
            fontWeight: 800,
            lineHeight: 1,
            letterSpacing: "-0.03em",
            fontSize: "clamp(52px, 8vw, 120px)",
            color: "var(--white)",
          }}
        >
          HILAY
          <br />
          <span
            style={{
              WebkitTextStroke: "1px var(--white)",
              color: "transparent",
            }}
          >
            TRIVEDI
          </span>
          <span style={{ color: "var(--lime)" }}>.</span>
        </h1>

        {/* Typewriter role */}
        <div className="hero-anim-3" style={{ marginTop: "32px" }}>
          <p
            className="ht-font-mono"
            style={{
              fontSize: "clamp(13px, 1.5vw, 16px)",
              color: "var(--white-60)",
              letterSpacing: "0.05em",
            }}
          >
            <span style={{ color: "var(--lime)" }}>$ </span>
            {displayed}
            <span className="cursor-dot" />
          </p>
        </div>

        {/* Bio */}
        <p
          className="hero-anim-4"
          style={{
            marginTop: "24px",
            maxWidth: "540px",
            color: "var(--white-60)",
            fontSize: "15px",
            lineHeight: "1.75",
          }}
        >
          Building AI-powered products with LLMs, multi-agent systems, and
          full-stack engineering. 5+ years of enterprise WordPress VIP depth —
          Core contributor, growth engineer, and technical consultant for global
          media &amp; fintech clients.
        </p>

        {/* AI tech strip */}
        <div
          className="hero-anim-4"
          style={{
            marginTop: "20px",
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
          }}
        >
          {["LLM Integration", "Multi-Agent Systems", "Python / FastAPI", "Gemini API", "RAG Pipelines", "Full-Stack AI"].map((tag) => (
            <span
              key={tag}
              className="ht-font-mono"
              style={{
                fontSize: "10px",
                letterSpacing: "0.08em",
                padding: "4px 10px",
                borderRadius: "2px",
                border: "1px solid rgba(200,255,0,0.3)",
                color: "var(--lime)",
                background: "rgba(200,255,0,0.05)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div
          className="hero-anim-5"
          style={{
            marginTop: "40px",
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <a
            href="#projects"
            className="ht-font-display"
            style={{
              fontWeight: 700,
              padding: "14px 28px",
              borderRadius: "2px",
              fontSize: "14px",
              letterSpacing: "0.03em",
              background: "var(--lime)",
              color: "var(--bg)",
              textDecoration: "none",
              display: "inline-block",
              transition: "transform 0.2s ease",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.transform = "scale(1.02)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.transform = "scale(1)")}
          >
            View Work
          </a>
          <a
            href="https://github.com/HILAYTRIVEDI"
            target="_blank"
            rel="noopener noreferrer"
            className="ht-font-display"
            style={{
              fontWeight: 700,
              padding: "14px 28px",
              borderRadius: "2px",
              fontSize: "14px",
              letterSpacing: "0.03em",
              border: "1px solid var(--white-60)",
              color: "var(--white)",
              textDecoration: "none",
              display: "inline-block",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "var(--lime)";
              el.style.color = "var(--lime)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "var(--white-60)";
              el.style.color = "var(--white)";
            }}
          >
            GitHub ↗
          </a>
        </div>

        {/* Quick stats */}
        <div
          className="hero-anim-6"
          style={{
            marginTop: "80px",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "24px",
            maxWidth: "320px",
          }}
        >
          {[
            { num: "5+", label: "Years" },
            { num: "10+", label: "AI Projects" },
            { num: "32%", label: "Sales lift" },
          ].map((s) => (
            <div key={s.label}>
              <div
                className="ht-font-display"
                style={{ fontSize: "28px", fontWeight: 800, color: "var(--lime)", lineHeight: 1, letterSpacing: "-0.02em" }}
              >
                {s.num}
              </div>
              <div
                className="ht-font-mono"
                style={{ marginTop: "4px", fontSize: "10px", color: "var(--white-60)", letterSpacing: "0.1em" }}
              >
                {s.label.toUpperCase()}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="hero-anim-7"
        style={{
          position: "absolute",
          bottom: "32px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          zIndex: 2,
        }}
      >
        <span
          className="ht-font-mono"
          style={{ fontSize: "10px", color: "var(--white-60)", letterSpacing: "0.15em" }}
        >
          SCROLL
        </span>
        <div
          style={{
            width: "1px",
            height: "48px",
            background: "var(--white-10)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "40%",
              background: "var(--lime)",
              animation: "slideDown 1.5s ease-in-out infinite",
            }}
          />
        </div>
      </div>
    </section>
  );
}
