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
    <footer
      style={{
        backgroundColor: "#000",
        width: "100%",
        borderTop: "1px solid #1a1a1a",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 2rem",
          height: "48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "0.5rem",
        }}
      >
        {/* Copyright */}
        <span
          style={{
            color: "#888",
            fontSize: "0.72rem",
            letterSpacing: "0.05em",
            fontFamily: "'Courier New', monospace",
            whiteSpace: "nowrap",
          }}
        >
          &copy; {year}{" "}
          <span style={{ color: "#fff", fontWeight: 600 }}>Devayadhurag</span>
          {" "}— All rights reserved.
        </span>

        {/* Built with */}
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.35rem",
            color: "#555",
            fontSize: "0.68rem",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            fontFamily: "'Courier New', monospace",
            whiteSpace: "nowrap",
          }}
        >
          Built with
          {techStack.map(({ icon, label }) => (
            <span
              key={label}
              title={label}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.2rem",
                marginLeft: "0.3rem",
                color: "#aaa",
                fontSize: "0.68rem",
              }}
            >
              {icon}
              <span style={{ color: "#666" }}>{label}</span>
            </span>
          ))}
        </span>
      </div>
    </footer>
  );
};

export default Footer;