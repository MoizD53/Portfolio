/* ═══════════════════════════════════════════════════════
   MOIZ DHEELA — PREMIUM PORTFOLIO JAVASCRIPT
   Three.js · GSAP · Typing · Particles · Scroll · Avatar
═══════════════════════════════════════════════════════ */

/* ── PAGE LOADER ────────────────────────────────────── */
(function initLoader() {
  const loader     = document.getElementById('loader');
  const arcEl      = document.getElementById('loaderArc');
  const progressEl = document.getElementById('loaderProgress');
  const pctEl      = document.getElementById('loaderPct');
  const statusEl   = document.getElementById('loaderStatus');

  const totalLen   = 2 * Math.PI * 54; // r=54
  const statuses   = [
    'Initializing Systems',
    'Loading Modules',
    'Configuring AI Core',
    'Rendering Scene',
    'Ready.',
  ];

  let pct = 0;
  const startTime = performance.now();
  const duration  = 2400;

  function tick(now) {
    pct = Math.min(((now - startTime) / duration) * 100, 100);
    const off = totalLen * (1 - pct / 100);
    if (arcEl) arcEl.style.strokeDashoffset = off;
    if (progressEl) progressEl.style.setProperty('--pct', pct + '%');
    if (pctEl) pctEl.textContent = Math.floor(pct) + '%';
    const si = Math.min(Math.floor((pct / 100) * statuses.length), statuses.length - 1);
    if (statusEl) statusEl.textContent = statuses[si];
    if (pct < 100) requestAnimationFrame(tick);
    else endLoader();
  }

  function endLoader() {
    setTimeout(() => {
      loader.classList.add('done');
      startHero();
    }, 400);
  }

  requestAnimationFrame(tick);
})();

/* ── THREE.JS HERO CANVAS ───────────────────────────── */
function initThree() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  renderer.setClearColor(0x000000, 0);

  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
  camera.position.z = 35;

  /* Particle field */
  const pCount = 800;
  const pGeo   = new THREE.BufferGeometry();
  const pPos   = new Float32Array(pCount * 3);
  const pCol   = new Float32Array(pCount * 3);

  for (let i = 0; i < pCount; i++) {
    pPos[i * 3]     = (Math.random() - 0.5) * 120;
    pPos[i * 3 + 1] = (Math.random() - 0.5) * 80;
    pPos[i * 3 + 2] = (Math.random() - 0.5) * 60;
    const t = Math.random();
    if (t < 0.5) { pCol[i*3]=0; pCol[i*3+1]=0.83; pCol[i*3+2]=1; }       // cyan-blue
    else         { pCol[i*3]=0; pCol[i*3+1]=1;    pCol[i*3+2]=0.8; }      // cyan-green
  }
  pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
  pGeo.setAttribute('color',    new THREE.BufferAttribute(pCol, 3));

  const pMat = new THREE.PointsMaterial({
    size: 0.18, vertexColors: true, transparent: true, opacity: 0.55,
    sizeAttenuation: true,
  });
  const points = new THREE.Points(pGeo, pMat);
  scene.add(points);

  /* Neural network lines */
  const lineGroup = new THREE.Group();
  const nodeCount = 30;
  const nodes = [];
  for (let i = 0; i < nodeCount; i++) {
    nodes.push(new THREE.Vector3(
      (Math.random() - 0.5) * 80,
      (Math.random() - 0.5) * 55,
      (Math.random() - 0.5) * 30,
    ));
  }
  for (let i = 0; i < nodeCount; i++) {
    for (let j = i + 1; j < nodeCount; j++) {
      if (nodes[i].distanceTo(nodes[j]) < 22) {
        const lGeo = new THREE.BufferGeometry().setFromPoints([nodes[i], nodes[j]]);
        const lMat = new THREE.LineBasicMaterial({
          color: 0x00d4ff, transparent: true,
          opacity: 0.06 + Math.random() * 0.08,
        });
        lineGroup.add(new THREE.Line(lGeo, lMat));
      }
    }
  }
  scene.add(lineGroup);

  /* Floating glowing spheres */
  const sphereGroup = new THREE.Group();
  const sphereColors = [0x00d4ff, 0x00ffcc, 0x7b2fff, 0xf72585];
  for (let i = 0; i < 8; i++) {
    const geo  = new THREE.SphereGeometry(0.35 + Math.random() * 0.4, 16, 16);
    const mat  = new THREE.MeshBasicMaterial({ color: sphereColors[i % sphereColors.length], transparent: true, opacity: 0.6 });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set((Math.random() - 0.5) * 50, (Math.random() - 0.5) * 35, (Math.random() - 0.5) * 20);
    mesh.userData.speed = { x: (Math.random() - 0.5) * 0.01, y: (Math.random() - 0.5) * 0.01 };
    sphereGroup.add(mesh);
  }
  scene.add(sphereGroup);

  /* Mouse parallax */
  let mouseX = 0, mouseY = 0;
  document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth  - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  let time = 0;
  function animate() {
    requestAnimationFrame(animate);
    time += 0.004;

    points.rotation.y += 0.0006;
    points.rotation.x += 0.0002;
    lineGroup.rotation.y = time * 0.05;

    sphereGroup.children.forEach((s, i) => {
      s.position.x += s.userData.speed.x;
      s.position.y += s.userData.speed.y;
      const b = 30;
      if (Math.abs(s.position.x) > b) s.userData.speed.x *= -1;
      if (Math.abs(s.position.y) > 20) s.userData.speed.y *= -1;
    });

    camera.position.x += (mouseX * 3 - camera.position.x) * 0.04;
    camera.position.y += (-mouseY * 2 - camera.position.y) * 0.04;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  });
}

