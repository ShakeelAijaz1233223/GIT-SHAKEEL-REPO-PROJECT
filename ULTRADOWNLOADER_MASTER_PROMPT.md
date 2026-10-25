# MASTER PROJECT PROMPT — ULTRADOWNLOADER & EXECUTIVE AI PROFIT / MULTI-SITE COMMAND PLATFORM (V5.0 FINAL LOCKED EDITION)

---

## SECTION 1. YOUR ROLE & ENGINEERING MISSION

Act simultaneously as:
1. Principal Full-Stack Software Architect
2. Senior React.js + Vite Frontend & Design Systems Engineer
3. Senior Node.js + Express.js Backend & Streaming Systems Engineer
4. Senior MySQL 8 Database & Media Storage Vault Architect
5. Senior Media Processing, HLS/DASH & Stream Extraction Engineer (`yt-dlp`, `FFmpeg`, `hls.js`, TeraBox/Cloud & Web Stream Adapters)
6. Application Security, Stealth Admin Access & Anti-SSRF Specialist
7. AI Monetization, Technical SEO & Financial Analytics Systems Designer
8. DevOps, Automated QA & Production Reliability Engineer

Guide me step by step to design, architect, build, test, secure, and deploy **UltraDownloader** — a production-grade unified web platform combining:
- **Universal Content Discovery, Hybrid Search & Smart URL Analysis** (with Dedicated Per-Platform Icons across 6 Categories)
- **Instant "URL Paste Without Download" Silent Capture Algorithm** (with its own dedicated MySQL table & separate Admin tab)
- **FilesZero / TeraPlayer Watch-Before-Download Online Video Player**
- **Secure Chunked & `HTTP 206 Range` Resumable Multi-Format Download Engine + Persistent Server Media Vault**
- **5-Layer Secret "Padlock" Super-Admin Control Center** (with complete visibility and full CRUD over every analyzed link, pasted link, user download, server file, and platform setting)
- **`Dashboard Profit` — Unified Executive Multi-Website Command Suite** featuring:
  1. **AI Revenue, Funnel Conversion & Strategy Simulator Dashboard**
  2. **AI SEO & Organic Growth Manager**
  3. **Smart Financial Ledger, Ad Payouts, Server Cost & Profit Hub**
  4. **Multi-Website (`Multi-Tenant Project`) Access Switcher** alongside a strictly separated **Video & Vault Management Tab**

Explain every important architectural decision, command, file, folder, API endpoint, MySQL table, security guard, and test. **Never skip prerequisites, never delete previously requested capabilities, and never present placeholder mockups or fabricated numbers as working features.**

### Required Development Environment & Core Technology Stack
- **Primary Development OS:** **Windows 10 / Windows 11 (PowerShell)** *(plus Linux / Docker production deployment configurations)*
- **Frontend:** **React.js + JavaScript (ES Modules) initially with Vite**, **Tailwind CSS**, **React Router**, **TanStack Query**, **Recharts / Chart.js** (for real interactive analytics charts), **`hls.js`** (for adaptive `.m3u8` streaming playback), and **Lucide Icons + Custom Platform Brand SVG Pack**. *(Do not switch away from the required stack without explaining the technical reason and asking first.)*
- **Backend:** **Node.js (LTS) + Express.js** modular REST API under `/api/v1` + safe child-process media pipeline (`yt-dlp`, `FFmpeg`, `deno`, `cheerio`).
- **Database:** **MySQL 8.x** (`mysql2/promise` connection pool, deterministic SQL migrations, seeders, indexes, transactions, and zero raw video BLOBs inside MySQL — media files live in `/storage/media-vault` with `SHA-256` deduplication).
- **Authentication:** Secure JWT Access Token + Rotating `HttpOnly` Refresh Token / Session architecture + **5-Layer Secret Padlock Protection** for Super-Admin.
- **AI Integration:** **Provider-Independent AI Service Layer** (`OpenAI / Groq / Gemini / Anthropic / Local Ollama` adapter interface selectable via `.env`) so AI providers can be swapped anytime without rewriting business logic.
- **Deployment Coverage:** Complete step-by-step setup for Local Windows PowerShell, Frontend Hosting, Backend Hosting, MySQL Hosting, Multi-Domain & DNS setup, HTTPS/SSL, `.env` management, structured logging, automated backups, and uptime monitoring.

---

## SECTION 2. EXECUTION PRIORITIES (1 TO 7) & 5 BUSINESS EXPANSION PHASES

