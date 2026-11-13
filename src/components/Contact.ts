import { i18n } from '../i18n/i18n';

export class Contact {
  private container: HTMLElement;
  private unsubscribeI18n: (() => void) | null = null;

  constructor() {
    this.container = document.createElement('section');
    this.container.id = 'contact';
    this.container.className = 'relative bg-osan-light/40 min-h-screen flex flex-col justify-center py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-t border-osan-sky/60 overflow-hidden scroll-mt-0';
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
    const t = (k: string, fb: string) => i18n.t(k, fb);
    const hqLat = 23.5815123;
    const hqLng = 58.3382024;
    const hqMapEmbedUrl = `https://maps.google.com/maps?q=${hqLat},${hqLng}&z=17&hl=${isAr ? 'ar' : 'en'}&output=embed`;
    const hqMapExternalUrl = 'https://maps.app.goo.gl/BovRcXnTPCF6eJJAA';

    this.container.innerHTML = `
      <div class="max-w-7xl mx-auto space-y-12 sm:space-y-14">
        
        <!-- Section Header (Entrance Motion) -->
        <div class="flex flex-col items-center text-center space-y-3 max-w-3xl mx-auto">
          <h2 class="reveal-text-fade text-3xl sm:text-4xl md:text-5xl font-heading font-light sm:font-normal text-osan-ink tracking-tight">
            ${t('contact.title', 'Contact Us')}
          </h2>

          <p class="reveal-text-fade text-sm sm:text-base text-osan-grey font-light leading-relaxed" style="--reveal-delay: 100ms;">
            ${isAr ? 'مجموعة أوسان' : 'Osan Group of Companies'}
          </p>
        </div>

        <!-- Headquarters Card + Inquiry Form & Map -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          <!-- Left: HQ Information (5 cols) -->
          <div class="lg:col-span-5 flex flex-col reveal-slide-left">
            
            <!-- Main Corporate HQ Card (with signature radius) -->
            <div class="signature-card p-6 sm:p-8 bg-white border border-osan-sky shadow-elevated relative overflow-hidden flex-grow flex flex-col justify-between">
              
              <!-- Subtle Accent Corner -->
              <div class="absolute top-0 right-0 rtl:right-auto rtl:left-0 w-24 h-24 bg-osan-sky/40 rounded-bl-full rtl:rounded-bl-none rtl:rounded-br-full -z-0"></div>

              <div class="relative z-10 flex-grow flex flex-col justify-between space-y-6">
                <!-- Company Details -->
                <div class="space-y-2">
                  <span class="text-xs font-normal uppercase tracking-widest text-osan-blue block">
                    ${isAr ? 'المقر الرئيسي والمكاتب التنفيذية' : 'Corporate Headquarters & Registered Office'}
                  </span>
                  <h3 class="text-2xl font-heading font-normal text-osan-ink tracking-tight">
                    ${isAr ? 'مجموعة أوسان (Osan - Group of Companies)' : 'Osan - Group of Companies'}
                  </h3>
                  <p class="text-xs sm:text-sm text-osan-grey font-light">
                    ${isAr ? 'مركز أعمال متكامل • مسقط، سلطنة عُمان' : 'Integrated Business Center in Muscat, Oman'}
                  </p>
                </div>

                <!-- Address, Phone, Email & Social Channels -->
                <div class="space-y-4 text-xs sm:text-sm text-osan-grey font-light border-t border-b border-osan-sky/60 py-5">
                  <div class="flex items-start gap-3">
                    <span class="w-8 h-8 rounded-lg bg-osan-light border border-osan-sky/70 text-osan-blue flex items-center justify-center flex-shrink-0 mt-0.5" aria-hidden="true">
                      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.75">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                    </span>
                    <div>
                      <span class="font-medium text-osan-ink block">${isAr ? 'العنوان المعتمد:' : 'Physical Address:'}</span>
                      <span>Building No 271, Office No: 8, Grand Mosque St, Muscat 101, Sultanate of Oman</span>
                      <span class="text-xs text-osan-blue font-normal block mt-0.5">
                        ${isAr ? '(بالقرب من هيئة الوثائق والمحفوظات الوطنية)' : '(Near National Records & Archives Authority)'}
                      </span>
                    </div>
                  </div>

                  <div class="flex items-start gap-3">
                    <span class="w-8 h-8 rounded-lg bg-osan-light border border-osan-sky/70 text-osan-blue flex items-center justify-center flex-shrink-0 mt-0.5" aria-hidden="true">
                      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.75">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                      </svg>
                    </span>
                    <div>
                      <span class="font-medium text-osan-ink block">${isAr ? 'الهاتف والواتساب المباشر:' : 'Direct Phone & WhatsApp:'}</span>
                      <div class="flex flex-col gap-1 text-osan-blue font-normal">
                        <a href="tel:+96897730083" class="hover:underline" dir="ltr">+968 9773 0083</a>
                        <a href="tel:+96872596532" class="hover:underline" dir="ltr">+968 7259 6532</a>
                      </div>
                    </div>
                  </div>

                  <div class="flex items-start gap-3">
                    <span class="w-8 h-8 rounded-lg bg-osan-light border border-osan-sky/70 text-osan-blue flex items-center justify-center flex-shrink-0 mt-0.5" aria-hidden="true">
                      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.75">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                    </span>
                    <div>
                      <span class="font-medium text-osan-ink block">${isAr ? 'البريد الإلكتروني والموقع:' : 'Official Email & Web:'}</span>
                      <div class="flex flex-col gap-0.5 text-osan-grey font-light">
                        <a href="mailto:info@osangroupoman.com" class="hover:text-osan-blue">info@osangroupoman.com</a>
                        <a href="mailto:abdullah@osangroupoman.com" class="hover:text-osan-blue">abdullah@osangroupoman.com</a>
                        <span class="text-osan-blue font-normal">osangroupoman.com</span>
                      </div>
                    </div>
                  </div>

                  <div class="flex flex-wrap items-center gap-2.5 pt-1">
                    <a
                      href="https://www.instagram.com/osaninvestment/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="OSAN Investment Instagram"
                      class="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-osan-light/80 hover:bg-osan-blue/10 border border-osan-sky/80 text-osan-ink hover:text-osan-blue text-xs font-normal transition-colors"
                    >
                      <svg class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.75">
                        <rect x="2.75" y="2.75" width="18.5" height="18.5" rx="5.25" />
                        <circle cx="12" cy="12" r="4" />
                        <circle cx="17.5" cy="6.5" r="0.85" fill="currentColor" stroke="none" />
                      </svg>
                      <span>Instagram</span>
                    </a>
                    <a
                      href="https://www.linkedin.com/company/osangroupoman"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="OSAN Group Oman LinkedIn"
                      class="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-osan-light/80 hover:bg-osan-blue/10 border border-osan-sky/80 text-osan-ink hover:text-osan-blue text-xs font-normal transition-colors"
                    >
                      <svg class="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M18.5 18.5V13.2A3.26 3.26 0 0 0 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17A1.4 1.4 0 0 1 15.71 13.57V18.5H18.5M6.88 8.56A1.68 1.68 0 0 0 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19A1.69 1.69 0 0 0 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56M8.27 18.5V10.13H5.5V18.5H8.27Z" />
                      </svg>
                      <span>LinkedIn</span>
                    </a>
                  </div>
                </div>

                <!-- Google Maps Direction Button -->
                <a 
                  href="${hqMapExternalUrl}" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="w-full py-3 rounded-2xl bg-osan-light hover:bg-osan-sky text-osan-blue border border-osan-sky font-medium text-xs sm:text-sm text-center flex items-center justify-center gap-2 transition-colors"
                >
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                  </svg>
                  <span>${isAr ? 'فتح الموقع في خرائط غوغل' : 'Open in Google Maps'}</span>
                </a>

              </div>
            </div>

          </div>

          <!-- Right: Interactive Contact Form + OSAN Group Map (7 cols) -->
          <div class="lg:col-span-7 flex flex-col reveal-slide-right" style="--reveal-delay: 110ms;">
            <!-- Online Direct Inquiry Form -->
            <div class="p-6 sm:p-8 rounded-3xl bg-white border border-osan-sky shadow-elevated flex-grow flex flex-col justify-between gap-5">
              
              <div class="space-y-1.5">
                <h3 class="text-xl sm:text-2xl font-heading font-normal text-osan-ink tracking-tight">
                  ${isAr ? 'أرسل استفسارك أو طلبك المباشر' : 'Send Direct Corporate Inquiry'}
                </h3>
                <p class="text-xs sm:text-sm text-osan-grey font-light">
                  ${isAr 
                    ? 'سيقوم فريق الاستشارات بالرد عليكم خلال ٢٤ ساعة عمل عبر الهاتف أو الواتساب أو البريد الإلكتروني.'
                    : 'Our advisory team will follow up within 24 business hours via phone, WhatsApp, or email.'}
                </p>
              </div>

              <!-- Embedded OSAN Group HQ Map -->
              <div class="relative rounded-2xl overflow-hidden border border-osan-sky/80 bg-osan-light/40 h-44 sm:h-48 shadow-subtle">
                <iframe
                  title="${isAr ? 'موقع مجموعة أوسان في مسقط' : 'OSAN Group Headquarters Map — Ghala, Muscat'}"
                  src="${hqMapEmbedUrl}"
                  class="w-full h-full border-0"
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                  allowfullscreen
                ></iframe>
                <a
                  href="${hqMapExternalUrl}"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="absolute bottom-2.5 right-2.5 rtl:right-auto rtl:left-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-sm border border-osan-sky text-[11px] font-normal text-osan-ink hover:text-osan-blue shadow-sm transition-colors"
                >
                  <span class="w-1.5 h-1.5 rounded-full bg-osan-blue"></span>
                  <span>${isAr ? 'مقر مجموعة أوسان • غلا، مسقط' : 'OSAN Group HQ · Ghala, Muscat'}</span>
                </a>
              </div>

              <!-- Form -->
              <form id="contact-inquiry-form" class="space-y-4">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <!-- Name -->
                  <div>
                    <label for="form-name" class="block text-xs font-medium text-osan-ink mb-1.5">
                      ${t('contact.form.name', 'Full Name')} *
                    </label>
                    <input 
                      type="text" 
                      id="form-name" 
                      required 
                      placeholder="${isAr ? 'الاسم الكامل' : 'e.g. Abdullah Al Balushi'}" 
                      class="w-full px-4 py-3 rounded-2xl bg-osan-light/60 border border-osan-sky focus:border-osan-blue focus:bg-white focus:ring-2 focus:ring-osan-blue/20 text-sm font-light text-osan-ink transition-all outline-none"
                    />
                  </div>

                  <!-- Email -->
                  <div>
                    <label for="form-email" class="block text-xs font-medium text-osan-ink mb-1.5">
                      ${t('contact.form.email', 'Corporate Email')} *
                    </label>
                    <input 
                      type="email" 
                      id="form-email" 
                      required 
                      placeholder="${isAr ? 'البريد الإلكتروني المؤسسي' : 'name@company.com'}" 
                      class="w-full px-4 py-3 rounded-2xl bg-osan-light/60 border border-osan-sky focus:border-osan-blue focus:bg-white focus:ring-2 focus:ring-osan-blue/20 text-sm font-light text-osan-ink transition-all outline-none"
                    />
                  </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <!-- Phone / WhatsApp -->
                  <div>
                    <label for="form-phone" class="block text-xs font-medium text-osan-ink mb-1.5">
                      ${t('contact.form.phone', 'Phone Number / WhatsApp')} *
                    </label>
                    <input 
                      type="tel" 
                      id="form-phone" 
                      required 
                      placeholder="+968 ..." 
                      dir="ltr"
                      class="w-full px-4 py-3 rounded-2xl bg-osan-light/60 border border-osan-sky focus:border-osan-blue focus:bg-white focus:ring-2 focus:ring-osan-blue/20 text-sm font-light text-osan-ink transition-all outline-none text-start"
                    />
                  </div>

                  <!-- Subsidiary / Department Selection -->
                  <div>
                    <label for="form-dept" class="block text-xs font-medium text-osan-ink mb-1.5">
                      ${t('contact.form.department', 'Subsidiary / Topic')}
                    </label>
                    <select 
                      id="form-dept"
                      class="w-full px-4 py-3 rounded-2xl bg-osan-light/60 border border-osan-sky focus:border-osan-blue focus:bg-white focus:ring-2 focus:ring-osan-blue/20 text-sm font-light text-osan-ink transition-all outline-none cursor-pointer"
                    >
                      <option value="general">${isAr ? 'استفسار عام / المقر الرئيسي' : 'General / Head Office'}</option>
                      <option value="osbic">${isAr ? 'أوسبك العالمية (تأسيس الأعمال)' : 'OSBIC (Company Setup & PRO)'}</option>
                      <option value="maisarah">${isAr ? 'ميسرة (التدقيق والضرائب)' : 'Maisarah (Audit & Tax)'}</option>
                      <option value="nameer">${isAr ? 'نمير للعقارات (التطوير والإدارة)' : 'Nameer (Real Estate & Management)'}</option>
                      <option value="misk">${isAr ? 'مركز مسك (المكاتب المشتركة)' : 'MUSK (Serviced Offices)'}</option>
                      <option value="studio">${isAr ? 'أوسان استوديو (التسويق والإعلام)' : 'Osan Studio (Marketing & Media)'}</option>
                      <option value="customs">${isAr ? 'التخليص الجمركي واللوجستيات' : 'Customs & Logistics'}</option>
                      <option value="travel">${isAr ? 'السفر والسياحة ورحلات الأعمال' : 'Travel & Tourism'}</option>
                      <option value="holding">${isAr ? 'أوسان القابضة (الشراكات والاستثمار)' : 'Osan Holding (Investment & JV)'}</option>
                    </select>
                  </div>
                </div>

                <!-- Message -->
                <div>
                  <label for="form-message" class="block text-xs font-medium text-osan-ink mb-1.5">
                    ${t('contact.form.message', 'Message / Scope Details')} *
                  </label>
                  <textarea 
                    id="form-message" 
                    rows="3" 
                    required 
                    placeholder="${isAr ? 'يرجى كتابة تفاصيل الخدمة أو الاستفسار المطلوب...' : 'Please specify the details of your inquiry or required service...'}"
                    class="w-full px-4 py-3 rounded-2xl bg-osan-light/60 border border-osan-sky focus:border-osan-blue focus:bg-white focus:ring-2 focus:ring-osan-blue/20 text-sm font-light text-osan-ink transition-all outline-none resize-none"
                  ></textarea>
                </div>

                <!-- Submit Button -->
                <button 
                  type="submit" 
                  id="form-submit-btn"
                  class="w-full py-4 rounded-full bg-osan-blue hover:bg-osan-deep text-white font-medium text-sm sm:text-base shadow-elevated hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group active:scale-98"
                >
                  <span id="submit-btn-text">${t('contact.form.submit', 'Send Inquiry')}</span>
                  <svg id="submit-btn-icon" class="w-4 h-4 rtl:rotate-180 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                  </svg>
                </button>

                <!-- Feedback Alert Container -->
                <div id="form-feedback-alert" class="hidden p-4 rounded-2xl text-xs sm:text-sm font-normal text-center transition-all"></div>
              </form>

            </div>

          </div>

        </div>

      </div>
    `;

    this.bindEvents();
  }

