"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, staggerContainerFast } from "@/lib/animationVariants";

type Links = { github?: string; live?: string };

const featured = {
  name: "Tower of Agents",
  tagline: "Governed multi-agent orchestration",
  description:
    "A production multi-agent system where a supervisor plans, routes, and coordinates specialised agents over a shared memory layer, with guardrails on every output. Built to make autonomous agents predictable, observable, and safe to run in production.",
  tech: ["LangGraph", "Multi-Agent", "Agent Memory", "GraphRAG", "MCP", "Python", "FastAPI", "Guardrails"],
  category: "Multi-Agent AI",
  links: { live: "https://tower-of-agents.vercel.app", github: "https://github.com/HILAYTRIVEDI/tower-of-agents" } as Links,
  diagram: [
    ["User / Task"],
    ["Supervisor"],
    ["Planner", "Router"],
    ["Agent A", "Agent B", "Agent C"],
    ["Shared Memory", "Tool / MCP Layer"],
    ["Guardrails → Output"],
  ],
};

const caseStudies = [
  {
    name: "Agent memory layer",
    tagline: "Persistent, governed memory for autonomous agents",
    category: "AI Infrastructure",
    problem:
      "Agents forget context across turns and sessions, re-fetch the same knowledge, and drift without a durable, queryable store — making them unreliable in long-running production workflows.",
    architecture:
      "A layered memory service: short-term working memory, episodic session memory, and a long-term semantic store backed by vector + graph retrieval (GraphRAG). Writes pass through summarisation and relevance scoring; reads are scoped per agent and per task.",
    diagram: undefined as string[] | undefined,
    decisions: [
      "Separate working / episodic / semantic tiers so recall cost scales with need, not history size.",
      "Graph + vector hybrid retrieval to keep both relationships and semantic similarity queryable.",
      "Deterministic write policies (summarise, dedupe, score) to stop unbounded memory growth.",
    ],
    note: "Case study — architecture and design decisions only. No client code.",
    tech: ["GraphRAG", "Vector DB", "LangGraph", "Python", "Summarisation", "Relevance Scoring"],
  },
  {
    name: "AI code security gate",
    tagline: "Layered enforcement before AI-generated code merges",
    category: "AI Security",
    problem:
      "AI-generated code can introduce vulnerabilities, secrets, and policy violations that slip past a single review. One check is not enough for production merges.",
    architecture:
      "Defence-in-depth: each commit passes through stacked gates — static analysis, policy/rule enforcement, an LLM security review, then human approval — and no stage can be skipped before merge.",
    diagram: [
      "Commit / PR",
      "Static Analysis Gate",
      "Policy / Rules Gate",
      "LLM Security Review",
      "Human Approval",
      "Merge",
    ] as string[] | undefined,
    decisions: [
      "Fail-closed gates: a failure at any layer blocks the merge by default.",
      "LLM review is one layer, never the sole authority — deterministic checks run first.",
      "Every decision is logged and attributable for audit.",
    ],
    note: "Case study — layered enforcement design. No client code.",
    tech: ["Static Analysis", "Policy Engine", "LLM Review", "CI/CD", "Fail-closed", "Audit Logging"],
  },
];

const standard = [
  {
    name: "Advoksha",
    tagline: "AI-powered legal research terminal",
    description:
      "Multi-agent AI legal assistant for attorneys. Features a Supervisor, Researcher, Linguistic Hub, and Drafter agent architecture. Integrates OCR & translation, contract generation, and High Court/Supreme Court research grounding.",
    tech: ["Next.js 16", "FastAPI", "Python 3.11", "Google Gemini 2.5", "Supabase", "Redis", "Docker"],
    links: { github: "https://github.com/HILAYTRIVEDI/advoksha" } as Links,
    category: "AI Legal",
    highlights: ["Multi-agent system", "OCR & translation", "Court research grounding"],
  },
  {
    name: "LessonBuild",
    tagline: "AI lesson & curriculum builder",
    description:
      "Turns a topic or syllabus into structured, standards-aligned lessons — objectives, activities, assessments, and materials — generated and refined through an AI pipeline that keeps educators in the loop.",
    tech: ["Next.js", "FastAPI", "Python", "LLM Pipeline", "Supabase", "TypeScript"],
    links: { github: "https://github.com/HILAYTRIVEDI/lessonbuild" } as Links,
    category: "AI EdTech",
    highlights: ["Standards-aligned output", "AI generation pipeline", "Educator-in-the-loop"],
  },
  {
    name: "CreatorNexus AI",
    tagline: "Research intelligence platform",
    description:
      "Full-stack AI research SaaS built solo. Visualises research as an interactive causal knowledge graph with multi-source verification, defamation detection, and sponsor-safe content checks. 168+ commits in production.",
    tech: ["Next.js 16", "FastAPI", "Python", "Google Gemini", "Supabase", "Stripe", "D3.js", "WebSockets"],
    links: { github: "https://github.com/HILAYTRIVEDI/CreatorNexus-AI" } as Links,
    category: "AI SaaS",
    highlights: ["Knowledge graph visualisation", "Defamation detection", "Stripe billing"],
  },
];

