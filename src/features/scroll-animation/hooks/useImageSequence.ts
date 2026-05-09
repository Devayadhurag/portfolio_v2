import { useEffect, useRef, useState, useCallback } from 'react';
import { useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

const TOTAL_FRAMES = 233;

/**
 * Generates the image URL for a given frame index (1-based).
 * Vite requires import.meta.glob for static asset resolution, but for a
 * large sequence like this we use the `/src/assets` path convention with
 * new URL(..., import.meta.url) so Vite can resolve at build time.
 */
const getFrameSrc = (index: number): string => {
  const padded = String(index).padStart(3, '0');
  return new URL(
    `../../../assets/modals/ezgif-frame-${padded}.png`,
    import.meta.url,
  ).href;
};

interface UseImageSequenceOptions {
  /** Ref to the scroll container that drives the animation */
  containerRef: React.RefObject<HTMLElement | null>;
  /** Ref to the <canvas> element for rendering */
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
}

interface UseImageSequenceReturn {
  /** 0–100 loading progress */
  progress: number;
  /** True once every frame is decoded & cached */
  isLoaded: boolean;
  /** Raw framer-motion scroll progress (0→1) for the sequence container */
  scrollYProgress: import('framer-motion').MotionValue<number>;
}

export const useImageSequence = ({
  containerRef,
  canvasRef,
}: UseImageSequenceOptions): UseImageSequenceReturn => {
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const currentFrameRef = useRef(0);

  // ── Scroll tracking ───────────────────────────────────────────────
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const frameIndex = useTransform(
    scrollYProgress,
    [0, 1],
    [0, TOTAL_FRAMES - 1],
  );

  // ── Canvas render ─────────────────────────────────────────────────
  const renderFrame = useCallback(
    (index: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const img = imagesRef.current[index];
      if (!img) return;
      const dpr = window.devicePixelRatio || 1;
      const { width, height } = canvas.getBoundingClientRect();
      const bufferW = Math.round(width * dpr);
      const bufferH = Math.round(height * dpr);

      if (canvas.width !== bufferW || canvas.height !== bufferH) {
        canvas.width = bufferW;
        canvas.height = bufferH;
      }

      ctx.clearRect(0, 0, bufferW, bufferH);
      const imgRatio = img.naturalWidth / img.naturalHeight;
      const canvasRatio = bufferW / bufferH;

      let drawW: number, drawH: number, offsetX: number, offsetY: number;

      if (imgRatio > canvasRatio) {
        drawH = bufferH;
        drawW = bufferH * imgRatio;
        offsetX = (bufferW - drawW) / 2;
        offsetY = 0;
      } else {
        drawW = bufferW;
        drawH = bufferW / imgRatio;
        offsetX = 0;
        offsetY = (bufferH - drawH) / 2;
      }

      ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
    },
    [canvasRef],
  );

  // ── React to scroll position ──────────────────────────────────────
  useMotionValueEvent(frameIndex, 'change', (latest) => {
    const idx = Math.round(latest);
    if (idx !== currentFrameRef.current && imagesRef.current[idx]) {
      currentFrameRef.current = idx;
      renderFrame(idx);
    }
  });

  // ── Preload all frames ────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;
    let loaded = 0;

    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);

    const loadImage = (i: number): Promise<void> =>
      new Promise((resolve) => {
        const img = new Image();
        img.src = getFrameSrc(i + 1); // frames are 1-indexed

        img.onload = () => {
          if (cancelled) return;
          images[i] = img;
          loaded++;
          setProgress(Math.round((loaded / TOTAL_FRAMES) * 100));
          resolve();
        };

        img.onerror = () => {
          loaded++;
          setProgress(Math.round((loaded / TOTAL_FRAMES) * 100));
          resolve();
        };
      });

    const BATCH = 10;

    const loadAll = async () => {
      for (let start = 0; start < TOTAL_FRAMES; start += BATCH) {
        if (cancelled) return;
        const end = Math.min(start + BATCH, TOTAL_FRAMES);
        const batch = [];
        for (let i = start; i < end; i++) {
          batch.push(loadImage(i));
        }
        await Promise.all(batch);
      }

      if (!cancelled) {
        imagesRef.current = images;
        setIsLoaded(true);
        renderFrame(0);
      }
    };

    loadAll();

    return () => {
      cancelled = true;
    };
  }, [renderFrame]);

  // ── Handle window resize ──────────────────────────────────────────
  useEffect(() => {
    const onResize = () => renderFrame(currentFrameRef.current);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [renderFrame]);

  return { progress, isLoaded, scrollYProgress };
};
