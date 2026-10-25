/* ============================================================================
   V12 PALETTE — one source of truth for every gradient in the UI
   ========================================================================== */

export const CATEGORY_THEME = {
  social: {
    label: 'Social Media',
    gradient: 'from-fuchsia-500 via-pink-500 to-rose-500',
    soft: 'from-fuchsia-50 via-pink-50 to-rose-50',
    text: 'text-fuchsia-600',
    ring: 'ring-fuchsia-200',
    border: 'border-fuchsia-200',
    chip: 'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200',
    glow: 'rgba(217,70,239,0.22)',
    dot: '#d946ef',
  },
  video: {
    label: 'Streaming · Video · Music',
    gradient: 'from-indigo-500 via-blue-500 to-cyan-400',
    soft: 'from-indigo-50 via-blue-50 to-cyan-50',
    text: 'text-indigo-600',
    ring: 'ring-indigo-200',
    border: 'border-indigo-200',
    chip: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    glow: 'rgba(79,70,229,0.22)',
    dot: '#4f46e5',
  },
  education: {
    label: 'Courses & Learning',
    gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
    soft: 'from-emerald-50 via-teal-50 to-cyan-50',
    text: 'text-emerald-600',
    ring: 'ring-emerald-200',
    border: 'border-emerald-200',
    chip: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    glow: 'rgba(16,185,129,0.22)',
    dot: '#10b981',
  },
  cloud_terabox: {
    label: 'TeraBox & Cloud',
    gradient: 'from-sky-500 via-cyan-500 to-blue-600',
    soft: 'from-sky-50 via-cyan-50 to-blue-50',
    text: 'text-sky-600',
    ring: 'ring-sky-200',
    border: 'border-sky-200',
    chip: 'bg-sky-50 text-sky-700 border-sky-200',
    glow: 'rgba(14,165,233,0.22)',
    dot: '#0ea5e9',
  },
  web: {
    label: 'AI · Search · Shopping · Dev',
    gradient: 'from-amber-500 via-orange-500 to-rose-500',
    soft: 'from-amber-50 via-orange-50 to-rose-50',
    text: 'text-amber-600',
    ring: 'ring-amber-200',
    border: 'border-amber-200',
    chip: 'bg-amber-50 text-amber-700 border-amber-200',
    glow: 'rgba(245,158,11,0.22)',
    dot: '#f59e0b',
  },
  all: {
    label: 'All Platforms',
    gradient: 'from-indigo-500 via-violet-500 to-fuchsia-500',
    soft: 'from-indigo-50 via-violet-50 to-fuchsia-50',
    text: 'text-indigo-600',
    ring: 'ring-indigo-200',
    border: 'border-indigo-200',
    chip: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    glow: 'rgba(99,102,241,0.22)',
    dot: '#6366f1',
  },
};

export function categoryTheme(id) {
  return CATEGORY_THEME[id] || CATEGORY_THEME.all;
}

export const SPECTRUM = ['#6366f1', '#22d3ee', '#a855f7', '#f472b6', '#f59e0b', '#10b981'];

export function spectrumFor(seed = '') {
  const text = String(seed);
  let hash = 0;
  for (let i = 0; i < text.length; i += 1) hash = (hash * 31 + text.charCodeAt(i)) % 99991;
  return SPECTRUM[hash % SPECTRUM.length];
}

export const STAT_ACCENTS = {
  indigo: {
    text: 'text-indigo-600',
    bg: 'bg-indigo-50',
    border: 'border-indigo-200',
    gradient: 'from-indigo-500 to-violet-500',
    glow: 'rgba(99,102,241,0.28)',
  },
  cyan: {
    text: 'text-cyan-600',
    bg: 'bg-cyan-50',
    border: 'border-cyan-200',
    gradient: 'from-cyan-400 to-sky-500',
    glow: 'rgba(34,211,238,0.28)',
  },
  emerald: {
    text: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    gradient: 'from-emerald-500 to-teal-500',
    glow: 'rgba(16,185,129,0.28)',
  },
  amber: {
    text: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    gradient: 'from-amber-500 to-orange-500',
    glow: 'rgba(245,158,11,0.28)',
  },
  fuchsia: {
    text: 'text-fuchsia-600',
    bg: 'bg-fuchsia-50',
    border: 'border-fuchsia-200',
    gradient: 'from-fuchsia-500 to-pink-500',
    glow: 'rgba(217,70,239,0.28)',
  },
  violet: {
    text: 'text-violet-600',
    bg: 'bg-violet-50',
    border: 'border-violet-200',
    gradient: 'from-violet-500 to-indigo-500',
    glow: 'rgba(139,92,246,0.28)',
  },
};
