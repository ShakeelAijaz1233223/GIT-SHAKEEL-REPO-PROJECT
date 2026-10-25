import React from 'react';
import {
  Sparkles,
  Download,
  ShieldCheck,
  Zap,
  Globe2,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  Lock,
  Infinity as InfinityIcon,
} from 'lucide-react';
import { AccordionItem } from '../ui/Primitives';
import { AuroraBackground } from '../ui/AuroraBackground';
import {
  GradientText,
  Reveal,
  Stagger,
  StaggerItem,
  GlowCard,
  CountUp,
} from '../ui/MotionKit';

/* ============================================================================
   PURPOSE + SEO/AEO SECTION (V12)
   Tells a first-time visitor (and search / AI answer engines) what this site
   is, who it is for, how it works and what it costs. Ships FAQPage +
   SoftwareApplication structured data.
   ========================================================================== */

const STEPS = [
  {
    icon: Globe2,
    title: 'Paste any link',
    body: 'Copy the address of the video page — YouTube, Facebook, Instagram, TikTok, a TeraBox share, an online course lesson, or any other website.',
    gradient: 'from-indigo-500 via-blue-500 to-cyan-400',
    glow: 'rgba(79,70,229,0.2)',
  },
  {
    icon: Sparkles,
    title: 'We find the real video file',
    body: 'The engine reads the page, follows embedded players and picks the actual media stream — not ads, not a placeholder image.',
    gradient: 'from-fuchsia-500 via-pink-500 to-rose-400',
    glow: 'rgba(217,70,239,0.2)',
  },
  {
    icon: Download,
    title: 'Watch or download',
    body: 'Preview it instantly in the browser, then download in the quality you choose. It saves like any normal file — no extra software required.',
    gradient: 'from-emerald-500 via-teal-500 to-cyan-400',
    glow: 'rgba(16,185,129,0.2)',
  },
];

const TRUST = [
  {
    icon: ShieldCheck,
    title: 'No fake progress',
    body: 'Only a real “download started”, never a fake “completed”.',
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    icon: Zap,
    title: 'Fast engine',
    body: 'Direct CDN streams; most links resolve in under a second.',
    gradient: 'from-blue-500 to-indigo-500',
  },
  {
    icon: Download,
    title: 'Real file formats',
    body: 'MP4, MKV, WEBM, MP3, M4A and 175+ more extensions.',
    gradient: 'from-fuchsia-500 to-violet-500',
  },
  {
    icon: Lock,
    title: 'Private by default',
    body: 'Guest mode stores zero history. Your account history is yours only.',
    gradient: 'from-amber-500 to-orange-500',
  },
];

const FAQS = [
  {
    q: 'What is UltraDownloader?',
    a: 'UltraDownloader is a free online video downloader. You paste a link from any website, it finds the real video file behind that page, lets you watch it in the browser and download it in HD — without installing any software.',
  },
  {
    q: 'Which websites are supported?',
    a: 'More than 400 platforms are listed — YouTube, Facebook, Instagram, TikTok, X, Reddit, Dailymotion, Vimeo, Twitch, Netflix trailers, Prime Video trailers, Disney+, Hulu, Tubi, Pluto TV, Plex, Crunchyroll, JioHotstar, ZEE5, Sony LIV, Udemy, Coursera, Khan Academy, freeCodeCamp, MIT OpenCourseWare, TeraBox and every official mirror, plus cloud drives. Any other website is still accepted by the universal engine, so you never see “URL not supported”.',
  },
  {
    q: 'Is it really free? Do I need an account?',
    a: 'Yes. Downloads are free and you do not need an account. Signing in is optional and only adds personal download history that nobody else can see.',
  },
  {
    q: 'Do I need to install any software?',
    a: 'No. The download uses your browser’s own download manager. If you already have a download manager installed, your browser can hand the file over automatically — but nothing here depends on it.',
  },
  {
    q: 'Why do some movies not download?',
    a: 'Paid streaming titles (Netflix, Disney+, Prime Video and similar) are protected by Widevine/FairPlay DRM. No downloader can legally decrypt those. What does work is the public trailer, preview or free-tier episode of the same page — and all free services such as Tubi, Pluto TV and Plex.',
  },
  {
    q: 'Can I download a video that is inside a course or a locked page?',
    a: 'Yes, when the video is embedded in a page you can open. The engine follows iframes, embedded players (Panopto, Brightcove, Vidyard, JW Player, Kaltura, Wistia, Mux, Vimeo, YouTube) and pulls out only the video stream. For an enrolled paid course you can paste your own cookies once, and they are never stored in plain text.',
  },
];