### 7 Core Implementation Priorities (Strict Priority Order)
1. **Priority 1 — Responsive UI, Per-Platform Icon Hub & Smart URL Analyzer (+ Auto Paste-Capture Algorithm):** Midnight-Navy & Electric-Blue responsive shell, hybrid URL/keyword bar, instant platform detection, and real-time logging of pasted URLs even when the user does not start a download.
2. **Priority 2 — TeraBox & Cloud Stream Suite Integration:** First-class support for `TeraBox`, `Terashare`, and all Tera mirror domains (`1024tera`, `mirrobox`, `nephobox`, `momerybox`, `freeterabox`) including movies, series, shared folders, and adult files hosted on TeraBox (`FlowPlayer` + `TeraSaver` + `TeraPlayer` + `TeraBox Batch Pro`).
3. **Priority 3 — Built-in Online Video Player (`Watch Before Download`):** Integrated browser media player (`HTML5` + `hls.js` + authorized stream proxy/embed) allowing instant preview before downloading.
4. **Priority 4 — Secure Chunked & Resumable Download Engine + Server Storage Vault:** 3-Category stream selector (`Video + Audio`, `Video Only [Muted]`, `Audio Only`), real source qualities (`4K` down to `360p`), `FFmpeg` lossless merging, `HTTP 206 Range` resume, `SHA-256` vault deduplication, and configurable Guest Daily Limits.
5. **Priority 5 — Secret Padlock Admin Control Center & Complete Telemetry Storage:** Everything saved in MySQL and visible to Admin across separated tabs: **`Video Vault & Downloads`**, **`Pasted URLs (Not Downloaded)`**, **`Users & Guest Quotas`**, **`Platform Icons & Category Toggles`**, and **`Audit Logs`**.
6. **Priority 6 — Legitimate Ads Management, `Dashboard Profit`, AI SEO Manager & Financial Ledger:** Ad slot manager, real-time first-party + authorized third-party revenue/traffic metrics, Strategy Simulator, AI SEO & SERP analyzer, and Income vs Expense profit ledger.
7. **Priority 7 — Full Global Provider Expansion (`Social`, `Video`, `Courses`, `18+ Adult`), Multi-Website Hub & Horizontal Scaling:** Expand across all mainstream social, video, course (`Coursera`/`Udemy` previews & non-DRM authorized lectures), open `WWW` sites, `18+` adult platforms, and multi-site tenant management.

### 5 Strategic Product Rollout Phases
- **Phase 1 (Immediate Core + `Dashboard Profit` Foundation):** Priority 1–5 core platform + `Dashboard Profit` revenue analytics, real-time traffic dashboard, conversion tracking, and evidence-based AI recommendations.
- **Phase 2 (Post-Core Stability):** Dynamic Ad Placement Manager, full **AI SEO & Growth Manager** module, and **Multi-Website (`website_projects` tenant)** switching support.
- **Phase 3 (Production Traffic Stage):** Advanced technical operations, queue scaling (`Redis + BullMQ`), 5-layer security stress hardening, copyright/takedown moderation workflows, and support automation.
- **Phase 4 (Business Scale Stage):** Complete **Financial Ledger & Profit Hub** (receivables, server/CDN payables, tax reserves, runway), VIP user subscriptions/billing, and granular **Team RBAC Permissions**.
- **Phase 5 (Enterprise Automation Stage):** Automated scheduled workflows, **AI Autopilot** experiments (strictly requiring Administrator approval before live changes), and Executive Multi-Brand Overview Dashboard.

---

## SECTION 3. TWO PRIMARY ROLES, AUTOMATIC PASTE-CAPTURE ALGORITHM & SEPARATED ADMIN TABS

### 3.1 Role 1 — Public Guest & Registered User Portal
- Immediate guest access with configurable daily usage limits (`guest_daily_download_limit`, `guest_max_file_size_mb`), plus full User Registration & Login (`Email/Password` + optional `Google OAuth`) unlocking higher quotas, synced **Favorites/Bookmarks**, **Viewing History**, **Download History**, and user settings.
- Strict backend isolation: Users/guests can **never** access another user's jobs, vault files, analytics, or admin endpoints.

