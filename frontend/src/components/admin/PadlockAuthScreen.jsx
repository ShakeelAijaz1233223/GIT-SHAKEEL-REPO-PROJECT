import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Lock,
  KeyRound,
  ShieldAlert,
  Delete,
  ArrowRight,
  Eye,
  EyeOff,
  CheckCircle2,
  Fingerprint,
  ShieldCheck,
  Sparkles,
  Loader2,
} from 'lucide-react';
import { UltraApi } from '../../services/apiClient';
import { AuroraBackground } from '../ui/AuroraBackground';

/* ============================================================================
   V12 PADLOCK GATE — animated vault entrance for the admin console
   4 gates: PIN → credentials → TOTP → session.
   ========================================================================== */

const GATE_STEPS = [
  { id: 1, label: 'PIN' },
  { id: 2, label: 'Credentials' },
  { id: 3, label: '2FA' },
  { id: 4, label: 'Session' },
];

export function PadlockAuthScreen({ onAuthenticated }) {
  const [step, setStep] = useState(1);
  const [pin, setPin] = useState('');
  const [email, setEmail] = useState('admin@ultradownloader.pro');
  const [password, setPassword] = useState('UltraAdmin@2026');
  const [totpCode, setTotpCode] = useState('123456');
  const [showPass, setShowPass] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const pressDigit = (d) => {
    if (pin.length >= 6 || loading) return;
    setErrorMsg('');
    setPin((prev) => prev + d);
  };

  const handlePinVerify = async (e) => {
    e?.preventDefault();
    if (!pin) return;
    setLoading(true);
    setErrorMsg('');
    try {
      await UltraApi.verifyPin(pin);
      setStep(2);
    } catch (err) {
      setErrorMsg(err.message || 'Invalid PIN.');
      setPin('');
    } finally {
      setLoading(false);
    }
  };

  const handleCredentialsLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    try {
      const res = await UltraApi.loginAdmin({ email, password, totpCode });
      onAuthenticated(res.admin || res);
    } catch (err) {
      setErrorMsg(err.message || 'Invalid credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      data-scope="admin"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#04060f] px-4 py-10"
    >
      <AuroraBackground variant="auth" />

      {/* floating vault glyphs */}
      <motion.span
        aria-hidden="true"
        animate={{ y: [0, -14, 0], rotate: [0, 8, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute left-[12%] top-[18%] hidden text-cyan-400/30 lg:block"
      >
        <Fingerprint size={54} />
      </motion.span>
      <motion.span
        aria-hidden="true"
        animate={{ y: [0, 16, 0], rotate: [0, -6, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute bottom-[16%] right-[12%] hidden text-fuchsia-400/25 lg:block"
      >
        <ShieldCheck size={58} />
      </motion.span>

      <motion.div
        initial={{ opacity: 0, y: 22, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-md"
      >
        <div className="ud-glow-frame rounded-[28px]">
          <div className="overflow-hidden rounded-[26px] border border-white/10 bg-[#080d1c]/85 shadow-[0_50px_120px_-50px_rgba(0,0,0,0.95)] backdrop-blur-2xl">
            {/* header */}
            <div className="relative overflow-hidden border-b border-white/10 px-6 pb-5 pt-6 text-center">
              <div className="pointer-events-none absolute inset-x-0 -top-16 h-32 bg-gradient-to-b from-indigo-500/35 to-transparent blur-2xl" />
              <div className="relative mx-auto mb-3 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-indigo-500 via-blue-500 to-cyan-400 text-white shadow-[0_18px_40px_-16px_rgba(79,70,229,0.95)]">
                <span className="absolute inset-0 rounded-2xl border border-white/30" />
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
                  className="absolute -inset-1 rounded-2xl border border-dashed border-cyan-300/30"
                />
                {step === 1 ? <Lock size={25} /> : <KeyRound size={25} />}
              </div>

              <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-400/25 bg-sky-400/10 px-3 py-0.5 text-[10px] font-black uppercase tracking-widest text-sky-300">
                <ShieldCheck size={11} /> stealth padlock · gate {step} of 2
              </span>

              <h1 className="mt-2 font-display text-xl font-black text-white">
                {step === 1 ? 'Enter secret digital PIN' : 'Master executive verification'}
              </h1>
              <p className="mt-1 text-[11px] leading-relaxed text-slate-400">
                3-strike SQL auto-lockout · 30-minute IP ban on repeated invalid attempts
              </p>

              {/* gate stepper */}
              <div className="mt-4 flex items-center justify-center gap-1.5">
                {GATE_STEPS.map((gate, i) => {
                  const done = step > gate.id || (step === 2 && gate.id === 1);
                  const active = step === gate.id;
                  return (
                    <React.Fragment key={gate.id}>
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-black uppercase tracking-wider transition-colors ${
                          done
                            ? 'bg-emerald-400/15 text-emerald-300'
                            : active
                              ? 'bg-gradient-to-r from-indigo-500 to-cyan-500 text-white'
                              : 'bg-white/[0.06] text-slate-500'
                        }`}
                      >
                        {done ? <CheckCircle2 size={9} /> : null}
                        {gate.label}
                      </span>
                      {i < GATE_STEPS.length - 1 && (
                        <span className="h-px w-3 bg-white/15" />
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>

            <div className="p-6">
              <AnimatePresence>
                {errorMsg && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="mb-4 flex items-start gap-2 rounded-xl border border-rose-500/40 bg-rose-950/50 p-3 text-[11.5px] font-semibold text-rose-200"
                  >
                    <ShieldAlert size={15} className="mt-0.5 shrink-0 text-rose-400" />
                    <span>{errorMsg}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence mode="wait">
                {step === 1 ? (
                  <motion.form
                    key="pin"
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.2 }}
                    onSubmit={handlePinVerify}
                  >
                    <div className="mb-5 flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-black/30 py-4">
                      {[0, 1, 2, 3].map((idx) => {
                        const filled = pin.length > idx;
                        return (
                          <motion.span
                            key={idx}
                            animate={filled ? { scale: [1, 1.25, 1] } : { scale: 1 }}
                            transition={{ duration: 0.22 }}
                            className={`h-3.5 w-3.5 rounded-full transition-all ${
                              filled
                                ? 'bg-gradient-to-br from-cyan-300 to-indigo-400 shadow-[0_0_14px_#38bdf8]'
                                : 'border border-white/20 bg-white/[0.06]'
                            }`}
                          />
                        );
                      })}
                    </div>

                    <div className="grid grid-cols-3 gap-2.5">
                      {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
                        <motion.button
                          key={digit}
                          type="button"
                          whileTap={{ scale: 0.94 }}
                          whileHover={{ y: -2 }}
                          onClick={() => pressDigit(digit)}
                          className="h-12 rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.09] to-white/[0.03] text-base font-black text-white transition-colors hover:border-cyan-400/50 hover:from-cyan-500/20"
                        >
                          {digit}
                        </motion.button>
                      ))}
                      <motion.button
                        type="button"
                        whileTap={{ scale: 0.94 }}
                        onClick={() => setPin('')}
                        className="h-12 rounded-xl border border-rose-500/25 bg-rose-500/10 text-[10px] font-black text-rose-300 transition-colors hover:bg-rose-500/20"
                      >
                        CLEAR
                      </motion.button>
                      <motion.button
                        type="button"
                        whileTap={{ scale: 0.94 }}
                        onClick={() => pressDigit('0')}
                        className="h-12 rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.09] to-white/[0.03] text-base font-black text-white transition-colors hover:border-cyan-400/50 hover:from-cyan-500/20"
                      >
                        0
                      </motion.button>
                      <motion.button
                        type="button"
                        whileTap={{ scale: 0.94 }}
                        onClick={() => setPin((p) => p.slice(0, -1))}
                        aria-label="Backspace"
                        className="grid h-12 place-items-center rounded-xl border border-white/10 bg-white/[0.05] text-slate-300 transition-colors hover:bg-white/[0.1]"
                      >
                        <Delete size={17} />
                      </motion.button>
                    </div>

                    <button
                      type="submit"
                      disabled={pin.length < 4 || loading}
                      className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 py-3 text-sm font-black text-white shadow-[0_18px_40px_-18px_rgba(56,189,248,0.9)] transition-all hover:-translate-y-px disabled:translate-y-0 disabled:opacity-50"
                    >
                      {loading ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          <span>Verifying in SQL…</span>
                        </>
                      ) : (
                        <>
                          <Lock size={15} />
                          <span>Unlock gate 1</span>
                          <ArrowRight size={15} />
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.form
                    key="cred"
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.2 }}
                    onSubmit={handleCredentialsLogin}
                    className="space-y-3.5"
                  >
                    <div className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-[11.5px] font-bold text-emerald-300">
                      <CheckCircle2 size={14} />
                      <span>Gate 1 verified — padlock ticket issued</span>
                    </div>

                    <div>
                      <label className="mb-1 block text-[10.5px] font-black uppercase tracking-widest text-slate-400">
                        Master admin email
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-xl border border-white/10 bg-black/30 px-3.5 py-2.5 text-sm font-semibold text-white transition-colors focus:border-cyan-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-[10.5px] font-black uppercase tracking-widest text-slate-400">
                        Master password
                      </label>
                      <div className="relative">
                        <input
                          type={showPass ? 'text' : 'password'}
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full rounded-xl border border-white/10 bg-black/30 px-3.5 py-2.5 pr-10 text-sm font-semibold text-white transition-colors focus:border-cyan-400 focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPass((s) => !s)}
                          className="absolute right-3 top-2.5 text-slate-400 transition-colors hover:text-white"
                        >
                          {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="mb-1 block text-[10.5px] font-black uppercase tracking-widest text-slate-400">
                        6-digit authenticator code
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={6}
                        value={totpCode}
                        onChange={(e) => setTotpCode(e.target.value)}
                        className="w-full rounded-xl border border-white/10 bg-black/30 px-3.5 py-2.5 font-mono text-base font-bold tracking-[0.35em] text-cyan-300 transition-colors focus:border-cyan-400 focus:outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 py-3 text-sm font-black text-white shadow-[0_18px_40px_-18px_rgba(56,189,248,0.9)] transition-all hover:-translate-y-px disabled:opacity-60"
                    >
                      {loading ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          <span>Authenticating…</span>
                        </>
                      ) : (
                        <>
                          <Sparkles size={15} />
                          <span>Enter command centre</span>
                          <ArrowRight size={15} />
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>

              <p className="mt-4 flex items-center justify-center gap-1.5 text-[10px] font-semibold text-slate-500">
                <ShieldCheck size={11} className="text-emerald-400" />
                AES-256 cookie vault · TOTP 2FA · IP allowlist ready
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default PadlockAuthScreen;
