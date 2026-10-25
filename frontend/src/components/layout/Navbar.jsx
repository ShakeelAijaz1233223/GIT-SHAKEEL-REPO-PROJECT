import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Zap,
  Settings,
  Download,
  UserCheck,
  LogIn,
  Globe,
  Gauge,
  X,
  Menu,
  Sliders,
  Sparkles,
  House,
  Layers,
  Search,
  Star,
  ShieldCheck,
  ArrowUpRight,
  Infinity as InfinityIcon,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UltraApi } from '../../services/apiClient';
import { DownloadQueueDrawer } from '../downloader/DownloadQueueDrawer';
import { ScrollProgress, Magnetic } from '../ui/MotionKit';

/* ============================================================================
   V12 SPEED LIMITER MODAL — light glass, colourful radio cards
   ========================================================================== */
export function SpeedLimiterModal({ open, onClose }) {
  const { enginePrefs, saveEnginePrefs } = useApp();
  const [limitEnabled, setLimitEnabled] = useState(Boolean(enginePrefs.speedLimiterEnabled));
  const [kbValue, setKbValue] = useState(Number(enginePrefs.maxSpeedKBps || 500));
  const [alwaysStartup, setAlwaysStartup] = useState(Boolean(enginePrefs.alwaysLimitOnStartup));

  useEffect(() => {
    if (open) {
      setLimitEnabled(Boolean(enginePrefs.speedLimiterEnabled));
      setKbValue(Number(enginePrefs.maxSpeedKBps || 500));
      setAlwaysStartup(Boolean(enginePrefs.alwaysLimitOnStartup));
    }
  }, [open, enginePrefs]);

  if (!open) return null;

  const handleSave = async (e) => {
    e.preventDefault();
    await saveEnginePrefs({
      speedLimiterEnabled: limitEnabled,
      maxSpeedKBps: Math.max(10, Number(kbValue) || 500),
      alwaysLimitOnStartup: alwaysStartup,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[105] flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-slate-900/45 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.form
        initial={{ opacity: 0, scale: 0.95, y: 14 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        onSubmit={handleSave}
        className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/70 bg-white shadow-[0_40px_100px_-40px_rgba(49,46,129,0.6)]"
      >
        <div className="ud-gradient-bg-anim relative px-5 py-4 text-white">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/20 backdrop-blur">
                <Gauge size={18} />
              </span>
              <div>
                <h3 className="text-sm font-extrabold sm:text-base">Download Speed Studio</h3>
                <p className="text-[11px] font-semibold text-white/80">Full speed or a cap you choose</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="grid h-8 w-8 place-items-center rounded-lg bg-white/10 transition-colors hover:bg-white/25"
              aria-label="Close speed settings"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        <div className="space-y-3.5 p-5">
          <button
            type="button"
            onClick={() => setLimitEnabled(false)}
            className={`flex w-full items-start gap-3 rounded-2xl border p-4 text-left transition-all ${
              !limitEnabled
                ? 'border-emerald-300 bg-gradient-to-br from-emerald-50 to-teal-50 shadow-[0_16px_36px_-24px_rgba(16,185,129,0.85)]'
                : 'border-slate-200 bg-white hover:border-emerald-200 hover:bg-emerald-50/40'
            }`}
          >
            <span
              className={`mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl ${
                !limitEnabled
                  ? 'bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-md'
                  : 'bg-slate-100 text-slate-500'
              }`}
            >
              <InfinityIcon size={17} />
            </span>
            <span>
              <span className="block text-sm font-extrabold text-slate-900">
                Unlimited — use my full connection
              </span>
              <span className="mt-0.5 block text-xs text-slate-600">
                No artificial throttling. The transfer runs at whatever your line allows.
              </span>
            </span>
          </button>

          <div
            className={`rounded-2xl border p-4 transition-all ${
              limitEnabled
                ? 'border-amber-300 bg-gradient-to-br from-amber-50 to-orange-50 shadow-[0_16px_36px_-24px_rgba(245,158,11,0.85)]'
                : 'border-slate-200 bg-white'
            }`}
          >
            <div className="flex items-start gap-3">
              <span
                className={`mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl ${
                  limitEnabled
                    ? 'bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-md'
                    : 'bg-slate-100 text-slate-500'
                }`}
              >
                <Gauge size={17} />
              </span>
              <div className="flex-1">
                <p className="text-sm font-extrabold text-slate-900">Cap the speed per file</p>
                <p className="mt-0.5 text-xs text-slate-600">
                  Useful when you still want to browse or stream while a big file downloads.
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <input
                    type="number"
                    min={10}
                    max={2000000}
                    value={kbValue}
                    onChange={(e) => {
                      setLimitEnabled(true);
                      setKbValue(e.target.value);
                    }}
                    className="w-28 rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-xs font-extrabold text-slate-900 focus:border-amber-500 focus:outline-none"
                  />
                  <span className="text-xs font-bold text-slate-600">
                    KB/s · {(Number(kbValue || 0) / 1024).toFixed(2)} MB/s
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {[500, 2048, 10240, 51200, 204800].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => {
                        setLimitEnabled(true);
                        setKbValue(preset);
                      }}
                      className={`rounded-lg px-2.5 py-1 text-[11px] font-extrabold transition-colors ${
                        Number(kbValue) === preset && limitEnabled
                          ? 'bg-amber-500 text-white shadow-sm'
                          : 'bg-slate-100 text-slate-700 hover:bg-amber-100 hover:text-amber-800'
                      }`}
                    >
                      {preset >= 1024 ? `${Math.round(preset / 1024)} MB/s` : `${preset} KB/s`}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <p className="rounded-xl border border-indigo-100 bg-indigo-50/70 px-3 py-2 text-[11px] leading-relaxed text-indigo-900">
            <ShieldCheck size={12} className="mr-1 inline -translate-y-px" />
            Very low caps can make some media servers drop the connection. Unlimited is the safest choice.
          </p>

          <label className="flex cursor-pointer select-none items-center gap-2 text-xs font-bold text-slate-700">
            <input
              type="checkbox"
              checked={alwaysStartup}
              onChange={(e) => setAlwaysStartup(e.target.checked)}
              className="h-4 w-4 rounded accent-indigo-600"
            />
            <span>Always enable the cap when the app starts</span>
          </label>
        </div>

        <div className="flex items-center justify-end gap-2.5 border-t border-slate-100 bg-slate-50/80 px-5 py-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-extrabold text-slate-700 transition-colors hover:bg-slate-100"
          >
            Cancel
          </button>
          <button type="submit" className="ud-btn-primary !px-5 !py-2 text-xs">
            Apply live
          </button>
        </div>
      </motion.form>
    </div>
  );
}

/* ============================================================================
   AUTH MODAL — colourful gradient header + glass body
   ========================================================================== */
function AuthModal({ open, onClose }) {
  const { setUser, showToast } = useApp();
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [busy, setBusy] = useState(false);

  if (!open) return null;

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      const res =
        mode === 'register'
          ? await UltraApi.registerUser({ email, password, displayName })
          : await UltraApi.loginUser({ email, password });
      setUser(res.user);
      showToast(`Signed in as ${res.user.displayName || res.user.email}`, 'success');
      onClose();
    } catch (err) {
      showToast(err.message || 'Authentication failed', 'error');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[105] flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-slate-900/45 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/70 bg-white shadow-[0_40px_100px_-40px_rgba(49,46,129,0.6)]"
      >
        <div className="ud-gradient-bg-anim relative px-6 py-5 text-white">
          <div className="flex items-start justify-between">
            <div>
              <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider backdrop-blur">
                <Sparkles size={10} /> Free account
              </span>
              <h3 className="mt-2 text-lg font-extrabold leading-tight">
                {mode === 'login' ? 'Welcome back' : 'Create your workspace'}
              </h3>
              <p className="mt-0.5 text-xs font-semibold text-white/85">
                {mode === 'login'
                  ? 'Sign in to sync saved links & download history.'
                  : 'Optional — keeps your own private download history.'}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="grid h-8 w-8 place-items-center rounded-lg bg-white/10 transition-colors hover:bg-white/25"
              aria-label="Close"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        <form onSubmit={submit} className="space-y-3 p-6">
          {mode === 'register' && (
            <input
              type="text"
              required
              placeholder="Full name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-100"
            />
          )}
          <input
            type="email"
            required
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-100"
          />
          <input
            type="password"
            required
            placeholder="Password (min 6 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-100"
          />
          <button
            type="submit"
            disabled={busy}
            className="ud-btn-primary w-full !py-2.5 disabled:cursor-wait disabled:opacity-70"
          >
            {busy ? 'Please wait…' : mode === 'login' ? 'Sign in' : 'Create account'}
          </button>
        </form>

        <button
          type="button"
          onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
          className="mb-5 w-full text-center text-xs font-bold text-indigo-600 hover:underline"
        >
          {mode === 'login' ? 'Need an account? Register free →' : 'Already registered? Sign in →'}
        </button>
      </motion.div>
    </div>
  );
}

/* ============================================================================
   NAVBAR — floating glass studio bar
   ========================================================================== */
export function Navbar() {
  const location = useLocation();
  const {
    lang,
    setLang,
    platforms,
    downloadQueue,
    favorites,
    user,
    setUser,
    enginePrefs,
    queueDrawerOpen,
    setQueueDrawerOpen,
    speedLimiterModalOpen,
    setSpeedLimiterModalOpen,
  } = useApp();

  const [authOpen, setAuthOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const activeJobsCount = downloadQueue.filter(
    (j) => j.status === 'downloading' || j.status === 'muxing' || j.status === 'queued'
  ).length;

  const navItems = [
    { to: '/', label: 'Home Studio', icon: House },
    { to: '/sites', label: `${platforms.length || 400} Sites`, icon: Layers },
    { to: '/downloads', label: `Downloads (${downloadQueue.length})`, icon: Download },
    { to: '/player', label: 'Online Player', icon: Search },
    { to: '/albums', label: 'Audio & Search', icon: Sparkles },
    { to: '/favorites', label: `Saved (${favorites.length})`, icon: Star },
  ];

  return (
    <>
      <ScrollProgress />

      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          scrolled
            ? 'border-b border-white/60 bg-white/85 shadow-[0_12px_40px_-30px_rgba(49,46,129,0.55)] backdrop-blur-xl'
            : 'border-b border-slate-200/70 bg-white/95 backdrop-blur-md'
        }`}
      >
        {/* Rainbow hairline */}
        <div className="ud-top-hairline h-[2px] w-full opacity-80" />

        <div className="mx-auto flex h-[68px] w-full max-w-[1600px] items-center justify-between gap-3 px-3 sm:px-6 xl:px-10">
          {/* ---------------- Brand ---------------- */}
          <Link to="/" className="group flex shrink-0 items-center gap-3">
            <span className="relative grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500 text-white shadow-[0_14px_30px_-14px_rgba(79,70,229,0.85)] transition-transform duration-300 group-hover:scale-105">
              <span className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-400 to-cyan-300 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-70" />
              <Zap size={21} strokeWidth={2.6} className="relative" />
            </span>
            <div className="leading-tight">
              <div className="font-display text-base font-black tracking-tight text-slate-900 sm:text-lg">
                Ultra
                <span className="ud-text-gradient">Downloader</span>
              </div>
              <div className="flex items-center gap-1 text-[9.5px] font-black uppercase tracking-[0.14em] text-slate-500">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 ud-live-dot" />
                Free · Fast · HD &amp; 4K studio
              </div>
            </div>
          </Link>

          {/* ---------------- Desktop nav ---------------- */}
          <nav
            aria-label="Primary navigation"
            className="hidden items-center gap-1 rounded-2xl border border-slate-200/80 bg-slate-50/80 p-1 xl:flex"
          >
            {navItems.map((item) => {
              const active = location.pathname === item.to;
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`relative inline-flex items-center gap-1.5 whitespace-nowrap rounded-xl px-3 py-1.5 text-xs font-extrabold transition-colors ${
                    active ? 'text-indigo-700' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="v12-nav-active"
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                      className="absolute inset-0 rounded-xl border border-white bg-white shadow-[0_6px_16px_-10px_rgba(49,46,129,0.55)]"
                    />
                  )}
                  <Icon
                    size={13}
                    className={`relative z-10 ${active ? 'text-indigo-600' : 'text-slate-400'}`}
                  />
                  <span className="relative z-10">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* ---------------- Controls ---------------- */}
          <div className="flex shrink-0 items-center gap-1.5">
            <button
              type="button"
              onClick={() => setQueueDrawerOpen(true)}
              className="group relative inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-extrabold text-slate-800 transition-all hover:-translate-y-px hover:border-indigo-300 hover:shadow-md"
            >
              <Download size={14} className="text-indigo-600" />
              <span className="hidden sm:inline">Queue</span>
              <span
                className={`rounded-md px-1.5 py-0.5 text-[10px] font-black text-white ${
                  activeJobsCount > 0
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 ud-pulse-ring'
                    : 'bg-gradient-to-r from-indigo-600 to-blue-600'
                }`}
              >
                {activeJobsCount > 0 ? `${activeJobsCount} live` : downloadQueue.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setSpeedLimiterModalOpen(true)}
              title="Speed settings"
              className={`hidden items-center gap-1.5 rounded-xl border px-2.5 py-1.5 text-xs font-extrabold transition-colors sm:inline-flex ${
                enginePrefs.speedLimiterEnabled
                  ? 'border-amber-300 bg-amber-50 text-amber-800'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Sliders size={13} className="text-indigo-600" />
              <span className="hidden lg:inline">
                {enginePrefs.speedLimiterEnabled ? `${enginePrefs.maxSpeedKBps} KB/s` : 'Speed'}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setLang(lang === 'en' ? 'ur' : 'en')}
              className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-extrabold text-slate-700 transition-colors hover:bg-slate-50"
            >
              <Globe size={13} className="text-cyan-600" />
              <span className="hidden sm:inline">{lang === 'en' ? 'EN' : 'اردو'}</span>
            </button>

            {user ? (
              <button
                type="button"
                title="Click to sign out"
                onClick={async () => {
                  await UltraApi.logoutUser().catch(() => {});
                  setUser(null);
                }}
                className="hidden items-center gap-1.5 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-extrabold text-emerald-800 transition-colors hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700 sm:inline-flex"
              >
                <UserCheck size={14} />
                <span className="max-w-[120px] truncate">
                  {user.fullName || user.displayName || user.email}
                </span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setAuthOpen(true)}
                className="hidden items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-extrabold text-slate-700 transition-colors hover:border-indigo-300 hover:bg-indigo-50 sm:inline-flex"
              >
                <LogIn size={14} className="text-indigo-600" />
                <span>Sign in</span>
              </button>
            )}

            <Magnetic strength={5} className="hidden sm:inline-flex">
              <Link to="/settings" className="ud-btn-primary !px-3.5 !py-2 !text-xs">
                <Settings size={14} />
                <span className="hidden lg:inline">Settings</span>
              </Link>
            </Magnetic>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label="Open navigation menu"
              aria-expanded={mobileMenuOpen}
              className="grid h-9 w-9 place-items-center rounded-xl border border-slate-200 bg-white text-slate-700 transition-colors hover:bg-slate-50 xl:hidden"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* ---------------- Mobile sheet ---------------- */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden border-t border-slate-200 bg-white xl:hidden"
            >
              <div className="grid grid-cols-2 gap-2 p-4 sm:grid-cols-3">
                {navItems.map((item) => {
                  const active = location.pathname === item.to;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      className={`flex items-center gap-2 rounded-xl px-3 py-2.5 text-xs font-extrabold transition-colors ${
                        active
                          ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-md'
                          : 'border border-slate-200 bg-slate-50 text-slate-700'
                      }`}
                    >
                      <Icon size={14} className={active ? 'text-white' : 'text-indigo-500'} />
                      <span className="truncate">{item.label}</span>
                    </Link>
                  );
                })}
              </div>
              <div className="flex flex-wrap gap-2 border-t border-slate-100 px-4 pb-4 pt-3">
                <button
                  type="button"
                  onClick={() => setSpeedLimiterModalOpen(true)}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-extrabold text-slate-700"
                >
                  <Gauge size={13} className="text-amber-600" /> Speed settings
                </button>
                <Link
                  to="/settings"
                  className="ud-btn-primary !px-3 !py-2 !text-xs"
                >
                  <Settings size={13} /> Settings
                </Link>
                <button
                  type="button"
                  onClick={() => setAuthOpen(true)}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-extrabold text-slate-700"
                >
                  <LogIn size={13} className="text-indigo-600" /> Sign in
                  <ArrowUpRight size={12} className="text-slate-400" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <DownloadQueueDrawer open={queueDrawerOpen} onClose={() => setQueueDrawerOpen(false)} />
      <SpeedLimiterModal open={speedLimiterModalOpen} onClose={() => setSpeedLimiterModalOpen(false)} />
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}

export default Navbar;