### 3.2 Critical Custom Algorithm — Real-Time RAM-Only Live URL Notification Engine (`Zero Auto DB Save!`)
When ANY user pastes or submits a video URL on the website, **NEVER save it directly into MySQL or server storage automatically!** Instead implement this exact real-time push architecture:
1. **Trigger & RAM-Only Resolution:** The millisecond a user pastes (`onPaste`) a valid URL, backend resolves title, thumbnail, platform icon, category, quality, size, and stateless stream token **strictly inside Node.js RAM (`LiveCardBuffer` — `0` MySQL rows, `0` disk bytes)** and pushes a **separate full Live Video Card via SSE (`EventSource`)** straight into the **Admin Right-Side Notification Drawer**!
2. **Admin Side-Bar Live Notification Cards (`[ ▶ VIEW ]` · `[ 💾 SAVE ]` · `[ ✖ CLOSE ]`):**
   - **`[ ▶ VIEW ]`:** Opens a **Center YouTube-Style Theater Video Player Modal** streaming the video live (`0` DB / `0` Disk!) with **`[SAVE]`** and **`[CLOSE]`** buttons directly below the player so Admin can watch first and then save or discard!
   - **`[ 💾 SAVE ]`:** **ONLY when Admin clicks `SAVE`** does the backend write the permanent record into MySQL (`media_vault_files`) + archive the file into `/storage/media-vault` (with anytime delete freedom later)!
   - **`[ ✖ CLOSE ]`:** Immediately removes the card from backend RAM — leaving **ZERO database record AND ZERO server disk usage**!

### 3.3 Profit-Protection Architecture #1 — Zero-Loss Stream-First Engine & Admin 3-Button (`SAVE` | `VIEW` | `CLOSE`) Approval Gate
To guarantee **$0 wasted server bandwidth/storage bills** even when users process massive multi-GB movies (e.g., 1.5 GB TeraBox films or 4K videos), **NEVER blindly dump every multi-GB video file onto server hard disk automatically!** Implement this exact two-stage flow:

1. **Public User Fast Stream / Direct Delivery (`0 GB` Unapproved Server Disk Burn):**
   - Users get instant direct/chunked stream playback & downloads without filling server storage automatically.
   - Lightweight preview item cards (**Thumbnail + Video Title + Source URL + Resolved Stream Path + Platform Icon + Category + Exact Size in MB/GB + Paste/Download Badge**) queue cleanly **one by one** inside the **Admin Review Inbox (`Incoming Video Stream Gate`)**.
2. **Admin Card-by-Card Visual Review With Exact `3 Action Buttons` (`[VIEW]` · `[SAVE]` · `[CLOSE]`):**
   Every incoming item card displays its **Video Thumbnail, Title, Platform Icon, Duration, Resolution, and File Size (`MB / GB`)** alongside **three primary buttons**:
   - **`[VIEW]` Button (*YouTube-Style Center Theater Modal Player*):**
     - Clicking **`VIEW`** opens a sleek **centered YouTube-style Theater Video Player Overlay** right in the middle of the Admin screen — streaming the video live with play/pause, timeline scrubbing, volume, quality indicator, speed selector (`1x–2x`), and full title/URL details — **WITHOUT saving any GBs to server disk yet!** (Includes quick **`SAVE`** and **`CLOSE`** buttons right underneath the center player so Admin can decide immediately while watching.)
   - **`[SAVE]` Button (*Approve -> Persist Permanent DB Record + Store File in Server Storage Vault*):**
     - Clicking **`SAVE`** approves the video: creates/locks the permanent record in MySQL (`media_vault_files`) **AND** downloads/stores the media file into the **Server Data Storage Vault (`/storage/media-vault`)** (deduplicated via `SHA-256`).
     - **Full Owner Delete Control Anytime:** Every saved item inside **Saved Vault Storage** remains 100% under Admin control — whenever Admin wants to free up server GBs later, Admin can click **`Delete from Storage`** (*Delete Physical GB File Only* OR *Delete Both File & DB Record*) at any time!
   - **`[CLOSE]` Button (*Reject & Wipe — NO Save, NO Database Record, ZERO Disk Used*):**
     - Clicking **`CLOSE`** immediately dismisses and permanently deletes the pending intake row (`DELETE FROM incoming_review_queue WHERE id = ?`) — leaving **ZERO file on server storage AND ZERO saved record in the database (`0 KB` disk + `0` clutter)**!
   - *(Also provide a global Storage Mode selector in Admin Settings: **`Ask Me via 3-Button Gate (Default — Zero Loss)`** | **`Save Metadata Only (0 Disk GB)`** | **`Auto-Save Under Max Quota Cap GB`**).*

### 3.4 Profit-Protection Architecture #2 — Multi-Domain SEO Shield (`Clean Mainstream Domain` vs `18+ Portal Domain` on ONE Backend & ONE Admin)
To protect Google Search Console / SafeSearch SEO rankings while simultaneously running high-traffic `18+` portals from **one single server, one MySQL database, and one Secret Admin Panel**:
- Add `content_mode ENUM('clean_mainstream', 'adult_18_only', 'hybrid_all')` on `website_projects` matched automatically by incoming `Host` header!
- **On a Clean SEO Domain** (e.g., `ultradownloader.com`): Public UI automatically renders **100% clean mainstream categories only** (`Social`, `Video`, `Courses`, `TeraBox/Cloud`), generating spotless SEO meta tags and sitemaps with zero `18+` exposure to Google crawlers!
- **On a Dedicated `18+` Domain** (e.g., `x-vault.xyz` pointed to the exact same backend): Public UI automatically boots into the dedicated `18+` Video & TeraBox Player/Downloader experience with `RTA` meta headers & Adult Ad Network zones!
- **Inside Secret Super-Admin Panel:** Admin sees and controls **ALL domains, ALL categories, ALL 3-Button Review Cards, and ALL profits together** from one unified command center!

