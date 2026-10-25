import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ClipboardPaste,
  Search,
  Sparkles,
  Download,
  ExternalLink,
  Share2,
  Heart,
  ShieldCheck,
  Gauge,
  KeyRound,
  Play,
  CheckCircle2,
  Zap,
  Sliders,
  Loader2,
  AlertTriangle,
  RotateCcw,
  Globe2,
  Link2,
  Film,
  Music4,
  Video,
  Wand2,
  Layers3,
  ArrowRight,
  CircleDot,
  Cloud,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UltraApi, formatBytes } from '../../services/apiClient';
import { normalizeUserUrl } from '../../services/instantDownload';
import { runUniversalDownload } from '../../services/downloadEngine';
import { SearchAnythingModal } from './SearchAnythingModal';
import {
  DOWNLOAD_STATE,
  formatDownloadSize,
} from '../../services/fileDownload';
import { OnlineVideoPlayer } from '../player/OnlineVideoPlayer';
import { PlatformIcon } from '../icons/PlatformIcon';
import { AuroraBackground } from '../ui/AuroraBackground';
import {
  CountUp,
  GlowCard,
  GradientText,
  PillTabs,
  Reveal,
  Stagger,
  StaggerItem,
  TiltCard,
  WordReveal,
} from '../ui/MotionKit';
import { evaluateSmartDownloadAdTrigger, NativeSponsorBanner } from '../monetization/AdWaterfallManager';

const QUICK_SAMPLE_LINKS = [
  {
    label: 'Free TeraBox Full Movie Test',
    url: 'https://www.terabox.app/sharing/link?surl=IRHSOPX5IEPgJT7l9IoNlg',
    badge: '0 Paid Key',
    gradient: 'from-sky-500 to-cyan-500',
  },
  {
    label: 'iTeraPlay Wrapper Link',
    url: 'https://iteraplay.com/?url=https://www.1024tera.co/sharing/link?surl=IRHSOPX5IEPgJT7l9IoNlg',
    badge: 'Auto-Unwrap',
    gradient: 'from-violet-500 to-fuchsia-500',
  },
  {
    label: 'YouTube 4K HDR Sample',
    url: 'https://www.youtube.com/watch?v=WhWc3b3KhnY',
    badge: '4K + MP3',
    gradient: 'from-rose-500 to-orange-500',
  },
  {
    label: 'Search Trending Lectures',
    url: 'MIT Python Data Science Full Lecture',
    badge: 'Live Search',
    gradient: 'from-emerald-500 to-teal-500',
  },
];

const TRUST_ITEMS = [
  {
    icon: CheckCircle2,
    label: '100% Free TeraBox, iTeraPlay & 30+ Mirrors',
    tone: 'from-emerald-500 to-teal-500',
  },
  {
    icon: Gauge,
    label: 'Fast multi-part download engine',
    tone: 'from-blue-500 to-indigo-500',
  },
  {
    icon: ShieldCheck,
    label: 'Safe, private & secure transfers',
    tone: 'from-fuchsia-500 to-violet-500',
  },
];

