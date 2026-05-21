"use client";

import { motion } from "framer-motion";

export default function CtaSection() {
  return (
    <section id="cta" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/10 to-background" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block rounded-full border border-card-border/50 bg-card/50 px-4 py-1.5 text-xs tracking-[3px] text-muted uppercase mb-4">
            Get Started
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-balance">
            Ready to Transform Your{" "}
            <span className="gradient-text">Operational Intelligence</span>?
          </h2>
          <p className="mt-6 mx-auto max-w-2xl text-lg text-muted leading-relaxed">
            Deploy FixFlow AI in your environment. Connect your knowledge
            sources and start reducing MTTR from day one.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#"
            className="rounded-lg bg-accent px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-accent/90 glow"
          >
            Book a Demo
          </a>
          <a
            href="#"
            className="rounded-lg border border-card-border bg-card/50 px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-card hover:border-accent/30"
          >
            View Documentation
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8"
        >
          {[
            { value: "< 2s", label: "Avg. Diagnostic Time" },
            { value: "4", label: "Supported Languages" },
            { value: "24/7", label: "Operational Availability" },
          ].map((stat, i) => (
            <div key={i}>
              <p className="text-3xl font-black text-white">{stat.value}</p>
              <p className="mt-1 text-xs tracking-[2px] text-muted/60 uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