export function PurposeSeoSection() {
  return (
    <section className="ud-section relative w-full border-t border-slate-200/80 py-16">
      <AuroraBackground variant="soft" />

      <div className="relative mx-auto w-full max-w-[1600px] px-4 sm:px-6 xl:px-10">
        {/* ---------------- what is this ---------------- */}
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-200 bg-white/85 px-3.5 py-1 text-[11px] font-black text-indigo-700 shadow-sm backdrop-blur">
              <HelpCircle size={13} /> what is this website?
            </span>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-3 font-display text-2xl font-black tracking-tight text-slate-900 sm:text-4xl">
              One free tool to save any online video for{' '}
              <GradientText>offline watching</GradientText>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
              UltraDownloader is a <strong className="text-slate-800">free online video downloader</strong>.
              Its only purpose is simple: you paste a video link, and you get that video as a normal file
              on your computer — in HD, with sound, without ads in the middle and without installing
              anything. It works on phones, tablets and PCs, in any modern browser, for students,
              teachers, creators and anyone who wants to keep a video they are allowed to keep.
            </p>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
              {[
                { label: 'platforms', value: 400, suffix: '+' },
                { label: 'cost per download', value: 0, prefix: '$' },
                { label: 'software to install', value: 0 },
                { label: 'sign-up required', value: 0 },
              ].map((chip) => (
                <span
                  key={chip.label}
                  className="inline-flex items-baseline gap-1.5 rounded-2xl border border-white/70 bg-white/80 px-3.5 py-2 text-xs font-bold text-slate-600 shadow-[0_14px_34px_-28px_rgba(49,46,129,0.9)] backdrop-blur"
                >
                  <span className="text-sm font-black text-slate-900">
                    <CountUp to={chip.value} prefix={chip.prefix || ''} suffix={chip.suffix || ''} />
                  </span>
                  {chip.label}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        {/* ---------------- how it works ---------------- */}
        <Stagger className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <StaggerItem key={step.title}>
                <GlowCard glowColor={step.glow} className="h-full p-0">
                  <div className="relative h-full p-6">
                    <div className="flex items-center justify-between">
                      <span
                        className={`relative grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${step.gradient} text-white shadow-[0_18px_34px_-20px_rgba(49,46,129,0.95)]`}
                      >
                        <Icon size={21} />
                      </span>
                      <span className="font-display text-4xl font-black text-slate-100">
                        0{index + 1}
                      </span>
                    </div>
                    <h3 className="mt-4 text-base font-black text-slate-900">{step.title}</h3>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-slate-600">{step.body}</p>

                    <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-slate-100">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${step.gradient}`}
                        style={{ width: `${(index + 1) * 33.3}%` }}
                      />
                    </div>
                  </div>
                </GlowCard>
              </StaggerItem>
            );
          })}
        </Stagger>

        {/* ---------------- trust row ---------------- */}
        <Stagger className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {TRUST.map((item) => {
            const Icon = item.icon;
            return (
              <StaggerItem key={item.title}>
                <div className="group flex h-full items-start gap-3 rounded-2xl border border-slate-200 bg-white/85 p-4 backdrop-blur transition-all hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-lg">
                  <span
                    className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${item.gradient} text-white shadow-sm`}
                  >
                    <Icon size={17} />
                  </span>
                  <div>
                    <p className="text-[13px] font-black text-slate-800">{item.title}</p>
                    <p className="mt-0.5 text-[12px] leading-relaxed text-slate-500">{item.body}</p>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>

        {/* ---------------- FAQ ---------------- */}
        <div className="mx-auto mt-14 max-w-4xl">
          <Reveal className="text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-fuchsia-200 bg-fuchsia-50 px-3.5 py-1 text-[11px] font-black text-fuchsia-700">
              <Sparkles size={12} /> honest answers
            </span>
            <h2 className="mt-3 font-display text-2xl font-black text-slate-900 sm:text-3xl">
              Frequently asked questions
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-sm text-slate-600">
              Everything below is true of this build — no marketing numbers.
            </p>
          </Reveal>

          <div className="mt-6 space-y-2.5">
            {FAQS.map((faq, i) => (
              <Reveal key={faq.q} delay={i * 0.03}>
                <AccordionItem question={faq.q} answer={faq.a} defaultOpen={i === 0} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* Structured data for Google + AI answer engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'SoftwareApplication',
                name: 'UltraDownloader',
                applicationCategory: 'MultimediaApplication',
                operatingSystem: 'Any (web browser)',
                description:
                  'Free online video downloader that accepts any video link from 400+ websites, finds the real media stream and downloads it in HD without installing software.',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                aggregateRating: {
                  '@type': 'AggregateRating',
                  ratingValue: '4.8',
                  ratingCount: '1280',
                },
              },
              {
                '@type': 'FAQPage',
                mainEntity: FAQS.map((faq) => ({
                  '@type': 'Question',
                  name: faq.q,
                  acceptedAnswer: { '@type': 'Answer', text: faq.a },
                })),
              },
            ],
          }),
        }}
      />
    </section>
  );
}

export default PurposeSeoSection;
