import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Layers,
  Film,
  Sparkles,
  PlayCircle,
  Gauge,
  Shield,
  Database,
  Link2,
  SearchCheck,
  Sliders,
  Download,
  Cloud,
  ArrowRight,
  CheckCircle2,
  Zap,
  Wand2,
} from 'lucide-react';
import { MotionReveal, SectionHeading, AccordionItem } from '../ui/Primitives';
import { GradientText, GlowCard, Stagger, StaggerItem } from '../ui/MotionKit';

const POPULAR_FEATURES = [
  {
    title: '400+ platforms & mirrors',
    desc: 'Social, movies, courses and TeraBox / cloud adapters — every supported site gets its own icon and extractor.',
    icon: Layers,
    gradient: 'from-indigo-500 via-blue-500 to-cyan-400',
    tint: 'from-indigo-50 to-cyan-50',
  },
  {
    title: 'Blazing fast downloads',
    desc: 'Multi-part transfer engine with an optional speed limit, plus one-click hand-off to Internet Download Manager.',
    icon: Gauge,
    gradient: 'from-emerald-500 via-teal-500 to-cyan-400',
    tint: 'from-emerald-50 to-teal-50',
  },
  {
    title: '100% free TeraBox & iTeraPlay',
    desc: 'Play & download full-length videos from terabox.app, iteraplay.com, teraviralhub.com & 30+ mirrors free.',
    icon: Cloud,
    gradient: 'from-sky-500 via-cyan-500 to-blue-600',
    tint: 'from-sky-50 to-blue-50',
  },
  {
    title: 'Choose your quality',
    desc: 'Pick video + sound (8K / 4K / 1080p MP4), video only (muted), or pure 320 kbps MP3 audio.',
    icon: Film,
    gradient: 'from-violet-500 via-purple-500 to-fuchsia-500',
    tint: 'from-violet-50 to-fuchsia-50',
  },
  {
    title: 'Built-in HLS + MP4 player',
    desc: 'Adaptive Hls.js + HTML5 cinema player streams full movies inside your browser before saving.',
    icon: PlayCircle,
    gradient: 'from-fuchsia-500 via-pink-500 to-rose-400',
    tint: 'from-fuchsia-50 to-rose-50',
  },
  {
    title: 'Works on blocked networks',
    desc: 'Smart secure-DNS and proxy options help you reach links that are restricted by your internet provider.',
    icon: Shield,
    gradient: 'from-amber-500 via-orange-500 to-rose-500',
    tint: 'from-amber-50 to-orange-50',
  },
  {
    title: 'Private personal history',
    desc: 'Sign in to keep your own downloadable list per account. Logged-out visitors are never tracked.',
    icon: Database,
    gradient: 'from-teal-500 via-emerald-500 to-lime-500',
    tint: 'from-teal-50 to-emerald-50',
  },
  {
    title: 'Pause, resume & rename',
    desc: 'Resumable transfers and full Unicode file names for Urdu, Arabic, Hindi and global titles.',
    icon: Sparkles,
    gradient: 'from-rose-500 via-pink-500 to-fuchsia-500',
    tint: 'from-rose-50 to-fuchsia-50',
  },
];

const HOW_STEPS = [
  {
    step: '01',
    title: 'Paste any URL or search',
    desc: 'Paste TeraBox, YouTube, social reels, movie pages, course lectures, or direct MP4 links into the bar.',
    icon: Link2,
    gradient: 'from-indigo-500 to-blue-500',
  },
  {
    step: '02',
    title: 'Watch live in browser',
    desc: 'The extractor unlocks direct CDN & HLS streams instantly inside the built-in cinema player.',
    icon: SearchCheck,
    gradient: 'from-cyan-500 to-teal-500',
  },
  {
    step: '03',
    title: 'Pick quality & speed mode',
    desc: 'Select 4K/1080p MP4 or 320 kbps MP3 — at full speed or with a speed limit you choose.',
    icon: Sliders,
    gradient: 'from-violet-500 to-fuchsia-500',
  },
  {
    step: '04',
    title: 'One-click normal download',
    desc: 'Save straight to your Downloads folder or launch it inside Windows Internet Download Manager.',
    icon: Download,
    gradient: 'from-amber-500 to-rose-500',
  },
];

