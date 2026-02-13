/* =====================================================
   PORTFOLIO WEBSITE - MAIN JAVASCRIPT
   Structured & Optimized Version
===================================================== */

// =====================================================
// CONFIGURATION & CONSTANTS
// =====================================================
const CONFIG = {
  projectDefaultCategory: 'design',
  typingSpeed: 100,
  erasingSpeed: 50,
  typingPauseDuration: 1500,
  nextPhrasePauseDuration: 500,
  scrollThreshold: 0.15,
  staggerDelay: 150,
  tiltIntensity: 40,
  scrollOffset: 150
};

const TYPING_PHRASES = ['UI/UX Designer', 'Frontend Developer'];

// =====================================================
// UTILITY FUNCTIONS
// =====================================================
const Utils = {
  /**
   * Smooth scroll to target element
   */
  smoothScrollTo(target) {
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  },

  /**
   * Toggle class on elements
   */
  toggleClass(elements, className, condition) {
    elements.forEach(el => {
      el.classList.toggle(className, condition);
    });
  },

  /**
   * Remove class from all elements
   */
  removeClass(elements, className) {
    elements.forEach(el => el.classList.remove(className));
  },

  /**
   * Add class to element
   */
  addClass(element, className) {
    element?.classList.add(className);
  }
};

// =====================================================
// THEME MANAGER
// =====================================================
const ThemeManager = {
  init() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (!themeToggleBtn) return;

    // Apply saved theme
    this.applySavedTheme(themeToggleBtn);

    // Handle theme toggle
    themeToggleBtn.addEventListener('click', () => this.toggleTheme(themeToggleBtn));
  },

  applySavedTheme(button) {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-theme');
      button.innerHTML = '<i class="fas fa-sun"></i>';
    }
  },

  toggleTheme(button) {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');

    button.innerHTML = isDark
      ? '<i class="fas fa-sun"></i>'
      : '<i class="fas fa-moon"></i>';

    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }
};

// =====================================================
// SMOOTH SCROLL HANDLER
// =====================================================
const SmoothScroll = {
  init() {
    const anchors = document.querySelectorAll('a[href^="#"]');
    
    anchors.forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = anchor.getAttribute('href');
        const target = document.querySelector(targetId);
        Utils.smoothScrollTo(target);
      });
    });
  }
};

// =====================================================
// PROJECT FILTER
// =====================================================
const ProjectFilter = {
  init() {
    this.buttons = document.querySelectorAll('.project-filters .filter-btn');
    this.cards = document.querySelectorAll('.project-grid .project-card');
    
    if (!this.buttons.length || !this.cards.length) return;

    this.setupEventListeners();
    this.setDefaultFilter();
  },

  setupEventListeners() {
    this.buttons.forEach(btn => {
      btn.addEventListener('click', () => this.handleFilterClick(btn));
    });
  },

  handleFilterClick(activeBtn) {
    Utils.removeClass(this.buttons, 'active');
    Utils.addClass(activeBtn, 'active');
    this.filterProjects(activeBtn.dataset.category);
  },

  filterProjects(category) {
    this.cards.forEach(card => {
      const shouldShow = category === 'all' || card.dataset.category === category;
      card.style.display = shouldShow ? 'flex' : 'none';
    });
  },

  setDefaultFilter() {
    const defaultBtn = Array.from(this.buttons).find(
      btn => btn.dataset.category === CONFIG.projectDefaultCategory
    );
    
    if (defaultBtn) {
      Utils.addClass(defaultBtn, 'active');
      this.filterProjects(CONFIG.projectDefaultCategory);
    }
  }
};

