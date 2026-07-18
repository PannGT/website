import { Link } from "react-router-dom";
import { Compass, Home } from "lucide-react";

/** Halaman 404 untuk rute yang tidak dikenal */
export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-28 text-center">
      <span className="grid size-16 place-items-center rounded-2xl bg-blue-50 text-blue-500 dark:bg-blue-500/10 dark:text-sky-400">
        <Compass className="size-8" />
      </span>
      <p className="mt-8 font-display text-7xl font-bold tracking-tight text-blue-600 dark:text-sky-400">
        404
      </p>
      <h1 className="mt-3 font-display text-2xl font-bold text-slate-900 dark:text-white">
        Halaman tidak ditemukan
      </h1>
      <p className="mt-2 leading-relaxed text-slate-600 dark:text-slate-400">
        Alamat yang Anda tuju tidak tersedia. Silakan kembali ke beranda dan
        jelajahi artikel Zixpedia dari sana.
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-all hover:-translate-y-0.5 hover:shadow-xl"
      >
        <Home className="size-4" />
        Kembali ke Beranda
      </Link>
    </div>
  );
}
