import { useRef } from 'react';
import { motion, useTransform, useMotionTemplate } from 'framer-motion';
import { useImageSequence } from '../hooks/useImageSequence';

export default function ScrollSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { progress, isLoaded, scrollYProgress } = useImageSequence({ containerRef, canvasRef });
  const heroOpacity    = useTransform(scrollYProgress, [0, 0.1, 1], [1, 0, 0]);
  const blurPx         = useTransform(scrollYProgress, [0, 0.1, 1], [12, 0, 0]);
  const backdropFilter = useMotionTemplate`blur(${blurPx}px)`;

  return (
    <>
      <style>{`
        /* ── Scroll Sequence Shell ────────────────────────── */
        .scroll-sequence {
          position: relative;
          height: 500vh;
          width: 100%;
          background: #000;
        }

        .scroll-sequence__sticky {
          position: sticky;
          top: 0;
          width: 100%;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .scroll-sequence__canvas {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
        }

        /* ── Hero overlay ────────────────────────────────── */
        .hero-overlay {
          position: absolute;
          inset: 0;
          z-index: 4;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          pointer-events: none;
        }

        .hero-overlay__glass {
          position: absolute;
          inset: 0;

          background:
            linear-gradient(
              160deg,
              rgba(0, 0, 0, 0.78) 0%,
              rgba(8, 8, 14, 0.52) 40%,
              rgba(0, 0, 0, 0.82) 100%
            ),

            linear-gradient(
              to bottom,
              rgba(12, 14, 22, 0.28),
              rgba(0, 0, 0, 0.12)
            );

          backdrop-filter: blur(16px) saturate(115%);
          -webkit-backdrop-filter: blur(16px) saturate(115%);

          box-shadow:
            inset 0 0 180px rgba(0, 0, 0, 0.55),
            inset 0 -80px 120px rgba(0, 0, 0, 0.45);

          pointer-events: none;
        }

        .hero-overlay__content {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          text-align: center;
          padding: 0 24px;
        }

        .hero-overlay__eyebrow {
          font-family: 'Syne', system-ui, sans-serif;
          font-size: clamp(10px, 1.2vw, 13px);
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.45);
        }

        .hero-overlay__title {
          font-family: 'Syne', system-ui, sans-serif;
          font-size: clamp(40px, 7vw, 96px);
          font-weight: 800;
          line-height: 0.95;
          letter-spacing: -0.03em;
          color: #fff;
          margin: 0;
          pointer-events: auto;
        }

        .hero-overlay__title span {
          background: linear-gradient(135deg, #ff4444 0%, #ff8866 50%, #ffbb88 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-overlay__sub {
          font-family: 'Space Mono', system-ui, sans-serif;
          font-size: clamp(13px, 1.5vw, 17px);
          font-weight: 400;
          color: rgba(255, 255, 255, 0.72);
          max-width: 480px;
          line-height: 1.6;
          margin: 0;
        }

        .hero-overlay__divider {
          width: 40px;
          height: 1.5px;
          background: linear-gradient(90deg, #ff4444, #ff8866);
          border-radius: 2px;
        }

        /* ── Loading overlay ─────────────────────────────── */
        .scroll-sequence__loader {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 20px;
          background: #000;
          z-index: 10;
          transition: opacity 0.6s ease, visibility 0.6s ease;
        }

        .scroll-sequence__loader--hidden {
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
        }

        .scroll-sequence__loader-ring {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: 2.5px solid rgba(255, 255, 255, 0.08);
          border-top-color: rgba(255, 255, 255, 0.7);
          animation: seq-spin 0.8s linear infinite;
        }

        @keyframes seq-spin {
          to { transform: rotate(360deg); }
        }

        .scroll-sequence__loader-bar-track {
          width: 180px;
          height: 3px;
          border-radius: 4px;
          background: rgba(255, 255, 255, 0.08);
          overflow: hidden;
        }

        .scroll-sequence__loader-bar-fill {
          height: 100%;
          border-radius: 4px;
          background: linear-gradient(90deg, #ff4444, #ff8866);
          transition: width 0.2s ease-out;
        }

        .scroll-sequence__loader-text {
          font-family: 'Syne', system-ui, sans-serif;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.4);
        }

        /* ── Scroll hint ─────────────────────────────────── */
        .scroll-sequence__hint {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          opacity: 0;
          animation: seq-fade-in 0.8s 0.6s ease forwards;
          pointer-events: none;
          z-index: 5;
        }

        @keyframes seq-fade-in {
          to { opacity: 1; }
        }

        .scroll-sequence__hint-text {
          font-family: 'Syne', system-ui, sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.35);
        }

        .scroll-sequence__hint-arrow {
          width: 16px;
          height: 16px;
          border-right: 1.5px solid rgba(255, 255, 255, 0.35);
          border-bottom: 1.5px solid rgba(255, 255, 255, 0.35);
          transform: rotate(45deg);
        }

        @keyframes seq-bounce {
          0%, 100% { transform: rotate(45deg) translateY(0); }
          50%      { transform: rotate(45deg) translateY(5px); }
        }
      `}</style>

      <section ref={containerRef} className="scroll-sequence" id="home">
        <div className="scroll-sequence__sticky">

          {/* Canvas for rendering frames */}
          <canvas ref={canvasRef} className="scroll-sequence__canvas" />

          {/* ── Hero overlay — fades & unblurs on scroll ── */}
          {isLoaded && (
            <motion.div
              className="hero-overlay"
              style={{ opacity: heroOpacity }}
              aria-label="Hero introduction"
            >
              {/* Blurred glass backdrop */}
              <motion.div
                className="hero-overlay__glass"
                style={{ backdropFilter, WebkitBackdropFilter: backdropFilter }}
              />

              {/* Text content */}
              <div className="hero-overlay__content">
                <h1 className="hero-overlay__title">
                  Hello, I'm<br /><span>Deva Yadhu Rag</span><br />Software Developer
                </h1>
                <div className="hero-overlay__divider" />
                <p className="hero-overlay__sub">
                  Crafting clean interfaces and scalable digital products.
                </p>
              </div>
            </motion.div>
          )}

          {/* Loading overlay */}
          <div
            className={`scroll-sequence__loader${isLoaded ? ' scroll-sequence__loader--hidden' : ''}`}
            aria-hidden={isLoaded}
          >
            <div className="scroll-sequence__loader-ring" />
            <div className="scroll-sequence__loader-bar-track">
              <div
                className="scroll-sequence__loader-bar-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="scroll-sequence__loader-text">
              Loading experience · {progress}%
            </span>
          </div>

          {/* Scroll hint */}
          {isLoaded && (
            <motion.div
              className="scroll-sequence__hint"
              style={{ opacity: heroOpacity }}
              aria-hidden="true"
            >
              <span className="scroll-sequence__hint-text">Scroll to explore</span>
              <div className="scroll-sequence__hint-arrow" />
            </motion.div>
          )}

        </div>
      </section>
    </>
  );
}
