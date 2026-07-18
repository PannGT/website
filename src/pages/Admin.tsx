import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle2,
  Clock,
  ExternalLink,
  Eye,
  FileText,
  FolderOpen,
  LogOut,
  Pencil,
  Plus,
  RotateCcw,
  Search,
  Star,
  Trash2,
} from "lucide-react";
import Logo from "../components/Logo";
import ThemeToggle from "../components/ThemeToggle";
import PostForm from "../components/admin/PostForm";
import ConfirmDialog from "../components/admin/ConfirmDialog";
import DownloadMenu from "../components/admin/DownloadMenu";
import LoginGate from "../components/admin/LoginGate";
import { AUTH_SESSION_KEY } from "../lib/config";
import { deletePost, resetPosts, usePosts } from "../lib/store";
import type { Post } from "../lib/types";
import { formatDate, readingTime } from "../lib/utils";

/**
 * Halaman dashboard admin (/admin).
 * - Kata sandi diatur di src/lib/config.ts
 * - Komponen pendukung ada di src/components/admin/
 */
export default function Admin() {
  const [authed, setAuthed] = useState(
    () => sessionStorage.getItem(AUTH_SESSION_KEY) === "1"
  );

  if (!authed) {
    return <LoginGate onSuccess={() => setAuthed(true)} />;
  }

  return (
    <Dashboard
      onLogout={() => {
        sessionStorage.removeItem(AUTH_SESSION_KEY);
        setAuthed(false);
      }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Tipe state internal dashboard                                      */
/* ------------------------------------------------------------------ */

type ConfirmState = { kind: "delete"; post: Post } | { kind: "reset" } | null;

/* ------------------------------------------------------------------ */
/*  Dashboard utama                                                    */
/* ------------------------------------------------------------------ */

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const posts = usePosts();
  const [search, setSearch] = useState("");
  const [formState, setFormState] = useState<{ open: boolean; post: Post | null }>({
    open: false,
    post: null,
  });
  const [confirm, setConfirm] = useState<ConfirmState>(null);
  const [toasts, setToasts] = useState<{ id: number; message: string }[]>([]);

  /** Tampilkan notifikasi toast, hilang otomatis setelah 3,2 detik */
  const pushToast = (message: string) => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, message }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3200);
  };

  const categories = useMemo(
    () => [...new Set(posts.map((p) => p.category))],
    [posts]
  );

  /** Filter tabel berdasarkan kata kunci pencarian */
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter((p) =>
      [p.title, p.category, p.author, ...p.tags]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [posts, search]);

  const avgRead = posts.length
    ? Math.round(
        posts.reduce((sum, p) => sum + readingTime(p.content), 0) / posts.length
      )
    : 0;

  const stats = [
    { Icon: FileText, label: "Total Artikel", value: String(posts.length) },
    { Icon: FolderOpen, label: "Kategori", value: String(categories.length) },
    { Icon: Star, label: "Artikel Unggulan", value: String(posts.filter((p) => p.featured).length) },
    { Icon: Clock, label: "Rata-rata Baca", value: `${avgRead} mnt` },
  ];

  /** Eksekusi aksi dari dialog konfirmasi (hapus / reset) */
  const handleConfirm = () => {
    if (confirm?.kind === "delete") {
      deletePost(confirm.post.id);
      pushToast(`Artikel "${confirm.post.title}" telah dihapus.`);
    } else if (confirm?.kind === "reset") {
      resetPosts();
      pushToast("Data berhasil dikembalikan ke kondisi awal.");
    }
    setConfirm(null);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 transition-colors duration-300 dark:bg-navy-950 dark:text-slate-100">
      {/* ===== Header admin ===== */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/85 backdrop-blur-xl dark:border-white/10 dark:bg-navy-950/85">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Logo />
            <span className="hidden rounded-full bg-blue-50 px-3 py-1 text-xs font-bold tracking-wide text-blue-700 uppercase sm:inline-block dark:bg-blue-500/10 dark:text-sky-300">
              Admin
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            <ThemeToggle />
            <Link
              to="/"
              className="hidden items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition-all hover:border-blue-400 hover:text-blue-600 sm:inline-flex dark:border-white/10 dark:text-slate-300 dark:hover:border-sky-400/40 dark:hover:text-sky-300"
            >
              <ExternalLink className="size-4" />
              Lihat Situs
            </Link>
            <button
              type="button"
              onClick={onLogout}
              className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-red-200 px-4 py-2.5 text-sm font-medium text-red-600 transition-all hover:bg-red-50 dark:border-red-400/20 dark:text-red-400 dark:hover:bg-red-400/10"
            >
              <LogOut className="size-4" />
              <span className="hidden sm:inline">Keluar</span>
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* ===== Judul halaman ===== */}
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Kelola seluruh postingan blog Zixpedia dari satu tempat.
          </p>
        </div>

        {/* ===== Kartu statistik ===== */}
        <div className="mt-7 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map(({ Icon, label, value }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
              className="rounded-2xl border border-slate-200 bg-white p-5 transition-colors duration-300 dark:border-white/10 dark:bg-navy-925"
            >
              <span className="grid size-10 place-items-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-sky-400">
                <Icon className="size-5" />
              </span>
              <p className="mt-3 font-display text-2xl font-bold text-slate-900 dark:text-white">
                {value}
              </p>
              <p className="text-xs font-medium tracking-wide text-slate-500 uppercase dark:text-slate-400">
                {label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ===== Toolbar: pencarian + aksi ===== */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative sm:w-80">
            <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari judul, kategori, penulis..."
              className="w-full rounded-xl border border-slate-300 bg-white py-2.5 pr-4 pl-10 text-sm text-slate-900 transition-all outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-white/10 dark:bg-white/5 dark:text-white dark:focus:border-sky-400 dark:focus:ring-sky-400/10"
            />
          </div>
          <div className="flex gap-2.5">
            <button
              type="button"
              onClick={() => setConfirm({ kind: "reset" })}
              className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-600 transition-all hover:border-amber-400 hover:text-amber-600 dark:border-white/15 dark:text-slate-300 dark:hover:border-amber-400/50 dark:hover:text-amber-400"
            >
              <RotateCcw className="size-4" />
              <span className="hidden sm:inline">Reset Data</span>
            </button>
            <DownloadMenu />
            <button
              type="button"
              onClick={() => setFormState({ open: true, post: null })}
              className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-all hover:shadow-xl hover:brightness-110"
            >
              <Plus className="size-4" />
              Tambah Artikel
            </button>
          </div>
        </div>

        {/* ===== Tabel postingan (desktop) ===== */}
        <div className="mt-5 hidden overflow-hidden rounded-2xl border border-slate-200 bg-white md:block dark:border-white/10 dark:bg-navy-925">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-xs font-semibold tracking-wide text-slate-500 uppercase dark:border-white/10 dark:bg-white/5 dark:text-slate-400">
                <th className="px-5 py-3.5">Artikel</th>
                <th className="px-5 py-3.5">Kategori</th>
                <th className="px-5 py-3.5">Tanggal</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {filtered.map((post) => (
                <tr
                  key={post.id}
                  className="transition-colors hover:bg-blue-50/50 dark:hover:bg-white/5"
                >
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3.5">
                      <img
                        src={post.cover}
                        alt={post.title}
                        className="h-11 w-16 shrink-0 rounded-lg object-cover"
                      />
                      <div className="min-w-0">
                        <p className="max-w-72 truncate font-semibold text-slate-900 dark:text-white">
                          {post.title}
                        </p>
                        <p className="max-w-72 truncate font-mono text-xs text-slate-400">
                          /post/{post.slug}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-500/10 dark:text-sky-300">
                      {post.category}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 whitespace-nowrap text-slate-500 dark:text-slate-400">
                    {formatDate(post.date)}
                  </td>
                  <td className="px-5 py-3.5">
                    {post.featured ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-600 dark:bg-amber-400/10 dark:text-amber-400">
                        <Star className="size-3 fill-amber-500 text-amber-500 dark:fill-amber-400" />
                        Unggulan
                      </span>
                    ) : (
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500 dark:bg-white/5 dark:text-slate-400">
                        Publik
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex justify-end gap-1.5">
                      <Link
                        to={`/post/${post.slug}`}
                        aria-label={`Lihat ${post.title}`}
                        className="grid size-8 place-items-center rounded-lg text-slate-400 transition-colors hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-white/10 dark:hover:text-sky-400"
                      >
                        <Eye className="size-4" />
                      </Link>
                      <button
                        type="button"
                        onClick={() => setFormState({ open: true, post })}
                        aria-label={`Edit ${post.title}`}
                        className="grid size-8 cursor-pointer place-items-center rounded-lg text-slate-400 transition-colors hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-white/10 dark:hover:text-sky-400"
                      >
                        <Pencil className="size-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfirm({ kind: "delete", post })}
                        aria-label={`Hapus ${post.title}`}
                        className="grid size-8 cursor-pointer place-items-center rounded-lg text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-400/10 dark:hover:text-red-400"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-14 text-center text-slate-400">
                    Tidak ada postingan yang cocok dengan pencarian Anda.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ===== Daftar postingan (mobile) ===== */}
        <div className="mt-5 space-y-3 md:hidden">
          {filtered.map((post) => (
            <div
              key={post.id}
              className="flex gap-3.5 rounded-2xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-navy-925"
            >
              <img
                src={post.cover}
                alt={post.title}
                className="h-16 w-20 shrink-0 rounded-xl object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                  {post.title}
                </p>
                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                  {post.category} &middot; {formatDate(post.date)}
                </p>
                <div className="mt-2 flex gap-1.5">
                  <Link
                    to={`/post/${post.slug}`}
                    aria-label="Lihat artikel"
                    className="grid size-8 place-items-center rounded-lg border border-slate-200 text-slate-500 dark:border-white/10 dark:text-slate-400"
                  >
                    <Eye className="size-4" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => setFormState({ open: true, post })}
                    aria-label="Edit artikel"
                    className="grid size-8 cursor-pointer place-items-center rounded-lg border border-slate-200 text-slate-500 dark:border-white/10 dark:text-slate-400"
                  >
                    <Pencil className="size-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirm({ kind: "delete", post })}
                    aria-label="Hapus artikel"
                    className="grid size-8 cursor-pointer place-items-center rounded-lg border border-red-200 text-red-500 dark:border-red-400/20 dark:text-red-400"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <p className="rounded-2xl border border-dashed border-slate-300 py-12 text-center text-sm text-slate-400 dark:border-white/15">
              Tidak ada postingan yang cocok.
            </p>
          )}
        </div>
      </main>

      {/* ===== Modal form tambah/edit ===== */}
      <AnimatePresence>
        {formState.open && (
          <PostForm
            key={formState.post?.id ?? "new"}
            initial={formState.post}
            existingCategories={categories}
            onClose={() => setFormState({ open: false, post: null })}
            onSaved={(msg) => {
              setFormState({ open: false, post: null });
              pushToast(msg);
            }}
          />
        )}
      </AnimatePresence>

      {/* ===== Dialog konfirmasi hapus / reset ===== */}
      <AnimatePresence>
        {confirm && (
          <ConfirmDialog
            title={confirm.kind === "delete" ? "Hapus Artikel?" : "Reset Semua Data?"}
            message={
              confirm.kind === "delete"
                ? `Artikel "${confirm.post.title}" akan dihapus permanen dan tidak dapat dikembalikan.`
                : "Seluruh perubahan akan dibuang dan data artikel dikembalikan ke kondisi awal."
            }
            confirmLabel={confirm.kind === "delete" ? "Ya, Hapus" : "Ya, Reset"}
            onConfirm={handleConfirm}
            onCancel={() => setConfirm(null)}
          />
        )}
      </AnimatePresence>

      {/* ===== Toast notifikasi ===== */}
      <div className="pointer-events-none fixed right-4 bottom-4 z-[60] flex w-full max-w-sm flex-col gap-2">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.96 }}
              className="pointer-events-auto flex items-center gap-3 rounded-xl border border-emerald-200 bg-white px-4 py-3 shadow-xl dark:border-emerald-400/20 dark:bg-navy-925"
            >
              <CheckCircle2 className="size-5 shrink-0 text-emerald-500" />
              <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                {toast.message}
              </p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
