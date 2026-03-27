// assets/js/loadMarkdown.js
document.addEventListener('DOMContentLoaded', () => {
  // Initialize a Showdown converter with basic extensions
  const converter = new showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true
  });

  // Theme management
  function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const defaultTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    
    document.documentElement.setAttribute('data-theme', defaultTheme);
    
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', toggleTheme);
    }
  }

  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  }

  // Navigation transformation functionality
  function initNavigation() {
    const nav = document.getElementById('elegant-nav');
    const contentMain = document.getElementById('content-main');
    const heroSection = document.getElementById('hero');
    
    if (!nav || !contentMain || !heroSection) return;

    function updateNavigation() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // Show sidebar navigation as soon as user starts scrolling
      if (scrollTop > 20) {
        nav.classList.add('sidebar-mode');
        contentMain.classList.add('with-sidebar');
      } else {
        // Hide navigation when at the very top
        nav.classList.remove('sidebar-mode');
        contentMain.classList.remove('with-sidebar');
      }
    }

    window.addEventListener('scroll', updateNavigation);
    window.addEventListener('resize', updateNavigation);
    updateNavigation(); // Initial call
  }

  // Scroll to vision button functionality
  function initScrollButton() {
    const scrollButton = document.getElementById('scroll-to-vision');
    const visionSection = document.getElementById('vision');
    const heroSection = document.getElementById('hero');
    
    if (!scrollButton || !visionSection || !heroSection) return;
    
    scrollButton.addEventListener('click', () => {
      visionSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    });

    // Hide button when user scrolls past hero section
    function updateButtonVisibility() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // Hide button immediately when user starts scrolling (any scroll amount)
      if (scrollTop > 10) {
        scrollButton.classList.add('js-hidden');
        scrollButton.classList.remove('js-visible');
      } else {
        scrollButton.classList.add('js-visible');
        scrollButton.classList.remove('js-hidden');
      }
    }

    window.addEventListener('scroll', updateButtonVisibility);
    window.addEventListener('resize', updateButtonVisibility); // Handle window resize
    
    // Wait for animation to complete before enabling scroll hiding
    setTimeout(() => {
      updateButtonVisibility(); // Initial call after animation
    }, 3100); // Animation starts at 2s and lasts 1s, so wait 3.1s total
  }

  // Scroll progress bar functionality
  function updateScrollProgress() {
    const scrolled = window.scrollY;
    const maxHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrolled / maxHeight) * 100;
    
    const progressBar = document.querySelector('.scroll-progress-bar');
    if (progressBar) {
      progressBar.style.width = `${Math.min(progress, 100)}%`;
    }
  }

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Set up elements for animation
  function setupAnimations() {
    const animatedElements = document.querySelectorAll('.animate-fadeInUp, .animate-fadeInDown, .animate-slideInLeft');
    animatedElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
      observer.observe(el);
    });
  }

  // Active navigation highlighting
  function updateActiveNavigation() {
    const sections = document.querySelectorAll('.content-block');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 150 && rect.bottom >= 150) {
        currentSection = section.id;
      }
    });
    
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${currentSection}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

 

  // Enhanced navigation mode toggle
  const nav = document.querySelector('.pill-nav');
  const hero = document.getElementById('hero');
  
  function toggleNavMode() {
    if (!nav || !hero) return;
    
    // Height threshold: once nav would overlap hero bottom, switch to side mode
    const threshold = hero.offsetHeight - nav.offsetHeight - 40;
    const isMobile = window.innerWidth <= 480;
    
    if (isMobile) {
      // On mobile, keep navigation visible but adjust positioning
      nav.classList.remove('side-nav');
      nav.classList.add('circle-nav');
    } else if (window.scrollY > threshold) {
      nav.classList.add('side-nav');
      nav.classList.remove('circle-nav');
    } else {
      nav.classList.remove('side-nav');
      nav.classList.add('circle-nav');
    }
  }

  // Smooth scrolling for navigation links
  function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('.pill-nav a[href^="#"], .hero-cta a[href^="#"]');
    
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          const offset = 80;
          const targetPosition = targetElement.offsetTop - offset;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  // Enhanced content loading with error handling and performance optimization
  function loadMarkdownContent() {
    const sections = document.querySelectorAll('[data-md]');
    const loadPromises = [];

    sections.forEach(section => {
      const mdPath = section.getAttribute('data-md');
      
      const loadPromise = fetch(mdPath)
        .then(res => {
          if (!res.ok) {
            throw new Error(`Failed to load ${mdPath}: ${res.status}`);
          }
          return res.text();
        })
        .then(md => {
          // Convert markdown to HTML and inject
          const htmlContent = converter.makeHtml(md);
          section.innerHTML = htmlContent;
          
          // Add loading animation
          section.style.opacity = '0';
          section.style.transform = 'translateY(20px)';
          section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
          
          // Trigger animation after a short delay
          setTimeout(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
          }, 100);
          
          return section;
        })
        .catch(err => {
          console.warn(`Using fallback for ${mdPath}:`, err.message);
          const fallbackContent = fallback[mdPath] || '*Content unavailable*';
          section.innerHTML = converter.makeHtml(fallbackContent);
          return section;
        });
      
      loadPromises.push(loadPromise);
    });

    // After all content is loaded, set up animations and other features
    Promise.allSettled(loadPromises).then(() => {
      setupAnimations();
      setupSmoothScrolling();
    });
  }

  // Initialize all functionality
  function initialize() {
    initTheme();
    initNavigation();
    initScrollButton();
    loadMarkdownContent();
    
    // Initial setup
    updateScrollProgress();
    updateActiveNavigation();
    
    // Event listeners
    window.addEventListener('scroll', () => {
      requestAnimationFrame(() => {
        updateScrollProgress();
        updateActiveNavigation();
      });
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown' && e.ctrlKey) {
        e.preventDefault();
        const sections = Array.from(document.querySelectorAll('.content-block'));
        const currentSection = sections.find(section => {
          const rect = section.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        });
        
        if (currentSection) {
          const currentIndex = sections.indexOf(currentSection);
          const nextSection = sections[currentIndex + 1];
          if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        } else if (sections.length > 0) {
          sections[0].scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } else if (e.key === 'ArrowUp' && e.ctrlKey) {
        e.preventDefault();
        const sections = Array.from(document.querySelectorAll('.content-block'));
        const currentSection = sections.find(section => {
          const rect = section.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        });
        
        if (currentSection) {
          const currentIndex = sections.indexOf(currentSection);
          const prevSection = sections[currentIndex - 1];
          if (prevSection) {
            prevSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          } else {
            document.getElementById('hero').scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      }
    });
  }

  // Start the application
  initialize();
});