### 3.5 Dedicated Category Tabs & Unique Icons per Platform (Unified Logic + Single MySQL Database)
Every individual source platform has **its own unique icon, accent color, domain matcher, search/analysis binding, and category badge**, organized cleanly across **6 Category Filter Tabs** on BOTH the Public Portal AND the Admin Panel — while running on **one unified extraction engine and one single MySQL database**:
1. **`All Platforms`** — Universal auto-detect mode
2. **`Social Media`** — Unique icons for `Facebook` (Reels/Watch/Stories), `Instagram` (Reels/Posts/Carousels/Stories), `TikTok` (HD No-Watermark), `X (Twitter)`, `Threads`, `Reddit`, `Pinterest`, `LinkedIn`, `Telegram`, `Snapchat`, `SnackVideo/Kwai`, `VK`
3. **`Video Platforms`** — Unique icons for `YouTube`, `YouTube Shorts`, `Vimeo`, `Dailymotion`, `Twitch`, `Kick`, `Rumble`, `Odysee`, `BitChute`, `PeerTube`, `Bilibili`, `Internet Archive`, `SoundCloud`
4. **`Courses & Education`** — Unique icons for `Udemy`, `Coursera`, `edX`, `Khan Academy`, `MIT OpenCourseWare`, `TED Talks`, `Loom`, `Wistia`, `Kaltura/Panopto` *(supporting public previews + user-owned non-DRM enrolled lectures via ephemeral RAM-only `cookies.txt` + `.SRT` subtitles)*
5. **`Cloud Storage & TeraBox Suite`** — Unique icons for `TeraBox`, `Terashare`, `1024Tera`, `Mirrobox`, `NephoBox`, `Freeterabox`, `Google Drive`, `Dropbox`, `MediaFire`, `Direct MP4/WebM/HLS`
6. **`18+ Adult Platforms`** — Dedicated category tab gated by a clean **18+ Age Confirmation Gate** (public side) and **1-Click Safe Thumbnail Blur Eye Toggle** (admin side), with **distinct custom badge icons for each adult platform** (`Pornhub`, `XVideos`, `XNXX`, `xHamster`, `SpankBang`, `RedTube`, `YouPorn`, `EPorner`, `TnaFlix`, `Tube8`, `RedGifs`, plus `18+ TeraBox Links`), plus an Admin UI creator to **add new custom platforms + icons anytime without touching code!**

---

## SECTION 4. SECRET PADLOCK SUPER-ADMIN SUITE & `DASHBOARD PROFIT` MULTI-SITE HUB

### 4.1 5-Layer Stealth "Padlock" Admin Security
1. **Stealth Route + Honeypot Trap:** Zero public links to Admin anywhere in UI. Visiting `/admin`, `/wp-admin`, `/dashboard`, or `/panel` returns `404` and logs the intruder's IP in `audit_logs`. Real panel mounts at `ADMIN_SECRET_ROUTE` (or secret chord `Ctrl + Shift + Alt + U`).
2. **Gate 1 — Master Padlock PIN Gate** (`ADMIN_PADLOCK_PIN`, timing-safe check).
3. **Gate 2 — Argon2/Bcrypt Admin Login + Optional/Configurable TOTP 2FA (`6-Digit Authenticator`)**.
4. **Gate 3 — Brute-Force Auto-Ban:** **3 wrong attempts = automatic 30-minute IP ban** + permanent audit entry.
5. **Gate 4 — Strict Backend Middleware Enforcement** + confirmation modals on destructive actions.

### 4.2 Unified Multi-Website Switcher + Strictly Separated Admin Major Workspaces
At the top-left of the Admin Sidebar, include a **Multi-Website Selector Dropdown (`All Websites / UltraDownloader Main / Site #2 / Add New Website +`)** so one Admin login controls multiple websites, divided cleanly into **5 Dedicated Major Admin Workspaces**:

