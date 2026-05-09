import { useEffect, useRef, useState } from 'react';

const DotCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const mouse = useRef({ x: -100, y: -100 });
  const dot = useRef({ x: -100, y: -100 });
  const hoveredTarget = useRef<'hero' | 'about' | null>(null);
  
  useEffect(() => {
    let animationFrameId: number;
    
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target?.closest?.('.hero-overlay__title')) {
        hoveredTarget.current = 'hero';
        dotRef.current?.classList.add('custom-dot-cursor--enlarged');
      } else if (target?.closest?.('.about-text')) {
        hoveredTarget.current = 'about';
        dotRef.current?.classList.add('custom-dot-cursor--enlarged');
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const relatedTarget = e.relatedTarget as HTMLElement | null;
      if (
        target?.closest?.('.hero-overlay__title, .about-text') &&
        !relatedTarget?.closest?.('.hero-overlay__title, .about-text')
      ) {
        hoveredTarget.current = null;
        dotRef.current?.classList.remove('custom-dot-cursor--enlarged');
      }
    };

    const animate = () => {
      dot.current.x += (mouse.current.x - dot.current.x) * 0.2;
      dot.current.y += (mouse.current.y - dot.current.y) * 0.2;
      
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dot.current.x}px, ${dot.current.y}px, 0) translate(-50%, -50%)`;
        if (hoveredTarget.current === 'hero') {
          const overlay = document.querySelector<HTMLElement>('.hero-overlay');
          if (overlay) {
            const overlayOpacity = parseFloat(overlay.style.opacity || '1');
            if (overlayOpacity <= 0.1) {
              dotRef.current.classList.remove('custom-dot-cursor--enlarged');
            } else {
              dotRef.current.classList.add('custom-dot-cursor--enlarged');
            }
          }
        }
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={dotRef}
      className="custom-dot-cursor"
      aria-hidden="true"
      style={{
        opacity: isVisible ? 1 : 0,
        pointerEvents: 'none',
      }}
    />
  );
};

export default DotCursor;
