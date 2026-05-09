import React, { useEffect, useRef, useState } from "react";

const experiences = [
  {
    role: "Software Engineer",
    date: "Sep 2024 – Present",
    company: "Beinex Consulting Private Limited",
    location: "Kochi, India",
    photoLeft: true,
    description:
      "Leading collaborative teams to deliver high-performance features and seamless digital experiences for modern web applications. Passionate about building scalable, user-focused solutions with a strong emphasis on quality, performance, accessibility, and continuous improvement. Known for combining creativity, problem-solving, and dedication to create impactful products that drive both user satisfaction and business growth.",
  },
  {
    role: "Associate Software Engineer",
    date: "Sep 2023 – Sep 2024",
    company: "Beinex Consulting Private Limited",
    location: "Kochi, India",
    photoLeft: false,
    description:
      "Built interactive and user-friendly web experiences with a focus on performance, scalability, and clean design. Created reusable and maintainable interface components while ensuring smooth real-time interactions and responsive layouts across devices. Passionate about delivering intuitive digital products that enhance usability, improve efficiency, and provide a seamless user experience.",
  },
  {
    role: "Front-End Developer Intern",
    date: "May 2023 – Aug 2023",
    company: "Beinex Consulting Private Limited",
    location: "Kochi, India",
    photoLeft: true,
    description:
      "Contributed to the development of modern and production-ready web applications during an internship, focusing on responsive design, seamless user experiences, and scalable solutions. Collaborated closely with teams in a fast-paced environment while consistently delivering high-quality work, adaptability, and strong problem-solving skills — ultimately earning a full-time opportunity through performance and dedication.",
  },
];

const styles: { [key: string]: React.CSSProperties } = {
  section: {
    background: "#d0d0d0",
    padding: "48px 40px",
    fontFamily: "Helvetica, Arial, sans-serif",
    color: "#000",
  },

  experienceLabel: {
    fontFamily: "'Syne', system-ui, sans-serif",
    fontSize: "22px",
    fontWeight: 400,
    letterSpacing: "0.22em",
    textTransform: "uppercase",
    color: "#ea5600",
    margin: "0 0 44px",
  },

  row: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
  },

  photoSlot: {
    aspectRatio: "2 / 1",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  photoPlaceholder: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "6px",
    opacity: 0.45,
  },

  photoIcon: {
    fontSize: "28px",
    color: "#555",
  },

  photoLabel: {
    fontSize: "12px",
    color: "#555",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },

  content: {
    padding: "32px 28px",
    background: "#d0d0d0",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },

  jobTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: "2px",
  },

  jobRole: {
    fontFamily: "'Space Mono', monospace",
    fontSize: "20px",
    fontWeight: 700,
    color: "#ea5600",
  },

  jobDate: {
    fontFamily: "'Space Mono', monospace",
    fontSize: "13px",
    color: "#000",
  },

  jobBottom: {
    fontFamily: "'Space Mono', monospace",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: "14px",
  },

  jobCompany: {
    fontFamily: "'Space Mono', monospace",
    fontSize: "13px",
    color: "rgba(0,0,0,0.6)",
  },

  jobLocation: {
    fontFamily: "'Space Mono', monospace",
    fontSize: "13px",
    color: "rgba(0,0,0,0.6)",
  },

  description: {
    fontFamily: "'Space Mono', monospace",
    fontSize: "13.5px",
    lineHeight: "1.75",
    color: "#000",
    margin: 0,
    minHeight: "120px",
    whiteSpace: "pre-wrap",
  },

  divider: {
    border: "none",
    borderTop: "1px solid rgba(0,0,0,0.18)",
    margin: "0",
  },

  cursor: {
    display: "inline-block",
    width: "8px",
    animation: "blink 1s infinite",
  },
};

const PhotoSlot = () => (
  <div style={styles.photoSlot}>
    <div style={styles.photoPlaceholder}>
      <span style={styles.photoIcon}>📷</span>
      <span style={styles.photoLabel}>Photo</span>
    </div>
  </div>
);

type TypewriterProps = {
  text: string;
};

const TypewriterOnScroll = ({ text }: TypewriterProps) => {
  const [displayedText, setDisplayedText] = useState("");
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.35,
      }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;

    let index = 0;

    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, index + 1));
      index++;

      if (index >= text.length) {
        clearInterval(interval);
      }
    }, 12);

    return () => clearInterval(interval);
  }, [started, text]);

  return (
    <p ref={ref} style={styles.description}>
      {displayedText}
      {displayedText.length < text.length && (
        <span style={styles.cursor}>|</span>
      )}
    </p>
  );
};

const Experience = () => {
  return (
    <>
      <style>
        {`
          @keyframes blink {
            0%, 50% {
              opacity: 1;
            }
            51%, 100% {
              opacity: 0;
            }
          }
        `}
      </style>

      <div style={styles.section} id="experience">
        <p style={styles.experienceLabel}>Experience</p>

        {experiences.map((exp, index) => (
          <React.Fragment key={index}>
            <div style={styles.row}>
              {exp.photoLeft ? (
                <>
                  <PhotoSlot />

                  <div style={styles.content}>
                    <div style={styles.jobTop}>
                      <span style={styles.jobRole}>{exp.role}</span>
                      <span style={styles.jobDate}>{exp.date}</span>
                    </div>

                    <div style={styles.jobBottom}>
                      <span style={styles.jobCompany}>{exp.company}</span>
                      <span style={styles.jobLocation}>{exp.location}</span>
                    </div>

                    <TypewriterOnScroll text={exp.description} />
                  </div>
                </>
              ) : (
                <>
                  <div style={styles.content}>
                    <div style={styles.jobTop}>
                      <span style={styles.jobRole}>{exp.role}</span>
                      <span style={styles.jobDate}>{exp.date}</span>
                    </div>

                    <div style={styles.jobBottom}>
                      <span style={styles.jobCompany}>{exp.company}</span>
                      <span style={styles.jobLocation}>{exp.location}</span>
                    </div>

                    <TypewriterOnScroll text={exp.description} />
                  </div>

                  <PhotoSlot />
                </>
              )}
            </div>

            {index < experiences.length - 1 && (
              <hr style={styles.divider} />
            )}
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

export default Experience;