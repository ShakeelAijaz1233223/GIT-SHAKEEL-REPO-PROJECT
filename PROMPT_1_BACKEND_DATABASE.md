# PROMPT 1 OF 2 — ULTRADOWNLOADER COMPLETE BACKEND, LIVE RAM NOTIFICATION ENGINE, SMART AD/TRAFFIC API & MYSQL 8 MASTER PROMPT (V7.0 LOCKSTEP EDITION)

> **ARCHITECTURAL PAIRING NOTICE:**
> This is **Part 1 (`backend/` + In-Memory Live Notification Engine + Streaming Engine + Viral Traffic & Smart Ad Controller + MySQL 8 Database)** paired with **Part 2 (`frontend/` Premium Cinematic React + Vite Application)**.
> **CRITICAL RULE:** Obey every port number (`4000`), route path (`/api/v1/...`), SSE event name, HTTP method, cookie name, request header, enum string, and JSON response envelope defined in **Section 2 (`SHARED LOCKSTEP INTEGRATION CONTRACT v7.0`)** with **100% character-for-character fidelity** so Frontend and Backend connect with **zero mismatches on first boot**.

---

## 1. ROLE, MISSION & CORE ENGINEERING MANDATES

Act simultaneously as:
1. Principal Node.js & Express.js Backend Systems Architect
2. Real-Time SSE Notification & In-Memory Event Engine Specialist
3. Senior MySQL 8 Relational Database & Storage Vault Architect
4. Senior Media Extraction, `yt-dlp`, `FFmpeg`, HLS/DASH & TeraBox/Cloud Streaming Engineer
5. Senior Application Security, Anti-SSRF & Stealth Authentication Specialist
6. Programmatic SEO, Viral Share-Link & Smart Waterfall Ad-Tech Backend Engineer

Design, implement, migrate, seed, test, and verify the **complete `backend/` system and MySQL 8 database** for **UltraDownloader** on **Windows 10/11 (PowerShell)** *(plus Linux / Docker production configs)*.

### Non-Negotiable Core Mandates
- **Required Stack:** **Node.js (LTS) + Express.js (ES Modules `"type": "module"`), Real-Time Server-Sent Events (`SSE`), MySQL 8.x (`mysql2/promise` pool + SQL migrations + seeds), REST API (`/api/v1`), JWT + Rotating `HttpOnly` Refresh Token / Session Auth, `yt-dlp` + `FFmpeg` + `deno` + `cheerio`, and a Provider-Independent AI Service Layer**.
- **CRITICAL ZERO-AUTO-DB-SAVE PASTE RULE (`In-Memory Live Notification Buffer Only!`):**
  - When ANY user pastes or submits a URL, **NEVER save that URL or video directly into MySQL automatically and NEVER write unapproved GB files to server disk!**
  - Extract metadata + stream path in backend RAM (`LiveCardBuffer`), and immediately broadcast an **individual Live Video Notification Card via SSE** straight to the **Admin Right-Side Notification Drawer**!
  - **MySQL (`media_vault_files`) & `/storage/media-vault` are ONLY written when Admin explicitly clicks `[SAVE]`** (either immediately or after watching in the Center YouTube Player via **`[VIEW]`**). Clicking **`[CLOSE]`** immediately wipes the card from RAM (`0` DB rows + `0` Disk bytes)!
- **Zero Fake Stubs:** Complete working code, exact Windows PowerShell commands, and automated tests (`vitest` / `node --test` + `supertest`) at every stage.

---

## 2. SHARED LOCKSTEP INTEGRATION CONTRACT v7.0 (MUST MATCH FRONTEND 100%)

### 2.1 Network, Ports & CORS Contract
- **Backend Server URL:** `http://0.0.0.0:4000` (`PORT=4000`)
- **API Base Prefix:** `/api/v1` *(plus root SEO endpoints `GET /sitemap.xml` and `GET /robots.txt`)*
- **CORS (`CORS_ORIGINS`):** `http://localhost:5173,http://127.0.0.1:5173` with `credentials: true`, allowing headers: `Content-Type, Authorization, X-Website-Project-Id, X-Admin-Padlock-Ticket, X-Admin-Token, Range, Cache-Control` and exposing headers: `Content-Length, Content-Range, Accept-Ranges, Content-Disposition, X-Request-Id`.

### 2.2 Universal JSON Envelope
- **Success:** `{ "success": true, "requestId": "uuid-v4", "data": {}, "meta": {} }`
- **Error:** `{ "success": false, "requestId": "uuid-v4", "error": { "code": "ERROR_CODE", "message": "...", "details": {} } }`

