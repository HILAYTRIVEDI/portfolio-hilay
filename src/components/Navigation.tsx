"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { slideDown } from "@/lib/animationVariants";

const navLinks = [
  { label: "About", href: "#about", section: "about" },
  { label: "Work", href: "#experience", section: "experience" },
  { label: "Projects", href: "#projects", section: "projects" },
  { label: "Open Source", href: "#open-source", section: "open-source" },
  { label: "Contact", href: "#contact", section: "contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
      setScrolled(scrollTop > 60);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.2, rootMargin: "-10% 0px -65% 0px" }
    );
    navLinks.forEach(({ section }) => {
      const el = document.getElementById(section);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Scroll progress */}
      <div style={{
        position: "fixed", top: 0, left: 0,
        height: "2px", width: `${progress}%`,
        background: "var(--lime)",
        boxShadow: "0 0 12px var(--lime)",
        zIndex: 100, transition: "width 0.12s linear",
      }} />

      {/* Floating pill wrapper */}
      <div style={{
        position: "fixed", top: "14px", left: 0, right: 0,
        display: "flex", justifyContent: "center",
        padding: "0 16px", zIndex: 50,
        pointerEvents: "none",
      }}>
        <nav
          aria-label="Primary"
          style={{
            pointerEvents: "auto",
            display: "flex",
            alignItems: "center",
            background: scrolled ? "rgba(9,9,15,0.92)" : "rgba(9,9,15,0.55)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid",
            borderColor: scrolled ? "rgba(237,237,234,0.13)" : "rgba(237,237,234,0.07)",
            borderRadius: "9999px",
            padding: "7px 7px 7px 22px",
            gap: "28px",
            transition: "background 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease",
            boxShadow: scrolled ? "0 8px 40px rgba(0,0,0,0.45), 0 0 0 1px rgba(200,255,0,0.04)" : "none",
            maxWidth: "860px",
            width: "100%",
          }}>
          {/* Logo */}
          <a href="#" className="ht-font-display" style={{
            fontWeight: 700, fontSize: "15px",
            letterSpacing: "0.15em", color: "var(--white)",
            textDecoration: "none", flexShrink: 0,
          }}>
            HT<span style={{ color: "var(--lime)" }}>.</span>
          </a>

          {/* Desktop links */}
          <ul style={{
            display: "flex", alignItems: "center", gap: "24px",
            listStyle: "none", margin: 0, padding: 0, flex: 1,
            justifyContent: "center",
          }} className="desktop-nav">
            {navLinks.map((link) => {
              const isActive = activeSection === link.section;
              return (
                <li key={link.href}>
                  <a href={link.href} className="ht-font-mono" style={{
                    fontSize: "12px", letterSpacing: "0.05em",
                    color: isActive ? "var(--lime)" : "var(--white-60)",
                    textDecoration: "none",
                    transition: "color 0.2s ease",
                    position: "relative",
                    paddingBottom: "2px",
                  }}>
                    {link.label}
                    {isActive && (
                      <span style={{
                        position: "absolute", bottom: "-4px", left: "50%",
                        transform: "translateX(-50%)",
                        width: "3px", height: "3px",
                        borderRadius: "50%", background: "var(--lime)",
                      }} />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* CTA pill */}
          <motion.a
            href="mailto:hilaytrivedi1224@gmail.com"
            className="ht-font-mono desktop-nav"
            style={{
              fontSize: "11px", letterSpacing: "0.08em",
              padding: "9px 20px", borderRadius: "9999px",
              background: "var(--lime)", color: "var(--bg)",
              textDecoration: "none", fontWeight: 600, flexShrink: 0,
              display: "inline-block",
            }}
            whileHover={{ scale: 1.05, boxShadow: "0 4px 16px rgba(200,255,0,0.3)" }}
            transition={{ duration: 0.2 }}
          >
            Hire Me
          </motion.a>

          {/* Mobile toggle */}
          <button
            style={{
              display: "none", padding: "10px 14px",
              background: "none", border: "none", cursor: "pointer",
            }}
            className="mobile-nav-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
              {[0, 1, 2].map((i) => (
                <span key={i} style={{
                  display: "block", width: "22px", height: "1.5px",
                  background: "var(--white)", borderRadius: "1px",
                  transition: "transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.3s ease",
                  transform: menuOpen
                    ? i === 0 ? "rotate(45deg) translate(4.5px, 4.5px)"
                      : i === 1 ? "scaleX(0) translateX(-10px)"
                      : "rotate(-45deg) translate(4.5px, -4.5px)"
                    : "none",
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }} />
              ))}
            </div>
          </button>
        </nav>
      </div>

      {/* Mobile dropdown with AnimatePresence */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            variants={slideDown}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{
              position: "fixed", top: "72px", left: "16px", right: "16px",
              background: "rgba(9,9,15,0.97)",
              backdropFilter: "blur(28px)", WebkitBackdropFilter: "blur(28px)",
              border: "1px solid rgba(237,237,234,0.1)",
              borderRadius: "16px",
              zIndex: 49, boxShadow: "0 24px 60px rgba(0,0,0,0.6)",
              overflow: "hidden",
            }}
          >
            <div style={{ padding: "12px", display: "flex", flexDirection: "column", gap: "2px" }}>
              {navLinks.map((link) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className="ht-font-mono"
                  style={{
                    fontSize: "14px", color: "var(--white-60)",
                    textDecoration: "none", padding: "13px 16px",
                    borderRadius: "10px", display: "block",
                  }}
                  whileHover={{ background: "rgba(237,237,234,0.06)", color: "var(--white)" }}
                  transition={{ duration: 0.15 }}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </motion.a>
              ))}
              <div style={{ height: "1px", background: "var(--border)", margin: "4px 0" }} />
              <motion.a
                href="mailto:hilaytrivedi1224@gmail.com"
                className="ht-font-mono"
                style={{
                  fontSize: "14px", color: "var(--lime)", textDecoration: "none",
                  padding: "13px 16px", borderRadius: "10px",
                  border: "1px solid rgba(200,255,0,0.18)",
                  background: "rgba(200,255,0,0.05)", display: "block",
                }}
                whileHover={{ background: "rgba(200,255,0,0.1)" }}
                transition={{ duration: 0.15 }}
                onClick={() => setMenuOpen(false)}
              >
                Hire Me ↗
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-nav-toggle { display: flex !important; }
        }
      `}</style>
    </>
  );
}