/* ── HERO START (post-loader) ───────────────────────── */
function startHero() {
  initThree();

  const heroName    = document.getElementById('heroName');
  const heroRole    = document.querySelector('.hero-role');
  const heroBio     = document.getElementById('heroBio');
  const heroActions = document.getElementById('heroActions');
  const heroSocials = document.getElementById('heroSocials');
  const heroRight   = document.getElementById('heroRight');

  [heroName, heroRole, heroBio, heroActions, heroSocials].forEach(el => el && el.classList.add('visible'));
  setTimeout(() => heroRight && heroRight.classList.add('visible'), 300);
  setTimeout(startTyping, 600);
  initEyeBlink();
}

/* ── TYPING ANIMATION ───────────────────────────────── */
const phrases = [
  'AI Engineer',
  'Full Stack Developer',
  'Startup Builder',
  'Creative Technologist',
  'Future Founder',
  'Problem Solver',
];
let phraseIdx = 0, charIdx = 0, isDeleting = false;

function startTyping() {
  const el = document.getElementById('typed');
  if (!el) return;
  typeLoop(el);
}

function typeLoop(el) {
  const cur = phrases[phraseIdx];
  if (isDeleting) {
    el.textContent = cur.substring(0, charIdx - 1);
    charIdx--;
  } else {
    el.textContent = cur.substring(0, charIdx + 1);
    charIdx++;
  }

  let delay = isDeleting ? 55 : 95;
  if (!isDeleting && charIdx === cur.length) { delay = 2000; isDeleting = true; }
  else if (isDeleting && charIdx === 0) {
    isDeleting = false;
    phraseIdx = (phraseIdx + 1) % phrases.length;
    delay = 350;
  }
  setTimeout(() => typeLoop(el), delay);
}

/* ── EYE BLINK ──────────────────────────────────────── */
function initEyeBlink() {
  const eyelidL = document.getElementById('eyelidL');
  const eyelidR = document.getElementById('eyelidR');
  if (!eyelidL || !eyelidR) return;

  function blink() {
    const dur = 120;
    // Close
    eyelidL.setAttribute('ry', '12');
    eyelidR.setAttribute('ry', '12');
    eyelidL.style.transition = `ry ${dur}ms ease`;
    eyelidR.style.transition = `ry ${dur}ms ease`;
    setTimeout(() => {
      eyelidL.setAttribute('ry', '0.5');
      eyelidR.setAttribute('ry', '0.5');
      setTimeout(() => {
        eyelidL.setAttribute('ry', '5');
        eyelidR.setAttribute('ry', '5');
      }, dur);
    }, dur);
    // Schedule next
    const next = 2500 + Math.random() * 4000;
    setTimeout(blink, next);
  }
  setTimeout(blink, 2000);
}

/* ── CUSTOM CURSOR ──────────────────────────────────── */
const cursorDot  = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', (e) => {
  mx = e.clientX; my = e.clientY;
  if (cursorDot) { cursorDot.style.left = mx + 'px'; cursorDot.style.top = my + 'px'; }
});

