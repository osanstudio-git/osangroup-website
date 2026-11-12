import { ParticleConstellation } from '../canvas/ParticleConstellation';
import { i18n } from '../i18n/i18n';
import { scrollToElement } from '../utils/lenis';
import { animate, svg, stagger } from 'animejs';
import { OFFICIAL_LOGO_PATHS } from './logoVectorData';

export class Hero {
  private container: HTMLElement;
  private constellationScene: ParticleConstellation | null = null;
  private unsubscribeI18n: (() => void) | null = null;
  private scrambleTimer: number | null = null;
  private currentScrambleIndex: number = 0;
  private aboutEmblemAnimation: any = null;
  private aboutObserver: IntersectionObserver | null = null;

  constructor() {
    this.container = document.createElement('div');
    this.container.className = 'w-full bg-white';
    this.render();
  }

  public getElement(): HTMLElement {
    return this.container;
  }

  private renderSplitWords(text: string): string {
    return text
      .trim()
      .split(/\s+/)
      .map(
        (word, idx) =>
          `<span class="split-word-mask"><span class="split-word" style="--word-index: ${idx};">${word}</span></span>`
      )
      .join(' ');
  }

  private render(): void {
    const isAr = i18n.isRTL();
    const t = (k: string, fb: string) => i18n.t(k, fb);

    this.container.innerHTML = `
      <!-- ======================================================== -->
      <!-- 1. CURVED HERO CARD MODEL (WITH INSET WHITE FRAME)        -->
      <!-- Matches Image 1 & 2: Curved card with nav & lines inside  -->
      <!-- ======================================================== -->
      <section id="home" class="relative w-full min-h-screen lg:h-screen p-3 sm:p-5 lg:p-6 bg-white overflow-hidden flex flex-col justify-center items-center scroll-mt-0">
        <div class="hero-curved-card relative w-full h-full min-h-[calc(100vh-1.5rem)] sm:min-h-[calc(100vh-2.5rem)] lg:min-h-0 max-w-[1480px] rounded-[28px] sm:rounded-[36px] lg:rounded-[42px] overflow-hidden border border-osan-sky/80 shadow-elevated bg-white flex flex-col justify-center items-center text-center p-5 pt-24 pb-10 sm:p-10 sm:pt-24 lg:p-16">
          
          <!-- Interactive Brand-Blue Particle Constellation Background on White -->
          <div data-parallax="-0.22" class="absolute inset-0 z-0 overflow-hidden rounded-[28px] sm:rounded-[36px] lg:rounded-[42px] bg-white pointer-events-auto" id="hero-constellation-container">
            <!-- Canvas mounts here -->
            
            <!-- Soft White Center Vignette for Crisp Typography Contrast -->
            <div class="absolute inset-0 bg-[radial-gradient(ellipse_65%_58%_at_50%_50%,rgba(255,255,255,0.82)_0%,rgba(255,255,255,0.28)_60%,rgba(255,255,255,0)_100%)] pointer-events-none"></div>
          </div>

          <!-- Foreground Hero Content (Centered inside Curved Card) with Entrance Motion -->
          <div data-parallax="0.1" class="relative z-10 max-w-5xl mx-auto px-4 flex flex-col items-center">
          
            <!-- Main Headline: OSAN with Smooth Whole-Text Rotation Animation (Slim Typography) -->
            <h1 class="reveal-text-fade text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-light sm:font-normal text-osan-ink text-center tracking-tight leading-[1.25] max-w-5xl mb-6 flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-4">
              <span>${isAr ? 'أوسان' : 'OSAN'}</span>
              <span class="overflow-hidden inline-flex items-center justify-center py-1">
                <span 
                  id="hero-rotating-word" 
                  class="text-osan-blue inline-block font-light sm:font-normal"
                >${isAr ? 'الأعمال' : 'Businesses'}</span>
              </span>
            </h1>

            <!-- Subheadline (Split-Text Word Reveal + Slim Typography) -->
            <p id="home-hero-subheadline" class="reveal-split-text text-sm sm:text-base md:text-lg text-osan-grey text-center max-w-3xl leading-relaxed mb-8 sm:mb-10 font-light" style="--split-base-delay: 120ms;">
              ${this.renderSplitWords(
                t(
                  'home.hero.subheadline',
                  'Founded in 2016, OSAN GROUP is a multi-sector Omani corporate powerhouse delivering end-to-end ecosystems across business advisory, financial audit, corporate services, real estate, creative media, and strategic investments.'
                )
              )}
            </p>

            <!-- Primary Call to Action Buttons (Refined Weight) -->
            <div class="reveal-slide-up flex flex-wrap items-center justify-center gap-4" style="--reveal-delay: 200ms;">
              <button 
                type="button"
                id="hero-primary-cta"
                class="px-8 py-3.5 sm:py-4 rounded-full bg-osan-blue hover:bg-osan-deep text-white font-light sm:font-normal tracking-wide text-sm sm:text-base shadow-elevated hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex items-center gap-2 group cursor-pointer"
              >
                <span>${t('home.hero.primary_cta', 'Explore Our Companies')}</span>
                <svg class="w-4 h-4 rtl:rotate-180 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                </svg>
              </button>

              <button 
                type="button"
                id="hero-secondary-cta"
                class="px-8 py-3.5 sm:py-4 rounded-full bg-white/90 hover:bg-osan-sky/40 text-osan-blue border-2 border-osan-blue/80 font-light sm:font-normal tracking-wide text-sm sm:text-base shadow-subtle transition-all duration-300 hover:-translate-y-1 backdrop-blur-md cursor-pointer"
              >
                <span>${t('home.hero.secondary_cta', 'Contact Head Office')}</span>
              </button>
            </div>

          </div>

        </div>
      </section>

      <!-- ======================================================== -->
      <!-- 2. SECTION: A DECADE OF EXCELLENCE & OFFICIAL EMBLEM     -->
      <!-- Positioned after Home (#home), before Leadership (#chairmans-word) -->
      <!-- Fits 100% in viewport without vertical overflow/clipping -->
      <!-- ======================================================== -->
      <section id="about" class="relative bg-white min-h-screen lg:h-screen lg:max-h-screen flex flex-col justify-center items-center pt-20 pb-12 sm:pt-24 sm:pb-16 lg:py-5 px-4 sm:px-6 lg:px-8 border-t border-osan-sky/60 overflow-hidden scroll-mt-0">
        <div class="max-w-5xl mx-auto w-full flex flex-col items-center text-center space-y-3 sm:space-y-4">
          <h2 class="reveal-text-fade text-2xl sm:text-3xl md:text-4xl font-heading font-light sm:font-normal text-osan-ink tracking-tight max-w-3xl leading-snug">
            ${isAr 
              ? 'عقد من التميز المؤسسي وبناء الشراكات الاستراتيجية' 
              : 'A Decade of Institutional Excellence & Strategic Alliances'}
          </h2>

          <p id="about-lead-text" class="reveal-split-text max-w-2xl text-xs sm:text-sm text-osan-grey font-light leading-relaxed" style="--split-base-delay: 100ms;">
            ${this.renderSplitWords(
              isAr
                ? 'تأسست مجموعة أوسان عام ٢٠١٦ كشركة عُمانية رائدة برؤية طموحة، تقدم منظومة متكاملة من الخدمات التي تلبي احتياجات الأفراد ورواد الأعمال والمستثمرين في مختلف القطاعات الحيوية.'
                : 'Established in 2016 as an ambitious Omani enterprise, OSAN GROUP delivers an integrated ecosystem of corporate solutions serving individuals, entrepreneurs, and global investors across vital sectors.'
            )}
          </p>

          <!-- Pure Continuous Official Emblem Showcase (Compact Proportions) -->
          <div class="reveal-spring-defocus w-full max-w-xl sm:max-w-2xl lg:max-w-3xl mt-2 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#061426] via-[#0B213D] to-[#040C17] border border-cyan-500/30 shadow-[0_20px_60px_-15px_rgba(14,165,233,0.35)] relative overflow-hidden flex items-center justify-center p-6 sm:p-8 lg:p-10 select-none group" style="--reveal-delay: 160ms;">
            
            <!-- Blueprint Coordinate Grid Background Pattern -->
            <div class="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none"></div>

            <!-- Glowing Ambient Accent Blooms -->
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 sm:w-80 h-64 sm:h-80 bg-sky-500/20 rounded-full blur-3xl pointer-events-none"></div>
            <div data-parallax="-0.18" class="absolute -top-16 -left-16 w-48 h-48 bg-cyan-400/15 rounded-full blur-3xl pointer-events-none"></div>
            <div data-parallax="0.18" class="absolute -bottom-16 -right-16 w-48 h-48 bg-blue-600/15 rounded-full blur-3xl pointer-events-none"></div>

            <!-- Authentic Official Emblem SVG with 24 Brand Vectors (Compact Proportions) -->
            <div class="relative z-10 w-full flex items-center justify-center">
              <svg 
                id="osan-official-svg"
                viewBox="0 0 607 627" 
                class="w-full max-w-[190px] sm:max-w-[230px] lg:max-w-[260px] max-h-[210px] sm:max-h-[250px] h-auto overflow-visible drop-shadow-[0_0_24px_rgba(56,189,248,0.5)] transition-transform duration-500 group-hover:scale-[1.03]"
                aria-label="Official OSAN GROUP Emblem"
              >
                <defs>
                  <filter id="cyanOfficialGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3.5" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <linearGradient id="emblemGradPrimary" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#38BDF8" />
                    <stop offset="100%" stop-color="#0284C7" />
                  </linearGradient>
                </defs>

                <!-- 24 Authentic Brand Vector Paths -->
                ${OFFICIAL_LOGO_PATHS.map((p, idx) => `
                  <path 
                    id="about-stroke-${p.id}"
                    class="official-stroke-path"
                    d="${p.d}"
                    fill="none"
                    stroke="${p.stroke}"
                    stroke-width="${p.width}"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    ${idx < 2 ? 'filter="url(#cyanOfficialGlow)"' : ''}
                  />
                `).join('')}
              </svg>
            </div>

          </div>

        </div>
      </section>
    `;

    this.mountSubcomponents();
    this.bindEvents();
    this.initRotatingAnimation();
    this.initAboutEmblemAnimation();
  }

