"use client";

import { useEffect, useRef } from "react";

const skillGroups = [
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
];

const marqueeItems = [
  "WordPress VIP", "PHP", "React", "Next.js", "Gutenberg", "GraphQL",
  "TypeScript", "FastAPI", "Python", "WooCommerce", "AWS", "Supabase",
  "Stripe", "Gemini API", "D3.js", "Remotion", "Docker", "Nginx", "MySQL", "REST API",
];

export default function Skills() {
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
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="skills"
      ref={ref}
      style={{
        position: "relative",
        paddingTop: "128px",
        paddingBottom: "128px",
        borderTop: "1px solid var(--border)",
        zIndex: 1,
      }}
    >
      {/* Marquee strip */}
      <div
        style={{
          width: "100%",
          overflow: "hidden",
          paddingTop: "16px",
          paddingBottom: "16px",
          marginBottom: "80px",
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
          background: "var(--bg-2)",
        }}
      >
        <div className="marquee-track">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span
              key={i}
              className="ht-font-mono"
              style={{
                marginLeft: "24px",
                marginRight: "24px",
                flexShrink: 0,
                fontSize: "11px",
                color: "var(--white-30)",
                letterSpacing: "0.15em",
              }}
            >
              {item.toUpperCase()}
              <span style={{ color: "var(--lime)", marginLeft: "24px" }}>·</span>
            </span>
          ))}
        </div>
      </div>

      <div className="ht-container">
        <div className="reveal" style={{ marginBottom: "48px" }}>
          <div className="section-label" style={{ marginBottom: "16px" }}>Skills</div>
          <h2
            className="ht-font-display"
            style={{
              fontWeight: 800,
              fontSize: "clamp(32px, 4vw, 48px)",
              letterSpacing: "-0.02em",
              color: "var(--white)",
            }}
          >
            Full-stack & beyond
          </h2>
        </div>

        {/* Skills grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "16px",
          }}
        >
          {skillGroups.map((group) => (
            <div key={group.category} className="skill-group reveal">
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

          {/* Education */}
          <div
            className="skill-group reveal"
            style={{ gridColumn: "1 / -1" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
              <span style={{ color: "var(--lime)", fontSize: "16px" }}>⬡</span>
              <h3 className="ht-font-display" style={{ fontSize: "14px", fontWeight: 700, color: "var(--white)", letterSpacing: "0.05em" }}>
                Education
              </h3>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {[
                { degree: "Executive Diploma in Machine Learning & AI", school: "IIIT Bangalore", year: "Ongoing" },
                { degree: "B.Tech in Computer Engineering · CGPA 9.6/10", school: "L.J. Institute of Engineering & Technology", year: "2017–2021" },
                { degree: "Diploma in Management · 80%", school: "Ahmedabad Management Association", year: "2022–2023" },
              ].map((edu, i, arr) => (
                <div
                  key={edu.degree}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: "16px",
                    paddingTop: "16px",
                    paddingBottom: "16px",
                    borderBottom: i < arr.length - 1 ? "1px solid var(--border)" : "none",
                  }}
                >
                  <div>
                    <div className="ht-font-display" style={{ fontSize: "14px", fontWeight: 600, color: "var(--white)" }}>
                      {edu.degree}
                    </div>
                    <div style={{ marginTop: "4px", fontSize: "12px", color: "var(--white-30)" }}>{edu.school}</div>
                  </div>
                  <span className="ht-font-mono" style={{ fontSize: "11px", color: "var(--lime)", flexShrink: 0 }}>
                    {edu.year}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
