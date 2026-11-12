import { i18n } from '../i18n/i18n';

export class About {
  private container: HTMLElement;
  private unsubscribeI18n: (() => void) | null = null;
  private expandedValueIndices: Set<number> = new Set();
  private typewriterTimer: number | null = null;

  constructor() {
    this.container = document.createElement('div');
    this.container.className = 'w-full bg-white';
    this.render();

    this.unsubscribeI18n = i18n.onLanguageChange(() => {
      this.render();
    });
  }

  public getElement(): HTMLElement {
    return this.container;
  }

  private render(): void {
    this.clearTypewriter();
    const isAr = i18n.isRTL();
    const t = (k: string, fb: string) => i18n.t(k, fb);
    const dict = i18n.getDict();
    const valuesList = dict?.about?.values?.items || [];

    this.container.innerHTML = `
      <!-- ======================================================== -->
      <!-- 1. FOUNDER & CEO MESSAGE (PRESTIGIOUS EXECUTIVE FULLPAGE) -->
      <!-- ======================================================== -->
      <section id="chairmans-word" class="relative bg-gradient-to-b from-[#FAFBFD] via-[#F4F8FB] to-white min-h-screen lg:h-screen lg:max-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-14 sm:py-16 lg:py-6 border-t border-osan-sky/70 overflow-hidden scroll-mt-0">
        
        <!-- Ambient Executive Backlight Auras -->
        <div data-parallax="-0.24" class="absolute -top-32 left-1/4 w-96 h-96 bg-osan-blue/5 rounded-full blur-3xl pointer-events-none"></div>
        <div data-parallax="0.2" class="absolute bottom-0 right-1/4 w-96 h-96 bg-sky-400/5 rounded-full blur-3xl pointer-events-none"></div>

        <div class="max-w-7xl mx-auto w-full h-full flex flex-col justify-center">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-10 items-center">
          
          <!-- LEFT COLUMN: Executive Framed Portrait & Credential Plaque -->
          <div class="lg:col-span-5 relative flex justify-center reveal-slide-left">
            
            <!-- Multi-layered Sapphire & Sky Aura Behind Card -->
            <div class="absolute -inset-3 bg-gradient-to-tr from-osan-blue/20 via-sky-300/20 to-cyan-200/15 rounded-[2.25rem] blur-2xl -z-10"></div>
            
            <!-- Architectural Double-Rim Portrait Frame -->
            <div class="executive-portrait-frame relative w-full max-w-[420px] p-1.5 rounded-[2rem] border border-white/90 group">
              
              <!-- Photo Container -->
              <div class="relative w-full h-[340px] sm:h-[400px] lg:h-[440px] xl:h-[455px] rounded-[1.6rem] overflow-hidden bg-gradient-to-b from-[#EAF3FA] to-[#D8E9F6]">
                <img 
                  src="/images/WhatsApp Image 2026-11-10 at 14.46.25.jpeg" 
                  alt="Abdullah Al Hasani — Founder & CEO" 
                  class="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  loading="lazy"
                />
                
                <!-- Top Status Badge Pill & Brand Mark -->
                <div class="absolute top-3.5 inset-x-3.5 flex items-center justify-between pointer-events-none">
                  <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0E355C]/75 backdrop-blur-md border border-white/25 text-white text-[11px] font-normal shadow-md">
                    <span class="w-2 h-2 rounded-full bg-sky-300 animate-pulse"></span>
                    <span>${isAr ? 'القيادة التنفيذية' : 'Executive Leadership'}</span>
                  </div>
                  
                  <div class="w-8 h-8 rounded-full bg-white/90 backdrop-blur-md border border-osan-sky/80 flex items-center justify-center shadow-sm">
                    <img src="/logos/شعار اوسان جروب .png" alt="Osan Group" class="w-4 h-4 object-contain" />
                  </div>
                </div>

                <!-- Atmospheric Royal Azure Vignette at Bottom -->
                <div class="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#0D355E]/80 via-[#154D82]/28 to-transparent pointer-events-none"></div>

                <!-- Floating Luminous Sapphire Glass Credential Plaque -->
                <div class="executive-plaque absolute bottom-3 inset-x-3 p-3.5 sm:p-4 rounded-2xl overflow-hidden text-white transition-transform duration-500 group-hover:-translate-y-0.5">
                  <div class="relative z-10 flex items-stretch gap-3 min-w-0">
                    <span class="w-1 rounded-full bg-gradient-to-b from-sky-200 via-cyan-300 to-sky-400/40 shrink-0"></span>
                    <div class="min-w-0">
                      <h4 class="text-lg sm:text-xl font-heading font-normal text-white tracking-tight drop-shadow-sm truncate">
                        ${isAr ? 'عبد الله الحسني' : 'Abdullah Al Hasani'}
                      </h4>
                      <p class="text-[11px] sm:text-xs text-sky-100/95 font-light leading-tight mt-0.5 truncate">
                        ${isAr ? 'المؤسس والرئيس التنفيذي' : 'Founder & CEO'}
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>

          <!-- RIGHT COLUMN: Structured Executive Message & Pillars -->
          <div class="lg:col-span-7 flex flex-col justify-center space-y-4 sm:space-y-5">
            
            <!-- Category Header Bar (Without Institutional & National Vision) -->
            <div class="flex items-center gap-3 reveal-text-fade">
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-osan-blue/10 border border-osan-blue/20 text-osan-blue text-xs font-normal tracking-wide">
                <span class="w-1.5 h-1.5 rounded-full bg-osan-blue animate-pulse"></span>
                <span>${isAr ? 'كلمة المؤسس والرئيس التنفيذي' : 'Founder & CEO Message'}</span>
              </div>
            </div>

            <!-- Stylized Pull-Quote Block with Decorative Accent -->
            <div class="reveal-text-fade relative pl-5 rtl:pr-5 rtl:pl-0 border-l-[3px] rtl:border-r-[3px] rtl:border-l-0 border-osan-blue py-0.5" style="--reveal-delay: 110ms;">
              <div class="absolute -top-3 left-0 rtl:right-0 rtl:left-auto -translate-x-3 rtl:translate-x-3 text-4xl sm:text-5xl font-serif text-osan-blue/20 leading-none select-none pointer-events-none">
                “
              </div>
              <h3 class="text-base sm:text-lg lg:text-xl font-heading font-light text-osan-ink leading-snug">
                ${isAr
                  ? '«منذ التأسيس، انطلقنا برؤية واضحة نحو الابتكار وتعزيز الاقتصاد الوطني تماشيًا مع مستهدفات رؤية عُمان ٢٠٤٠»'
                  : '“Since our inception, we have advanced with a profound vision to create enduring value in alignment with Oman Vision 2040.”'}
              </h3>
            </div>

            <!-- Structured 2-Pillar Narrative Cards -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-0.5 reveal-stagger-cascade">
              
              <!-- Pillar 1: Strategic Growth & Alliances -->
              <div class="p-3.5 rounded-2xl bg-white/85 border border-osan-sky/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:border-osan-blue/30 transition-all group">
                <div class="flex items-center gap-2 mb-1.5">
                  <div class="w-6 h-6 rounded-lg bg-osan-blue/10 flex items-center justify-center text-osan-blue text-[11px] font-normal">
                    01
                  </div>
                  <h5 class="text-xs sm:text-sm font-heading font-normal text-osan-ink">
                    ${isAr ? 'التوسع الاستراتيجي والشراكات' : 'Strategic Growth & Alliances'}
                  </h5>
                </div>
                <p class="text-[11.5px] sm:text-xs text-osan-grey leading-relaxed font-light">
                  ${isAr
                    ? 'انطلقت المجموعة عام ٢٠١٦ برؤية طموحة، وواصلت التوسع بإطلاق شركات نوعية وبناء شراكات محلية ودولية تقدم حلولاً متكاملة للأفراد ورواد الأعمال والمستثمرين.'
                    : 'Since 2016, OSAN GROUP has expanded strategically by launching specialized enterprises and forging impactful alliances that deliver end-to-end solutions across sectors.'}
                </p>
              </div>

              <!-- Pillar 2: National Economic Impact & Vision 2040 -->
              <div class="p-3.5 rounded-2xl bg-white/85 border border-osan-sky/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:border-emerald-500/30 transition-all group">
                <div class="flex items-center gap-2 mb-1.5">
                  <div class="w-6 h-6 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-600 text-[11px] font-normal">
                    02
                  </div>
                  <h5 class="text-xs sm:text-sm font-heading font-normal text-osan-ink">
                    ${isAr ? 'الأثر الاقتصادي ورؤية عُمان' : 'National Impact & Vision 2040'}
                  </h5>
                </div>
                <p class="text-[11.5px] sm:text-xs text-osan-grey leading-relaxed font-light">
                  ${isAr
                    ? 'نفخر بحضورنا الفاعل في دعم بيئة الأعمال والاقتصاد الوطني تماشياً مع رؤية عُمان ٢٠٤٠، بفضل ثقة عملائنا، وقوة شركائنا، وجهود كوادرنا الوطنية المخلصة.'
                    : 'We take pride in reinforcing Oman\'s economic fabric and supporting entrepreneurs, fully aligned with Oman Vision 2040 and driven by the dedicated commitment of our national workforce.'}
                </p>
              </div>

            </div>

          </div>

        </div>
      </section>

      <!-- ======================================================== -->
      <!-- 3. VISION, MISSION & CORE VALUES (2x4 LIST VIEW)         -->
      <!-- ======================================================== -->
      <section id="mission" class="relative bg-gradient-to-b from-white via-[#F6FAFE] to-white min-h-screen flex flex-col justify-center py-10 sm:py-12 px-4 sm:px-6 lg:px-8 border-t border-osan-sky/60 overflow-hidden scroll-mt-0">
        <!-- Atmospheric Animated Background Orbs & Subtle Dot-Matrix -->
        <div data-parallax="-0.2" class="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div class="ecosystem-vault-orb-a -top-24 -left-20 w-[340px] h-[340px] sm:w-[460px] sm:h-[460px] rounded-full bg-osan-sky/45 blur-[90px]"></div>
          <div class="ecosystem-vault-orb-b -bottom-24 -right-20 w-[320px] h-[320px] sm:w-[440px] sm:h-[440px] rounded-full bg-cyan-200/30 blur-[90px]"></div>
          <div
            class="absolute inset-0 opacity-30"
            style="background-image: radial-gradient(rgba(14, 116, 179, 0.14) 1px, transparent 1px); background-size: 28px 28px; mask-image: radial-gradient(ellipse 75% 70% at 50% 50%, black 35%, transparent 100%); -webkit-mask-image: radial-gradient(ellipse 75% 70% at 50% 50%, black 35%, transparent 100%);"
          ></div>
        </div>

        <div class="relative z-10 max-w-6xl mx-auto w-full space-y-8 sm:space-y-10">

          <!-- Compact Structured Our Vision & Our Mission Cards (Single Icon Each) -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">

            <!-- Our Vision Card (Single Icon) -->
            <div class="reveal-slide-left shine-card p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-white via-[#F8FBFF] to-[#EEF5FC] border border-osan-sky/90 shadow-[0_8px_28px_-6px_rgba(14,116,179,0.08)] hover:border-osan-blue/40 transition-all">
              <div class="flex items-center gap-2.5 mb-2">
                <div class="w-8 h-8 rounded-xl bg-osan-blue text-white flex items-center justify-center shrink-0 shadow-xs">
                  <!-- Classic Compass Icon (Vision & Direction) -->
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="9" />
                    <polygon points="15.8 8.2 13.7 13.7 8.2 15.8 10.3 10.3 15.8 8.2" />
                  </svg>
                </div>
                <h4 class="text-sm sm:text-base font-heading font-normal text-osan-ink">
                  ${t('about.vision.title', 'Our Vision')}
                </h4>
              </div>
              <p class="text-xs sm:text-[13px] text-osan-grey leading-relaxed font-light">
                ${t('about.vision.desc', 'To be the premier and trusted partner in integrated business and investment solutions across the Sultanate of Oman, advancing institutional excellence, sustainable development, and the goals of Oman Vision 2040.')}
              </p>
            </div>

            <!-- Our Mission Card (Single Icon) -->
            <div class="reveal-slide-right shine-card p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-white via-[#F8FBFF] to-[#EEF5FC] border border-osan-sky/90 shadow-[0_8px_28px_-6px_rgba(14,116,179,0.08)] hover:border-osan-deep/40 transition-all" style="--reveal-delay: 110ms;">
              <div class="flex items-center gap-2.5 mb-2">
                <div class="w-8 h-8 rounded-xl bg-osan-deep text-white flex items-center justify-center shrink-0 shadow-xs">
                  <!-- Classic Target / Precision Goal Icon (Mission) -->
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="9" />
                    <circle cx="12" cy="12" r="5" />
                    <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
                  </svg>
                </div>
                <h4 class="text-sm sm:text-base font-heading font-normal text-osan-ink">
                  ${t('about.mission.title', 'Our Mission')}
                </h4>
              </div>
              <p class="text-xs sm:text-[13px] text-osan-grey leading-relaxed font-light">
                ${t('about.mission.desc', 'To deliver a cohesive ecosystem of innovative services and business solutions via specialized corporate subsidiaries, qualified national talent, and high-impact strategic partnerships, adhering to the highest benchmarks of quality and transparency to stimulate private sector expansion and national economic resilience.')}
              </p>
            </div>

          </div>

          <!-- Header Bar with View / Collapse All Toggle -->
          <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-osan-sky/70 pb-5">
            <div class="space-y-1.5">
              <span class="reveal-text-fade text-xs font-normal uppercase tracking-widest text-osan-blue block">
                ${isAr ? 'المبادئ والقيم' : 'Principles & Pillars'}
              </span>
              <h3 class="reveal-text-fade text-2xl sm:text-3xl font-heading font-light sm:font-normal text-osan-ink tracking-tight" style="--reveal-delay: 80ms;">
                ${t('about.values.title', 'Core Values')}
              </h3>
              <p class="reveal-text-fade flex flex-wrap items-center gap-x-2 gap-y-1 text-sm sm:text-base font-light text-osan-ink pt-0.5" style="--reveal-delay: 140ms;">
                <span class="text-osan-grey font-light">${isAr ? 'نحن نقدم' : 'We do'}</span>
                <span class="inline-flex items-center text-osan-blue font-normal min-h-[1.5em]">
                  <span id="mission-typewriter-text"></span><span class="typewriter-caret" aria-hidden="true"></span>
                </span>
              </p>
            </div>

            <button
              type="button"
              id="toggle-all-values-btn"
              class="reveal-slide-down self-start sm:self-auto inline-flex items-center gap-2 px-4 py-2 rounded-full bg-osan-light hover:bg-osan-sky/70 border border-osan-sky text-osan-blue text-xs font-medium transition-colors cursor-pointer shrink-0"
            >
              <span id="toggle-all-values-label">
                ${this.expandedValueIndices.size === valuesList.length && valuesList.length > 0
                  ? (isAr ? 'طي الكل' : 'Collapse All')
                  : (isAr ? 'عرض الكل' : 'View All')}
              </span>
              <svg class="w-3.5 h-3.5 transition-transform duration-200 ${this.expandedValueIndices.size === valuesList.length && valuesList.length > 0 ? 'rotate-180' : ''}" id="toggle-all-values-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>
          </div>

          <!-- 2 Columns x 4 Rows Collapsible List Model -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 items-start">
            ${[valuesList.slice(0, 4), valuesList.slice(4, 8)]
              .map(
                (colItems: any[], colIdx: number) => `
              <div class="space-y-3 reveal-stagger-cascade">
                ${colItems
                  .map((item: any, localIdx: number) => {
                    const globalIdx = colIdx * 4 + localIdx;
                    const isExpanded = this.expandedValueIndices.has(globalIdx);
                    const code = item.id || String(globalIdx + 1).padStart(2, '0');
                    return `
                      <div
                        class="value-list-item rounded-2xl border transition-all duration-200 overflow-hidden ${
                          isExpanded
                            ? 'bg-osan-light/35 border-osan-blue/45 shadow-subtle'
                            : 'bg-white border-osan-sky/80 hover:border-osan-blue/35 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.03)]'
                        }"
                        data-value-item="${globalIdx}"
                      >
                        <button
                          type="button"
                          class="value-row-toggle w-full px-4 sm:px-5 py-3.5 flex items-center justify-between gap-3 text-start cursor-pointer group"
                          data-value-index="${globalIdx}"
                          aria-expanded="${isExpanded}"
                        >
                          <div class="flex items-center gap-3 min-w-0">
                            <span class="text-xs font-heading font-normal text-osan-blue bg-osan-blue/10 px-2 py-0.5 rounded-md shrink-0">
                              ${code}
                            </span>
                            <span class="text-sm sm:text-[15px] font-heading font-normal text-osan-ink group-hover:text-osan-blue transition-colors truncate">
                              ${item.name}
                            </span>
                          </div>
                          <span class="w-6 h-6 rounded-full bg-osan-light/80 group-hover:bg-osan-sky/70 text-osan-grey group-hover:text-osan-blue flex items-center justify-center shrink-0 transition-colors">
                            <svg class="value-row-chevron w-3.5 h-3.5 transition-transform duration-200 ${isExpanded ? 'rotate-180 text-osan-blue' : ''}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M19 9l-7 7-7-7"/>
                            </svg>
                          </span>
                        </button>

                        <div class="value-row-panel grid transition-[grid-template-rows] duration-300 ease-out ${isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}">
                          <div class="overflow-hidden">
                            <div class="px-4 sm:px-5 pb-3.5 pt-2 border-t border-osan-sky/50 text-xs sm:text-[13px] text-osan-grey font-light leading-relaxed">
                              ${item.desc}
                            </div>
                          </div>
                        </div>
                      </div>
                    `;
                  })
                  .join('')}
              </div>
            `
              )
              .join('')}
          </div>

        </div>
      </section>
    `;

    this.bindEvents(valuesList.length);
    this.startTypewriter(isAr);
  }

