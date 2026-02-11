/* =====================================================
   🔥 GLOBAL DOM READY
===================================================== */
document.addEventListener("DOMContentLoaded", () => {

  /* =====================================================
     1️⃣ SMOOTH SCROLL
  ===================================================== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", e => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute("href"));
      if (target) target.scrollIntoView({ behavior: "smooth" });
    });
  });

  /* =====================================================
     2️⃣ PROJECT FILTER
  ===================================================== */
  const projectButtons = document.querySelectorAll(".project-filters .filter-btn");
  const projectCards = document.querySelectorAll(".project-grid .project-card");
  const defaultCategory = "design";

  function filterProjects(category){
    projectCards.forEach(card=>{
      card.style.display =
        (category === "all" || card.dataset.category === category)
        ? "flex"
        : "none";
    });
  }

  projectButtons.forEach(btn=>{
    btn.classList.toggle("active", btn.dataset.category === defaultCategory);

    btn.addEventListener("click", ()=>{
      projectButtons.forEach(b=>b.classList.remove("active"));
      btn.classList.add("active");
      filterProjects(btn.dataset.category);
    });
  });

  filterProjects(defaultCategory);

  /* =====================================================
     3️⃣ SKILL FILTER + PROGRESS BAR
  ===================================================== */
  const skillButtons = document.querySelectorAll(".skill-filter-btn");
  const skillCards = document.querySelectorAll(".skill-card");

  const animateBars = (category)=>{
    skillCards.forEach(card=>{
      if(card.classList.contains(`${category}-skill`) && !card.classList.contains("hidden")){
        const bar = card.querySelector(".progress-bar");
        const percent = parseInt(card.querySelector(".skill-percentage")?.textContent || 0);
        if(bar){
          bar.style.width="0%";
          setTimeout(()=> bar.style.width=`${percent}%`,50);
        }
      }
    });
  };

  skillButtons.forEach(btn=>{
    btn.addEventListener("click",()=>{
      skillButtons.forEach(b=>b.classList.remove("active"));
      btn.classList.add("active");

      const category = btn.dataset.category;

      skillCards.forEach(card=>{
        card.classList.toggle("hidden", !card.classList.contains(`${category}-skill`));
      });

      animateBars(category);
    });
  });

  document.querySelector(".skill-filter-btn.active")?.click();

  /* =====================================================
     4️⃣ CONTACT CHARACTER COUNTER
  ===================================================== */
  const messageInput = document.getElementById("message");
  const charCount = document.getElementById("current-char");

  if(messageInput && charCount){
    messageInput.addEventListener("input",()=>{
      charCount.textContent = messageInput.value.length;
    });
  }

  /* =====================================================
     5️⃣ NAVBAR SCROLL SPY
  ===================================================== */
  const pageSections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", ()=>{
    let current = "";

    pageSections.forEach(sec=>{
      if(window.scrollY >= sec.offsetTop - 150){
        current = sec.id;
      }
    });

    navLinks.forEach(link=>{
      link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
    });
  });

  /* =====================================================
     6️⃣ TYPING EFFECT
  ===================================================== */
  const textEl = document.querySelector(".typing-text");
  if(textEl){
    const phrases = ["UI/UX Designer","Frontend Developer"];
    let phraseIndex = 0;
    let charIndex = 0;

    function type(){
      const phrase = phrases[phraseIndex];
      if(charIndex < phrase.length){
        textEl.textContent += phrase.charAt(charIndex++);
        setTimeout(type,100);
      }else{
        setTimeout(erase,1500);
      }
    }

    function erase(){
      const phrase = phrases[phraseIndex];
      if(charIndex>0){
        textEl.textContent = phrase.substring(0,--charIndex);
        setTimeout(erase,50);
      }else{
        phraseIndex = (phraseIndex+1)%phrases.length;
        setTimeout(type,500);
      }
    }

    setTimeout(type,500);
  }

  /* =====================================================
     7️⃣ HAMBURGER MENU
  ===================================================== */
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");

  if(hamburger && navMenu){
    const links = navMenu.querySelectorAll(".nav-link");

    hamburger.addEventListener("click",()=>{
      navMenu.classList.toggle("open");
      hamburger.classList.toggle("is-active");
    });

    links.forEach(link=>{
      link.addEventListener("click",()=>{
        navMenu.classList.remove("open");
        hamburger.classList.remove("is-active");
      });
    });
  }

  /* =====================================================
     8️⃣ SECTION REVEAL (FRAMER STYLE)
  ===================================================== */
  const revealSections = document.querySelectorAll("section, .hero-section");

  const revealObserver = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add("reveal","active");

        entry.target.querySelectorAll(".stagger").forEach((el,i)=>{
          el.style.transitionDelay = `${i*150}ms`;
        });
      }
    });
  },{threshold:.15});

  revealSections.forEach(sec=>{
    sec.classList.add("reveal");
    revealObserver.observe(sec);
  });

  /* =====================================================
     9️⃣ 🔥 3D TILT EFFECT (FIXED VERSION)
  ===================================================== */
  const softwareCards = document.querySelectorAll(".software-card");

  softwareCards.forEach(card=>{
    card.addEventListener("mousemove", e=>{
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const rotateX = (y - rect.height/2)/40;
      const rotateY = (rect.width/2 - x)/40;

      card.style.transform =
        `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener("mouseleave", ()=>{
      card.style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1.02)";
    });
  });

}); // 🔥 END DOM READY

/* =====================================================
   🔟 THEME TOGGLE (OUTSIDE DOM READY)
===================================================== */
const themeToggleBtn = document.getElementById("theme-toggle");

if(themeToggleBtn){
  if(localStorage.getItem("theme")==="dark"){
    document.body.classList.add("dark-theme");
    themeToggleBtn.innerHTML='<i class="fas fa-sun"></i>';
  }

  themeToggleBtn.addEventListener("click",()=>{
    document.body.classList.toggle("dark-theme");

    const isDark = document.body.classList.contains("dark-theme");

    themeToggleBtn.innerHTML = isDark
      ? '<i class="fas fa-sun"></i>'
      : '<i class="fas fa-moon"></i>';

    localStorage.setItem("theme", isDark ? "dark":"light");
  });
}

// ======================================
// 🔥 PROPER STACKED CARD SCROLL (FIXED)
// ======================================

const stackCards = document.querySelectorAll(".projects-card");

window.addEventListener("scroll", () => {

  stackCards.forEach((card, index) => {

    const rect = card.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // how much card entered viewport
    const progress = 1 - rect.top / windowHeight;

    if(progress > 0){

      // depth spacing
      const translateY = index * 30;
      const scale = 1 - (index * 0.05);

      card.style.transform =
        `translateY(${translateY}px) scale(${scale})`;

      // 🔥 IMPORTANT: bring active card to FRONT
      card.style.zIndex = Math.floor(progress * 1000);

      card.style.opacity = 1;

    }

  });

});
