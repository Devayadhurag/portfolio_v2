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

const PhotoSlot = () => (
  <div className="exp-photo-slot">
    <div className="exp-photo-placeholder">
      <span className="exp-photo-icon">📷</span>
      <span className="exp-photo-label">Photo</span>
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
    <p ref={ref} className="exp-description">
      {displayedText}
      {displayedText.length < text.length && (
        <span className="exp-cursor">|</span>
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
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
          }

          .exp-section {
            background: #d0d0d0;
            padding: 48px 40px;
            font-family: Helvetica, Arial, sans-serif;
            color: #000;
          }

          .exp-label {
            font-family: 'Syne', system-ui, sans-serif;
            font-size: 22px;
            font-weight: 400;
            letter-spacing: 0.22em;
            text-transform: uppercase;
            color: #ea5600;
            margin: 0 0 44px;
          }

          .exp-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 24px;
          }

          .exp-photo-slot {
            aspect-ratio: 2 / 1;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .exp-photo-placeholder {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 6px;
            opacity: 0.45;
          }

          .exp-photo-icon {
            font-size: 28px;
            color: #555;
          }

          .exp-photo-label {
            font-size: 12px;
            color: #555;
            letter-spacing: 0.08em;
            text-transform: uppercase;
          }

          .exp-content {
            padding: 32px 28px;
            background: #d0d0d0;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }

          .exp-job-top {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            margin-bottom: 2px;
            flex-wrap: wrap;
            gap: 8px;
          }

          .exp-job-role {
            font-family: 'Space Mono', monospace;
            font-size: 20px;
            font-weight: 700;
            color: #ea5600;
          }

          .exp-job-date {
            font-family: 'Space Mono', monospace;
            font-size: 13px;
            color: #000;
          }

          .exp-job-bottom {
            font-family: 'Space Mono', monospace;
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            margin-bottom: 14px;
            flex-wrap: wrap;
            gap: 8px;
          }

          .exp-job-company, .exp-job-location {
            font-family: 'Space Mono', monospace;
            font-size: 13px;
            color: rgba(0,0,0,0.6);
          }

          .exp-description {
            font-family: 'Space Mono', monospace;
            font-size: 13.5px;
            line-height: 1.75;
            color: #000;
            margin: 0;
            min-height: 120px;
            white-space: pre-wrap;
          }

          .exp-divider {
            border: none;
            border-top: 1px solid rgba(0,0,0,0.18);
            margin: 0;
          }

          .exp-cursor {
            display: inline-block;
            width: 8px;
            animation: blink 1s infinite;
          }

          /* Responsive Breakpoints */
          @media (max-width: 1024px) {
            .exp-section {
              padding: 48px 30px;
            }
            
            .exp-row {
              gap: 16px;
            }
            
            .exp-content {
              padding: 24px 20px;
            }
          }

          @media (max-width: 768px) {
            .exp-section {
              padding: 40px 20px;
            }

            .exp-row {
              grid-template-columns: 1fr;
              gap: 16px;
            }

            .exp-photo-slot {
              aspect-ratio: 16 / 9;
              order: -1; /* Always show photo first on mobile */
            }
            
            .exp-content {
              padding: 16px 0; /* Remove side padding on mobile */
            }

            .exp-label {
              font-size: 20px;
              margin: 0 0 32px;
            }

            .exp-job-role {
              font-size: 18px;
            }

            .exp-job-date, .exp-job-company, .exp-job-location {
              font-size: 12px;
            }
            
            .exp-description {
              font-size: 13px;
              min-height: auto;
            }
            
            .exp-divider {
              margin: 16px 0;
            }
          }
          
          @media (max-width: 480px) {
            .exp-job-top, .exp-job-bottom {
              flex-direction: column;
              align-items: flex-start;
              gap: 4px;
            }
          }
        `}
      </style>

      <div className="exp-section" id="experience">
        <p className="exp-label">Experience</p>

        {experiences.map((exp, index) => (
          <React.Fragment key={index}>
            <div className="exp-row">
              {exp.photoLeft ? (
                <>
                  <PhotoSlot />

                  <div className="exp-content">
                    <div className="exp-job-top">
                      <span className="exp-job-role">{exp.role}</span>
                      <span className="exp-job-date">{exp.date}</span>
                    </div>

                    <div className="exp-job-bottom">
                      <span className="exp-job-company">{exp.company}</span>
                      <span className="exp-job-location">{exp.location}</span>
                    </div>

                    <TypewriterOnScroll text={exp.description} />
                  </div>
                </>
              ) : (
                <>
                  <div className="exp-content">
                    <div className="exp-job-top">
                      <span className="exp-job-role">{exp.role}</span>
                      <span className="exp-job-date">{exp.date}</span>
                    </div>

                    <div className="exp-job-bottom">
                      <span className="exp-job-company">{exp.company}</span>
                      <span className="exp-job-location">{exp.location}</span>
                    </div>

                    <TypewriterOnScroll text={exp.description} />
                  </div>

                  <PhotoSlot />
                </>
              )}
            </div>

            {index < experiences.length - 1 && (
              <hr className="exp-divider" />
            )}
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

export default Experience;