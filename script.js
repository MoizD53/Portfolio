/* ============================================================
   MOIZ DHEELA — PORTFOLIO JAVASCRIPT
   Loader · Cursor · Particles · Typing · Scroll Animations
   ============================================================ */

/* ─── LOADER ────────────────────────────────────────────── */
const loader = document.getElementById('loader');
const loaderBar = document.getElementById('loaderBar');

let progress = 0;
const loaderInterval = setInterval(() => {
  progress += Math.random() * 18 + 4;
  if (progress >= 100) {
    progress = 100;
    loaderBar.style.width = '100%';
    clearInterval(loaderInterval);
    setTimeout(() => {
      loader.classList.add('hidden');
      // Trigger hero animations after loader hides
      document.querySelectorAll('.hero .reveal').forEach(el => {
        el.classList.add('visible');
      });
      startTyping();
    }, 500);
  } else {
    loaderBar.style.width = progress + '%';
  }
}, 80);

/* ─── CUSTOM CURSOR ─────────────────────────────────────── */
const cursorDot = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

if (cursorDot && cursorRing) {
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Hover effect on interactive elements
  const hoverTargets = document.querySelectorAll('a, button, .skill-orb, .project-card, .about-card, .glass');
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => cursorRing.classList.add('hovered'));
    el.addEventListener('mouseleave', () => cursorRing.classList.remove('hovered'));
  });
}

/* ─── NAV SCROLL EFFECT ─────────────────────────────────── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
});

/* ─── HAMBURGER MENU ────────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close menu on link click (mobile)
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

/* ─── TYPING ANIMATION ──────────────────────────────────── */
const typedText = document.getElementById('typedText');
const phrases = [
  'Full Stack Developer',
  'AI Enthusiast',
  'DSA Learner',
  'Problem Solver',
  'Open Source Explorer',
];
let phraseIndex = 0, charIndex = 0, isDeleting = false;

function startTyping() {
  if (!typedText) return;
  typeLoop();
}

function typeLoop() {
  const current = phrases[phraseIndex];
  if (isDeleting) {
    typedText.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typedText.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }

  let delay = isDeleting ? 60 : 100;

  if (!isDeleting && charIndex === current.length) {
    delay = 1800;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    delay = 300;
  }

  setTimeout(typeLoop, delay);
}

/* ─── PARTICLE CANVAS ───────────────────────────────────── */
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
const PARTICLE_COUNT = 90;

function resizeCanvas() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}
resizeCanvas();
window.addEventListener('resize', () => {
  resizeCanvas();
  initParticles();
});

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 1.8 + 0.4;
    this.speedX = (Math.random() - 0.5) * 0.4;
    this.speedY = (Math.random() - 0.5) * 0.4;
    this.opacity = Math.random() * 0.55 + 0.1;
    this.color = Math.random() > 0.5
      ? `rgba(0, 212, 255, ${this.opacity})`
      : `rgba(0, 255, 204, ${this.opacity * 0.6})`;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > canvas.width ||
        this.y < 0 || this.y > canvas.height) this.reset();
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

// Draw connections between nearby particles
function drawConnections() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(0, 212, 255, ${0.08 * (1 - dist / 120)})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }
}

function initParticles() {
  particles = [];
  for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawConnections();
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

// Mouse parallax on particles
let mouseParticleX = 0, mouseParticleY = 0;
document.addEventListener('mousemove', (e) => {
  mouseParticleX = (e.clientX / window.innerWidth - 0.5) * 2;
  mouseParticleY = (e.clientY / window.innerHeight - 0.5) * 2;
  particles.forEach(p => {
    p.speedX += mouseParticleX * 0.001;
    p.speedY += mouseParticleY * 0.001;
    // Cap speed
    p.speedX = Math.max(-0.8, Math.min(0.8, p.speedX));
    p.speedY = Math.max(-0.8, Math.min(0.8, p.speedY));
  });
});

/* ─── SCROLL REVEAL ─────────────────────────────────────── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger siblings within the same parent
      const siblings = entry.target.parentElement.querySelectorAll('.reveal:not(.visible)');
      siblings.forEach((el, idx) => {
        setTimeout(() => el.classList.add('visible'), idx * 100);
      });
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

// Exclude hero (handled by loader)
document.querySelectorAll('.reveal:not(.hero .reveal)').forEach(el => {
  revealObserver.observe(el);
});

/* ─── ACTIVE NAV LINK ON SCROLL ─────────────────────────── */
const sections = document.querySelectorAll('section[id]');
const navLinkItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 200) current = sec.getAttribute('id');
  });
  navLinkItems.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === '#' + current) {
      link.style.color = 'var(--neon-blue)';
    }
  });
});

/* ─── SMOOTH HOVER GLOW ON SKILL BALLS ──────────────────── */
document.querySelectorAll('.skill-ball').forEach(ball => {
  ball.addEventListener('mouseenter', () => {
    ball.querySelector('.skill-orb').style.animationPlayState = 'paused';
  });
  ball.addEventListener('mouseleave', () => {
    ball.querySelector('.skill-orb').style.animationPlayState = 'running';
  });
});

/* ─── MOUSE PARALLAX ON HERO SHAPES ─────────────────────── */
const shapes = document.querySelectorAll('.shape');
document.addEventListener('mousemove', (e) => {
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;
  const dx = (e.clientX - cx) / cx;
  const dy = (e.clientY - cy) / cy;
  shapes.forEach((shape, i) => {
    const depth = (i + 1) * 12;
    shape.style.transform = `translate(${dx * depth}px, ${dy * depth}px)`;
  });
});

/* ─── CONTACT FORM FEEDBACK ─────────────────────────────── */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function () {
    const btn = contactForm.querySelector('[type="submit"]');
    btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Sending...';
    btn.disabled = true;
    // FormSubmit handles the submission; button state resets on page reload
  });
}

/* ─── PROJECT CARD IMAGE FALLBACK ───────────────────────── */
document.querySelectorAll('.project-img').forEach(img => {
  img.addEventListener('error', () => {
    img.closest('.project-img-wrap').classList.add('no-img');
  });
});

/* ─── SMOOTH SCROLL FOR ALL ANCHOR LINKS ────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ─── GLITCH EFFECT ON NAV LOGO HOVER ───────────────────── */
const navLogo = document.querySelector('.nav-logo');
if (navLogo) {
  navLogo.addEventListener('mouseenter', () => {
    navLogo.style.textShadow = '2px 0 var(--neon-pink), -2px 0 var(--neon-cyan)';
    setTimeout(() => { navLogo.style.textShadow = ''; }, 300);
  });
}

console.log('%c🚀 Moiz Dheela Portfolio', 'color:#00d4ff; font-size:1.2rem; font-weight:bold;');
console.log('%c Built with HTML · CSS · JS', 'color:#00ffcc; font-size:0.85rem;');
