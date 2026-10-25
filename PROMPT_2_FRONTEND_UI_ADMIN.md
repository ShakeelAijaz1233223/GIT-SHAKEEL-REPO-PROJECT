# PROMPT 2 OF 2 — ULTRADOWNLOADER COMPLETE PREMIUM CINEMATIC UI DESIGN SYSTEM, ONLINE PLAYER, 4-STAGE SMART ADS, VIRAL TRAFFIC & LIVE SIDE-DRAWER ADMIN MASTER PROMPT (V7.0 LOCKSTEP EDITION)

> **ARCHITECTURAL PAIRING NOTICE:**
> This is **Part 2 (`frontend/` Art-Directed Cinematic React + Vite Application)** paired with **Part 1 (`backend/` Node.js + Express + Live SSE Engine + MySQL 8 Server running on `http://localhost:4000`)**.
> **CRITICAL RULE:** Deliver **BOTH** an executive, agency-grade **Complete Premium Website UI & Motion Design System** **AND** full live integration with every route, SSE event, cookie, header, and enum in **Section 2 (`SHARED LOCKSTEP INTEGRATION CONTRACT v7.0`)** with **100% character-for-character fidelity**!

---

## 1. YOUR ROLE & VISUAL ARCHITECTURE MISSION

Act simultaneously as:
1. Senior UI/UX Visual Design Director & Motion-Design Specialist
2. Principal React.js + Vite Frontend Systems Architect
3. Senior Web Media Player Engineer (`HTML5 Video/Audio`, `hls.js`, VAST Pre-Roll Overlay, YouTube-Style Center Theater Modal)
4. Smart Ad-Monetization UX & Viral Growth Engineer (`4-Stage Non-Intrusive Waterfall Ads` + `/v/:shortCode` Share Pages + `/tools/:slug` SEO Pages + PWA Share Target)
5. Executive Data Visualization & Real-Time Admin Notification Engineer

### Technology Stack
- **React 18+ with Vite (`http://localhost:5173`)**, clean modular **JavaScript / JSX (or `.tsx` with consistent Vite config — never mix inconsistently)**
- **Tailwind CSS** + centralized **CSS Custom Properties Design Tokens (`src/styles/tokens.css`, `globals.css`, `animations.css`)**
- **`motion/react` (`framer-motion`)** for crisp layout transitions, staggered card entrances (`300–550ms`), micro-interactions (`120–200ms`), and full `prefers-reduced-motion` support
- **React Router v6** + **TanStack Query v5** + native **`EventSource` SSE (`withCredentials: true`)**
- **`recharts`** (all Profit, SEO, & Finance charts/gauges) + **`hls.js`** + **`lucide-react`** (consistent stroke weight) + **Custom 35+ Brand SVG Icons Pack**

---

## 2. SHARED LOCKSTEP INTEGRATION CONTRACT v7.0 (MUST MATCH BACKEND 100%)

- **Frontend Port:** `http://localhost:5173` | **Vite Proxy (`vite.config.js`):** `/api` -> `http://localhost:4000` (`changeOrigin: true, secure: false` — stream/SSE unbuffered!)
- **API Base URL:** `import.meta.env.VITE_API_BASE_URL || '/api/v1'`
- **Mandatory Fetch Config:** `credentials: 'include'`, `Authorization: Bearer <accessToken>`, `X-Website-Project-Id: <selectedWebsiteId>`, `X-Admin-Padlock-Ticket: <ticket>`, `X-Admin-Token: Bearer <adminAccessToken>`.
- **Envelope:** `{ success: true, requestId, data, meta }` | `{ success: false, requestId, error: { code, message, details } }`.
- **Shared Enums:**
  - `category`: `'all' | 'social' | 'video' | 'education' | 'cloud_terabox' | 'adult_18'`
  - `contentMode`: `'clean_mainstream' | 'adult_18_only' | 'hybrid_all'`
  - `streamCategory`: `'video_with_audio' | 'video_only' | 'audio_only'`
  - `adZoneType`: `'native_banner' | 'player_preroll_vast' | 'download_click_direct_tab' | 'progress_modal_sponsor'`
- **Connected Backend Endpoints (`/api/v1`):**
  - Public Core: `GET /health`, `GET /config/bootstrap`, `GET /platforms`, `GET /platforms/:id`, **`POST /intake/paste-capture`** *(fires silently on paste — Backend RAM only, ZERO DB save!)*, `GET /search`, `POST /analysis`, `GET /analysis/:id`, `GET /stream/proxy?token=...`, `POST /downloads`, `GET /downloads`, `GET /downloads/:id`, `GET /downloads/:id/file`, `POST /downloads/:id/{pause,resume,cancel,retry}`, `/auth/*`, `/favorites`, `/history/views`, `POST /reports`, `POST /takedowns`, `POST /security/honeypot`
  - Viral Growth & Smart Ads: **`POST /share`**, **`GET /share/:shortCode`**, **`GET /seo/landing/:slug`**, **`GET /ads/waterfall`**, **`POST /events/track`**
  - Secret Admin Live SSE & CRUD (`/api/v1/admin/*`): **`GET /live-cards/stream`** (`snapshot`, `card_added`, `card_updated`, `card_removed`), `GET /live-cards`, **`GET /live-cards/:cardId/view`**, **`POST /live-cards/:cardId/save`**, **`DELETE /live-cards/:cardId/close`**, `DELETE /live-cards`, `/vault/*`, `/platforms/*`, `/cookies/*`, `/settings`, `/moderation/*`, `/audit-logs`, `/websites/*`, `/profit/*`, `/ai/*`, `/ads/*`, `/seo/*`, `/finance/*`.

