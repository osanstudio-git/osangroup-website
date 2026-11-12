import { i18n } from '../i18n/i18n';
import { animate } from 'animejs';

export interface AssemblyMediaItem {
  id: string;
  type: 'image' | 'video';
  src: string;
  poster?: string;
  badgeEn: string;
  badgeAr: string;
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
  statEn: string;
  statAr: string;
  icon: string;
}

export const ASSEMBLY_MEDIA_ITEMS: AssemblyMediaItem[] = [
  {
    id: 'team-assembly',
    type: 'image',
    src: '/images/enhanced-osbic-group-4k.png',
    badgeEn: 'Corporate Assembly 2024',
    badgeAr: 'الملتقى المؤسسي ٢٠٢٤',
    titleEn: 'Our Unified Team & Annual Assembly',
    titleAr: 'الصورة الجماعية لفريق مجموعة أوسان',
    descEn: '44 dedicated professionals and national leaders uniting cross-sector synergy, shared institutional values, and high ambitions across Oman.',
    descAr: '٤٤ موظفاً وكادراً متخصصاً يمثلون قوة أوسان، يجتمعون بروح الفريق الواحد لتعزيز التكامل المؤسسي ودعم مسيرة التنمية الوطنية.',
    statEn: '44 Professionals',
    statAr: '٤٤ كادراً متخصصاً',
    icon: '👥',
  },
  {
    id: 'assembly-video',
    type: 'video',
    src: '/videos/assembly-video.mp4',
    poster: '/images/enhanced-osbic-group-4k.png',
    badgeEn: 'Live Assembly Reel',
    badgeAr: 'فيلم الملتقى الحي',
    titleEn: 'Cinematic Highlights & Corporate Spirit',
    titleAr: 'لقطات حية من فعاليات وتكريم الملتقى',
    descEn: 'Dynamic video reel capturing the vibrancy, celebration of institutional milestones, strategic summits, and executive excellence of Osan Group.',
    descAr: 'توثيق مرئي حي يلتقط شغف فريق العمل، والاحتفاء بالإنجازات المؤسسية، والملتقيات الاستراتيجية التي تقود المجموعة نحو المستقبل.',
    statEn: '4K Video Reel',
    statAr: 'فيلم حصري عالي الدقة',
    icon: '🎬',
  },
  {
    id: 'strategic-boardroom',
    type: 'image',
    src: '/images/WhatsApp Image 2026-11-10 at 14.49.04.jpeg',
    badgeEn: 'Executive Governance',
    badgeAr: 'القيادة والاستشارات الاستراتيجية',
    titleEn: 'Executive Boardroom & Strategic Alliances',
    titleAr: 'الاجتماعات الاستشارية والشراكات الكبرى',
    descEn: 'High-level boardroom consultations, strategic advisory sessions, and alliance formulations empowering corporate investors and entrepreneurs.',
    descAr: 'جلسات استشارية وتنفيذية على أعلى المستويات ترسم مسار التوسع، وتبرم الشراكات الاستثمارية الواعدة لرواد الأعمال والمستثمرين.',
    statEn: 'Strategic Council',
    statAr: 'مجلس استراتيجي',
    icon: '🏛️',
  },
  {
    id: 'ministry-services',
    type: 'image',
    src: '/images/ministry_services.jpg',
    badgeEn: 'Government Liaison',
    badgeAr: 'الشراكات المؤسسية والحكومية',
    titleEn: 'Institutional & Government Clearance Alliances',
    titleAr: 'قنوات الربط المؤسسي والخدمات الحكومية',
    descEn: 'Accredited institutional channels facilitating regulatory compliance, corporate licensing, labor affairs, and legal clearance in the Sultanate.',
    descAr: 'قنوات ربط مؤسسية معتمدة تدعم رواد الأعمال وتسرع إنجاز التراخيص والمعاملات القانونية والتنظيمية في سلطنة عُمان.',
    statEn: 'Institutional Trust',
    statAr: 'ثقة واعتماد مؤسسي',
    icon: '📑',
  },
];

export class AssemblyMediaShuffler {
  private container: HTMLElement;
  private currentIndex: number = 0;
  private autoPlayTimer: number | null = null;
  private isVideoMuted: boolean = true;
  private isVideoPlaying: boolean = true;
  private touchStartX: number = 0;
  private touchEndX: number = 0;
  private isShuffling: boolean = false;
  private readonly AUTO_CYCLE_DURATION: number = 5000; // 5 seconds per slide

