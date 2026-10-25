import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  TrendingUp,
  Globe,
  Receipt,
  HardDrive,
  Layers,
  Sliders,
  KeyRound,
  ShieldCheck,
  LogOut,
  ExternalLink,
  RefreshCw,
  Menu,
  X,
  Radio,
  Search,
  ChevronRight,
  Zap,
  Sparkles,
  Command,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { UltraApi } from '../services/apiClient';
import { PadlockAuthScreen } from '../components/admin/PadlockAuthScreen';
import { LiveNotificationDrawer } from '../components/admin/LiveNotificationDrawer';
import { CommandCenterTab } from '../components/admin/CommandCenterTab';
import { ProfitDashboardTab } from '../components/admin/ProfitDashboardTab';
import { AdsEarningsTab } from '../components/admin/AdsEarningsTab';
import { SeoManagerTab } from '../components/admin/SeoManagerTab';
import { FinanceLedgerTab } from '../components/admin/FinanceLedgerTab';
import { SavedVaultTab } from '../components/admin/SavedVaultTab';
import { OperationsTab } from '../components/admin/OperationsTab';
import { CenterTheaterModal } from '../components/player/CenterTheaterModal';
import { AuroraBackground } from '../components/ui/AuroraBackground';

const ADMIN_NAV = [
  { id: 'console', label: 'Command centre', hint: 'Live pulse & cockpit', icon: LayoutDashboard, group: 'Overview' },
  { id: 'profit', label: 'Revenue', hint: 'Charts & projections', icon: TrendingUp, group: 'Overview' },
  { id: 'seo', label: 'SEO manager', hint: 'Keywords & meta', icon: Globe, group: 'Growth' },
  { id: 'ads', label: 'Ads & earnings', hint: 'Slots, traffic, revenue', icon: Radio, group: 'Growth' },
  { id: 'finance', label: 'Ledger', hint: 'Income & costs', icon: Receipt, group: 'Money' },
  { id: 'vault', label: 'Video vault', hint: 'Saved media', icon: HardDrive, group: 'Assets' },
  { id: 'websites', label: 'Websites', hint: 'Multi-project', icon: Layers, group: 'System' },
  { id: 'platforms', label: 'Platforms', hint: 'Adapter library', icon: Sliders, group: 'System' },
  { id: 'cookies', label: 'Cookies', hint: 'Site access', icon: KeyRound, group: 'System' },
  { id: 'security', label: 'Security', hint: 'Audit & ban list', icon: ShieldCheck, group: 'System' },
];

const GROUPS = ['Overview', 'Growth', 'Money', 'Assets', 'System'];

const fadeUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.26, ease: [0.22, 1, 0.36, 1] },
};

