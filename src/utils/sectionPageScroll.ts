import { scrollToElement } from './lenis';
import { Navbar } from '../components/Navbar';

const MOTION_SELECTOR =
  '.page-content-motion, .page-content-motion-delayed, .page-content-stagger, .reveal-text-fade, .reveal-split-text, .reveal-slide-up, .reveal-slide-down, .reveal-slide-left, .reveal-slide-right, .reveal-spring-defocus, .reveal-stagger-up, .reveal-stagger-down, .reveal-stagger-cascade';

export class SectionPageScrollManager {
  private sectionIds: string[] = [
    'home',
    'about',
    'chairmans-word',
    'mission',
    'business-solutions',
    'ecosystem',
    'companies',
    'contact',
  ];
  private navbar: Navbar;
  private isProgrammaticScroll: boolean = false;
  private navigationTimer: number | null = null;
  private settleTimer: number | null = null;
  private contentObserver: IntersectionObserver | null = null;
  private sectionObserver: IntersectionObserver | null = null;
  private domObserver: MutationObserver | null = null;
  private gestureStartY: number = 0;
  private lastInputTime: number = 0;
  private lastDirection: number = 1;

  constructor(navbar: Navbar) {
    this.navbar = navbar;
    this.init();
  }

  private init(): void {
    // 1. Content Reveal Observer (Triggers entrance motion for text, cards, headlines)
    this.initContentReveal();

    // 2. Active Section Spy Observer
    this.initSectionSpy();

    // 3. Re-observe dynamically re-rendered sections (e.g. on language switch)
    this.initMutationRefresh();

    // 4. Passive Wheel & Scroll Listeners (Lenis glides freely; gentle settle-snap after idle)
    window.addEventListener('wheel', this.handleWheel, { passive: true });
    window.addEventListener('scroll', this.handleScroll, { passive: true });

    // 5. Keyboard Arrow Navigation
    window.addEventListener('keydown', this.handleKeyDown);

    // Immediately reveal Home content after initial paint so entrance animations play cleanly
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const homeMotion = document.querySelectorAll(
          '#home .page-content-motion, #home .page-content-stagger, #home .reveal-text-fade, #home .reveal-split-text, #home .reveal-slide-up, #home .reveal-slide-down, #home .reveal-stagger-up, #home .reveal-stagger-down'
        );
        homeMotion.forEach((el) => el.classList.add('is-revealed'));
      });
    });
  }

  private initContentReveal(): void {
    const motionElements = document.querySelectorAll(MOTION_SELECTOR);

    this.contentObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
          } else {
            entry.target.classList.remove('is-revealed');
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -24px 0px',
      }
    );

    motionElements.forEach((el) => {
      this.contentObserver?.observe(el);
    });
  }

  private initMutationRefresh(): void {
    const mainEl = document.querySelector('main');
    if (!mainEl || !('MutationObserver' in window)) return;

    this.domObserver = new MutationObserver(() => {
      const motionElements = mainEl.querySelectorAll(MOTION_SELECTOR);
      motionElements.forEach((el) => {
        if (!el.classList.contains('is-revealed')) {
          this.contentObserver?.observe(el);
        }
      });
    });

    this.domObserver.observe(mainEl, { childList: true, subtree: true });
  }

  private initSectionSpy(): void {
    this.sectionObserver = new IntersectionObserver(
      (entries) => {
        // Find the section with highest intersection ratio
        let bestEntry: IntersectionObserverEntry | null = null;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!bestEntry || entry.intersectionRatio > bestEntry.intersectionRatio) {
              bestEntry = entry;
            }
          }
        });

        if (bestEntry && (bestEntry as IntersectionObserverEntry).target) {
          const secId = (bestEntry as IntersectionObserverEntry).target.id;
          if (this.sectionIds.includes(secId) && !this.isProgrammaticScroll) {
            this.navbar.setActiveSection(secId);
          }
        }
      },
      {
        threshold: [0.2, 0.4, 0.6, 0.8],
      }
    );

    this.sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) this.sectionObserver?.observe(el);
    });
  }

  private getSectionIndexAtY(scrollY: number): number {
    const probe = scrollY + window.innerHeight * 0.45;
    let currentIndex = 0;

    for (let i = 0; i < this.sectionIds.length; i++) {
      const el = document.getElementById(this.sectionIds[i]);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY;
        if (probe >= top) {
          currentIndex = i;
        }
      }
    }
    return currentIndex;
  }

  private getCurrentSectionId(): string {
    return this.sectionIds[this.getSectionIndexAtY(window.scrollY)] || this.sectionIds[0];
  }

  private getCenteredOffset(_el: HTMLElement): number {
    // Full-screen sections already center their content with flex justify-center;
    // aligning flush to y=0 prevents any slice of the previous section from showing above.
    return 0;
  }

  private isInsideTallSection(el: HTMLElement): boolean {
    const rect = el.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    if (rect.height <= viewportHeight + 80) return false;
    return rect.top < -24 && rect.bottom > viewportHeight + 24;
  }

  private scheduleSettle(): void {
    if (this.settleTimer) {
      clearTimeout(this.settleTimer);
    }
    this.settleTimer = window.setTimeout(() => {
      this.settleTimer = null;
      this.settleToNearestSection();
    }, 150);
  }

  private handleWheel = (e: WheelEvent): void => {
    if (e.ctrlKey || e.shiftKey || window.innerWidth < 1024) return;
    if (Math.abs(e.deltaY) < 1) return;

    const now = Date.now();
    // User took over scrolling — immediately cancel any active settle state
    this.isProgrammaticScroll = false;

    if (now - this.lastInputTime > 260) {
      this.gestureStartY = window.scrollY;
    }
    this.lastInputTime = now;
    this.lastDirection = e.deltaY >= 0 ? 1 : -1;

    this.scheduleSettle();
  };

  private handleScroll = (): void => {
    if (this.isProgrammaticScroll || window.innerWidth < 1024) return;
    if (Date.now() - this.lastInputTime < 1500) {
      this.scheduleSettle();
    }
  };

  private settleToNearestSection(): void {
    if (this.isProgrammaticScroll || window.innerWidth < 1024) return;

    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;

    // Allow reaching and reading the footer smoothly without snapping back up
    if (scrollY + viewportHeight >= docHeight - 60) return;

    const currentIndex = this.getSectionIndexAtY(scrollY);
    const currentEl = document.getElementById(this.sectionIds[currentIndex]);
    if (currentEl && this.isInsideTallSection(currentEl)) {
      return;
    }

    const gestureDelta = Math.abs(scrollY - this.gestureStartY);
    if (gestureDelta < 8) return;

    let targetIndex = currentIndex;

    // Short / simple scroll -> advance smoothly to the next section in scroll direction
    if (gestureDelta < viewportHeight * 0.45) {
      const startIndex = this.getSectionIndexAtY(this.gestureStartY);
      const nextIndex = startIndex + this.lastDirection;
      if (nextIndex >= 0 && nextIndex < this.sectionIds.length) {
        const startEl = document.getElementById(this.sectionIds[startIndex]);
        if (!startEl || !this.isInsideTallSection(startEl)) {
          targetIndex = nextIndex;
        }
      }
    } else {
      // Long scroll -> pick the section closest to the viewport center
      const viewportCenter = scrollY + viewportHeight / 2;
      let bestDist = Infinity;

      for (let i = 0; i < this.sectionIds.length; i++) {
        const el = document.getElementById(this.sectionIds[i]);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const top = rect.top + scrollY;
        const center = top + rect.height / 2;
        const dist = Math.abs(center - viewportCenter);
        if (dist < bestDist) {
          bestDist = dist;
          targetIndex = i;
        }
      }
    }

    const targetEl = document.getElementById(this.sectionIds[targetIndex]);
    if (!targetEl || this.isInsideTallSection(targetEl)) return;

    const offset = this.getCenteredOffset(targetEl);
    const desiredTop = targetEl.getBoundingClientRect().top + scrollY + offset;

    if (Math.abs(desiredTop - scrollY) > 14) {
      this.navigateToSection(this.sectionIds[targetIndex], 0.72);
    }
  }

  private handleKeyDown = (e: KeyboardEvent): void => {
    const activeTag = (e.target as HTMLElement)?.tagName;
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(activeTag)) return;

    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
      const current = this.getCurrentSectionId();
      const idx = this.sectionIds.indexOf(current);
      if (idx < this.sectionIds.length - 1) {
        e.preventDefault();
        this.navigateToSection(this.sectionIds[idx + 1]);
      }
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
      const current = this.getCurrentSectionId();
      const idx = this.sectionIds.indexOf(current);
      if (idx > 0) {
        e.preventDefault();
        this.navigateToSection(this.sectionIds[idx - 1]);
      }
    }
  };

  public navigateToSection(targetId: string, duration: number = 0.95): void {
    const targetEl = document.getElementById(targetId);
    if (!targetEl) return;

    this.isProgrammaticScroll = true;
    if (this.settleTimer) {
      clearTimeout(this.settleTimer);
      this.settleTimer = null;
    }
    if (this.navigationTimer) {
      clearTimeout(this.navigationTimer);
    }

    const offset = this.getCenteredOffset(targetEl);

    // Scroll smoothly & centered with Lenis
    scrollToElement(targetEl, offset, duration);
    this.navbar.setActiveSection(targetId);

    // Trigger reveal of target content
    const targetMotions = targetEl.querySelectorAll(MOTION_SELECTOR);
    targetMotions.forEach((el) => el.classList.add('is-revealed'));

    this.navigationTimer = window.setTimeout(() => {
      this.isProgrammaticScroll = false;
    }, Math.round(duration * 1000));
  }

  public refreshObservers(): void {
    const motionElements = document.querySelectorAll(MOTION_SELECTOR);
    motionElements.forEach((el) => {
      this.contentObserver?.observe(el);
    });

    this.sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) this.sectionObserver?.observe(el);
    });
  }

  public destroy(): void {
    window.removeEventListener('wheel', this.handleWheel);
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('keydown', this.handleKeyDown);

    if (this.settleTimer) {
      clearTimeout(this.settleTimer);
      this.settleTimer = null;
    }
    if (this.navigationTimer) {
      clearTimeout(this.navigationTimer);
      this.navigationTimer = null;
    }

    this.contentObserver?.disconnect();
    this.contentObserver = null;
    this.sectionObserver?.disconnect();
    this.sectionObserver = null;
    this.domObserver?.disconnect();
    this.domObserver = null;
  }
}

