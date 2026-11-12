import { createLayout, animate } from 'animejs';
import { i18n } from '../i18n/i18n';
import { scrollToElement } from '../utils/lenis';

export interface CompanyLogoItem {
  id: string;
  nameEn: string;
  nameAr: string;
  sectorEn: string;
  sectorAr: string;
  taglineEn: string;
  taglineAr: string;
  logo: string;
  accentColor: string;
  isParent?: boolean;
}

export const HERO_COMPANIES: CompanyLogoItem[] = [
  {
    id: 'osan-group',
    nameEn: 'OSAN GROUP',
    nameAr: 'مجموعة أوسان',
    sectorEn: 'Parent Corporate Conglomerate',
    sectorAr: 'المجموعة القابضة الرئيسية',
    taglineEn: 'Empowering Enterprise. Accelerating Investment. Driving Oman’s Tomorrow.',
    taglineAr: 'منظومة متكاملة من الخدمات والحلول المبتكرة لدعم الأعمال والاستثمار.',
    logo: '/logos/osan-logo.png',
    accentColor: '#2473AB',
    isParent: true,
  },
  {
    id: 'osbic',
    nameEn: 'OSBIC International',
    nameAr: 'أوسبك العالمية',
    sectorEn: 'Business Setup & Government Liaison',
    sectorAr: 'تأسيس الأعمال والخدمات المؤسسية',
    taglineEn: 'Your Premier Corporate Gateway to GCC Business Expansion Since 2011.',
    taglineAr: 'بوابتكم الرائدة لتأسيس الأعمال والتوسع التجاري في دول الخليج.',
    logo: '/logos/OSBIC.png',
    accentColor: '#2A93D5',
  },
  {
    id: 'maisarah',
    nameEn: 'Maisarah Auditing',
    nameAr: 'ميسرة للاستشارات المالية والتدقيق',
    sectorEn: 'Auditing, Tax & Financial Advisory',
    sectorAr: 'التدقيق والضرائب والاستشارات المالية',
    taglineEn: 'Financial Precision, Regulatory Clarity, and Sustainable Growth.',
    taglineAr: 'دقة مالية، وامتثال قانوني، ونمو اقتصادي مستدام.',
    logo: '/logos/MAISARAH.png',
    accentColor: '#8F1D38',
  },
  {
    id: 'nameer',
    nameEn: 'Nameer Properties',
    nameAr: 'نمير للعقارات',
    sectorEn: 'Real Estate Management & Brokerage',
    sectorAr: 'التطوير والتسويق والإدارة العقارية',
    taglineEn: 'Full-Spectrum Real Estate Management, Brokerage & Investment.',
    taglineAr: 'إدارة وتطوير واستثمار عقاري وفق أعلى المعايير.',
    logo: '/logos/NAMEER -1.png',
    accentColor: '#0E544A',
  },
  {
    id: 'misk',
    nameEn: 'MUSK Business Center',
    nameAr: 'مركز مسك للأعمال',
    sectorEn: 'Serviced Offices & Coworking',
    sectorAr: 'مساحات العمل المشتركة والمكاتب المؤثثة',
    taglineEn: 'Modern, Flexible & Connected Workspaces in Muscat (Ghala).',
    taglineAr: 'بيئات عمل حديثة ومكاتب مجهزة لدعم الشركات ورواد الأعمال.',
    logo: '/logos/MUSK.png',
    accentColor: '#514E45',
  },
  {
    id: 'asas',
    nameEn: 'ASAS Services Center',
    nameAr: 'مركز أساس للخدمات',
    sectorEn: 'Government Liaison & Legal Advisory',
    sectorAr: 'مركز تخليص المعاملات والاستشارات الإدارية',
    taglineEn: 'Strategic Knowledge Hub & Regulatory Clearance in Ghala.',
    taglineAr: 'مركز معرفي يقدم استشارات قانونية وإدارية ومواكبة للاكتتابات.',
    logo: '/logos/ASAS.png',
    accentColor: '#A88836',
  },
  {
    id: 'masar',
    nameEn: 'Masar Services Center',
    nameAr: 'مركز مسار للخدمات',
    sectorEn: 'Corporate Tax Records & Compliance',
    sectorAr: 'إدارة الملفات الضريبية والامتثال القانوني',
    taglineEn: 'Guaranteed adherence to Omani corporate tax legislation in Al Mawaleh.',
    taglineAr: 'شريك موثوق لإدارة الملفات الضريبية وتجنب الغرامات المالية.',
    logo: '/logos/MASAR.jpeg',
    accentColor: '#0095A8',
  },
  {
    id: 'amer',
    nameEn: 'Amer Service Center',
    nameAr: 'مركز آمر للخدمات',
    sectorEn: 'Administrative Clearance & Launch',
    sectorAr: 'الخدمات الإدارية وتعقيب المعاملات وتأسيس المشاريع',
    taglineEn: 'Fast-track corporate administrative follow-ups in Ruwi.',
    taglineAr: 'الوجهة الموثوقة لمن يرغب في بدء مشروع تجاري في قلب روي.',
    logo: '/logos/AMER.png',
    accentColor: '#1E293B',
  },
  {
    id: 'tamkeen',
    nameEn: 'Tamkeen Services Center',
    nameAr: 'مركز تمكين للخدمات',
    sectorEn: 'Comprehensive Single-Window Center',
    sectorAr: 'نافذة شاملة لإنجاز المعاملات والتراخيص',
    taglineEn: 'Labour affairs, commercial registers & municipal permits in Al Khuwair.',
    taglineAr: 'إنجاز المعاملات اليومية والسجلات التجارية والتراخيص المهنية.',
    logo: '/logos/TAMKEEN.png',
    accentColor: '#234338',
  },
  {
    id: 'omca',
    nameEn: 'OMCA Coffee',
    nameAr: 'أومكا كافيه',
    sectorEn: 'F&B Specialty Hospitality',
    sectorAr: 'قطاع الضيافة والمقاهي المختصة',
    taglineEn: 'Specialty Coffee Culture & Exceptional Social Spaces (LLC 1540400).',
    taglineAr: 'ثقافة القهوة المختصة ومساحات اجتماعية فريدة.',
    logo: '/logos/OMCA.jpeg',
    accentColor: '#6F182A',
  },
  {
    id: 'osan-studio',
    nameEn: 'Osan Studio',
    nameAr: 'أوسان استوديو',
    sectorEn: 'Creative Media & Brand Strategy',
    sectorAr: 'التسويق الاستراتيجي والإنتاج الإعلامي',
    taglineEn: 'Your marketing ideas begin here... Strategies so your name connects right.',
    taglineAr: 'أفكارك التسويقية تبدأ من هنا... نخطط وتنفذ استراتيجيات تخلي اسمك يوصل صح.',
    logo: '/logos/OSAN STUDIO -1.png',
    accentColor: '#2E4960',
  },
];

