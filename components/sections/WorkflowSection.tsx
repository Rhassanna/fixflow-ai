"use client";

import { motion } from "framer-motion";

const workflowSteps = [
  {
    number: "01",
    title: "Incident Submission",
    description:
      "Operator reports equipment, symptoms, alarms, and operating conditions to FixFlow AI.",
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Diagnostic Analysis",
    description:
      "AI evaluates symptoms against operational memory and knowledge sources using structured troubleshooting logic.",
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Severity Classification",
    description:
      "Issue classified as Critical, High, Medium, or Low based on safety, production, and operational impact.",
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 9v2m0 4h.01" />
        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Resolution & Escalation",
    description:
      "Actionable steps delivered with safety notes, required tools, references, and automatic escalation if needed.",
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 12l2 2 4-4" />
        <path d="M12 2a10 10 0 100 20 10 10 0 000-20z" />
      </svg>
    ),
  },
];

const stepVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.15 },
  }),
};

export default function WorkflowSection() {
  return (
    <section id="workflow" className="relative py-24 sm:py-32">
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
            Operational Workflow
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            From Problem to Fix in{" "}
            <span className="gradient-text">Four Steps</span>
          </h2>
          <p className="mt-4 mx-auto max-w-2xl text-muted">
            FixFlow AI transforms operational chaos into structured,
            actionable intelligence.
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-accent/40 via-accent/20 to-transparent hidden md:block" />

          <div className="space-y-12">
            {workflowSteps.map((step, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={stepVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="relative md:pl-20"
              >
                <div className="absolute left-0 top-0 hidden md:flex h-16 w-16 items-center justify-center rounded-xl border border-card-border bg-card">
                  <span className="text-sm font-bold text-accent">
                    {step.number}
                  </span>
                </div>

                <div className="rounded-xl border border-card-border/50 bg-card/30 p-6 transition-all duration-300 hover:border-accent/30 hover:bg-card/50">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent md:hidden">
                      {step.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-white">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-sm text-muted leading-relaxed pl-0 md:pl-0">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 rounded-xl border border-accent/20 bg-accent/5 p-8 text-center"
        >
          <div className="mx-auto max-w-2xl">
            <span className="text-xs tracking-[3px] text-accent uppercase font-semibold">
              Three Operational Modes
            </span>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  label: "Fast Response",
                  desc: "Known issues in seconds",
                  color: "text-green-400",
                },
                {
                  label: "Diagnostic",
                  desc: "Deep root-cause analysis",
                  color: "text-accent",
                },
                {
                  label: "Emergency",
                  desc: "Safety-first containment",
                  color: "text-red-400",
                },
              ].map((mode, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-card-border/50 bg-card/30 p-4"
                >
                  <span className={`text-sm font-bold ${mode.color}`}>
                    {mode.label}
                  </span>
                  <p className="mt-1 text-xs text-muted/80">{mode.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
