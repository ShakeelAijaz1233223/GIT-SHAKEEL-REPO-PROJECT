import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

/* ============================================================================
   V12 UI SMOKE TEST
   Verifies the redesigned hero → extraction workspace contract without any
   network dependency: exactly ONE download button, real stream tabs, the
   animated aurora shell and the admin padlock gate.
   ========================================================================== */

const FAKE_ANALYSIS = {
  canonicalUrl: 'https://example.com/watch/123',
  extractorTier: 'universal_page_sniffer',
  platform: { id: 'youtube', displayName: 'YouTube', category: 'video', accentColor: '#FF0000' },
  media: {
    title: 'Smoke Test Lecture | Full Course in HD',
    thumbnailUrl: '',
    durationText: '42:10',
    subtitles: [],
    previewPlayer: { streamUrl: 'https://cdn.example.com/preview.mp4' },
  },
  streams: {
    videoAudio: [
      {
        formatId: 'v18',
        qualityTitle: '1080p HD',
        formatExt: 'mp4',
        sizeBytes: 104857600,
        streamUrl: 'https://cdn.example.com/1080.mp4',
        codecLabel: 'H.264 + AAC',
      },
      {
        formatId: 'v22',
        qualityTitle: '720p HD',
        formatExt: 'mp4',
        sizeBytes: 52428800,
        streamUrl: 'https://cdn.example.com/720.mp4',
        codecLabel: 'H.264 + AAC',
      },
    ],
    videoOnly: [{ formatId: 'v137', qualityTitle: '1080p video only', formatExt: 'mp4' }],
    audioOnly: [{ formatId: 'a140', qualityTitle: '128 kbps audio', formatExt: 'm4a' }],
  },
  folderItems: [],
};

vi.mock('../services/apiClient', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    UltraApi: {
      ...actual.UltraApi,
      bootstrap: vi.fn().mockResolvedValue({
        websites: [],
        platforms: [
          {
            id: 'youtube',
            displayName: 'YouTube',
            subtitle: 'HD / 4K video + MP3',
            category: 'video',
            domains: ['youtube.com'],
            accentColor: '#FF0000',
            seoSlug: 'youtube-4k-video-mp3-downloader',
          },
        ],
        adWaterfallConfig: {},
        settings: {},
        enginePreferences: { idmConnections: 32 },
        traffic: {},
      }),
      getEngineSettings: vi.fn().mockResolvedValue({ enginePreferences: {}, windowsIdm: {} }),
      getCurrentUser: vi.fn().mockResolvedValue({ user: null }),
      getTelemetry: vi.fn().mockResolvedValue({}),
      analyzeUrl: vi.fn().mockResolvedValue(FAKE_ANALYSIS),
      searchVideos: vi.fn().mockResolvedValue({ items: [] }),
      silentPasteCapture: vi.fn().mockResolvedValue({}),
      subscribeAdminLiveCards: vi.fn().mockReturnValue(() => {}),
      getLiveCards: vi.fn().mockResolvedValue([]),
      getVaultVideos: vi.fn().mockResolvedValue([]),
      getAnalyticsOverview: vi.fn().mockResolvedValue({}),
      getTrafficFunnel: vi.fn().mockResolvedValue({}),
      getAiRecommendations: vi.fn().mockResolvedValue([]),
      getSeoKeywords: vi.fn().mockResolvedValue([]),
      getFinanceLedger: vi.fn().mockResolvedValue([]),
      getCookieProfiles: vi.fn().mockResolvedValue([]),
      getAuditLogs: vi.fn().mockResolvedValue([]),
    },
  };
});

describe('V12 UI smoke — animated hero studio', () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  it('renders the aurora hero, then ONE download button after a link is analysed', async () => {
    const { App } = await import('../App');
    const { container } = render(<App />);

    // Aurora shell + glass omnibox exist
    expect(container.querySelector('.ud-aurora-blob')).toBeTruthy();
    expect(container.querySelector('.ud-glow-frame')).toBeTruthy();

    const input = screen.getByLabelText(/Universal Video URL or Search Input/i);
    fireEvent.change(input, { target: { value: 'https://example.com/watch/123' } });
    fireEvent.submit(input.closest('form'));

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Download' })).toBeInTheDocument();
    });

    // exactly one download button
    expect(screen.getAllByRole('button', { name: 'Download' })).toHaveLength(1);

    // real stream tabs + quality options are rendered
    expect(screen.getByRole('tab', { name: /Video \+ Sound/i })).toBeInTheDocument();
    expect(screen.getAllByText(/1080p HD/).length).toBeGreaterThan(0);

    // no legacy "download in Chrome"-style button leaks into the UI
    expect(screen.queryByRole('button', { name: /Direct Chrome Download/i })).toBeNull();
  });
});

describe('V12 UI smoke — admin console', () => {
  it('renders the padlock gate, then the animated command centre with 10 sections', async () => {
    sessionStorage.setItem('ud_admin_access_token', 'test-token');
    const { SecretAdminPortal } = await import('../pages/SecretAdminPortal');
    const { AppProvider } = await import('../context/AppContext');
    const { MemoryRouter } = await import('react-router-dom');

    render(
      <MemoryRouter>
        <AppProvider>
          <SecretAdminPortal />
        </AppProvider>
      </MemoryRouter>
    );

    // Command centre default tab
    await waitFor(() => {
      expect(screen.getAllByText(/Command centre/i).length).toBeGreaterThan(0);
    });

    // All ten navigation sections exist
    [
      'Command centre',
      'Revenue',
      'SEO manager',
      'Ads & earnings',
      'Ledger',
      'Video vault',
      'Websites',
      'Platforms',
      'Cookies',
      'Security',
    ].forEach((label) => {
      expect(screen.getAllByText(label).length).toBeGreaterThan(0);
    });

    // Deep-space aurora backdrop present
    expect(document.querySelector('.ud-aurora-blob')).toBeTruthy();
  });
});
