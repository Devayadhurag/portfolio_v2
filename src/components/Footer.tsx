import React from "react";
import { FaReact } from "react-icons/fa";
import { SiVite, SiTypescript, SiSass } from "react-icons/si";

const techStack = [
  { icon: <FaReact size={13} color="#61DAFB" />, label: "React" },
  { icon: <SiVite size={13} color="#BD34FE" />, label: "Vite" },
  { icon: <SiTypescript size={13} color="#3178C6" />, label: "TypeScript" },
  { icon: <SiSass size={13} color="#CC6699" />, label: "Sass" },
];

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <>
      <style>
        {`
          .footer-container {
            background-color: #000;
            width: 100%;
            border-top: 1px solid #1a1a1a;
          }

          .footer-content {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 2rem;
            min-height: 48px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 12px;
          }

          .footer-copyright {
            color: #888;
            font-size: 0.72rem;
            letter-spacing: 0.05em;
            font-family: 'Courier New', monospace;
            white-space: nowrap;
          }

          .footer-copyright span {
            color: #fff;
            font-weight: 600;
          }

          .footer-tech-stack {
            display: flex;
            align-items: center;
            gap: 0.35rem;
            color: #555;
            font-size: 0.68rem;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            font-family: 'Courier New', monospace;
            flex-wrap: wrap;
          }

          .footer-tech-item {
            display: inline-flex;
            align-items: center;
            gap: 0.2rem;
            margin-left: 0.3rem;
            color: #aaa;
            font-size: 0.68rem;
          }

          .footer-tech-item span {
            color: #666;
          }

          @media (max-width: 768px) {
            .footer-content {
              padding: 16px 20px;
              justify-content: center;
              flex-direction: column;
              text-align: center;
            }
            
            .footer-tech-stack {
              justify-content: center;
            }
            
            .footer-copyright {
              white-space: normal;
            }
          }
          
          @media (max-width: 480px) {
            .footer-tech-item {
              margin-left: 0.1rem;
            }
            .footer-tech-stack {
              gap: 0.2rem;
            }
          }
        `}
      </style>
      <footer className="footer-container">
        <div className="footer-content">
          {/* Copyright */}
          <span className="footer-copyright">
            &copy; {year} <span>Devayadhurag</span> — All rights reserved.
          </span>

          {/* Built with */}
          <span className="footer-tech-stack">
            Built with
            {techStack.map(({ icon, label }) => (
              <span key={label} title={label} className="footer-tech-item">
                {icon}
                <span>{label}</span>
              </span>
            ))}
          </span>
        </div>
      </footer>
    </>
  );
};

export default Footer;