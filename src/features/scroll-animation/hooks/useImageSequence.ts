import { useEffect, useRef, useState, useCallback } from 'react';
import { useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

const TOTAL_FRAMES = 233;

const getFrameSrc = (index: number): string => {
  const padded = String(index).padStart(3, '0');
  return `/frames/ezgif-frame-${padded}.webp`;
};

interface UseImageSequenceOptions {
  containerRef: React.RefObject<HTMLElement | null>;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
}

interface UseImageSequenceReturn {
  progress: number;
  isLoaded: boolean;
  scrollYProgress: import('framer-motion').MotionValue<number>;
}

export const useImageSequence = ({
  containerRef,
  canvasRef,
}: UseImageSequenceOptions): UseImageSequenceReturn => {
  const imagesRef = useRef<(HTMLImageElement | null)[]>(
    new Array(TOTAL_FRAMES).fill(null)
  );
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const currentFrameRef = useRef(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const frameIndex = useTransform(
    scrollYProgress,
    [0, 1],
    [0, TOTAL_FRAMES - 1],
  );

  const renderFrame = useCallback((index: number) => {
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
  }, [canvasRef]);

  useMotionValueEvent(frameIndex, 'change', (latest) => {
    const idx = Math.round(latest);
    if (idx === currentFrameRef.current) return;
    currentFrameRef.current = idx;

    if (imagesRef.current[idx]) {
      renderFrame(idx);
    } else {
      for (let fallback = idx - 1; fallback >= 0; fallback--) {
        if (imagesRef.current[fallback]) {
          renderFrame(fallback);
          break;
        }
      }
    }
  });

  useEffect(() => {
    let cancelled = false;
    let loaded = 0;

    const loadImage = (i: number): Promise<void> =>
      new Promise((resolve) => {
        if (imagesRef.current[i]) { resolve(); return; }

        const img = new Image();
        img.decoding = 'async';
        img.src = getFrameSrc(i + 1);

        img.onload = () => {
          if (cancelled) return;
          imagesRef.current[i] = img;
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

    const loadAll = async () => {
      // Phase 1 — frame 0 only, paint immediately
      await loadImage(0);
      if (cancelled) return;
      renderFrame(0);
      setIsLoaded(true);

      // Phase 2 — frames 1–29, covers initial scroll area
      const phase2: Promise<void>[] = [];
      for (let i = 1; i < 30; i++) phase2.push(loadImage(i));
      await Promise.all(phase2);
      if (cancelled) return;

      // Phase 3 — remaining frames in batches of 10
      const BATCH = 10;
      for (let start = 30; start < TOTAL_FRAMES; start += BATCH) {
        if (cancelled) return;
        const batch: Promise<void>[] = [];
        for (let i = start; i < Math.min(start + BATCH, TOTAL_FRAMES); i++) {
          batch.push(loadImage(i));
        }
        await Promise.all(batch);
      }
    };

    loadAll();
    return () => { cancelled = true; };
  }, [renderFrame]);

  useEffect(() => {
    const onResize = () => renderFrame(currentFrameRef.current);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [renderFrame]);

  return { progress, isLoaded, scrollYProgress };
};