#### Workspace A — `Dashboard Profit` (Executive AI Revenue, Conversion & Strategy Hub)
Modeled with crisp dark charcoal surface cards, warm orange/amber & emerald trend visuals, time-window pills (`24H` | `7D` | `30D` | `90D`), `Export CSV/JSON`, and `Share Snapshot`:
- **5 Executive KPI Cards (with Previous Period comparison & `%` trend arrows):**
  1. **Total Revenue** *(Finalized vs Estimated clearly separated, never fabricated from raw hits without explicit formula disclosure)*
  2. **Active Users & Sessions**
  3. **Funnel Conversion Rate (`%`)** *(Paste -> Play -> Download & Ad/VIP Conversion)*
  4. **Average RPM / eCPM / ARPU (`$`)**
  5. **AI Data Confidence Score (`%`)** *(based on connected live telemetry completeness)*
- **Dual-Series Smooth Area Graph:** `Revenue ($) vs Conversion Rate (%) Trends` across selected period.
- **Traffic Sources Donut Ring:** `Organic %`, `Paid %`, `Direct %`, `Referral / Social %` + total session counter.
- **Interactive `Strategy Simulator` Live Sliders Widget:**
  - Real-time sliders (`VIP / Ad Floor Pricing Change %`, `Monthly Marketing / Ad Budget $`, `Projected Traffic Change %`) calculating live simulated revenue delta with transparent assumptions.
- **`AI Recommendations` Action Cards Grid:**
  - Powered by the provider-independent AI Analyst service generating structured cards with: **Title**, **Confidence % Badge**, **Projected Revenue/Cost/Conversion Impact**, **Observation + Supporting Metrics + Risks**, and Admin-gated buttons (**`Approve & Apply`**, **`Inspect Metrics`**, **`Dismiss`**).

#### Workspace B — `AI SEO & Growth Manager` (Neon Cyber-Blue Search Intelligence Suite)
- **Multi-Website Domain / Keyword SERP Bar:** Inspect any managed website project + SERP Preview Card (`#1` target snippet preview, title pixel width, meta description check).
- **`Keyword Rankings` Table:** Tracked target keywords, current rank position, movement arrows, & target URL.
- **`SEO Health Score` Circular Gauge (`0–100`):** Live real audit checking `<title>`, `<meta description>`, OpenGraph tags, canonical URLs, JSON-LD schema, `sitemap.xml`, `robots.txt`, and API response speed!
- **`Organic Traffic` Trend Sparkline**, **`Traffic Sources` Ring Chart**, **`Backlinks` Growth Bar Chart**, **`SEO Performance` Area Chart** (`Total Clicks`, `Total Impressions`, `Average CTR %`, `Average Position`), and **`AI Technical SEO Insights` Checklist**!

#### Workspace C — `Smart Financial Ledger & Profit Hub` (Multi-Site Accounting & Runway View)
- Sub-tabs: `Overview` · `Profitability` · `Liquidity` · `Server & Bandwidth Efficiency` · `Taxation` · `Growth` · `Risk & Compliance` · `SmartInsights`
- **8 Financial Cards + `Business Health Score (0–100)` Gauge:**
  - `Total Cash / Bank Balance`, `Pending Ad & Affiliate Receivables`, `Server / Storage / API Payables`, `Net Profit Margin %`, `MoM Revenue Growth %`, `Tax / GST Reserve`, `YTD Tax Liability`, `Cash Runway (Months at current burn rate)`.
- **Visual Charts & Tables:**
  - `Income vs Expenses` 12-Month Grouped Bar Chart (Ad/Affiliate/VIP Income vs Hosting, Storage GB, Proxy & Domain Costs)
  - `Top Expenses` Donut Chart (`Servers & Bandwidth`, `Storage Vault`, `Marketing`, `APIs/Software`, `Operations`)
  - `All Receivables` & `All Payables` Current vs Overdue Progress Trackers (`0–15 Days`, `16–30 Days`, `30+ Days`)
  - `Cash Flow` Incoming vs Outgoing Line Graph + **`Multi-Website Projects Profitability Table`** (`Website Name`, `Monetization Type`, `Status ACTIVE`, `Net Profit`) + **`Payout Accounts & Balances` Ledger** (`Payoneer`, `Stripe`, `Bank`, `USDT Vault`, etc. — admin-entered/imported real ledger entries!).

#### Workspace D — `Video Review Gate (3-Button Queue) & Saved Server Vault` (Dedicated Separate Video Tab!)
- **Top 6 Category Icon Tabs** (`All` | `Social` | `Video` | `Courses` | `TeraBox/Cloud` | `18+ Adult`) + **1-Click `Thumbnail Blur ON/OFF` Eye Switch** + **Live Server Storage Meter (`Used GB / Max Cap GB`)**!
- **Sub-View 1 — `Incoming Review Cards (SAVE | VIEW | CLOSE)`:**
  - Every incoming video/big-data GB stream appears **one by one** with its **Real Thumbnail, Video Title, Platform Icon, Duration, Resolution, and File Size (`MB / GB`)** + **3 Action Buttons**:
    1. **`[VIEW]`** -> Opens a **YouTube-style Center Theater Video Player Modal** right in the center of the screen so Admin can watch/check the video smoothly without saving heavy GBs yet!
    2. **`[SAVE]`** -> Saves permanent metadata record into MySQL (`media_vault_files`) **AND** stores the video file into **Server Data Storage (`/storage/media-vault`)**!
    3. **`[CLOSE]`** -> Immediately discards item — **NO server storage save AND NO database record kept (`0 KB` disk + `0` record)**!
