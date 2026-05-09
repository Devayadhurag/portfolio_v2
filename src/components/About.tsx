import { useEffect, useRef } from "react";

const About = () => {
    const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);

    useEffect(() => {
        const letters = lettersRef.current;
        if (!letters.length) return;

        const update = () => {
            const midY = window.innerHeight / 2;
            const zone = 60;

            letters.forEach((letter) => {
                if (!letter) return;
                const rect = letter.getBoundingClientRect();
                const letterMid = rect.top + rect.height / 2;
                const dist = letterMid - midY;
                const progress = Math.min(1, Math.max(0, (-dist + zone) / (zone * 2)));

                if (progress >= 1) {
                    letter.style.webkitTextFillColor = "transparent";
                } else if (progress <= 0) {
                    letter.style.webkitTextFillColor = "white";
                } else {
                    letter.style.webkitTextFillColor = `rgba(255,255,255,${(1 - progress).toFixed(3)})`;
                }
            });
        };

        let rafId: number;

        const onScroll = () => {
            cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(update);
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        update();

        return () => {
            window.removeEventListener("scroll", onScroll);
            cancelAnimationFrame(rafId);
        };
    }, []);

    const text =
        "I'm a passionate Software Engineer and tech enthusiast driven by the desire to build meaningful, high-impact digital experiences. I enjoy transforming ideas into modern, scalable, and user-focused applications through clean code, creative thinking, and attention to detail. With a strong passion for technology and continuous learning, I'm always exploring new tools, frameworks, and innovative approaches to create better solutions. I thrive on solving complex problems, improving user experiences, and turning challenges into opportunities for growth and innovation. Hard-working, dedicated, and detail-oriented — I believe great software is built with passion, consistency, and a commitment to excellence. My goal is to craft experiences that are not only functional and efficient, but also visually engaging and memorable.";

    const chars = text.split("");

    return (
        <section className="about" id="about">
            <style>{`
                .about {
                    background: #000;
                    padding: 60vh 80px;
                    box-sizing: border-box;
                }

                .about-label {
                    font-family: 'Syne', system-ui, sans-serif;
                    font-size: 24px;
                    font-weight: 400;
                    letter-spacing: 0.22em;
                    text-transform: uppercase;
                    color: rgba(255,255,255,0.3);
                    margin: 0 0 48px;
                }

                .about-text {
                    font-family: 'Syne', system-ui, sans-serif;
                    font-size: clamp(26px, 3.2vw, 46px);
                    font-weight: 700;
                    line-height: 1.35;
                    letter-spacing: -0.025em;
                    margin: 0;
                    text-align: left;
                    background: linear-gradient(135deg, #ff4444 0%, #ff8866 50%, #ffbb88 100%);
                    -webkit-background-clip: text;
                    background-clip: text;
                }

                .letter {
                    display: inline;
                    -webkit-text-fill-color: white;
                    will-change: -webkit-text-fill-color;
                }

                @media (max-width: 768px) {
                    .about {
                        padding: 60vh 28px;
                    }
                }
            `}</style>

            <p className="about-label">About me</p>
            <p className="about-text">
                {chars.map((char, i) => (
                    <span
                        key={i}
                        className="letter"
                        ref={(el) => { lettersRef.current[i] = el; }}
                    >
                        {char}
                    </span>
                ))}
            </p>
        </section>
    );
};

export default About;