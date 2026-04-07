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

            <p style={{ marginTop: "16px", color: "var(--white-60)", lineHeight: "1.8", fontSize: "15px" }}>
              Experienced in handling clients end-to-end — from{" "}
              <span style={{ color: "var(--white)" }}>technical consulting</span> and{" "}
              <span style={{ color: "var(--white)" }}>solution architecture</span> through to
              hands-on delivery and{" "}
              <span style={{ color: "var(--white)" }}>growth engineering</span> — ensuring every
              engagement ships with measurable business impact.
            </p>

            <div style={{ marginTop: "32px", display: "flex", flexWrap: "wrap", gap: "12px" }}>
              {[
                { label: "LinkedIn ↗", href: "https://linkedin.com/in/hilay-trivedi" },
                { label: "GitHub ↗", href: "https://github.com/HILAYTRIVEDI" },
                { label: "WordPress.org ↗", href: "https://profiles.wordpress.org/hilayt24/" },
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
              { num: "6,449", label: "Total Contributions", detail: "On GitHub since Jul 2019" },
              { num: "86", label: "Repos Contributed To", detail: "Across public & client work" },
              { num: "18.6M+", label: "Lines of Code Changed", detail: "All-time on GitHub" },
              { num: "6", label: "WordPress.org Badges", detail: "Core · Meta · Plugin · Pattern · Photo · Translation" },
              { num: "14", label: "GitHub Stars", detail: "Across personal & open-source projects" },
              { num: "168+", label: "Git Commits", detail: "On CreatorNexus AI alone" },
              { num: "WP VIP", label: "Gold Agency Engineer", detail: "WordPress VIP certified partner" },
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
                <div style={{ marginTop: "4px", fontSize: "12px", color: "var(--white-60)" }}>
                  {s.detail}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills — Full-stack & beyond */}
        <div
          className="reveal"
          style={{
            marginTop: "64px",
            paddingTop: "48px",
            borderTop: "1px solid var(--border)",
          }}
        >
          <div className="section-label" style={{ marginBottom: "16px" }}>Skills</div>
          <h2
            className="ht-font-display"
            style={{
              fontWeight: 800,
              fontSize: "clamp(28px, 3vw, 40px)",
              letterSpacing: "-0.02em",
              color: "var(--white)",
              marginBottom: "32px",
            }}
          >
            Full-stack &amp; beyond
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "16px",
            }}
          >
            {[
              {
                category: "WordPress VIP",
                skills: ["Custom Plugin Architecture", "REST API Design", "Gutenberg / FSE", "Dynamic Blocks", "WooCommerce", "ACF Pro", "Multisite Networks", "Hooks & Filters", "Headless CMS", "WordPress VIP Standards", "Performance Optimisation", "Block Patterns"],
              },
              {
                category: "Backend",
                skills: ["PHP 8+ (5+ yrs)", "Node.js", "Python", "FastAPI", "MySQL Optimisation", "ETL Pipelines", "Legacy Modernisation", "REST API", "WebSockets", "Redis", "Docker", "Nginx"],
              },
              {
                category: "Frontend",
                skills: ["React.js", "Next.js 16", "TypeScript", "GraphQL", "JavaScript ES6+", "Tailwind CSS", "jQuery", "Block Editor", "D3.js", "Remotion"],
              },
              {
                category: "Cloud & Infra",
                skills: ["AWS", "GCP", "Azure", "GitHub Actions", "Vercel", "Supabase", "PostgreSQL", "Stripe", "CI/CD", "VPS Deployment", "Agile / Scrum"],
              },
              {
                category: "AI & Data",
                skills: ["Google Gemini API", "LLM Integration", "Multi-Agent Systems", "Pandas", "NumPy", "Data Analysis", "ETL Pipelines", "Knowledge Graphs", "Pexels API", "OCR / Translation"],
              },
              {
                category: "AI Tools & Libraries",
                skills: ["Claude (Anthropic)", "ChatGPT / OpenAI", "Google Gemini", "LangChain", "LangGraph", "CrewAI", "RAG Pipelines", "Vector Databases", "Prompt Engineering", "AI Agents"],
              },
              {
                category: "Consulting & Business",
                skills: ["Technical Consultancy", "Business Analysis", "Requirement Gathering", "Solution Discovery", "Proposal Preparation", "Scope of Work", "Client Management", "Upselling", "Quotations & Timelines"],
              },
            ].map((group) => (
              <div key={group.category} className="skill-group">
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                  <span style={{ color: "var(--lime)", fontSize: "16px" }}>⬡</span>
                  <h3 className="ht-font-display" style={{ fontSize: "14px", fontWeight: 700, color: "var(--white)", letterSpacing: "0.05em" }}>
                    {group.category}
                  </h3>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {group.skills.map((skill) => (
                    <span key={skill} className="tech-tag">{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
