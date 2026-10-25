# UltraDownloader V10.0 — Pure White XAMPP Edition (Zero `yt-dlp.exe` · Direct PC IDM & Chrome)

## 1. Prerequisites (Windows 10 / 11)
1. **Node.js v20+** installed (`node -v`).
2. **XAMPP Control Panel** -> Click **Start** next to **MySQL** (`127.0.0.1:3306`).
3. *(Optional)* Import `ultradownloader_xampp.sql` in `http://localhost/phpmyadmin` -> Database `ultradownloader_db` *(Note: Backend automatically creates & syncs all tables + `222` platforms on startup too!)*.

---

## 2. Clean 1-Minute Setup & Run Commands (Windows CMD / PowerShell)

### Step 1 — Backend Install & Start (`0` `.exe` files — installs in ~4 seconds!)
```cmd
cd backend
npm install
npm run dev
```

### Step 2 — Frontend Install & Start (Auto-connects to `:4000` with `0` `ECONNREFUSED`!)
```cmd
cd frontend
npm install
npm run dev
```
*(Tip: `frontend` now also includes an auto-companion launcher — even if you run `npm run dev` inside `frontend` first, it automatically boots `backend` on `:4000` in the background with zero proxy errors!)*

---

## 3. Live URLs & Super-Admin Access
- **Public Pure White Studio:** `http://localhost:5173`
- **Backend Health & Diagnostics:** `http://localhost:4000/api/v1/health`
- **Stealth Super-Admin Vault:** `http://localhost:5173/vault-control-x9p4` *(or press `Ctrl + Shift + Alt + U`)*
  - **Gate 1 PIN:** `2580`
  - **Email:** `admin@ultradownloader.pro`
  - **Password:** `UltraAdmin@2026`
  - **2FA Code:** `123456`

---

## 3b. Smart URL paste (no more "HTTP / HTTPS" errors)
Any paste format works now: missing `https://`, `HTTPS : //`, single-slash `https:/`, uppercase domains, `www.` only, share text ("watch this: https://..."), emojis, quotes, newlines or zero-width characters are all cleaned automatically.

---

## 3c. Real File Download System (single fast button)

**UI:** the hero has exactly **one** download button now (`Download · <quality> (<format>)`). It shows real states only:
`Preparing download… → Verifying file… → Download started` (or the real error + `Retry`).
It never claims "complete" — Chrome owns the transfer, so progress/completion lives in **Chrome → Ctrl + J**.

**Flow:** click → `POST /api/v1/files/download-ticket` (HMAC-signed, 5-minute link) → `HEAD` verification
(real `Content-Disposition`, `Content-Length`, `Accept-Ranges`) → browser downloads the verified `/api/v1/files/download/...` URL.

**Endpoints**

| Method | Path | Purpose |
|---|---|---|
| `POST` | `/api/v1/files/download-ticket` | Validates the target & returns a signed, expiring download URL |
| `HEAD/GET` | `/api/v1/files/download/:fileName?ticket=…` | Streams the real bytes (`attachment`, correct MIME, Range/206 resume) |
| `GET` | `/api/v1/files/:fileId/download` | One-click link for a public library file (302 → signed URL) |
| `GET` | `/api/v1/files/library` | Authorized public file catalogue |

**Security:** files are resolved only through a server-side registry (`backend/src/data/downloadLibrary.js`) inside
`backend/storage/files` — user paths are never accepted (traversal returns 404), signatures and expiry are enforced
(`403` tampered, `410` expired), protected files need a signed-in user (`401`), remote targets pass the Anti-SSRF guard,
and no storage path/credential is ever returned to the browser.

**Sample files (real, extractable)**
- `backend/storage/files/UltraDownloader_Sample_Guide.pdf` → `application/pdf`
- `backend/storage/files/UltraDownloader_Sample_Pack.zip` → `application/zip` (contains README + CSV + MD)
- `backend/storage/files/UltraDownloader_Pro_Pack.zip` → login-protected

