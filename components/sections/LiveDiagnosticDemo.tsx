"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Phase = "initializing" | "intake" | "safety" | "severity" | "analyzing" | "results" | "complete";

const STEP_DELAYS: Record<Phase, number> = {
  initializing: 1200,
  intake: 2500,
  safety: 1800,
  severity: 1500,
  analyzing: 2800,
  results: 2000,
  complete: 500,
};

const TYPING_TEXTS = [
  "Ingesting incident data...",
  "Parsing telemetry: Pump A centrifugal pump",
  "Reading vibration amplitude: 11.2 mm/s RMS",
  "Reading bearing temperature: 92°C",
  "Processing alarm code: VIB-221",
  "Cross-referencing equipment history...",
  "Scanning operational memory for similar incidents...",
];

const ROOT_CAUSES = [
  { rank: 1, label: "Bearing Wear / Incipient Failure", probability: "87%", color: "text-red-400" },
  { rank: 2, label: "Coupling Misalignment", probability: "62%", color: "text-amber-400" },
  { rank: 3, label: "Cavitation (suction-side)", probability: "34%", color: "text-yellow-400" },
  { rank: 4, label: "Rotor Imbalance", probability: "21%", color: "text-muted" },
];

const STEPS = [
  "Monitor bearing temperature trend; initiate controlled shutdown if >95°C",
  "Inspect coupling for wear, misalignment, or loose fasteners",
  "Verify suction pressure, NPSH, and flow rate against pump curve",
  "Capture vibration frequency spectrum to isolate defect type",
  "Check oil level, quality, and contamination",
];

const TOOLS = [
  "Vibration analyzer",
  "Thermal camera",
  "Dial indicator",
  "Lubrication inspection kit",
];

const useTypewriter = (texts: string[], speed = 35) => {
  const [displayed, setDisplayed] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (textIndex >= texts.length) return;
    const current = texts[textIndex];
    if (charIndex < current.length) {
      const t = setTimeout(() => {
        setDisplayed((p) => p + current[charIndex]);
        setCharIndex((p) => p + 1);
      }, speed);
      return () => clearTimeout(t);
    } else {
      setDisplayed((p) => p + "\n");
      setTextIndex((p) => p + 1);
      setCharIndex(0);
    }
  }, [textIndex, charIndex, texts, speed]);

  return displayed;
};