### 2.3 Exact Shared Enums (Case-Sensitive)
- **`category`:** `'all' | 'social' | 'video' | 'education' | 'cloud_terabox' | 'adult_18'`
- **`contentMode`:** `'clean_mainstream' | 'adult_18_only' | 'hybrid_all'`
- **`streamCategory`:** `'video_with_audio' | 'video_only' | 'audio_only'`
- **`qualityKey`:** `'2160p' | '1440p' | '1080p' | '720p' | '480p' | '360p' | 'audio_hq' | 'audio_std'`
- **`formatExt`:** `'mp4' | 'webm' | 'mkv' | 'mp3' | 'm4a'`
- **`adZoneType`:** `'native_banner' | 'player_preroll_vast' | 'download_click_direct_tab' | 'progress_modal_sponsor'`
- **`jobStatus`:** `'queued' | 'analyzing' | 'available' | 'downloading' | 'processing' | 'paused' | 'completed' | 'failed' | 'cancelled' | 'unsupported' | 'restricted'`
- **`error.code`:** `'INVALID_URL' | 'SSRF_BLOCKED' | 'PRIVATE_CONTENT' | 'EXPIRED_LINK' | 'DRM_PROTECTED' | 'COOKIE_REQUIRED' | 'GUEST_QUOTA_EXCEEDED' | 'UNSUPPORTED_SOURCE' | 'ADMIN_IP_BANNED_30M' | 'PADLOCK_REQUIRED' | 'UNAUTHORIZED' | 'FORBIDDEN' | 'NOT_FOUND' | 'RATE_LIMITED' | 'UPSTREAM_ERROR'`

### 2.4 Cookies, Multi-Domain Shield & 5-Layer Secret Padlock Admin Contract
1. **Guest Cookie:** `ud_guest_sid` (`HttpOnly`, `SameSite=Lax`, auto-issued).
2. **User Auth:** `POST /api/v1/auth/{register,login,refresh,logout}` & `GET /api/v1/auth/me` (`Authorization: Bearer <accessToken>` + `HttpOnly` `ud_refresh_token`).
3. **Multi-Domain SEO & Ad Profile Shield:** Match `X-Website-Project-Id` or `Host` header (`clean_mainstream` hides `adult_18` publicly & uses SEO-safe ad caps; `adult_18_only` boots into `18+` mode with adult ad profile; Admin sees ALL domains & ALL categories).
4. **5-Layer Secret Padlock Admin Security:**
   - Honeypot: `POST /api/v1/security/honeypot` logs intruder IP when `/admin`, `/wp-admin`, `/dashboard`, or `/panel` is visited.
   - Gate 1: `POST /api/v1/admin/padlock/verify` (`{ pin }`) -> `{ padlockTicket }`.
   - Gate 2: `POST /api/v1/admin/auth/login` (header `X-Admin-Padlock-Ticket`, body `{ identifier, password, totpCode? }`) -> `{ adminAccessToken, admin }` + sets `HttpOnly; SameSite=Strict` cookie `ud_admin_session`.
   - **3 Wrong Attempts = 30-Min IP Ban:** HTTP `423` `{ code: "ADMIN_IP_BANNED_30M", details: { unlocksAt, remainingSeconds } }`.
   - Accept either `X-Admin-Token: Bearer <adminAccessToken>` OR `ud_admin_session` cookie on all `/api/v1/admin/*` routes including SSE stream!

---

## 3. COMPLETE API SPECIFICATION (`/api/v1`) — MEDIA, LIVE SSE CARDS, 4-STAGE SMART ADS & VIRAL TRAFFIC

### 3.1 Public Media, Discovery, Player & Download Endpoints
1. `GET /api/v1/health` & **`GET /api/v1/config/bootstrap`** (returns `{ websiteProject, contentMode, platforms[], quickChips[], guestQuota, adWaterfallConfig, seoDefaults }`).
2. `GET /api/v1/platforms` & `GET /api/v1/platforms/:id` *(35+ distinct platforms with custom SVG icons across all 6 categories)*.
3. **`POST /api/v1/intake/paste-capture`** (`{ rawUrl, sourceContext? }`) — **RAM-Only Live Card Push (`ZERO MySQL insert, ZERO Disk write!`)** -> emits SSE `card_added` to Admin Right-Side Notification Drawer immediately -> returns `{ cardId, canonicalUrl, platform, category, quickPreview }`.
4. `GET /api/v1/search?q=...&mode=video|album|handle|hashtag&platformId=...&category=...&sort=...&page=...&limit=...`
5. `POST /api/v1/analysis` & `GET /api/v1/analysis/:id` — **4-Tier Engine** (`TeraBox/Terashare/Mirrors incl. Folders`, `YouTube/Shorts`, `FB/IG/TikTok No-Watermark/X`, `Coursera/Udemy Previews + Non-DRM with ephemeral RAM-only cookies.txt`, `1,850+ yt-dlp Core incl. 18+ Tubes`, `Universal WWW HTML/Iframe/HLS Sniffer`).
6. `GET /api/v1/stream/proxy?token=...` — Stateless `206 Range` + `.m3u8` HLS stream proxy (`0 GB` disk burn).
7. `POST /api/v1/downloads`, `GET /api/v1/downloads`, `GET /api/v1/downloads/:id`, `GET /api/v1/downloads/:id/file` (`206 Range` resume), `POST /api/v1/downloads/:id/{pause,resume,cancel,retry}`.
8. `/api/v1/favorites`, `/api/v1/history/views`, `POST /api/v1/reports`, `POST /api/v1/takedowns`.

