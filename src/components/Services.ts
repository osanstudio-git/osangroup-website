import { i18n } from '../i18n/i18n';
import { scrollToElement } from '../utils/lenis';

export interface ServiceItem {
  id: string;
  category: 'corporate' | 'financial' | 'property' | 'media_logistics';
  titleEn: string;
  titleAr: string;
  subtitleEn: string;
  subtitleAr: string;
  descEn: string;
  descAr: string;
  featuresEn: string[];
  featuresAr: string[];
  companyId: string;
  companyNameEn: string;
  companyNameAr: string;
  companyLogo: string;
  accentColor: string;
  isFeatured?: boolean;
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'business-setup',
    category: 'corporate',
    titleEn: 'Business Setup & FDI Structuring',
    titleAr: 'تأسيس الأعمال والاستثمار الأجنبي',
    subtitleEn: '15+ Years Regional GCC Heritage',
    subtitleAr: 'خبرة تتجاوز ١٥ عاماً في دول الخليج',
    descEn: 'End-to-end commercial incorporation, foreign capital structuring, and complete commercial registration issuance across the Sultanate of Oman.',
    descAr: 'تأسيس متكامل للشركات، وهيكلة رؤوس الأموال الأجنبية، وإصدار السجلات التجارية وفق أعلى معايير الشفافية والاحترافية.',
    featuresEn: [
      'Commercial Registration (CR) Issuance & Amendments',
      '100% Foreign Ownership Structuring',
      'Fast-track PRO & Government Clearances',
      'Investor & Executive Visa Processing'
    ],
    featuresAr: [
      'إصدار وتعديل السجلات التجارية وتراخيص الأنشطة',
      'هيكلة مشاريع التملك الأجنبي الكامل في عُمان',
      'تخليص المعاملات الحكومية والعلاقات المؤسسية',
      'إصدار تأشيرات المستثمرين والكوادر التنفيذية'
    ],
    companyId: 'osbic',
    companyNameEn: 'OSBIC International',
    companyNameAr: 'أوسبك العالمية',
    companyLogo: '/logos/OSBIC.png',
    accentColor: '#2A93D5',
    isFeatured: true,
  },
  {
    id: 'financial-audit',
    category: 'financial',
    titleEn: 'Statutory Auditing & Tax Advisory',
    titleAr: 'التدقيق والضرائب والاستشارات المالية',
    subtitleEn: 'Certified Chartered Accountants',
    subtitleAr: 'فريق محاسبين وخبراء معتمدين',
    descEn: 'Proactive fiscal advisory, statutory compliance, corporate tax (CIT/VAT) filings, and precision bookkeeping safeguarding enterprise growth.',
    descAr: 'استشارات مالية وضريبية احترافية، تدقيق قانوني، دراسات جدوى اقتصادية، ومسك الدفاتر لضمان استقرار ونمو الشركات.',
    featuresEn: [
      'Corporate Tax (CIT) & VAT Compliance',
      'External Statutory & Internal Audits',
      'Commercial Feasibility Studies',
      'Financial Diagnostics & Bookkeeping'
    ],
    featuresAr: [
      'الامتثال لضريبة الدخل والشركات والقيمة المضافة',
      'تدقيق الحسابات القانوني والمراجعة الداخلية',
      'إعداد دراسات الجدوى الاقتصادية والمالية',
      'التحليل المالي ومسك الدفاتر المعتمدة'
    ],
    companyId: 'maisarah',
    companyNameEn: 'Maisarah Auditing',
    companyNameAr: 'ميسرة للاستشارات المالية',
    companyLogo: '/logos/MAISARAH.png',
    accentColor: '#8F1D38',
    isFeatured: true,
  },
  {
    id: 'service-centers-network',
    category: 'corporate',
    titleEn: 'Government Liaison Network',
    titleAr: 'مراكز الخدمات والعلاقات الحكومية',
    subtitleEn: '4 Strategic Hubs in Muscat',
    subtitleAr: '٤ مراكز استراتيجية في قلب مسقط',
    descEn: 'Muscat\'s premier executive network delivering rapid administrative clearances, Ministry of Labour affairs, and regulatory counsel.',
    descAr: 'شبكة متكاملة في غلا والموالح وروي والخوير لتخليص المعاملات الحكومية وتراخيص العمل والسجلات التجارية والاستشارات الإدارية.',
    featuresEn: [
      'ASAS (Ghala): Regulatory & IPO tracking advisory',
      'Masar (Al Mawaleh): Corporate tax file management',
      'Amer (Ruwi): Commercial fast-track launching',
      'Tamkeen (Al Khuwair): Single-window labor affairs'
    ],
    featuresAr: [
      'أساس (غلا): مركز استشاري ومواكبة الاكتتابات العامة',
      'مسار (الموالح): إدارة الملفات الضريبية وتجنب الغرامات',
      'آمر (روي): تسريع إطلاق المشاريع والمتابعات الإدارية',
      'تمكين (الخوير): نافذة شاملة لوزارة العمل والتراخيص'
    ],
    companyId: 'service-centers',
    companyNameEn: 'Service Centers Network',
    companyNameAr: 'مراكز أساس، مسار، آمر، تمكين',
    companyLogo: '/logos/ASAS.png',
    accentColor: '#0095A8',
    isFeatured: true,
  },
  {
    id: 'real-estate',
    category: 'property',
    titleEn: 'Real Estate Management & Brokerage',
    titleAr: 'الإدارة والتطوير والتسويق العقاري',
    subtitleEn: 'Residential, Commercial & Industrial',
    subtitleAr: 'عقارات سكنية وتجارية وصناعية',
    descEn: 'End-to-end property asset management, investor matching, commercial project development, and multi-channel marketing.',
    descAr: 'إدارة احترافية للمباني والمجمعات، تمكين المستثمرين من تملك العقارات المميزة، وتطوير وتسويق المشاريع العقارية بكفاءة.',
    featuresEn: [
      'Professional Facility & Building Management',
      'Investor Portfolio Matching & Acquisition',
      'Multi-Channel Commercial Real Estate Marketing',
      'Structured Sales & Long-Term Leasing'
    ],
    featuresAr: [
      'إدارة المنشآت والمباني وفق أعلى المعايير',
      'توفير الفرص الاستثمارية العقارية المجدية',
      'تسويق المشاريع العقارية والتجارية',
      'إدارة عقود البيع والتأجير والتحصيل'
    ],
    companyId: 'nameer',
    companyNameEn: 'Nameer Properties',
    companyNameAr: 'نمير للعقارات',
    companyLogo: '/logos/NAMEER -1.png',
    accentColor: '#0E544A',
  },
  {
    id: 'serviced-offices',
    category: 'property',
    titleEn: 'Serviced Offices & Coworking',
    titleAr: 'مراكز الأعمال والمكاتب المشتركة',
    subtitleEn: 'Located in Muscat (Ghala)',
    subtitleAr: 'موقع حيوي في غلا مسقط',
    descEn: 'Modern, fully furnished private executive suites, shared coworking desks, meeting boardrooms, and integrated business amenities.',
    descAr: 'مكاتب مؤثثة حديثة بمساحات مرنة، قاعات اجتماعات مجهزة، وبيئة عمل متكاملة وملهمة للشركات الناشئة ورواد الأعمال.',
    featuresEn: [
      'Fully Furnished Executive Private Offices',
      'Flexible Leases & Competitive Terms',
      'High-Speed Connectivity & Meeting Suites',
      'Vibrant Networking Business Ecosystem'
    ],
    featuresAr: [
      'مكاتب خاصة مفروشة بأحدث التجهيزات',
      'عقود إيجارية مرنة وأسعار تنافسية',
      'قاعات اجتماعات متطورة وخدمات ضيافة',
      'مجتمع أعمال ريادي محفز للنمو'
    ],
    companyId: 'misk',
    companyNameEn: 'MUSK Business Center',
    companyNameAr: 'مركز مسك للأعمال',
    companyLogo: '/logos/MUSK.png',
    accentColor: '#514E45',
  },
  {
    id: 'creative-media',
    category: 'media_logistics',
    titleEn: 'Creative Media & Brand Strategy',
    titleAr: 'التسويق الرقمي والإنتاج الإعلامي',
    subtitleEn: 'Brand Engineering & Campaigns',
    subtitleAr: 'صناعة الهوية والحملات الرقمية',
    descEn: 'Strategic brand identity engineering, digital performance advertising, commercial video production, and high-impact web design.',
    descAr: 'تخطيط وتنفيذ الاستراتيجيات التسويقية والحملات الإعلامية، وتصميم الهويات البصرية والإنتاج المرئي للشركات.',
    featuresEn: [
      'Corporate Visual Identity & Brand Engineering',
      'Performance Social Media Campaigns',
      'Commercial 4K Video Production',
      'Interactive Web Experiences & Portals'
    ],
    featuresAr: [
      'بناء وتطوير الهويات المؤسسية الكاملة',
      'إدارة الحملات التسويقية والإعلانات الرقمية',
      'الإنتاج المرئي وتصوير الفيديوهات الإعلانية',
      'تصميم وتطوير المواقع والتجارب التفاعلية'
    ],
    companyId: 'osan-studio',
    companyNameEn: 'Osan Studio',
    companyNameAr: 'أوسان استوديو',
    companyLogo: '/logos/OSAN STUDIO -1.png',
    accentColor: '#2E4960',
  },
  {
    id: 'customs-logistics',
    category: 'media_logistics',
    titleEn: 'Customs Clearance & Freight Brokerage',
    titleAr: 'التخليص الجمركي والحلول اللوجستية',
    subtitleEn: 'Sea, Air & Land Omani Ports',
    subtitleAr: 'الموانئ والمنافذ الجوية والبحرية والبرية',
    descEn: 'Rapid customs handling, tariff documentation, and cross-border freight compliance facilitating uninterrupted import and export logistics.',
    descAr: 'إنجاز كافة الإجراءات الجمركية لمختلف الشحنات عبر المنافذ البحرية والجوية والبرية مع الالتزام التام باللوائح العُمانية.',
    featuresEn: [
      'Air, Sea & Land Port Border Clearances',
      'Tariff Classification & Regulatory Compliance',
      'Import / Export Customs Documentation',
      'Supply Chain Logistics Facilitation'
    ],
    featuresAr: [
      'تخليص البضائع بالموانئ والمطارات والمنافذ البرية',
      'توثيق الإقرارات الجمركية وتصنيف التعرفة',
      'تسهيل إجراءات الاستيراد والتصدير التجارية',
      'دعم سلاسل الإمداد للشركات المحلية والدولية'
    ],
    companyId: 'customs',
    companyNameEn: 'Customs Clearance Division',
    companyNameAr: 'شركة التخليص الجمركي',
    companyLogo: '/logos/osan-group-logo.png',
    accentColor: '#1B5683',
  },
  {
    id: 'travel-tourism',
    category: 'media_logistics',
    titleEn: 'Corporate Mobility & Tourism',
    titleAr: 'السفر والسياحة ورحلات الأعمال',
    subtitleEn: 'Global Corporate Itineraries',
    subtitleAr: 'تنظيم رحلات الشركات والوفود',
    descEn: 'Full-service corporate travel management, worldwide flight ticketing, executive accommodations, and tourist/commercial visa concierge.',
    descAr: 'حلول متكاملة لسفر الشركات والأفراد، تشمل حجوزات الطيران والفنادق، وإصدار التأشيرات، وتنظيم رحلات الأعمال والوفود.',
    featuresEn: [
      'Worldwide Commercial Flight Booking',
      'Corporate Hotel & Executive Accommodations',
      'Tourist & Business Entry Visa Concierge',
      'Executive Delegations & Corporate Retreats'
    ],
    featuresAr: [
      'حجز وإصدار تذاكر الطيران لجميع الوجهات',
      'حجوزات الفنادق ومقار إقامة الشركات والوفود',
      'تسهيل إصدار تأشيرات الدخول السياحية والتجارية',
      'تنظيم الرحلات السياحية وملتقيات الأعمال'
    ],
    companyId: 'travel',
    companyNameEn: 'Travel & Tourism Division',
    companyNameAr: 'شركة السفر والسياحة',
    companyLogo: '/logos/osan-group-logo.png',
    accentColor: '#2473AB',
  },
  {
    id: 'hospitality-cafe',
    category: 'property',
    titleEn: 'Specialty Hospitality & Roastery',
    titleAr: 'الضيافة والمقاهي المختصة',
    subtitleEn: 'OMCA Coffee LLC 1540400',
    subtitleAr: 'شركة أومكا كافيه ش.م.م',
    descEn: 'Artisanal coffee culture, curated specialty coffee bean roasteries, and exceptional social community gathering spaces.',
    descAr: 'علامة أوسان في قطاع الضيافة والمقاهي المختصة، بتقديم تجربة قهوة استثنائية ومساحات اجتماعية راقية.',
    featuresEn: [
      'Specialty Gourmet Coffee Roasting',
      'Modern Ergonomic Social Cafe Atmospheres',
      'Commercial Registration LLC 1540400',
      'Community Culture & Hospitality Events'
    ],
    featuresAr: [
      'تحميص وتقديم أجود أنواع القهوة المختصة',
      'أجواء مقاهي عصرية ومساحات لقاء راقية',
      'سجل تجاري معتمد (ش.م.م ١٥٤٠٤٠٠)',
      'استضافة فعاليات الضيافة ومجتمع القهوة'
    ],
    companyId: 'omca',
    companyNameEn: 'OMCA Coffee',
    companyNameAr: 'أومكا كافيه',
    companyLogo: '/logos/OMCA.jpeg',
    accentColor: '#6F182A',
  },
  {
    id: 'investment-holding',
    category: 'corporate',
    titleEn: 'Strategic Holding & Ventures',
    titleAr: 'أوسان القابضة وإدارة الاستثمارات',
    subtitleEn: 'Diversified Growth Portfolio',
    subtitleAr: 'محفظة استثمارية متعددة القطاعات',
    descEn: 'The investment arm of OSAN GROUP managing a diversified equity portfolio across high-growth domestic sectors and national ventures.',
    descAr: 'الذراع الاستثمارية لمجموعة أوسان لتنمية المحفظة الاستثمارية عبر المساهمات الاستراتيجية والمشاريع ذات القيمة المضافة.',
    featuresEn: [
      'Maxphone Oman & United Way Design',
      'Rakaez Al Bunyan Real Estate Development',
      'Ozone Travel & Tourism & Al Somow Business',
      'Meethaq Contracting Operations'
    ],
    featuresAr: [
      'ماكس فون عُمان • يونايتد وي ديزاين',
      'ركائز البنيان للتطوير العقاري',
      'أوزون للسفر والسياحة • السمو للأعمال',
      'ميثاق للمقاولات'
    ],
    companyId: 'osan-holding',
    companyNameEn: 'Osan Holding',
    companyNameAr: 'أوسان القابضة',
    companyLogo: '/logos/osan-group-logo.png',
    accentColor: '#2B2B2B',
  },
];

