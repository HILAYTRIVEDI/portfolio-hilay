"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, staggerContainerFast } from "@/lib/animationVariants";

const stats = [
  { num: "5+", label: "Years of Experience", detail: "Enterprise WordPress & full-stack" },
  { num: "6,449", label: "Total Contributions", detail: "On GitHub since Jul 2019" },
  { num: "86", label: "Repos Contributed To", detail: "Across public & client work" },
  { num: "6", label: "WordPress.org Badges", detail: "Core · Meta · Plugin · Pattern · Photo · Translation" },
  { num: "14", label: "GitHub Stars", detail: "Across personal & open-source projects" },
  { num: "168+", label: "Git Commits", detail: "On CreatorNexus AI alone" },
  { num: "WP VIP", label: "Gold Agency Engineer", detail: "WordPress VIP certified partner" },
];

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
  {
    category: "AI Tools & Libraries",
    skills: ["Claude (Anthropic)", "ChatGPT / OpenAI", "Google Gemini", "LangChain", "LangGraph", "CrewAI", "RAG Pipelines", "Vector Databases", "Prompt Engineering", "AI Agents"],
  },
  {
    category: "Consulting & Business",
    skills: ["Technical Consultancy", "Business Analysis", "Requirement Gathering", "Solution Discovery", "Proposal Preparation", "Scope of Work", "Client Management", "Upselling", "Quotations & Timelines"],
  },
];

function LimeDot() {
  return (
    <div style={{
      width: "7px", height: "7px", borderRadius: "50%",
      background: "var(--lime)",
      boxShadow: "0 0 6px rgba(200,255,0,0.6)",
      flexShrink: 0,
    }} aria-hidden="true" />
  );
}

export default function About() {
  return (
    <section id="about" className="section-mobile-pad" style={{
      position: "relative",
      paddingTop: "128px", paddingBottom: "128px",
      borderTop: "1px solid var(--border)",
      zIndex: 1,
    }}>
      <div className="ht-container">
        {/* Bio + Stats */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "64px",
          alignItems: "start",
        }}>
          {/* Left — bio */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeUp}>
              <div className="section-label" style={{ marginBottom: "32px" }}>About</div>
              <h2 className="ht-font-display" style={{
                fontWeight: 700,
                fontSize: "clamp(36px, 4vw, 54px)",
                lineHeight: 1.08,
                letterSpacing: "-0.03em",
                color: "var(--white)",
              }}>
                I build systems<br />
                that <span style={{ color: "var(--lime)" }}>scale</span>.
              </h2>
            </motion.div>

            <motion.div variants={fadeUp}>
              <p style={{ marginTop: "24px", color: "var(--white-60)", lineHeight: "1.85", fontSize: "15px" }}>
                I&apos;m a Senior Software Engineer at{" "}
                <a href="https://rtcamp.com" target="_blank" rel="noopener noreferrer"
                  className="hover-underline" style={{ color: "var(--white)" }}>
                  rtCamp
                </a>
                , a WordPress VIP Gold Agency, where I&apos;ve spent three years building
                enterprise-grade products for Canada&apos;s largest media house, U.S.-based fintech
                firms, and global publishing platforms.
              </p>
            </motion.div>

            <motion.div variants={fadeUp}>
              <p style={{ marginTop: "16px", color: "var(--white-60)", lineHeight: "1.85", fontSize: "15px" }}>
                I specialise in WordPress VIP architecture — custom plugin development, REST API
                design, headless CMS with Next.js and GraphQL, and Gutenberg/FSE block
                development. I own projects end-to-end: client consultation, system design,
                sprint planning, delivery, and post-launch optimisation.
              </p>
            </motion.div>

            <motion.div variants={fadeUp}>
              <p style={{ marginTop: "16px", color: "var(--white-60)", lineHeight: "1.85", fontSize: "15px" }}>
                Outside client work, I build full-stack AI products — multi-agent systems, LLM
                pipelines, and research tools — and contribute to WordPress Core and Gutenberg.
              </p>
            </motion.div>

            <motion.div variants={fadeUp}>
              <p style={{ marginTop: "16px", color: "var(--white-60)", lineHeight: "1.85", fontSize: "15px" }}>
                Experienced in handling clients end-to-end — from{" "}
                <span style={{ color: "var(--white)" }}>technical consulting</span> and{" "}
                <span style={{ color: "var(--white)" }}>solution architecture</span> through to
                hands-on delivery and{" "}
                <span style={{ color: "var(--white)" }}>growth engineering</span>.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} style={{ marginTop: "32px", display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {[
                { label: "LinkedIn ↗", href: "https://linkedin.com/in/hilay-trivedi" },
                { label: "GitHub ↗", href: "https://github.com/HILAYTRIVEDI" },
                { label: "WordPress.org ↗", href: "https://profiles.wordpress.org/hilayt24/" },
              ].map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ht-font-mono"
                  style={{
                    fontSize: "12px", padding: "8px 16px",
                    borderRadius: "6px", border: "1px solid var(--border)",
                    color: "var(--white-60)", textDecoration: "none",
                  }}
                  whileHover={{ borderColor: "rgba(200,255,0,0.28)", color: "var(--lime)", background: "rgba(200,255,0,0.04)" }}
                  transition={{ duration: 0.2 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — stats grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px",
            }}
          >
            {stats.map((s) => (
              <motion.div key={s.label} variants={fadeUp} className="skill-group" style={{
                background: "linear-gradient(135deg, var(--bg-2) 0%, var(--bg-3) 100%)",
              }}>
                <div className="ht-font-display stat-num" style={{
                  fontSize: "32px", fontWeight: 700,
                  color: "var(--lime)", lineHeight: 1, letterSpacing: "-0.02em",
                }}>
                  {s.num}
                </div>
                <div className="ht-font-display" style={{
                  marginTop: "8px", fontSize: "13px", fontWeight: 600, color: "var(--white)",
                }}>
                  {s.label}
                </div>
                <div style={{ marginTop: "4px", fontSize: "12px", color: "var(--white-60)", lineHeight: "1.4" }}>
                  {s.detail}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Skills section */}
        {/* HYPERFRAMES: npx hyperframes render hf-compositions -c compositions/skills-kinetic.html -o public/videos/skills-kinetic.mp4 --fps 30 */}
        <div style={{
          marginTop: "80px", paddingTop: "56px",
          borderTop: "1px solid var(--border)",
          position: "relative", overflow: "hidden",
        }}>
          <video
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
            style={{
              position: "absolute", inset: 0,
              width: "100%", height: "100%",
              objectFit: "cover",
              opacity: 0.08,
              pointerEvents: "none",
            }}
          >
            <source src="/videos/skills-kinetic.mp4" type="video/mp4" />
          </video>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="section-label" style={{ marginBottom: "16px" }}>Skills</div>
            <h2 className="ht-font-display" style={{
              fontWeight: 700,
              fontSize: "clamp(28px, 3vw, 40px)",
              letterSpacing: "-0.03em",
              color: "var(--white)",
              marginBottom: "36px",
            }}>
              Full-stack &amp; beyond
            </h2>
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
            {skillGroups.map((group) => (
              <motion.div key={group.category} variants={fadeUp} className="skill-group">
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
                  <LimeDot />
                  <h3 className="ht-font-display" style={{
                    fontSize: "13px", fontWeight: 600, color: "var(--white)", letterSpacing: "0.04em",
                  }}>
                    {group.category}
                  </h3>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
                  {group.skills.map((skill) => (
                    <span key={skill} className="tech-tag">{skill}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
