// Smooth scrolling + mobile navigation toggle

const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

function closeMobileNav() {
  if (!navToggle || !navLinks) return;
  navLinks.classList.remove('open');
}

function toggleMobileNav() {
  if (!navToggle || !navLinks) return;
  navLinks.classList.toggle('open');
}

navToggle?.addEventListener('click', toggleMobileNav);

// Close mobile nav when a link is clicked
navLinks?.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', () => {
    closeMobileNav();
  });
});

// Smooth scroll for all internal anchors
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (event) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// Contact form validation + feedback
const contactForm = document.getElementById('contactForm');
const feedback = document.querySelector('.form-feedback');

contactForm?.addEventListener('submit', event => {
  event.preventDefault();

  const name = contactForm.querySelector('#name')?.value.trim() || '';
  const email = contactForm.querySelector('#email')?.value.trim() || '';
  const message = contactForm.querySelector('#message')?.value.trim() || '';

  if (!name || !email || !message) {
    feedback.textContent = 'Please fill out all fields before sending.';
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    feedback.textContent = 'Please enter a valid email address.';
    return;
  }

  feedback.textContent = 'Thanks for reaching out! I will get back to you soon.';
  contactForm.reset();
});

// Theme toggle (light / dark)
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = document.querySelector('.theme-icon');

function setTheme(theme) {
  document.body.dataset.theme = theme;
  localStorage.setItem('theme', theme);

  if (theme === 'light') {
    themeIcon.textContent = '☀️';
    themeToggle.setAttribute('aria-pressed', 'true');
  } else {
    themeIcon.textContent = '🌙';
    themeToggle.setAttribute('aria-pressed', 'false');
  }
}

const storedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
setTheme(storedTheme || (prefersDark ? 'dark' : 'light'));

themeToggle?.addEventListener('click', () => {
  const nextTheme = document.body.dataset.theme === 'light' ? 'dark' : 'light';
  setTheme(nextTheme);
});

// Typewriter animation
const typewriter = document.querySelector('.typewriter');
const typewriterText = typewriter?.querySelector('.typewriter-text');

if (typewriter && typewriterText) {
  const words = JSON.parse(typewriter.dataset.words || '[]');
  let currentWord = 0;
  let currentChar = 0;
  let deleting = false;

  const typeSpeed = 90;
  const pauseSpeed = 1400;

  function typeLoop() {
    const word = words[currentWord] || '';

    if (deleting) {
      currentChar = Math.max(0, currentChar - 1);
      typewriterText.textContent = word.slice(0, currentChar);

      if (currentChar === 0) {
        deleting = false;
        currentWord = (currentWord + 1) % words.length;
      }
    } else {
      currentChar = Math.min(word.length, currentChar + 1);
      typewriterText.textContent = word.slice(0, currentChar);

      if (currentChar === word.length) {
        deleting = true;
      }
    }

    const delay = deleting ? typeSpeed / 1.5 : typeSpeed;
    const timeout = deleting && currentChar === 0 ? 300 : delay;

    window.setTimeout(typeLoop, deleting && currentChar === 0 ? 400 : delay);
  }

  typeLoop();
}

// Scroll reveal + skill bar animation
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add('active');

      const skillCard = entry.target.closest('.skill-card');
      if (skillCard) {
        const filled = skillCard.querySelector('.skill-filled');
        const percent = filled?.dataset?.percent;
        if (percent) {
          skillCard.style.setProperty('--skill-width', `${percent}%`);
        }
      }

      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.17 }
);

revealElements.forEach(el => revealObserver.observe(el));
