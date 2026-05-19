"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animationVariants";

const experiences = [
  {
    company: "rtCamp",
    role: "Senior Software Engineer",
    period: "Jan 2023 – Present",
    type: "Remote · WordPress VIP Gold Agency",
    highlights: [
      "Worked as a Growth Engineer — managed clients end-to-end including technical consultancy, business analysis, proposal preparation, quotations, timeline discussions, client dealings, Scope of Work creation, and upselling.",
      "Developing high-performance dynamic Gutenberg blocks and leading frontend performance initiatives for Canada's largest media house — one of the highest-traffic publishing platforms in the country.",
      "Technical Lead for a top-rated U.S.-based futures prop trading firm: client consultation, system architecture, sprint planning, hands-on development, code review, and post-launch support.",
      "Led a cross-functional team of 8 engineers to architect and deliver 200+ landing pages in 6 weeks using a reusable PHP/ACF component system, driving a 32% sales increase and 200% daily visitor growth.",
      "Architected custom WordPress VIP plugins and REST API integrations, enforcing enterprise-level security, performance benchmarks, and coding standards.",
      "Built headless multisite WordPress networks: custom GraphQL API endpoints and React/Next.js frontend components.",
      "Contributed PHP theme templates, block patterns, and SSR blocks to the Built By WordPress (BBWPC) global open-source initiative.",
    ],
    tech: ["WordPress VIP", "PHP", "Gutenberg", "React", "Next.js", "GraphQL", "ACF", "WooCommerce", "REST API", "Technical Consultancy", "Business Analysis", "Scope of Work"],
  },
  {
    company: "Multidots Solutions Pvt Ltd",
    role: "Full Stack Developer",
    period: "Dec 2020 – Jan 2023",
    type: "Full-time · Ahmedabad, India",
    highlights: [
      "Led the full backend migration of a .NET platform to WordPress VIP — custom PHP plugins, WooCommerce integration, and RESTful APIs — resulting in a 34% sales increase post-launch.",
      "Built an in-house Gutenberg block library in PHP and React.js (server-side rendered, reusable across projects), significantly improving team development velocity.",
      "Contributed to WordPress Core, Meta, Polyglots, and other WordPress.org domains.",
      "Debugged and modernised multiple legacy PHP codebases, integrating them with modern WordPress APIs and third-party services while preserving core business logic.",
      "Delivered technical consultation directly to clients on architecture decisions, aligning backend solutions with business timelines and budgets.",
    ],
    tech: ["WordPress", "PHP", "WooCommerce", "React.js", "Gutenberg", "REST API", "MySQL", "CSS"],
  },
  {
    company: "Tesseract Technolabs",
    role: "Data Science Intern",
    period: "Nov 2024 – May 2025",
    type: "Apprenticeship · Remote · Gujarat, India",
    highlights: [
      "Completed a 6-month Data Science internship gaining hands-on experience in AI, Machine Learning, and Deep Learning.",
      "Worked on real-world datasets and built predictive models using Python, applying ML techniques to solve practical problems.",
    ],
    tech: ["Python", "Machine Learning", "Deep Learning", "AI", "Data Science"],
  },
  {
    company: "Dev Information Technology Limited",
    role: "Software Engineer Intern",
    period: "Oct 2020 – Nov 2020",
    type: "Internship · India",
    highlights: [
      "Developed a full-scale module for a company management system using the MERN stack with a team of 4 developers.",
    ],
    tech: ["MongoDB", "Express.js", "React", "Node.js", "API Development", "Firebase"],
  },
  {
    company: "Llychee",
    role: "Machine Learning Intern",
    period: "Sep 2020 – Oct 2020",
    type: "Internship",
    highlights: [
      "Built a cutting-edge web scraper to extract LinkedIn profiles and identify professionals matching specific job descriptions using ML-driven relevance scoring.",
    ],
    tech: ["Python", "Web Scraping", "Machine Learning", "Firebase"],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="section-mobile-pad" style={{
      position: "relative",
      paddingTop: "128px", paddingBottom: "128px",
      borderTop: "1px solid var(--border)",
      zIndex: 1,
    }}>
      <div className="ht-container">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="section-label" style={{ marginBottom: "16px" }}>Experience</div>
          <h2 className="ht-font-display" style={{
            fontWeight: 700,
            fontSize: "clamp(32px, 4vw, 48px)",
            letterSpacing: "-0.03em",
            color: "var(--white)",
            marginBottom: "56px",
          }}>
            Where I&apos;ve worked
          </h2>
        </motion.div>

        {/* Timeline container */}
        <div style={{ position: "relative", paddingLeft: "28px" }}>
          {/* Vertical line */}
          <div style={{
            position: "absolute",
            left: "0",
            top: "8px",
            bottom: "8px",
            width: "1px",
            background: "linear-gradient(to bottom, var(--lime) 0%, rgba(200,255,0,0.1) 100%)",
          }} aria-hidden="true" />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{ display: "flex", flexDirection: "column", gap: "24px" }}
          >
            {experiences.map((exp, idx) => (
              <motion.div
                key={exp.company}
                variants={fadeUp}
                whileHover="cardHovered"
                style={{ position: "relative" }}
              >
                {/* Timeline dot — responds to parent whileHover */}
                <motion.div
                  aria-hidden="true"
                  variants={{
                    cardHovered: { background: "var(--lime)", boxShadow: "0 0 12px var(--lime), 0 0 4px var(--lime)" },
                  }}
                  style={{
                    position: "absolute",
                    left: "-32px",
                    top: "28px",
                    width: "9px",
                    height: "9px",
                    borderRadius: "50%",
                    background: idx === 0 ? "var(--lime)" : "var(--bg-3)",
                    border: "1px solid",
                    borderColor: idx === 0 ? "var(--lime)" : "rgba(200,255,0,0.3)",
                    boxShadow: idx === 0 ? "0 0 12px var(--lime), 0 0 4px var(--lime)" : "none",
                    zIndex: 1,
                  }}
                  transition={{ duration: 0.25 }}
                />

                {/* Card — responds to parent whileHover */}
                <motion.div
                  variants={{
                    cardHovered: {
                      borderColor: "rgba(200,255,0,0.18)",
                      boxShadow: "0 8px 32px rgba(0,0,0,0.3), 0 0 24px rgba(200,255,0,0.04)",
                    },
                  }}
                  style={{
                    borderRadius: "10px",
                    padding: "28px 32px",
                    background: "var(--bg-2)",
                    border: "1px solid var(--border)",
                    cursor: "default",
                  }}
                  transition={{ duration: 0.25 }}
                >
                  {/* Header */}
                  <div style={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: "16px",
                    marginBottom: "20px",
                  }}>
                    <div>
                      <h3 className="ht-font-display" style={{
                        fontSize: "20px", fontWeight: 600, color: "var(--white)",
                        letterSpacing: "-0.01em",
                      }}>
                        {exp.role}
                      </h3>
                      <div style={{
                        display: "flex", alignItems: "center", gap: "8px", marginTop: "4px",
                      }}>
                        <span className="ht-font-display" style={{
                          color: "var(--lime)", fontSize: "14px", fontWeight: 600,
                        }}>
                          {exp.company}
                        </span>
                        <span style={{ color: "var(--white-30)", fontSize: "12px" }}>·</span>
                        <span className="ht-font-mono" style={{ color: "var(--white-60)", fontSize: "12px" }}>
                          {exp.type}
                        </span>
                      </div>
                    </div>
                    <span className="ht-font-mono" style={{
                      fontSize: "11px",
                      padding: "5px 12px",
                      borderRadius: "6px",
                      border: "1px solid var(--border-strong)",
                      color: "var(--white-60)",
                      letterSpacing: "0.04em",
                      flexShrink: 0,
                      background: "var(--white-06)",
                    }}>
                      {exp.period}
                    </span>
                  </div>

                  {/* Highlights */}
                  <ul style={{
                    display: "flex", flexDirection: "column", gap: "10px",
                    marginBottom: "20px",
                  }}>
                    {exp.highlights.map((h, i) => (
                      <li key={i} style={{
                        display: "flex", alignItems: "flex-start", gap: "10px",
                        color: "var(--white-60)", fontSize: "14px", lineHeight: "1.7",
                      }}>
                        <span style={{ color: "var(--lime)", marginTop: "3px", flexShrink: 0, fontSize: "12px" }}>▸</span>
                        {h}
                      </li>
                    ))}
                  </ul>

                  {/* Tech tags */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
                    {exp.tech.map((t) => (
                      <span key={t} className="tech-tag">{t}</span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