**Quick manual test**
```cmd
curl -I "http://localhost:4000/api/v1/files/sample_zip/download"
curl -OJ "http://localhost:4000/api/v1/files/sample_pdf/download"
```

---

## 3d. Universal platform support (no whitelist)
Every page that actually embeds media now resolves:
**YouTube · Shorts · Vimeo · Dailymotion · TikTok · X/Twitter · SoundCloud · PeerTube · TeraBox (32 mirrors) · Streamable · Archive.org · Reddit · OK.ru · BitChute · VK · Bilibili · Odysee** + **any other website** via the deep HTML sniffer
(`og:video`, Twitter player, JSON-LD `VideoObject`, `<video>/<source>`, `data-*` players, JW/Video.js/Plyr configs, escaped URLs in inline JS, TeraBox links, embedded player iframes).

Only pages with **no video at all** (articles, repos, login walls, DRM services) return the honest `NO_MEDIA_ON_PAGE` hint.

---

## 4. Key V10.0 Upgrades
- **`yt-dlp.exe` 100% Deleted:** Zero `.exe` binary downloads or `postinstall` hangs.
- **1-Click Universal Device Download (works on EVERY site):** Clicking **Download** instantly fires a native browser download (`HTTP 200/206` + `Content-Disposition: attachment`). If Internet Download Manager is installed, its browser integration grabs the same link automatically — no site ever blocks the start again.
- **File name inside the URL:** download links look like `/api/v1/stream/direct-download/Movie_720p.mp4?...` so IDM's browser monitor recognises the file type instantly.
- **HLS platforms:** streaming-only links are auto-converted and saved as one playable `.ts` / `.mp4` file.
- **Clean public UI:** XAMPP / MySQL / ports / thread counts are no longer shown to visitors — only user-relevant information (quality, speed, privacy) is displayed. The admin console (`/vault-control-x9p4`) is a full-width dark dashboard with light Framer Motion transitions.
- **Strict Per-User Download History:**
  - **Logged Out (Guest):** `0` download history saved anywhere.
  - **Logged In User:** History stored strictly per user account (`user_id`), with instant per-item **`Delete`** and 1-click **`Clean All History`** buttons.

## 3e. Round-6: Facebook share links · full format list · family-safe build

### 1. Facebook `/share/v/…` links (fixed)
- Facebook blocks ordinary server requests, so the old sniffer returned `422 NO_MEDIA_ON_PAGE`.
- New tier **`facebook_plugin_video`** (`backend/src/services/extendedEmbedExtractors.js`):
  1. Resolves `/share/v/<code>` → numeric video id using Facebook's own crawler UA
     (`facebookexternalhit/1.1 …`), following the redirect to `/reel/<id>/`.
  2. Loads the public plugin `https://www.facebook.com/plugins/video.php?href=<video url>`
     (works with a normal Chrome UA, no login, no cookies).
  3. Reads `hd_src` / `sd_src` → real `video-*.fbcdn.net/*.mp4` CDN links
     (fallback: any `.mp4` in the page, quality decoded from its `efg` payload).
- Result: **HD MP4 + SD MP4** rows for share, reel, `watch/?v=`, `videos/<id>` and `fb.watch` links.

### 2. Every file format accepted (175 extensions)
- Single source of truth: **`backend/src/data/mediaFormats.js`**
  (video, pro-video, audio, image, playlist/HLS/DASH, subtitle, archive + MIME map).
- `downloadLibrary.js`, `fileDownloadService.js`, `idmTurboDownloader.js`,
  `deepPageSniffer.js` and `extractorEngine.js` all import from it.
- Direct links now keep their real extension end-to-end, so a `.mkv` saves as `.mkv`,
  a `.flac` as `.flac`, a `.tiff` as `.tiff` — and the download response sends the right
  `Content-Type` + `Content-Disposition` file name.
- HTML error/consent pages are rejected (`HOST_BLOCKED_DOWNLOAD`) instead of being saved as a fake video.