  private mountSubcomponents(): void {
    // 1. Mount Brand-Blue Particle Constellation inside the white curved card viewport
    const constellationContainer = this.container.querySelector<HTMLElement>('#hero-constellation-container');
    if (constellationContainer) {
      if (this.constellationScene) {
        this.constellationScene.destroy();
      }
      this.constellationScene = new ParticleConstellation(constellationContainer);
    }
  }

  private bindEvents(): void {
    // Primary CTA -> Scroll to Companies
    this.container.querySelector('#hero-primary-cta')?.addEventListener('click', () => {
      const companies = document.getElementById('companies');
      if (companies) scrollToElement(companies, 0);
    });

    // Secondary CTA -> Scroll to Contact
    this.container.querySelector('#hero-secondary-cta')?.addEventListener('click', () => {
      const contact = document.getElementById('contact');
      if (contact) scrollToElement(contact, 0);
    });

    // Listen to language change to re-render texts
    if (!this.unsubscribeI18n) {
      this.unsubscribeI18n = i18n.onLanguageChange(() => {
        this.render();
      });
    }
  }

  private initRotatingAnimation(): void {
    if (this.scrambleTimer) {
      clearInterval(this.scrambleTimer);
      this.scrambleTimer = null;
    }

    const targetEl = this.container.querySelector<HTMLElement>('#hero-rotating-word');
    if (!targetEl) return;

    const isAr = i18n.isRTL();
    const words = isAr
      ? ['الأعمال', 'الشركات', 'الملكية الفكرية', 'الاستثمارات', 'الاستشارات المؤسسية']
      : ['Businesses', 'Companies', 'Intellectual Property', 'Investments', 'Corporate Advisory'];

    this.currentScrambleIndex = 0;
    targetEl.textContent = words[0];

    // Initial smooth entrance
    animate(targetEl, {
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 700,
      ease: 'out(3)',
    });

    // Auto cycle words with whole-text smooth slide-fade transition
    this.scrambleTimer = window.setInterval(() => {
      // 1. Smoothly slide up & fade out the entire current text
      animate(targetEl, {
        opacity: [1, 0],
        translateY: [0, -20],
        duration: 350,
        ease: 'in(2)',
        onComplete: () => {
          this.currentScrambleIndex = (this.currentScrambleIndex + 1) % words.length;
          targetEl.textContent = words[this.currentScrambleIndex];

          // 2. Smoothly slide up & fade in the entire new text
          animate(targetEl, {
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 500,
            ease: 'out(3)',
          });
        },
      });
    }, 3000);
  }