export class HeroLogoSwitcher {
  private container: HTMLElement;
  private gridEl: HTMLElement | null = null;
  private companiesOrder: CompanyLogoItem[] = [];
  private cardElementsMap: Map<string, HTMLElement> = new Map();
  private autoCycleTimer: number | null = null;
  private layoutLockTimer: number | null = null;
  private resizeTimer: number | null = null;
  private isAutoPlaying: boolean = true;
  private isInViewport: boolean = true;
  private isLayoutUpdating: boolean = false;
  private animeLayout: any = null;
  private viewportObserver: IntersectionObserver | null = null;
  private resizeHandler: (() => void) | null = null;
  private unsubscribeI18n: (() => void) | null = null;

  constructor() {
    this.container = document.createElement('div');
    this.container.className = 'w-full max-w-7xl mx-auto';
    // Initialize companies order with Maisarah or Osan Group as prime hero
    this.companiesOrder = [...HERO_COMPANIES];
    
    // Put Maisarah at index 0 initially for a vivid starting demonstration
    const startHeroId = 'maisarah';
    const initIdx = this.companiesOrder.findIndex((c) => c.id === startHeroId);
    if (initIdx > 0) {
      const [item] = this.companiesOrder.splice(initIdx, 1);
      this.companiesOrder.unshift(item);
    }

    this.render();
    this.initLayoutAnimation();
    this.initViewportObserver();
    this.initResizeHandler();
    this.startAutoCycle();

    this.unsubscribeI18n = i18n.onLanguageChange(() => {
      this.render();
      this.initLayoutAnimation();
    });
  }

  public getElement(): HTMLElement {
    return this.container;
  }