export default function LiveDiagnosticDemo() {
  const [phase, setPhase] = useState<Phase>("initializing");
  const [progress, setProgress] = useState(0);
  const [restartKey, setRestartKey] = useState(0);

  const phases: Phase[] = ["initializing", "intake", "safety", "severity", "analyzing", "results", "complete"];

  const advance = useCallback(() => {
    setPhase((prev) => {
      const idx = phases.indexOf(prev);
      return idx < phases.length - 1 ? phases[idx + 1] : prev;
    });
  }, []);

  useEffect(() => {
    setProgress(0);
    const phaseIdx = phases.indexOf(phase);
    const target = ((phaseIdx + 1) / phases.length) * 100;
    const dur = STEP_DELAYS[phase] || 1500;

    const pInterval = setInterval(() => {
      setProgress((p) => {
        const next = p + 1.5;
        return next >= target ? target : next;
      });
    }, dur / (target - progress || 1) * 10);

    const t = setTimeout(advance, dur);
    return () => {
      clearTimeout(t);
      clearInterval(pInterval);
    };
  }, [phase, restartKey]);

  const typedOutput = useTypewriter(
    phase === "intake" ? TYPING_TEXTS : [],
    25
  );

  const restart = () => {
    setPhase("initializing");
    setProgress(0);
    setRestartKey((p) => p + 1);
  };

  return (
    <section className="relative py-24 sm:py-32" id="live-demo">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/[0.02] to-background" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block rounded-full border border-card-border/50 bg-card/50 px-4 py-1.5 text-xs tracking-[3px] text-muted uppercase mb-4">
            Live Diagnostic Demo
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Real-Time{" "}
            <span className="gradient-text">AI Diagnosis</span>
          </h2>
          <p className="mt-4 mx-auto max-w-2xl text-muted">
            Watch FixFlow AI analyze a pump vibration incident in real time — from incident intake to resolution steps.
          </p>
        </motion.div>

        <div className="rounded-2xl border border-card-border/50 bg-card/20 backdrop-blur-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 border-b border-card-border/30 bg-card/40">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
              </div>
              <span className="text-[11px] tracking-[2px] text-muted/60 uppercase ml-2">
                FixFlow AI — Operational Console
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[10px] text-green-400/80 font-medium">LIVE</span>
              {phase === "complete" && (
                <button
                  onClick={restart}
                  className="ml-4 text-[10px] tracking-[2px] text-accent hover:text-white transition-colors uppercase"
                >
                  Restart
                </button>
              )}
            </div>
          </div>

          <div className="px-2">
            <div className="flex items-center gap-3 py-2.5 px-3">
              <div className="flex-1 h-1.5 rounded-full bg-card-border/30 overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-accent to-primary-light"
                  style={{ width: `${Math.max(progress, 3)}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <span className="text-[10px] text-muted/60 font-mono w-8 text-right">
                {Math.round(progress)}%
              </span>
            </div>
          </div>

          <div className="p-5 sm:p-6 font-mono text-xs sm:text-sm leading-relaxed space-y-4 min-h-[500px]">
            {/* Phase: Initializing */}
            <AnimatePresence mode="wait">
              {phase === "initializing" && (
                <motion.div
                  key="init"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-3"
                >
                  <div className="flex items-center gap-2 text-accent">
                    <span className="flex h-2 w-2 rounded-full bg-accent animate-pulse" />
                    <span className="text-[10px] tracking-[3px] uppercase font-semibold">
                      Initializing Diagnostic Engine
                    </span>
                  </div>
                  <div className="space-y-1 pl-4">
                    {["Loading operational memory...", "Connecting knowledge graph...", "Calibrating diagnostic models..."].map((l, i) => (
                      <motion.p
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + i * 0.4 }}
                        className="text-muted/70"
                      >
                        {l}
                      </motion.p>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Phase: Intake */}
              {phase === "intake" && (
                <motion.div
                  key="intake"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="flex items-center gap-2 text-accent mb-3">
                    <span className="flex h-2 w-2 rounded-full bg-accent animate-pulse" />
                    <span className="text-[10px] tracking-[3px] uppercase font-semibold">
                      Incident Data Ingestion
                    </span>
                  </div>
                  <div className="pl-4 text-muted/80 whitespace-pre-line">
                    {typedOutput}
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ repeat: Infinity, duration: 0.6 }}
                      className="inline-block w-2 h-4 bg-accent/60 ml-0.5 align-middle"
                    />
                  </div>
                </motion.div>
              )}

              {/* Phase: Safety */}
              {phase === "safety" && (
                <motion.div
                  key="safety"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="flex items-center gap-2 text-accent mb-3">
                    <span className="flex h-2 w-2 rounded-full bg-accent animate-pulse" />
                    <span className="text-[10px] tracking-[3px] uppercase font-semibold">
                      Safety Protocol Check
                    </span>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="rounded-xl border border-red-400/30 bg-red-400/5 p-4"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-lg mt-0.5">⚠️</span>
                      <div>
                        <p className="text-sm font-semibold text-red-400">
                          SAFETY WARNING
                        </p>
                        <p className="text-xs text-red-300/80 mt-1">
                          Rotating equipment hazard detected. Elevated bearing temperature (92°C). LOTO required before inspection. Use hearing protection.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mt-3 pl-4 text-[11px] text-green-400/70"
                  >
                    Safety check complete — warnings generated.
                  </motion.p>
                </motion.div>
              )}

              {/* Phase: Severity */}
              {phase === "severity" && (
                <motion.div
                  key="severity"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="flex items-center gap-2 text-accent mb-3">
                    <span className="flex h-2 w-2 rounded-full bg-accent animate-pulse" />
                    <span className="text-[10px] tracking-[3px] uppercase font-semibold">
                      Severity Classification
                    </span>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="inline-flex items-center gap-3 rounded-xl border border-amber-400/30 bg-amber-400/5 px-5 py-3"
                  >
                    <span className="flex h-3 w-3 rounded-full bg-amber-400 animate-pulse" />
                    <div>
                      <span className="text-sm font-bold text-amber-400 tracking-wide">
                        HIGH SEVERITY
                      </span>
                      <p className="text-[11px] text-amber-300/60 mt-0.5">
                        Production downtime risk — priority escalation recommended
                      </p>
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mt-3 pl-4 text-[11px] text-muted/60"
                  >
                    Classification criteria: Vibration amplitude (11.2 mm/s RMS) exceeds ISO 10816-3 alert threshold.
                  </motion.div>
                </motion.div>
              )}

              {/* Phase: Analyzing */}
              {phase === "analyzing" && (
                <motion.div
                  key="analyzing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="flex items-center gap-2 text-accent mb-4">
                    <span className="flex h-2 w-2 rounded-full bg-accent animate-pulse" />
                    <span className="text-[10px] tracking-[3px] uppercase font-semibold">
                      Root Cause Analysis
                    </span>
                  </div>
                  <div className="pl-4 space-y-2">
                    {[
                      "Running diagnostic algorithms...",
                      "Cross-referencing vibration signature...",
                      "Comparing against 147 similar incidents...",
                      "Calculating probability distributions...",
                    ].map((l, i) => (
                      <motion.p
                        key={i}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + i * 0.5 }}
                        className="text-muted/70"
                      >
                        <motion.span
                          animate={{ opacity: [1, 0] }}
                          transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.3 }}
                          className="inline-block w-2 h-2 rounded-full bg-accent/40 mr-2"
                        />
                        {l}
                      </motion.p>
                    ))}
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 2.2 }}
                      className="text-green-400/70 text-[11px] mt-3"
                    >
                      ✓ Analysis complete. Generating diagnostic report...
                    </motion.p>
                  </div>
                </motion.div>
              )}

              {/* Phase: Results */}
              {(phase === "results" || phase === "complete") && (
                <motion.div
                  key="results"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-5"
                >
                  <div className="flex items-center gap-2 text-accent mb-1">
                    <span className="flex h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-[10px] tracking-[3px] uppercase font-semibold text-green-400">
                      Diagnostic Report — Confidence: High (94.7%)
                    </span>
                    <span className="text-[10px] text-muted/60 ml-auto">Completed in 1.2s</span>
                  </div>

                  <div>
                    <p className="text-[10px] tracking-[2px] text-muted/60 uppercase mb-2">
                      Root Cause Rankings
                    </p>
                    <div className="space-y-1.5">
                      {ROOT_CAUSES.map((rc, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.12 }}
                          className="flex items-center justify-between rounded-lg border border-card-border/30 bg-card/30 px-3 py-2 text-xs"
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="flex-shrink-0 flex h-5 w-5 items-center justify-center rounded-md bg-accent/15 text-[10px] font-bold text-accent">
                              {rc.rank}
                            </span>
                            <span className="text-muted/90">{rc.label}</span>
                          </div>
                          <span className={`font-semibold text-[11px] ${rc.color}`}>{rc.probability}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-[10px] tracking-[2px] text-muted/60 uppercase mb-2">
                      Recommended Steps
                    </p>
                    <div className="space-y-1">
                      {STEPS.map((step, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + i * 0.1 }}
                          className="flex items-start gap-2.5 px-3 py-1.5"
                        >
                          <span className="flex-shrink-0 mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-accent/15 text-[9px] font-bold text-accent">
                            {i + 1}
                          </span>
                          <span className="text-xs text-muted/80">{step}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.2 }}
                      className="rounded-lg border border-card-border/30 bg-card/30 p-3"
                    >
                      <p className="text-[9px] tracking-[2px] text-muted/60 uppercase mb-1.5">Required Tools</p>
                      <ul className="space-y-0.5">
                        {TOOLS.map((t, i) => (
                          <li key={i} className="text-[11px] text-muted/80 flex items-center gap-1.5">
                            <span className="text-accent/60">▸</span> {t}
                          </li>
                        ))}
                      </ul>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.35 }}
                      className="rounded-lg border border-card-border/30 bg-card/30 p-3"
                    >
                      <p className="text-[9px] tracking-[2px] text-muted/60 uppercase mb-1.5">Escalation Path</p>
                      <p className="text-[11px] text-amber-400 font-medium">Mechanical Maintenance Supervisor</p>
                      <p className="text-[10px] text-muted/60 mt-0.5">Priority: High — Immediate</p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.5 }}
                      className="rounded-lg border border-card-border/30 bg-card/30 p-3"
                    >
                      <p className="text-[9px] tracking-[2px] text-muted/60 uppercase mb-1.5">Recommendation</p>
                      <p className="text-[11px] text-muted/80">Schedule bearing replacement at next maintenance window. Implement predictive vibration monitoring.</p>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="px-5 py-3 border-t border-card-border/30 bg-card/40 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-muted/60">Status:</span>
              {phase === "complete" ? (
                <span className="text-[10px] text-green-400 font-medium flex items-center gap-1.5">
                  <span className="flex h-1.5 w-1.5 rounded-full bg-green-400" />
                  Diagnosis Complete
                </span>
              ) : (
                <span className="text-[10px] text-accent font-medium flex items-center gap-1.5">
                  <span className="flex h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                  {phase === "initializing" && "Initializing..."}
                  {phase === "intake" && "Ingesting data..."}
                  {phase === "safety" && "Checking safety..."}
                  {phase === "severity" && "Classifying severity..."}
                  {phase === "analyzing" && "Analyzing..."}
                  {phase === "results" && "Generating report..."}
                </span>
              )}
            </div>
            <div className="flex items-center gap-3 text-[10px] text-muted/50">
              <span>Pump A • VIB-221</span>
              <span>ISO 10816-3</span>
              <span>v6.0</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