// =====================================================
// SKILL FILTER WITH ANIMATED PROGRESS BARS
// =====================================================
const SkillFilter = {
  init() {
    this.buttons = document.querySelectorAll('.skill-filter-btn');
    this.cards = document.querySelectorAll('.skill-card');
    
    if (!this.buttons.length || !this.cards.length) return;

    this.setupEventListeners();
    this.triggerDefaultFilter();
  },

  setupEventListeners() {
    this.buttons.forEach(btn => {
      btn.addEventListener('click', () => this.handleFilterClick(btn));
    });
  },

  handleFilterClick(activeBtn) {
    Utils.removeClass(this.buttons, 'active');
    Utils.addClass(activeBtn, 'active');

    const category = activeBtn.dataset.category;
    this.filterSkills(category);
    this.animateProgressBars(category);
  },

  filterSkills(category) {
    this.cards.forEach(card => {
      const shouldHide = !card.classList.contains(`${category}-skill`);
      card.classList.toggle('hidden', shouldHide);
    });
  },

  animateProgressBars(category) {
    this.cards.forEach(card => {
      if (card.classList.contains(`${category}-skill`) && !card.classList.contains('hidden')) {
        const bar = card.querySelector('.progress-bar');
        const percentageEl = card.querySelector('.skill-percentage');
        
        if (bar && percentageEl) {
          const percent = parseInt(percentageEl.textContent) || 0;
          bar.style.width = '0%';
          setTimeout(() => {
            bar.style.width = `${percent}%`;
          }, 50);
        }
      }
    });
  },

  triggerDefaultFilter() {
    const activeBtn = document.querySelector('.skill-filter-btn.active');
    activeBtn?.click();
  }
};

// =====================================================
// CONTACT FORM CHARACTER COUNTER
// =====================================================
const CharacterCounter = {
  init() {
    const messageInput = document.getElementById('message');
    const charCount = document.getElementById('current-char');

    if (!messageInput || !charCount) return;

    messageInput.addEventListener('input', () => {
      charCount.textContent = messageInput.value.length;
    });
  }
};

// =====================================================
// NAVIGATION SCROLL SPY
// =====================================================
const ScrollSpy = {
  init() {
    this.sections = document.querySelectorAll('section[id]');
    this.navLinks = document.querySelectorAll('.nav-link');

    if (!this.sections.length || !this.navLinks.length) return;

    window.addEventListener('scroll', () => this.updateActiveLink());
  },

  updateActiveLink() {
    let currentSection = '';

    this.sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - CONFIG.scrollOffset) {
        currentSection = section.id;
      }
    });

    this.navLinks.forEach(link => {
      const isActive = link.getAttribute('href') === `#${currentSection}`;
      link.classList.toggle('active', isActive);
    });
  }
};

// =====================================================
// TYPING EFFECT
// =====================================================
const TypingEffect = {
  init() {
    this.textElement = document.querySelector('.typing-text');
    if (!this.textElement) return;

    this.phraseIndex = 0;
    this.charIndex = 0;
    this.phrases = TYPING_PHRASES;

    setTimeout(() => this.type(), CONFIG.nextPhrasePauseDuration);
  },

  type() {
    const phrase = this.phrases[this.phraseIndex];
    
    if (this.charIndex < phrase.length) {
      this.textElement.textContent += phrase.charAt(this.charIndex++);
      setTimeout(() => this.type(), CONFIG.typingSpeed);
    } else {
      setTimeout(() => this.erase(), CONFIG.typingPauseDuration);
    }
  },

  erase() {
    const phrase = this.phrases[this.phraseIndex];
    
    if (this.charIndex > 0) {
      this.textElement.textContent = phrase.substring(0, --this.charIndex);
      setTimeout(() => this.erase(), CONFIG.erasingSpeed);
    } else {
      this.phraseIndex = (this.phraseIndex + 1) % this.phrases.length;
      setTimeout(() => this.type(), CONFIG.nextPhrasePauseDuration);
    }
  }
};