const more = [
  { name: "Blog-to-Shots", note: "Blog URL → short-form vertical video", href: "https://github.com/HILAYTRIVEDI/blog-to-shots" },
  { name: "StopSlop", note: "AI content quality guard", href: "https://github.com/HILAYTRIVEDI/stopslop" },
  { name: "Mutual Fund Nexus", note: "Portfolio management for advisors", href: "https://github.com/HILAYTRIVEDI/mutual-fund-nexus" },
  { name: "AbilityHub", note: "Accessibility-first platform", href: "https://github.com/HILAYTRIVEDI/abilityhub" },
  { name: "LLM Indexing Plugins", note: "Plugin ecosystem for LLM optimisation", href: "https://github.com/HILAYTRIVEDI/llm-indexing-plugins" },
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

function LinkPill({ label, href, primary = false }: { label: string; href: string; primary?: boolean }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="ht-font-mono"
      style={{
        fontSize: "12px", padding: "8px 16px",
        borderRadius: "6px",
        border: `1px solid ${primary ? "rgba(200,255,0,0.3)" : "var(--border-strong)"}`,
        background: primary ? "rgba(200,255,0,0.08)" : "transparent",
        color: primary ? "var(--lime)" : "var(--white-60)",
        textDecoration: "none",
        display: "inline-flex", alignItems: "center", gap: "6px",
        flexShrink: 0,
      }}
      whileHover={{ borderColor: "rgba(200,255,0,0.3)", color: "var(--lime)", background: "rgba(200,255,0,0.06)" }}
      transition={{ duration: 0.2 }}
    >
      {label} <GitHubArrow />
    </motion.a>
  );
}

/* Branching flow diagram for the featured architecture */
function ArchitectureDiagram({ layers }: { layers: string[][] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", width: "100%" }}>
      {layers.map((row, i) => (
        <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", width: "100%" }}>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "6px", width: "100%" }}>
            {row.map((node) => (
              <div key={node} className="ht-font-mono" style={{
                fontSize: "10px", letterSpacing: "0.04em",
                padding: "7px 12px", borderRadius: "6px",
                border: "1px solid rgba(200,255,0,0.22)",
                background: "rgba(200,255,0,0.05)",
                color: "var(--white)", textAlign: "center",
              }}>
                {node}
              </div>
            ))}
          </div>
          {i < layers.length - 1 && (
            <span style={{ color: "var(--lime)", fontSize: "12px", lineHeight: 1 }} aria-hidden="true">↓</span>
          )}
        </div>
      ))}
    </div>
  );
}

/* Single-column layered enforcement diagram */
function LayeredDiagram({ steps }: { steps: string[] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "stretch", gap: "6px" }}>
      {steps.map((step, i) => (
        <div key={step} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
          <div className="ht-font-mono" style={{
            width: "100%", fontSize: "11px", letterSpacing: "0.04em",
            padding: "9px 14px", borderRadius: "6px",
            border: "1px solid rgba(200,255,0,0.22)",
            background: i === steps.length - 1 ? "rgba(200,255,0,0.1)" : "rgba(200,255,0,0.04)",
            color: "var(--white)", textAlign: "center",
          }}>
            {step}
          </div>
          {i < steps.length - 1 && (
            <span style={{ color: "var(--lime)", fontSize: "12px", lineHeight: 1 }} aria-hidden="true">↓</span>
          )}
        </div>
      ))}
    </div>
  );
}

