import './styles/main.css';
import { initSmoothScroll } from './utils/lenis';
import { SectionPageScrollManager } from './utils/sectionPageScroll';
import { initRollingButtons } from './utils/rollingButtons';
import { initScrollParallax } from './utils/scrollParallax';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { BusinessSolutions } from './components/BusinessSolutions';
import { Companies } from './components/Companies';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  if (!app) return;

  // 1. Initialize Lenis Smooth Scroll
  initSmoothScroll();

  // 2. Instantiate and mount Sticky Navbar
  const navbar = new Navbar();
  app.appendChild(navbar.getElement());

  // 3. Create Main Content Wrapper
  const main = document.createElement('main');
  main.className = 'flex-grow';
  app.appendChild(main);

  // 4. Mount Hero & About Sections (#home -> #about)
  const heroComponent = new Hero();
  main.appendChild(heroComponent.getElement());

  // 5. Mount Leadership & Mission/Values Sections (#chairmans-word -> #mission)
  const aboutComponent = new About();
  main.appendChild(aboutComponent.getElement());

  // 6. Mount Business Solutions & Corporate Ecosystem (#business-solutions -> #ecosystem)
  const businessSolutionsComponent = new BusinessSolutions();
  main.appendChild(businessSolutionsComponent.getElement());

  // 7. Mount Companies Section (#companies)
  const companiesComponent = new Companies();
  main.appendChild(companiesComponent.getElement());

  // 7. Mount Contact Headquarters Section (#contact)
  const contactComponent = new Contact();
  main.appendChild(contactComponent.getElement());

  // 8. Mount Corporate Footer
  const footerComponent = new Footer();
  app.appendChild(footerComponent.getElement());

  // 9. Initialize Section-by-Section Page Scroll & Content Motion
  const pageScrollManager = new SectionPageScrollManager(navbar);
  (window as any).__pageScrollManager = pageScrollManager;

  // 10. Initialize Staggered Rolling-Text Button Animation
  initRollingButtons();

  // 11. Initialize Scroll-Linked Parallax Depth
  initScrollParallax();

  // If page loads with a specific hash (e.g. #about, #companies), smoothly land on it
  if (window.location.hash) {
    const targetId = window.location.hash.replace('#', '');
    setTimeout(() => {
      pageScrollManager.navigateToSection(targetId);
    }, 200);
  }
});
