"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Diagnosis = {
  severity: string;
  severityColor: string;
  problem: string;
  cause: string;
  confidence: string;
  steps: string[];
  time: string;
};

const diagnoses: Diagnosis[] = [
  {
    severity: "High",
    severityColor: "text-amber-400",
    problem: "Pump A — High Vibration Alarm",
    cause: "Bearing wear detected (most probable)",
    confidence: "High",
    time: "1.2s",
    steps: [
      "Measure bearing temperature",
      "Verify shaft alignment",
      "Inspect coupling condition",
      "Check lubrication level",
    ],
  },
  {
    severity: "Critical",
    severityColor: "text-red-400",
    problem: "Motor B — Overheating Trip",
    cause: "Cooling fan failure / blocked vent",
    confidence: "High",
    time: "0.8s",
    steps: [
      "Lockout/Tagout motor circuit",
      "Inspect cooling fan assembly",
      "Check air intake vents",
      "Verify thermal overload settings",
    ],
  },
  {
    severity: "Medium",
    severityColor: "text-yellow-400",
    problem: "Sensor Array C — Drift Error",
    cause: "Calibration drift after 2000h operation",
    confidence: "Medium",
    time: "2.4s",
    steps: [
      "Compare readings against reference sensor",
      "Check environmental conditions",
      "Run calibration sequence",
      "Schedule recalibration",
    ],
  },
];

export default function DemoSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="demo" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/5 to-background" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block rounded-full border border-card-border/50 bg-card/50 px-4 py-1.5 text-xs tracking-[3px] text-muted uppercase mb-4">
            Interactive Demo
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            See FixFlow{" "}
            <span className="gradient-text">in Action</span>
          </h2>
          <p className="mt-4 mx-auto max-w-2xl text-muted">
            Select an incident scenario below and watch FixFlow AI deliver a
            structured diagnosis in real time.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="flex flex-col gap-3">
            {diagnoses.map((d, i) => (
              <motion.button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`text-left rounded-xl border p-5 transition-all duration-300 ${
                  i === activeIndex
                    ? "border-accent bg-accent/10 shadow-lg shadow-accent/10"
                    : "border-card-border/50 bg-card/30 hover:border-card-border hover:bg-card/50"
                }`}
                whileHover={{ x: 4 }}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-xs font-semibold tracking-wide uppercase ${d.severityColor}`}>
                    {d.severity}
                  </span>
                  <span className="text-[10px] text-muted/60">
                    Diagnosed in {d.time}
                  </span>
                </div>
                <h4 className="text-sm font-semibold text-white">
                  {d.problem}
                </h4>
              </motion.button>
            ))}
          </div>

          <div className="relative">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-b from-accent/20 to-transparent blur-xl" />
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="relative rounded-xl border border-card-border bg-card p-6"
              >
                <div className="flex items-center gap-2 mb-4 pb-4 border-b border-card-border/50">
                  <span className="flex h-2 w-2 rounded-full bg-accent animate-pulse" />
                  <span className="text-[10px] tracking-[3px] text-accent uppercase">
                    FixFlow Diagnosis
                  </span>
                  <span className="ml-auto text-[10px] text-muted/60">
                    {diagnoses[activeIndex].time}
                  </span>
                </div>

                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] tracking-[2px] text-muted/60 uppercase">
                      Problem
                    </span>
                    <p className="text-sm text-white font-medium mt-1">
                      {diagnoses[activeIndex].problem}
                    </p>
                  </div>

                  <div>
                    <span className="text-[10px] tracking-[2px] text-muted/60 uppercase">
                      Root Cause
                    </span>
                    <p className="text-sm text-white mt-1">
                      {diagnoses[activeIndex].cause}
                    </p>
                  </div>

                  <div>
                    <span className="text-[10px] tracking-[2px] text-muted/60 uppercase">
                      Confidence
                    </span>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-white font-semibold">
                        {diagnoses[activeIndex].confidence}
                      </span>
                      <span
                        className={`text-[10px] font-medium ${
                          diagnoses[activeIndex].confidence === "High"
                            ? "text-green-400"
                            : "text-yellow-400"
                        }`}
                      >
                        {diagnoses[activeIndex].confidence === "High" ? "95%" : "72%"}
                      </span>
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] tracking-[2px] text-muted/60 uppercase">
                      Recommended Steps
                    </span>
                    <ol className="mt-2 space-y-1.5">
                      {diagnoses[activeIndex].steps.map((step, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-2 text-sm text-muted"
                        >
                          <span className="flex-shrink-0 mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-accent/20 text-[10px] font-medium text-accent">
                            {j + 1}
                          </span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-card-border/50">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted/60">
                      ⚠️ Safety: LOTO required before inspection
                    </span>
                    <span className="text-[10px] tracking-[2px] text-muted/40 uppercase">
                      Escalate
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