- **Sub-View 2 — `Saved Storage Vault (Full Owner CRUD & Anytime Delete)`:**
  - Lists all items approved via `[SAVE]` -> Admin can **Play in Center Theater Player**, **Download straight from Server Storage at full speed**, **Edit Title/Tags/Category/Notes**, **Toggle `Padlock Pin`**, OR **Delete from Server Storage (`Delete File Only` or `Permanent Delete File + Record`) anytime at Admin's own choice!**

#### Workspace E — `URL Pasted (Not Downloaded)` & `Operations / Moderation / Ads Controls`
- **Separate `URL Pasted — Not Downloaded` Tab:** Real-time feed from `pasted_url_leads` (`is_downloaded = 0`) showing every pasted URL, its resolved video stream path, detected source platform icon, preview player, and 1-click "Pull to Server Vault".
- **Ad Slot & Monetization Configurator:** Enable/disable clean banner/native/affiliate slots per website with admin approval lock (zero fake clicks or deceptive buttons).
- **Platform Health, Cookie/Proxy Vault (`AES-256-GCM`), Moderation / DMCA Takedown Queue, Guest Quota Controls & Security Audit Logs.**

---

## SECTION 5. CONTENT DISCOVERY, INDEXING, STREAMING PLAYER & DOWNLOAD ENGINE RULES

1. **Modular Source Registry & Controlled Discovery Pipeline:**
   - Every source adapter declares `platform_id`, `display_name`, `category`, `icon_key`, `supported_domains`, `url_patterns`, `discovery_method`, `supports_search`, `supports_embed`, `supports_stream_preview`, `supports_download`, `rate_limit_rpm`, `known_limitations`, `last_tested_at`, and `health_status`.
   - Scheduled controlled refresh worker updates stale cached metadata with exponential backoff, canonical URL deduplication, concurrency caps, and graceful shutdown — never acting as an uncontrolled whole-internet spider.
2. **Player + Downloader Combined Experience:**
   - Content Detail & Analyzer view renders real title, description, thumbnail, platform icon attribution, duration, file size, copy-link, bookmark/favorite button, report/removal button, and **Built-in Online Player** (playing direct/HLS streams via `hls.js` or authorized embeds inside the site, with clean fallback link to original source when embedding/streaming is blocked).
   - 3-Step Format Builder presents real **Video + Audio**, **Video Only (Muted)**, and **Audio Only (`MP3/M4A`)** tracks across authentic available resolutions (`4K`, `2K`, `1080p`, `720p`, `480p`, `360p`).
3. **Security, Privacy & Strict Legal Guardrails:**
   - Full **Anti-SSRF & DNS Rebinding Guard** before fetch and on every HTTP redirect (blocking loopback `127.0.0.0/8`, private `10/8`, `172.16/12`, `192.168/16`, cloud metadata `169.254.169.254`, IPv6 `::1`/`fc00::/7`).
   - **Zero Shell Injection:** Use `execFile` / `spawn` with `shell: false` and `--` argument terminators only.
   - **Strict Prohibited Content & DRM Boundaries:** Permanently block and report CSAM, non-consensual intimate imagery, and illegal material; provide copyright/DMCA takedown & report workflows; never bypass hardware Widevine/FairPlay DRM or unowned paid logins; never harvest user third-party passwords.

---

## SECTION 6. COMPLETE RELATIONAL MYSQL 8 DATABASE SCHEMA (25 MIGRATION-MANAGED TABLES)

Design clean normalized MySQL 8 migrations (`utf8mb4_unicode_ci`) with foreign keys, composite indexes, unique constraints, and seeders covering **both Core Media Engine & Multi-Site Executive Profit Suite**:

### Core Identity, RBAC & Multi-Site Tenancy
1. `users` (`id`, `email`, `username`, `password_hash`, `totp_secret_enc`, `is_active`, `created_at`, `updated_at`)
2. `roles` & 3. `permissions` & 4. `user_roles` (`guest`, `user`, `moderator`, `finance_manager`, `seo_manager`, `super_admin`)
5. `sessions` (`refresh_token_hash`, `user_id`, `ip_hash`, `user_agent`, `expires_at`, `revoked_at`)
6. `website_projects` *(Multi-Site Hub Table: `id`, `name`, `domain`, `niche`, `status`, `default_ad_profile`, `seo_target_country`, `created_at`)*

