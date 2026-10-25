import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  ArrowUpRight,
  CheckCircle2,
  Sparkles,
  Globe2,
  Layers3,
  X,
  Zap,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PlatformIcon } from '../icons/PlatformIcon';
import { AuroraBackground } from '../ui/AuroraBackground';
import { CountUp, GlowCard, GradientText, Marquee, Reveal, Stagger, StaggerItem } from '../ui/MotionKit';
import { categoryTheme } from '../../theme/palette';

const CATEGORY_META = [
  { id: 'all', label: 'All mainstream', icon: Globe2 },
  { id: 'social', label: 'Social media', icon: Sparkles },
  { id: 'video', label: 'Streaming · Video · Music', icon: Layers3 },
  { id: 'education', label: 'Courses & learning', icon: CheckCircle2 },
  { id: 'cloud_terabox', label: 'TeraBox & cloud', icon: Zap },
  { id: 'web', label: 'AI · Search · Shopping · Dev', icon: Globe2 },
];

export function SupportedSitesSection({
  onPickPlatform,
  initialCategory = 'all',
  showAllByDefault = false,
}) {
  const { platforms, enginePrefs } = useApp();
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [filterText, setFilterText] = useState('');
  const [expanded, setExpanded] = useState(showAllByDefault);

  const counts = useMemo(() => {
    const map = { all: 0, social: 0, video: 0, education: 0, cloud_terabox: 0, web: 0 };
    for (const p of platforms) {
      if (p.isAdult || p.category === 'adult_18') continue;
      map.all += 1;
      if (map[p.category] !== undefined) map[p.category] += 1;
    }
    return map;
  }, [platforms]);

  const categories = useMemo(
    () =>
      CATEGORY_META.map((c) => ({ ...c, count: counts[c.id] ?? 0 })).filter(
        (c) => c.id === 'all' || c.count > 0
      ),
    [counts]
  );

  const filteredPlatforms = useMemo(() => {
    const q = filterText.trim().toLowerCase();
    return platforms.filter((p) => {
      if (p.isAdult || p.category === 'adult_18') return false;
      if (activeCategory !== 'all' && p.category !== activeCategory) return false;
      if (!q) return true;
      return (
        p.displayName?.toLowerCase().includes(q) ||
        p.subtitle?.toLowerCase().includes(q) ||
        (p.domains || []).some((d) => String(d).toLowerCase().includes(q))
      );
    });
  }, [platforms, activeCategory, filterText]);

  const visiblePlatforms =
    expanded || filterText.trim() ? filteredPlatforms : filteredPlatforms.slice(0, 60);

  const marqueeNames = useMemo(
    () => platforms.filter((p) => !p.isAdult).slice(0, 26).map((p) => p.displayName),
    [platforms]
  );

  return (
    <section className="ud-section relative w-full border-b border-slate-200/80 py-14">
      <AuroraBackground variant="soft" />

      <div className="relative mx-auto w-full max-w-[1600px] px-4 sm:px-6 xl:px-10">
        {/* ---------------- header ---------------- */}
        <div className="mb-7 flex w-full flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="min-w-0 flex-1">
            <Reveal>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-200 bg-white/80 px-3.5 py-1 text-[11px] font-black text-indigo-700 shadow-sm backdrop-blur">
                <Sparkles size={13} className="text-indigo-500" />
                <span>
                  <CountUp to={platforms.length || 400} /> live multi-engine adapters · zero paid keys
                </span>
              </span>
            </Reveal>

            <Reveal delay={0.06}>
              <h2 className="mt-3 font-display text-2xl font-black tracking-tight text-slate-900 sm:text-3xl xl:text-[2.65rem]">
                Supported websites —{' '}
                <GradientText>social, movies, courses &amp; TeraBox</GradientText>
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base">
                Pick any card to load its dedicated extractor, the in-browser player and the{' '}
                <strong className="text-slate-800">one-click download engine</strong> instantly. Every
                platform below is a real adapter — nothing here is a placeholder.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.14} className="w-full shrink-0 lg:w-[420px]">
            <div className="group relative flex items-center gap-2.5 rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 shadow-[0_18px_40px_-30px_rgba(49,46,129,0.9)] backdrop-blur transition-colors focus-within:border-indigo-400">
              <Search size={17} className="shrink-0 text-indigo-500" />
              <input
                type="text"
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                placeholder={`Search ${platforms.length || 400} supported sites (YouTube, Udemy, TeraBox…)`}
                className="w-full bg-transparent text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none sm:text-sm"
              />
              {filterText ? (
                <button
                  type="button"
                  onClick={() => setFilterText('')}
                  className="grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-slate-100 text-slate-500 transition-colors hover:bg-rose-100 hover:text-rose-600"
                  aria-label="Clear filter"
                >
                  <X size={13} />
                </button>
              ) : (
                <span className="hidden shrink-0 rounded-md bg-gradient-to-r from-indigo-500 to-cyan-500 px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wider text-white sm:inline">
                  filters
                </span>
              )}
            </div>
          </Reveal>
        </div>

        {/* ---------------- category tabs ---------------- */}
        <div className="mb-7 flex flex-wrap items-center gap-2">
          {categories.map((cat, index) => {
            const active = activeCategory === cat.id;
            const theme = categoryTheme(cat.id);
            const Icon = cat.icon;
            return (
              <motion.button
                key={cat.id}
                type="button"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.35 }}
                whileHover={{ y: -2 }}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setExpanded(showAllByDefault);
                }}
                className={`relative isolate inline-flex items-center gap-2 overflow-hidden rounded-xl border px-3.5 py-2.5 text-[11px] font-extrabold transition-colors sm:text-xs ${
                  active
                    ? 'border-transparent text-white shadow-[0_18px_36px_-22px_rgba(49,46,129,1)]'
                    : 'border-slate-200 bg-white/85 text-slate-700 backdrop-blur hover:border-indigo-300 hover:text-indigo-700'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="sites-active-category"
                    transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                    className={`absolute inset-0 -z-10 bg-gradient-to-r ${theme.gradient}`}
                  />
                )}
                <Icon size={13} className={active ? 'text-white' : 'text-indigo-500'} />
                <span className="whitespace-nowrap">{cat.label}</span>
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[10px] font-black ${
                    active ? 'bg-white/25 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {cat.count}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* ---------------- grid ---------------- */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`${activeCategory}-${filterText}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            <Stagger
              className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6"
              stagger={0.018}
            >
              {visiblePlatforms.map((plat) => {
                const theme = categoryTheme(plat.category);
                return (
                  <StaggerItem key={plat.id}>
                    <GlowCard
                      glowColor={theme.glow}
                      borderClass="border-slate-200/90 hover:border-transparent"
                      className="h-full cursor-pointer p-0 shadow-[0_10px_28px_-24px_rgba(30,27,105,0.85)]"
                      onClick={() => {
                        onPickPlatform?.(plat);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    >
                      <div className="flex h-full flex-col justify-between gap-3 p-4">
                        <div>
                          <div className="mb-3 flex items-center justify-between gap-2">
                            <span className="relative">
                              <span
                                className={`absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br ${theme.gradient} opacity-20 blur-md transition-opacity duration-300 group-hover:opacity-60`}
                              />
                              <PlatformIcon platform={plat} size={34} />
                            </span>
                            <span
                              className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[9px] font-black uppercase tracking-wide ${theme.chip}`}
                            >
                              <CheckCircle2 size={9} />
                              {enginePrefs.idmConnections || 32}x
                            </span>
                          </div>

                          <h3 className="truncate text-sm font-black text-slate-900 transition-colors group-hover:text-indigo-700">
                            {plat.displayName}
                          </h3>
                          <p className="mt-0.5 line-clamp-2 text-[11px] font-medium leading-snug text-slate-500">
                            {plat.subtitle}
                          </p>
                        </div>

                        <div className="flex items-center justify-between gap-2 border-t border-slate-100 pt-2 text-[10.5px] font-bold">
                          <span className="max-w-[120px] truncate text-slate-400">
                            {(plat.domains && plat.domains[0]) || 'direct-stream'}
                          </span>
                          <Link
                            to={`/tools/${plat.seoSlug}`}
                            onClick={(e) => e.stopPropagation()}
                            className={`inline-flex shrink-0 items-center gap-0.5 ${theme.text} hover:underline`}
                          >
                            <span>Open</span>
                            <ArrowUpRight size={11} />
                          </Link>
                        </div>
                      </div>
                    </GlowCard>
                  </StaggerItem>
                );
              })}
            </Stagger>

            {filteredPlatforms.length === 0 && (
              <div className="rounded-3xl border border-dashed border-slate-300 bg-white/80 p-10 text-center backdrop-blur">
                <p className="text-sm font-extrabold text-slate-800">No platform matches that filter.</p>
                <p className="mt-1 text-xs text-slate-500">
                  Clear the search — the universal engine still accepts any link you paste.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setFilterText('');
                    setActiveCategory('all');
                  }}
                  className="ud-btn-primary mt-4 !py-2 !text-xs"
                >
                  Reset filters
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* ---------------- show all ---------------- */}
        {filteredPlatforms.length > visiblePlatforms.length && (
          <div className="mt-8 text-center">
            <motion.button
              type="button"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.985 }}
              onClick={() => setExpanded(true)}
              className="inline-flex items-center gap-2 rounded-2xl border border-indigo-200 bg-white px-6 py-3 text-xs font-black text-indigo-700 shadow-[0_18px_40px_-30px_rgba(49,46,129,0.9)] transition-colors hover:bg-indigo-50 sm:text-sm"
            >
              <Layers3 size={15} />
              <span>
                Show all {filteredPlatforms.length} platforms (+
                {filteredPlatforms.length - visiblePlatforms.length} more)
              </span>
            </motion.button>
          </div>
        )}

        {/* ---------------- marquee ---------------- */}
        {marqueeNames.length > 6 && (
          <div className="mt-10 rounded-2xl border border-slate-200/80 bg-white/70 py-3 backdrop-blur">
            <Marquee speed="fast">
              {marqueeNames.map((name, i) => (
                <span
                  key={`${name}-${i}`}
                  className="mx-3 inline-flex items-center gap-2 whitespace-nowrap text-[11px] font-bold text-slate-500"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400" />
                  {name}
                </span>
              ))}
            </Marquee>
          </div>
        )}
      </div>
    </section>
  );
}

export default SupportedSitesSection;