(function animateRing() {
  rx += (mx - rx) * 0.1;
  ry += (my - ry) * 0.1;
  if (cursorRing) { cursorRing.style.left = rx + 'px'; cursorRing.style.top = ry + 'px'; }
  requestAnimationFrame(animateRing);
})();

document.querySelectorAll('a, button, .skill-orb-item, .project-card, .glass-card').forEach(el => {
  el.addEventListener('mouseenter', () => cursorRing && cursorRing.classList.add('hovered'));
  el.addEventListener('mouseleave', () => cursorRing && cursorRing.classList.remove('hovered'));
});

/* ── SPOTLIGHT ──────────────────────────────────────── */
const spotlight = document.getElementById('spotlight');
document.addEventListener('mousemove', (e) => {
  if (!spotlight) return;
  spotlight.style.left = e.clientX + 'px';
  spotlight.style.top  = e.clientY + 'px';
});

/* ── SCROLL PROGRESS ────────────────────────────────── */
const scrollProg = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const max      = document.documentElement.scrollHeight - window.innerHeight;
  if (scrollProg) scrollProg.style.width = ((scrolled / max) * 100) + '%';
}, { passive: true });

/* ── NAV SCROLL ─────────────────────────────────────── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (!nav) return;
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ── HAMBURGER ──────────────────────────────────────── */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });
  document.querySelectorAll('.mm-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* ── SKILLS RENDER ──────────────────────────────────── */
const skills = [
  { name: 'HTML',       icon: 'fa-brands fa-html5',    color: '#e34c26' },
  { name: 'CSS',        icon: 'fa-brands fa-css3-alt', color: '#264de4' },
  { name: 'JavaScript', icon: 'fa-brands fa-js',       color: '#f7df1e' },
  { name: 'React',      icon: 'fa-brands fa-react',    color: '#61dafb' },
  { name: 'Node.js',    icon: 'fa-brands fa-node-js',  color: '#3c873a' },
  { name: 'Python',     icon: 'fa-brands fa-python',   color: '#3572a5' },
  { name: 'C++',        icon: 'fa-solid fa-code',      color: '#00599c' },
  { name: 'SQL',        icon: 'fa-solid fa-database',  color: '#f59e0b' },
  { name: 'MongoDB',    icon: 'fa-solid fa-leaf',      color: '#4db33d' },
  { name: 'AI / ML',    icon: 'fa-solid fa-brain',     color: '#9b5de5' },
  { name: 'Linux',      icon: 'fa-brands fa-linux',    color: '#ffd133' },
  { name: 'GitHub',     icon: 'fa-brands fa-github',   color: '#aaa' },
  { name: 'DSA',        icon: 'fa-solid fa-sitemap',   color: '#00ffcc' },
];

const skillBars = [
  { name: 'HTML / CSS',     pct: 90 },
  { name: 'JavaScript',     pct: 82 },
  { name: 'Python',         pct: 80 },
  { name: 'React',          pct: 72 },
  { name: 'Node.js',        pct: 68 },
  { name: 'AI / ML',        pct: 65 },
  { name: 'SQL / MongoDB',  pct: 75 },
  { name: 'C++ / DSA',      pct: 70 },
];

(function renderSkills() {
  const orbitEl = document.getElementById('skillsOrbit');
  const barsEl  = document.getElementById('skillsBarsGrid');
  if (!orbitEl || !barsEl) return;

  skills.forEach(s => {
    const glow = `rgba(${hexToRgb(s.color)},0.12)`;
    orbitEl.innerHTML += `
      <div class="skill-orb-item" style="--item-glow:${glow}" data-aos="zoom-in">
        <div class="skill-orb-icon"><i class="${s.icon}" style="color:${s.color}"></i></div>
        <div class="skill-orb-name">${s.name}</div>
      </div>`;
  });

  skillBars.forEach(b => {
    barsEl.innerHTML += `
      <div class="skill-bar-item" data-aos="fade-up">
        <div class="skill-bar-header">
          <span class="skill-bar-name">${b.name}</span>
          <span class="skill-bar-pct">${b.pct}%</span>
        </div>
        <div class="skill-bar-track">
          <div class="skill-bar-fill" data-pct="${b.pct}"></div>
        </div>
      </div>`;
  });

  // Animate bars on scroll
  const barObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        document.querySelectorAll('.skill-bar-fill').forEach(fill => {
          fill.style.width = fill.dataset.pct + '%';
        });
        barObserver.disconnect();
      }
    });
  }, { threshold: 0.3 });

  const firstBar = barsEl.querySelector('.skill-bar-item');
  if (firstBar) barObserver.observe(firstBar);
})();

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1,3), 16);
  const g = parseInt(hex.slice(3,5), 16);
  const b = parseInt(hex.slice(5,7), 16);
  return `${r},${g},${b}`;
}