  private render(): void {
    const isAr = i18n.isRTL();
    const heroCompany = this.companiesOrder[0] || HERO_COMPANIES[0];
    this.cardElementsMap.clear();

    this.container.innerHTML = `
      <!-- Prism Architectural Rim Frame -->
      <div 
        id="ecosystem-prism-frame"
        class="relative p-[1.5px] rounded-[22px] sm:rounded-[34px] w-full max-w-[1380px] mx-auto shadow-[0_28px_75px_-18px_rgba(9,28,52,0.38)] transition-all duration-700"
        style="background: linear-gradient(135deg, ${heroCompany.accentColor}88 0%, rgba(255,255,255,0.28) 48%, rgba(56,189,248,0.5) 100%);"
      >
        <div 
          id="ecosystem-glass-stage"
          class="backdrop-blur-2xl p-3 sm:p-5 lg:p-6 rounded-[20.5px] sm:rounded-[32.5px] relative overflow-hidden w-full shadow-inner"
          style="background: linear-gradient(135deg, #05101F 0%, #091C34 50%, #0D2748 100%);"
        >
          <!-- Animated Architectural Dot-Matrix & Aurora Mesh Inside Deep-Blue Card Stage -->
          <div 
            class="ecosystem-vault-dots absolute inset-0 pointer-events-none z-0"
            style="mask-image: radial-gradient(ellipse 85% 80% at 50% 50%, #000 55%, transparent 100%); -webkit-mask-image: radial-gradient(ellipse 85% 80% at 50% 50%, #000 55%, transparent 100%);"
          ></div>
          <div 
            id="ecosystem-vault-orb-a"
            class="ecosystem-vault-orb-a absolute -top-24 -left-16 w-80 h-80 sm:w-[420px] sm:h-[420px] rounded-full blur-[85px] pointer-events-none z-0 transition-colors duration-1000"
            style="background-color: ${heroCompany.accentColor}40;"
          ></div>
          <div 
            class="ecosystem-vault-orb-b absolute -bottom-24 -right-16 w-80 h-80 sm:w-[420px] sm:h-[420px] rounded-full blur-[90px] pointer-events-none z-0"
            style="background-color: rgba(56, 189, 248, 0.24);"
          ></div>
          <div class="ecosystem-vault-sweep absolute inset-y-0 w-1/2 pointer-events-none z-0"></div>

          <!-- Cursor-Reactive Subtle Spotlight Layer -->
          <div 
            id="ecosystem-cursor-spotlight"
            class="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-300 z-0"
          ></div>

          <!-- Top Title & Minimal Brand-Color Accent Indicator (No extra text) -->
          <div class="relative z-10 flex items-center justify-between gap-2.5 sm:gap-4 pb-2 sm:pb-3 border-b border-white/15 mb-2.5 sm:mb-4">
            <div class="flex items-center gap-2 sm:gap-2.5 min-w-0">
              <span 
                id="ecosystem-active-dot"
                class="w-2.5 h-2.5 rounded-full flex-shrink-0 transition-colors duration-500 border border-white/40"
                style="background-color: ${heroCompany.accentColor}; box-shadow: 0 0 12px rgba(255, 255, 255, 0.45);"
              ></span>
              <h3 class="text-xs sm:text-sm md:text-[15px] font-heading font-normal text-white tracking-wider uppercase truncate">
                ${isAr ? 'أوسان - مجموعة الشركات' : 'OSAN - GROUP OF COMPANIES'}
              </h3>
            </div>

            <!-- Pure Visual Accent Dots (Color-matched progress dots, zero text) -->
            <div class="flex items-center gap-1 sm:gap-1.5 flex-shrink-0" aria-hidden="true">
              ${HERO_COMPANIES.slice(0, 5).map((c) => `
                <span 
                  class="ecosystem-visual-pip h-1.5 rounded-full transition-all duration-500 ${c.id === heroCompany.id ? 'w-5 opacity-100' : 'w-1.5 opacity-40'}"
                  data-pip-id="${c.id}"
                  style="background-color: ${c.id === heroCompany.id ? '#38BDF8' : 'rgba(255, 255, 255, 0.45)'};"
                ></span>
              `).join('')}
            </div>
          </div>

          <!-- Unified Asymmetric Bento Grid (Persistent Root for Anime.js v4) -->
          <!-- 2 cols on mobile/tablet, 4 cols on laptop/desktop = zero orphan gaps -->
          <div 
            id="anime-logo-grid" 
            class="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3.5 lg:gap-4 items-stretch"
          >
            <!-- Individual company cards will be injected & reordered here -->
          </div>

        </div>
      </div>
    `;

    this.gridEl = this.container.querySelector<HTMLElement>('#anime-logo-grid');
    this.createAndMountCards();
    this.bindControls();
    this.syncStageAura(heroCompany);
  }

