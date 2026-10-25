import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnnouncementBar } from '../components/layout/AnnouncementBar';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { UltraApi } from '../services/apiClient';
import { AuroraBackground } from '../components/ui/AuroraBackground';

export function HoneypotNotFoundPage({ isHoneypot = false }) {
  const location = useLocation();

  useEffect(() => {
    if (isHoneypot) {
      UltraApi.reportHoneypotHit(location.pathname).catch(() => {});
    }
  }, [isHoneypot, location.pathname]);

  return (
    <div className="min-h-screen w-full bg-white text-slate-900 flex flex-col">
      <AnnouncementBar />
      <Navbar />
      <main className="relative flex flex-1 items-center justify-center px-4 py-20 text-center">
        <AuroraBackground variant="soft" />
        <div className="relative max-w-md space-y-4 rounded-3xl border border-white/70 bg-white/85 p-10 shadow-[0_40px_90px_-60px_rgba(30,27,105,0.6)] backdrop-blur">
          <p className="ud-text-gradient font-display text-6xl font-black">404</p>
          <h1 className="text-xl font-extrabold text-slate-900">Page Not Found</h1>
          <p className="text-xs sm:text-sm text-slate-600">
            The requested URL <code className="text-blue-700 font-semibold">{location.pathname}</code> does not exist on this server.
          </p>
          <Link
            to="/"
            className="ud-btn-primary !px-6 !py-2.5 !text-xs"
          >
            Back to home studio
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