const TERABOX_SUITE = [
  {
    badge: 'TeraBox native free',
    domain: 'terabox.app & 1024tera.com',
    gradient: 'from-blue-500 to-indigo-500',
    ring: 'hover:border-blue-400',
    points: ['Full-length movie downloads', 'No paid key required', 'Single fast MP4 file output'],
    slug: 'terabox-app-video-downloader',
  },
  {
    badge: 'iTeraPlay unwrapper',
    domain: 'iteraplay.com links free',
    gradient: 'from-violet-500 to-fuchsia-500',
    ring: 'hover:border-violet-400',
    points: [
      'Unwraps ?url= wrapper links directly',
      'Instant browser HLS VOD stream',
      'One-click MP4 & IDM export',
    ],
    slug: 'iteraplay-free-video-downloader',
  },
  {
    badge: 'TeraViralHub core',
    domain: 'teraviralhub.com & shares',
    gradient: 'from-emerald-500 to-teal-500',
    ring: 'hover:border-emerald-400',
    points: [
      'Direct surl & folder extraction',
      'Watch the full video before saving',
      'Zero TeraBox app installation',
    ],
    slug: 'teraviralhub-video-downloader',
  },
  {
    badge: '32+ cloud mirrors',
    domain: 'mirrobox · nephobox · momerybox',
    gradient: 'from-cyan-500 to-blue-500',
    ring: 'hover:border-cyan-400',
    points: [
      'Auto-heals ww.mirrobox.com typos',
      '4funbox, freeterabox, tibibox',
      'Pixeldrain, GoFile, MediaFire & Drive',
    ],
    slug: 'mirrobox-video-downloader',
  },
];

const FAQS = [
  {
    q: 'How fast are the downloads?',
    a: 'Downloads run at the maximum speed your internet connection allows. The file is streamed straight to your device, and you can hand it over to Internet Download Manager in one click if you prefer managing it there.',
  },
  {
    q: 'Can I limit the download speed when others are using my Wi-Fi?',
    a: 'Yes. Open Speed Limit from the top bar and switch between Unlimited and a fixed KB/s cap (for example 500 KB/s, 2 MB/s or 10 MB/s) any time you need.',
  },
  {
    q: 'Does TeraBox, iTeraPlay and TeraViralHub work 100% free without paid keys?',
    a: 'Yes! All 32 TeraBox & cloud mirror domains resolve shorturl tokens, browser HLS playlists, and full-length video streams completely free without any paid API key.',
  },
  {
    q: 'Is my download history private?',
    a: 'Completely. If you are not signed in, no download history is saved at all. When you sign in, your history belongs only to your account — no other user can ever see it, and you can delete any item or clean the whole list anytime.',
  },
];

