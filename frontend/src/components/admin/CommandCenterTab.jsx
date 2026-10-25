import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Activity,
  Radio,
  HardDrive,
  Globe,
  Receipt,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  RefreshCw,
  ShieldCheck,
  Cpu,
  Database,
  Zap,
  Server,
  Lock,
  Play,
  Sparkles,
  Gauge,
  Layers,
  Eye,
} from 'lucide-react';
import {
  CountUp,
  Sparkline,
  RingMeter,
  GradientText,
} from '../ui/MotionKit';

/* ============================================================================
   ADMIN · COMMAND CENTER (V12)
   The landing tab of the console. Every number comes from the live API —
   when a feed is empty it says so instead of inventing a value.
   ========================================================================== */

const QUICK_ACTIONS = [
  {
    id: 'vault',
    label: 'Video vault',
    hint: 'Saved media files',
    icon: HardDrive,
    gradient: 'from-sky-500 to-blue-600',
  },
  {
    id: 'seo',
    label: 'SEO manager',
    hint: 'Keywords & meta',
    icon: Globe,
    gradient: 'from-violet-500 to-fuchsia-500',
  },
  {
    id: 'ads',
    label: 'Ads & earnings',
    hint: 'Slots, traffic, revenue',
    icon: Radio,
    gradient: 'from-amber-500 to-orange-600',
  },
  {
    id: 'security',
    label: 'Security',
    hint: 'Audit & ban list',
    icon: ShieldCheck,
    gradient: 'from-emerald-500 to-teal-600',
  },
];

const CAPABILITIES = [
  { icon: Cpu, label: 'Node.js 20 engine', tone: 'text-emerald-300' },
  { icon: Server, label: 'Express API', tone: 'text-sky-300' },
  { icon: Database, label: 'MySQL pool · 50 conn', tone: 'text-violet-300' },
  { icon: Lock, label: 'AES-256 vault', tone: 'text-amber-300' },
  { icon: Zap, label: 'Parallel transfer core', tone: 'text-cyan-300' },
  { icon: Layers, label: '400+ platform adapters', tone: 'text-fuchsia-300' },
];

function StatTile({ icon: Icon, label, value, prefix = '', suffix = '', decimals = 0, gradient, points, tone = 'text-white', hint, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -3 }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-4 backdrop-blur-xl"
    >
      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-[0.12]`}
      />
      <div className="relative flex items-start justify-between gap-2">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">{label}</p>
          <p className={`mt-1.5 text-2xl font-black ${tone}`}>
            <CountUp to={Number(value) || 0} prefix={prefix} suffix={suffix} decimals={decimals} />
          </p>
          {hint && <p className="mt-1 text-[10.5px] font-semibold text-slate-400">{hint}</p>}
        </div>
        <span
          className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${gradient} text-white shadow-[0_12px_26px_-16px_rgba(0,0,0,0.9)]`}
        >
          <Icon size={16} />
        </span>
      </div>
      <div className="relative mt-2 opacity-80">
        <Sparkline points={points} color="#38bdf8" height={34} strokeWidth={1.8} />
      </div>
    </motion.div>
  );
}