  /**
   * Instantiates all 11 company card DOM elements once, stores them in cardElementsMap,
   * configures their slot-based layout roles, and appends them into the grid.
   */
  private createAndMountCards(): void {
    const grid = this.gridEl;
    if (!grid) return;
    grid.innerHTML = '';
    const isAr = i18n.isRTL();

    this.companiesOrder.forEach((company, slotIndex) => {
      let cardEl = this.cardElementsMap.get(company.id);
      if (!cardEl) {
        cardEl = document.createElement('div');
        cardEl.setAttribute('data-layout-id', `bento-card-${company.id}`);
        cardEl.setAttribute('data-company-id', company.id);
        
        // Click on any card to promote it to Slot 0 (Hero)
        cardEl.addEventListener('click', () => {
          this.promoteToHero(company.id);
        });

        this.cardElementsMap.set(company.id, cardEl);
      }

      this.updateCardContentAndClasses(cardEl, company, slotIndex, isAr);
      grid.appendChild(cardEl);
    });
  }

  /**
   * Applies the exact Bento sizing, styling, and inner markup based on the card's current slot index:
   * - Slot 0: Prime Hero Card (2 cols × 2 rows)
   * - Slot 1 & 6: Wide Landscape Banners (2 cols × 1 row)
   * - Slots 2, 3, 4, 5, 7, 8, 9, 10: Compact Squircle Cubes (1 col × 1 row)
   */
  private updateCardContentAndClasses(
    cardEl: HTMLElement,
    company: CompanyLogoItem,
    slotIndex: number,
    isAr: boolean
  ): void {
    const hasSolidLogo = ['osbic', 'osan-studio', 'masar', 'omca'].includes(company.id);
    const isAmer = company.id === 'amer';

    // Amer: Charcoal touch, others: deeper opaque brand gradients so dot-matrix background stays cleanly behind cards
    const amerHeroBg = 'linear-gradient(135deg, rgba(15, 23, 42, 0.34) 0%, rgba(15, 23, 42, 0.22) 50%, rgba(30, 41, 59, 0.42) 100%), linear-gradient(135deg, #F6FAFF 0%, #EDF2F8 100%)';
    const amerBannerBg = 'linear-gradient(135deg, rgba(15, 23, 42, 0.28) 0%, rgba(15, 23, 42, 0.18) 50%, rgba(30, 41, 59, 0.34) 100%), linear-gradient(135deg, #F7FAFF 0%, #EFF4FA 100%)';
    const amerCubeBg = 'linear-gradient(145deg, rgba(15, 23, 42, 0.24) 0%, rgba(15, 23, 42, 0.16) 50%, rgba(30, 41, 59, 0.30) 100%), linear-gradient(145deg, #F7FAFF 0%, #EFF4FA 100%)';

    const cardBg = isAmer
      ? (slotIndex === 0 ? amerHeroBg : (slotIndex === 1 || slotIndex === 6 ? amerBannerBg : amerCubeBg))
      : (slotIndex === 0 
          ? `linear-gradient(135deg, ${company.accentColor}5E 0%, ${company.accentColor}38 48%, ${company.accentColor}78 100%), linear-gradient(135deg, #F6FAFF 0%, #EEF4FC 100%)`
          : (slotIndex === 1 || slotIndex === 6
              ? `linear-gradient(135deg, ${company.accentColor}4F 0%, ${company.accentColor}30 50%, ${company.accentColor}63 100%), linear-gradient(135deg, #F7FAFF 0%, #F0F5FC 100%)`
              : `linear-gradient(145deg, ${company.accentColor}47 0%, ${company.accentColor}2B 50%, ${company.accentColor}59 100%), linear-gradient(145deg, #F7FAFF 0%, #EFF5FC 100%)`));

    const cardBorderColor = isAmer
      ? 'rgba(51, 65, 85, 0.62)'
      : (slotIndex === 0 ? `${company.accentColor}96` : (slotIndex === 1 || slotIndex === 6 ? `${company.accentColor}84` : `${company.accentColor}7A`));

    const subtitleColor = isAmer ? '#1E293B' : company.accentColor;
    const bloomColor = isAmer ? '#334155' : company.accentColor;

    if (slotIndex === 0) {
      // ========================================================
      // 1. PRIME HERO CARD (Col Span 2, Row Span 2 on lg+)
      // Light Glassmorphism with Radiant Ambient Blooms
      // ========================================================
      cardEl.className = `bento-item shine-card cursor-pointer group relative col-span-2 row-span-1 lg:row-span-2 min-h-[140px] sm:min-h-[190px] lg:min-h-[256px] lg:max-h-[268px] p-3.5 sm:p-5 lg:p-6 rounded-[18px] sm:rounded-[26px] overflow-hidden transition-shadow duration-300 select-none shadow-elevated flex flex-col justify-center`;
      cardEl.style.background = cardBg;
      cardEl.style.borderColor = cardBorderColor;
      cardEl.style.borderWidth = '2px';
      cardEl.style.borderStyle = 'solid';
      cardEl.style.boxShadow = isAmer
        ? '0 16px 36px -10px rgba(0, 0, 0, 0.15), 0 4px 12px rgba(0,0,0,0.04)'
        : `0 16px 36px -10px ${company.accentColor}50, 0 4px 12px rgba(0,0,0,0.04)`;

      cardEl.innerHTML = `
        <!-- Radiant Ambient Logo Accent Blooms -->
        <div 
          class="absolute -top-12 -right-12 rtl:-right-auto rtl:-left-12 w-48 h-48 rounded-full opacity-45 blur-3xl pointer-events-none transition-all duration-700 group-hover:scale-125"
          style="background-color: ${bloomColor};"
        ></div>
        <div 
          class="absolute -bottom-12 -left-12 rtl:-left-auto rtl:-right-12 w-40 h-40 rounded-full opacity-35 blur-3xl pointer-events-none transition-all duration-700"
          style="background-color: ${bloomColor};"
        ></div>

        <!-- Specular High-Gloss Diagonal Glass Sheen -->
        <div class="absolute inset-0 bg-gradient-to-tr from-white/10 via-white/50 to-transparent pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>

        <!-- Foreground Snug Content -->
        <div class="relative z-10 flex flex-col justify-center min-w-0">
          <!-- Curvy Fitted Logo Badge & Title Header -->
          <div class="flex items-center gap-3 sm:gap-4 mb-2 sm:mb-2.5 min-w-0">
            ${
              hasSolidLogo
                ? `
              <div class="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-xl sm:rounded-2xl overflow-hidden flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300 shadow-sm border border-black/5">
                <img 
                  src="${company.logo}" 
                  alt="${company.nameEn}" 
                  class="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            `
                : `
              <div class="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 p-1.5 rounded-xl sm:rounded-2xl bg-white border border-white/90 shadow-sm flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300 overflow-hidden">
                <img 
                  src="${company.logo}" 
                  alt="${company.nameEn}" 
                  class="w-full h-full object-contain filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.12)]"
                  loading="lazy"
                />
              </div>
            `
            }
            <div class="min-w-0 flex-1">
              <h4 class="text-base sm:text-2xl lg:text-[1.7rem] font-heading font-medium text-osan-ink tracking-tight truncate">
                ${isAr ? company.nameAr : company.nameEn}
              </h4>
              <p class="text-[11px] sm:text-sm font-normal tracking-wide mt-0.5 truncate" style="color: ${subtitleColor}; filter: ${isAmer ? 'none' : 'brightness(0.75)'};">
                ${isAr ? company.sectorAr : company.sectorEn}
              </p>
            </div>
          </div>

          <!-- Description / Tagline (Slim Typography) -->
          <p class="text-[11.5px] sm:text-[13px] text-osan-grey font-light leading-relaxed max-w-xl line-clamp-2 mt-0.5 sm:mt-1">
            ${isAr ? company.taglineAr : company.taglineEn}
          </p>
        </div>
      `;
    } else if (slotIndex === 1 || slotIndex === 6) {
      // ========================================================
      // 2. WIDE LANDSCAPE BANNER CARDS (Col Span 2, Row Span 1)
      // Light Glassmorphism with Smooth Card Shine
      // ========================================================
      cardEl.className = `bento-item shine-card cursor-pointer group relative col-span-2 row-span-1 min-h-[76px] sm:min-h-[98px] lg:min-h-[118px] lg:max-h-[122px] p-2.5 sm:p-3.5 lg:p-4 rounded-[16px] sm:rounded-[22px] border hover:shadow-elevated transition-shadow duration-300 flex items-center justify-between gap-2.5 sm:gap-3 overflow-hidden select-none`;
      cardEl.style.background = cardBg;
      cardEl.style.borderColor = cardBorderColor;
      cardEl.style.borderWidth = '1.5px';
      cardEl.style.borderStyle = 'solid';
      cardEl.style.boxShadow = isAmer
        ? '0 10px 24px -8px rgba(0, 0, 0, 0.1), 0 2px 6px rgba(0,0,0,0.03)'
        : `0 10px 24px -8px ${company.accentColor}48, 0 2px 6px rgba(0,0,0,0.03)`;

      cardEl.innerHTML = `
        <!-- Diagonal specular shine sheen -->
        <div class="absolute inset-0 bg-gradient-to-tr from-white/10 via-white/45 to-transparent pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity"></div>
        <div class="flex items-center gap-2.5 sm:gap-3.5 min-w-0 flex-1 relative z-10">
          ${
            hasSolidLogo
              ? `
            <div class="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl sm:rounded-2xl overflow-hidden flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300 shadow-xs border border-black/5">
              <img 
                src="${company.logo}" 
                alt="${company.nameEn}" 
                class="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          `
              : `
            <div class="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 p-1.5 rounded-xl sm:rounded-2xl bg-white border border-white/90 shadow-xs flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300 overflow-hidden">
              <img 
                src="${company.logo}" 
                alt="${company.nameEn}" 
                class="w-full h-full object-contain filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.12)]"
                loading="lazy"
              />
            </div>
          `
          }
          <div class="min-w-0 flex-1">
            <h4 class="text-xs sm:text-sm lg:text-[15px] font-heading font-medium text-osan-ink group-hover:text-osan-blue transition-colors truncate">
              ${isAr ? company.nameAr : company.nameEn}
            </h4>
            <p class="text-[10.5px] sm:text-xs font-normal truncate mt-0.5" style="color: ${subtitleColor}; filter: ${isAmer ? 'none' : 'brightness(0.75)'};">
              ${isAr ? company.sectorAr : company.sectorEn}
            </p>
            <p class="text-[10.5px] sm:text-[11px] text-osan-grey line-clamp-1 mt-0.5 font-light hidden sm:block">
              ${isAr ? company.taglineAr : company.taglineEn}
            </p>
          </div>
        </div>

        <div class="relative z-10 flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white group-hover:bg-osan-blue group-hover:text-white text-osan-ink flex items-center justify-center transition-all duration-300 shadow-xs border border-white" style="color: ${company.accentColor};">
          <svg class="w-3.5 h-3.5 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </div>
      `;
    } else {
      // ========================================================
      // 3. COMPACT SQUIRCLE CUBES (Col Span 1, Row Span 1)
      // Light Glassmorphism with Soft Brand Tint
      // ========================================================
      cardEl.className = `bento-item shine-card cursor-pointer group relative col-span-1 row-span-1 min-h-[96px] sm:min-h-[110px] lg:min-h-[118px] lg:max-h-[122px] p-2 sm:p-3 rounded-[16px] sm:rounded-[22px] border hover:shadow-elevated transition-shadow duration-300 flex flex-col items-center justify-center text-center overflow-hidden select-none`;
      cardEl.style.background = cardBg;
      cardEl.style.borderColor = cardBorderColor;
      cardEl.style.borderWidth = '1.5px';
      cardEl.style.borderStyle = 'solid';
      cardEl.style.boxShadow = isAmer
        ? '0 8px 18px -6px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0,0,0,0.03)'
        : `0 8px 18px -6px ${company.accentColor}40, 0 2px 4px rgba(0,0,0,0.03)`;

      cardEl.innerHTML = `
        <!-- Soft glass shine overlay -->
        <div class="absolute inset-0 bg-gradient-to-tr from-white/10 via-white/40 to-transparent pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity"></div>
        ${
          hasSolidLogo
            ? `
          <div class="relative z-10 w-11 h-11 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-xl sm:rounded-2xl overflow-hidden flex items-center justify-center flex-shrink-0 mb-1.5 transition-transform duration-300 group-hover:scale-110 shadow-xs border border-black/5">
            <img 
              src="${company.logo}" 
              alt="${company.nameEn}" 
              class="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        `
            : `
          <div class="relative z-10 w-11 h-11 sm:w-12 sm:h-12 lg:w-14 lg:h-14 p-1.5 rounded-xl sm:rounded-2xl bg-white border border-white/90 shadow-xs flex items-center justify-center flex-shrink-0 mb-1.5 transition-transform duration-300 group-hover:scale-110 overflow-hidden">
            <img 
              src="${company.logo}" 
              alt="${company.nameEn}" 
              class="w-full h-full object-contain filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.12)]"
              loading="lazy"
            />
          </div>
        `
        }
        <span class="relative z-10 block w-full text-[11px] sm:text-xs lg:text-[12.5px] font-medium text-osan-ink truncate group-hover:text-osan-blue transition-colors px-1">
          ${isAr ? company.nameAr : company.nameEn}
        </span>
        <span class="relative z-10 block w-full text-[9.5px] sm:text-[10px] font-light truncate mt-0.5 px-1" style="color: ${subtitleColor}; filter: ${isAmer ? 'none' : 'brightness(0.75)'};">
          ${isAr ? company.sectorAr : company.sectorEn}
        </span>
      `;
    }
  }

  /**
   * Promotes the selected company to Slot 0 (Hero), smoothly reorders the DOM,
   * and triggers the Anime.js v4 createLayout FLIP morph animation.
   */
  public promoteToHero(companyId: string): void {
    const currentIndex = this.companiesOrder.findIndex((c) => c.id === companyId);
    if (currentIndex <= 0) return; // Already Hero

    // Reorder data array: move selected company to index 0
    const [selectedCompany] = this.companiesOrder.splice(currentIndex, 1);
    this.companiesOrder.unshift(selectedCompany);

    this.executeLayoutReorder();
  }

  /**
   * Shuffles or rotates the cards in the DOM to showcase the dynamic Bento FLIP animation.
   */
  public shuffleLayout(): void {
    // Rotate items by 1 position
    const first = this.companiesOrder.shift();
    if (first) {
      this.companiesOrder.push(first);
    }
    this.executeLayoutReorder();
  }

  /**
   * Executes the DOM reordering wrapped inside Anime.js v4 createLayout.update().
   */
  private executeLayoutReorder(): void {
    if (!this.gridEl || this.isLayoutUpdating) return;
    const isAr = i18n.isRTL();

    const updateDOM = () => {
      this.companiesOrder.forEach((company, slotIndex) => {
        const cardEl = this.cardElementsMap.get(company.id);
        if (cardEl && this.gridEl) {
          this.updateCardContentAndClasses(cardEl, company, slotIndex, isAr);
          // appendChild moves the existing DOM element to the correct slot order without re-creating it
          this.gridEl.appendChild(cardEl);
        }
      });
    };

    if (this.animeLayout) {
      this.isLayoutUpdating = true;
      if (this.layoutLockTimer !== null) {
        clearTimeout(this.layoutLockTimer);
      }
      // Anime.js v4 reads bounds before updateDOM, reads bounds after, and FLIP-animates all 11 cards
      this.animeLayout.update(updateDOM);
      this.layoutLockTimer = window.setTimeout(() => {
        this.isLayoutUpdating = false;
        this.layoutLockTimer = null;
      }, 680);
    } else {
      updateDOM();
      this.initLayoutAnimation();
    }

    if (this.companiesOrder[0]) {
      this.syncStageAura(this.companiesOrder[0]);
    }
  }

  /**
   * Synchronizes the backdrop stage glows, prism rim frame, and header dot with the active Hero brand color.
   */
  private syncStageAura(heroCompany: CompanyLogoItem): void {
    const prismFrame = this.container.querySelector<HTMLElement>('#ecosystem-prism-frame');
    if (prismFrame) {
      prismFrame.style.background = `linear-gradient(135deg, ${heroCompany.accentColor}99 0%, rgba(255,255,255,0.28) 48%, rgba(56,189,248,0.55) 100%)`;
    }

    const activeDot = this.container.querySelector<HTMLElement>('#ecosystem-active-dot');
    if (activeDot) {
      activeDot.style.backgroundColor = heroCompany.accentColor;
      activeDot.style.boxShadow = `0 0 12px rgba(255, 255, 255, 0.45), 0 0 14px ${heroCompany.accentColor}`;
    }

    const vaultOrbA = this.container.querySelector<HTMLElement>('#ecosystem-vault-orb-a');
    if (vaultOrbA) {
      vaultOrbA.style.backgroundColor = `${heroCompany.accentColor}40`;
    }

    const pips = this.container.querySelectorAll<HTMLElement>('.ecosystem-visual-pip');
    pips.forEach((pip, idx) => {
      const targetIdx = HERO_COMPANIES.findIndex((c) => c.id === heroCompany.id);
      const activePipIdx = targetIdx >= 0 ? targetIdx % 5 : 0;
      const isActive = idx === activePipIdx;
      pip.classList.toggle('w-5', isActive);
      pip.classList.toggle('opacity-100', isActive);
      pip.classList.toggle('w-1.5', !isActive);
      pip.classList.toggle('opacity-40', !isActive);
      pip.style.backgroundColor = isActive ? '#38BDF8' : 'rgba(255, 255, 255, 0.45)';
    });
  }

  private initLayoutAnimation(): void {
    if (!this.gridEl) return;
    try {
      // Clear any residual inline transforms from prior layout state
      this.cardElementsMap.forEach((el) => {
        el.style.transform = '';
      });
      // Anime.js v4 createLayout instance on the unified grid
      this.animeLayout = createLayout(this.gridEl as any, {
        duration: 600,
        ease: 'out(3)',
      });
    } catch (err) {
      console.warn('Anime.js createLayout initialization error:', err);
    }
  }

  private initViewportObserver(): void {
    if (!('IntersectionObserver' in window)) return;
    this.viewportObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          this.isInViewport = entry.isIntersecting;
        });
      },
      { threshold: 0.1 }
    );
    this.viewportObserver.observe(this.container);
  }

  private initResizeHandler(): void {
    this.resizeHandler = () => {
      if (this.resizeTimer !== null) {
        clearTimeout(this.resizeTimer);
      }
      this.resizeTimer = window.setTimeout(() => {
        this.isLayoutUpdating = false;
        this.initLayoutAnimation();
      }, 200);
    };
    window.addEventListener('resize', this.resizeHandler, { passive: true });
  }

  private bindControls(): void {
    // Subtle mouse-reactive spotlight inside the glass Bento stage
    const stageEl = this.container.querySelector<HTMLElement>('#ecosystem-glass-stage');
    const spotlightEl = this.container.querySelector<HTMLElement>('#ecosystem-cursor-spotlight');
    if (stageEl && spotlightEl) {
      stageEl.addEventListener('mousemove', (e) => {
        const rect = stageEl.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const heroAccent = this.companiesOrder[0]?.accentColor || '#2473AB';
        spotlightEl.style.background = `radial-gradient(420px circle at ${x}px ${y}px, ${heroAccent}18, transparent 70%)`;
        spotlightEl.style.opacity = '1';
      });

      stageEl.addEventListener('mouseleave', () => {
        spotlightEl.style.opacity = '0';
      });
    }

    // Autoplay toggle
    const autoBtn = this.container.querySelector('#switcher-autoplay-toggle');
    autoBtn?.addEventListener('click', () => {
      this.isAutoPlaying = !this.isAutoPlaying;
      if (this.isAutoPlaying) {
        this.startAutoCycle();
      } else {
        this.stopAutoCycle();
      }
      this.updateAutoplayButtonUI();
    });

    // Hero card CTA click listener (delegated)
    this.container.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const ctaBtn = target.closest('[data-goto-company]');
      if (ctaBtn) {
        e.stopPropagation();
        const companiesEl = document.getElementById('companies');
        if (companiesEl) scrollToElement(companiesEl, -76);
      }
    });
  }

  private updateAutoplayButtonUI(): void {
    const autoBtn = this.container.querySelector<HTMLButtonElement>('#switcher-autoplay-toggle');
    if (!autoBtn) return;
    const isAr = i18n.isRTL();

    autoBtn.className = `inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all ${
      this.isAutoPlaying
        ? 'border-osan-blue/30 text-osan-blue bg-osan-sky/40 shadow-xs'
        : 'border-osan-grey/30 text-osan-grey hover:border-osan-blue'
    }`;
    autoBtn.innerHTML = `
      <span class="w-2 h-2 rounded-full ${this.isAutoPlaying ? 'bg-osan-blue animate-pulse' : 'bg-osan-grey'}"></span>
      <span>${this.isAutoPlaying ? (isAr ? 'دوران تلقائي' : 'Auto-Cycling') : (isAr ? 'إيقاف مؤقت' : 'Paused')}</span>
    `;
  }

  private startAutoCycle(): void {
    this.stopAutoCycle();
    this.autoCycleTimer = window.setInterval(() => {
      if (!this.isAutoPlaying || !this.isInViewport || document.hidden || this.isLayoutUpdating) return;
      this.shuffleLayout();
    }, 4800);
  }

  private stopAutoCycle(): void {
    if (this.autoCycleTimer !== null) {
      clearInterval(this.autoCycleTimer);
      this.autoCycleTimer = null;
    }
  }

  public destroy(): void {
    this.stopAutoCycle();
    if (this.layoutLockTimer !== null) {
      clearTimeout(this.layoutLockTimer);
      this.layoutLockTimer = null;
    }
    if (this.resizeTimer !== null) {
      clearTimeout(this.resizeTimer);
      this.resizeTimer = null;
    }
    if (this.viewportObserver) {
      this.viewportObserver.disconnect();
      this.viewportObserver = null;
    }
    if (this.resizeHandler) {
      window.removeEventListener('resize', this.resizeHandler);
      this.resizeHandler = null;
    }
    if (this.unsubscribeI18n) {
      this.unsubscribeI18n();
    }
  }
}
