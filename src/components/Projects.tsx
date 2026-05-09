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
    featured: true,
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
    featured: false,
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
    featured: false,
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
    featured: false,
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
    featured: false,
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
    featured: false,
  },
];

function GitHubArrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 17 17 7M7 7h10v10"/>
    </svg>
  );
}

function CheckMark() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  );
}

function FeaturedCard({ project }: { project: (typeof projects)[0] }) {
  return (
    <div className="project-card reveal" style={{ marginBottom: "16px" }}>
      <div style={{ padding: "32px 36px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", justifyContent: "space-between", gap: "16px", marginBottom: "20px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px", flexWrap: "wrap" }}>
              <span className="ht-font-mono" style={{
                fontSize: "10px", padding: "2px 10px", borderRadius: "4px",
                background: "rgba(200,255,0,0.1)", color: "var(--lime)",
                border: "1px solid rgba(200,255,0,0.22)", letterSpacing: "0.08em",
              }}>
                {project.category}
              </span>
              <span className="ht-font-mono" style={{
                fontSize: "10px", padding: "2px 10px", borderRadius: "4px",
                background: "rgba(200,255,0,0.06)", color: "var(--lime)",
                border: "1px solid rgba(200,255,0,0.15)", letterSpacing: "0.08em",
              }}>
                Featured
              </span>
            </div>
            <h3 className="ht-font-display" style={{
              fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 700,
              color: "var(--white)", lineHeight: 1.15, letterSpacing: "-0.02em",
            }}>
              {project.name}
            </h3>
            <p style={{ marginTop: "6px", fontSize: "14px", color: "var(--lime)", fontStyle: "italic" }}>
              {project.tagline}
            </p>
          </div>
          {project.links.github && (
            <a href={project.links.github} target="_blank" rel="noopener noreferrer"
              className="ht-font-mono" style={{
                fontSize: "12px", padding: "8px 16px",
                borderRadius: "6px", border: "1px solid var(--border-strong)",
                color: "var(--white-60)", textDecoration: "none",
                transition: "all 0.2s ease", cursor: "pointer",
                display: "inline-flex", alignItems: "center", gap: "6px",
                flexShrink: 0,
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "rgba(200,255,0,0.3)";
                el.style.color = "var(--lime)";
                el.style.background = "rgba(200,255,0,0.04)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "var(--border-strong)";
                el.style.color = "var(--white-60)";
                el.style.background = "transparent";
              }}>
              GitHub <GitHubArrow />
            </a>
          )}
        </div>

        <p style={{ color: "var(--white-60)", fontSize: "15px", lineHeight: "1.75", maxWidth: "680px" }}>
          {project.description}
        </p>

        <div style={{ marginTop: "20px", display: "flex", flexWrap: "wrap", gap: "16px" }}>
          {project.highlights.map((h) => (
            <span key={h} style={{
              display: "inline-flex", alignItems: "center", gap: "6px",
              fontSize: "13px", color: "var(--white-60)",
            }}>
              <span style={{ color: "var(--lime)", display: "inline-flex" }}><CheckMark /></span>
              {h}
            </span>
          ))}
        </div>

        <div style={{
          marginTop: "20px", paddingTop: "20px",
          borderTop: "1px solid var(--border)",
          display: "flex", flexWrap: "wrap", gap: "7px",
        }}>
          {project.tech.map((t) => (
            <span key={t} className="tech-tag">{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: (typeof projects)[0] }) {
  return (
    <div className="project-card reveal">
      <div style={{ padding: "24px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "14px" }}>
          <div style={{ flex: 1 }}>
            <span className="ht-font-mono" style={{
              fontSize: "10px", padding: "2px 8px", borderRadius: "4px",
              display: "inline-block", marginBottom: "8px",
              background: "rgba(200,255,0,0.08)", color: "var(--lime)",
              border: "1px solid rgba(200,255,0,0.18)", letterSpacing: "0.08em",
            }}>
              {project.category}
            </span>
            <h3 className="ht-font-display" style={{
              fontSize: "18px", fontWeight: 600,
              color: "var(--white)", lineHeight: 1.2, letterSpacing: "-0.01em",
            }}>
              {project.name}
            </h3>
            <p style={{ marginTop: "3px", fontSize: "13px", color: "var(--lime)", fontStyle: "italic" }}>
              {project.tagline}
            </p>
          </div>
          {project.links.github && (
            <a href={project.links.github} target="_blank" rel="noopener noreferrer"
              className="ht-font-mono" style={{
                fontSize: "11px", padding: "6px 10px",
                borderRadius: "6px", border: "1px solid var(--border)",
                color: "var(--white-60)", textDecoration: "none",
                transition: "all 0.2s ease", cursor: "pointer",
                display: "inline-flex", alignItems: "center", gap: "5px",
                marginLeft: "12px", flexShrink: 0,
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "rgba(200,255,0,0.28)";
                el.style.color = "var(--lime)";
                el.style.background = "rgba(200,255,0,0.04)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "var(--border)";
                el.style.color = "var(--white-60)";
                el.style.background = "transparent";
              }}>
              GH <GitHubArrow />
            </a>
          )}
        </div>

        <p style={{ color: "var(--white-60)", fontSize: "13px", lineHeight: "1.72" }}>
          {project.description}
        </p>

        <div style={{ marginTop: "14px", display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {project.highlights.map((h) => (
            <span key={h} style={{
              display: "inline-flex", alignItems: "center", gap: "5px",
              fontSize: "12px", color: "var(--white-60)",
            }}>
              <span style={{ color: "var(--lime)", display: "inline-flex" }}><CheckMark /></span>
              {h}
            </span>
          ))}
        </div>

        <div style={{
          marginTop: "14px", paddingTop: "14px",
          borderTop: "1px solid var(--border)",
          display: "flex", flexWrap: "wrap", gap: "6px",
        }}>
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
              setTimeout(() => el.classList.add("visible"), i * 70);
            });
          }
        });
      },
      { threshold: 0.04 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="projects" ref={ref} className="section-mobile-pad" style={{
      position: "relative",
      paddingTop: "128px", paddingBottom: "128px",
      borderTop: "1px solid var(--border)",
      zIndex: 1,
    }}>
      <div className="ht-container">
        <div className="reveal" style={{ marginBottom: "48px" }}>
          <div className="section-label" style={{ marginBottom: "16px" }}>Projects</div>
          <div style={{
            display: "flex", flexWrap: "wrap",
            alignItems: "flex-end", justifyContent: "space-between", gap: "16px",
          }}>
            <h2 className="ht-font-display" style={{
              fontWeight: 700,
              fontSize: "clamp(32px, 4vw, 48px)",
              letterSpacing: "-0.03em",
              color: "var(--white)",
            }}>
              Things I&apos;ve built
            </h2>
            <a href="https://github.com/HILAYTRIVEDI" target="_blank" rel="noopener noreferrer"
              className="ht-font-mono hover-underline" style={{
                fontSize: "12px", color: "var(--lime)", textDecoration: "none", cursor: "pointer",
              }}>
              All repos on GitHub →
            </a>
          </div>
        </div>

        {/* Featured */}
        {featured.map((p) => (
          <FeaturedCard key={p.id} project={p} />
        ))}

        {/* Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: "12px",
        }}>
          {rest.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
