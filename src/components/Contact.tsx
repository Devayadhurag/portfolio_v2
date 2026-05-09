import { useState, useCallback, useInsertionEffect } from "react";
import { FiPhone, FiMail, FiArrowRight } from "react-icons/fi";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

// ─── Types ────────────────────────────────────────────────────────────────────
interface FormState {
  name: string;
  email: string;
  message: string;
}

interface ContactInfoItem {
  label: string;
  value: string;
  href: string;
  icon: React.ReactNode;
}

interface SocialLink {
  label: string;
  href: string;
  icon: React.ReactNode;
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const STYLES = `
  @keyframes contact-fade-in {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* ── Tokens ── */
  .contact-root {
    --c-orange:      #f4622a;
    --c-orange-lt:   #ff7b47;
    --c-black:       #0a0a0a;
    --c-card-bg:     #111111;
    --c-white:       #ffffff;
    --c-muted:       #888888;
    --c-border:      rgba(255, 255, 255, 0.08);
    --c-input-bg:    rgba(255, 255, 255, 0.05);
  }

  /* ── Section ── */
  .contact-root {
    min-height: 100vh;
    display: flex;
    align-items: center;
    background: #fff;
    font-family: "DM Sans", sans-serif;
    padding: 80px 0;
    animation: contact-fade-in 0.5s ease both;
  }

  /* ── Layout ── */
  .contact-wrapper {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 40px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    align-items: center;
  }

  /* ── Left column ── */
  .contact-left {
    display: flex;
    flex-direction: column;
    gap: 40px;
  }

  .contact-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--c-orange);
  }
  .contact-eyebrow::before {
    content: "";
    display: block;
    width: 28px;
    height: 2px;
    background: var(--c-orange);
    flex-shrink: 0;
  }

  .contact-heading {
    font-family: "Syne", sans-serif;
    font-size: clamp(42px, 5vw, 68px);
    font-weight: 800;
    line-height: 1;
    color: var(--c-black);
    margin: 0;
    letter-spacing: -0.02em;
  }
  .contact-heading span {
    color: var(--c-orange);
  }

  .contact-tagline {
    font-size: 15px;
    font-weight: 300;
    color: #555;
    line-height: 1.7;
    margin: 0;
    max-width: 360px;
  }

  /* ── Info list ── */
  .contact-info-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .contact-info-item {
    display: flex;
    align-items: center;
    gap: 16px;
    text-decoration: none;
    color: inherit;
    transition: transform 0.2s ease;
  }
  .contact-info-item:hover {
    transform: translateX(6px);
  }
  .contact-info-item:hover .contact-info-icon {
    background: var(--c-orange);
  }

  .contact-info-icon {
    width: 46px;
    height: 46px;
    border-radius: 12px;
    background: var(--c-black);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    color: #fff;
    font-size: 18px;
    transition: background 0.2s ease;
  }

  .contact-info-label {
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--c-muted);
    margin-bottom: 2px;
  }

  .contact-info-value {
    font-size: 15px;
    font-weight: 400;
    color: var(--c-black);
  }

  /* ── Social pills ── */
  .contact-socials {
    display: flex;
    gap: 12px;
    margin-top: 8px;
    flex-wrap: wrap;
  }

  .contact-social-pill {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 9px 18px;
    border-radius: 100px;
    border: 1.5px solid rgba(0, 0, 0, 0.15);
    font-family: "DM Sans", sans-serif;
    font-size: 13px;
    font-weight: 500;
    color: var(--c-black);
    text-decoration: none;
    background: transparent;
    cursor: pointer;
    transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
  }
  .contact-social-pill svg {
    font-size: 15px;
  }
  .contact-social-pill:hover {
    background: var(--c-black);
    color: #fff;
    border-color: var(--c-black);
  }

  /* ── Card ── */
  .contact-card {
    background: var(--c-card-bg);
    border-radius: 24px;
    padding: 44px;
    color: var(--c-white);
    position: relative;
    overflow: hidden;
    box-shadow: 0 32px 80px rgba(0, 0, 0, 0.22);
  }
  .contact-card::before {
    content: "";
    position: absolute;
    top: -60px;
    right: -60px;
    width: 220px;
    height: 220px;
    background: radial-gradient(circle, rgba(244, 98, 42, 0.18) 0%, transparent 70%);
    pointer-events: none;
  }

  .contact-card-heading {
    font-family: "Syne", sans-serif;
    font-size: 28px;
    font-weight: 700;
    letter-spacing: -0.01em;
    margin: 0 0 8px;
    color: var(--c-white);
  }

  .contact-card-sub {
    font-size: 13px;
    color: var(--c-muted);
    margin: 0 0 36px;
    font-weight: 300;
  }

  /* ── Form ── */
  .contact-form-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-bottom: 20px;
  }

  .contact-label {
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #666;
  }

  .contact-input,
  .contact-textarea {
    background: var(--c-input-bg);
    border: 1.5px solid var(--c-border);
    border-radius: 10px;
    padding: 14px 16px;
    font-family: "DM Sans", sans-serif;
    font-size: 14px;
    font-weight: 300;
    color: var(--c-white);
    outline: none;
    width: 100%;
    box-sizing: border-box;
    transition: border-color 0.2s ease, background 0.2s ease;
  }
  .contact-input::placeholder,
  .contact-textarea::placeholder {
    color: #444;
  }
  .contact-input:focus,
  .contact-textarea:focus {
    border-color: var(--c-orange);
    background: rgba(244, 98, 42, 0.04);
  }

  .contact-textarea {
    min-height: 110px;
    resize: none;
  }

  /* ── Submit button ── */
  .contact-send-btn {
    margin-top: 36px;
    width: 100%;
    padding: 16px;
    background: var(--c-orange);
    color: #fff;
    border: none;
    border-radius: 12px;
    font-family: "Syne", sans-serif;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    transition: background 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease;
  }
  .contact-send-btn svg {
    font-size: 17px;
    transition: transform 0.2s ease;
  }
  .contact-send-btn:hover {
    background: var(--c-orange-lt);
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba(244, 98, 42, 0.38);
  }
  .contact-send-btn:hover svg {
    transform: translateX(4px);
  }
  .contact-send-btn:active {
    transform: translateY(0);
    box-shadow: none;
  }
  .contact-send-btn--sent {
    background: #22c55e;
  }
  .contact-send-btn--sent:hover {
    background: #16a34a;
    box-shadow: none;
  }

  /* ── Responsive ── */
  @media (max-width: 900px) {
    .contact-wrapper {
      grid-template-columns: 1fr;
      gap: 52px;
      padding: 0 24px;
    }
    .contact-heading {
      font-size: 48px;
    }
    .contact-card {
      padding: 40px 30px;
    }
  }

  @media (max-width: 480px) {
    .contact-root {
      padding: 60px 0;
    }
    .contact-card {
      padding: 32px 22px;
    }
  }
`;

// ─── Static data ──────────────────────────────────────────────────────────────
const CONTACT_ITEMS: ContactInfoItem[] = [
  { label: "Phone", value: "+91 9400757256",   href: "tel:+919400757256",         icon: <FiPhone /> },
  { label: "Email", value: "devaydhurag@gmail.com", href: "mailto:devaydhurag@gmail.com", icon: <FiMail /> },
];

const SOCIAL_LINKS: SocialLink[] = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/devayadhurag/", icon: <FaLinkedinIn /> },
  { label: "Instagram",  href: "https://www.instagram.com/devayadhurag/", icon: <FaInstagram /> },
  { label: "GitHub",   href: "https://github.com/devayadhurag", icon: <FaGithub /> },
];

