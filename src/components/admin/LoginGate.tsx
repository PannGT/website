import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { KeyRound } from "lucide-react";
import Logo from "../Logo";
import ThemeToggle from "../ThemeToggle";
import {
  ADMIN_PASSWORD,
  ADMIN_SHOW_HINT,
  AUTH_SESSION_KEY,
} from "../../lib/config";
import { cn } from "../../lib/utils";

/**
 * Gerbang login dashboard admin.
 * Kata sandi diatur di src/lib/config.ts (ADMIN_PASSWORD).
 */
export default function LoginGate({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem(AUTH_SESSION_KEY, "1");
      onSuccess();
    } else {
      setError(true);
    }
  };

  return (
    <div className="relative grid min-h-screen place-items-center overflow-hidden bg-slate-100 px-4 transition-colors duration-300 dark:bg-navy-950">
      {/* Dekorasi blob */}
      <div
        aria-hidden
        className="absolute -top-32 -right-32 size-96 rounded-full bg-blue-400/20 blur-3xl dark:bg-blue-600/10"
      />
      <div
        aria-hidden
        className="absolute -bottom-32 -left-32 size-96 rounded-full bg-sky-300/20 blur-3xl dark:bg-sky-500/10"
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="relative w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-2xl shadow-blue-600/5 dark:border-white/10 dark:bg-navy-925"
      >
        <div className="flex justify-center">
          <Logo asLink={false} />
        </div>
        <div className="mt-6 flex justify-center">
          <span className="grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-blue-600 to-sky-400 text-white shadow-lg shadow-blue-600/30">
            <KeyRound className="size-6" />
          </span>
        </div>
        <h1 className="mt-5 text-center font-display text-2xl font-bold text-slate-900 dark:text-white">
          Dashboard Admin
        </h1>
        <p className="mt-1.5 text-center text-sm text-slate-500 dark:text-slate-400">
          Masuk untuk mengelola postingan Zixpedia.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="admin-password"
              className="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-200"
            >
              Kata Sandi
            </label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              placeholder="Masukkan kata sandi admin"
              autoFocus
              className={cn(
                "w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-900 transition-all outline-none placeholder:text-slate-400 focus:ring-4 dark:bg-white/5 dark:text-white",
                error
                  ? "border-red-400 focus:border-red-400 focus:ring-red-500/10"
                  : "border-slate-300 focus:border-blue-500 focus:ring-blue-500/10 dark:border-white/10 dark:focus:border-sky-400 dark:focus:ring-sky-400/10"
              )}
            />
            {error && (
              <p className="mt-1.5 text-xs font-medium text-red-500">
                Kata sandi salah. Silakan coba lagi.
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full cursor-pointer rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-all hover:shadow-xl hover:brightness-110"
          >
            Masuk ke Dashboard
          </button>
        </form>

        {ADMIN_SHOW_HINT && (
          <p className="mt-5 rounded-xl bg-blue-50 px-4 py-3 text-center text-xs text-blue-700 dark:bg-blue-500/10 dark:text-sky-300">
            Demo: gunakan kata sandi{" "}
            <code className="font-mono font-semibold">{ADMIN_PASSWORD}</code>
          </p>
        )}

        <div className="mt-5 flex items-center justify-center gap-4">
          <Link
            to="/"
            className="text-sm font-medium text-slate-500 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-sky-400"
          >
            Kembali ke Beranda
          </Link>
          <ThemeToggle />
        </div>
      </motion.div>
    </div>
  );
}