/* ── STAT COUNTERS ──────────────────────────────────── */
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const duration = 1800;
  const start = performance.now();
  function step(now) {
    const p = Math.min((now - start) / duration, 1);
    const ease = p < 0.5 ? 2 * p * p : -1 + (4 - 2 * p) * p;
    el.textContent = Math.floor(ease * target);
    if (p < 1) requestAnimationFrame(step);
    else el.textContent = target;
  }
  requestAnimationFrame(step);
}

const statObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.stat-num').forEach(animateCounter);
      statObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });

const statsGrid = document.querySelector('.stats-grid');
if (statsGrid) statObserver.observe(statsGrid);

/* ── TIMELINE SPINE FILL ────────────────────────────── */
const timelineSpine = document.getElementById('timelineSpine');
const timelineSection = document.querySelector('.journey-section');

if (timelineSpine && timelineSection) {
  window.addEventListener('scroll', () => {
    const rect = timelineSection.getBoundingClientRect();
    const total = rect.height;
    const scrolled = window.innerHeight - rect.top;
    const pct = Math.max(0, Math.min(100, (scrolled / total) * 140));
    timelineSpine.style.setProperty('--fill', pct + '%');
  }, { passive: true });
}

/* ── ACTIVE NAV ON SCROLL ───────────────────────────── */
const sections    = document.querySelectorAll('section[id]');
const navLinks    = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 220) current = sec.id;
  });
  navLinks.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === '#' + current) {
      link.style.color = '#ffffff';
    }
  });
}, { passive: true });

/* ── MOUSE PARALLAX HERO SHAPES ─────────────────────── */
document.addEventListener('mousemove', (e) => {
  const cx = window.innerWidth / 2, cy = window.innerHeight / 2;
  const dx = (e.clientX - cx) / cx;
  const dy = (e.clientY - cy) / cy;
  document.querySelectorAll('.orb').forEach((orb, i) => {
    const d = (i + 1) * 14;
    orb.style.transform = `translateY(var(--orb-base,0)) translate(${dx*d}px,${dy*d}px)`;
  });

  // Avatar scene subtle tilt
  const scene = document.getElementById('avatarScene');
  if (scene) {
    const ax = ((e.clientX / window.innerWidth) - 0.5) * 8;
    const ay = ((e.clientY / window.innerHeight) - 0.5) * -8;
    scene.style.transform = `perspective(800px) rotateY(${ax}deg) rotateX(${ay}deg)`;
  }
});

/* ── SMOOTH SCROLL ──────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ── AOS INIT ───────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 700,
      easing: 'ease-out-cubic',
      once: true,
      offset: 80,
    });
  }
});

/* ── NAV LOGO GLITCH ────────────────────────────────── */
const navLogo = document.querySelector('.nav-logo');
if (navLogo) {
  navLogo.addEventListener('mouseenter', () => {
    navLogo.style.textShadow = '2px 0 #00d4ff, -2px 0 #7b2fff';
    setTimeout(() => { navLogo.style.textShadow = ''; }, 300);
  });
}

/* ── GSAP SCROLL (if loaded) ────────────────────────── */
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);

  // Section headings parallax
  gsap.utils.toArray('.section-heading').forEach(el => {
    gsap.fromTo(el,
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.9,
        scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
      }
    );
  });

  // Project cards stagger
  gsap.utils.toArray('.project-card').forEach((card, i) => {
    gsap.fromTo(card,
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.7, delay: i * 0.12,
        scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none none' }
      }
    );
  });
}

console.log('%c🚀 MOIZ DHEELA', 'color:#00d4ff;font-size:1.5rem;font-weight:bold;font-family:monospace');
console.log('%c   AI Engineer · Full Stack Developer · Future Founder', 'color:#6b7e96;font-size:0.8rem;font-family:monospace');

/* reveal animation */

const reveals = document.querySelectorAll(".reveal");

window.addEventListener("scroll", () => {

  reveals.forEach((el) => {

    const top = el.getBoundingClientRect().top;

    if(top < window.innerHeight - 100){
      el.classList.add("active");
    }

  });

});