import { i18n } from '../i18n/i18n';
import { animate } from 'animejs';
import { HeroLogoSwitcher } from './HeroLogoSwitcher';
import { scrollToElement } from '../utils/lenis';

/**
 * Renders the Business Solutions (#business-solutions) and Corporate Ecosystem (#ecosystem) sections.
 */
export class BusinessSolutions {
  private container: HTMLElement;
  private logoSwitcher: HeroLogoSwitcher | null = null;
  private unsubscribeI18n: (() => void) | null = null;
  private isSolutionsVideoMuted: boolean = true;

  constructor() {
    this.container = document.createElement('div');
    this.container.className = 'w-full bg-white';
    this.render();
  }

  public getElement(): HTMLElement {
    return this.container;
  }

  private render(): void {
    const isAr = i18n.isRTL();

    this.container.innerHTML = `
      <!-- ======================================================== -->
      <!-- BUSINESS SOLUTIONS INTRO SECTION                         -->
      <!-- ======================================================== -->
      <section id="business-solutions" class="relative z-10 w-full min-h-screen flex flex-col justify-center py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden scroll-mt-0">
        
        <!-- Subtle Dotted World Map Texture Background -->
        <div 
          class="absolute inset-0 bg-center bg-no-repeat bg-contain opacity-30 pointer-events-none"
          style="background-image: url('/images/world-map-dots.svg');"
        ></div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
          
          <!-- Left Column: Headline, Paragraph, and Pill CTA Button -->
          <div class="lg:col-span-6 flex flex-col items-start text-start rtl:text-start">
            
            <h2 class="reveal-text-fade text-3xl sm:text-4xl md:text-5xl font-heading font-light sm:font-normal text-osan-ink tracking-tight leading-[1.25] max-w-xl mb-6">
              ${isAr 
                ? 'شركة استثمار أعمال <span class="font-normal text-osan-blue">تحتضن شركات متنوعة ورائدة.</span>' 
                : 'A business investment company that <span class="font-normal text-osan-blue">holds versatile companies.</span>'}
            </h2>

            <p class="reveal-text-fade text-sm sm:text-base text-osan-grey font-light leading-relaxed max-w-xl mb-8 sm:mb-10" style="--reveal-delay: 110ms;">
              ${isAr
                ? 'نساعد عملاءنا ومستثمرينا على النجاح والريادة عبر بناء هويات تجارية ملهمة، وتقديم حلول أعمال ورقمية متكاملة، واستشارات استثمارية وتنفيذية تحقق أهدافكم بأعلى معايير الإتقان والجودة.'
                : 'We help our clients succeed by creating brand identities, digital experiences, corporate advisory, and strategic solutions that communicate clearly, achieve ambitious business goals, and look fantastic.'}
            </p>

            <div class="reveal-slide-up" style="--reveal-delay: 200ms;">
              <a 
                href="#contact" 
                id="solutions-free-consultation-btn"
                class="inline-flex items-center gap-3 px-8 sm:px-9 py-4 rounded-full bg-[#1E70B8] hover:bg-[#155b96] text-white font-light sm:font-normal text-xs sm:text-sm tracking-widest uppercase shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 active:translate-y-0 group cursor-pointer"
              >
                <span>${isAr ? 'طلب استشارة مجانية' : 'FREE CONSULTATION'}</span>
                <span class="text-sm font-normal rtl:rotate-180 transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1">▸</span>
              </a>
            </div>

          </div>

          <!-- Right Column: Overlapping Photo & Corporate Video Composition -->
          <div class="lg:col-span-6 relative w-full flex items-center justify-center lg:justify-end">
            
            <div data-parallax="-0.24" class="absolute w-80 h-80 rounded-full bg-osan-sky/35 blur-3xl -top-8 -right-8 pointer-events-none"></div>

            <div data-parallax="0.12" class="relative w-full max-w-[480px] sm:max-w-[540px] pb-6 sm:pb-0">
              
              <!-- Top-Right Photo: Executive Consultation & Boardroom Meeting -->
              <div class="reveal-slide-right shine-card w-[78%] sm:w-80 lg:w-96 h-48 sm:h-64 lg:h-72 ml-auto rtl:ml-0 rtl:mr-auto rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-white group transition-transform duration-500 hover:scale-[1.02] cursor-pointer">
                <img 
                  src="/images/WhatsApp Image 2026-11-10 at 14.49.04.jpeg" 
                  alt="Corporate Advisory & Executive Consultation" 
                  class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              <!-- Bottom-Left Overlapping Card: Corporate Video Showcase -->
              <div
                id="solutions-video-card"
                role="button"
                tabindex="0"
                aria-label="Open video modal"
                class="reveal-slide-left shine-card w-[76%] sm:w-72 lg:w-80 h-52 sm:h-64 lg:h-72 -mt-14 sm:-mt-24 mr-auto rtl:mr-0 rtl:ml-auto relative z-10 rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-[#061426] select-none group transition-transform duration-500 hover:scale-[1.02] cursor-pointer"
                style="--reveal-delay: 120ms;"
              >
                <video
                  id="solutions-showcase-video"
                  src="/videos/WhatsApp Video 2026-11-11 at 14.34.32.mp4"
                  autoplay
                  muted
                  loop
                  playsinline
                  disablepictureinpicture
                  preload="metadata"
                  class="w-full h-full object-cover"
                ></video>

                <div class="absolute inset-0 bg-gradient-to-t from-slate-950/35 via-transparent to-slate-950/15 pointer-events-none"></div>

                <!-- Subtle Center Expand Cue on Hover -->
                <div class="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span class="w-11 h-11 rounded-full bg-slate-900/75 backdrop-blur-md border border-white/30 text-white flex items-center justify-center shadow-lg">
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5"/>
                    </svg>
                  </span>
                </div>

                <button
                  type="button"
                  id="solutions-video-sound-btn"
                  class="absolute top-3 left-3 rtl:left-auto rtl:right-3 z-20 w-8 h-8 rounded-full bg-slate-900/80 hover:bg-osan-blue backdrop-blur-md border border-white/25 text-white flex items-center justify-center transition-all shadow-md cursor-pointer"
                  aria-label="Toggle video sound"
                >
                  ${this.getSoundButtonMarkup()}
                </button>
              </div>

              <!-- Verified Corporate Advisory Floating Tag -->
              <div class="reveal-text-fade absolute -bottom-4 right-6 rtl:right-auto rtl:left-6 z-20 px-4 py-2.5 rounded-2xl bg-white/95 backdrop-blur-md shadow-elevated border border-osan-sky/80 flex items-center gap-3" style="--reveal-delay: 220ms;">
                <div class="w-2.5 h-2.5 rounded-full bg-osan-blue animate-pulse shadow-[0_0_8px_rgba(36,115,171,0.6)]"></div>
                <div class="flex flex-col">
                  <span class="text-xs font-normal text-osan-ink">${isAr ? 'حلول أعمال واستثمار متكاملة' : 'Integrated Business Solutions'}</span>
                  <span class="text-[10px] text-osan-grey font-light">${isAr ? 'استشارات مؤسسية موثوقة' : 'Verified Institutional Advisory'}</span>
                </div>
              </div>

            </div>

          </div>

        </div>

        <!-- Centered Video Lightbox Modal -->
        <dialog
          id="solutions-video-dialog"
          class="p-0 bg-transparent rounded-3xl max-w-4xl w-[94vw] sm:w-full backdrop:bg-slate-950/75 backdrop:backdrop-blur-md shadow-2xl overflow-visible focus:outline-none m-auto"
          aria-modal="true"
          aria-label="Corporate Video Showcase"
        >
          <div
            id="solutions-video-dialog-inner"
            class="relative bg-[#061426] rounded-3xl border border-white/20 shadow-2xl overflow-hidden"
          >
            <button
              type="button"
              id="solutions-video-dialog-close"
              class="absolute top-3 right-3 rtl:right-auto rtl:left-3 z-20 w-9 h-9 rounded-full bg-slate-900/80 hover:bg-osan-blue backdrop-blur-md border border-white/25 text-white flex items-center justify-center transition-colors shadow-lg cursor-pointer"
              aria-label="Close video modal"
            >
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>

            <video
              id="solutions-modal-video"
              src="/videos/WhatsApp Video 2026-11-11 at 14.34.32.mp4"
              controls
              playsinline
              preload="metadata"
              class="w-full max-h-[82vh] bg-black object-contain block"
            ></video>
          </div>
        </dialog>

      </section>

      <!-- ======================================================== -->
      <!-- CORPORATE ECOSYSTEM ARCHITECTURAL STAGE                  -->
      <!-- ======================================================== -->
      <section id="ecosystem" class="relative z-10 w-full min-h-screen lg:h-screen flex flex-col justify-center items-center py-8 sm:py-14 lg:py-4 scroll-mt-0 overflow-hidden bg-white border-t border-osan-sky/60">
        
        <div id="hero-logo-switcher-mount" class="reveal-spring-defocus relative z-10 w-full max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-center">
          <!-- HeroLogoSwitcher mounts here -->
        </div>
      </section>
    `;

    this.mountSubcomponents();
    this.bindEvents();
  }