### 3. IDM routing rule
| Situation | What happens |
|---|---|
| IDM installed on the user's PC **and** extension supported | `IDMan.exe /d <url> /f <file>` → toast "Sent to IDM" |
| IDM not installed (or unsupported extension) | Chrome download manager → toast "Download started" |

- Detection lives in `triggerLocalWindowsIdmDownload()` (it runs on the user's own PC).
- Response now includes `idmInstalled`, `extension`, `extensionSupported`, `routingReason`.
- Frontend (`HeroSmartAnalyzer.jsx`) calls `/downloads/send-direct-idm` first and only
  falls back to the browser when IDM is absent — Chrome stays the default.

### 4. All 18+ / adult platforms removed (family-safe build)
- `platformDefinitions.js`: adult vault section deleted, `ADULT_PLATFORMS = []`,
  final list filtered with `isAdult !== true` → **120 clean platforms**.
- DB: `DELETE FROM platforms WHERE category='adult_18' OR is_adult=1` on every boot;
  both XAMPP `.sql` seeds scrubbed (schema columns kept).
- Admin: adult options removed from Operations tab, content-mode filter, saved-vault
  adult filter + blur toggle; custom platform registration can never set `is_adult = 1`.
- Public: "18+ Adult Vault" tab, consent gate and all 222+/18+ copy removed;
  `showAdultVaultTab` is locked to `false` server-side.

### Verify
```bash
cd backend && npm install && npx vitest run     # 16 passed
cd ../frontend && npm install && npx vitest run # 10 passed
```
Live checks used: `https://www.facebook.com/share/v/19oquFR8gX/` → `facebook_plugin_video`
(HD+SD MP4) and a real `HTTP 206 video/mp4` byte range through the download ticket.

## 3f. Round-6b: every platform card must play (universal resolver layer)

New file **`backend/src/services/universalPlatformResolvers.js`** — three layers that
run for ANY link before the deep HTML sniffer gives up:

**A. Social APIs (real endpoints, no keys)**
| Platform | How it resolves |
|---|---|
| Bluesky | `public.api.bsky.app` `app.bsky.feed.getPostThread` → `embed.playlist` (HLS) / blob |
| Mastodon | `<instance>/api/v1/statuses/<id>` → `media_attachments[].url` |
| Instagram | `/reel|p|tv/<code>/embed/captioned/` → `video_url` (fallback: public GraphQL `media/<code>/info`) |
| Threads | `/@user/post/<code>/embed` → `video_url` / `og:video` |
| Pinterest | pin JSON `V_720P` + `V_HLSV4` |
| Telegram | `t.me/<ch>/<id>?embed=1` → `<video src>` |
| Tumblr | post HTML `video_url` / `og:video` |
| Twitch clips | `videoQualities[].sourceURL` |
| Kick | `kick.com/api/v2/clips/<id>` → `video_url` |
| Rumble | `rumble.com/embed/<id>/` → `mp4.url` + `hls.url` |
| Snapchat | Spotlight page `contentUrl` / `og:video` |
| LinkedIn | public post `og:video:secure_url` |

**B. Cloud / embed hosts**
Streamtape (glued `botlink` fragments → `get_video`), DoodStream (`pass_md5` token →
CDN mp4), MixDrop (`MDCore.wurl`), VOE / FileMoon / StreamWish / LuluStream / Vidmoly /
KrakenFiles / SendVid (player `sources[].file`, JSON-LD, og:video).

**C. Page intelligence (works on literally any website)**
- JSON-LD `VideoObject.contentUrl` / `embedUrl`
- `og:video` / `og:video:secure_url` / `twitter:player:stream`
- `<video>` / `<source>` tags (relative paths included)
- oEmbed discovery (`<link type="application/json+oembed">`) + one-level embed follow
- Known players: **Wistia, Mux, Cloudflare Stream, Kaltura, Loom, JW Player / Video.js**
- Last-mile media-URL scan, gated by a real player signal so site chrome/JS bundles
  are never mistaken for the video (BBC asset test).

**Fixes shipped with it**
- `deepPageSniffer` now resolves bare relative sources (`mov_bbb.mp4`) — that alone
  revived many pages that used to fail.
- A bare homepage/profile/feed link now returns **`422 PASTE_CONTENT_LINK`** with a
  clear instruction instead of a generic "no media" error.

**Verification**
- `backend/test/resolvers.test.js` — **18 fixture tests**, network stubbed, one per
  platform/host above (proves the parsers even where the host blocks datacenter IPs).
- Live from this sandbox: YouTube (10), Facebook share (2), Dailymotion, SoundCloud,
  Archive.org, TED (HLS), NASA, Wikipedia, W3Schools, Mastodon, direct `.mkv/.flac/.tiff/.zip/.docx`.
- Backend suite: **34 passed** · Frontend: **10 passed** · `vite build` green.

## 3g. Round-7: Instagram + one shared download engine + speed (FINAL)

### 1. Instagram — really works now
`resolveInstagram()` in `universalPlatformResolvers.js`
- Reads the **mobile** embed page `instagram.com/{reel|p|tv}/<code>/embed/captioned/`
  with an iPhone Safari UA.
- Instagram ships the JSON **triple-escaped** (`\\\"video_url\\\":\\\"https:\\\/\\\/…`), so the
  payload is deep-unescaped (`\\uXXXX`, `\\"`, `\\/`) before parsing.
- Returns **HD MP4**, thumbnail, @username and the caption as the title.
- Carousel / multi-clip posts return every clip; private or deleted posts return
  `null` (honest error, never a fake stream).
- Fallback tiers: `i.instagram.com/api/v1/media/<id>/info/` (shortcode → media-id
  conversion is done locally, Base64 alphabet) and the public GraphQL endpoint.
- Verified live: `instagram.com/reel/B1ox0BWF8S1/` → real `video/mp4`,
  `HTTP 206`, 3.4 MB file streamed through a download ticket.

### 2. ONE download engine — admin and user are identical
New **`frontend/src/services/downloadEngine.js`** → `runUniversalDownload()`:
```
ticket → HEAD verify → IDM (only if this PC really has IDMan.exe) → else Chrome
```
Used by **all three** surfaces, so the behaviour can never drift again:
| Surface | File | What it shows |
|---|---|---|
| Public site hero | `HeroSmartAnalyzer.jsx` | `Download · <quality>` button |
| Admin theater modal | `CenterTheaterModal.jsx` | `Download · IDM / Chrome` button |
| Admin video vault | `SavedVaultTab.jsx` | `Download` button per card |

Messages: **"Sent to IDM: file"** when IDM launched, **"Download started: file"**
when Chrome takes it (never a fake "completed").

### 3. Playback is identical too
- Both surfaces render the same `OnlineVideoPlayer` with the same
  `/api/v1/stream/proxy?url=…` inline URL.
- `GET /api/v1/admin/vault/:id/stream` no longer redirects to an *attachment*
  URL (which made Chrome download instead of play) — it redirects to the inline
  proxy, exactly like a normal visitor's player.

### 4. Speed (measured, same sandbox)
- **Parallel tier race** (`racePriorityTiers`): Dailymotion → social APIs →
  extended APIs → universal resolvers all start at once, highest priority that
  answers wins, 220 ms grace window. No more 4 sequential round trips.
- **YouTube**: the Innertube visitor handshake no longer blocks (600 ms cap) and
  is pre-warmed at boot → 4650 ms ➜ **148 ms**.
- Boot warm-up (`warmUpExtractorEngine`) pre-builds the visitor session and the
  platform cache.
- Live results: Instagram 14 ms · YouTube 148 ms · TED 173 ms · W3Schools 99 ms ·
  Dailymotion 310 ms · Archive.org 431 ms · Vimeo 639 ms · Facebook 1172 ms (cold).

### 5. Standby-mode fixes (found by tests)
- `db-diagnostics` now reports the real in-memory counts (was always 0 without MySQL).
- In-memory SQL gained the user-scoped `download_jobs` queries, 2-condition
  `DELETE`, and column-specific lookups → per-user history + delete work with or
  without XAMPP MySQL running.

**Test suites:** backend **36 passed** (incl. 20 resolver fixtures) · frontend **10 passed** · `vite build` green.

---

# 3h. Round-9 — Exact Platform Catalogue + "No URL Not Supported" Universal Access

## 1. Catalogue = exactly the two lists the user pasted (38 entries)
| Category | Count | Platforms |
|---|---|---|
| Social | 8 | YouTube · TikTok · Instagram Reels · Facebook Watch · Dailymotion · Vimeo · Twitch · Rumble |
| Streaming & Movies | 18 | Netflix · Amazon Prime Video · Disney+ · Hulu · Max (HBO) · Apple TV+ · Paramount+ · Peacock · Tubi · Pluto TV · Plex · Crunchyroll · JioHotstar · ZEE5 · Sony LIV · iQIYI · Viki · MUBI |
| TeraBox & Cloud | 12 | TeraBox.app (official) · TeraBox.com · TeraViralHub · iTeraPlay · MirroBox · NephoBox · FreeTeraBox · 1024Tera · 4FunBox · TeraBox.fun · TeraBoxApp.com · TeraBoxLink |

Everything else (Twitter/X, Reddit, JustWatch, LinkedIn, Pinterest, education
bucket, 20 extra TeraBox mirrors…) is gone from the public catalogue.
Seed + bootstrap + admin panel all read the same 38-row registry.

## 2. Zero "URL not supported" — proven by grep + live calls
`grep -rn "URL_NOT_SUPPORTED" backend/src frontend/src` → **0 hits**.
Every pasted URL now ends in one of these honest, actionable answers:

| Input | Answer |
|---|---|
| Any video/reel/post page | real streams (`videoAudio` / `audioOnly`) |
| Bare homepage / profile | `PASTE_CONTENT_LINK` — "open the actual video page" |
| Page with no media at all | `NO_MEDIA_ON_PAGE` — "this page has no video file" |
| Paid DRM title (Netflix, Disney+, Crunchyroll…) | `DRM_PROTECTED` — Widevine/FairPlay cannot be decrypted *by anyone* |
| Site rate-limiting the server (HTTP 429/403) | `UPSTREAM_RATE_LIMITED` — "wait a minute, paste again" |
| Malformed text | `INVALID_URL` |

## 3. Locked / embedded pages — deeper detection
- **Player IDs inside JSON/JS** (no visible `<iframe>`): YouTube `videoId` /
  `youtube_id`, `player.vimeo.com/video/<id>`, Dailymotion, Cloudflare Stream.
  → CS50 lecture hub, W3Schools, news pages now resolve.
- **LMS & course players:** Panopto (`Podcast/Social/<deliveryId>.mp4`),
  Brightcove (`players.brightcove.net` → HLS/MP4), Vidyard
  (`play.vidyard.com/<id>.json`), JW Platform (`cdn.jwplayer.com/v2/media/<id>`),
  Echo360, plus the existing Wistia / Mux / Kaltura / Loom / generic player configs.
- **iframe / `<embed>` / `<object>` recursion** already ran; now also followed when
  the player id is only present as data.

## 4. HLS → one real file (the big one)
`POST /files/download-ticket` on an `.m3u8` used to hand Chrome a 2 KB playlist.
Now `streamRemoteFile` detects HLS and delegates to `writeHlsAsSingleFile`:
- master playlist → highest `BANDWIDTH` variant
- `#EXT-X-MAP` fMP4 init segment included → output `video/mp4`
- TS segments → output `video/mp2t`
- **AES-128 broadcast encryption is decrypted** (`#EXT-X-KEY:METHOD=AES-128`,
  key fetched from the playlist URI, per-segment IV or media-sequence IV).
  This is standard HLS encryption with a public key — *not* DRM.
- `SAMPLE-AES` / `SAMPLE-AES-CTR` (FairPlay / Widevine PSSH) → honest `DRM_PROTECTED`.
- Works from **every** download path: web button, IDM, admin vault, universal engine.

## 5. TeraBox = full all-to-all
`isTeraboxEcosystemUrl()` no longer needs a domain in the list:
1. every known mirror domain (32),
2. **any** host matching `*terabox*`, `*tera*share*`, `*box*.<tld>`, `1024tera.*`,
3. **any** site carrying a token — `?surl=` / `?shorturl=` / `/s/1…`.
So a brand-new mirror that appears tomorrow still resolves.

## 6. Live verification (cold run, sandbox)
| Target | Time | Result |
|---|---|---|
| YouTube | 154 ms | HTTP 206 · video/mp4 |
| Instagram reel | 389 ms | HTTP 206 · video/mp4 |
| Facebook `/share/v/` | 1655 ms | HTTP 206 · video/mp4 |
| Dailymotion | 315 ms | HTTP 200 · 2.0 MB video/mp2t |
| SoundCloud | 967 ms | HTTP 200 · 4.3 MB |
| Archive.org | 1202 ms | HTTP 206 · audio/ogg |
| TED | 146 ms | HTTP 200 · 187 MB video/mp2t (HLS joined) |
| CS50 (course page) | 606 ms | HTTP 206 · video/mp4 |
| Tubi | 2052 ms | HTTP 206 · video/mp4 (preview/trailer) |
| Pluto TV | 3159 ms | HTTP 200 · 36.8 MB video/mp2t (**AES-128 decrypted**) |
| Raw `test-streams.mux.dev/….m3u8` | 129 ms | HTTP 200 · 502 MB video/mp2t |
| TeraBox share link | 2810 ms | HTTP 206 · video/mp2t (MPEG-TS verified) |
| Vimeo (public) `22439234` | — | HTTP 200 · 121.9 MB video/mp4 |
| Vimeo `76979871` (FairPlay) | 628 ms | `DRM_PROTECTED` — correct, video is CENC |
| Netflix / Disney+ / Crunchyroll | <150 ms | `DRM_PROTECTED` — correct |

**Test suites:** backend **36 passed** · frontend **10 passed** · `vite build` green (9.66 s).

---

# 3i. Round-10 — Bug Fixes, 404-Platform Catalogue, Ads & Earnings, Search Anything, SEO/AEO

## 1. The two real bugs from the screenshots
### a) "The server could not prepare this download" (Dailymotion / any HLS)
- **Cause:** the browser verifies a download with a `HEAD` request. The HLS
  handler answered `HEAD` by *joining every segment* into memory, so the probe
  timed out / died and the UI showed a 5xx error.
- **Fix:** `writeHlsAsSingleFile()` answers `HEAD` immediately, peeking only at
  the first playlist (2.5 s budget) to report the correct container.
  Now: `HEAD 200 · video/mp4 · attachment; filename="dm.mp4"`, and the real
  `GET` streams the whole file (verified 7,243,641 bytes, `ftypiso5`).

### b) Black / non-playing preview
- **Cause:** the preview URL pointed at `/stream/hls-download/…ts` — an MPEG-TS
  *attachment*. Chrome cannot play MPEG-TS, and `hls.js` was not even engaged
  because the URL did not end in `.m3u8`.
- **Fix:** new playback proxy:
  * `GET /api/v1/stream/hls-play?url=<master.m3u8>` → playlist rewritten to same-origin
  * `GET /api/v1/stream/hls-play/seg?url=<segment|variant|key>` → bytes or rewritten sub-playlist
  * `media.previewPlayer.streamUrl` now always points at `hls-play`
  * `OnlineVideoPlayer` detects `/stream/hls-play` and adds network/media error recovery
- Verified live: master → variant → **105 KB fMP4 segment (`stypmsdh`)**.

## 2. Catalogue rebuilt — 404 platforms, exactly the user's master list
| Bucket | Count | Examples |
|---|---|---|
| Social Media | 38 | Facebook, Instagram, TikTok, YouTube, X (Twitter), Snapchat, Threads, Reddit, LinkedIn, Telegram, Discord, Bluesky, Mastodon… |
| Streaming · Video · Music | 122 | Netflix, Prime Video, Disney+, Max, Hulu, Tubi, Pluto TV, Plex, Crunchyroll, JioHotstar, Bilibili, Kick, Rumble, Spotify, SoundCloud, Apple Podcasts… |
| Courses & Learning | 61 | Udemy, Coursera, edX, LinkedIn Learning, Khan Academy, freeCodeCamp, MIT OCW, TryHackMe, PortSwigger, KodeKloud… |
| TeraBox & Cloud | 22 | TeraBox + every mirror, iTeraPlay, TeraViralHub, Google Drive, MEGA, Dropbox, OneDrive, WeTransfer… |
| AI · Search · Shopping · Dev | 161 | ChatGPT, Gemini, Claude, Midjourney, Sora, Google, Bing, Steam, Amazon, Daraz, GitHub, Figma, Al Jazeera, Upwork, Notion, PayPal, Pixabay… |

`stacked + deduplicated`: **404** rows, `0` adult, `0` duplicate ids.
The same 404 rows are seeded in `ultradownloader_xampp.sql` (MySQL import).

## 3. "URL not supported" = 0 (proven)
17 live URLs tested: YouTube, Instagram, Facebook, dai.ly, Vimeo, SoundCloud,
Archive.org, TED, CS50, Tubi, Pluto TV, TeraBox, Udemy, Wikipedia, GitHub, a
random unknown domain and Netflix →
`URL_NOT_SUPPORTED count: 0`.
Honest outcomes only: real streams, `NO_MEDIA_ON_PAGE`, `PASTE_CONTENT_LINK`,
`DRM_PROTECTED`, `UPSTREAM_RATE_LIMITED`.

## 4. IDM / Chrome branding removed — normal download only
- `downloadEngine.js`: no IDM hand-off at all. Ticket → verify → **browser saves the file**.
  Message is only ever `Download started: <file>`.
- All user-visible strings cleaned ("Direct Download", "Open again", …).
- Settings page: the Windows IDMan.exe path/auto-launch block is replaced by a
  plain "Normal download (browser handles it)" explainer.
- Raw engine ids (`dailymotion_metadata`) no longer reach the UI.

## 5. Search Anything (next to the cookie button)
- New blue **Search Anything** button in the hero chip row.
- Modal → `POST /api/v1/search/anything` → fans out to YouTube InnerTube,
  YouTube web results, DuckDuckGo and Bing in parallel, dedupes and returns real
  cards (thumbnail, platform, duration) with **Play** and **Download**.
- Verified: `"coke studio"` → 6 items from 3 live sources.

## 6. Purpose + SEO/AEO block (image-4)
New `PurposeSeoSection` on the homepage:
- plain-language "What is this website?" answer,
- 3-step "how it works",
- 4 trust points,
- 6-question FAQ rendered as `<details>`,
- embedded `SoftwareApplication` + `FAQPage` JSON-LD for Google and AI answer engines.
Hero copy rewritten so a first-time visitor instantly understands the purpose.

## 7. Ads & Earnings system (live from day one)
- New tables: `ad_slots`, `ad_events`, `visitor_sessions` (MySQL + standby memory).
- 5 placements: `header`, `belowPlayer`, `sidebar`, `inline`, `footer`.
- 3 ad types per slot: house banner, Google AdSense (`ca-pub-…` + slot id), custom HTML.
- **Real** tracking: impression counted only when the slot is 40% visible
  (IntersectionObserver), click counted on open. Revenue = real CPM/CPC model.
- Visitor ledger hashes the IP (`sha256(salt:ip:ua)`) — new IP = new visitor,
  raw IP never stored.
- Admin → **Ads & Earnings** tab: 6 live stat cards, per-slot performance,
  toggle/delete/create slots, and a "Can this site earn yet?" checklist
  (active slots · 100 visitors · 1,000 impressions · 25 clicks · 10 users).

## 8. Suites
backend **35 passed · 1 skipped** (YouTube bot-blocks this sandbox's IP —
upstream condition, suite reports it explicitly) · frontend **10 passed** ·
`vite build` green.