### Universal Discovery, Paste-Capture, Player & Server Storage Vault
7. `platforms` & 8. `platform_adapters` *(6 categories, custom SVG icon data, URL regexes, capabilities, health, test status)*
9. **`pasted_url_leads`** *(DEDICATED SEPARATE TABLE for URLs pasted without downloading: `id`, `website_project_id`, `user_id`, `guest_session_id`, `raw_url`, `canonical_url`, `source_domain`, `platform_id`, `category`, `resolved_video_path`, `video_title`, `thumbnail_url`, `duration_seconds`, `link_status`, `is_downloaded BOOLEAN DEFAULT 0`, `download_job_id NULL`, `drop_off_stage`, `admin_notes`, `pasted_at`, `converted_at`)*
10. **`incoming_review_queue`** *(Ephemeral 3-Button Admin Review Queue before heavy GB storage: `id`, `website_project_id`, `source_url`, `resolved_stream_url`, `platform_id`, `category`, `title`, `thumbnail_url`, `duration_seconds`, `resolution_label`, `estimated_size_bytes`, `is_adult`, `created_at` — clicking **`[VIEW]`** streams in Center YouTube Theater Modal; clicking **`[SAVE]`** moves record into `media_vault_files` + saves file on disk; clicking **`[CLOSE]`** immediately deletes row leaving **0 DB record & 0 Disk bytes**!)* & **`media_vault_files`** *(Approved Server Storage Vault: `id`, `storage_rel_path`, `file_size_bytes`, `checksum_sha256`, `is_pinned`, `is_adult`, `download_count` — deletable anytime at Admin's choice!)*
11. `content_items` & 12. `content_metadata` & 13. `source_links` *(indexed discovery items, canonical URLs, scheduled refresh timestamps)*
14. `analysis_jobs`
15. `download_jobs` *(status, measurable `%`, `bytes_downloaded`, `total_bytes`, `speed_bps`, `range_resume_supported`)*
16. `indexing_jobs` & 17. `indexing_job_logs`
18. `bookmarks` *(Favorites)* & 19. `viewing_history` & 20. `guest_quotas`

### Moderation, Compliance, Security & Operations
21. `content_reports` & 22. `takedown_requests`
23. `admin_credentials_vault` (`AES-256-GCM` encrypted optional platform cookies/proxies) & `app_settings`
24. `audit_logs` & `notification_events` *(including 3-wrong-attempt 30-min IP bans & honeypot triggers)*

### `Dashboard Profit`, AI SEO Manager & Smart Financial Ledger Tables
25. `analytics_daily` *(per `website_project_id`: pageviews, unique sessions, paste count, play count, completed downloads, organic/direct/social/referral splits, bounce/conversion rates)*
26. `seo_keywords_tracking` & `seo_site_audits` *(per `website_project_id`: keyword positions, clicks, impressions, CTR, backlinks count, technical SEO score `0–100`, checklist issues)*
27. `advertising_daily_metrics` & `experiments` *(impressions, fill rate, clicks, CTR, RPM/CPM/eCPM, finalized vs estimated flags, A/B placement tests)*
28. `financial_accounts` & `financial_ledger_entries` *(bank/payout accounts, incoming ad/VIP revenue, outgoing server/storage/proxy/tax expenses, receivables & payables due dates, status `paid|pending|overdue`)*
29. `ai_recommendations` *(observation, supporting metrics JSON, confidence score %, projected impact, action payload, `approval_status ENUM('pending','approved','rejected','applied')`, `approved_by`)*

---

## SECTION 7. REQUIRED STEP-BY-STEP DEVELOPMENT WORKFLOW & 13 BUILD PHASES

Teach and build sequentially across clear, verifiable stages. **For EVERY stage, provide all 15 engineering deliverables:**
1. Stage Goal
2. Prerequisites
3. Exact **Windows PowerShell** commands
4. Exact Folder & File Structure changes
5. Complete Working Code (zero `// TODO` stubs)
6. Clear Explanation of Key Architecture & Logic
7. Required `.env` Variables
8. MySQL Migration / Seed Instructions
9. Exact Application Startup Commands
10. Step-by-Step Manual Verification Guide
11. Automated Unit / API / Security Tests (`npm test`)
12. Common Errors & Debugging Fixes
13. Security & Privacy Review Notes
14. Stage Completion Checklist
15. Explicit **Pass / Fail Gate** before advancing

### Sequential Build Phases
- **Phase 1:** Full System Architecture, Feasibility, 6-Category Platform Capability Matrix, MySQL Schema Proposal & Threat Model *(First Response `A–J` Blueprint)*.
- **Phase 2:** Windows Dev Environment, Monorepo (`frontend/` Vite React JS + `backend/` Express + MySQL 8), `.env`, & Binary Verification (`yt-dlp`, `ffmpeg`, `deno`).
- **Phase 3:** Full MySQL 8 Migrations (`29` tables including separate `pasted_url_leads`, `media_vault_files`, `website_projects`, SEO & Ledger tables), Seeders, & `/api/v1/health`.
- **Phase 4:** User JWT/Refresh Auth, Guest Daily Quota Guard, **5-Layer Secret Padlock Super-Admin Auth (`3 Wrong Attempts = 30-Min IP Ban`)**, RBAC, & Audit Logging.
- **Phase 5:** Anti-SSRF Guard, **Silent Paste-Without-Download Capture Algorithm (`pasted_url_leads`)**, 6-Category Per-Platform Icon Registry, & **TeraBox + Direct/Universal Analyzer**.
- **Phase 6:** Midnight-Navy & Electric-Blue `UltraDownloader` UI, Hybrid Smart Input, Search Cards, Content Detail View, & **FilesZero / TeraPlayer Online Video Player**.
- **Phase 7:** 3-Category Stream Selector (`Video+Audio` / `Video Only` / `Audio Only`), Chunked `HTTP 206 Range` Resumable Download Engine, `SHA-256` Server Storage Vault, & Admin Vault CRUD + Separate `Pasted Not Downloaded` Tab.
- **Phase 8:** Moderation Queue, Copyright/DMCA Takedown Workflow, Controlled Refresh Indexer, & Dynamic Admin Custom Platform/Icon Creator.
- **Phase 9:** First-Party Telemetry Collector, **Multi-Website Switcher (`website_projects`)**, & **`AI SEO & Growth Manager` Suite**.
- **Phase 10:** **`Dashboard Profit` Executive Suite**, Interactive **Strategy Simulator**, **Smart Financial Ledger & Runway Hub**, Ad Slot Controls, & Provider-Independent **AI Monetization Analyst** (with Admin Approval Gate).
- **Phase 11:** Comprehensive Security, SSRF, `206 Range`, Isolation, Revenue Math, & Backup/Restore Automated Test Suites.
- **Phase 12:** Production Deployment (`Docker Compose` + Cloud Hosting + Domains + SSL/HTTPS + Backups + Uptime Monitoring).
- **Phase 13:** Full Expansion Adapters (`Social`, `Video`, `Courses`, `18+ Adult`), VIP Subscriptions, Team Permissions & AI Autopilot Workflows.

---

## SECTION 8. FIRST RESPONSE REQUIRED (`A` THROUGH `J` MASTER BLUEPRINT)

Do **NOT** dump an untested monolith in a single message. In your **First Response (Phase 1)**, deliver with complete technical precision:

- **A.** Clear end-to-end explanation of the complete **UltraDownloader + `Dashboard Profit` Multi-Site Platform** (including the Silent Paste-Not-Downloaded Algorithm, Server Vault Deduplication, and 5-Layer Padlock Admin).
- **B.** Complete ASCII / Mermaid System Architecture & Dataflow Diagram.
- **C.** Complete Feature Inventory mapped cleanly across **Priorities 1–7** and **Phases 1–5**.
- **D.** Realistic **Platform Capability Matrix** across all **6 Categories (`Social`, `Video`, `Courses`, `Cloud/TeraBox`, `18+ Adult`, `Open WWW`)** with columns: *Platform & Icon Key | Discovery/Extraction Method | Metadata | Online Player | Download (`Video+Audio` / `Video Only` / `Audio`) | Resume Support | Honest Limitations*.
- **E.** Candid Engineering Feasibility Assessment (what works 100% out of the box vs cookie-assisted sources vs hardware DRM limits).
- **F.** Complete **MySQL 8 Relational Schema Proposal** (clearly highlighting the separate **`pasted_url_leads`** table, **`media_vault_files`**, **`website_projects`**, and **`Dashboard Profit` / SEO / Financial Ledger** tables).
- **G.** Exact Recommended Monorepo Project Folder Structure (`frontend/` + `backend/` + `storage/` + `docker/`).
- **H.** Prioritized Stage-by-Stage Development Plan with verifiable Acceptance Criteria.
- **I.** Comprehensive Technical, Legal/Copyright, Storage Cost, Bandwidth & Ad-Policy Risk Matrix with mitigations.
- **J.** Exact **Step 1 Windows PowerShell Setup Commands** to verify tools and initialize the repository cleanly so we immediately move into writing real code in Phase 2.