  private initAboutEmblemAnimation(): void {
    const svgEl = this.container.querySelector<SVGElement>('#osan-official-svg');
    if (!svgEl) return;

    if (this.aboutObserver) {
      this.aboutObserver.disconnect();
      this.aboutObserver = null;
    }

    if (this.aboutEmblemAnimation) {
      this.aboutEmblemAnimation.pause();
      this.aboutEmblemAnimation = null;
    }

    if (!('IntersectionObserver' in window)) {
      this.startAboutAnimation();
      return;
    }

    this.aboutObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.startAboutAnimation();
          } else {
            this.pauseAboutAnimation();
          }
        });
      },
      { threshold: 0.15 }
    );

    this.aboutObserver.observe(svgEl);
  }

  private startAboutAnimation(): void {
    if (this.aboutEmblemAnimation) {
      this.aboutEmblemAnimation.play();
      return;
    }

    const paths = this.container.querySelectorAll<SVGGeometryElement>('.official-stroke-path');
    if (paths.length === 0) return;

    try {
      const drawables = svg.createDrawable(paths as any, 0, 0);
      this.aboutEmblemAnimation = animate(drawables, {
        draw: ['0 0', '0 1'],
        duration: 3000,
        ease: 'inOutSine',
        delay: stagger(55),
        loop: true,
        alternate: true,
        loopDelay: 1200,
      });
    } catch (err) {
      console.warn('Anime.js about emblem animation error:', err);
    }
  }

  private pauseAboutAnimation(): void {
    if (this.aboutEmblemAnimation) {
      this.aboutEmblemAnimation.pause();
    }
  }

  public destroy(): void {
    if (this.scrambleTimer) {
      clearInterval(this.scrambleTimer);
      this.scrambleTimer = null;
    }
    if (this.aboutObserver) {
      this.aboutObserver.disconnect();
      this.aboutObserver = null;
    }
    if (this.aboutEmblemAnimation) {
      this.aboutEmblemAnimation.pause();
      this.aboutEmblemAnimation = null;
    }
    if (this.constellationScene) {
      this.constellationScene.destroy();
      this.constellationScene = null;
    }
    if (this.unsubscribeI18n) {
      this.unsubscribeI18n();
      this.unsubscribeI18n = null;
    }
  }
}
