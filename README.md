# Robin · Portfolio

Personal portfolio for **MD Shahin Mia Robin** — Full-Stack Software Engineer.

Built with **React + TypeScript + Vite + Tailwind CSS + Framer Motion**.

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 🗂 Project Structure

```
src/
├── components/
│   ├── NavBar.tsx         # Fixed nav with scroll progress + active section
│   ├── Hero.tsx           # Terminal boot sequence + identity reveal
│   ├── About.tsx          # Engineering mindset + system profile card
│   ├── Experience.tsx     # Deployment history timeline (tabbed)
│   ├── Projects.tsx       # Active services grid + architecture diagrams + modal
│   ├── Skills.tsx         # Layered architecture stack visualization
│   ├── OpenSource.tsx     # DB-Craft package + debugging stories
│   ├── Leadership.tsx     # Team operations + award
│   └── Contact.tsx        # Terminal-style contact form
├── data/
│   └── index.ts           # All content — edit this to personalize
├── hooks/
│   └── index.ts           # useInView, useTypingEffect, useScrollProgress
├── App.tsx
├── main.tsx
└── index.css              # Global styles, CSS variables, animations
```

---

## ✏️ Personalizing Content

All content lives in `src/data/index.ts`. Edit:

- `profile` — name, tagline, email, links
- `experiences` — work history
- `projects` — case studies
- `skills` — tech stack
- `openSource` — package info
- `debuggingStories` — incident reports
- `leadership` — team principles

---

## 🎨 Design System

| Token | Value | Usage |
|-------|-------|-------|
| `--bg-base` | `#040810` | Page background |
| `--bg-surface` | `#0a1020` | Sections |
| `--bg-card` | `#0d1627` | Cards |
| `--cyan` | `#22d3ee` | Primary accent |
| `--orange` | `#f97316` | Secondary / warnings |
| Font Display | Syne | Headings |
| Font Body | IBM Plex Sans | Paragraphs |
| Font Mono | JetBrains Mono | Code, labels |

---

## 🔌 Contact Form

The contact form is wired up with `useState`. To make it functional, connect it to one of:

- [Formspree](https://formspree.io) — easiest, no backend
- [EmailJS](https://emailjs.com) — client-side email
- Custom backend API

Replace the `handleSubmit` function in `Contact.tsx`.

---

## 📦 Dependencies

| Package | Purpose |
|---------|---------|
| `framer-motion` | Scroll animations, entry transitions, modal |
| `lucide-react` | Icon system |
| `tailwindcss` | Utility styling |

---

## 🚀 Deployment

```bash
# Netlify / Vercel — just connect the repo
npm run build
# dist/ folder is the output

# GitHub Pages
npm run build
# Deploy dist/ to gh-pages branch
```

---

## 💡 Future Improvements

- [ ] Dark/Light theme toggle
- [ ] Live GitHub stats via GitHub API
- [ ] Blog section with MDX support
- [ ] Syntax-highlighted code snippets (Shiki/Prism)
- [ ] Resume PDF download button
- [ ] Scroll-triggered counter animations for metrics
- [ ] i18n support (English/Bengali)
