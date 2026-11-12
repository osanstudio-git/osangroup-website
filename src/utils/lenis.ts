import Lenis from 'lenis';

let lenisInstance: Lenis | null = null;

export function initSmoothScroll(): Lenis {
  if (lenisInstance) return lenisInstance;

  lenisInstance = new Lenis({
    duration: 1.15,
    easing: (t) => 1 - Math.pow(1 - t, 4),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.2,
    infinite: false,
  });

  function raf(time: number) {
    lenisInstance?.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  // Expose to window for debugging and integrations
  (window as any).__lenis = lenisInstance;

  return lenisInstance;
}

export function getLenis(): Lenis | null {
  return lenisInstance;
}

export function scrollToElement(
  selectorOrElement: string | HTMLElement,
  offset: number = 0,
  duration: number = 0.95
): void {
  if (!lenisInstance) {
    const el = typeof selectorOrElement === 'string' 
      ? document.querySelector(selectorOrElement) 
      : selectorOrElement;
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    return;
  }

  lenisInstance.scrollTo(selectorOrElement, {
    offset,
    duration,
    easing: (t) => 1 - Math.pow(1 - t, 4),
  });
}

