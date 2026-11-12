import { i18n } from '../i18n/i18n';
import { scrollToElement } from '../utils/lenis';
import { animate, stagger } from 'animejs';

export interface NavSectionItem {
  id: string;
  labelEn: string;
  labelAr: string;
  scrollLabelEn: string;
  scrollLabelAr: string;
}

export const NAV_SECTIONS: NavSectionItem[] = [
  {
    id: 'home',
    labelEn: 'Home',
    labelAr: 'الرئيسية',
    scrollLabelEn: 'HOME',
    scrollLabelAr: 'الرئيسية',
  },
  {
    id: 'about',
    labelEn: 'About Us',
    labelAr: 'من نحن',
    scrollLabelEn: 'ABOUT',
    scrollLabelAr: 'من نحن',
  },
  {
    id: 'chairmans-word',
    labelEn: 'Leadership',
    labelAr: 'القيادة',
    scrollLabelEn: 'LEADERSHIP',
    scrollLabelAr: 'القيادة',
  },
  {
    id: 'mission',
    labelEn: 'Mission',
    labelAr: 'الرسالة والقيم',
    scrollLabelEn: 'MISSION',
    scrollLabelAr: 'الرسالة والقيم',
  },
  {
    id: 'business-solutions',
    labelEn: 'Solutions',
    labelAr: 'حلول الأعمال',
    scrollLabelEn: 'SOLUTIONS',
    scrollLabelAr: 'حلول الأعمال',
  },
  {
    id: 'ecosystem',
    labelEn: 'Ecosystem',
    labelAr: 'المنظومة',
    scrollLabelEn: 'ECOSYSTEM',
    scrollLabelAr: 'المنظومة',
  },
  {
    id: 'companies',
    labelEn: 'Group Holds',
    labelAr: 'شركات المجموعة',
    scrollLabelEn: 'GROUP HOLDS',
    scrollLabelAr: 'شركات المجموعة',
  },
  {
    id: 'contact',
    labelEn: 'Contact Details',
    labelAr: 'بيانات التواصل',
    scrollLabelEn: 'CONTACT DETAILS',
    scrollLabelAr: 'بيانات التواصل',
  },
];

export class Navbar {
  private container: HTMLElement;
  private isNavOpen: boolean = false;
  private activeSection: string = 'home';
  private unsubscribeI18n: (() => void) | null = null;
  private scrollSpyHandler: (() => void) | null = null;

  constructor() {
    this.container = document.createElement('div');
    this.container.id = 'navbar-wrapper';
    this.render();
    this.initEvents();
  }

  public getElement(): HTMLElement {
    return this.container;
  }