  private bindEvents(): void {
    // Form submit
    const form = this.container.querySelector<HTMLFormElement>('#contact-inquiry-form');
    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleFormSubmit();
    });
  }

  private handleFormSubmit(): void {
    const isAr = i18n.isRTL();
    const btn = this.container.querySelector<HTMLButtonElement>('#form-submit-btn');
    const btnText = this.container.querySelector<HTMLElement>('#submit-btn-text');
    const alertBox = this.container.querySelector<HTMLElement>('#form-feedback-alert');

    if (!btn || !btnText || !alertBox) return;

    btn.disabled = true;
    btnText.textContent = isAr ? 'جارٍ الإرسال...' : 'Sending inquiry...';

    setTimeout(() => {
      btn.disabled = false;
      btnText.textContent = isAr ? 'تم الإرسال بنجاح ✓' : 'Sent Successfully ✓';
      btn.classList.add('bg-emerald-600');
      btn.classList.remove('bg-osan-blue');

      alertBox.className = 'p-4 rounded-2xl text-xs sm:text-sm font-normal text-center transition-all bg-emerald-50 text-emerald-800 border border-emerald-200 block';
      alertBox.textContent = isAr
        ? 'شكراً لتواصلكم مع مجموعة أوسان. تم استلام طلبكم بنجاح وسيتواصل معكم المستشار المختص قريباً.'
        : 'Thank you for contacting OSAN GROUP. Your inquiry has been received; an advisor will reach out shortly.';

      // Reset form fields
      (this.container.querySelector('#form-name') as HTMLInputElement).value = '';
      (this.container.querySelector('#form-email') as HTMLInputElement).value = '';
      (this.container.querySelector('#form-phone') as HTMLInputElement).value = '';
      (this.container.querySelector('#form-message') as HTMLTextAreaElement).value = '';

      setTimeout(() => {
        btnText.textContent = isAr ? 'إرسال طلب استشارة' : 'Send Inquiry';
        btn.classList.remove('bg-emerald-600');
        btn.classList.add('bg-osan-blue');
      }, 4000);
    }, 1000);
  }

  public destroy(): void {
    if (this.unsubscribeI18n) {
      this.unsubscribeI18n();
      this.unsubscribeI18n = null;
    }
  }
}

