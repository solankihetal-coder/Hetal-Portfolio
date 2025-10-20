// ===============================
// 1. Smooth Scroll for Anchor Links
// ===============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  // ===============================
  // 2. Project Filtering
  // ===============================
    const projectFilterButtons = document.querySelectorAll('.project-filters .filter-btn');
    const projectCards = document.querySelectorAll('.project-grid .project-card');
    const allProjectsButton = document.querySelector('.project-filters .filter-btn[data-category="all"]');

// Initially: All projects visible & All button active
projectCards.forEach(card => (card.style.display = 'flex'));
if (allProjectsButton) allProjectsButton.classList.add('active');

projectFilterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const selectedCategory = button.dataset.category;

    // Update active button state
    projectFilterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    // Show/Hide cards
    projectCards.forEach(card => {
      const cardCategory = card.dataset.category;

      if (selectedCategory === 'all' || cardCategory === selectedCategory) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

  // ===============================
  // 3. Skill Filtering + Progress Bars
  // ===============================
  const skillFilterButtons = document.querySelectorAll('.skill-filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  const animateProgressBars = (category) => {
    skillCards.forEach(card => {
      if (card.classList.contains(`${category}-skill`) && !card.classList.contains('hidden')) {
        const progressBar = card.querySelector('.progress-bar');
        const percentage = parseInt(card.querySelector('.skill-percentage').textContent);
        progressBar.style.width = '0%';
        setTimeout(() => {
          progressBar.style.width = `${percentage}%`;
        }, 50);
      }
    });
  };

  skillFilterButtons.forEach(button => {
    button.addEventListener('click', () => {
      skillFilterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const category = button.dataset.category;

      skillCards.forEach(card => {
        card.classList.toggle('hidden', !card.classList.contains(`${category}-skill`));
      });

      animateProgressBars(category);
    });
  });

  // Trigger initial skill filter
  const initialSkillButton = document.querySelector('.skill-filter-btn.active');
  if (initialSkillButton) initialSkillButton.click();

  // ===============================
  // 4. Contact Form Character Counter
  // ===============================
  const messageInput = document.getElementById('message');
  const currentCharSpan = document.getElementById('current-char');

  if (messageInput && currentCharSpan) {
    messageInput.addEventListener('input', () => {
      currentCharSpan.textContent = messageInput.value.length;
    });
  }

  // ===============================
  // 5. Scroll Spy (Navbar Highlight on Scroll)
  // ===============================
  const sections = document.querySelectorAll('main[id], section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 150; // offset for navbar height
      if (window.scrollY >= sectionTop) current = section.getAttribute('id');
    });

    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  });

  // ===============================
  // 6. Typing Effect Animation
  // ===============================
  const textElement = document.querySelector('.typing-text');
  const phrases = ["Frontend Developer", "UI/UX Designer"];
  let phraseIndex = 0;
  let charIndex = 0;

  function type() {
    const currentPhrase = phrases[phraseIndex];
    if (charIndex < currentPhrase.length) {
      textElement.textContent += currentPhrase.charAt(charIndex);
      charIndex++;
      setTimeout(type, 100); // Typing speed
    } else {
      setTimeout(erase, 1500); // Wait after typing before erasing
    }
  }

  function erase() {
    const currentPhrase = phrases[phraseIndex];
    if (charIndex > 0) {
      textElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      setTimeout(erase, 50); // Erasing speed
    } else {
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(type, 500); // Wait after erasing before typing the next phrase
    }
  }

  // Start the animation only once the DOM is fully loaded
  setTimeout(type, 500);
});

  // ===============================
  // 8. Theme Toggle (Light <-> Dark)
  // ===============================
  const themeToggleBtn = document.getElementById('theme-toggle');
  const currentTheme = localStorage.getItem('theme');

  if (currentTheme === 'dark') {
    document.body.classList.add('dark-theme');
    themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
  }

  themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    themeToggleBtn.innerHTML = isDark
      ? '<i class="fas fa-sun"></i>'
      : '<i class="fas fa-moon"></i>';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });

// ===============================
// 9. Responsive Navbar (Hamburger Menu)
// ===============================
document.addEventListener('DOMContentLoaded', () => {
    // Get the elements
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = navMenu.querySelectorAll('.nav-link');

    /**
     * Toggles the 'open' class on the navigation menu.
     * This class will be used by CSS to show/hide the menu.
     */
    const toggleMenu = () => {
        navMenu.classList.toggle('open');
        // Optional: Toggle an 'is-active' class on the button itself for animation
        hamburger.classList.toggle('is-active');
    };

    /**
     * Closes the navigation menu by removing the 'open' and 'is-active' classes.
     */
    const closeMenu = () => {
        navMenu.classList.remove('open');
        hamburger.classList.remove('is-active');
    };

    // 1. Event listener for the Hamburger Button
    hamburger.addEventListener('click', toggleMenu);

    // 2. Event listener for all navigation links (to close the menu after selection on mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
});


// const navbarTogggle=document.querySelector('.hamburger');
// const navMenu=document.querySelector('.nav-menu');

// navbarTogggle.addEventListener('click',()=>{
//   navbarTogggle,classList.toggle('active');
//   navMenu.classList.toggle('active')
// });