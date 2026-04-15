# Robin · Engineering Portfolio

A high-performance, system-focused portfolio for **MD Shahin Mia Robin** — Full-Stack Software Engineer. This project is designed with a "systems-first" philosophy, featuring an interactive terminal, real-time data integrations, and a sleek, developer-centric aesthetic.

Built with **React + TypeScript + Vite + Tailwind CSS + Framer Motion**.

---

## 🛠 Core Features

- **Interactive Terminal**: A fully functional command-line interface for navigating the portfolio.
- **System-Style Hero**: Real-time "boot sequence" simulation and identity reveal.
- **Dynamic Projects**: Architecture-focused case studies with modular breakdowns.
- **Experience Timeline**: Deployment history visualized as an engineering log.
- **Live GitHub Stats**: Real-time data fetching from the GitHub API.
- **Responsive Design**: Optimized for everything from mobile devices to ultra-wide monitors.
- **Engineering Mindset**: Sections dedicated to debugging stories and leadership philosophy.

---

## ⌨️ Interactive Terminal

The portfolio features an interactive terminal in the Hero section, providing a unique way to explore the developer's profile and navigate the site.

### Available Commands

| Command | Action |
|---------|--------|
| `help` | List all available commands |
| `about` | Short bio and engineering philosophy |
| `experience` | Summary of work history |
| `skills` | List of technical stack and expertise |
| `projects` | View major systems and projects |
| `contact` | Get phone number |
| `mail` | Get email address |
| `linkedin` | Open LinkedIn profile |
| `github` | Open GitHub profile |
| `clear` | Clear the terminal screen |

### Navigation Shortcuts

| Command | Destination Section |
|---------|---------------------|
| `init` | Scroll to Home (Top) |
| `log` | Scroll to Experience section |
| `services` | Scroll to Projects section |
| `stack` | Scroll to Skills section |
| `pkg` | Scroll to Open Source section |
| `connect` | Scroll to Contact section |

### Features
- **Boot Sequence**: Simulated system initialization on page load.
- **Command History**: Use **Up/Down arrow keys** to cycle through previous commands.
- **Auto-focus**: Terminal input automatically focuses after the boot sequence.
- **Real-time Feedback**: Commands provide immediate responses or trigger smooth scroll navigation.

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
│   ├── Hero.tsx           # Terminal boot sequence + identity reveal + Terminal logic
│   ├── About.tsx          # Engineering mindset + system profile card
│   ├── Experience.tsx     # Deployment history timeline (tabbed)
│   ├── Projects.tsx       # Active services grid + architecture diagrams + modal
│   ├── Skills.tsx         # Layered architecture stack visualization
│   ├── OpenSource.tsx     # DB-Craft package + debugging stories
│   ├── Leadership.tsx     # Team operations + award
│   ├── GitHubStats.tsx    # Live data fetching from GitHub API
│   └── Contact.tsx        # Terminal-style contact form
├── data/
│   └── index.ts           # All content — central source of truth
├── hooks/
│   └── index.ts           # useInView, useTypingEffect, useScrollProgress
├── App.tsx
├── main.tsx
└── index.css              # Global styles, Design System tokens, animations
```

---

## 🎨 Design System

| Token | Value | Usage |
|-------|-------|-------|
| `--bg-base` | `#040810` | Page background |
| `--bg-surface` | `#0a1020` | Section backgrounds |
| `--bg-card` | `#0d1627` | Card components |
| `--cyan-glow` | `#22d3ee` | Primary brand color / Interactive elements |
| `--orange-accent` | `#f97316` | Secondary accent / System warnings |
| **Typography** | | |
| Headings | Syne | Bold, display-focused |
| Body | IBM Plex Sans | Readable, technical |
| Mono | JetBrains Mono | Code snippets, terminal, labels |

---

## 🔌 Integration & APIs

- **GitHub API**: Fetches live repository data, follower counts, and contribution stats.
- **Contact Form**: Implemented with `useState`. Easily connect to service providers like [Formspree](https://formspree.io) or [EmailJS](https://emailjs.com) by updating `handleSubmit` in `Contact.tsx`.

---

## 🚀 Deployment

```bash
# dist/ folder is the production output
npm run build

# Deployment options:
- Netlify / Vercel: Connect repository for auto-deployments.
- GitHub Pages: Deploy the `dist/` folder to the `gh-pages` branch.
```

---

## 💡 Future Improvements

- [x] Live GitHub stats via GitHub API
- [x] Resume PDF download button
- [x] Scroll-triggered counter animations for metrics
- [ ] Multi-language support (i18n: English/Bengali)
- [ ] Blog section with MDX support
- [ ] Detailed technical case studies for each project
- [ ] Interactive system architecture visualizer
- [ ] Light mode theme support