export class Services {
  private container: HTMLElement;
  private currentFilter: string = 'all';
  private unsubscribeI18n: (() => void) | null = null;

  constructor() {
    this.container = document.createElement('section');
    this.container.id = 'services';
    this.container.className = 'relative bg-osan-light/40 min-h-screen flex flex-col justify-center py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-t border-osan-sky/60 overflow-hidden scroll-mt-0';
    this.render();

    this.unsubscribeI18n = i18n.onLanguageChange(() => {
      this.render();
    });
  }

  public getElement(): HTMLElement {
    return this.container;
  }

  private render(): void {
    const isAr = i18n.isRTL();
    const filteredServices = this.currentFilter === 'all'
      ? SERVICES_DATA
      : SERVICES_DATA.filter((s) => s.category === this.currentFilter);

    const categories = [
      { id: 'all', labelEn: 'All Sectors (10)', labelAr: 'جميع القطاعات (١٠)' },
      { id: 'corporate', labelEn: 'Corporate & Government', labelAr: 'الشركات والخدمات الحكومية' },
      { id: 'financial', labelEn: 'Audit & Advisory', labelAr: 'التدقيق والاستشارات' },
      { id: 'property', labelEn: 'Real Estate & Workspaces', labelAr: 'العقارات ومراكز الأعمال' },
      { id: 'media_logistics', labelEn: 'Media, Freight & Travel', labelAr: 'الإعلام واللوجستيات والسفر' },
    ];

    this.container.innerHTML = `
      <div class="max-w-7xl mx-auto space-y-16">
        
        <!-- Section Header (Entrance Motion) -->
        <div class="flex flex-col items-center text-center space-y-4 max-w-3xl mx-auto page-content-motion">
          <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-osan-sky text-osan-blue text-xs sm:text-sm font-bold shadow-xs">
            <span class="w-2 h-2 rounded-full bg-osan-blue"></span>
            <span>${isAr ? 'قطاعات الأعمال والخدمات المتكاملة' : 'Integrated Sectors & Core Solutions'}</span>
          </div>

          <h2 class="text-3xl sm:text-4xl md:text-5xl font-heading font-light sm:font-normal text-osan-ink tracking-tight">
            ${isAr
        ? 'حلول شاملة تدعم نجاحك المؤسسي والاستثماري'
        : 'Comprehensive Solutions Driving Enterprise Growth'}
          </h2>

          <p class="text-sm sm:text-base text-osan-grey font-light leading-relaxed">
            ${isAr
        ? 'تغطي خدمات مجموعة أوسان أكثر من ٩ قطاعات حيوية تلبي أدق متطلبات رواد الأعمال، المؤسسات الخاصة، والشركاء والمستثمرين في عُمان.'
        : 'Covering 9+ strategic industry sectors designed to empower startups, established enterprises, and global investors entering Oman.'}
          </p>

          <!-- Category Filter Bar -->
          <div class="flex flex-wrap items-center justify-center gap-2 pt-4" role="tablist" aria-label="Services filter">
            ${categories
        .map(
          (c) => `
              <button 
                type="button" 
                data-service-filter="${c.id}"
                class="px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 border ${this.currentFilter === c.id
              ? 'bg-osan-blue text-white border-osan-blue shadow-sm'
              : 'bg-white hover:bg-osan-sky/50 text-osan-grey border-osan-sky'
            }"
              >
                ${isAr ? c.labelAr : c.labelEn}
              </button>
            `
        )
        .join('')}
          </div>
        </div>

        <!-- Bento Grid of Services (Staggered Cascade Motion) -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch reveal-stagger-cascade">
          ${filteredServices
        .map((item) => {
          return `
              <div 
                class="service-card group bg-white p-6 sm:p-8 rounded-3xl border border-osan-sky/80 shadow-subtle hover:shadow-elevated transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between relative overflow-hidden"
                style="border-top: 4px solid ${item.accentColor};"
              >
                <div>
                  <!-- Header: Subsidiary Tag & Logo -->
                  <div class="flex items-center justify-between gap-3 mb-6">
                    <div class="flex items-center gap-2.5">
                      <div class="w-10 h-10 rounded-xl bg-osan-light/80 p-1.5 border border-osan-sky/60 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                        <img 
                          src="${item.companyLogo}" 
                          alt="${item.companyNameEn}" 
                          class="max-h-full max-w-full object-contain"
                          loading="lazy"
                        />
                      </div>
                      <span class="text-xs font-bold text-osan-grey group-hover:text-osan-blue transition-colors">
                        ${isAr ? item.companyNameAr : item.companyNameEn}
                      </span>
                    </div>

