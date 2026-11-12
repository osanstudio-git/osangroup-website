/**
 * Scroll-linked parallax engine with gentle lerp smoothing.
 * Tracks each [data-parallax] element's progress through the viewport (-1 .. +1)
 * and maps it to a slow, fluid GPU translate3d Y offset for subtle layered depth.
 */
export function initScrollParallax(): () => void {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    return () => {};
  }

  let rafId: number | null = null;
  const currentOffsets = new WeakMap<HTMLElement, number>();

  const tick = () => {
    rafId = null;

    const vh = window.innerHeight || 1;
    const isMobile = window.innerWidth < 768;
    const maxTravel = isMobile ? 16 : 32;
    const elements = document.querySelectorAll<HTMLElement>('[data-parallax]');
    let stillMoving = false;

    elements.forEach((el) => {
      const speed = parseFloat(el.getAttribute('data-parallax') || '0');
      if (!speed) return;

      const rect = el.getBoundingClientRect();
      if (rect.bottom < -vh * 0.5 || rect.top > vh * 1.5) return;

      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = vh / 2;
      const progress = Math.max(-1.25, Math.min(1.25, (viewportCenter - elementCenter) / vh));

      const targetY = Math.max(-maxTravel, Math.min(maxTravel, progress * speed * vh * 0.28));
      const prevY = currentOffsets.get(el) ?? targetY;
      const nextY = prevY + (targetY - prevY) * 0.085;

      if (Math.abs(targetY - nextY) > 0.05) {
        stillMoving = true;
      }

      currentOffsets.set(el, nextY);
      el.style.transform = `translate3d(0, ${nextY.toFixed(2)}px, 0)`;
    });

    if (stillMoving) {
      rafId = requestAnimationFrame(tick);
    }
  };

  const scheduleUpdate = () => {
    if (rafId === null) {
      rafId = requestAnimationFrame(tick);
    }
  };

  window.addEventListener('scroll', scheduleUpdate, { passive: true });
  window.addEventListener('resize', scheduleUpdate, { passive: true });

  const domObserver = new MutationObserver(() => {
    scheduleUpdate();
  });
  domObserver.observe(document.body, { childList: true, subtree: true });

  scheduleUpdate();

  return () => {
    window.removeEventListener('scroll', scheduleUpdate);
    window.removeEventListener('resize', scheduleUpdate);
    domObserver.disconnect();
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  };
}