---

## 3. PREMIUM DESIGN TOKENS, SELECTIVE GLASSMORPHISM & COMPLETE PUBLIC PAGE ANATOMY (`A` TO `M`)

### 3.1 Centralized CSS Design Tokens (`src/styles/tokens.css`)
Establish complete semantic CSS variables before components:
- Layered Midnight Navy & Charcoal surfaces (`--bg-canvas: #050914`, `--bg-secondary: #080F20`, `--surface-card: #0D162B`, `--surface-elevated: #121E3B`) + crisp 1-Click Light Theme override
- Accents: Royal Electric Blue (`--accent-primary: #1D6FF2`), Sky Cyan (`--accent-cyan: #38BDF8`), Subtle Indigo/Violet glow (`--accent-violet: #6366F1`), Emerald/Amber/Rose status tokens
- Selective Glassmorphism tokens (`--glass-bg: rgba(13, 22, 43, 0.72)`, `--glass-border: rgba(56, 189, 248, 0.18)`) applied strictly to Sticky Navbar, Floating Badges, Modals, and Right Notification Drawer while keeping text/content cards crisp, solid, high-contrast, and ultra-readable!
- Restrained CSS background mesh, soft radial ambient glow, subtle grid & noise texture (zero laggy 3D bloat).

### 3.2 Complete Art-Directed Page Structure (`Sections A through M` + App Workspace)
1. **A. Compact Top Announcement Strip:** Live engine status pulse dot + `"New: Instant Watch-Before-Download Player for TeraBox & 1,000+ Platforms — Install Free App (PWA)"` action link.
2. **B. Selectively Glassy Sticky Main Navbar:** `UltraDownloader` logo & wordmark, active nav links (`Home`, `Supported Sites`, `TeraBox Player`, `Downloads`, `FAQ`), Language Switcher (`EN / UR`), Theme Toggle, `Login`, `Register` CTA, & Accessible Mobile Drawer *(ZERO public link to Secret Admin!)*.
3. **C. Split Cinematic Hero + Universal Smart Input Bar:**
   - Eyebrow pill badge + Strong `clamp()` Display Headline (`Download & Watch Videos from Any Website — All in One Place`) + Supporting copy
   - **Universal Smart URL / Keyword Input Bar** with left **Dynamic Selected Platform SVG Badge**, Paste Clipboard button, **`Analyze` Primary CTA**, and **Instant Silent `onPaste` Capture Hook (`POST /api/v1/intake/paste-capture` -> pushes Live Card to Admin Side Bar in 0.1s with `0` DB save!)**
   - Right Interactive Floating Product Preview Frame + Quick Platform Pills (`YouTube`, `TeraBox`, `Instagram`, `TikTok`, `Facebook`, `Courses`, `18+ Hub`) + **1-Click `"Share Clean Watch Link (/v/:code)"` button**!
4. **D. Credibility & Capability Strip:** Clean capability badges (`Zero Mandatory Signup`, `Watch Online Before Download`, `HTTP 206 Resume Support`, `4K FFmpeg Lossless Audio+Video`, `Anti-SSRF Protected` — zero fake fabricated user counts!).
5. **E. Supported Websites Directory (`6 Category Tabs + 35+ Distinct Brand SVG Cards`) & Bento Features Grid:**
   - Category Tabs: **`All`** | **`Social Media`** | **`Video Platforms`** | **`Courses & Education`** | **`Cloud & TeraBox`** | **`18+ Adult`** *(hidden automatically on `clean_mainstream` SEO domains)*.
   - Bento Grid showcasing core strengths with subtle hover elevation & micro-interactions.
6. **F. Interactive `FilesZero / TeraPlayer` Online Player + 3-Step Download Builder + Live Queue Showcase:**
   - **Built-in Online Video Player (`Watch Before Download` via `HTML5` + `hls.js`)** + **Step 1 (`Video + Audio` | `Video Only Muted` | `Audio Only`)** + **Step 2 (`4K..360p` real source qualities)** + **Step 3 (`MP4 / WebM / MP3` + `.SRT` Subtitles)** + **`Download Now`** + **Resumable Queue (`%`, `MB/s`, ETA, Pause/Resume)** + **Dedicated `TeraBox Suite` (`FlowPlayer` · `TeraSaver` · `TeraPlayer` · `Batch Folder Pro`)**!