  private render(): void {
    const isAr = i18n.isRTL();

    this.container.innerHTML = `
      <!-- ======================================================== -->
      <!-- 1. FLOATING HEADER (INSIDE HERO CURVE ON HOME, HIDDEN ON NEXT SECTIONS) -->
      <!-- ======================================================== -->
      <header 
        class="fixed top-3 sm:top-5 lg:top-6 inset-x-3 sm:inset-x-5 lg:inset-x-6 z-50 transition-all duration-500 ease-out pointer-events-none header-visible" 
        id="main-header"
      >
        <div class="w-full max-w-[1480px] mx-auto px-4 sm:px-8 lg:px-10 h-16 sm:h-20 flex items-center justify-between gap-4 pointer-events-auto transition-all duration-300" id="navbar-inner">
          
          <!-- Brand Logo (Fitted cleanly without white background box) -->
          <a href="#home" class="nav-logo-link flex items-center gap-3 sm:gap-3.5 flex-shrink-0 group focus:outline-none rounded-lg py-1 z-20" aria-label="OSAN GROUP">
            <div class="relative w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 flex-shrink-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 overflow-hidden">
              <img 
                src="/logos/osan-logo.png" 
                alt="${isAr ? 'شعار مجموعة أوسان' : 'OSAN GROUP Official Logo'}" 
                class="w-full h-full object-contain" 
              />
            </div>
            <div class="flex flex-col items-center text-center flex-shrink-0 leading-tight">
              <span dir="ltr" class="font-heading font-light sm:font-normal text-sm sm:text-base tracking-wide text-osan-ink group-hover:text-osan-blue transition-colors whitespace-nowrap">
                OSAN <span class="text-osan-blue font-light sm:font-normal">GROUP</span>
              </span>
              <span class="${isAr ? 'text-[11px] sm:text-xs font-arabic tracking-normal' : 'text-[8.5px] sm:text-[9.5px] tracking-[0.16em] uppercase'} font-light text-osan-grey whitespace-nowrap mt-0.5">
                ${isAr ? 'مجموعة شركات' : 'GROUP OF COMPANIES'}
              </span>
            </div>
          </a>

          <!-- Right Navigation Area: Inline Expandable Nav + Lang + Square Toggle -->
          <div class="flex items-center gap-3 sm:gap-5 z-20">
            
            <!-- Inline Expandable Navigation Links (Image 3 Model) -->
            <!-- Hidden by default, smoothly reveals when menu button is clicked -->
            <nav 
              id="inline-nav-links" 
              class="hidden lg:flex items-center gap-3 lg:gap-4 xl:gap-6 transition-all duration-300 ${
                this.isNavOpen 
                  ? 'opacity-100 translate-x-0 pointer-events-auto' 
                  : 'opacity-0 translate-x-4 pointer-events-none'
              }"
              aria-hidden="${!this.isNavOpen}"
            >
              ${NAV_SECTIONS.map((item) => `
                <a 
                  href="#${item.id}" 
                  data-nav-target="${item.id}"
                  class="inline-nav-link text-xs lg:text-[13px] xl:text-sm font-light sm:font-normal tracking-wide transition-all duration-200 hover:text-osan-blue relative py-1 whitespace-nowrap ${
                    this.activeSection === item.id
                      ? 'text-osan-blue font-medium after:content-[\'\'] after:absolute after:-bottom-0.5 after:inset-x-0 after:h-0.5 after:bg-osan-blue after:rounded-full'
                      : 'text-osan-ink/80'
                  }"
                >
                  ${isAr ? item.labelAr : item.labelEn}
                </a>
              `).join('')}
            </nav>

            <!-- Language Switcher Pill -->
            <div class="flex items-center bg-white/70 backdrop-blur-md border border-osan-sky/80 rounded-full p-1 shadow-xs" role="group" aria-label="Language Switcher">
              <button 
                type="button" 
                id="btn-lang-en"
                class="lang-btn px-2.5 sm:px-3 py-1 rounded-full text-xs font-bold transition-all duration-200 ${
                  !isAr
                    ? 'bg-osan-blue text-white shadow-xs'
                    : 'text-osan-grey hover:text-osan-blue'
                }"
              >
                EN
              </button>
              <button 
                type="button" 
                id="btn-lang-ar"
                class="lang-btn px-3 py-1 rounded-full text-xs font-bold transition-all duration-200 font-arabic ${
                  isAr
                    ? 'bg-osan-blue text-white shadow-xs'
                    : 'text-osan-grey hover:text-osan-blue'
                }"
              >
                عربي
              </button>
            </div>

            <!-- Minimal Transparent Menu Button [ ☰ ] / [ ✕ ] -->
            <button 
              type="button" 
              id="menu-toggle-btn"
              class="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-transparent hover:bg-osan-ink/5 text-black hover:text-osan-blue flex items-center justify-center transition-all duration-300 active:scale-95 focus:outline-none focus:ring-2 focus:ring-osan-blue cursor-pointer"
              aria-label="Toggle Navigation Menu"
              aria-expanded="${this.isNavOpen}"
            >
              <!-- Hamburger 3 Bars Icon (Image 1) -->
              <svg id="menu-icon-bars" class="w-5 h-5 ${this.isNavOpen ? 'hidden' : 'block'}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
              <!-- Close X Icon (Image 3) -->
              <svg id="menu-icon-close" class="w-5 h-5 ${this.isNavOpen ? 'block' : 'hidden'}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>

          </div>

        </div>

        <!-- Mobile & Tablet Floating Ribbon (Expands below lg when toggled) -->
        <div 
          id="mobile-nav-ribbon"
          class="lg:hidden transition-all duration-300 ${
            this.isNavOpen ? 'max-h-[78vh] overflow-y-auto opacity-100 pointer-events-auto' : 'max-h-0 overflow-hidden opacity-0 pointer-events-none'
          }"
        >
          <div class="mx-3 sm:mx-4 my-2 p-2.5 sm:p-3 rounded-2xl bg-white/95 backdrop-blur-xl border border-osan-sky/75 shadow-[0_18px_45px_-12px_rgba(14,116,179,0.16)] flex flex-col gap-1">
            ${NAV_SECTIONS.map((item) => `
              <a 
                href="#${item.id}" 
                data-nav-target="${item.id}"
                class="mobile-nav-link flex items-center justify-between px-3.5 py-2.5 rounded-xl text-[13.5px] tracking-wide transition-all ${
                  this.activeSection === item.id
                    ? 'bg-osan-light text-osan-blue font-normal'
                    : 'text-osan-ink font-light hover:bg-osan-light/70 hover:text-osan-blue'
                }"
              >
                <span>${isAr ? item.labelAr : item.labelEn}</span>
                <svg class="w-4 h-4 text-osan-blue/75 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
                </svg>
              </a>
            `).join('')}
          </div>
        </div>

      </header>

      <!-- ======================================================== -->
      <!-- 2. VERTICAL SIDE SCROLL INDICATOR                        -->
      <!-- Slim minimalist lines; labels reveal ONLY on hover        -->
      <!-- Reduced spacing between lines and sleeker indicator bars -->
      <!-- ======================================================== -->
      <aside 
        id="vertical-scroll-tracker" 
        class="fixed top-1/2 -translate-y-1/2 z-40 right-2.5 lg:right-6 xl:right-10 rtl:right-auto rtl:left-2.5 lg:rtl:left-6 xl:rtl:left-10 hidden md:flex flex-col items-end rtl:items-start gap-2 sm:gap-2.5 select-none pointer-events-auto"
        aria-label="Page Section Progress"
      >
        ${NAV_SECTIONS.map((item) => `
          <div 
            data-scroll-target="${item.id}"
            class="scroll-tracker-item group flex items-center gap-2.5 cursor-pointer py-0.5 rtl:flex-row-reverse"
          >
            <!-- Label: Hidden by default, reveals ONLY on hover (Slim Typography) -->
            <span class="scroll-tracker-label">
              ${isAr ? item.scrollLabelAr : item.scrollLabelEn}
            </span>

            <!-- Horizontal Slim Tick Line (Delicate 1px / 1.5px, not thick) -->
            <span class="scroll-tracker-line"></span>
          </div>
        `).join('')}
      </aside>
    `;

    this.updateScrollTracker(this.activeSection);
    this.bindEvents();
  }

  private bindEvents(): void {
    // Language Buttons
    this.container.querySelector('#btn-lang-en')?.addEventListener('click', () => {
      i18n.setLanguage('en');
    });
    this.container.querySelector('#btn-lang-ar')?.addEventListener('click', () => {
      i18n.setLanguage('ar');
    });

    // Square Menu Toggle Button [ ☰ ] / [ ✕ ]
    const menuBtn = this.container.querySelector('#menu-toggle-btn');
    menuBtn?.addEventListener('click', () => {
      this.toggleNav();
    });

    // Navigation Links (Desktop & Mobile)
    const navLinks = this.container.querySelectorAll<HTMLAnchorElement>('[data-nav-target]');
    navLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('data-nav-target');
        if (targetId) {
          const mgr = (window as any).__pageScrollManager;
          if (mgr?.navigateToSection) {
            mgr.navigateToSection(targetId);
          } else {
            const targetEl = document.getElementById(targetId);
            if (targetEl) {
              scrollToElement(targetEl, 0);
              this.setActiveSection(targetId);
            }
          }
        }
        // Smoothly close nav on link click
        this.closeNav();
      });
    });

    // Vertical Scroll Tracker Click Handlers
    const scrollTrackerItems = this.container.querySelectorAll<HTMLElement>('[data-scroll-target]');
    scrollTrackerItems.forEach((item) => {
      item.addEventListener('click', () => {
        const targetId = item.getAttribute('data-scroll-target');
        if (targetId) {
          const mgr = (window as any).__pageScrollManager;
          if (mgr?.navigateToSection) {
            mgr.navigateToSection(targetId);
          } else {
            const targetEl = document.getElementById(targetId);
            if (targetEl) {
              scrollToElement(targetEl, 0);
              this.setActiveSection(targetId);
            }
          }
        }
      });
    });

    // Logo Click -> Scroll to Top
    const logoLink = this.container.querySelector<HTMLAnchorElement>('.nav-logo-link');
    logoLink?.addEventListener('click', (e) => {
      e.preventDefault();
      const heroEl = document.getElementById('home');
      if (heroEl) {
        scrollToElement(heroEl, 0);
        this.setActiveSection('home');
      }
      this.closeNav();
    });
  }

  public toggleNav(): void {
    this.isNavOpen = !this.isNavOpen;
    const navLinksEl = this.container.querySelector('#inline-nav-links');
    const mobileRibbon = this.container.querySelector('#mobile-nav-ribbon');
    const barsIcon = this.container.querySelector('#menu-icon-bars');
    const closeIcon = this.container.querySelector('#menu-icon-close');
    const menuBtn = this.container.querySelector('#menu-toggle-btn');

    if (this.isNavOpen) {
      // Reveal desktop nav links
      navLinksEl?.classList.remove('opacity-0', 'translate-x-4', 'pointer-events-none');
      navLinksEl?.classList.add('opacity-100', 'translate-x-0', 'pointer-events-auto');
      navLinksEl?.setAttribute('aria-hidden', 'false');

      // Expand mobile ribbon
      mobileRibbon?.classList.remove('max-h-0', 'overflow-hidden', 'opacity-0', 'pointer-events-none');
      mobileRibbon?.classList.add('max-h-[78vh]', 'overflow-y-auto', 'opacity-100', 'pointer-events-auto');

      // Swap button icons
      barsIcon?.classList.add('hidden');
      closeIcon?.classList.remove('hidden');
      menuBtn?.setAttribute('aria-expanded', 'true');

      // Staggered Anime.js entrance for desktop links
      const links = this.container.querySelectorAll('.inline-nav-link');
      if (links.length > 0) {
        animate(links, {
          opacity: [0, 1],
          translateX: [14, 0],
          delay: stagger(35),
          duration: 320,
          ease: 'out(3)',
        });
      }
    } else {
      // Hide desktop nav links
      navLinksEl?.classList.add('opacity-0', 'translate-x-4', 'pointer-events-none');
      navLinksEl?.classList.remove('opacity-100', 'translate-x-0', 'pointer-events-auto');
      navLinksEl?.setAttribute('aria-hidden', 'true');

      // Collapse mobile ribbon
      mobileRibbon?.classList.add('max-h-0', 'overflow-hidden', 'opacity-0', 'pointer-events-none');
      mobileRibbon?.classList.remove('max-h-[78vh]', 'overflow-y-auto', 'opacity-100', 'pointer-events-auto');

      // Swap button icons
      barsIcon?.classList.remove('hidden');
      closeIcon?.classList.add('hidden');
      menuBtn?.setAttribute('aria-expanded', 'false');
    }
  }

  public closeNav(): void {
    if (!this.isNavOpen) return;
    this.toggleNav();
  }

  public setActiveSection(sectionId: string): void {
    if (this.activeSection === sectionId) return;
    this.activeSection = sectionId;

    // 0. Auto-Hide Navbar on scrolling to other sections!
    // When on #home, navbar is visible inside the curve.
    // When scrolling to next sections, hide navbar completely so the view is 100% full-page visible!
    const headerEl = this.container.querySelector<HTMLElement>('#main-header');
    if (headerEl) {
      if (sectionId === 'home') {
        headerEl.classList.remove('header-hidden');
        headerEl.classList.add('header-visible');
      } else {
        headerEl.classList.remove('header-visible');
        headerEl.classList.add('header-hidden');
        this.closeNav();
      }
    }

    // Update browser URL hash cleanly without page jump
    try {
      if (window.location.hash !== '#' + sectionId) {
        window.history.replaceState(null, '', '#' + sectionId);
      }
    } catch {
      // Ignore if sandboxed
    }

    // 1. Update Inline Desktop Links (Slim Typography)
    const desktopLinks = this.container.querySelectorAll<HTMLAnchorElement>('.inline-nav-link');
    desktopLinks.forEach((link) => {
      const target = link.getAttribute('data-nav-target');
      if (target === sectionId) {
        link.className =
          'inline-nav-link text-xs lg:text-[13px] xl:text-sm font-medium tracking-wide transition-all duration-200 text-osan-blue relative py-1 whitespace-nowrap after:content-[\'\'] after:absolute after:-bottom-0.5 after:inset-x-0 after:h-0.5 after:bg-osan-blue after:rounded-full';
      } else {
        link.className =
          'inline-nav-link text-xs lg:text-[13px] xl:text-sm font-light sm:font-normal tracking-wide transition-all duration-200 hover:text-osan-blue text-osan-ink/80 relative py-1 whitespace-nowrap';
      }
    });

    // 2. Update Mobile Links
    const mobileLinks = this.container.querySelectorAll<HTMLAnchorElement>('.mobile-nav-link');
    mobileLinks.forEach((link) => {
      const target = link.getAttribute('data-nav-target');
      if (target === sectionId) {
        link.classList.add('bg-osan-light', 'text-osan-blue', 'font-normal');
        link.classList.remove('text-osan-ink', 'font-light');
      } else {
        link.classList.remove('bg-osan-light', 'text-osan-blue', 'font-normal');
        link.classList.add('text-osan-ink', 'font-light');
      }
    });

    // 3. Update Vertical Side Scroll Tracker (Slim, delicate lines — switches to white on dark sections)
    this.updateScrollTracker(sectionId);
  }

  private updateScrollTracker(_sectionId: string): void {
    // All sections including #ecosystem now have a light outer background behind the rail
    const isDarkBg = false;
    const sectionId = _sectionId;
    const labelBase =
      'scroll-tracker-label text-[10px] sm:text-[11px] tracking-wider rtl:tracking-normal uppercase transition-all duration-200 drop-shadow-xs whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 translate-x-2 rtl:-translate-x-2 group-hover:translate-x-0';
    const lineBase = 'scroll-tracker-line block rounded-full transition-all duration-300';

    const trackerItems = this.container.querySelectorAll<HTMLElement>('.scroll-tracker-item');
    trackerItems.forEach((item) => {
      const target = item.getAttribute('data-scroll-target');
      const label = item.querySelector<HTMLElement>('.scroll-tracker-label');
      const line = item.querySelector<HTMLElement>('.scroll-tracker-line');
      const isActive = target === sectionId;

      if (label) {
        label.className = `${labelBase} ${
          isActive
            ? `font-semibold ${isDarkBg ? 'text-white drop-shadow-sm' : 'text-osan-blue'}`
            : `font-light ${isDarkBg ? 'text-white/80 hover:text-white drop-shadow-sm' : 'text-osan-grey hover:text-osan-ink'}`
        }`;
      }

      if (line) {
        line.className = `${lineBase} ${
          isActive
            ? `h-[1.5px] w-6 sm:w-7 ${isDarkBg ? 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.75)]' : 'bg-osan-blue shadow-[0_0_4px_rgba(36,115,171,0.5)]'}`
            : `h-[1px] w-3.5 sm:w-4 ${isDarkBg ? 'bg-white/45 group-hover:w-6 group-hover:bg-white' : 'bg-osan-grey/40 group-hover:w-6 group-hover:bg-osan-blue'}`
        }`;
      }
    });
  }

  private initEvents(): void {
    // Re-render on language toggle
    this.unsubscribeI18n = i18n.onLanguageChange(() => {
      this.render();
    });

    // Scroll Spy & Transparent Header Elevation
    this.scrollSpyHandler = () => {
      const scrollY = window.scrollY;

      // Subtle Glass Effect on scroll (no solid background)
      const inner = this.container.querySelector('#navbar-inner');
      if (scrollY > 20) {
        inner?.classList.add('bg-white/40', 'backdrop-blur-md', 'shadow-xs');
      } else {
        inner?.classList.remove('bg-white/40', 'backdrop-blur-md', 'shadow-xs');
      }

      // If within Hero section near top of page, explicitly lock to home
      if (scrollY < 120) {
        this.setActiveSection('home');
        return;
      }

      // Viewport trigger line (180px below top)
      const scrollPos = scrollY + 180;
      
      // In bottom-to-top order
      const sections = ['contact', 'companies', 'ecosystem', 'business-solutions', 'mission', 'chairmans-word', 'about', 'home'];

      for (const secId of sections) {
        const el = document.getElementById(secId);
        if (el) {
          const top = el.getBoundingClientRect().top + scrollY;
          if (scrollPos >= top) {
            this.setActiveSection(secId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', this.scrollSpyHandler, { passive: true });

    // Initial check on load: If hash is already on a specific section, hide header immediately
    if (window.location.hash && window.location.hash !== '#home') {
      const targetId = window.location.hash.replace('#', '');
      this.setActiveSection(targetId);
    } else {
      this.scrollSpyHandler();
    }

    // Hashchange listener
    window.addEventListener('hashchange', () => {
      if (window.location.hash) {
        const targetId = window.location.hash.replace('#', '');
        this.setActiveSection(targetId);
      }
    });
  }

  public destroy(): void {
    if (this.scrollSpyHandler) {
      window.removeEventListener('scroll', this.scrollSpyHandler);
      this.scrollSpyHandler = null;
    }
    if (this.unsubscribeI18n) {
      this.unsubscribeI18n();
      this.unsubscribeI18n = null;
    }
  }
}