                    <span class="text-[11px] font-bold px-2.5 py-1 rounded-full bg-osan-light border border-osan-sky text-osan-grey">
                      ${isAr ? item.subtitleAr : item.subtitleEn}
                    </span>
                  </div>

                  <!-- Title & Description (Slim Typography) -->
                  <h3 class="text-xl sm:text-2xl font-heading font-light sm:font-normal text-osan-ink mb-3 group-hover:text-osan-blue transition-colors">
                    ${isAr ? item.titleAr : item.titleEn}
                  </h3>

                  <p class="text-sm text-osan-grey font-light leading-relaxed mb-6">
                    ${isAr ? item.descAr : item.descEn}
                  </p>

                  <!-- Key Deliverables / Features List -->
                  <div class="space-y-2.5 mb-6 pt-4 border-t border-osan-sky/50">
                    <span class="text-xs font-bold uppercase tracking-wider text-osan-ink/80 block">
                      ${isAr ? 'أبرز المزايا والخدمات:' : 'Core Capabilities:'}
                    </span>
                    <ul class="space-y-2">
                      ${(isAr ? item.featuresAr : item.featuresEn)
              .map(
                (feat) => `
                        <li class="flex items-start gap-2 text-xs sm:text-sm text-osan-grey">
                          <span class="text-osan-blue font-bold flex-shrink-0 mt-0.5">✓</span>
                          <span>${feat}</span>
                        </li>
                      `
              )
              .join('')}
                    </ul>
                  </div>
                </div>