  constructor() {
    this.container = document.createElement('div');
    this.container.className = 'w-full relative';
    this.render();
    this.bindEvents();
    this.startAutoCycle();
  }

  public getElement(): HTMLElement {
    return this.container;
  }

  private render(): void {
    const isAr = i18n.isRTL();
    const currentItem = ASSEMBLY_MEDIA_ITEMS[this.currentIndex];

    // Compute order of items for the 3D shuffling deck (items after currentIndex)
    const deckItems: { item: AssemblyMediaItem; relativeIndex: number }[] = [];
    for (let i = 1; i < ASSEMBLY_MEDIA_ITEMS.length; i++) {
      const idx = (this.currentIndex + i) % ASSEMBLY_MEDIA_ITEMS.length;
      deckItems.push({
        item: ASSEMBLY_MEDIA_ITEMS[idx],
        relativeIndex: i - 1, // 0 = next, 1 = after next, 2 = farthest
      });
    }

    this.container.innerHTML = `
      <div class="relative w-full rounded-[28px] sm:rounded-[36px] bg-gradient-to-b from-[#FAFBFD] via-[#F2F6FA] to-white p-3 sm:p-5 lg:p-6 border border-osan-sky/90 shadow-elevated overflow-hidden select-none">
        
        <!-- Ambient Radial Backlight Auras -->
        <div class="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-osan-blue/10 blur-3xl pointer-events-none"></div>
        <div class="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-sky-400/10 blur-3xl pointer-events-none"></div>

        <!-- ======================================================== -->
        <!-- MAIN DUAL STAGE: ACTIVE CINEMA (7 COLS) + 3D DECK (5 COLS) -->
        <!-- ======================================================== -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-stretch relative z-10">
          
          <!-- LEFT / MAIN VIEWPORT (7 Cols on desktop) -->
          <div class="lg:col-span-7 flex flex-col">
            <div 
              id="main-stage-wrapper"
              class="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-900 border border-osan-sky/90 shadow-xl group h-[380px] sm:h-[430px] lg:h-[460px] flex items-center justify-center"
            >
              
              ${
                currentItem.type === 'video'
                  ? `
                <!-- HTML5 Autoplay Video Reel -->
                <video
                  id="stage-video-element"
                  src="${currentItem.src}"
                  poster="${currentItem.poster || ''}"
                  autoplay
                  ${this.isVideoMuted ? 'muted' : ''}
                  loop
                  playsinline
                  class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
                ></video>

                <!-- Video Ambient Glow Vignette -->
                <div class="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/20 to-transparent pointer-events-none"></div>

                <!-- Live Reel Indicator Badge (Top-Left) -->
                <div class="absolute top-4 left-4 rtl:left-auto rtl:right-4 z-20 flex items-center gap-2 pointer-events-none">
                  <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600/90 backdrop-blur-md text-white text-[11px] font-bold shadow-md tracking-wider uppercase">
                    <span class="w-2 h-2 rounded-full bg-white animate-ping"></span>
                    <span>${isAr ? 'فيلم الملتقى الحي' : 'LIVE REEL'}</span>
                  </span>
                  <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-sky-300 text-[11px] font-semibold border border-white/10">
                    <span>${currentItem.statEn}</span>
                  </span>
                </div>

                <!-- Video Custom Floating Controls Overlay (Bottom-Right) -->
                <div class="absolute top-4 right-4 rtl:right-auto rtl:left-4 z-20 flex items-center gap-2">
                  
                  <!-- Sound Toggle Button -->
                  <button
                    type="button"
                    id="video-sound-toggle-btn"
                    class="px-3 py-1.5 rounded-full bg-slate-900/85 hover:bg-osan-blue backdrop-blur-md border border-white/20 text-white text-xs font-semibold flex items-center gap-2 transition-all shadow-md cursor-pointer"
                    title="${this.isVideoMuted ? 'Unmute Sound' : 'Mute Sound'}"
                  >
                    ${
                      this.isVideoMuted
                        ? `<svg class="w-3.5 h-3.5 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"/></svg>
                           <span>${isAr ? 'تشغيل الصوت' : 'Unmute'}</span>`
                        : `<span class="inline-flex items-end gap-0.5 h-3">
                             <span class="w-0.5 h-2 bg-sky-400 animate-pulse"></span>
                             <span class="w-0.5 h-3 bg-sky-300 animate-pulse"></span>
                             <span class="w-0.5 h-1.5 bg-sky-400 animate-pulse"></span>
                           </span>
                           <span>${isAr ? 'كتم الصوت' : 'Muted'}</span>`
                    }
                  </button>

                  <!-- Play / Pause Toggle Button -->
                  <button
                    type="button"
                    id="video-play-toggle-btn"
                    class="w-8 h-8 rounded-full bg-slate-900/85 hover:bg-osan-blue backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all shadow-md cursor-pointer"
                    title="${this.isVideoPlaying ? 'Pause Video' : 'Play Video'}"
                  >
                    ${
                      this.isVideoPlaying
                        ? `<svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`
                        : `<svg class="w-3.5 h-3.5 ml-0.5 rtl:mr-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>`
                    }
                  </button>

                </div>
              `
                  : `
                <!-- High-Resolution Featured Image -->
                <img
                  src="${currentItem.src}"
                  alt="${isAr ? currentItem.titleAr : currentItem.titleEn}"
                  class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />

                <!-- Atmospheric Vignette -->
                <div class="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent pointer-events-none"></div>

                <!-- Top Badge Chip -->
                <div class="absolute top-4 left-4 rtl:left-auto rtl:right-4 z-20 flex items-center gap-2 pointer-events-none">
                  <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/85 backdrop-blur-md border border-white/20 text-white text-[11px] font-semibold shadow-md">
                    <span>${currentItem.icon}</span>
                    <span>${isAr ? currentItem.badgeAr : currentItem.badgeEn}</span>
                  </span>
                  <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-osan-blue/90 backdrop-blur-md text-white text-[11px] font-bold shadow-sm">
                    <span>${isAr ? currentItem.statAr : currentItem.statEn}</span>
                  </span>
                </div>
              `
              }

              <!-- Bottom Glassmorphic Caption Card -->
              <div class="absolute bottom-3 inset-x-3 sm:bottom-4 sm:inset-x-4 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#0B1E36]/90 backdrop-blur-xl border border-sky-400/25 text-white z-20 shadow-2xl">
                <div class="flex items-center justify-between gap-3 mb-1">
                  <h4 class="text-base sm:text-lg lg:text-xl font-heading font-bold text-white tracking-tight">
                    ${isAr ? currentItem.titleAr : currentItem.titleEn}
                  </h4>
                  <span class="text-xs text-sky-300 font-semibold shrink-0">
                    ${isAr ? currentItem.statAr : currentItem.statEn}
                  </span>
                </div>
                <p class="text-xs sm:text-[13px] text-sky-100/85 leading-relaxed font-light line-clamp-2">
                  ${isAr ? currentItem.descAr : currentItem.descEn}
                </p>
              </div>

            </div>
          </div>

          <!-- RIGHT / 3D SHUFFLING CARD DECK (5 Cols on desktop) -->
          <div class="lg:col-span-5 flex flex-col justify-center">

            <!-- 3D Stack Container (with Perspective) -->
            <div 
              id="shuffler-stack-container" 
              class="relative w-full h-[340px] sm:h-[380px] lg:h-[420px] flex items-center justify-center cursor-pointer group"
              style="perspective: 1200px;"
            >
              ${deckItems.map((entry, stackIdx) => {
                const item = entry.item;
                // Layering styles for 3D stacking
                const zIndex = 30 - stackIdx * 10;
                const translateY = stackIdx * 18;
                const scale = 1 - stackIdx * 0.05;
                const opacity = 1 - stackIdx * 0.18;
                const isTopCard = stackIdx === 0;

                return `
                  <div
                    class="deck-card-item absolute inset-x-2 top-4 h-[280px] sm:h-[310px] lg:h-[340px] rounded-2xl overflow-hidden border border-white/80 shadow-2xl transition-all duration-500 ease-out select-none bg-slate-900 group/card ${
                      isTopCard ? 'hover:-translate-y-2 ring-2 ring-osan-blue/40' : ''
                    }"
                    data-deck-index="${stackIdx}"
                    data-item-id="${item.id}"
                    style="
                      z-index: ${zIndex};
                      transform: translateY(${translateY}px) scale(${scale});
                      opacity: ${opacity};
                    "
                  >
                    <!-- Background Thumbnail Media -->
                    ${
                      item.type === 'video'
                        ? `
                      <img
                        src="${item.poster || '/images/enhanced-osbic-group-4k.png'}"
                        alt="${item.titleEn}"
                        class="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-105"
                      />
                      <div class="absolute inset-0 bg-slate-950/40 flex items-center justify-center">
                        <div class="w-12 h-12 rounded-full bg-osan-blue/90 text-white flex items-center justify-center shadow-elevated border-2 border-white/40 group-hover/card:scale-110 transition-transform">
                          <svg class="w-5 h-5 ml-0.5 rtl:mr-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                        </div>
                      </div>
                    `
                        : `
                      <img
                        src="${item.src}"
                        alt="${item.titleEn}"
                        class="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-105"
                      />
                    `
                    }

