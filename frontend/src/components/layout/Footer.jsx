import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Zap,
  ShieldCheck,
  Globe,
  Heart,
  Sparkles,
  ArrowUpRight,
  Github,
  Send,
  Mail,
  Server,
  Cpu,
  Lock,
} from 'lucide-react';

const COLUMNS = [
  {
    title: 'Popular downloaders',
    accent: 'from-indigo-400 to-cyan-400',
    links: [
      { to: '/tools/terabox-app-video-downloader', label: 'TeraBox video player & downloader' },
      { to: '/tools/iteraplay-free-video-downloader', label: 'iTeraPlay & TeraViralHub' },
      { to: '/tools/watch-movies-pk-video-downloader', label: 'Watch-Movies PK & HD movies' },
      { to: '/tools/tiktok-video-downloader', label: 'TikTok & reels (no watermark)' },
      { to: '/tools/youtube-4k-video-mp3-downloader', label: 'YouTube 4K video & MP3' },
    ],
  },
  {
    title: 'Your workspace',
    accent: 'from-fuchsia-400 to-violet-400',
    links: [
      { to: '/sites', label: 'All supported websites' },
      { to: '/downloads', label: 'My downloads' },
      { to: '/player', label: 'Online video player' },
      { to: '/albums', label: 'Video & audio search' },
      { to: '/settings', label: 'Download & quality settings' },
    ],
  },
  {
    title: 'Legal & help',
    accent: 'from-amber-400 to-rose-400',
    links: [
      { to: '/legal/privacy', label: 'Privacy policy' },
      { to: '/legal/terms', label: 'Terms of service' },
      { to: '/legal/copyright', label: 'Copyright / DMCA' },
    ],
  },
];

const TECH_PILLS = [
  { icon: Cpu, label: 'React 18 + Vite' },
  { icon: Server, label: 'Node.js + Express' },
  { icon: Globe, label: 'Private SQL storage' },
  { icon: Lock, label: 'AES-256 vault' },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-auto w-full overflow-hidden bg-[#05070f] text-slate-300">
      {/* animated aurora glow */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="ud-aurora-blob ud-blob-a" style={{ top: '-30%', left: '-10%', width: '46vw', height: '46vw', background: 'radial-gradient(circle, rgba(79,70,229,0.42) 0%, rgba(79,70,229,0) 68%)' }} />
        <div className="ud-aurora-blob ud-blob-b" style={{ bottom: '-40%', right: '-8%', width: '44vw', height: '44vw', background: 'radial-gradient(circle, rgba(34,211,238,0.28) 0%, rgba(34,211,238,0) 68%)' }} />
        <div className="ud-aurora-blob ud-blob-c" style={{ top: '10%', right: '28%', width: '30vw', height: '30vw', background: 'radial-gradient(circle, rgba(217,70,239,0.22) 0%, rgba(217,70,239,0) 70%)' }} />
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(148,163,184,0.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.35) 1px, transparent 1px)',
            backgroundSize: '72px 72px',
            maskImage: 'radial-gradient(ellipse 70% 60% at 50% 0%, black 20%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 0%, black 20%, transparent 80%)',
          }}
        />
      </div>

      <div className="ud-top-hairline relative h-[2px] w-full" />

      <div className="relative mx-auto w-full max-w-[1600px] px-4 pb-10 pt-12 sm:px-6 xl:px-10">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* ---------------- brand column ---------------- */}
          <div>
            <Link to="/" className="group flex items-center gap-3">
              <span className="relative grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-indigo-500 via-blue-500 to-cyan-400 text-white shadow-[0_16px_36px_-16px_rgba(79,70,229,0.95)]">
                <span className="absolute inset-0 rounded-2xl bg-cyan-400/40 blur-lg transition-opacity duration-300 group-hover:opacity-100" />
                <Zap size={21} strokeWidth={2.6} className="relative" />
              </span>
              <span className="font-display text-lg font-black tracking-tight text-white">
                Ultra<span className="ud-text-gradient">Downloader</span>
              </span>
            </Link>

            <p className="mt-4 max-w-sm text-xs leading-relaxed text-slate-400 sm:text-sm">
              Download videos, reels, movies and songs from 400+ websites in HD and 4K — watch online
              first, then save the file straight to your device in one click.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-1 text-[10.5px] font-black text-emerald-300">
                <ShieldCheck size={12} /> Safe &amp; private
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-400/30 bg-indigo-400/10 px-2.5 py-1 text-[10.5px] font-black text-indigo-300">
                <Sparkles size={12} /> Always free
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-2.5 py-1 text-[10.5px] font-black text-cyan-300">
                <Globe size={12} /> No install
              </span>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-2">
              {TECH_PILLS.map((pill) => {
                const Icon = pill.icon;
                return (
                  <span
                    key={pill.label}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] px-2.5 py-1.5 text-[10.5px] font-bold text-slate-300"
                  >
                    <Icon size={11} className="text-cyan-300" />
                    {pill.label}
                  </span>
                );
              })}
            </div>
          </div>

          {/* ---------------- link columns ---------------- */}
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="mb-3 flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.16em] text-white">
                <span className={`h-3 w-1 rounded-full bg-gradient-to-b ${col.accent}`} />
                {col.title}
              </h3>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="group inline-flex items-start gap-1 text-xs font-medium text-slate-400 transition-colors hover:text-white sm:text-[13px]"
                    >
                      <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                        {link.label}
                      </span>
                      <ArrowUpRight
                        size={11}
                        className="mt-0.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ---------------- bottom bar ---------------- */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-center text-[11px] text-slate-500 sm:text-left">
            © {year} UltraDownloader. Built with React, Node.js and Express. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2">
            <motion.a
              whileHover={{ y: -2 }}
              href="mailto:hello@ultradownloader.pro"
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] px-2.5 py-1.5 text-[11px] font-bold text-slate-300 transition-colors hover:border-indigo-400/40 hover:text-white"
            >
              <Mail size={12} className="text-indigo-300" /> Contact
            </motion.a>
            <motion.a
              whileHover={{ y: -2 }}
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] px-2.5 py-1.5 text-[11px] font-bold text-slate-300 transition-colors hover:border-white/25 hover:text-white"
            >
              <Github size={12} /> GitHub
            </motion.a>
            <motion.a
              whileHover={{ y: -2 }}
              href="mailto:hello@ultradownloader.pro?subject=UltraDownloader"
              className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 px-3 py-1.5 text-[11px] font-black text-white shadow-[0_14px_30px_-16px_rgba(34,211,238,0.9)]"
            >
              <Send size={12} /> Say hello
            </motion.a>
          </div>
        </div>

        <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-[11px] text-slate-500">
          <Heart size={12} className="text-rose-500" />
          Please download only your own or authorised content.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