export function SecretAdminPortal() {
  const { showToast, user } = useApp();
  const [adminUser, setAdminUser] = useState(null);
  const [activeTab, setActiveTab] = useState('console');
  const [navOpen, setNavOpen] = useState(false);
  const [streamOpen, setStreamOpen] = useState(false);
  const [query, setQuery] = useState('');

  const [liveCards, setLiveCards] = useState([]);
  const [vaultVideos, setVaultVideos] = useState([]);
  const [overview, setOverview] = useState(null);
  const [trafficFunnel, setTrafficFunnel] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [seoKeywords, setSeoKeywords] = useState([]);
  const [financeEntries, setFinanceEntries] = useState([]);
  const [cookieProfiles, setCookieProfiles] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [centerPreviewCard, setCenterPreviewCard] = useState(null);
  const [previewFromVault, setPreviewFromVault] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const loadAllAdminData = useCallback(async () => {
    setRefreshing(true);
    try {
      const [cards, vault, ov, funnel, recs, seo, fin, cookies, logs] = await Promise.all([
        UltraApi.getLiveCards(),
        UltraApi.getVaultVideos(),
        UltraApi.getAnalyticsOverview(),
        UltraApi.getTrafficFunnel(),
        UltraApi.getAiRecommendations(),
        UltraApi.getSeoKeywords(),
        UltraApi.getFinanceLedger(),
        UltraApi.getCookieProfiles(),
        UltraApi.getAuditLogs(),
      ]);
      setLiveCards(cards);
      setVaultVideos(vault);
      setOverview(ov);
      setTrafficFunnel(funnel);
      setRecommendations(recs);
      setSeoKeywords(seo);
      setFinanceEntries(fin);
      setCookieProfiles(cookies);
      setAuditLogs(logs);
    } catch {
      setAdminUser(null);
    } finally {
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    const token = sessionStorage.getItem('ud_admin_access_token');
    if (token) setAdminUser({ email: 'admin@ultradownloader.pro', role: 'super_admin' });
  }, []);

  useEffect(() => {
    if (!adminUser) return undefined;
    loadAllAdminData();

    const unsubscribe = UltraApi.subscribeAdminLiveCards((eventName, payload) => {
      if (eventName === 'snapshot' && Array.isArray(payload)) {
        setLiveCards(payload);
      } else if (eventName === 'card_added' || eventName === 'card_updated') {
        setLiveCards((prev) => {
          const exists = prev.some((c) => c.cardId === payload.cardId);
          return exists
            ? prev.map((c) => (c.cardId === payload.cardId ? payload : c))
            : [payload, ...prev];
        });
      } else if (eventName === 'card_removed') {
        setLiveCards((prev) => prev.filter((c) => c.cardId !== payload.cardId));
      }
    });

    return () => unsubscribe();
  }, [adminUser, loadAllAdminData]);

  useEffect(() => {
    if (adminUser) loadAllAdminData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const handleViewLiveCard = async (card) => {
    const viewPayload = await UltraApi.viewLiveCardStream(card.cardId);
    setPreviewFromVault(false);
    setCenterPreviewCard({
      ...viewPayload,
      streamUrl: viewPayload.previewPlayer?.streamUrl || viewPayload.streamUrl,
    });
  };

  const handleSaveLiveCard = async (card) => {
    try {
      const savedItem = await UltraApi.saveCardToVault(card.cardId);
      setVaultVideos((prev) => [savedItem, ...prev.filter((v) => v.id !== savedItem.id)]);
      setLiveCards((prev) => prev.filter((c) => c.cardId !== card.cardId));
      await loadAllAdminData();
      showToast(`Saved "${savedItem.title}" to the permanent vault.`, 'success');
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const handleCloseLiveCard = async (card) => {
    await UltraApi.closeLiveCard(card.cardId);
    setLiveCards((prev) => prev.filter((c) => c.cardId !== card.cardId));
    showToast('Card removed from live memory.', 'info');
  };

  const handleClearAllLiveCards = async () => {
    await UltraApi.clearAllLiveCards();
    setLiveCards([]);
    showToast('Cleared all live cards.', 'info');
  };

  const handleDeleteVaultVideo = async (vaultId) => {
    const remaining = await UltraApi.deleteVaultVideo(vaultId);
    setVaultVideos(remaining);
    await loadAllAdminData();
    showToast('Deleted video file & record permanently.', 'info');
  };

  const handleAdminLogout = async () => {
    await UltraApi.logoutAdmin();
    setAdminUser(null);
  };

  const groupedNav = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = q
      ? ADMIN_NAV.filter(
          (item) =>
            item.label.toLowerCase().includes(q) || item.hint.toLowerCase().includes(q)
        )
      : ADMIN_NAV;
    return GROUPS.map((group) => ({
      group,
      items: filtered.filter((item) => item.group === group),
    })).filter((section) => section.items.length > 0);
  }, [query]);

  const activeMeta = ADMIN_NAV.find((n) => n.id === activeTab) || ADMIN_NAV[0];

  if (!adminUser) {
    return (
      <PadlockAuthScreen
        onAuthenticated={(admin) => {
          setAdminUser(admin);
          showToast('Admin suite unlocked.', 'success');
        }}
      />
    );
  }

  return (
    <div data-scope="admin" className="relative flex min-h-screen w-full flex-col bg-[#05070f] text-slate-200">
      {/* animated deep-space backdrop */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <AuroraBackground variant="admin" />
      </div>

      {/* ================= TOP COMMAND BAR ================= */}
      <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#05070f]/80 backdrop-blur-xl">
        <div className="ud-gradient-bg-admin h-[2px] w-full opacity-90" />
        <div className="mx-auto flex h-16 w-full max-w-[1800px] items-center justify-between gap-3 px-3 sm:px-5">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              onClick={() => setNavOpen((v) => !v)}
              className="grid h-9 w-9 place-items-center rounded-xl border border-white/12 bg-white/[0.04] text-slate-200 transition-colors hover:bg-white/[0.09] lg:hidden"
              aria-label="Toggle navigation"
            >
              {navOpen ? <X size={17} /> : <Menu size={17} />}
            </button>

            <Link to="/" className="flex shrink-0 items-center gap-2.5">
              <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 via-blue-500 to-cyan-400 text-white shadow-[0_12px_28px_-14px_rgba(79,70,229,0.95)]">
                <Zap size={17} strokeWidth={2.6} />
              </span>
              <span className="hidden leading-tight sm:block">
                <span className="block text-sm font-black tracking-tight text-white">
                  UltraDownloader
                </span>
                <span className="block text-[9.5px] font-black uppercase tracking-[0.2em] text-cyan-300">
                  admin console
                </span>
              </span>
            </Link>

            <span className="hidden items-center gap-1.5 text-xs text-slate-500 md:flex">
              <ChevronRight size={13} />
              <span className="font-bold text-slate-200">{activeMeta.label}</span>
              <span className="hidden lg:inline text-slate-500">· {activeMeta.hint}</span>
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <div className="hidden items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] px-2.5 py-1.5 md:flex">
              <Command size={12} className="text-slate-500" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Jump to section…"
                className="w-36 bg-transparent text-xs font-semibold text-slate-100 placeholder:text-slate-500 focus:outline-none"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="text-slate-500 hover:text-slate-200"
                  aria-label="Clear search"
                >
                  <X size={12} />
                </button>
              )}
            </div>

            <span className="hidden items-center gap-1.5 rounded-xl border border-emerald-400/25 bg-emerald-400/10 px-2.5 py-1.5 text-[10.5px] font-black text-emerald-300 sm:inline-flex">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 ud-live-dot" />
              online
            </span>

            <button
              type="button"
              onClick={() => setStreamOpen((v) => !v)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] px-2.5 py-1.5 text-[11px] font-bold text-slate-200 transition-colors hover:bg-white/[0.09]"
            >
              <Radio size={13} className="text-sky-300" />
              <span className="hidden sm:inline">Live feed</span>
              <span className="rounded-md bg-sky-500/20 px-1.5 text-[10px] font-black text-sky-200">
                {liveCards.length}
              </span>
            </button>

            <button
              type="button"
              onClick={loadAllAdminData}
              className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-200 transition-colors hover:bg-white/[0.09]"
              aria-label="Refresh data"
            >
              <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} />
            </button>

            <Link
              to="/"
              className="hidden h-9 items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] px-3 text-[11px] font-bold text-sky-300 transition-colors hover:bg-white/[0.09] sm:inline-flex"
            >
              <ExternalLink size={12} />
              <span>Public site</span>
            </Link>

            <button
              type="button"
              onClick={handleAdminLogout}
              className="grid h-9 w-9 place-items-center rounded-xl border border-rose-400/25 bg-rose-500/10 text-rose-300 transition-colors hover:bg-rose-500/20"
              aria-label="Lock admin suite"
            >
              <LogOut size={14} />
            </button>
          </div>
        </div>
      </header>

      <div className="relative z-10 mx-auto flex w-full max-w-[1800px] flex-1 gap-4 px-3 py-4 sm:px-5">
        {/* ================= SIDEBAR ================= */}
        <motion.aside
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className={`${
            navOpen ? 'flex' : 'hidden lg:flex'
          } fixed inset-y-16 left-0 z-30 w-[268px] shrink-0 flex-col gap-2 overflow-y-auto rounded-r-3xl border-r border-white/10 bg-[#070b16]/95 p-3 backdrop-blur-2xl lg:sticky lg:top-20 lg:inset-auto lg:h-[calc(100vh-6rem)] lg:rounded-3xl lg:border lg:border-white/10 lg:bg-white/[0.03]`}
        >
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-600/25 via-blue-600/15 to-cyan-500/15 p-3.5">
            <div className="pointer-events-none absolute -right-8 -top-10 h-24 w-24 rounded-full bg-cyan-400/30 blur-2xl ud-halo-breath" />
            <div className="relative flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-xl bg-white/15 text-white backdrop-blur">
                <Sparkles size={15} />
              </span>
              <div>
                <p className="text-[11px] font-black uppercase tracking-widest text-cyan-200">
                  workspace
                </p>
                <p className="text-[13px] font-black text-white">Super admin</p>
              </div>
            </div>
            <div className="relative mt-2.5 grid grid-cols-2 gap-1.5">
              <span className="rounded-lg border border-white/10 bg-black/20 px-2 py-1 text-[10px] font-bold text-slate-200">
                Live {liveCards.length}
              </span>
              <span className="rounded-lg border border-white/10 bg-black/20 px-2 py-1 text-[10px] font-bold text-slate-200">
                Vault {vaultVideos.length}
              </span>
            </div>
          </div>

          {groupedNav.map((section) => (
            <div key={section.group}>
              <p className="px-2 pb-1 pt-1.5 text-[9.5px] font-black uppercase tracking-[0.2em] text-slate-500">
                {section.group}
              </p>
              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const active = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setActiveTab(item.id);
                        setNavOpen(false);
                      }}
                      className={`relative flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-left transition-colors ${
                        active ? 'text-white' : 'text-slate-400 hover:bg-white/[0.05] hover:text-slate-100'
                      }`}
                    >
                      {active && (
                        <motion.span
                          layoutId="admin-nav-active"
                          transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                          className="absolute inset-0 rounded-xl border border-indigo-400/35 bg-gradient-to-r from-indigo-500/25 via-blue-500/15 to-cyan-500/15 shadow-[0_12px_30px_-18px_rgba(56,189,248,0.9)]"
                        />
                      )}
                      <span
                        className={`relative grid h-7 w-7 shrink-0 place-items-center rounded-lg ${
                          active
                            ? 'bg-gradient-to-br from-indigo-500 to-cyan-500 text-white'
                            : 'bg-white/[0.05] text-slate-400'
                        }`}
                      >
                        <Icon size={13} />
                      </span>
                      <span className="relative min-w-0 flex-1">
                        <span className="block truncate text-[12px] font-bold">{item.label}</span>
                        <span className="block truncate text-[9.5px] text-slate-500">{item.hint}</span>
                      </span>
                      {item.id === 'vault' && vaultVideos.length > 0 && (
                        <span className="relative rounded-md bg-white/10 px-1.5 py-0.5 text-[9.5px] font-black text-slate-200">
                          {vaultVideos.length}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          <div className="mt-auto rounded-2xl border border-white/10 bg-white/[0.03] p-3">
            <p className="text-[9.5px] font-black uppercase tracking-widest text-slate-500">
              signed in
            </p>
            <p className="mt-1 truncate text-[11.5px] font-bold text-slate-100">
              {adminUser.email || 'Super admin'}
            </p>
            <p className="flex items-center gap-1 text-[10px] text-emerald-300">
              <ShieldCheck size={10} /> full access · auto-lock on
            </p>
          </div>
        </motion.aside>

        {/* ================= MAIN ================= */}
        <main className="min-w-0 flex-1">
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} {...fadeUp} className="space-y-4">
              {/* page header */}
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[9.5px] font-black uppercase tracking-[0.18em] text-cyan-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 ud-live-dot" />
                    {activeMeta.group} · live data
                  </span>
                  <h1 className="mt-2 font-display text-xl font-black tracking-tight text-white sm:text-2xl">
                    {activeMeta.label}
                  </h1>
                  <p className="mt-0.5 text-[11.5px] text-slate-400">
                    {activeMeta.hint} · figures stream straight from your own MySQL tables
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10.5px] font-bold text-slate-300">
                    {refreshing ? 'syncing…' : 'synced just now'}
                  </span>
                  <button
                    type="button"
                    onClick={() => setStreamOpen((v) => !v)}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10.5px] font-bold text-slate-200 transition-colors hover:bg-white/[0.09]"
                  >
                    <Radio size={12} className="text-sky-300" /> live feed
                  </button>
                </div>
              </div>

              {/* tab content */}
              {activeTab === 'console' && (
                <CommandCenterTab
                  overview={overview}
                  trafficFunnel={trafficFunnel}
                  liveCards={liveCards}
                  vaultVideos={vaultVideos}
                  seoKeywords={seoKeywords}
                  financeEntries={financeEntries}
                  recommendations={recommendations}
                  onNavigate={setActiveTab}
                  onRefresh={loadAllAdminData}
                  refreshing={refreshing}
                />
              )}

              {activeTab === 'profit' && (
                <ProfitDashboardTab
                  overview={overview}
                  recommendations={recommendations}
                  trafficFunnel={trafficFunnel}
                />
              )}

              {activeTab === 'seo' && (
                <SeoManagerTab
                  keywords={seoKeywords}
                  onUpdateKeywords={(next) => {
                    setSeoKeywords(next);
                    loadAllAdminData();
                  }}
                  showToast={showToast}
                />
              )}

              {activeTab === 'finance' && (
                <FinanceLedgerTab
                  entries={financeEntries}
                  onUpdateEntries={async (next) => {
                    setFinanceEntries(next);
                    await loadAllAdminData();
                  }}
                  showToast={showToast}
                />
              )}

              {activeTab === 'vault' && (
                <SavedVaultTab
                  items={vaultVideos}
                  onPlayVaultItem={(vid) => {
                    setPreviewFromVault(true);
                    setCenterPreviewCard({ ...vid, rawUrl: vid.rawUrl || vid.sourceUrl });
                  }}
                  onDeleteVaultItem={handleDeleteVaultVideo}
                  showToast={showToast}
                  user={user}
                />
              )}

              {activeTab === 'ads' && <AdsEarningsTab showToast={showToast} />}

              {['websites', 'platforms', 'cookies', 'security'].includes(activeTab) && (
                <OperationsTab
                  subTab={activeTab}
                  auditLogs={auditLogs}
                  cookieProfiles={cookieProfiles}
                  onUpdateCookies={(next) => {
                    setCookieProfiles(next);
                    loadAllAdminData();
                  }}
                  showToast={showToast}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* ================= RIGHT LIVE FEED ================= */}
        <div className={`${streamOpen ? 'block' : 'hidden xl:block'} w-full shrink-0 xl:w-80`}>
          <LiveNotificationDrawer
            liveCards={liveCards}
            onViewCard={handleViewLiveCard}
            onSaveCard={handleSaveLiveCard}
            onCloseCard={handleCloseLiveCard}
            onClearAll={handleClearAllLiveCards}
            onRefreshCards={loadAllAdminData}
            showToast={showToast}
          />
        </div>
      </div>

      {centerPreviewCard && (
        <CenterTheaterModal
          item={centerPreviewCard}
          isFromSavedVault={previewFromVault}
          onCloseModal={() => setCenterPreviewCard(null)}
          onSaveCard={handleSaveLiveCard}
          onDiscardCard={handleCloseLiveCard}
        />
      )}
    </div>
  );
}

export default SecretAdminPortal;