  private getSoundButtonMarkup(): string {
    return this.isSolutionsVideoMuted
      ? `<svg class="w-4 h-4 text-sky-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"/></svg>`
      : `<svg class="w-4 h-4 text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/></svg>`;
  }

  private mountSubcomponents(): void {
    const switcherMount = this.container.querySelector<HTMLElement>('#hero-logo-switcher-mount');
    if (switcherMount) {
      if (this.logoSwitcher) {
        this.logoSwitcher.destroy();
      }
      this.logoSwitcher = new HeroLogoSwitcher();
      switcherMount.appendChild(this.logoSwitcher.getElement());
    }
  }

  private bindEvents(): void {
    this.container.querySelector('#solutions-free-consultation-btn')?.addEventListener('click', (e) => {
      e.preventDefault();
      const contact = document.getElementById('contact');
      if (contact) scrollToElement(contact, 0);
    });

    this.container.querySelector('#solutions-video-sound-btn')?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.isSolutionsVideoMuted = !this.isSolutionsVideoMuted;
      const videoEl = this.container.querySelector<HTMLVideoElement>('#solutions-showcase-video');
      if (videoEl) {
        videoEl.muted = this.isSolutionsVideoMuted;
        if (videoEl.paused) {
          videoEl.play().catch(() => {});
        }
      }
      const btn = this.container.querySelector<HTMLButtonElement>('#solutions-video-sound-btn');
      if (btn) {
        btn.innerHTML = this.getSoundButtonMarkup();
      }
    });

    this.container.querySelector('#solutions-video-card')?.addEventListener('click', () => {
      this.openVideoModal();
    });

    this.container.querySelector('#solutions-video-card')?.addEventListener('keydown', (e) => {
      const ke = e as KeyboardEvent;
      if (ke.key === 'Enter' || ke.key === ' ') {
        ke.preventDefault();
        this.openVideoModal();
      }
    });

    const videoDialog = this.container.querySelector<HTMLDialogElement>('#solutions-video-dialog');
    this.container.querySelector('#solutions-video-dialog-close')?.addEventListener('click', () => {
      this.closeVideoModal();
    });
    videoDialog?.addEventListener('click', (e) => {
      if (e.target === videoDialog) {
        this.closeVideoModal();
      }
    });
    videoDialog?.addEventListener('cancel', (e) => {
      e.preventDefault();
      this.closeVideoModal();
    });

    if (!this.unsubscribeI18n) {
      this.unsubscribeI18n = i18n.onLanguageChange(() => {
        this.render();
      });
    }
  }

  private openVideoModal(): void {
    const dialog = this.container.querySelector<HTMLDialogElement>('#solutions-video-dialog');
    const inner = this.container.querySelector<HTMLElement>('#solutions-video-dialog-inner');
    const previewVideo = this.container.querySelector<HTMLVideoElement>('#solutions-showcase-video');
    const modalVideo = this.container.querySelector<HTMLVideoElement>('#solutions-modal-video');
    if (!dialog || !inner || !modalVideo) return;

    if (previewVideo) {
      modalVideo.currentTime = previewVideo.currentTime;
      previewVideo.pause();
    }

    modalVideo.muted = false;
    dialog.showModal();
    modalVideo.play().catch(() => {});

    animate(inner, {
      opacity: [0, 1],
      scale: [0.92, 1],
      duration: 320,
      ease: 'out(3)',
    });
  }

  private closeVideoModal(): void {
    const dialog = this.container.querySelector<HTMLDialogElement>('#solutions-video-dialog');
    const inner = this.container.querySelector<HTMLElement>('#solutions-video-dialog-inner');
    const previewVideo = this.container.querySelector<HTMLVideoElement>('#solutions-showcase-video');
    const modalVideo = this.container.querySelector<HTMLVideoElement>('#solutions-modal-video');
    if (!dialog || !dialog.open || !inner) return;

    modalVideo?.pause();

    animate(inner, {
      opacity: [1, 0],
      scale: [1, 0.94],
      duration: 220,
      ease: 'in(2)',
      onComplete: () => {
        dialog.close();
        if (previewVideo) {
          previewVideo.play().catch(() => {});
        }
      },
    });
  }

  public destroy(): void {
    if (this.logoSwitcher) {
      this.logoSwitcher.destroy();
      this.logoSwitcher = null;
    }
    if (this.unsubscribeI18n) {
      this.unsubscribeI18n();
      this.unsubscribeI18n = null;
    }
  }
}

