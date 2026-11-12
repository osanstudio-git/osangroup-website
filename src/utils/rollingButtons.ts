const ARABIC_REGEX = /[\u0600-\u06FF]/;
const BUTTON_SELECTOR = 'button, a#solutions-free-consultation-btn';

/**
 * Finds the label container inside a button if it has an icon alongside a text span,
 * or returns the button itself if it only holds text.
 */
function resolveTextHost(btn: HTMLElement): HTMLElement | null {
  if (btn.hasAttribute('data-no-rolling') || btn.hasAttribute('data-value-toggle')) {
    return null;
  }

  // Known dynamic label spans or single primary text span next to an icon/arrow
  const explicitLabel =
    btn.querySelector<HTMLElement>('#toggle-all-values-label, #submit-btn-text') ||
    btn.querySelector<HTMLElement>(':scope > span:not([aria-hidden="true"]):first-of-type');

  if (explicitLabel && explicitLabel.children.length === 0 && explicitLabel.textContent?.trim()) {
    return explicitLabel;
  }

  // Plain-text buttons (no child elements other than text nodes)
  if (btn.children.length === 0 && btn.textContent?.trim()) {
    return btn;
  }

  return null;
}

function buildLayer(tokens: string[], isClone: boolean, stepMultiplier: number): HTMLSpanElement {
  const layer = document.createElement('span');
  layer.className = isClone
    ? 'rolling-text-layer rolling-text-layer--clone'
    : 'rolling-text-layer';

  if (isClone) {
    layer.setAttribute('aria-hidden', 'true');
  }

  tokens.forEach((token, idx) => {
    const unit = document.createElement('span');
    unit.className = 'rolling-char';
    unit.style.setProperty('--char-index', String(Math.min(idx, 20) * stepMultiplier));
    unit.textContent = token === ' ' ? '\u00A0' : token;
    layer.appendChild(unit);
  });

  return layer;
}

function enhanceButton(btn: HTMLElement): void {
  const host = resolveTextHost(btn);
  if (!host) return;

  // Already enhanced and intact
  if (host.querySelector('.rolling-text-wrap')) return;

  const rawText = (host.textContent || '').replace(/\s+/g, ' ').trim();
  if (!rawText) return;

  btn.classList.add('rolling-btn');

  const isArabic = ARABIC_REGEX.test(rawText);
  // Keep Arabic ligatures connected by staggering per word; split Latin into characters
  const tokens = isArabic ? rawText.split(/(\s+)/) : Array.from(rawText);
  const stepMultiplier = isArabic ? 2 : 1;

  const wrap = document.createElement('span');
  wrap.className = 'rolling-text-wrap';
  wrap.setAttribute('dir', isArabic ? 'rtl' : 'ltr');

  wrap.appendChild(buildLayer(tokens, false, stepMultiplier));
  wrap.appendChild(buildLayer(tokens, true, stepMultiplier));

  host.textContent = '';
  host.appendChild(wrap);
}

export function applyRollingButtons(root: ParentNode = document): void {
  const buttons = root.querySelectorAll<HTMLElement>(BUTTON_SELECTOR);
  buttons.forEach(enhanceButton);
}

/**
 * Initializes staggered rolling-text hover animation on all buttons
 * and keeps dynamically re-rendered buttons (e.g., EN/AR switch, modals) enhanced.
 */
export function initRollingButtons(): void {
  applyRollingButtons(document);

  let scheduled = false;
  const observer = new MutationObserver(() => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      applyRollingButtons(document);
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

