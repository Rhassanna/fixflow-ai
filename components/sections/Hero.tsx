"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 grid-pattern" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />

      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-accent/5 blur-[120px] animate-pulse-glow" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-card-border/50 bg-card/50 px-4 py-1.5 mb-8">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs tracking-[3px] text-muted uppercase">
              AI Operational Intelligence
            </span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight text-balance"
        >
          <span className="text-white">Fix</span>{" "}
          <span className="text-primary-light">Flow</span>{" "}
          <span className="text-white">AI</span>
          <br />
          <span className="gradient-text">From Problem to Fix</span>
          <br />
          <span className="text-white/80">— In Seconds.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 mx-auto max-w-2xl text-lg text-muted leading-relaxed"
        >
          Enterprise-grade operational troubleshooting, incident response, and
          organizational knowledge assistant. Reduce MTTR, eliminate recurring
          failures, and preserve technical expertise.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#demo"
            className="rounded-lg bg-accent px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-accent/90 glow"
          >
            See Live Demo
          </a>
          <a
            href="#features"
            className="rounded-lg border border-card-border bg-card/50 px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-card hover:border-accent/30"
          >
            Explore Features
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-16 flex items-center justify-center gap-8 text-xs text-muted/60"
        >
          <span className="flex items-center gap-2">
            <svg className="h-4 w-4 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            Safety-First
          </span>
          <span className="flex items-center gap-2">
            <svg className="h-4 w-4 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
            Sub-Second Response
          </span>
          <span className="flex items-center gap-2">
            <svg className="h-4 w-4 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
            </svg>
            Multi-Language
          </span>
        </motion.div>
      </div>
    </section>
  );
}