// =====================================================
// HAMBURGER MENU
// =====================================================
const HamburgerMenu = {
  init() {
    this.hamburger = document.getElementById('hamburger');
    this.navMenu = document.getElementById('nav-menu');

    if (!this.hamburger || !this.navMenu) return;

    this.navLinks = this.navMenu.querySelectorAll('.nav-link');
    this.setupEventListeners();
  },

  setupEventListeners() {
    this.hamburger.addEventListener('click', () => this.toggleMenu());
    
    this.navLinks.forEach(link => {
      link.addEventListener('click', () => this.closeMenu());
    });
  },

  toggleMenu() {
    this.navMenu.classList.toggle('open');
    this.hamburger.classList.toggle('is-active');
  },

  closeMenu() {
    this.navMenu.classList.remove('open');
    this.hamburger.classList.remove('is-active');
  }
};

// =====================================================
// SECTION REVEAL ANIMATION
// =====================================================
const SectionReveal = {
  init() {
    this.sections = document.querySelectorAll('section, .hero-section');
    if (!this.sections.length) return;

    this.setupObserver();
  },

  setupObserver() {
    const observer = new IntersectionObserver(
      (entries) => this.handleIntersection(entries),
      { threshold: CONFIG.scrollThreshold }
    );

    this.sections.forEach(section => {
      section.classList.add('reveal');
      observer.observe(section);
    });
  },

  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal', 'active');
        this.staggerChildren(entry.target);
      }
    });
  },

  staggerChildren(element) {
    const staggerElements = element.querySelectorAll('.stagger');
    staggerElements.forEach((el, index) => {
      el.style.transitionDelay = `${index * CONFIG.staggerDelay}ms`;
    });
  }
};

// =====================================================
// 3D TILT EFFECT
// =====================================================
const TiltEffect = {
  init() {
    this.cards = document.querySelectorAll('.software-card');
    if (!this.cards.length) return;

    this.setupEventListeners();
  },

  setupEventListeners() {
    this.cards.forEach(card => {
      card.addEventListener('mousemove', (e) => this.handleMouseMove(e, card));
      card.addEventListener('mouseleave', () => this.handleMouseLeave(card));
    });
  },

  handleMouseMove(event, card) {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const rotateX = (y - rect.height / 2) / CONFIG.tiltIntensity;
    const rotateY = (rect.width / 2 - x) / CONFIG.tiltIntensity;

    card.style.transform = 
      `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  },

  handleMouseLeave(card) {
    card.style.transform = 
      'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1.02)';
  }
};

// =====================================================
// STACKED CARD SCROLL EFFECT
// =====================================================
const StackedCardScroll = {
  init() {
    this.cards = document.querySelectorAll('.project-card');
    if (!this.cards.length) return;

    window.addEventListener('scroll', () => this.handleScroll());
  },

  handleScroll() {
    const windowHeight = window.innerHeight;

    this.cards.forEach((card, index) => {
      const rect = card.getBoundingClientRect();
      const progress = 1 - rect.top / windowHeight;

      if (progress > 0) {
        this.applyCardTransform(card, index, progress);
      }
    });
  },

  applyCardTransform(card, index, progress) {
    const translateY = index * 30;
    // const scale = 1 - (index * 0.01);

    card.style.transform = `translateY(${translateY}px) scale(${scale})`;
    card.style.zIndex = Math.floor(progress / 1000);
    card.style.opacity = 1;
  }
};

// =====================================================
// APPLICATION INITIALIZATION
// =====================================================
const App = {
  init() {
    // Initialize theme first (can run before DOM ready)
    ThemeManager.init();

    // Initialize all components when DOM is ready
    document.addEventListener('DOMContentLoaded', () => {
      this.initializeComponents();
    });
  },

  initializeComponents() {
    // Navigation & Scroll
    SmoothScroll.init();
    ScrollSpy.init();
    HamburgerMenu.init();

    // Filters
    ProjectFilter.init();
    SkillFilter.init();

    // Effects & Animations
    TypingEffect.init();
    SectionReveal.init();
    TiltEffect.init();
    StackedCardScroll.init();

    // Form
    CharacterCounter.init();

    console.log('✅ Portfolio website initialized successfully');
  }
};

// =====================================================
// START APPLICATION
// =====================================================
App.init();
