# 🚀 Moiz Dheela — Developer Portfolio

A **premium, futuristic, fully responsive** developer portfolio.  
Dark theme · Neon glow · Glassmorphism · Particle animations · Typing effect  
Built with **pure HTML + CSS + JS** — no frameworks, no npm, no installs.

---

## 📁 Folder Structure

```
moiz-portfolio/
│
├── index.html          ← Main HTML (all sections)
├── style.css           ← All styles (dark theme, animations, responsive)
├── script.js           ← All JS (loader, cursor, particles, typing, scroll)
│
└── assets/             ← Put your images & resume here
    ├── resume.pdf          ← YOUR RESUME — rename to resume.pdf
    ├── project1.png        ← Screenshot of Project 1
    ├── project2.png        ← Screenshot of Project 2
    └── project3.png        ← Screenshot of Project 3
```

---

## 🖥️ How to Run

**Option 1 — Just open it:**
Double-click `index.html` → opens in your browser. Done.

**Option 2 — VS Code Live Server (recommended):**
1. Open the folder in VS Code
2. Install the **Live Server** extension
3. Right-click `index.html` → **Open with Live Server**

No npm. No terminal. No installs needed.

---

## ✏️ How to Customize

### Personal Info
Open `index.html` and find + replace:
| Placeholder | Replace with |
|---|---|
| `moizd231@gmail.com` | Your email |
| `moizdheela` | Your GitHub username |
| `moizdheela` | Your LinkedIn username |
| `moizdheela` | Your Instagram username |
| `9313846266` | Your phone number |
| `Gandhinagar, Gujarat` | Your location |

### Resume
- Put your resume PDF inside the `assets/` folder
- Name it `resume.pdf`
- The Download Resume button is already linked to `assets/resume.pdf`

### Project Cards
In `index.html`, find the `<!-- PROJECTS -->` section.
For each project card, update:
```html
<img src="assets/project1.png" ...>     ← your screenshot
<span class="project-tag">HTML · CSS</span>   ← technologies used
<h3 class="project-title">Your Title</h3>
<p class="project-desc">Your description...</p>
<a href="https://github.com/YOUR_USERNAME/REPO">GitHub</a>
<a href="https://your-live-site.com">Live Demo</a>
```

To **add more projects**, copy any `.project-card` block and paste it after the last one.

### Typing Phrases
In `script.js`, find:
```js
const phrases = [
  'Full Stack Developer',
  'AI Enthusiast',
  ...
];
```
Change or add any phrases you like.

### Colors
All colors are CSS variables at the top of `style.css`:
```css
--neon-blue: #00d4ff;
--neon-cyan: #00ffcc;
--neon-purple: #9b5de5;
```
Change these to change the entire color theme instantly.

---

## 📧 Contact Form Setup (FormSubmit — Free, No Backend)

The contact form uses **FormSubmit.co** — it sends emails directly to your inbox.

1. Open `index.html`
2. Find this line in the form:
   ```html
   action="https://formsubmit.co/moizd231@gmail.com"
   ```
3. Replace `moizd231@gmail.com` with **your own email**
4. First time someone submits, FormSubmit sends a **confirmation email** to activate it
5. Click Activate → done! All form messages come to your inbox.

Optional: Update `_next` to your actual deployed URL for the thank-you redirect:
```html
<input type="hidden" name="_next" value="https://yourusername.github.io/portfolio/thanks.html" />
```

---

## 🌐 Deploy on GitHub Pages (Free Hosting)

1. Create a new GitHub repo named `portfolio` (or any name)
2. Upload all files: `index.html`, `style.css`, `script.js`, and the `assets/` folder
3. Go to repo **Settings** → **Pages**
4. Under Source, select **main branch** → **/ (root)**
5. Click Save
6. Your site is live at: `https://yourusername.github.io/portfolio/`

---

## 🔧 Sections Overview

| # | Section | What it does |
|---|---|---|
| 1 | Loader | Premium animated loading screen |
| 2 | Hero | Fullscreen intro with particles + typing |
| 3 | About | Cards with your background |
| 4 | Skills | Floating neon orbs for each tech |
| 5 | Projects | Cards with image, desc, GitHub + demo links |
| 6 | Journey | Animated vertical timeline |
| 7 | Contact | FormSubmit form + social links |
| 8 | Footer | Credits |

---

## 🎨 Features

- ✅ Futuristic dark UI with neon glow
- ✅ Animated particle canvas with mouse parallax
- ✅ Custom animated cursor (desktop)
- ✅ Typing text animation
- ✅ Scroll-triggered reveal animations
- ✅ Glassmorphism cards
- ✅ Floating skill orbs with hover glow
- ✅ Animated vertical timeline
- ✅ Contact form via FormSubmit (no backend)
- ✅ Fully responsive (mobile / tablet / desktop)
- ✅ Zero dependencies · Zero npm · Zero setup

---

Made with ♥ by Moiz Dheela
