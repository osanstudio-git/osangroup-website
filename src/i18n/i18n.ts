import enData from './en.json';
import arData from './ar.json';

export type Language = 'en' | 'ar';

export type TranslationDictionary = typeof enData;

class I18nManager {
  private currentLang: Language = 'ar';
  private dictionaries: Record<Language, any> = {
    en: enData,
    ar: arData,
  };
  private listeners: Set<(lang: Language) => void> = new Set();

  constructor() {
    // Check localStorage or default to Arabic
    const saved = localStorage.getItem('osan_group_lang') as Language | null;
    if (saved === 'en' || saved === 'ar') {
      this.currentLang = saved;
    } else {
      this.currentLang = 'ar';
    }
    this.applyDocumentAttributes();
  }

  public getLanguage(): Language {
    return this.currentLang;
  }

  public isRTL(): boolean {
    return this.currentLang === 'ar';
  }

  public setLanguage(lang: Language): void {
    if (this.currentLang === lang) return;
    this.currentLang = lang;
    localStorage.setItem('osan_group_lang', lang);
    this.applyDocumentAttributes();
    this.notifyListeners();
  }

  public toggleLanguage(): Language {
    const next = this.currentLang === 'en' ? 'ar' : 'en';
    this.setLanguage(next);
    return next;
  }

  public t(path: string, fallback: string = ''): string {
    const dict = this.dictionaries[this.currentLang];
    const parts = path.split('.');
    let cur: any = dict;

    for (const part of parts) {
      if (cur === undefined || cur === null) return fallback || path;
      cur = cur[part];
    }

    if (typeof cur === 'string') return cur;
    if (cur !== undefined && cur !== null) return cur;
    return fallback || path;
  }

  public getDict(): any {
    return this.dictionaries[this.currentLang];
  }

  public onLanguageChange(fn: (lang: Language) => void): () => void {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  private applyDocumentAttributes(): void {
    const isArabic = this.currentLang === 'ar';
    const html = document.documentElement;
    html.lang = this.currentLang;
    html.dir = isArabic ? 'rtl' : 'ltr';

    if (isArabic) {
      html.classList.add('rtl');
      html.classList.remove('ltr');
      document.title = 'مجموعة أوسان | OSAN GROUP — مسقط، سلطنة عُمان';
    } else {
      html.classList.add('ltr');
      html.classList.remove('rtl');
      document.title = 'OSAN GROUP | Group of Companies — Muscat, Sultanate of Oman';
    }
  }

  private notifyListeners(): void {
    this.listeners.forEach((fn) => {
      try {
        fn(this.currentLang);
      } catch (err) {
        console.error('Error in i18n listener:', err);
      }
    });
  }
}

export const i18n = new I18nManager();
export default i18n;

