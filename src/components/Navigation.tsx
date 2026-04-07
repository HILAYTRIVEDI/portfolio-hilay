"use client";

import { useEffect, useState } from "react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
      setScrolled(scrollTop > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Scroll progress bar */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "2px",
          width: `${progress}%`,
          background: "var(--lime)",
          boxShadow: "0 0 10px var(--lime)",
          zIndex: 100,
          transition: "width 0.1s linear",
        }}
      />

      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          padding: scrolled ? "12px 0" : "20px 0",
          background: scrolled ? "rgba(6,6,14,0.88)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
          transition: "all 0.3s ease",
        }}
      >
        <div
          className="ht-container"
          style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
        >
          {/* Logo */}
          <a
            href="#"
            className="ht-font-display"
            style={{ fontWeight: 700, fontSize: "14px", letterSpacing: "0.2em", color: "var(--white)", textDecoration: "none" }}
          >
            HT<span style={{ color: "var(--lime)" }}>.</span>
          </a>

          {/* Desktop links */}
          <ul style={{ display: "flex", alignItems: "center", gap: "32px", listStyle: "none", margin: 0, padding: 0 }}
              className="desktop-nav">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="ht-font-mono hover-underline"
                  style={{ fontSize: "12px", letterSpacing: "0.08em", color: "var(--white-60)", textDecoration: "none" }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <a
            href="mailto:hilaytrivedi1224@gmail.com"
            className="ht-font-mono desktop-nav"
            style={{
              fontSize: "11px",
              letterSpacing: "0.08em",
              padding: "8px 16px",
              borderRadius: "2px",
              border: "1px solid var(--lime)",
              color: "var(--lime)",
              textDecoration: "none",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "var(--lime)";
              el.style.color = "var(--bg)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "transparent";
              el.style.color = "var(--lime)";
            }}
          >
            Hire Me
          </a>

          {/* Mobile toggle */}
          <button
            style={{ display: "none", flexDirection: "column", gap: "6px", padding: "8px", background: "none", border: "none", cursor: "pointer" }}
            className="mobile-nav-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {[0, 1, 2].map((i) => (
              <span key={i} style={{ display: "block", width: "24px", height: "1px", background: "var(--white)", transition: "all 0.3s ease" }} />
            ))}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              background: "rgba(6,6,14,0.97)",
              backdropFilter: "blur(20px)",
              borderBottom: "1px solid var(--border)",
              padding: "24px",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="ht-font-mono"
                style={{ fontSize: "14px", color: "var(--white-60)", textDecoration: "none" }}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="mailto:hilaytrivedi1224@gmail.com"
              className="ht-font-mono"
              style={{ fontSize: "14px", color: "var(--lime)", textDecoration: "none" }}
              onClick={() => setMenuOpen(false)}
            >
              Hire Me →
            </a>
          </div>
        )}
      </nav>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-nav-toggle { display: flex !important; }
        }
      `}</style>
    </>
  );
}