function FeaturedCard() {
  return (
    <motion.div
      className="project-card"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      whileHover={{
        y: -6,
        borderColor: "rgba(200,255,0,0.18)",
        boxShadow: "0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(200,255,0,0.08), 0 0 48px rgba(200,255,0,0.04)",
      }}
      transition={{ duration: 0.3 }}
      style={{ marginBottom: "16px" }}
    >
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0" }}>
        {/* Left — text content */}
        <div style={{ flex: "1", minWidth: "300px", padding: "32px 36px" }}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", justifyContent: "space-between", gap: "16px", marginBottom: "20px" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px", flexWrap: "wrap" }}>
                <span className="ht-font-mono" style={{
                  fontSize: "10px", padding: "2px 10px", borderRadius: "4px",
                  background: "rgba(200,255,0,0.1)", color: "var(--lime)",
                  border: "1px solid rgba(200,255,0,0.22)", letterSpacing: "0.08em",
                }}>
                  {featured.category}
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
                {featured.name}
              </h3>
              <p style={{ marginTop: "6px", fontSize: "14px", color: "var(--lime)", fontStyle: "italic" }}>
                {featured.tagline}
              </p>
            </div>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", flexShrink: 0 }}>
              {featured.links.live && <LinkPill label="Live" href={featured.links.live} primary />}
              {featured.links.github && <LinkPill label="GitHub" href={featured.links.github} />}
            </div>
          </div>

          <p style={{ color: "var(--white-60)", fontSize: "15px", lineHeight: "1.75" }}>
            {featured.description}
          </p>

          <div style={{
            marginTop: "20px", paddingTop: "20px",
            borderTop: "1px solid var(--border)",
            display: "flex", flexWrap: "wrap", gap: "7px",
          }}>
            {featured.tech.map((t) => (
              <span key={t} className="tech-tag">{t}</span>
            ))}
          </div>
        </div>

        {/* Right — architecture diagram */}
        <div style={{
          width: "340px", flexShrink: 0,
          borderLeft: "1px solid var(--border)",
          background: "var(--bg-3)",
          position: "relative", overflow: "hidden",
          padding: "28px 24px",
          display: "flex", flexDirection: "column",
        }}>
          <div className="ht-font-mono" style={{
            fontSize: "9px", color: "var(--white-30)", letterSpacing: "0.12em", marginBottom: "16px",
          }}>
            ARCHITECTURE
          </div>
          <ArchitectureDiagram layers={featured.diagram} />
        </div>
      </div>
    </motion.div>
  );
}

