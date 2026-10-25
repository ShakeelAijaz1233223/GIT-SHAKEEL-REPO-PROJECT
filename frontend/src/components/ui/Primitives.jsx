import React, { useState } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { ChevronDown, CheckCircle2, AlertTriangle, Info } from 'lucide-react';
import { AuroraBackground } from './AuroraBackground';

/* Legacy backdrop helper — now delegates to the V12 aurora engine. */
export function AnimatedWhiteBackdrop() {
  return <AuroraBackground variant="hero" />;
}

export function MotionReveal({ children, delay = 0, className = '' }) {
  const shouldReduce = useReducedMotion();
  if (shouldReduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({ eyebrow, title, highlight, subtitle, align = 'left' }) {
  const center = align === 'center';
  return (
    <div className={`mb-7 ${center ? 'mx-auto max-w-4xl text-center' : 'w-full'}`}>
      {eyebrow && (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-200 bg-gradient-to-r from-indigo-50 to-cyan-50 px-3.5 py-1 text-[11px] font-black uppercase tracking-wider text-indigo-700 shadow-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400" />
          {eyebrow}
        </span>
      )}
      <h2 className="mt-3 font-display text-2xl font-black leading-tight tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
        {title}{' '}
        {highlight && (
          <span className="ud-text-gradient">{highlight}</span>
        )}
      </h2>
      {subtitle && (
        <p
          className={`mt-2 text-sm leading-relaxed text-slate-600 sm:text-base ${
            center ? 'mx-auto max-w-3xl' : 'max-w-4xl'
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

export function AccordionItem({ question, answer, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <motion.div
      whileHover={{ y: -1 }}
      className={`overflow-hidden rounded-2xl border bg-white transition-colors ${
        open
          ? 'border-indigo-200 shadow-[0_18px_44px_-32px_rgba(49,46,129,0.9)]'
          : 'border-slate-200 shadow-sm hover:border-indigo-200'
      }`}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-extrabold text-slate-900 transition-colors hover:bg-slate-50/70 sm:text-base"
      >
        <span className="flex items-start gap-2.5">
          <span
            className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md text-[10px] font-black text-white ${
              open
                ? 'bg-gradient-to-br from-indigo-500 to-cyan-500'
                : 'bg-gradient-to-br from-slate-300 to-slate-400'
            }`}
          >
            ?
          </span>
          <span>{question}</span>
        </span>
        <span
          className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border transition-all duration-300 ${
            open
              ? 'rotate-180 border-indigo-200 bg-indigo-50 text-indigo-600'
              : 'border-slate-200 bg-slate-50 text-slate-500'
          }`}
        >
          <ChevronDown size={15} />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="border-t border-slate-100 px-5 pb-4 pt-3 text-sm leading-relaxed text-slate-600">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function ToastNotification({ toast }) {
  const tone =
    toast?.tone === 'error' ? 'error' : toast?.tone === 'success' ? 'success' : 'info';
  const Icon = tone === 'error' ? AlertTriangle : tone === 'success' ? CheckCircle2 : Info;
  const theme =
    tone === 'error'
      ? { bar: 'from-rose-500 to-orange-500', ring: 'border-rose-200', text: 'text-rose-800' }
      : tone === 'success'
        ? { bar: 'from-emerald-500 to-teal-500', ring: 'border-emerald-200', text: 'text-emerald-800' }
        : { bar: 'from-indigo-500 to-cyan-500', ring: 'border-indigo-200', text: 'text-indigo-800' };

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          key={toast.id}
          initial={{ opacity: 0, y: 18, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.97 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          role="status"
          aria-live="polite"
          className={`fixed bottom-5 right-4 z-[95] flex max-w-[92vw] items-center gap-2.5 overflow-hidden rounded-2xl border bg-white/95 px-3 py-2.5 pl-2 shadow-[0_28px_60px_-30px_rgba(30,27,105,0.65)] backdrop-blur sm:right-6 ${theme.ring}`}
        >
          <span
            className={`grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${theme.bar} text-white`}
          >
            <Icon size={16} />
          </span>
          <span className={`text-xs font-bold sm:text-[13px] ${theme.text}`}>{toast.message}</span>
          <motion.span
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0 }}
            transition={{ duration: 3.6, ease: 'linear' }}
            className={`absolute inset-x-0 bottom-0 h-0.5 origin-left bg-gradient-to-r ${theme.bar}`}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