// ─── Sub-components ───────────────────────────────────────────────────────────
const ContactInfoList = () => (
  <div className="contact-info-list">
    {CONTACT_ITEMS.map(({ label, value, href, icon }) => (
      <a key={label} href={href} className="contact-info-item">
        <div className="contact-info-icon">{icon}</div>
        <div>
          <div className="contact-info-label">{label}</div>
          <div className="contact-info-value">{value}</div>
        </div>
      </a>
    ))}
  </div>
);

const SocialLinks = () => (
  <div className="contact-socials">
    {SOCIAL_LINKS.map(({ label, href, icon }) => (
      <a key={label} href={href} className="contact-social-pill" target="_blank">
        {icon}
        {label}
      </a>
    ))}
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────
const EMPTY_FORM: FormState = { name: "", email: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [sent, setSent] = useState(false);

  useInsertionEffect(() => {
    const id = "contact-styles";
    if (document.getElementById(id)) return;
    const tag = document.createElement("style");
    tag.id = id;
    tag.textContent = STYLES;
    document.head.appendChild(tag);
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setForm((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleSubmit = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      const { name, email, message } = form;
      if (!name.trim() || !email.trim() || !message.trim()) return;
      setSent(true);
      setTimeout(() => {
        setSent(false);
        setForm(EMPTY_FORM);
      }, 3000);
    },
    [form]
  );

  return (
    <section className="contact-root" id="contact">
      <div className="contact-wrapper">

        {/* ── Left column ── */}
        <div className="contact-left">
          <span className="contact-eyebrow">Get in touch</span>

          <h2 className="contact-heading">
            Let&apos;s<br />
            <span>Connect.</span>
          </h2>

          <p className="contact-tagline">
            Have a project in mind, a question, or just want to say hello?
            My inbox is always open.
          </p>

          <ContactInfoList />
          <SocialLinks />
        </div>

        {/* ── Right column – form card ── */}
        <div className="contact-card">
          <h3 className="contact-card-heading">Send a Message</h3>
          <p className="contact-card-sub">I&apos;ll get back to you within 24 hours.</p>

          <div className="contact-form-group">
            <label className="contact-label" htmlFor="contact-name">Name</label>
            <input
              id="contact-name"
              name="name"
              type="text"
              className="contact-input"
              placeholder="John Doe"
              value={form.name}
              onChange={handleChange}
              autoComplete="off"
            />
          </div>

          <div className="contact-form-group">
            <label className="contact-label" htmlFor="contact-email">Email</label>
            <input
              id="contact-email"
              name="email"
              type="email"
              className="contact-input"
              placeholder="john@example.com"
              value={form.email}
              onChange={handleChange}
              autoComplete="off"
            />
          </div>

          <div className="contact-form-group">
            <label className="contact-label" htmlFor="contact-message">Message</label>
            <textarea
              id="contact-message"
              name="message"
              className="contact-textarea"
              placeholder="Tell me about your project..."
              value={form.message}
              onChange={handleChange}
            />
          </div>

          <button
            className={`contact-send-btn${sent ? " contact-send-btn--sent" : ""}`}
            onClick={handleSubmit}
          >
            {sent ? (
              "Message Sent ✓"
            ) : (
              <>
                <span>Send Message</span>
                <FiArrowRight />
              </>
            )}
          </button>
        </div>

      </div>
    </section>
  );
}