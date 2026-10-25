import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Film,
  X,
  Radio,
  Globe2,
} from 'lucide-react';

/**
 * V12 ANNOUNCEMENT RIBBON
 * Animated spectrum ribbon with live status, rotating trust pills and a
 * dismiss control. Purely informational — no fake counters.
 */
export function AnnouncementBar() {
  const [open, setOpen] = useState(true);

  const pills = [
    { icon: ShieldCheck, label: '100% Free · No Sign-Up Needed', tone: 'from-emerald-400/25 to-teal-400/20 border-emerald-200/40' },
    { icon: Film, label: 'HD · 4K · MP3 Quality', tone: 'from-sky-400/25 to-blue-400/20 border-sky-200/40' },
    { icon: Zap, label: 'Instant Download Start', tone: 'from-fuchsia-400/25 to-violet-400/20 border-fuchsia-200/40' },
    { icon: Globe2, label: '400+ Websites Supported', tone: 'from-amber-400/25 to-orange-400/20 border-amber-200/40' },
  ];

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-[45] w-full overflow-hidden"
      >
        <div className="ud-gradient-bg-anim relative w-full text-white">
          <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_20%_120%,rgba(255,255,255,0.6),transparent_45%),radial-gradient(circle_at_80%_-20%,rgba(255,255,255,0.35),transparent_50%)]" />

          <div className="relative mx-auto flex w-full max-w-[1600px] flex-wrap items-center justify-between gap-2 px-3 py-1.5 sm:px-6 xl:px-10">
            <div className="flex min-w-0 items-center gap-2">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inset-0 rounded-full bg-white/80 ud-live-dot" />
                <span className="absolute inset-0 rounded-full bg-white/40 blur-[3px]" />
              </span>
              <Radio size={12} className="shrink-0 text-white/90" />
              <span className="truncate text-[11px] font-bold tracking-tight text-white drop-shadow-sm sm:text-xs">
                <Sparkles size={11} className="mr-1 inline -translate-y-px" />
                Watch TeraBox, Reels, Movies, Courses &amp; 4K Videos Online — Then Download in One Click
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              {pills.map((pill, i) => {
                const Icon = pill.icon;
                return (
                  <motion.span
                    key={pill.label}
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06 * i, duration: 0.3 }}
                    className={`hidden items-center gap-1 rounded-full border bg-gradient-to-r px-2.5 py-[3px] text-[10px] font-extrabold backdrop-blur-sm md:inline-flex ${pill.tone}`}
                  >
                    <Icon size={11} />
                    <span className="whitespace-nowrap">{pill.label}</span>
                  </motion.span>
                );
              })}

              <Link
                to="/sites"
                className="group inline-flex items-center gap-1 rounded-full border border-white/30 bg-white/15 px-2.5 py-[3px] text-[10px] font-extrabold backdrop-blur-sm transition-colors hover:bg-white/25"
              >
                <span>All Supported Sites</span>
                <ArrowRight size={11} className="transition-transform group-hover:translate-x-0.5" />
              </Link>

              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Dismiss announcement"
                className="ml-1 hidden h-5 w-5 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/20 hover:text-white sm:inline-flex"
              >
                <X size={12} />
              </button>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-white/30" />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default AnnouncementBar;
