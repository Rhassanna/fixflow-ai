"use client";

import { motion } from "framer-motion";

const METRICS = [
  {
    value: "42%",
    direction: "down",
    label: "Reduction in troubleshooting time",
    desc: "Mean time to diagnosis decreased across all incident types",
    color: "text-green-400",
  },
  {
    value: "37%",
    direction: "down",
    label: "Fewer operational interruptions",
    desc: "Recurring incidents identified and prevented earlier",
    color: "text-green-400",
  },
  {
    value: "2.4x",
    direction: "up",
    label: "Faster root-cause identification",
    desc: "AI-powered diagnostics accelerate isolation of failure modes",
    color: "text-accent",
  },
];

const container = {
  hidden: { opacity: 0 },
  visible: { transition: { staggerChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function ResultsSection() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/[0.02] to-background" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block rounded-full border border-card-border/50 bg-card/50 px-4 py-1.5 text-xs tracking-[3px] text-muted uppercase mb-4">
            Proven Results
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Measurable{" "}
            <span className="gradient-text">Operational Impact</span>
          </h2>
          <p className="mt-4 mx-auto max-w-2xl text-muted">
            Real improvements from organizations using FixFlow AI for operational troubleshooting and incident response.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {METRICS.map((m, i) => (
            <motion.div
              key={i}
              variants={item}
              className="relative group"
            >
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-b from-accent/10 to-transparent opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
              <div className="relative rounded-2xl border border-card-border/50 bg-card/40 p-8 text-center transition-all duration-300 hover:border-accent/30 hover:bg-card/60">
                <div className="flex items-center justify-center gap-3 mb-3">
                  {m.direction === "down" ? (
                    <svg className="h-8 w-8 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                    </svg>
                  ) : (
                    <svg className="h-8 w-8 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M7 11l5-5m0 0l5 5m-5-5v12" />
                    </svg>
                  )}
                  <span className={`text-5xl sm:text-6xl font-black tracking-tight ${m.color}`}>
                    {m.value}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{m.label}</h3>
                <p className="text-sm text-muted leading-relaxed">{m.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-card-border/30 bg-card/20 px-5 py-2">
            <span className="flex h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-muted/80">
              Based on aggregated data from 10K+ resolved incidents across 6 industry verticals
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
