import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import {
  CheckCircle2,
  Folder,
  Hash,
  LayoutGrid,
  Mail,
  Search,
  Send,
} from "lucide-react";
import type { Post } from "../lib/types";
import { cn, formatDate } from "../lib/utils";

interface SidebarProps {
  posts: Post[];
  categories: { name: string; count: number }[];
  activeCategory: string;
  onSelectCategory: (name: string) => void;
  query: string;
  onQueryChange: (q: string) => void;
}

/** Sidebar beranda: pencarian, kategori, artikel terbaru, tag & newsletter */
export default function Sidebar({
  posts,
  categories,
  activeCategory,
  onSelectCategory,
  query,
  onQueryChange,
}: SidebarProps) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const recents = posts.slice(0, 4);
  const tags = [...new Set(posts.flatMap((p) => p.tags))].slice(0, 12);

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    setSubscribed(true);
  };

  const cardClass =
    "rounded-2xl border border-slate-200 bg-white p-5 transition-colors duration-300 dark:border-white/10 dark:bg-navy-925";
  const titleClass =
    "font-display text-sm font-semibold tracking-wide text-slate-900 uppercase dark:text-white";

  return (
    <aside className="space-y-6">
      {/* Pencarian */}
      <div className={cardClass}>
        <h3 className={titleClass}>Pencarian</h3>
        <div className="relative mt-4">
          <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Cari artikel..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pr-4 pl-10 text-sm text-slate-900 transition-all outline-none placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-white/10 dark:bg-white/5 dark:text-white dark:focus:border-sky-400 dark:focus:bg-transparent dark:focus:ring-sky-400/10"
          />
        </div>
      </div>

      {/* Kategori */}
      <div className={cardClass}>
        <h3 className={titleClass}>Kategori</h3>
        <ul className="mt-4 space-y-1.5">
          {categories.map(({ name, count }) => {
            const active = activeCategory === name;
            return (
              <li key={name}>
                <button
                  type="button"
                  onClick={() => onSelectCategory(name)}
                  className={cn(
                    "flex w-full cursor-pointer items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all duration-200",
                    active
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-white"
                  )}
                >
                  <span className="inline-flex items-center gap-2.5">
                    {name === "Semua" ? (
                      <LayoutGrid className="size-4" />
                    ) : (
                      <Folder className="size-4" />
                    )}
                    {name}
                  </span>
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-xs font-semibold",
                      active
                        ? "bg-white/20 text-white"
                        : "bg-slate-100 text-slate-500 dark:bg-white/5 dark:text-slate-400"
                    )}
                  >
                    {count}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Artikel terbaru */}
      <div className={cardClass}>
        <h3 className={titleClass}>Artikel Terbaru</h3>
        <ul className="mt-4 space-y-4">
          {recents.map((post) => (
            <li key={post.id}>
              <Link to={`/post/${post.slug}`} className="group flex gap-3.5">
                <img
                  src={post.cover}
                  alt={post.title}
                  loading="lazy"
                  className="size-16 shrink-0 rounded-xl object-cover"
                />
                <div className="min-w-0">
                  <h4 className="text-sm leading-snug font-semibold text-slate-800 transition-colors line-clamp-2 group-hover:text-blue-600 dark:text-slate-200 dark:group-hover:text-sky-300">
                    {post.title}
                  </h4>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-500">
                    {formatDate(post.date)}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Tag */}
      <div className={cardClass}>
        <h3 className={titleClass}>Tag Populer</h3>
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => onQueryChange(tag)}
              className="inline-flex cursor-pointer items-center gap-1 rounded-full border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition-all duration-200 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700 dark:border-white/10 dark:text-slate-400 dark:hover:border-sky-400/40 dark:hover:bg-sky-400/10 dark:hover:text-sky-300"
            >
              <Hash className="size-3" />
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-700 via-blue-600 to-sky-500 p-5 text-white">
        <div
          aria-hidden
          className="absolute -top-10 -right-10 size-36 rounded-full bg-white/10 blur-2xl"
        />
        <div className="relative">
          <span className="grid size-10 place-items-center rounded-xl bg-white/15">
            <Mail className="size-5" />
          </span>
          <h3 className="mt-3 font-display text-base font-bold">
            Newsletter Zixpedia
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-blue-100">
            Dapatkan artikel terbaru langsung di email Anda, tanpa spam.
          </p>

          {subscribed ? (
            <p className="mt-4 inline-flex items-center gap-2 rounded-xl bg-white/15 px-4 py-2.5 text-sm font-medium">
              <CheckCircle2 className="size-4" />
              Berhasil! Silakan cek email Anda.
            </p>
          ) : (
            <form onSubmit={handleSubscribe} className="mt-4 flex gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com"
                className="min-w-0 flex-1 rounded-xl border border-white/20 bg-white/10 px-3.5 py-2.5 text-sm text-white outline-none placeholder:text-blue-200 focus:border-white/50 focus:bg-white/15"
              />
              <button
                type="submit"
                aria-label="Berlangganan newsletter"
                className="grid size-10 shrink-0 cursor-pointer place-items-center rounded-xl bg-white text-blue-700 transition-all duration-200 hover:bg-blue-50"
              >
                <Send className="size-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </aside>
  );
}
