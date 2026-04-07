"use client";

import { useEffect, useRef } from "react";

const projects = [
  {
    id: 1,
    name: "CreatorNexus AI",
    tagline: "Research intelligence platform",
    description: "Full-stack AI research SaaS built solo. Visualises research as an interactive causal knowledge graph with multi-source verification, defamation detection, and sponsor-safe content checks. 168+ commits in production.",
    tech: ["Next.js 16", "FastAPI", "Python", "Google Gemini", "Supabase", "Stripe", "D3.js", "WebSockets"],
    links: { github: "https://github.com/HILAYTRIVEDI/CreatorNexus-AI" },
    category: "AI SaaS",
    highlights: ["Knowledge graph visualisation", "Defamation detection", "Stripe billing"],
  },
  {
    id: 2,
    name: "Blog-to-Shots",
    tagline: "Blog URL → short-form vertical video",
    description: "Converts any blog URL into a short-form vertical video. Scrapes with Cheerio, generates a 9-scene AI script via Gemini 2.0, fetches scene-matched stock footage, and renders with Ken Burns effects and kinetic typography via Remotion.",
    tech: ["Next.js 16", "Remotion", "Google Gemini 2.0", "Pexels API", "TypeScript", "Vercel"],
    links: { github: "https://github.com/HILAYTRIVEDI/blog-to-shots" },
    category: "AI Tool",
    highlights: ["AI script generation", "Automated video rendering", "Ken Burns effects"],
  },
  {
    id: 3,
    name: "Advoksha",
    tagline: "AI-powered legal research terminal",
    description: "Multi-agent AI legal assistant for attorneys. Features a Supervisor, Researcher, Linguistic Hub, and Drafter agent architecture. Integrates OCR & translation, contract generation, and High Court/Supreme Court research grounding.",
    tech: ["Next.js 16", "FastAPI", "Python 3.11", "Google Gemini 2.5", "Supabase", "Redis", "Docker"],
    links: { github: "https://github.com/HILAYTRIVEDI/advoksha" },
    category: "AI Legal",
    highlights: ["Multi-agent system", "OCR & translation", "Court research grounding"],
  },
  {
    id: 4,
    name: "Mutual Fund Nexus",
    tagline: "Portfolio management for financial advisors",
    description: "Portfolio management platform tracking investments in India's mutual fund market. Real-time AUM tracking, P&L calculations, SIP/Lumpsum/SWP calculators, goal-based planning, and live market indices.",
    tech: ["Next.js 16", "React 19", "Supabase", "Tailwind CSS 4", "Recharts", "MFAPI.in"],
    links: { github: "https://github.com/HILAYTRIVEDI/mutual-fund-nexus" },
    category: "Fintech",
    highlights: ["Real-time AUM tracking", "SIP/SWP calculators", "Role-based access"],
  },
  {
    id: 5,
    name: "AbilityHub",
    tagline: "Accessibility-first platform",
    description: "A platform built with accessibility and inclusivity at its core, ensuring digital experiences are usable by everyone regardless of ability. Emphasises WCAG compliance and assistive technology support.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "WCAG", "Accessibility"],
    links: { github: "https://github.com/HILAYTRIVEDI/abilityhub" },
    category: "Accessibility",
    highlights: ["WCAG compliance", "Assistive tech support", "Inclusive design"],
  },
  {
    id: 6,
    name: "LLM Indexing Plugins",
    tagline: "Plugin ecosystem for LLM optimisation",
    description: "A composable plugin ecosystem for optimising LLM indexing processes. Built with a plugin-based architecture to extend and customise how content is indexed for large language model consumption.",
    tech: ["PHP", "WordPress", "Plugin Architecture", "LLM", "REST API"],
    links: { github: "https://github.com/HILAYTRIVEDI/llm-indexing-plugins" },
    category: "WordPress",
    highlights: ["Plugin architecture", "LLM optimisation", "Composable design"],
  },
];

function ProjectCard({ project }: { project: (typeof projects)[0] }) {
  return (
    <div className="project-card reveal">
      <div style={{ padding: "24px" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "16px" }}>
          <div style={{ flex: 1 }}>
            <span
              className="ht-font-mono"
              style={{
                fontSize: "10px",
                padding: "2px 8px",
                borderRadius: "2px",
                display: "inline-block",
                marginBottom: "8px",
                background: "rgba(200,255,0,0.1)",
                color: "var(--lime)",
                border: "1px solid rgba(200,255,0,0.2)",
                letterSpacing: "0.08em",
              }}
            >
              {project.category}
            </span>
            <h3
              className="ht-font-display"
              style={{ fontSize: "20px", fontWeight: 700, color: "var(--white)", lineHeight: 1.2 }}
            >
              {project.name}
            </h3>
            <p style={{ marginTop: "4px", fontSize: "13px", color: "var(--lime)", fontStyle: "italic" }}>
              {project.tagline}
            </p>
          </div>

          {/* Links */}
          <div style={{ display: "flex", gap: "8px", marginLeft: "16px", flexShrink: 0 }}>
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="ht-font-mono"
                style={{
                  fontSize: "11px",
                  padding: "6px 10px",
                  borderRadius: "2px",
                  border: "1px solid var(--border)",
                  color: "var(--white-30)",
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
                  el.style.color = "var(--white-30)";
                }}
              >
                GH ↗
              </a>
            )}
          </div>
        </div>

        {/* Description */}
        <p style={{ color: "var(--white-60)", fontSize: "13px", lineHeight: "1.7" }}>
          {project.description}
        </p>

        {/* Highlights */}
        <div style={{ marginTop: "16px", display: "flex", flexWrap: "wrap", gap: "12px" }}>
          {project.highlights.map((h) => (
            <span key={h} style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", color: "var(--white-30)" }}>
              <span style={{ color: "var(--lime)" }}>✓</span>
              {h}
            </span>
          ))}
        </div>

        {/* Tech tags */}
        <div
          style={{
            marginTop: "16px",
            paddingTop: "16px",
            borderTop: "1px solid var(--border)",
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
          }}
        >
          {project.tech.map((t) => (
            <span key={t} className="tech-tag">{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
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
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="projects"
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
          <div className="section-label" style={{ marginBottom: "16px" }}>Projects</div>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "16px" }}>
            <h2
              className="ht-font-display"
              style={{ fontWeight: 800, fontSize: "clamp(32px, 4vw, 48px)", letterSpacing: "-0.02em", color: "var(--white)" }}
            >
              Things I&apos;ve built
            </h2>
            <a
              href="https://github.com/HILAYTRIVEDI"
              target="_blank"
              rel="noopener noreferrer"
              className="ht-font-mono hover-underline"
              style={{ fontSize: "12px", color: "var(--lime)", textDecoration: "none" }}
            >
              All repos on GitHub →
            </a>
          </div>
        </div>

        {/* Cards grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "16px",
          }}
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