### 3.2 Viral Traffic & Programmatic SEO Engine Endpoints (NEW BUILT-IN GROWTH ENGINE!)
1. **`POST /api/v1/share` (`{ url, title, platformId, thumbnailUrl, durationText }`) & `GET /api/v1/share/:shortCode`:**
   - Creates short clean **Viral Watch-and-Download Share Links (`/v/:shortCode`)**! When group admins share `yoursite.com/v/abc123` on **Telegram / WhatsApp / Reddit / X**, every visitor lands on YOUR player page, increments real `view_count` & `share_clicks`, sees YOUR 4-Stage Smart Ads, watches inside YOUR Online Player, and downloads smoothly!
2. **`GET /api/v1/seo/landing/:slug` & `GET /sitemap.xml` & `GET /robots.txt`:**
   - Auto-generates **50+ Programmatic SEO Landing Pages** (e.g., `/tools/terabox-online-video-player`, `/tools/tiktok-downloader-no-watermark`, `/tools/instagram-reels-hd`, `/tools/facebook-watch-downloader`, plus one auto-generated SEO route for every enabled platform in `platforms`!) complete with custom meta title, meta description, OpenGraph tags, structured FAQ schema, and automatic XML sitemap entries!
3. **`GET /api/v1/ads/waterfall` & `POST /api/v1/events/track`:**
   - Serves domain-aware **4-Stage Smart Waterfall Ad Config** (`Stage 1: Zero-Popup Clean Hero + Native Banner`, `Stage 2: Optional 5s Skippable Player Pre-Roll VAST Tag`, `Stage 3: Cooldown-Capped New-Tab Direct Link strictly on "Download Now" / "Play" Click — e.g. max 1 per 20 mins so bounce rate stays 0%!`, `Stage 4: Progress Modal Sponsor Card`) and records real UTM source (`telegram`, `whatsapp`, `google_organic`, `reddit`, `direct`, `share_link`), page views, paste->play->download funnel steps, ad impressions, and legitimate clicks!

### 3.3 Secret Padlock Admin Endpoints (`/api/v1/admin/*`)
1. **Live Side-Drawer Video Notification Cards API (`RAM-Only Until Saved!`):**
   - `GET /live-cards/stream` (*SSE `snapshot`, `card_added`, `card_updated`, `card_removed`*)
   - `GET /live-cards`, **`GET /live-cards/:cardId/view`** (*`[VIEW]` Center YouTube Player, `0 DB / 0 Disk`*), **`POST /live-cards/:cardId/save`** (*`[SAVE]` -> MySQL `media_vault_files` + `/storage/media-vault`*), **`DELETE /live-cards/:cardId/close`** (*`[CLOSE]` -> Instant RAM wipe, `0 DB / 0 Disk`!*), `DELETE /live-cards`
2. **Saved Server Storage Vault CRUD:** `GET /vault`, `POST /vault/pull`, `GET /vault/:id/stream`, `PATCH /vault/:id`, `DELETE /vault/:id?mode=file_only|record_and_file` (*Anytime Owner Delete!*), `POST /vault/bulk-delete`.
3. **4-Stage Smart Ad Manager & Viral Share Analytics:** `GET|POST|PATCH /ads/slots` *(live toggle for each of the 4 stages + `cooldownMinutes` slider + `directTabUrl` / `vastTagUrl` / `bannerHtml` per website domain!)*, `GET|POST|PATCH /ads/experiments`, `GET /traffic/sources-funnel`.
4. **Multi-Website Hub, `Dashboard Profit`, `AI SEO Manager`, `Smart Financial Ledger`, `Platforms/Custom SVG Creator`, `Cookies`, `Quotas` & `Moderation`:** Full CRUD endpoints matching Frontend Contract `v7.0` 100%.

---

## 4. CLEAN RELATIONAL MYSQL 8 SCHEMA (29 NORMALIZED TABLES)

Numbered `.sql` migrations + seeders (`npm run db:migrate && npm run db:seed`):
`01_users`, `02_roles`, `03_permissions`, `04_user_roles`, `05_sessions`, `06_website_projects`, `07_platforms`, `08_platform_adapters`, `09_media_vault_files`, `10_viral_share_links` *(for `/v/:shortCode` viral loop!)*, `11_seo_landing_pages` *(50+ seeded programmatic SEO pages!)*, `12_content_items`, `13_content_metadata`, `14_source_links`, `15_analysis_jobs`, `16_download_jobs`, `17_indexing_jobs`, `18_indexing_job_logs`, `19_bookmarks`, `20_viewing_history`, `21_guest_quotas`, `22_content_reports`, `23_takedown_requests`, `24_admin_credentials_vault`, `25_app_settings`, `26_admin_ip_bans`, `27_audit_logs`, `28_analytics_seo_ads_tables`, `29_finance_ai_tables`.

---

## 5. SECURITY & SEQUENTIAL STAGES (START IMMEDIATELY AT STAGE 1!)

Enforce full **Anti-SSRF + DNS Rebinding Guard**, **Zero Command Injection (`execFile` with `shell: false`)**, and **Hard Illegal/CSAM Filter**, executing cleanly step by step with exact Windows PowerShell commands and automated tests across **Stage 1 -> Stage 6** until 100% tested and verified.
