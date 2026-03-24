"use client";

import { BarChart3, CalendarDays, Inbox, UsersRound } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { MotionFloat } from "@/components/motion/Reveal";

const stepIcons = [Inbox, CalendarDays, UsersRound, BarChart3];

type GrowthSystemVisualProps = {
  eyebrow: string;
  title: string;
  description: string;
  steps: string[];
  floatingLeadEyebrow: string;
  floatingLeadText: string;
  floatingReportEyebrow: string;
  floatingReportText: string;
};

export function GrowthSystemVisual({
  eyebrow,
  title,
  description,
  steps,
  floatingLeadEyebrow,
  floatingLeadText,
  floatingReportEyebrow,
  floatingReportText,
}: GrowthSystemVisualProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative mx-auto w-full max-w-[38rem]">
      <div className="pointer-events-none absolute inset-x-8 top-8 h-[24rem] rounded-full bg-[radial-gradient(circle,_color-mix(in_oklab,var(--color-primary)_20%,transparent)_0%,transparent_70%)] blur-3xl" />

      <motion.div
        className="relative overflow-hidden rounded-[2.25rem] border border-white/55 bg-white/70 p-6 shadow-[0_30px_80px_-40px_color-mix(in_oklab,var(--color-primary)_55%,transparent)] backdrop-blur-2xl"
        initial={reduceMotion ? false : { opacity: 0, scale: 0.96, y: 20 }}
        animate={reduceMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(140,92,255,0.16),transparent_36%),radial-gradient(circle_at_bottom_left,_rgba(111,76,255,0.12),transparent_40%)]" />

        <svg
          aria-hidden="true"
          className="absolute inset-0 h-full w-full opacity-70"
          viewBox="0 0 560 420"
          fill="none"
        >
          <path
            d="M80 260C150 240 180 210 214 170C258 118 305 102 390 104"
            stroke="url(#growth-line)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="6 8"
          />
          <path
            d="M170 292C232 275 285 246 334 198C378 154 412 148 468 150"
            stroke="url(#growth-line-soft)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="118" cy="248" r="74" stroke="url(#ring-a)" strokeWidth="1.5" />
          <circle cx="118" cy="248" r="110" stroke="url(#ring-b)" strokeWidth="1.5" />
          <circle cx="420" cy="132" r="86" stroke="url(#ring-c)" strokeWidth="1.5" />
          <defs>
            <linearGradient id="growth-line" x1="80" y1="260" x2="390" y2="104" gradientUnits="userSpaceOnUse">
              <stop stopColor="rgba(140,92,255,0.06)" />
              <stop offset="0.28" stopColor="rgba(140,92,255,0.52)" />
              <stop offset="1" stopColor="rgba(94,70,255,0.22)" />
            </linearGradient>
            <linearGradient id="growth-line-soft" x1="170" y1="292" x2="468" y2="150" gradientUnits="userSpaceOnUse">
              <stop stopColor="rgba(140,92,255,0.08)" />
              <stop offset="0.45" stopColor="rgba(140,92,255,0.26)" />
              <stop offset="1" stopColor="rgba(94,70,255,0.08)" />
            </linearGradient>
            <linearGradient id="ring-a" x1="44" y1="248" x2="192" y2="248" gradientUnits="userSpaceOnUse">
              <stop stopColor="rgba(140,92,255,0.06)" />
              <stop offset="1" stopColor="rgba(140,92,255,0.22)" />
            </linearGradient>
            <linearGradient id="ring-b" x1="8" y1="248" x2="228" y2="248" gradientUnits="userSpaceOnUse">
              <stop stopColor="rgba(140,92,255,0.04)" />
              <stop offset="1" stopColor="rgba(140,92,255,0.16)" />
            </linearGradient>
            <linearGradient id="ring-c" x1="334" y1="132" x2="506" y2="132" gradientUnits="userSpaceOnUse">
              <stop stopColor="rgba(140,92,255,0.05)" />
              <stop offset="1" stopColor="rgba(140,92,255,0.2)" />
            </linearGradient>
          </defs>
        </svg>

        <div className="relative z-10">
          <div className="inline-flex items-center rounded-full border border-primary/15 bg-primary/8 px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-primary">
            {eyebrow}
          </div>
          <h3 className="mt-5 max-w-sm text-2xl font-semibold tracking-tight text-foreground">
            {title}
          </h3>
          <p className="mt-3 max-w-md text-sm leading-7 text-muted-foreground">
            {description}
          </p>

          <div className="mt-7 grid gap-3">
            {steps.map((step, index) => {
              const Icon = stepIcons[index] || BarChart3;

              return (
                <motion.div
                  key={step}
                  initial={reduceMotion ? false : { opacity: 0, x: 20 }}
                  animate={reduceMotion ? undefined : { opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.55,
                    delay: 0.15 + index * 0.12,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="flex items-center gap-3 rounded-[1.4rem] border border-border/45 bg-white/78 px-4 py-3 shadow-[0_20px_45px_-30px_rgba(30,26,62,0.3)] backdrop-blur-md"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/15">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-foreground">{step}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>

      <MotionFloat
        className="absolute -left-3 top-12 hidden rounded-[1.4rem] border border-white/50 bg-white/75 px-4 py-3 shadow-[0_18px_40px_-28px_rgba(30,26,62,0.35)] backdrop-blur-xl md:block"
        delay={0.4}
        duration={6.2}
        y={10}
      >
        <div className="flex items-center gap-3">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_14px_rgba(52,211,153,0.55)]" />
          <div>
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              {floatingLeadEyebrow}
            </p>
            <p className="text-sm font-semibold text-foreground">{floatingLeadText}</p>
          </div>
        </div>
      </MotionFloat>

      <MotionFloat
        className="absolute -right-4 bottom-10 hidden rounded-[1.4rem] border border-white/50 bg-slate-950 px-5 py-4 text-white shadow-[0_24px_55px_-28px_rgba(19,13,46,0.6)] md:block"
        delay={1}
        duration={7}
        y={12}
      >
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-white/55">
          {floatingReportEyebrow}
        </p>
        <p className="mt-2 text-sm font-semibold text-white/95">{floatingReportText}</p>
      </MotionFloat>
    </div>
  );
}