                <!-- Footer Action Link to Company Modal -->
                <div class="pt-4 border-t border-osan-sky/60 flex items-center justify-between">
                  <button 
                    type="button" 
                    data-trigger-company="${item.companyId}"
                    class="text-xs sm:text-sm font-bold text-osan-blue hover:text-osan-deep inline-flex items-center gap-1.5 transition-colors group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
                  >
                    <span>${isAr ? 'استكشف الشركة والملف' : 'Explore Subsidiary Profile'}</span>
                    <svg class="w-4 h-4 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                    </svg>
                  </button>

                  <span class="w-2.5 h-2.5 rounded-full" style="background-color: ${item.accentColor};"></span>
                </div>

              </div>
            `;
        })
        .join('')}
        </div>

        <!-- In-Country Value / Contact Banner -->
        <div class="reveal-spring-defocus p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-osan-blue to-osan-deep text-white shadow-elevated flex flex-col md:flex-row items-center justify-between gap-6">
          <div class="space-y-2 text-center md:text-start rtl:md:text-right">
            <span class="text-xs font-bold uppercase tracking-wider text-osan-sky">
              ${isAr ? 'استشارات تأسيس وتوسع مخصصة' : 'Custom Corporate Solutions'}
            </span>
            <h4 class="text-2xl sm:text-3xl font-heading font-extrabold text-white">
              ${isAr ? 'هل تبحث عن حزمة حلول متكاملة لشركتك في عُمان؟' : 'Looking for an integrated corporate package in Oman?'}
            </h4>
            <p class="text-sm text-osan-sky/90 max-w-2xl">
              ${isAr
        ? 'فريقنا الاستشاري في المقر الرئيسي بمسقط مستعد لمساعدتك في التأسيس، التدقيق، المكاتب، وتخليص المعاملات الحكومية تحت سقف واحد.'
        : 'Our headquarters advisory team in Muscat assists with business setup, audit, serviced offices, and government relations under one roof.'}
            </p>
          </div>

          <button 
            type="button" 
            id="services-inquire-btn"
            class="px-8 py-3.5 rounded-full bg-white text-osan-blue hover:bg-osan-sky font-bold text-sm sm:text-base shadow-md transition-all duration-200 hover:-translate-y-0.5 flex-shrink-0"
          >
            ${isAr ? 'تواصل مع فريق الاستشارات' : 'Inquire With Advisory Team'}
          </button>
        </div>

      </div>
    `;