  private bindEvents(totalValues: number): void {
    const rowButtons = this.container.querySelectorAll<HTMLButtonElement>('.value-row-toggle');
    rowButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-value-index') || '0', 10);
        if (this.expandedValueIndices.has(idx)) {
          this.expandedValueIndices.delete(idx);
        } else {
          this.expandedValueIndices.add(idx);
        }
        this.syncValuesUI(totalValues);
      });
    });

    this.container.querySelector('#toggle-all-values-btn')?.addEventListener('click', () => {
      if (this.expandedValueIndices.size === totalValues && totalValues > 0) {
        this.expandedValueIndices.clear();
      } else {
        for (let i = 0; i < totalValues; i++) {
          this.expandedValueIndices.add(i);
        }
      }
      this.syncValuesUI(totalValues);
    });
  }

  private syncValuesUI(totalValues: number): void {
    const isAr = i18n.isRTL();
    const items = this.container.querySelectorAll<HTMLElement>('.value-list-item');
    items.forEach((itemEl) => {
      const idx = parseInt(itemEl.getAttribute('data-value-item') || '0', 10);
      const isExpanded = this.expandedValueIndices.has(idx);
      const btn = itemEl.querySelector<HTMLButtonElement>('.value-row-toggle');
      const chevron = itemEl.querySelector<SVGElement>('.value-row-chevron');
      const panel = itemEl.querySelector<HTMLElement>('.value-row-panel');

      itemEl.classList.toggle('bg-osan-light/35', isExpanded);
      itemEl.classList.toggle('border-osan-blue/45', isExpanded);
      itemEl.classList.toggle('shadow-subtle', isExpanded);
      itemEl.classList.toggle('bg-white', !isExpanded);
      itemEl.classList.toggle('border-osan-sky/80', !isExpanded);

      btn?.setAttribute('aria-expanded', String(isExpanded));
      chevron?.classList.toggle('rotate-180', isExpanded);
      chevron?.classList.toggle('text-osan-blue', isExpanded);
      panel?.classList.toggle('grid-rows-[1fr]', isExpanded);
      panel?.classList.toggle('grid-rows-[0fr]', !isExpanded);
    });

    const allExpanded = this.expandedValueIndices.size === totalValues && totalValues > 0;
    const labelEl = this.container.querySelector('#toggle-all-values-label');
    const iconEl = this.container.querySelector('#toggle-all-values-icon');
    if (labelEl) {
      labelEl.textContent = allExpanded
        ? (isAr ? 'طي الكل' : 'Collapse All')
        : (isAr ? 'عرض الكل' : 'View All');
    }
    iconEl?.classList.toggle('rotate-180', allExpanded);
  }

  private clearTypewriter(): void {
    if (this.typewriterTimer !== null) {
      window.clearTimeout(this.typewriterTimer);
      this.typewriterTimer = null;
    }
  }

  private startTypewriter(isAr: boolean): void {
    const target = this.container.querySelector<HTMLElement>('#mission-typewriter-text');
    if (!target) return;

    const services = isAr
      ? [
          'تأسيس الأعمال والاستثمار الأجنبي',
          'التدقيق والضرائب والاستشارات المالية',
          'مراكز الخدمات والعلاقات الحكومية',
          'الإدارة والتطوير والتسويق العقاري',
          'مراكز الأعمال والمكاتب المشتركة',
          'التسويق الرقمي والإنتاج الإعلامي',
          'التخليص الجمركي والحلول اللوجستية',
          'السفر والسياحة ورحلات الأعمال',
          'الضيافة والمقاهي المختصة',
          'إدارة الاستثمارات والشراكات الاستراتيجية',
        ]
      : [
          'Business Setup & FDI Structuring',
          'Statutory Auditing & Tax Advisory',
          'Government Liaison & PRO Services',
          'Real Estate Management & Brokerage',
          'Serviced Offices & Coworking',
          'Creative Media & Brand Strategy',
          'Customs Clearance & Freight Brokerage',
          'Corporate Mobility & Tourism',
          'Specialty Hospitality & Roastery',
          'Strategic Holding & Ventures',
        ];

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      target.textContent = services[0];
      return;
    }

    let serviceIdx = 0;
    let charIdx = 0;
    let isDeleting = false;

    const tick = () => {
      const current = services[serviceIdx];

      if (!isDeleting) {
        charIdx = Math.min(charIdx + 1, current.length);
        target.textContent = current.slice(0, charIdx);

        if (charIdx === current.length) {
          isDeleting = true;
          this.typewriterTimer = window.setTimeout(tick, 1700);
          return;
        }
        this.typewriterTimer = window.setTimeout(tick, 44 + Math.floor(Math.random() * 24));
      } else {
        charIdx = Math.max(charIdx - 1, 0);
        target.textContent = current.slice(0, charIdx);

        if (charIdx === 0) {
          isDeleting = false;
          serviceIdx = (serviceIdx + 1) % services.length;
          this.typewriterTimer = window.setTimeout(tick, 280);
          return;
        }
        this.typewriterTimer = window.setTimeout(tick, 24);
      }
    };

    this.typewriterTimer = window.setTimeout(tick, 320);
  }

  public destroy(): void {
    this.clearTypewriter();
    if (this.unsubscribeI18n) {
      this.unsubscribeI18n();
      this.unsubscribeI18n = null;
    }
  }
}