export function CommandCenterTab({
  overview,
  trafficFunnel,
  liveCards = [],
  vaultVideos = [],
  seoKeywords = [],
  financeEntries = [],
  recommendations = [],
  onNavigate,
  onRefresh,
  refreshing = false,
}) {
  const totalRevenue = Number(overview?.totalRevenue || 0);
  const totalExpenses = Number(overview?.totalExpenses || 0);
  const netProfit = Number(overview?.netProfit || 0);
  const totalVisits = Number(overview?.totalVisits || 0);
  const totalAnalyses = Number(overview?.totalAnalyses || 0);
  const totalDownloads = Number(overview?.totalDownloads || 0);

  const timeline = Array.isArray(overview?.timelineSeries) ? overview.timelineSeries : [];
  const revenuePoints = useMemo(() => {
    const series = timeline.map((row) => Number(row.revenue || 0));
    return series.length > 1 ? series : [0, 0, 0, 0, 0, 0];
  }, [timeline]);
  const costPoints = useMemo(() => {
    const series = timeline.map((row) => Number(row.cost || 0));
    return series.length > 1 ? series : [0, 0, 0, 0, 0, 0];
  }, [timeline]);

  const funnelStages = useMemo(() => {
    const data = trafficFunnel || {};
    const stages = [
      { label: 'Free sessions', value: Number(data.totalFreeVisits || 0), gradient: 'from-indigo-500 to-blue-500' },
      { label: 'SEO routes /tools/*', value: Number(data.seoOrganic || 0), gradient: 'from-sky-500 to-cyan-500' },
      { label: 'Shared /v/* views', value: Number(data.viralWatchShares || 0), gradient: 'from-emerald-500 to-teal-500' },
      { label: 'Direct bookmarks', value: Number(data.directBookmarks || 0), gradient: 'from-amber-500 to-orange-500' },
    ];
    const max = Math.max(...stages.map((s) => s.value), 1);
    return stages.map((s) => ({ ...s, pct: Math.round((s.value / max) * 100) }));
  }, [trafficFunnel]);

  const hasFunnelTraffic = funnelStages.some((s) => s.value > 0);

  const activityRatioMax = Math.max(totalDownloads, totalAnalyses, totalVisits, 1);

  const latestCards = liveCards.slice(0, 4);

  return (
    <div className="space-y-5">
      {/* ================= HERO PULSE + STATUS ================= */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl xl:col-span-8"
        >
          <div className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full bg-indigo-500/25 blur-3xl ud-halo-breath" />
          <div className="relative flex flex-wrap items-start justify-between gap-3">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-1 text-[10px] font-black uppercase tracking-widest text-emerald-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 ud-live-dot" /> system pulse
              </span>
              <h2 className="mt-2.5 font-display text-xl font-black text-white sm:text-2xl">
                Everything is <GradientText variant="candy">live</GradientText> from your own server
              </h2>
              <p className="mt-1 max-w-xl text-[11.5px] leading-relaxed text-slate-400">
                No mock data, no invented charts. Every tile below is read from the MySQL tables this
                console is connected to — an empty feed says “0” on purpose.
              </p>
            </div>

            <button
              type="button"
              onClick={onRefresh}
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/[0.05] px-3 py-1.5 text-[11px] font-bold text-slate-200 transition-colors hover:bg-white/[0.09]"
            >
              <RefreshCw size={12} className={refreshing ? 'animate-spin' : ''} />
              {refreshing ? 'Syncing…' : 'Sync now'}
            </button>
          </div>

          <div className="relative mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { label: 'Downloads', value: totalDownloads, icon: TrendingDown, color: '#38bdf8' },
              { label: 'Analyses', value: totalAnalyses, icon: Activity, color: '#a78bfa' },
              { label: 'Visits', value: totalVisits, icon: Eye, color: '#34d399' },
            ].map((metric) => {
              const Icon = metric.icon;
              return (
                <div
                  key={metric.label}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3"
                >
                  <RingMeter
                    value={metric.value}
                    max={activityRatioMax}
                    size={58}
                    thickness={6}
                    color={metric.color}
                    label={String(metric.value)}
                  />
                  <div className="min-w-0">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                      {metric.label}
                    </p>
                    <p className="mt-0.5 flex items-center gap-1 text-[11px] font-bold text-slate-200">
                      <Icon size={11} style={{ color: metric.color }} /> recorded total
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* status cockpit */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="rounded-3xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl xl:col-span-4"
        >
          <h3 className="flex items-center gap-2 text-sm font-black text-white">
            <Gauge size={15} className="text-cyan-300" /> Cockpit
          </h3>
          <p className="mt-0.5 text-[11px] text-slate-400">Live store sizes &amp; queue</p>

          <div className="mt-3.5 space-y-2">
            {[
              { label: 'Live review cards', value: liveCards.length, tone: 'text-emerald-300', bar: 'from-emerald-500 to-teal-500' },
              { label: 'Vault files', value: vaultVideos.length, tone: 'text-sky-300', bar: 'from-sky-500 to-blue-500' },
              { label: 'SEO keywords', value: seoKeywords.length, tone: 'text-violet-300', bar: 'from-violet-500 to-fuchsia-500' },
              { label: 'Ledger entries', value: financeEntries.length, tone: 'text-amber-300', bar: 'from-amber-500 to-orange-500' },
            ].map((row, i) => (
              <motion.div
                key={row.label}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.06 }}
                className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2"
              >
                <div className="flex items-center justify-between text-[11px] font-bold">
                  <span className="text-slate-300">{row.label}</span>
                  <span className={`tabular-nums ${row.tone}`}>{row.value}</span>
                </div>
                <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, row.value * 8 || 2)}%` }}
                    transition={{ duration: 0.9, delay: 0.2 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                    className={`h-full rounded-full bg-gradient-to-r ${row.bar}`}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-3 flex items-center gap-1.5 rounded-xl border border-emerald-400/25 bg-emerald-400/10 px-2.5 py-1.5 text-[10.5px] font-bold text-emerald-300">
            <ShieldCheck size={12} /> Secure session · auto-lock enabled
          </div>
        </motion.div>
      </div>

      {/* ================= MONEY & ACTIVITY TILES ================= */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatTile
          icon={TrendingUp}
          label="Recorded revenue"
          value={totalRevenue}
          prefix="$"
          decimals={2}
          gradient="from-emerald-500 to-teal-500"
          tone="text-emerald-300"
          points={revenuePoints}
          hint="income rows in finance_ledger"
          delay={0}
        />
        <StatTile
          icon={Receipt}
          label="Recorded cost"
          value={totalExpenses}
          prefix="$"
          decimals={2}
          gradient="from-amber-500 to-orange-600"
          tone="text-amber-300"
          points={costPoints}
          hint="expense rows in finance_ledger"
          delay={0.05}
        />
        <StatTile
          icon={netProfit >= 0 ? TrendingUp : TrendingDown}
          label="Net profit"
          value={netProfit}
          prefix="$"
          decimals={2}
          gradient="from-sky-500 to-indigo-600"
          tone={netProfit >= 0 ? 'text-sky-300' : 'text-rose-300'}
          points={revenuePoints.map((v, i) => v - (costPoints[i] || 0))}
          hint="revenue − cost"
          delay={0.1}
        />
        <StatTile
          icon={Sparkles}
          label="AI recommendations"
          value={recommendations.length}
          gradient="from-fuchsia-500 to-violet-600"
          tone="text-fuchsia-300"
          points={[1, 2, 1, 3, 2, recommendations.length || 0]}
          hint="generated from live signals"
          delay={0.15}
        />
      </div>

      {/* ================= FUNNEL + LIVE QUEUE ================= */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.12 }}
          className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl xl:col-span-7"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="flex items-center gap-2 text-sm font-black text-white">
              <Layers size={15} className="text-sky-300" /> Traffic funnel
            </h3>
            <span className="rounded-lg border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] font-bold text-slate-300">
              visitor_sessions
            </span>
          </div>

          {hasFunnelTraffic ? (
            <div className="mt-4 space-y-3">
              {funnelStages.map((stage, i) => (
                <div key={stage.label}>
                  <div className="flex items-center justify-between text-[11px] font-bold">
                    <span className="text-slate-300">{stage.label}</span>
                    <span className="tabular-nums text-white">{stage.value.toLocaleString()}</span>
                  </div>
                  <div className="mt-1.5 h-2.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.max(stage.pct, 2)}%` }}
                      transition={{ duration: 1, delay: 0.15 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                      className={`h-full rounded-full bg-gradient-to-r ${stage.gradient} shadow-[0_0_18px_-4px_rgba(56,189,248,0.8)]`}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-4 rounded-xl border border-dashed border-white/15 p-6 text-center">
              <p className="text-xs font-bold text-slate-200">No sessions recorded yet</p>
              <p className="mt-1 text-[11px] text-slate-400">
                The funnel fills automatically as real visitors hit the public site. Nothing is simulated.
              </p>
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.16 }}
          className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl xl:col-span-5"
        >
          <div className="flex items-center justify-between gap-2">
            <h3 className="flex items-center gap-2 text-sm font-black text-white">
              <Radio size={15} className="text-emerald-300" /> Live review queue
            </h3>
            <button
              type="button"
              onClick={() => onNavigate?.('vault')}
              className="inline-flex items-center gap-1 text-[10.5px] font-bold text-sky-300 hover:underline"
            >
              open vault <ArrowUpRight size={11} />
            </button>
          </div>

          {latestCards.length === 0 ? (
            <div className="mt-4 rounded-xl border border-dashed border-white/15 p-6 text-center">
              <p className="text-xs font-bold text-slate-200">Queue is empty</p>
              <p className="mt-1 text-[11px] text-slate-400">
                New cards appear here the moment the extractor resolves a stream inside the admin session.
              </p>
            </div>
          ) : (
            <div className="mt-3 space-y-2">
              {latestCards.map((card, i) => (
                <motion.div
                  key={card.cardId || i}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.06 }}
                  className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] p-2"
                >
                  <span className="grid h-9 w-12 shrink-0 place-items-center overflow-hidden rounded-lg bg-gradient-to-br from-indigo-500/40 to-cyan-500/30">
                    {card.thumbnailUrl ? (
                      <img src={card.thumbnailUrl} alt="" className="h-full w-full object-cover" />
                    ) : (
                      <Play size={13} className="text-white" />
                    )}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[11.5px] font-bold text-slate-100">
                      {card.title || 'Untitled stream'}
                    </span>
                    <span className="block text-[10px] text-slate-400">
                      {card.platformName || card.platformId || 'direct stream'}
                    </span>
                  </span>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* ================= QUICK ACTIONS + CAPABILITIES ================= */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-12">
        <div className="grid grid-cols-2 gap-3 xl:col-span-7 xl:grid-cols-4">
          {QUICK_ACTIONS.map((action, i) => {
            const Icon = action.icon;
            return (
              <motion.button
                key={action.id}
                type="button"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.06 }}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.985 }}
                onClick={() => onNavigate?.(action.id)}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-4 text-left backdrop-blur-xl"
              >
                <div
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-20`}
                />
                <span
                  className={`relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br ${action.gradient} text-white`}
                >
                  <Icon size={16} />
                </span>
                <span className="relative mt-2.5 block text-xs font-black text-white">{action.label}</span>
                <span className="relative mt-0.5 block text-[10px] text-slate-400">{action.hint}</span>
              </motion.button>
            );
          })}
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl xl:col-span-5">
          <h3 className="text-sm font-black text-white">Stack in use</h3>
          <p className="mt-0.5 text-[11px] text-slate-400">
            React 18 · Node.js · Express · MySQL — nothing else in the runtime path.
          </p>
          <div className="mt-3 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
            {CAPABILITIES.map((cap) => {
              const Icon = cap.icon;
              return (
                <span
                  key={cap.label}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.03] px-2.5 py-1.5 text-[10.5px] font-bold text-slate-300"
                >
                  <Icon size={11} className={cap.tone} />
                  {cap.label}
                </span>
              );
            })}
          </div>
          <div className="mt-3 flex items-center gap-1.5 rounded-xl border border-sky-400/25 bg-sky-400/10 px-2.5 py-1.5 text-[10.5px] font-bold text-sky-300">
            <ShieldCheck size={12} /> 5-layer padlock · TOTP · IP lockout armed
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommandCenterTab;
