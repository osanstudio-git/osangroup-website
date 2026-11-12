import { i18n } from '../i18n/i18n';
import { scrollToElement } from '../utils/lenis';

export class ICV {
  private container: HTMLElement;
  private unsubscribeI18n: (() => void) | null = null;

  constructor() {
    this.container = document.createElement('section');
    this.container.id = 'icv';
    this.container.className = 'relative bg-white py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-osan-sky/60 overflow-hidden';
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
    const dict = i18n.getDict();
    const pillars = dict?.icv?.pillars || [];

    this.container.innerHTML = `
      <div class="max-w-7xl mx-auto space-y-16">
        
        <!-- Header -->
        <div class="flex flex-col items-center text-center space-y-4 max-w-3xl mx-auto">
          <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-osan-sky/70 text-osan-blue text-xs sm:text-sm font-bold shadow-xs">
            <span class="w-2 h-2 rounded-full bg-osan-blue"></span>
            <span>${isAr ? 'القيمة المضافة المحلية • رؤية عُمان ٢٠٤٠' : 'In-Country Value (ICV) • Oman Vision 2040'}</span>
          </div>

          <h2 class="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-osan-ink tracking-tight">
            ${t('icv.title', 'In-Country Value (ICV)')}
          </h2>

          <p class="text-base sm:text-lg text-osan-grey leading-relaxed">
            ${t('icv.desc', 'At OSAN GROUP, In-Country Value (ICV) is a core national responsibility. In complete harmony with the strategic pillars of Oman Vision 2040, we channel resources, technology, and career progression into the Sultanate\'s economic ecosystem.')}
          </p>
        </div>

        <!-- 7 Pillars Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          ${pillars
            .map(
              (p: any, idx: number) => `
            <div class="group p-6 rounded-3xl bg-osan-light/50 border border-osan-sky/80 shadow-subtle hover:shadow-elevated hover:border-osan-blue/50 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between mb-4">
                  <span class="w-10 h-10 rounded-xl bg-white border border-osan-sky flex items-center justify-center font-heading font-black text-osan-blue text-sm shadow-xs group-hover:bg-osan-blue group-hover:text-white transition-colors">
                    0${idx + 1}
                  </span>
                  <span class="text-xs font-bold text-osan-grey group-hover:text-osan-blue transition-colors">
                    ${isAr ? 'ركيزة وطنية' : 'National Pillar'}
                  </span>
                </div>

                <h4 class="text-base sm:text-lg font-heading font-extrabold text-osan-ink mb-2 group-hover:text-osan-blue transition-colors">
                  ${p.name}
                </h4>

                <p class="text-xs sm:text-sm text-osan-grey leading-relaxed">
                  ${p.desc}
                </p>
              </div>

              <div class="mt-4 pt-3 border-t border-osan-sky/40 flex items-center justify-between text-[11px] font-semibold text-osan-grey/70">
                <span>OMAN ICV 2040</span>
                <span class="text-osan-blue font-bold">✓</span>
              </div>
            </div>
          `
            )
            .join('')}

          <!-- 8th Showcase Card: Oman Vision 2040 Highlight -->
          <div class="p-6 rounded-3xl bg-gradient-to-br from-osan-blue to-osan-deep text-white shadow-elevated flex flex-col justify-between">
            <div>
              <span class="text-xs font-bold uppercase tracking-wider text-osan-sky block mb-2">
                ${isAr ? 'الالتزام الوطني' : 'National Commitment'}
              </span>
              <h4 class="text-xl font-heading font-extrabold text-white mb-2">
                ${isAr ? 'رؤية عُمان ٢٠٤٠' : 'Oman Vision 2040'}
              </h4>
              <p class="text-xs sm:text-sm text-osan-sky/90 leading-relaxed">
                ${isAr
                  ? 'نسخر كافة إمكانيات شركات المجموعة لدعم التنويع الاقتصادي، تمكين الكفاءات العُمانية بنسبة تعمين تفوق ٦١٪، وتنشيط بيئة الاستثمار في السلطنة.'
                  : 'Channeling all subsidiary resources to support economic diversification, sustain 61%+ Omanization, and foster high-yield investment inflows across the Sultanate.'}
              </p>
            </div>

            <div class="pt-4 border-t border-white/20 flex items-center justify-between text-xs text-osan-sky">
              <span class="font-bold">61%+ Omanization</span>
              <span>100% Omani Conglomerate</span>
            </div>
          </div>
        </div>

      </div>
    `;
  }

  public destroy(): void {
    if (this.unsubscribeI18n) {
      this.unsubscribeI18n();
      this.unsubscribeI18n = null;
    }
  }
}