function CaseStudyCard({ study }: { study: (typeof caseStudies)[number] }) {
  return (
    <motion.div
      className="project-card"
      variants={fadeUp}
      whileHover={{
        y: -6,
        borderColor: "rgba(200,255,0,0.18)",
        boxShadow: "0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(200,255,0,0.08), 0 0 48px rgba(200,255,0,0.04)",
      }}
      transition={{ duration: 0.3 }}
      style={{ marginBottom: "16px" }}
    >
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0" }}>
        {/* Left — case study text */}
        <div style={{ flex: "1", minWidth: "300px", padding: "32px 36px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px", flexWrap: "wrap" }}>
            <span className="ht-font-mono" style={{
              fontSize: "10px", padding: "2px 10px", borderRadius: "4px",
              background: "rgba(200,255,0,0.1)", color: "var(--lime)",
              border: "1px solid rgba(200,255,0,0.22)", letterSpacing: "0.08em",
            }}>
              {study.category}
            </span>
            <span className="ht-font-mono" style={{
              fontSize: "10px", padding: "2px 10px", borderRadius: "4px",
              background: "rgba(200,255,0,0.06)", color: "var(--lime)",
              border: "1px solid rgba(200,255,0,0.15)", letterSpacing: "0.08em",
            }}>
              Case study
            </span>
          </div>
          <h3 className="ht-font-display" style={{
            fontSize: "clamp(20px, 2.6vw, 28px)", fontWeight: 700,
            color: "var(--white)", lineHeight: 1.15, letterSpacing: "-0.02em",
          }}>
            {study.name}
          </h3>
          <p style={{ marginTop: "6px", fontSize: "14px", color: "var(--lime)", fontStyle: "italic" }}>
            {study.tagline}
          </p>

          <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "16px" }}>
            <div>
              <div className="ht-font-mono" style={{ fontSize: "10px", color: "var(--white-30)", letterSpacing: "0.12em", marginBottom: "6px" }}>PROBLEM</div>
              <p style={{ color: "var(--white-60)", fontSize: "14px", lineHeight: "1.7" }}>{study.problem}</p>
            </div>
            <div>
              <div className="ht-font-mono" style={{ fontSize: "10px", color: "var(--white-30)", letterSpacing: "0.12em", marginBottom: "6px" }}>ARCHITECTURE</div>
              <p style={{ color: "var(--white-60)", fontSize: "14px", lineHeight: "1.7" }}>{study.architecture}</p>
            </div>
            <div>
              <div className="ht-font-mono" style={{ fontSize: "10px", color: "var(--white-30)", letterSpacing: "0.12em", marginBottom: "8px" }}>DESIGN DECISIONS</div>
              <ul style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {study.decisions.map((d) => (
                  <li key={d} style={{ display: "flex", alignItems: "flex-start", gap: "10px", color: "var(--white-60)", fontSize: "14px", lineHeight: "1.65" }}>
                    <span style={{ color: "var(--lime)", marginTop: "3px", flexShrink: 0, fontSize: "12px" }}>▸</span>
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div style={{
            marginTop: "20px", paddingTop: "20px",
            borderTop: "1px solid var(--border)",
            display: "flex", flexWrap: "wrap", gap: "7px",
          }}>
            {study.tech.map((t) => (
              <span key={t} className="tech-tag">{t}</span>
            ))}
          </div>
          <p className="ht-font-mono" style={{ marginTop: "14px", fontSize: "11px", color: "var(--white-30)" }}>
            {study.note}
          </p>
        </div>

        {/* Right — diagram panel (only for the security gate) */}
        {study.diagram && (
          <div style={{
            width: "300px", flexShrink: 0,
            borderLeft: "1px solid var(--border)",
            background: "var(--bg-3)",
            padding: "28px 24px",
            display: "flex", flexDirection: "column",
          }}>
            <div className="ht-font-mono" style={{
              fontSize: "9px", color: "var(--white-30)", letterSpacing: "0.12em", marginBottom: "16px",
            }}>
              LAYERED ENFORCEMENT
            </div>
            <LayeredDiagram steps={study.diagram} />
          </div>
        )}
      </div>
    </motion.div>
  );
}

function ProjectCard({ project }: { project: (typeof standard)[number] }) {
  return (
    <motion.div
      className="project-card"
      variants={fadeUp}
      whileHover={{
        y: -6,
        borderColor: "rgba(200,255,0,0.18)",
        boxShadow: "0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(200,255,0,0.08), 0 0 48px rgba(200,255,0,0.04)",
      }}
      transition={{ duration: 0.3 }}
    >
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
            <motion.a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="ht-font-mono"
              style={{
                fontSize: "11px", padding: "6px 10px",
                borderRadius: "6px", border: "1px solid var(--border)",
                color: "var(--white-60)", textDecoration: "none",
                display: "inline-flex", alignItems: "center", gap: "5px",
                marginLeft: "12px", flexShrink: 0,
              }}
              whileHover={{ borderColor: "rgba(200,255,0,0.28)", color: "var(--lime)", background: "rgba(200,255,0,0.04)" }}
              transition={{ duration: 0.2 }}
            >
              GH <GitHubArrow />
            </motion.a>
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
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="section-mobile-pad" style={{
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
                  fontSize: "12px", color: "var(--lime)", textDecoration: "none",
                }}>
                All repos on GitHub →
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* 1 — Featured: Tower of Agents */}
        <FeaturedCard />

        {/* 2 & 3 — Case studies */}
        <motion.div
          variants={staggerContainerFast}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {caseStudies.map((study) => (
            <CaseStudyCard key={study.name} study={study} />
          ))}
        </motion.div>

        {/* 4, 5, 6 — Standard grid */}
        <motion.div
          variants={staggerContainerFast}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "12px",
          }}
        >
          {standard.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </motion.div>

        {/* More row */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{ marginTop: "40px" }}
        >
          <div className="ht-font-mono" style={{
            fontSize: "11px", color: "var(--white-30)", letterSpacing: "0.14em",
            marginBottom: "16px",
          }}>
            MORE
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {more.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="skill-group"
                whileHover={{ borderColor: "rgba(200,255,0,0.22)", background: "rgba(200,255,0,0.04)" }}
                transition={{ duration: 0.2 }}
                style={{
                  textDecoration: "none", display: "flex", flexDirection: "column", gap: "3px",
                  padding: "14px 18px", flex: "1 1 220px", minWidth: "200px",
                }}
              >
                <span className="ht-font-display" style={{ fontSize: "14px", fontWeight: 600, color: "var(--white)" }}>
                  {item.name}
                </span>
                <span style={{ fontSize: "12px", color: "var(--white-60)", lineHeight: "1.5" }}>
                  {item.note}
                </span>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