    this.bindEvents();
  }

  private bindEvents(): void {
    // Filter buttons
    const filterBtns = this.container.querySelectorAll<HTMLButtonElement>('[data-service-filter]');
    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-service-filter') || 'all';
        if (filter !== this.currentFilter) {
          this.currentFilter = filter;
          this.render();
        }
      });
    });

    // Inquire CTA button
    const inquireBtn = this.container.querySelector('#services-inquire-btn');
    inquireBtn?.addEventListener('click', () => {
      const contactEl = document.getElementById('contact');
      if (contactEl) scrollToElement(contactEl, -76);
    });

    // Trigger company profile modal in Companies section
    const companyBtns = this.container.querySelectorAll<HTMLButtonElement>('[data-trigger-company]');
    companyBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const compId = btn.getAttribute('data-trigger-company');
        if (compId) {
          const companiesSection = document.getElementById('companies');
          if (companiesSection) {
            scrollToElement(companiesSection, -76);
          }
          // Dispatch custom event so Companies component opens the exact modal!
          window.dispatchEvent(new CustomEvent('osan:open-company-modal', { detail: { companyId: compId } }));
        }
      });
    });
  }

  public destroy(): void {
    if (this.unsubscribeI18n) {
      this.unsubscribeI18n();
      this.unsubscribeI18n = null;
    }
  }
}