                    <!-- Dark Gradient Overlay -->
                    <div class="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent"></div>

                    <!-- Card Header Badge -->
                    <div class="absolute top-3 inset-x-3 flex items-center justify-between text-white text-[11px] z-10">
                      <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/15 font-semibold">
                        <span>${item.icon}</span>
                        <span>${isAr ? item.badgeAr : item.badgeEn}</span>
                      </span>
                      <span class="px-2 py-0.5 rounded-md bg-white/20 backdrop-blur-md text-[10px] font-bold">
                        ${isTopCard ? (isAr ? 'التالي ⏎' : 'NEXT ⏎') : `#${stackIdx + 2}`}
                      </span>
                    </div>

                    <!-- Card Bottom Info -->
                    <div class="absolute bottom-3 inset-x-3 z-10 text-white">
                      <h5 class="text-sm sm:text-base font-heading font-bold text-white tracking-tight line-clamp-1 group-hover/card:text-sky-300 transition-colors">
                        ${isAr ? item.titleAr : item.titleEn}
                      </h5>
                      <p class="text-[11px] text-sky-200/80 line-clamp-1 mt-0.5">
                        ${isAr ? item.statAr : item.statEn}
                      </p>
                    </div>

                    <!-- Hover Shuffle Cue for Top Card -->
                    ${
                      isTopCard
                        ? `
                      <div class="absolute inset-0 bg-osan-blue/15 opacity-0 group-hover/card:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                        <div class="px-3.5 py-1.5 rounded-full bg-white text-osan-blue font-bold text-xs shadow-lg flex items-center gap-1.5">
                          <span>${isAr ? 'انقر للتبديل 🔀' : 'Click to Shuffle 🔀'}</span>
                        </div>
                      </div>
                    `
                        : ''
                    }