export function HeroSmartAnalyzer({ presetPlatform = null }) {
  const {
    t,
    platforms,
    adWaterfall,
    enginePrefs,
    startManagedDownload,
    toggleFavorite,
    user,
    setSpeedLimiterModalOpen,
    showToast,
  } = useApp();

  const [inputVal, setInputVal] = useState('');
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [streamTab, setStreamTab] = useState('video_audio');
  const [pickedFormatIdx, setPickedFormatIdx] = useState(0);
  const [showCookieBox, setShowCookieBox] = useState(false);
  const [searchAnythingOpen, setSearchAnythingOpen] = useState(false);
  const [ephemeralCookies, setEphemeralCookies] = useState('');
  const [shareCodeUrl, setShareCodeUrl] = useState('');
  const [focused, setFocused] = useState(false);

  const [dl, setDl] = useState({
    state: DOWNLOAD_STATE.IDLE,
    message: '',
    fileName: '',
    sizeBytes: 0,
  });
  const dlLockRef = useRef(false);

  useEffect(() => {
    if (presetPlatform?.displayName) {
      setShareCodeUrl('');
    }
  }, [presetPlatform]);

  const detectedPlatform = useMemo(() => {
    const raw = inputVal.trim().toLowerCase();
    if (!raw || !raw.includes('.')) return presetPlatform || null;
    return (
      platforms.find((p) => (p.domains || []).some((d) => raw.includes(String(d).toLowerCase()))) ||
      presetPlatform
    );
  }, [inputVal, platforms, presetPlatform]);

  const looksLikeLink = /^(https?:\/\/|www\.)/i.test(inputVal.trim());

  const handleAnalyzeOrSearch = async (overrideInput) => {
    const raw = String(overrideInput ?? inputVal).trim();
    if (!raw) {
      showToast('Paste a video URL or type keywords to search live streams.', 'info');
      return;
    }

    setLoading(true);
    setShareCodeUrl('');
    try {
      const urlProbe = normalizeUserUrl(raw);
      const looksLikeUrl = urlProbe.ok;
      const normalized = urlProbe.ok ? urlProbe.url : raw;

      if (looksLikeUrl) {
        setSearchResults(null);
        const res = await UltraApi.analyzeUrl(
          normalized,
          detectedPlatform?.id || '',
          ephemeralCookies
        );
        setAnalysis(res);
        setStreamTab('video_audio');
        setPickedFormatIdx(0);
      } else {
        setAnalysis(null);
        const searchRes = await UltraApi.searchVideos({ q: raw, page: 1 });
        setSearchResults(searchRes.items || []);
      }
    } catch (err) {
      showToast(
        err?.code === 'PASTE_CONTENT_LINK'
          ? 'That is a homepage. Open the video / reel / post / file page and paste that exact link.'
          : err?.code === 'NO_MEDIA_ON_PAGE'
            ? 'This page has no video file. Paste the actual video post link or a direct .mp4 / .m3u8 link.'
            : err.message || 'This link could not be opened. Please check the URL or try another one.',
        'error'
      );
    } finally {
      setLoading(false);
    }
  };

  const handlePasteClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setInputVal(text.trim());
        if (/^https?:\/\//i.test(text.trim())) {
          UltraApi.silentPasteCapture(text.trim(), 'paste_button').catch(() => {});
          handleAnalyzeOrSearch(text.trim());
        }
      }
    } catch {
      showToast('Press Ctrl+V directly inside the input box.', 'info');
    }
  };

  const activeStreamsList = useMemo(() => {
    const s = analysis?.streams || analysis?.media?.streams;
    if (!s) return [];
    if (streamTab === 'video_only') return s.videoOnly || [];
    if (streamTab === 'audio_only') return s.audioOnly || [];
    return s.videoAudio || s.videoWithAudio || [];
  }, [analysis, streamTab]);

  const activeStream = activeStreamsList[pickedFormatIdx] || activeStreamsList[0] || null;

  const handleCreateViralLink = async () => {
    if (!analysis) return;
    try {
      const res = await UltraApi.createViralShareLink({
        url: analysis.canonicalUrl,
        title: analysis.media.title,
        platformId: analysis.platform?.id,
        thumbnailUrl: analysis.media.thumbnailUrl,
        durationText: analysis.media.durationText,
        streamUrl: analysis.media.previewPlayer?.streamUrl || '',
      });
      const fullShare = `${window.location.origin}${res.sharePath}`;
      setShareCodeUrl(fullShare);
      navigator.clipboard?.writeText(fullShare).catch(() => {});
      showToast('Shareable watch link copied to clipboard!', 'success');
    } catch (err) {
      showToast(err.message || 'Could not create share link', 'error');
    }
  };

  /* ========================================================================
     REAL DOWNLOAD FLOW (single button):
     ticket -> HEAD verification -> browser transfers the verified bytes.
     ======================================================================== */
  const runRealDownload = useCallback(async () => {
    if (dlLockRef.current) return;
    if (!activeStream) return;

    dlLockRef.current = true;
    setDl({
      state: DOWNLOAD_STATE.STARTING,
      message: 'Preparing download…',
      fileName: '',
      sizeBytes: 0,
    });

    try {
      evaluateSmartDownloadAdTrigger(adWaterfall);

      const result = await runUniversalDownload({
        stream: activeStream,
        analysis,
        user,
        onProgress: ({ state, message }) =>
          setDl((prev) => ({ ...prev, state, message, fileName: prev.fileName })),
        reportHistory: () =>
          startManagedDownload({
            media: analysis?.media,
            platform: analysis?.platform,
            selectedStream: activeStream,
            sourceUrl: analysis?.canonicalUrl,
            deliveryMode: 'auto',
            skipDeviceTrigger: true,
          }),
      });

      setDl({
        state: DOWNLOAD_STATE.STARTED,
        message: result.message,
        fileName: result.fileName,
        sizeBytes: result.sizeBytes,
      });
    } catch (err) {
      setDl({
        state: DOWNLOAD_STATE.FAILED,
        message:
          err?.message || 'The download could not be started. Check your connection and click Retry.',
        fileName: '',
        sizeBytes: 0,
      });
    } finally {
      dlLockRef.current = false;
    }
  }, [activeStream, adWaterfall, analysis, startManagedDownload, user]);

  const isDlBusy = dl.state === DOWNLOAD_STATE.STARTING || dl.state === DOWNLOAD_STATE.VERIFYING;

  const downloadButtonLabel = isDlBusy
    ? dl.message
    : dl.state === DOWNLOAD_STATE.FAILED
      ? 'Retry download'
      : dl.state === DOWNLOAD_STATE.STARTED
        ? 'Download again'
        : `Download · ${activeStream?.qualityTitle || 'HD'} ${
            activeStream?.formatExt ? `(${String(activeStream.formatExt).toUpperCase()})` : ''
          }`;

  const streamTabs = [
    { id: 'video_audio', label: 'Video + Sound', icon: Film },
    { id: 'video_only', label: 'Video only', icon: Video },
    { id: 'audio_only', label: 'Audio / MP3', icon: Music4 },
  ];

  const headline = presetPlatform
    ? `${presetPlatform.displayName} online player & downloader`
    : t.heroTitle1;

  return (
    <section className="ud-section relative w-full pb-16 pt-10 sm:pt-14">
      <AuroraBackground variant="hero" />

      {/* Floating decorative glyphs */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.span
          animate={{ y: [0, -18, 0], rotate: [0, 6, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute left-[6%] top-[16%] hidden text-indigo-300/70 lg:block"
        >
          <Zap size={30} strokeWidth={2.5} />
        </motion.span>
        <motion.span
          animate={{ y: [0, 16, 0], rotate: [0, -8, 0] }}
          transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute right-[7%] top-[12%] hidden text-cyan-300/80 lg:block"
        >
          <Cloud size={34} strokeWidth={2.2} />
        </motion.span>
        <motion.span
          animate={{ y: [0, -12, 0], x: [0, 8, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute right-[13%] top-[46%] hidden text-fuchsia-300/70 xl:block"
        >
          <Sparkles size={26} />
        </motion.span>
        <motion.span
          animate={{ y: [0, 14, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute left-[12%] top-[52%] hidden text-amber-300/70 xl:block"
        >
          <Layers3 size={26} />
        </motion.span>
      </div>

      <div className="relative mx-auto w-full max-w-[1600px] px-4 sm:px-6 xl:px-10">
        {/* ================= HERO HEADER ================= */}
        <div className="mx-auto w-full max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-indigo-200/80 bg-white/80 px-4 py-1.5 text-[11px] font-black text-indigo-700 shadow-[0_10px_30px_-18px_rgba(79,70,229,0.8)] backdrop-blur sm:text-xs"
          >
            <span className="relative flex h-4 w-4 items-center justify-center">
              <span className="absolute h-4 w-4 rounded-full bg-indigo-400/30 ud-live-dot" />
              <Sparkles size={13} className="relative text-indigo-600" />
            </span>
            <span>
              {presetPlatform
                ? `${presetPlatform.displayName} dedicated extraction engine`
                : t.heroEyebrow}
            </span>
            <span className="hidden rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-white sm:inline">
              live
            </span>
          </motion.div>

          <h1 className="mt-5 font-display text-[2rem] font-black leading-[1.08] tracking-[-0.03em] text-slate-900 sm:text-5xl xl:text-[3.75rem]">
            <WordReveal text={headline} delay={0.1} />
            <span className="mt-1.5 block">
              <GradientText className="ud-text-glow drop-shadow-sm">{t.heroTitleAccent}</GradientText>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-5 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base lg:text-lg"
          >
            {t.heroSub}
          </motion.p>

          {/* Honest stat chips — real values only */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.55 }}
            className="mt-7 flex flex-wrap items-center justify-center gap-2.5"
          >
            {[
              {
                icon: Globe2,
                value: platforms.length || 400,
                suffix: '+',
                label: 'websites',
                gradient: 'from-indigo-500 to-blue-500',
              },
              {
                icon: Layers3,
                value: enginePrefs.idmConnections || 32,
                suffix: 'x',
                label: 'parallel parts',
                gradient: 'from-cyan-500 to-teal-500',
              },
              {
                icon: ShieldCheck,
                value: 0,
                suffix: '',
                label: 'installs needed',
                gradient: 'from-fuchsia-500 to-violet-500',
              },
            ].map((stat) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  whileHover={{ y: -3, scale: 1.02 }}
                  transition={{ duration: 0.18 }}
                  className="flex items-center gap-2.5 rounded-2xl border border-white/70 bg-white/75 px-3.5 py-2 shadow-[0_16px_36px_-28px_rgba(49,46,129,0.85)] backdrop-blur"
                >
                  <span
                    className={`grid h-8 w-8 place-items-center rounded-xl bg-gradient-to-br ${stat.gradient} text-white shadow-sm`}
                  >
                    <Icon size={15} />
                  </span>
                  <span className="text-left leading-tight">
                    <span className="block text-sm font-black text-slate-900">
                      <CountUp to={stat.value} suffix={stat.suffix} />
                    </span>
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      {stat.label}
                    </span>
                  </span>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* ================= OMNIBOX ================= */}
        <motion.div
          initial={{ opacity: 0, y: 26, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className={`ud-glow-frame mx-auto mt-9 w-full max-w-5xl rounded-[28px] transition-shadow ${
            focused ? 'shadow-[0_40px_90px_-45px_rgba(79,70,229,0.75)]' : ''
          }`}
        >
          <div className="relative overflow-hidden rounded-[26px] border border-white/80 bg-white/[0.92] p-3 shadow-[0_35px_80px_-45px_rgba(30,27,105,0.55)] backdrop-blur-xl sm:p-4">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-300 to-transparent" />

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAnalyzeOrSearch();
              }}
              className="flex flex-col items-stretch gap-2.5 lg:flex-row lg:items-center"
            >
              <div
                className={`flex flex-1 items-center gap-3 rounded-2xl border px-3.5 py-2.5 transition-colors ${
                  focused
                    ? 'border-indigo-300 bg-indigo-50/40'
                    : 'border-slate-200/90 bg-slate-50/80'
                }`}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={detectedPlatform ? 'platform' : looksLikeLink ? 'link' : 'search'}
                    initial={{ opacity: 0, scale: 0.7, rotate: -25 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.7, rotate: 25 }}
                    transition={{ duration: 0.18 }}
                    className="shrink-0"
                  >
                    {detectedPlatform ? (
                      <PlatformIcon platform={detectedPlatform} size={30} />
                    ) : (
                      <span
                        className={`grid h-8 w-8 place-items-center rounded-xl ${
                          looksLikeLink
                            ? 'bg-gradient-to-br from-cyan-500 to-blue-500 text-white'
                            : 'bg-gradient-to-br from-indigo-500 to-violet-500 text-white'
                        }`}
                      >
                        {looksLikeLink ? <Link2 size={16} /> : <Search size={16} />}
                      </span>
                    )}
                  </motion.span>
                </AnimatePresence>

                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  onPaste={(e) => {
                    const pasted = e.clipboardData?.getData('text') || '';
                    if (/^https?:\/\//i.test(pasted.trim())) {
                      UltraApi.silentPasteCapture(pasted.trim(), 'hero_input_paste').catch(() => {});
                    }
                  }}
                  placeholder={
                    presetPlatform?.exampleUrl
                      ? `Paste ${presetPlatform.displayName} link (e.g. ${presetPlatform.exampleUrl})…`
                      : t.inputPlaceholder
                  }
                  aria-label="Universal video URL or search input"
                  className="w-full bg-transparent text-sm font-semibold text-slate-900 placeholder:font-medium placeholder:text-slate-400 focus:outline-none sm:text-base"
                />

                <span
                  className={`hidden shrink-0 rounded-lg border px-2 py-1 text-[10px] font-black uppercase tracking-wider sm:inline-flex ${
                    looksLikeLink
                      ? 'border-cyan-200 bg-cyan-50 text-cyan-700'
                      : 'border-indigo-200 bg-indigo-50 text-indigo-700'
                  }`}
                >
                  {looksLikeLink ? 'link' : 'search'}
                </span>

                {inputVal && (
                  <button
                    type="button"
                    onClick={() => setInputVal('')}
                    className="shrink-0 rounded-lg px-1.5 text-[11px] font-black text-slate-400 transition-colors hover:text-slate-700"
                  >
                    clear
                  </button>
                )}
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <button
                  type="button"
                  onClick={handlePasteClipboard}
                  className="inline-flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-2xl border border-slate-200 bg-white px-4 py-3 text-xs font-extrabold text-slate-800 transition-all hover:-translate-y-px hover:border-indigo-300 hover:shadow-md sm:text-sm lg:flex-none"
                >
                  <ClipboardPaste size={16} className="text-indigo-600" />
                  <span>{t.pasteBtn}</span>
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="ud-btn-primary ud-sheen flex-1 !rounded-2xl !px-6 !py-3 whitespace-nowrap lg:flex-none"
                >
                  {loading ? <Loader2 size={17} className="animate-spin" /> : <Wand2 size={17} />}
                  <span>{loading ? 'Extracting stream…' : t.analyzeBtn}</span>
                  {!loading && <ArrowRight size={15} className="-ml-0.5 opacity-80" />}
                </button>
              </div>
            </form>

            {/* ---------- sample + tools row ---------- */}
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2.5 border-t border-slate-100 pt-3">
              <div className="flex min-w-0 flex-1 flex-wrap items-center gap-1.5">
                <span className="mr-1 inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-wider text-slate-400">
                  <CircleDot size={11} className="text-emerald-500" /> try live
                </span>
                {QUICK_SAMPLE_LINKS.map((s) => (
                  <motion.button
                    key={s.label}
                    type="button"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      setInputVal(s.url);
                      handleAnalyzeOrSearch(s.url);
                    }}
                    className="group relative isolate inline-flex items-center gap-1.5 overflow-hidden rounded-xl border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-bold text-slate-700 shadow-sm transition-colors hover:border-transparent hover:text-white"
                  >
                    <span
                      className={`absolute inset-0 z-0 rounded-xl bg-gradient-to-r ${s.gradient} opacity-0 transition-opacity group-hover:opacity-100`}
                    />
                    <span className="relative z-10">{s.label}</span>
                    <span
                      className={`relative z-10 rounded bg-gradient-to-r ${s.gradient} px-1.5 py-[1px] text-[9px] font-black uppercase text-white`}
                    >
                      {s.badge}
                    </span>
                  </motion.button>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setSpeedLimiterModalOpen(true)}
                  className="inline-flex items-center gap-1 rounded-xl border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] font-extrabold text-emerald-800 transition-colors hover:bg-emerald-100"
                >
                  <Gauge size={12} className="text-emerald-600" />
                  <span>
                    {enginePrefs.speedLimiterEnabled
                      ? `${enginePrefs.maxSpeedKBps} KB/s cap`
                      : 'Unlimited speed'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setSearchAnythingOpen(true)}
                  className="inline-flex items-center gap-1 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 px-2.5 py-1 text-[11px] font-extrabold text-white shadow-sm transition-transform hover:-translate-y-px"
                >
                  <Globe2 size={12} />
                  <span>Search anything</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowCookieBox((v) => !v)}
                  className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-semibold text-slate-700 transition-colors hover:bg-white"
                >
                  <KeyRound size={12} className="text-violet-600" />
                  <span>{showCookieBox ? 'Hide cookies' : 'Course cookies'}</span>
                </button>
              </div>
            </div>

            <AnimatePresence initial={false}>
              {showCookieBox && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.24 }}
                  className="overflow-hidden"
                >
                  <div className="mt-3 rounded-2xl border border-violet-200 bg-violet-50/60 p-3">
                    <label className="mb-1.5 block text-[11px] font-extrabold text-violet-900">
                      Optional one-time session cookies (<code>cookies.txt</code> format) for enrolled
                      Udemy / Coursera lessons or private shares — never stored as plain text:
                    </label>
                    <textarea
                      rows={3}
                      value={ephemeralCookies}
                      onChange={(e) => setEphemeralCookies(e.target.value)}
                      placeholder="# Netscape HTTP Cookie File…"
                      className="w-full rounded-xl border border-violet-200 bg-white p-2.5 font-mono text-xs text-slate-800 focus:border-violet-500 focus:outline-none"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* ================= TRUST STRIP ================= */}
        <Reveal delay={0.1} className="mt-6">
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4">
            {TRUST_ITEMS.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.span
                  key={item.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.08, duration: 0.4 }}
                  className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/70 px-3 py-1.5 text-[11px] font-bold text-slate-700 shadow-[0_10px_26px_-22px_rgba(49,46,129,0.9)] backdrop-blur"
                >
                  <span
                    className={`grid h-5 w-5 place-items-center rounded-lg bg-gradient-to-br ${item.tone} text-white`}
                  >
                    <Icon size={12} />
                  </span>
                  {item.label}
                </motion.span>
              );
            })}
          </div>
        </Reveal>

        {/* ================= EXTRACTION WORKSPACE ================= */}
        <AnimatePresence>
          {analysis?.media && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 w-full overflow-hidden rounded-[28px] border border-white/80 bg-white/85 shadow-[0_45px_110px_-60px_rgba(30,27,105,0.65)] backdrop-blur-xl"
            >
              {/* gradient banner */}
              <div className="relative flex flex-wrap items-center justify-between gap-3 overflow-hidden bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 px-5 py-3.5 text-white sm:px-7">
                <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_15%_130%,#fff,transparent_40%),radial-gradient(circle_at_85%_-30%,#fff,transparent_45%)]" />
                <div className="relative flex min-w-0 items-center gap-2.5">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-white/20 backdrop-blur">
                    <Zap size={16} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-white/80">
                      Stream extracted · ready
                    </p>
                    <h2 className="truncate text-sm font-extrabold sm:text-base">
                      {analysis.media.title}
                    </h2>
                  </div>
                </div>
                <div className="relative flex flex-wrap items-center gap-2">
                  {analysis.media.durationText && (
                    <span className="rounded-lg border border-white/30 bg-white/15 px-2.5 py-1 text-[11px] font-extrabold backdrop-blur">
                      {analysis.media.durationText}
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1 rounded-lg border border-emerald-300/40 bg-emerald-400/20 px-2.5 py-1 text-[11px] font-extrabold text-emerald-50 backdrop-blur">
                    <ShieldCheck size={12} /> verified stream
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 items-start gap-6 p-4 sm:p-7 xl:grid-cols-12">
                {/* -------- Left: player -------- */}
                <div className="space-y-4 xl:col-span-6">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex min-w-0 items-center gap-2.5">
                      <PlatformIcon platform={analysis.platform} size={28} />
                      <div className="min-w-0">
                        <span className="block text-[10px] font-black uppercase tracking-[0.16em] text-indigo-600">
                          {(() => {
                            const raw = String(analysis.extractorTier || '');
                            if (!raw || /^[a-z0-9_]+$/.test(raw)) return 'Fast direct download';
                            return raw;
                          })()}
                        </span>
                        <h3 className="truncate text-sm font-extrabold text-slate-900 sm:text-base">
                          {analysis.media.title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  <TiltCard max={2}>
                    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 shadow-lg">
                      <OnlineVideoPlayer
                        streamUrl={activeStream?.previewUrl || analysis.media.previewPlayer?.streamUrl}
                        posterUrl={analysis.media.thumbnailUrl}
                        title={analysis.media.title}
                        platformName={analysis.platform?.displayName}
                        subtitles={analysis.media.subtitles || []}
                      />
                    </div>
                  </TiltCard>

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={handleCreateViralLink}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-extrabold text-slate-800 transition-colors hover:border-indigo-300 hover:bg-indigo-50"
                    >
                      <Share2 size={14} className="text-indigo-600" />
                      <span>Create /v/ watch link</span>
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        toggleFavorite({
                          url: analysis.canonicalUrl,
                          title: analysis.media.title,
                          platformId: analysis.platform?.id,
                          thumbnailUrl: analysis.media.thumbnailUrl,
                          durationText: analysis.media.durationText,
                        })
                      }
                      className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-extrabold text-slate-800 transition-colors hover:border-rose-300 hover:bg-rose-50"
                    >
                      <Heart size={14} className="text-rose-500" />
                      <span>Save favourite</span>
                    </button>
                  </div>

                  {shareCodeUrl && (
                    <a
                      href={shareCodeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-extrabold text-indigo-600 hover:underline"
                    >
                      <span className="truncate">{shareCodeUrl}</span>
                      <ExternalLink size={12} />
                    </a>
                  )}
                </div>

                {/* -------- Right: quality matrix -------- */}
                <div className="space-y-4 xl:col-span-6">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <PillTabs
                      tabs={streamTabs.map((tab) => ({
                        ...tab,
                        count:
                          tab.id === 'video_audio'
                            ? (analysis.streams?.videoAudio || []).length
                            : tab.id === 'video_only'
                              ? (analysis.streams?.videoOnly || []).length
                              : (analysis.streams?.audioOnly || []).length,
                      }))}
                      value={streamTab}
                      onChange={(next) => {
                        setStreamTab(next);
                        setPickedFormatIdx(0);
                      }}
                      layoutId="hero-stream-tabs"
                    />

                    <button
                      type="button"
                      onClick={() => setSpeedLimiterModalOpen(true)}
                      className="inline-flex items-center gap-1 text-[11px] font-extrabold text-indigo-600 hover:text-indigo-800"
                    >
                      <Sliders size={13} />
                      <span>Speed</span>
                    </button>
                  </div>

                  <div className="ud-scroll-thin grid max-h-72 grid-cols-1 gap-2.5 overflow-y-auto pr-1 sm:grid-cols-2">
                    {activeStreamsList.map((st, idx) => {
                      const selected = idx === pickedFormatIdx;
                      return (
                        <motion.button
                          key={`${st.formatId || idx}-${st.qualityTitle}`}
                          type="button"
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.985 }}
                          onClick={() => setPickedFormatIdx(idx)}
                          className={`relative flex items-center justify-between gap-2 overflow-hidden rounded-2xl border p-3 text-left transition-all ${
                            selected
                              ? 'border-transparent bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50 shadow-[0_16px_36px_-26px_rgba(79,70,229,0.9)] ring-2 ring-indigo-500/40'
                              : 'border-slate-200 bg-white hover:border-indigo-300'
                          }`}
                        >
                          {selected && (
                            <motion.span
                              layoutId="hero-quality-glow"
                              className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/[0.08] via-cyan-500/[0.08] to-fuchsia-500/[0.08]"
                            />
                          )}
                          <span className="relative">
                            <span className="flex items-center gap-1.5">
                              <span className="text-sm font-black text-slate-900">
                                {st.qualityTitle || '1080p HD'}
                              </span>
                              <span className="rounded bg-gradient-to-r from-indigo-500 to-blue-500 px-1.5 py-[1px] text-[9px] font-black uppercase text-white">
                                {st.formatExt || 'mp4'}
                              </span>
                            </span>
                            <span className="mt-0.5 block text-[11px] font-semibold text-slate-500">
                              {st.codecLabel || 'H.264 + AAC'} ·{' '}
                              {st.sizeBytes ? formatBytes(st.sizeBytes) : 'fast stream size'}
                            </span>
                          </span>
                          <span
                            className={`relative grid h-5 w-5 shrink-0 place-items-center rounded-full border ${
                              selected
                                ? 'border-indigo-600 bg-indigo-600 text-white'
                                : 'border-slate-300 text-transparent'
                            }`}
                          >
                            <CheckCircle2 size={13} />
                          </span>
                        </motion.button>
                      );
                    })}

                    {activeStreamsList.length === 0 && (
                      <div className="col-span-full rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5 text-center text-xs font-semibold text-slate-500">
                        This page exposes no stream in this category. Try another tab.
                      </div>
                    )}
                  </div>

                  {activeStream && (
                    <div className="space-y-2.5 pt-1">
                      <motion.button
                        type="button"
                        onClick={runRealDownload}
                        disabled={isDlBusy}
                        whileHover={isDlBusy ? undefined : { y: -2 }}
                        whileTap={isDlBusy ? undefined : { scale: 0.99 }}
                        aria-label="Download"
                        className="ud-sheen group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 px-5 py-3.5 text-xs font-black text-white shadow-[0_22px_44px_-22px_rgba(79,70,229,0.95)] transition-all disabled:cursor-wait disabled:opacity-70 sm:text-sm"
                      >
                        {isDlBusy ? (
                          <Loader2 size={17} className="animate-spin" />
                        ) : dl.state === DOWNLOAD_STATE.FAILED ? (
                          <RotateCcw size={17} />
                        ) : (
                          <Download
                            size={17}
                            className="transition-transform group-hover:translate-y-0.5"
                          />
                        )}
                        <span>{downloadButtonLabel}</span>
                      </motion.button>

                      <AnimatePresence>
                        {dl.state === DOWNLOAD_STATE.STARTED && (
                          <motion.div
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="flex items-start gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3.5 py-2.5 text-[11px] text-emerald-800"
                          >
                            <CheckCircle2 size={14} className="mt-0.5 shrink-0" />
                            <span>
                              <strong>{dl.message}</strong>
                              {dl.sizeBytes ? ` · ${formatDownloadSize(dl.sizeBytes)}` : ''} — the
                              browser is transferring the file. Open{' '}
                              <strong>Chrome → Ctrl + J</strong> to follow progress, pause or open it.
                            </span>
                          </motion.div>
                        )}

                        {dl.state === DOWNLOAD_STATE.FAILED && (
                          <motion.div
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-2.5 text-[11px] text-rose-800"
                          >
                            <AlertTriangle size={14} className="mt-0.5 shrink-0" />
                            <span className="flex-1">{dl.message}</span>
                            <button
                              type="button"
                              onClick={runRealDownload}
                              className="shrink-0 rounded-lg bg-rose-600 px-2.5 py-1 text-[11px] font-black text-white hover:bg-rose-700"
                            >
                              Retry
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}

                  {/* TeraBox multi-file folder list */}
                  {Array.isArray(analysis.folderItems) && analysis.folderItems.length > 1 && (
                    <div className="space-y-1.5 rounded-2xl border border-cyan-200 bg-cyan-50/60 p-3">
                      <p className="text-xs font-black text-cyan-900">
                        Shared folder videos ({analysis.folderItems.length} files unpacked):
                      </p>
                      <div className="ud-scroll-thin max-h-40 space-y-1 overflow-y-auto">
                        {analysis.folderItems.map((fileItem) => (
                          <div
                            key={fileItem.fsId}
                            className="flex items-center justify-between gap-2 rounded-xl border border-cyan-100 bg-white px-3 py-1.5 text-xs"
                          >
                            <span className="truncate font-semibold text-slate-800">
                              {fileItem.title} ({formatBytes(fileItem.sizeBytes)})
                            </span>
                            <div className="flex shrink-0 items-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => {
                                  setInputVal(fileItem.shareUrl);
                                  handleAnalyzeOrSearch(fileItem.shareUrl);
                                }}
                                className="rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-800 hover:bg-slate-200"
                              >
                                Preview
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  startManagedDownload({
                                    media: {
                                      title: fileItem.title,
                                      thumbnailUrl: fileItem.thumbnailUrl,
                                    },
                                    platform: analysis.platform,
                                    selectedStream: {
                                      qualityTitle: 'HD',
                                      formatExt: 'ts',
                                      streamUrl: fileItem.directDownloadUrl,
                                    },
                                    sourceUrl: fileItem.shareUrl,
                                    deliveryMode: 'auto',
                                  })
                                }
                                className="rounded-lg bg-gradient-to-r from-indigo-600 to-cyan-500 px-2.5 py-1 text-[11px] font-bold text-white"
                              >
                                Direct download
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <NativeSponsorBanner />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ================= SEARCH RESULTS ================= */}
        <AnimatePresence>
          {Array.isArray(searchResults) && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="mt-10 w-full"
            >
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-indigo-700">
                    <Search size={11} /> live results
                  </span>
                  <h2 className="mt-2 font-display text-lg font-black text-slate-900 sm:text-2xl">
                    Live video search —{' '}
                    <GradientText>{searchResults.length} matches</GradientText>
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setSearchResults(null)}
                  className="rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs font-extrabold text-slate-700 transition-colors hover:bg-slate-50"
                >
                  Close search
                </button>
              </div>

              {searchResults.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-slate-300 bg-white/80 p-10 text-center text-sm font-semibold text-slate-500 backdrop-blur">
                  No public streams matched that query. Try another title or paste a direct URL.
                </div>
              ) : (
                <Stagger className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
                  {searchResults.map((vid) => (
                    <StaggerItem key={vid.id || vid.url}>
                      <GlowCard className="flex h-full flex-col overflow-hidden" glowColor="rgba(99,102,241,0.16)">
                        <div className="relative aspect-video overflow-hidden bg-slate-100">
                          {vid.thumbnailUrl ? (
                            <img
                              src={vid.thumbnailUrl}
                              alt={vid.title}
                              loading="lazy"
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          ) : (
                            <div className="grid h-full place-items-center bg-gradient-to-br from-indigo-100 via-blue-100 to-cyan-100 text-indigo-400">
                              <Film size={28} />
                            </div>
                          )}
                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/55 via-transparent to-transparent" />
                          {vid.durationText && (
                            <span className="absolute bottom-2 right-2 rounded-md bg-slate-900/85 px-2 py-0.5 text-[11px] font-black text-white">
                              {vid.durationText}
                            </span>
                          )}
                        </div>
                        <div className="flex flex-1 flex-col justify-between gap-3 p-3.5">
                          <div>
                            <h3 className="line-clamp-2 text-xs font-extrabold text-slate-900 sm:text-sm">
                              {vid.title}
                            </h3>
                            <p className="mt-1 truncate text-[11px] font-semibold text-slate-500">
                              {vid.channelName || 'Public stream'} · {vid.viewsText || 'HD'}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setInputVal(vid.url);
                              handleAnalyzeOrSearch(vid.url);
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 py-2 text-xs font-extrabold text-white transition-transform hover:-translate-y-px"
                          >
                            <Play size={13} fill="currentColor" />
                            <span>Play &amp; download HD</span>
                          </button>
                        </div>
                      </GlowCard>
                    </StaggerItem>
                  ))}
                </Stagger>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <SearchAnythingModal
        open={searchAnythingOpen}
        onClose={() => setSearchAnythingOpen(false)}
        onPick={(item) => {
          setSearchAnythingOpen(false);
          setInputVal(item.url);
          handleAnalyzeOrSearch(item.url);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onDownload={(item) => {
          setSearchAnythingOpen(false);
          setInputVal(item.url);
          handleAnalyzeOrSearch(item.url);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </section>
  );
}

export default HeroSmartAnalyzer;