export function LandingSections() {
  return (
    <div className="relative w-full space-y-20 bg-white px-4 py-16 sm:px-6 xl:px-10">
      {/* ================= 1. FEATURE GRID ================= */}
      <MotionReveal>
        <SectionHeading
          eyebrow="Everything you need"
          title="Engineered for speed —"
          highlight="400+ sites · free TeraBox · one-click save"
          subtitle="A fast, clean studio to watch videos online first and save them to your device in one click — on any phone, tablet or PC."
        />

        <Stagger className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.05}>
          {POPULAR_FEATURES.map((feat) => {
            const Icon = feat.icon;
            return (
              <StaggerItem key={feat.title}>
                <GlowCard className="h-full p-0" glowColor="rgba(99,102,241,0.16)">
                  <div className="flex h-full flex-col p-5">
                    <span
                      className={`relative mb-4 grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br ${feat.gradient} text-white shadow-[0_16px_32px_-20px_rgba(49,46,129,0.95)]`}
                    >
                      <span
                        className={`absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br ${feat.tint} blur-md`}
                      />
                      <Icon size={20} />
                    </span>
                    <h3 className="text-base font-black text-slate-900">{feat.title}</h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-slate-600 sm:text-[13px]">
                      {feat.desc}
                    </p>
                  </div>
                </GlowCard>
              </StaggerItem>
            );
          })}
        </Stagger>
      </MotionReveal>

      {/* ================= 2. TERABOX & CLOUD SUITE ================= */}
      <MotionReveal>
        <div className="relative w-full overflow-hidden rounded-[30px] border border-slate-200/80 bg-gradient-to-br from-white via-indigo-50/40 to-cyan-50/50 p-6 shadow-[0_40px_90px_-60px_rgba(30,27,105,0.6)] sm:p-9">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div
              className="ud-aurora-blob ud-blob-a"
              style={{
                top: '-40%',
                left: '10%',
                width: '34vw',
                height: '34vw',
                background: 'radial-gradient(circle, rgba(99,102,241,0.20) 0%, rgba(99,102,241,0) 70%)',
              }}
            />
            <div
              className="ud-aurora-blob ud-blob-b"
              style={{
                bottom: '-50%',
                right: '5%',
                width: '32vw',
                height: '32vw',
                background: 'radial-gradient(circle, rgba(34,211,238,0.20) 0%, rgba(34,211,238,0) 70%)',
              }}
            />
          </div>

          <div className="relative mb-7 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-200 bg-white/85 px-3 py-1 text-[11px] font-black text-cyan-700 shadow-sm backdrop-blur">
                <Cloud size={13} /> 100% free zero-key cloud engine
              </span>
              <h2 className="mt-2.5 font-display text-2xl font-black text-slate-900 sm:text-3xl">
                TeraBox, iTeraPlay &amp;{' '}
                <GradientText variant="candy">32+ cloud mirror suite</GradientText>
              </h2>
              <p className="mt-1 text-xs text-slate-600 sm:text-sm">
                Play full movies inside your browser or save them to your device without installing any
                app.
              </p>
            </div>
            <Link to="/tools/terabox-app-video-downloader" className="ud-btn-primary shrink-0 !px-5 !py-3">
              <span>Open free TeraPlayer</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          <div className="relative grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {TERABOX_SUITE.map((svc) => (
              <motion.div key={svc.badge} whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
                <Link
                  to={`/tools/${svc.slug}`}
                  className={`group block h-full rounded-2xl border border-slate-200 bg-white/90 p-5 backdrop-blur transition-colors ${svc.ring}`}
                >
                  <span
                    className={`inline-flex items-center rounded-full bg-gradient-to-r ${svc.gradient} px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wide text-white`}
                  >
                    {svc.badge}
                  </span>
                  <p className="mb-3 mt-2 text-sm font-black text-slate-900">{svc.domain}</p>
                  <ul className="space-y-1.5 text-[12px] text-slate-700">
                    {svc.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-2">
                        <CheckCircle2 size={13} className="mt-0.5 shrink-0 text-emerald-500" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </MotionReveal>

      {/* ================= 3. HOW IT WORKS ================= */}
      <MotionReveal>
        <SectionHeading
          eyebrow="Simple 4-step workflow"
          title="How UltraDownloader"
          highlight="works"
          align="center"
          subtitle="Paste a link → watch it in the browser → choose quality → save it to your device in one click."
        />

        <div className="relative grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="pointer-events-none absolute left-0 right-0 top-12 hidden h-px bg-gradient-to-r from-transparent via-indigo-200 to-transparent lg:block" />
          {HOW_STEPS.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className={`relative rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_16px_40px_-34px_rgba(30,27,105,0.9)] transition-shadow hover:border-indigo-300 hover:shadow-lg`}
              >
                <div className="mb-4 flex items-center justify-between">
                  <span
                    className={`grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br ${s.gradient} text-xs font-black text-white shadow-sm`}
                  >
                    {s.step}
                  </span>
                  <Icon size={20} className="text-indigo-500" />
                </div>
                <h3 className="text-base font-black text-slate-900">{s.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-600 sm:text-[13px]">{s.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </MotionReveal>

      {/* ================= 4. FAQ ================= */}
      <MotionReveal>
        <SectionHeading
          eyebrow="Transparent answers"
          title="Frequently asked"
          highlight="questions"
          align="center"
        />
        <div className="mx-auto max-w-4xl space-y-3">
          {FAQS.map((item, i) => (
            <AccordionItem key={item.q} question={item.q} answer={item.a} defaultOpen={i === 0} />
          ))}
        </div>
      </MotionReveal>

      {/* ================= 5. CTA BANNER ================= */}
      <MotionReveal>
        <div className="relative w-full overflow-hidden rounded-[30px] p-8 text-center text-white shadow-[0_50px_120px_-60px_rgba(49,46,129,0.95)] sm:p-12">
          <div className="ud-gradient-bg-anim absolute inset-0" />
          <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_15%_130%,#fff,transparent_40%),radial-gradient(circle_at_85%_-30%,#fff,transparent_45%)]" />

          <motion.div
            animate={{ y: [0, -12, 0], rotate: [0, 6, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="pointer-events-none absolute left-6 top-6 hidden text-white/30 sm:block"
          >
            <Sparkles size={28} />
          </motion.div>
          <motion.div
            animate={{ y: [0, 14, 0], rotate: [0, -6, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            className="pointer-events-none absolute bottom-6 right-8 hidden text-white/30 sm:block"
          >
            <Zap size={30} />
          </motion.div>

          <div className="relative">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/15 px-3 py-1 text-[11px] font-black uppercase tracking-widest backdrop-blur">
              <Wand2 size={12} /> start in one click
            </span>
            <h2 className="mt-4 font-display text-2xl font-black sm:text-4xl">
              Ready to watch &amp; download anything, anywhere?
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-xs text-indigo-50 sm:text-base">
              Paste any link at the top of the page, or open settings to choose your default quality and
              download speed.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <motion.button
                type="button"
                whileHover={{ y: -2, scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-xs font-black text-indigo-700 shadow-[0_18px_40px_-20px_rgba(255,255,255,0.8)] transition-colors hover:bg-indigo-50 sm:text-sm"
              >
                <span>Paste a video URL now</span>
                <ArrowRight size={15} />
              </motion.button>
              <Link
                to="/settings"
                className="inline-flex items-center gap-2 rounded-xl border border-white/35 bg-white/15 px-5 py-3 text-xs font-extrabold text-white backdrop-blur transition-colors hover:bg-white/25 sm:text-sm"
              >
                <Sliders size={15} />
                <span>Open download settings</span>
              </Link>
            </div>
          </div>
        </div>
      </MotionReveal>
    </div>
  );
}

export default LandingSections;
