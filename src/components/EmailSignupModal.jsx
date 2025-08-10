// src/components/EmailSignupModal.jsx
import React, { useEffect, useRef, useState } from "react";

/**
 * EmailSignupModal
 * - Drop-in modal for mailing list signups using your Google Apps Script Web App.
 * - Shows on first visit (or when you choose), remembers dismiss for N days via localStorage.
 * - Accessible: ESC to close, backdrop click, focus management.
 *
 * Props:
 *  - gasUrl (string, required): Your deployed Google Apps Script Web App URL (…/exec)
 *  - openDelayMs (number)        default 1500
 *  - storageKey (string)         default "altalune_ml_dismissed"
 *  - cooldownDays (number)       default 7
 */
export default function EmailSignupModal({
  gasUrl,
  openDelayMs = 1500,
  storageKey = "altalune_ml_dismissed",
  cooldownDays = 7,
  closeOnSubmit = true,
  closeDelayMs = 900,
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const dialogRef = useRef(null);
  const inputRef = useRef(null);

  // Show modal after delay if not dismissed within cooldown window
  useEffect(() => {
    const raw = localStorage.getItem(storageKey);
    const last = raw ? Number(raw) : 0;
    const ms = cooldownDays * 24 * 60 * 60 * 1000;
    const shouldShow = !last || Date.now() - last > ms;

    if (!shouldShow) return;
    const t = setTimeout(() => setOpen(true), openDelayMs);
    return () => clearTimeout(t);
  }, [openDelayMs, storageKey, cooldownDays]);

  // Lock body scroll & focus first field when opened
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 50);
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  // Close helpers
  const close = () => {
    setOpen(false);
    localStorage.setItem(storageKey, String(Date.now()));
  };

  const onBackdrop = (e) => {
    if (e.target === e.currentTarget) close();
  };

  const onKeyDown = (e) => {
    if (e.key === "Escape") close();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    setLoading(true);

    const formEl = e.currentTarget;
    const email = new FormData(formEl).get("email");

    // NOTE: Using no-cors because GAS doesn't send CORS headers.
    // Server-side still prevents duplicates. UI shows generic success.
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 10000);
      await fetch(gasUrl, {
        method: "POST",
        mode: "no-cors",
        body: new URLSearchParams({ email }),
        signal: controller.signal,
      });
      clearTimeout(timer);
      setStatus("Thanks for joining!");
      formEl.reset();
      if (closeOnSubmit) {
        setTimeout(() => close(), closeDelayMs);
      }
    } catch (err) {
      console.error(err);
      setStatus("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onMouseDown={onBackdrop}
      onKeyDown={onKeyDown}
      aria-modal="true"
      role="dialog"
      aria-labelledby="email-modal-title"
      ref={dialogRef}
    >
      <div className="relative w-full max-w-md rounded-2xl border border-white/15 bg-neutral-950 p-6 shadow-2xl">
        {/* X Close */}
        <button
          onClick={close}
          aria-label="Close"
          className="absolute right-3 top-3 rounded-full px-2 py-1 text-white/70 hover:text-white hover:bg-white/10"
        >
          ×
        </button>

        <h3
          id="email-modal-title"
          className="text-altalune-orange text-2xl font-bold tracking-tight mb-2"
        >
          Join the Mailing List
        </h3>
        <p className="text-white/80 text-sm mb-4">
          Be first to know about new music, shows, and exclusive drops. No spam.
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            ref={inputRef}
            type="email"
            name="email"
            placeholder="Enter your email"
            required
            className="w-full p-3 rounded-md bg-neutral-900 border border-white/20 focus:outline-none focus:ring-2 focus:ring-altalune-orange"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-altalune-orange px-4 py-3 font-semibold text-black hover:bg-orange-600 transition disabled:opacity-60"
          >
            {loading ? "Submitting…" : "Sign me up"}
          </button>
          {status && (
            <p className="text-xs text-white/80" aria-live="polite">{status}</p>
          )}
        </form>

        <button
          onClick={close}
          className="mt-4 w-full text-xs text-white/60 hover:text-white underline underline-offset-4"
        >
          Not now
        </button>
      </div>
    </div>
  );
}

/* --------------------------------- Usage --------------------------------- */
// Example Home.jsx integration
// Place this at the bottom of your Home component's JSX so it mounts globally.
//
// import EmailSignupModal from "../components/EmailSignupModal";
// const GAS_URL = "https://script.google.com/macros/s/AKfycbxYourKeyHere/exec"; // your URL
//
// export default function Home() {
//   return (
//     <div className="min-h-screen bg-black text-white">
//       {/* ... your home content ... */}
//
//       <EmailSignupModal gasUrl={GAS_URL} />
//     </div>
//   );
// }