7. **G. 4-Step Connected `How It Works` Timeline** (`1. Paste or Search` -> `2. Auto-Detect & Preview` -> `3. Pick Quality & Sound Mode` -> `4. Instant Stream or Download`).
8. **H. Benefits & Daily Use Cases Section** (Students, Creators, Mobile Data Savers, Cloud Stream Viewers).
9. **K. Accessible Smooth Accordion `FAQ Section`** + **L. Concluding `Final CTA` Panel** + **M. Organized Multi-Column Responsive `Footer`** (`Privacy`, `Terms`, `Copyright / DMCA Form`).

---

## 4. BUILT-IN SMART 4-STAGE AD ENGINE & VIRAL TRAFFIC ROUTES

### 4.1 Smart Non-Intrusive 4-Stage Ad Waterfall (`src/components/monetization/AdWaterfallManager.jsx`)
Never fire annoying popups on raw URL paste (which destroys user trust and Google SEO rankings!). Enforce this exact **Admin-Controlled 4-Stage High-Yield Flow**:
- **Stage 1 (`Clean Entry & Paste`): `0` Popups!** Only a clean, clearly labeled Native Banner card below the fold while user pastes & views real video formats (`0% bounce rate!`).
- **Stage 2 (`Online Video Player Pre-Roll`):** Optional **5-second skippable YouTube-style In-Player Pre-Roll Video Ad (`VAST` / Sponsor clip)** before playback starts.
- **Stage 3 (`High-Intent Click Trigger with Cooldown Timer`):** Optional **Smart New-Tab Direct Link** fires **STRICTLY on real `"Download Now"` (or `"Play"`) mouse click** AND obeys `localStorage` **Cooldown Lock** (e.g., **MAX 1 new tab every `20` minutes**, configurable by Admin from `5m` to `OFF` — so Chrome never blocks it, users never get angry, and conversion is 100%!).
- **Stage 4 (`FFmpeg Merge / Progress Sponsor Card`):** Clean glass sponsor card right beneath the live progress bar while 1080p/4K stream merges!

### 4.2 Built-in Viral & Organic Traffic Engine Routes
1. **`/v/:shortCode` (`Viral Watch & Download Landing Page`):** Clean shareable player page for **Telegram / WhatsApp / Reddit / X** sharing (`POST /api/v1/share`) where 1 shared link brings thousands of viewers directly into YOUR player & ad funnel!
2. **`/tools/:slug` (`50+ Dynamic Programmatic SEO Pages`):** Renders dedicated fast SEO pages (`/tools/terabox-online-video-player`, `/tools/tiktok-downloader-no-watermark`, `/tools/instagram-reels-hd`, etc.) with dynamic `<title>`, meta tags, JSON-LD `FAQPage` + `WebApplication` schema, and tailored hero copy!
3. **URL Prefix Route (`/:rawUrl*`) + Installable PWA `manifest.webmanifest` with Android `share_target`** (so users share links directly from TikTok/IG/YouTube straight into `UltraDownloader`!).

---

## 5. SECRET PADLOCK ADMIN + RIGHT-SIDE LIVE URL NOTIFICATION BAR (`[VIEW] · [SAVE] · [CLOSE]`)

- **5-Layer Stealth Access:** Fake `404` + `/security/honeypot` on `/admin`; secret path `VITE_ADMIN_SECRET_ROUTE` (`/vault-control-x9p4`) + `Ctrl + Shift + Alt + U` -> **Gate 1: Padlock PIN** -> **Gate 2: Password + 2FA** (`3 wrong tries = 30m ban`).
- **GLOBAL RIGHT-SIDE LIVE NOTIFICATION DRAWER (`SSE Real-Time Push`):**
  - Top-right **`🔔 Live URLs [Count]`** opens the sleek glass **Right-Side Notification Sidebar** across ANY Admin workspace!
  - Every user paste instantly pushes a **separate Full Video Card** (`Thumbnail` + `18+ Blur Eye Switch` + `Platform SVG Badge` + `Title` + `URL` + `Size MB/GB`) with **3 Buttons**:
    1. **`[ ▶ VIEW ]`:** Opens **Center YouTube-Style Theater Video Player Modal** streaming live (`0` DB / `0` Disk!) with **`[ 💾 SAVE ]`** & **`[ ✖ CLOSE ]`** right below!
    2. **`[ 💾 SAVE ]`:** Saves permanent DB record + stores file into Server Storage Vault!
    3. **`[ ✖ CLOSE ]`:** Wipes card immediately from RAM (**NO Save + NO Record + `0 KB`**)!
- **Multi-Website Switcher + All 5 Executive Workspaces:** `Dashboard Profit` (`Strategy Simulator` + `AI Recommendations`), `AI SEO & Growth Manager`, `Smart Financial Ledger`, `Saved Video Storage Vault` *(with anytime `Delete from Storage`)*, & **`4-Stage Ad Waterfall Sliders` / `Platforms & Custom SVG Creator` / `Cookies` / `Quotas` / `Audit Logs`**!

---

## 6. SEQUENTIAL IMPLEMENTATION STAGES (START IMMEDIATELY AT STAGE 1!)

Implement step by step with Windows PowerShell commands, `tokens.css` design tokens, complete working code, responsive checks (`320px -> 1920px`), and passing tests across **Stage 1 -> Stage 5** until `npm test` and `npm run build` succeed cleanly.
