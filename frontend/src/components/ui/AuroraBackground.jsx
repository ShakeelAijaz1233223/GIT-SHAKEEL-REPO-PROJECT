import React, { useMemo } from 'react';
import { useReducedMotion } from 'framer-motion';

/**
 * ============================================================================
 * AURORA BACKGROUND · V12
 * Animated, colourful, GPU-only mesh background used behind every major
 * surface of the product. Four tuned variants:
 *
 *  hero   → bright aurora mesh (public homepage / hero)
 *  soft   → calmer pastel wash (content sections)
 *  band   → narrow gradient ribbon (strips / CTA)
 *  admin  → deep-space neon grid (admin console)
 *  auth   → locked-vault glow (padlock screen)
 * ============================================================================
 */

const VARIANT_MAP = {
  hero: {
    base: 'bg-[radial-gradient(120%_100%_at_50%_0%,#eef2ff_0%,#ffffff_46%,#ffffff_100%)]',
    blobs: [
      { className: 'ud-blob-a', style: { top: '-14%', left: '-8%', width: '46vw', height: '46vw', background: 'radial-gradient(circle at 35% 35%, #c7d2fe 0%, rgba(199,210,254,0) 70%)' } },
      { className: 'ud-blob-b', style: { top: '-6%', right: '-10%', width: '44vw', height: '44vw', background: 'radial-gradient(circle at 60% 40%, #a5f3fc 0%, rgba(165,243,252,0) 70%)' } },
      { className: 'ud-blob-c', style: { top: '26%', left: '22%', width: '40vw', height: '40vw', background: 'radial-gradient(circle at 50% 50%, #fbcfe8 0%, rgba(251,207,232,0) 72%)' } },
      { className: 'ud-blob-a', style: { top: '34%', right: '12%', width: '34vw', height: '34vw', background: 'radial-gradient(circle at 50% 50%, #ddd6fe 0%, rgba(221,214,254,0) 72%)' } },
    ],
    grid: true,
    dots: true,
  },
  soft: {
    base: 'bg-[linear-gradient(180deg,#ffffff_0%,#f7f9ff_55%,#ffffff_100%)]',
    blobs: [
      { className: 'ud-blob-b', style: { top: '-18%', left: '8%', width: '34vw', height: '34vw', background: 'radial-gradient(circle, #e0e7ff 0%, rgba(224,231,255,0) 70%)' } },
      { className: 'ud-blob-a', style: { bottom: '-24%', right: '4%', width: '32vw', height: '32vw', background: 'radial-gradient(circle, #cffafe 0%, rgba(207,250,254,0) 70%)' } },
    ],
    grid: false,
    dots: true,
  },
  band: {
    base: 'bg-[linear-gradient(100deg,#eef2ff_0%,#ecfeff_45%,#fdf4ff_100%)]',
    blobs: [
      { className: 'ud-blob-a', style: { top: '-60%', left: '18%', width: '28vw', height: '28vw', background: 'radial-gradient(circle, #c4b5fd 0%, rgba(196,181,253,0) 70%)' } },
      { className: 'ud-blob-c', style: { top: '-40%', right: '14%', width: '26vw', height: '26vw', background: 'radial-gradient(circle, #99f6e4 0%, rgba(153,246,228,0) 70%)' } },
    ],
    grid: false,
    dots: false,
  },
  admin: {
    base: 'bg-[radial-gradient(120%_120%_at_15%_0%,#101a3a_0%,#070b18_45%,#04060f_100%)]',
    blobs: [
      { className: 'ud-blob-a', style: { top: '-18%', left: '-6%', width: '44vw', height: '44vw', background: 'radial-gradient(circle, rgba(79,70,229,0.42) 0%, rgba(79,70,229,0) 68%)' } },
      { className: 'ud-blob-b', style: { top: '8%', right: '-12%', width: '42vw', height: '42vw', background: 'radial-gradient(circle, rgba(34,211,238,0.30) 0%, rgba(34,211,238,0) 68%)' } },
      { className: 'ud-blob-c', style: { bottom: '-22%', left: '28%', width: '44vw', height: '44vw', background: 'radial-gradient(circle, rgba(217,70,239,0.26) 0%, rgba(217,70,239,0) 70%)' } },
    ],
    grid: true,
    dots: false,
    dark: true,
  },
  auth: {
    base: 'bg-[radial-gradient(120%_120%_at_50%_120%,#131c46_0%,#080c1c_55%,#04060f_100%)]',
    blobs: [
      { className: 'ud-blob-a', style: { top: '-20%', left: '12%', width: '38vw', height: '38vw', background: 'radial-gradient(circle, rgba(56,189,248,0.34) 0%, rgba(56,189,248,0) 68%)' } },
      { className: 'ud-blob-c', style: { bottom: '-18%', right: '8%', width: '36vw', height: '36vw', background: 'radial-gradient(circle, rgba(168,85,247,0.32) 0%, rgba(168,85,247,0) 70%)' } },
    ],
    grid: false,
    dots: true,
    dark: true,
  },
};

export function AuroraBackground({ variant = 'hero', className = '', intensity = 1 }) {
  const reduce = useReducedMotion();
  const cfg = VARIANT_MAP[variant] || VARIANT_MAP.hero;

  const blobs = useMemo(() => cfg.blobs, [cfg]);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden select-none ${cfg.base} ${className}`}
      style={{ opacity: 0.98 }}
    >
      {blobs.map((blob, index) => (
        <div
          key={index}
          className={`ud-aurora-blob ${reduce ? '' : blob.className}`}
          style={{ ...blob.style, opacity: 0.85 * intensity }}
        />
      ))}

      {cfg.grid && (
        <div
          className={`absolute inset-0 ${reduce ? 'opacity-[0.35]' : 'ud-grid-overlay opacity-70'}`}
          style={
            reduce
              ? {
                  backgroundImage:
                    'linear-gradient(to right, rgba(99,102,241,.10) 1px, transparent 1px), linear-gradient(to bottom, rgba(99,102,241,.10) 1px, transparent 1px)',
                  backgroundSize: '64px 64px',
                  maskImage: 'radial-gradient(ellipse 80% 70% at 50% 20%, black 20%, transparent 78%)',
                  WebkitMaskImage:
                    'radial-gradient(ellipse 80% 70% at 50% 20%, black 20%, transparent 78%)',
                }
              : undefined
          }
        />
      )}

      {cfg.dots && (
        <div className={`absolute inset-0 ${reduce ? 'opacity-50' : 'ud-dots-overlay'} opacity-60`} />
      )}

      {/* Bottom fade keeps text readable */}
      <div
        className={`absolute inset-x-0 bottom-0 h-40 ${
          cfg.dark
            ? 'bg-gradient-to-t from-[#04060f] via-[#04060f]/70 to-transparent'
            : 'bg-gradient-to-t from-white via-white/70 to-transparent'
        }`}
      />
    </div>
  );
}

export default AuroraBackground;
