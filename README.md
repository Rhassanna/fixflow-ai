# FixFlow AI — Operational Intelligence Platform

Enterprise-grade operational troubleshooting, incident response, and organizational knowledge assistant.

**Tagline:** From problem to fix — in seconds.

## Tech Stack

- **Next.js 16** — App Router, static export
- **React 19** — Server & client components
- **Tailwind CSS v4** — Utility-first styling
- **Framer Motion** — Page & component animations
- **TypeScript** — Full type safety

## Getting Started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # Production build → out/
```

## Deployment

The project is pre-configured for **Vercel** deployment via `vercel.json`. Root directory: `web/`.

1. Push to GitHub
2. Import repo in [Vercel](https://vercel.com)
3. Framework: Next.js — auto-detected
4. Deploy

## Project Structure

```
web/
├── app/
│   ├── globals.css       # Dark theme, animations, grid patterns
│   ├── layout.tsx         # Root layout, SEO metadata, fonts
│   └── page.tsx           # Landing page (assembles all sections)
├── components/
│   ├── ui/                # Navbar, Footer
│   └── sections/          # Hero, Features, Demo, Workflow, CTA
├── public/                # Static assets (logo, favicon)
├── lib/                   # Utilities
├── vercel.json            # Vercel deployment config
└── next.config.ts         # Next.js configuration
```

## Pages

- **Hero** — Animated FixFlow AI branding with CTA
- **Features** — 6-card enterprise capability grid
- **Demo** — Interactive incident diagnosis with 3 scenarios
- **Workflow** — 4-step operational process + 3 operational modes
- **CTA** — Book demo with key metrics

## Branding

- Name: FixFlow AI
- Colors: Dark navy (#0a1628), Blue (#185FA5), Accent (#3b82f6)
- Tagline: "From problem to fix — in seconds."
