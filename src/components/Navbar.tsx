import { useState, useEffect } from "react";
import brandLogo from '../assets/Brand logo 3.png';

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [active, setActive] = useState("Home");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);

    const sectionElements = navLinks
      .map((link) => document.querySelector(link.href))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const currentLink = navLinks.find(
              (link) => link.href === `#${entry.target.id}`
            );
            if (currentLink) {
              setActive(currentLink.label);
            }
          }
        });
      },
      {
        rootMargin: "-50% 0px -50% 0px",
      }
    );

    sectionElements.forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700&display=swap');
        .navbar-blur-strip {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 140px;
          z-index: 999;
          pointer-events: none;
        }

        .navbar-blur-strip > span {
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          -webkit-mask-image: linear-gradient(to bottom, black, transparent);
          mask-image: linear-gradient(to bottom, black, transparent);
        }

        .navbar-blur-strip > span:nth-child(1) {
          height: 100%;
          backdrop-filter: blur(1px);
          -webkit-backdrop-filter: blur(1px);
        }
        .navbar-blur-strip > span:nth-child(2) {
          height: 85%;
          backdrop-filter: blur(2px);
          -webkit-backdrop-filter: blur(2px);
        }
        .navbar-blur-strip > span:nth-child(3) {
          height: 70%;
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
        }
        .navbar-blur-strip > span:nth-child(4) {
          height: 55%;
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
        }
        .navbar-blur-strip > span:nth-child(5) {
          height: 40%;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }

        /* ── Navbar pill ── */
        .navbar-wrapper {
          position: fixed;
          top: 24px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 1000;
          width: calc(100% - 48px);
          max-width: 720px;
          font-family: 'Syne', sans-serif;
        }

        .navbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 10px 10px 22px;
          border-radius: 999px;
          background: rgba(22, 22, 26, 0.58);
          backdrop-filter: blur(32px) saturate(1.5) brightness(0.8);
          -webkit-backdrop-filter: blur(32px) saturate(1.5) brightness(0.8);
          border: 1px solid rgba(255, 255, 255, 0.12);
          box-shadow:
            0 8px 32px rgba(0, 0, 0, 0.22),
            0 2px 8px rgba(0, 0, 0, 0.14),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
          transition: background 0.3s ease, box-shadow 0.3s ease, backdrop-filter 0.3s ease;
        }

        .navbar.scrolled {
          background: rgba(14, 14, 18, 0.72);
          backdrop-filter: blur(40px) saturate(1.6) brightness(0.75);
          -webkit-backdrop-filter: blur(40px) saturate(1.6) brightness(0.75);
          box-shadow:
            0 12px 40px rgba(0, 0, 0, 0.32),
            0 4px 12px rgba(0, 0, 0, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.12);
        }

        .navbar-logo {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 15px;
          font-weight: 700;
          letter-spacing: 0.04em;
          color: rgba(255, 255, 255, 0.95);
          white-space: nowrap;
          text-decoration: none;
          flex-shrink: 0;
        }

        .brand-logo {
          height: 24px;
          width: auto;
          object-fit: contain;
        }

        .navbar-links {
          display: flex;
          align-items: center;
          gap: 2px;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .navbar-links a {
          display: block;
          padding: 8px 14px;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.02em;
          color: rgba(255, 255, 255, 0.72);
          text-decoration: none;
          border-radius: 999px;
          transition: color 0.2s ease, background 0.2s ease;
          white-space: nowrap;
        }

        .navbar-links a:hover {
          color: rgba(255, 255, 255, 0.95);
          background: rgba(255, 255, 255, 0.1);
        }

        .navbar-links a.active {
          color: #fff;
          background: rgba(255, 255, 255, 0.16);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        .navbar-cta {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 9px 20px;
          background: rgba(255, 255, 255, 0.95);
          color: #111;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.02em;
          text-decoration: none;
          white-space: nowrap;
          flex-shrink: 0;
          transition: background 0.2s ease, transform 0.15s ease;
          border: none;
          cursor: pointer;
          font-family: 'Syne', sans-serif;
        }

        .navbar-cta:hover {
          background: #fff;
          transform: scale(1.02);
        }

        .navbar-cta:active {
          transform: scale(0.98);
        }

        .hamburger {
          display: none;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 5px;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.18);
          cursor: pointer;
          transition: background 0.2s;
          flex-shrink: 0;
        }

        .hamburger:hover {
          background: rgba(255, 255, 255, 0.18);
        }

        .hamburger span {
          display: block;
          width: 16px;
          height: 1.5px;
          background: rgba(255, 255, 255, 0.9);
          border-radius: 2px;
          transition: transform 0.25s ease, opacity 0.25s ease;
          transform-origin: center;
        }

        .hamburger.open span:nth-child(1) {
          transform: translateY(6.5px) rotate(45deg);
        }

        .hamburger.open span:nth-child(2) {
          opacity: 0;
        }

        .hamburger.open span:nth-child(3) {
          transform: translateY(-6.5px) rotate(-45deg);
        }

        .mobile-menu {
          margin-top: 10px;
          border-radius: 24px;
          background: rgba(22, 22, 26, 0.62);
          backdrop-filter: blur(32px) saturate(1.5) brightness(0.8);
          -webkit-backdrop-filter: blur(32px) saturate(1.5) brightness(0.8);
          border: 1px solid rgba(255, 255, 255, 0.12);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
          overflow: hidden;
          transform-origin: top center;
          animation: slideDown 0.2s ease forwards;
          padding: 8px;
        }

        @keyframes slideDown {
          from { opacity: 0; transform: scaleY(0.92) translateY(-4px); }
          to   { opacity: 1; transform: scaleY(1) translateY(0); }
        }

        .mobile-menu a {
          display: block;
          padding: 11px 16px;
          font-size: 14px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.8);
          text-decoration: none;
          border-radius: 14px;
          transition: background 0.15s, color 0.15s;
        }

        .mobile-menu a:hover {
          background: rgba(255, 255, 255, 0.1);
          color: #fff;
        }

        .mobile-menu a.active {
          background: rgba(255, 255, 255, 0.15);
          color: #fff;
        }

        @media (max-width: 600px) {
          .navbar-links, .navbar-cta {
            display: none;
          }

          .hamburger {
            display: flex;
          }
        }
      `}</style>

      <div className="navbar-blur-strip" aria-hidden="true">
        <span /><span /><span /><span /><span />
      </div>

      <nav className="navbar-wrapper">
        <div className={`navbar${scrolled ? " scrolled" : ""}`}>
          <a href="#home" className="navbar-logo">
            <img className="brand-logo" src={brandLogo} alt="" />
            Devayadhurag.
          </a>

          <ul className="navbar-links">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className={active === link.label ? "active" : ""}
                  onClick={() => setActive(link.label)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <button
            className={`hamburger${menuOpen ? " open" : ""}`}
            onClick={() => setMenuOpen((p) => !p)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        {menuOpen && (
          <div className="mobile-menu">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={active === link.label ? "active" : ""}
                onClick={() => { setActive(link.label); setMenuOpen(false); }}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </nav>
    </>
  );
}