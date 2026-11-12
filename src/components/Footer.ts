import { i18n } from '../i18n/i18n';
import { scrollToElement } from '../utils/lenis';

export class Footer {
  private container: HTMLElement;
  private unsubscribeI18n: (() => void) | null = null;

  constructor() {
    this.container = document.createElement('footer');
    this.container.className = 'bg-osan-ink text-white pt-20 pb-12 border-t border-osan-sky/20 overflow-hidden';
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

    this.container.innerHTML = `
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        <!-- Top Row: Brand & Mission -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-white/10">
          
          <!-- Brand Lockup (5 cols) -->
          <div class="lg:col-span-5 space-y-5">
            <div class="flex items-center gap-3.5">
              <div class="w-12 h-12 rounded-xl bg-white p-1 flex items-center justify-center border border-white/90 shadow-sm overflow-hidden">
                <img 
                  src="/logos/osan-logo.png" 
                  alt="${isAr ? 'شعار مجموعة أوسان' : 'OSAN GROUP Official Logo'}" 
                  class="w-full h-full object-contain"
                />
              </div>
              <div class="leading-tight">
                <span class="font-heading font-light sm:font-normal text-xl sm:text-2xl tracking-wide text-white block whitespace-nowrap">
                  OSAN <span class="text-osan-sky font-light sm:font-normal">GROUP</span>
                </span>
                <span class="text-[9px] sm:text-[10px] text-osan-sky/80 font-light tracking-[0.16em] uppercase block whitespace-nowrap mt-0.5">
                  ${isAr ? 'مجموعة شركات' : 'GROUP OF COMPANIES'}
                </span>
              </div>
            </div>

            <p class="text-sm font-light text-gray-400 leading-relaxed max-w-md">
              ${t('footer.tagline', 'OSAN GROUP — Building integrated ecosystems for business growth, investment success, and national development across the Sultanate of Oman.')}
            </p>
          </div>

          <!-- Quick Navigation Links (3 cols) -->
          <div class="lg:col-span-3 space-y-4">
            <h4 class="text-sm font-normal uppercase tracking-widest text-white">
              ${isAr ? 'روابط سريعة' : 'Quick Navigation'}
            </h4>
            <ul class="space-y-2.5 text-sm font-light text-gray-400">
              <li>
                <a href="#home" data-footer-nav="home" class="hover:text-osan-sky transition-colors flex items-center gap-1.5">
                  <span>→</span>
                  <span>${t('nav.home', 'Home')}</span>
                </a>
              </li>
              <li>
                <a href="#about" data-footer-nav="about" class="hover:text-osan-sky transition-colors flex items-center gap-1.5">
                  <span>→</span>
                  <span>${t('nav.about', 'About Us')}</span>
                </a>
              </li>
              <li>
                <a href="#companies" data-footer-nav="companies" class="hover:text-osan-sky transition-colors flex items-center gap-1.5">
                  <span>→</span>
                  <span>${t('nav.companies', 'Subsidiaries & Brands')}</span>
                </a>
              </li>
              <li>
                <a href="#contact" data-footer-nav="contact" class="hover:text-osan-sky transition-colors flex items-center gap-1.5">
                  <span>→</span>
                  <span>${t('nav.contact', 'Contact Head Office')}</span>
                </a>
              </li>
            </ul>
          </div>

          <!-- Muscat HQ & Registry Info (4 cols) -->
          <div class="lg:col-span-4 space-y-4">
            <h4 class="text-sm font-normal uppercase tracking-widest text-white">
              ${isAr ? 'المقر الرئيسي والاعتمادات' : 'Headquarters & Accreditation'}
            </h4>
            <div class="space-y-3 text-xs sm:text-sm font-light text-gray-400">
              <p class="leading-relaxed">
                <span class="text-white font-normal block">${isAr ? 'المقر الرئيسي:' : 'Registered Head Office:'}</span>
                Bldg No 271, Off No 8, Grand Mosque St, Ghala, Muscat 101, Sultanate of Oman
              </p>
              <p>
                <span class="text-white font-normal block">${isAr ? 'الاتصال المباشر:' : 'Direct Telephones:'}</span>
                <span dir="ltr">+968 9773 0083 / +968 7259 6532</span>
              </p>
              <p>
                <span class="text-white font-normal block">${isAr ? 'البريد الإلكتروني:' : 'Official Inquiries:'}</span>
                <a href="mailto:info@osangroupoman.com" class="text-osan-sky hover:underline">info@osangroupoman.com</a>
              </p>
            </div>
          </div>

        </div>

        <!-- Bottom Row: Copyright -->
        <div class="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-4 text-xs font-light text-gray-400">
          <p>
            ${t('footer.copyright', '© 2026 OSAN GROUP. All Rights Reserved.')}
          </p>
        </div>

      </div>
    `;

    this.bindEvents();
  }

  private bindEvents(): void {
    const navLinks = this.container.querySelectorAll<HTMLAnchorElement>('[data-footer-nav]');
    navLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('data-footer-nav');
        if (targetId) {
          const targetEl = document.getElementById(targetId);
          if (targetEl) {
            scrollToElement(targetEl, -76);
          }
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

