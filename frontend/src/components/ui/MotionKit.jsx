import React, { useEffect, useRef, useState } from 'react';
import {
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';

/* ============================================================================
   MOTION KIT · V12
   Reusable Framer-Motion primitives shared by the public site and the admin
   console. Every animation respects `prefers-reduced-motion`.
   ========================================================================== */

export const EASE_OUT = [0.22, 1, 0.36, 1];
export const SPRING_SOFT = { type: 'spring', stiffness: 320, damping: 30, mass: 0.7 };

/* ------------------------------------------------------------------ Reveal */
export function Reveal({
  children,
  delay = 0,
  y = 22,
  x = 0,
  scale = 1,
  once = true,
  amount = 0.15,
  className = '',
  as = 'div',
}) {
  const reduce = useReducedMotion();
  const Comp = motion[as] || motion.div;
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <Comp
      initial={{ opacity: 0, y, x, scale }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      viewport={{ once, amount }}
      transition={{ duration: 0.55, delay, ease: EASE_OUT }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </Comp>
  );
}

/* ----------------------------------------------------------------- Stagger */
export function Stagger({ children, className = '', delayChildren = 0.05, stagger = 0.06 }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      variants={{
        hidden: {},
        show: { transition: { delayChildren, staggerChildren: stagger } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export const staggerItem = {
  hidden: { opacity: 0, y: 18, scale: 0.985 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: EASE_OUT } },
};

export function StaggerItem({ children, className = '', as = 'div' }) {
  const Comp = motion[as] || motion.div;
  return (
    <Comp variants={staggerItem} className={`will-change-transform ${className}`}>
      {children}
    </Comp>
  );
}

/* ------------------------------------------------------------ GradientText */
export function GradientText({ children, className = '', variant = 'brand' }) {
  const map = {
    brand: 'ud-text-gradient',
    sunrise: 'ud-text-gradient-sunrise',
    candy: 'ud-text-gradient-candy',
  };
  return <span className={`${map[variant] || map.brand} ${className}`}>{children}</span>;
}

/* ----------------------------------------------------------------- CountUp */
export function CountUp({ to = 0, duration = 1.4, decimals = 0, prefix = '', suffix = '', className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return undefined;
    if (reduce) {
      setValue(to);
      return undefined;
    }
    let frame;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(to * eased);
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, to, duration, reduce]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {prefix}
      {Number(value).toFixed(decimals)}
      {suffix}
    </span>
  );
}

/* ----------------------------------------------------------------- Marquee */
export function Marquee({ children, speed = 'normal', className = '', fade = true }) {
  const reduce = useReducedMotion();
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {fade && (
        <>
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent" />
        </>
      )}
      <div
        className={`ud-marquee-track ${speed === 'fast' ? 'ud-marquee-fast' : ''} ${
          reduce ? '' : ''
        }`}
        style={reduce ? { animation: 'none' } : undefined}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------- Spotlight GlowCard */
export function GlowCard({
  children,
  className = '',
  glowColor = 'rgba(99,102,241,0.18)',
  borderClass = 'border-slate-200/90',
  as = 'div',
  ...rest
}) {
  const ref = useRef(null);
  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);
  const reduce = useReducedMotion();
  const background = useMotionTemplate`radial-gradient(220px circle at ${mx}px ${my}px, ${glowColor}, transparent 72%)`;
  const Comp = motion[as] || motion.div;

  return (
    <Comp
      ref={ref}
      onMouseMove={(e) => {
        if (reduce || !ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        mx.set(e.clientX - rect.left);
        my.set(e.clientY - rect.top);
      }}
      onMouseLeave={() => {
        mx.set(-300);
        my.set(-300);
      }}
      whileHover={reduce ? undefined : { y: -3 }}
      transition={{ duration: 0.18, ease: EASE_OUT }}
      className={`group relative overflow-hidden rounded-2xl border bg-white ${borderClass} ${className}`}
      {...rest}
    >
      {!reduce && (
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          style={{ background }}
        />
      )}
      <div className="relative z-10 h-full">{children}</div>
    </Comp>
  );
}

/* ---------------------------------------------------------------- TiltCard */
export function TiltCard({ children, className = '', max = 6 }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const rx = useSpring(0, { stiffness: 220, damping: 20 });
  const ry = useSpring(0, { stiffness: 220, damping: 20 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => {
        if (reduce || !ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        ry.set(px * max * 2);
        rx.set(-py * max * 2);
      }}
      onMouseLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------- Magnetic box */
export function Magnetic({ children, className = '', strength = 12 }) {
  const reduce = useReducedMotion();
  const x = useSpring(0, { stiffness: 260, damping: 18 });
  const y = useSpring(0, { stiffness: 260, damping: 18 });
  return (
    <motion.div
      style={{ x, y }}
      className={`inline-flex ${className}`}
      onMouseMove={(e) => {
        if (reduce) return;
        const rect = e.currentTarget.getBoundingClientRect();
        x.set(((e.clientX - rect.left) / rect.width - 0.5) * strength * 2);
        y.set(((e.clientY - rect.top) / rect.height - 0.5) * strength);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/* ---------------------------------------------------------------- PillTabs */
export function PillTabs({
  tabs,
  value,
  onChange,
  layoutId = 'pill-tabs',
  className = '',
  tone = 'light',
  size = 'md',
}) {
  return (
    <div
      role="tablist"
      className={`inline-flex flex-wrap items-center gap-1 rounded-2xl p-1 ${
        tone === 'dark'
          ? 'bg-white/[0.04] border border-white/10'
          : 'bg-slate-100/90 border border-slate-200/80'
      } ${className}`}
    >
      {tabs.map((tab) => {
        const active = value === tab.id;
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={active}
            type="button"
            onClick={() => onChange(tab.id)}
            className={`relative inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-[11px] font-extrabold transition-colors sm:text-xs ${
              size === 'sm' ? 'px-2.5 py-1' : ''
            } ${
              active
                ? tone === 'dark'
                  ? 'text-white'
                  : 'text-indigo-700'
                : tone === 'dark'
                  ? 'text-slate-400 hover:text-slate-100'
                  : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {active && (
              <motion.span
                layoutId={layoutId}
                transition={SPRING_SOFT}
                className={`absolute inset-0 rounded-xl ${
                  tone === 'dark'
                    ? 'bg-gradient-to-r from-indigo-500/25 to-cyan-500/20 border border-indigo-400/40'
                    : 'bg-white shadow-sm border border-slate-200/90'
                }`}
              />
            )}
            {Icon ? <Icon size={13} className="relative z-10" /> : null}
            <span className="relative z-10 whitespace-nowrap">{tab.label}</span>
            {typeof tab.count === 'number' && (
              <span
                className={`relative z-10 rounded-full px-1.5 py-0.5 text-[10px] font-black ${
                  active
                    ? tone === 'dark'
                      ? 'bg-white/15 text-white'
                      : 'bg-indigo-100 text-indigo-700'
                    : tone === 'dark'
                      ? 'bg-white/5 text-slate-400'
                      : 'bg-slate-200/80 text-slate-600'
                }`}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------ ScrollProgress */
export function ScrollProgress({ className = '' }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className={`fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-400 ${className}`}
    />
  );
}

/* ----------------------------------------------------------------- Sparkline */
export function Sparkline({
  points = [],
  color = '#6366f1',
  height = 48,
  className = '',
  strokeWidth = 2,
  fill = true,
  animate = true,
}) {
  const reduce = useReducedMotion();
  const w = 100;
  const h = 32;
  const values = points.length ? points : [6, 14, 9, 20, 13, 24, 18];
  const max = Math.max(...values, 1);
  const min = Math.min(...values, 0);
  const span = max - min || 1;
  const step = w / Math.max(values.length - 1, 1);
  const coords = values.map((v, i) => [i * step, h - ((v - min) / span) * (h - 4) - 2]);
  const line = coords.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`).join(' ');
  const area = `${line} L${w},${h} L0,${h} Z`;
  const gid = `spark-${String(color).replace(/[^a-z0-9]/gi, '')}-${points.length}`;

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
      className={className}
      style={{ height, width: '100%' }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.38" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {fill && <path d={area} fill={`url(#${gid})`} />}
      <motion.path
        d={line}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={animate && !reduce ? { pathLength: 0, opacity: 0.2 } : false}
        whileInView={animate && !reduce ? { pathLength: 1, opacity: 1 } : undefined}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease: EASE_OUT }}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/* -------------------------------------------------------------- RingMeter */
export function RingMeter({ value = 0, max = 100, size = 64, thickness = 7, color = '#6366f1', label }) {
  const pct = Math.max(0, Math.min(1, max ? value / max : 0));
  const r = (size - thickness) / 2;
  const c = 2 * Math.PI * r;
  const reduce = useReducedMotion();
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" aria-hidden="true">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(148,163,184,0.22)" strokeWidth={thickness} />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={thickness}
          strokeLinecap="round"
          strokeDasharray={c}
          initial={reduce ? false : { strokeDashoffset: c }}
          whileInView={{ strokeDashoffset: c * (1 - pct) }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: EASE_OUT }}
          style={{ filter: `drop-shadow(0 0 6px ${color}66)` }}
        />
      </svg>
      <span className="absolute text-[11px] font-black tabular-nums text-slate-700">
        {label ?? `${Math.round(pct * 100)}%`}
      </span>
    </div>
  );
}

/* ---------------------------------------------------------- Typewriter line */
export function WordReveal({ text, className = '', wordClassName = '', delay = 0, step = 0.045 }) {
  const reduce = useReducedMotion();
  const words = String(text || '').split(' ');
  if (reduce) return <span className={className}>{text}</span>;
  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          initial={{ opacity: 0, y: '0.5em', filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.5, delay: delay + i * step, ease: EASE_OUT }}
          className={`inline-block ${wordClassName}`}
        >
          {word}
          {i < words.length - 1 ? '\u00A0' : ''}
        </motion.span>
      ))}
    </span>
  );
}

/* ---------------------------------------------------------------- Parallax */
export function Parallax({ children, distance = 40, className = '' }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  return (
    <div ref={ref} className={className}>
      <motion.div style={reduce ? undefined : { y }} className="will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}

export default {
  Reveal,
  Stagger,
  StaggerItem,
  GradientText,
  CountUp,
  Marquee,
  GlowCard,
  TiltCard,
  Magnetic,
  PillTabs,
  ScrollProgress,
  Sparkline,
  RingMeter,
  WordReveal,
  Parallax,
};