                  </div>
                `;
              }).join('')}
            </div>

          </div>

        </div>

      </div>
    `;
  }

  private bindEvents(): void {
    // 1. Deck Card Click Handlers
    const stackCards = this.container.querySelectorAll<HTMLElement>('.deck-card-item');
    stackCards.forEach((card) => {
      card.addEventListener('click', (e) => {
        e.stopPropagation();
        const itemId = card.getAttribute('data-item-id');
        if (itemId) {
          const targetIdx = ASSEMBLY_MEDIA_ITEMS.findIndex((m) => m.id === itemId);
          if (targetIdx !== -1) {
            this.jumpToIndex(targetIdx);
          }
        } else {
          this.shuffleNext();
        }
      });
    });

    // 2. Video Sound & Play Controls
    this.container.querySelector('#video-sound-toggle-btn')?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggleVideoSound();
    });

    this.container.querySelector('#video-play-toggle-btn')?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggleVideoPlay();
    });

    // 3. Touch Swipe on Mobile for the 3D Deck
    const stackContainer = this.container.querySelector('#shuffler-stack-container');
    stackContainer?.addEventListener('touchstart', (e: any) => {
      if (e.touches && e.touches[0]) {
        this.touchStartX = e.touches[0].clientX;
      }
    }, { passive: true });

    stackContainer?.addEventListener('touchend', (e: any) => {
      if (e.changedTouches && e.changedTouches[0]) {
        this.touchEndX = e.changedTouches[0].clientX;
        this.handleTouchSwipe();
      }
    }, { passive: true });

    // 4. Pause Autoplay on Hover so user can inspect or watch comfortably
    const mainStage = this.container.querySelector('#main-stage-wrapper');
    mainStage?.addEventListener('mouseenter', () => {
      this.pauseAutoCycle();
    });
    mainStage?.addEventListener('mouseleave', () => {
      this.startAutoCycle();
    });
  }

  private handleTouchSwipe(): void {
    const diff = this.touchStartX - this.touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        // Swiped Left
        this.shuffleNext();
      } else {
        // Swiped Right
        this.shufflePrev();
      }
    }
  }

  public shuffleNext(): void {
    if (this.isShuffling) return;
    this.isShuffling = true;

    // Trigger visual card throw-out animation on top card before advancing
    const topCard = this.container.querySelector<HTMLElement>('.deck-card-item[data-deck-index="0"]');
    if (topCard) {
      animate(topCard, {
        translateX: i18n.isRTL() ? -120 : 120,
        translateY: -30,
        rotate: i18n.isRTL() ? -12 : 12,
        opacity: 0,
        duration: 320,
        ease: 'inOutQuad',
        onComplete: () => {
          this.currentIndex = (this.currentIndex + 1) % ASSEMBLY_MEDIA_ITEMS.length;
          this.render();
          this.bindEvents();
          this.animateStageEntrance();
          this.isShuffling = false;
        },
      });
    } else {
      this.currentIndex = (this.currentIndex + 1) % ASSEMBLY_MEDIA_ITEMS.length;
      this.render();
      this.bindEvents();
      this.animateStageEntrance();
      this.isShuffling = false;
    }
  }

  public shufflePrev(): void {
    if (this.isShuffling) return;
    this.isShuffling = true;

    this.currentIndex = (this.currentIndex - 1 + ASSEMBLY_MEDIA_ITEMS.length) % ASSEMBLY_MEDIA_ITEMS.length;
    this.render();
    this.bindEvents();
    this.animateStageEntrance();
    this.isShuffling = false;
  }

  public jumpToIndex(index: number): void {
    if (index === this.currentIndex || this.isShuffling) return;
    this.currentIndex = index;
    this.render();
    this.bindEvents();
    this.animateStageEntrance();
  }

  private animateStageEntrance(): void {
    const mainStage = this.container.querySelector('#main-stage-wrapper');
    if (mainStage) {
      animate(mainStage, {
        opacity: [0.6, 1],
        scale: [0.98, 1],
        duration: 450,
        ease: 'out(3)',
      });
    }

    // If active item is video, auto-start playback
    const current = ASSEMBLY_MEDIA_ITEMS[this.currentIndex];
    if (current.type === 'video') {
      const videoEl = this.container.querySelector<HTMLVideoElement>('#stage-video-element');
      if (videoEl) {
        videoEl.muted = this.isVideoMuted;
        videoEl.play().catch(() => {});
      }
    }
  }

  private toggleVideoSound(): void {
    this.isVideoMuted = !this.isVideoMuted;
    const videoEl = this.container.querySelector<HTMLVideoElement>('#stage-video-element');
    if (videoEl) {
      videoEl.muted = this.isVideoMuted;
    }
    this.render();
    this.bindEvents();
  }

  private toggleVideoPlay(): void {
    const videoEl = this.container.querySelector<HTMLVideoElement>('#stage-video-element');
    if (videoEl) {
      if (videoEl.paused) {
        videoEl.play();
        this.isVideoPlaying = true;
      } else {
        videoEl.pause();
        this.isVideoPlaying = false;
      }
      this.render();
      this.bindEvents();
    }
  }

  private startAutoCycle(): void {
    this.pauseAutoCycle();
    this.autoPlayTimer = window.setInterval(() => {
      this.shuffleNext();
    }, this.AUTO_CYCLE_DURATION);
  }

  private pauseAutoCycle(): void {
    if (this.autoPlayTimer) {
      clearInterval(this.autoPlayTimer);
      this.autoPlayTimer = null;
    }
  }

  public destroy(): void {
    this.pauseAutoCycle();
  }
}

