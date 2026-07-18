import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Check,
  ChevronRight,
  Clock,
  Facebook,
  FileQuestion,
  Link2,
  MessageCircle,
  Tag,
  Twitter,
} from "lucide-react";
import ContentRenderer from "../components/ContentRenderer";
import PostCard from "../components/PostCard";
import { usePosts } from "../lib/store";
import { formatDate, initials, readingTime } from "../lib/utils";

/** Halaman detail artikel dengan URL sendiri: /post/:slug */
export default function PostDetail() {
  const { slug } = useParams<{ slug: string }>();
  const posts = usePosts();
  const post = posts.find((p) => p.slug === slug);

  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  // Progress membaca berdasarkan posisi scroll
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? Math.min(100, (el.scrollTop / total) * 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!post) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-28 text-center">
        <span className="grid size-16 place-items-center rounded-2xl bg-blue-50 text-blue-500 dark:bg-blue-500/10 dark:text-sky-400">
          <FileQuestion className="size-8" />
        </span>
        <h1 className="mt-6 font-display text-2xl font-bold text-slate-900 dark:text-white">
          Artikel tidak ditemukan
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Artikel yang Anda cari mungkin telah dihapus atau alamatnya berubah.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-700"
        >
          <ArrowLeft className="size-4" />
          Kembali ke Beranda
        </Link>
      </div>
    );
  }

  const idx = posts.findIndex((p) => p.id === post.id);
  const newer = idx > 0 ? posts[idx - 1] : undefined;
  const older = idx >= 0 && idx < posts.length - 1 ? posts[idx + 1] : undefined;
  const related = posts
    .filter((p) => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  const shareUrl = window.location.href;
  const shareText = `${post.title} - Zixpedia`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard tidak tersedia
    }
  };

  const shareLinks = [
    {
      label: "Bagikan ke X",
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      Icon: Twitter,
    },
    {
      label: "Bagikan ke Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      Icon: Facebook,
    },
    {
      label: "Bagikan ke WhatsApp",
      href: `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`,
      Icon: MessageCircle,
    },
  ];

  return (
    <article>
      {/* Progress bar membaca */}
      <div
        aria-hidden
        className="fixed top-0 left-0 z-50 h-1 bg-gradient-to-r from-blue-600 to-sky-400 transition-[width] duration-150"
        style={{ width: `${progress}%` }}
      />

      {/* Kepala artikel */}
      <header className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-b from-blue-50 to-slate-50 dark:border-white/10 dark:from-navy-900 dark:to-navy-950">
        <div
          aria-hidden
          className="absolute -top-20 right-0 size-72 rounded-full bg-blue-400/20 blur-3xl dark:bg-blue-600/10"
        />
        <div className="relative mx-auto max-w-4xl px-4 pt-12 pb-10 sm:px-6">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400"
          >
            <Link to="/" className="transition-colors hover:text-blue-600 dark:hover:text-sky-400">
              Beranda
            </Link>
            <ChevronRight className="size-3.5" />
            <Link
              to={`/?kategori=${encodeURIComponent(post.category)}`}
              className="transition-colors hover:text-blue-600 dark:hover:text-sky-400"
            >
              {post.category}
            </Link>
            <ChevronRight className="size-3.5" />
            <span className="max-w-48 truncate text-slate-700 sm:max-w-none dark:text-slate-300">
              {post.title}
            </span>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="mt-6 inline-block rounded-full bg-blue-600 px-3.5 py-1 text-xs font-semibold text-white">
              {post.category}
            </span>
            <h1 className="mt-4 font-display text-3xl leading-tight font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-[2.75rem] dark:text-white">
              {post.title}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-400">
              {post.excerpt}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-500 dark:text-slate-400">
              <span className="inline-flex items-center gap-2.5">
                <span className="grid size-9 place-items-center rounded-full bg-gradient-to-br from-blue-600 to-sky-400 text-xs font-bold text-white">
                  {initials(post.author)}
                </span>
                <span className="font-medium text-slate-700 dark:text-slate-200">
                  {post.author}
                </span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="size-4" />
                {formatDate(post.date)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="size-4" />
                {readingTime(post.content)} menit baca
              </span>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Sampul */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <motion.img
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          src={post.cover}
          alt={post.title}
          className="-mt-0 mt-10 aspect-[16/9] w-full rounded-2xl border border-slate-200 object-cover shadow-xl shadow-blue-600/5 dark:border-white/10"
        />
      </div>

      {/* Isi artikel */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.2 }}
        className="mx-auto max-w-3xl px-4 py-10 sm:px-6"
      >
        <ContentRenderer content={post.content} />

        {/* Tag */}
        <div className="mt-10 flex flex-wrap items-center gap-2 border-t border-slate-200 pt-6 dark:border-white/10">
          <Tag className="size-4 text-slate-400" />
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600 dark:bg-white/5 dark:text-slate-300"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Bagikan */}
        <div className="mt-8 flex flex-wrap items-center gap-3 rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-navy-925">
          <span className="text-sm font-semibold text-slate-900 dark:text-white">
            Bagikan artikel ini:
          </span>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={copyLink}
              className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition-all hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700 dark:border-white/10 dark:text-slate-300 dark:hover:border-sky-400/40 dark:hover:bg-sky-400/10 dark:hover:text-sky-300"
            >
              {copied ? (
                <>
                  <Check className="size-4 text-emerald-500" /> Tersalin!
                </>
              ) : (
                <>
                  <Link2 className="size-4" /> Salin Tautan
                </>
              )}
            </button>
            {shareLinks.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="grid size-9 place-items-center rounded-xl border border-slate-200 text-slate-500 transition-all hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600 dark:border-white/10 dark:text-slate-400 dark:hover:border-sky-400/40 dark:hover:bg-sky-400/10 dark:hover:text-sky-300"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Kartu penulis */}
        <div className="mt-8 flex items-start gap-4 rounded-2xl border border-slate-200 bg-gradient-to-br from-blue-50 to-white p-6 dark:border-white/10 dark:from-navy-900 dark:to-navy-925">
          <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-blue-600 to-sky-400 font-display text-lg font-bold text-white">
            {initials(post.author)}
          </span>
          <div>
            <p className="text-xs font-semibold tracking-wide text-blue-600 uppercase dark:text-sky-400">
              Ditulis oleh
            </p>
            <h3 className="mt-0.5 font-display text-lg font-bold text-slate-900 dark:text-white">
              {post.author}
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              Kontributor Zixpedia yang menulis seputar {post.category.toLowerCase()} dan
              pengembangan web modern.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Navigasi artikel sebelumnya / berikutnya */}
      <nav className="mx-auto grid max-w-4xl gap-4 px-4 pb-4 sm:grid-cols-2 sm:px-6">
        {older ? (
          <Link
            to={`/post/${older.slug}`}
            className="group rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:border-blue-300 hover:shadow-lg dark:border-white/10 dark:bg-navy-925 dark:hover:border-sky-400/30"
          >
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide text-slate-400 uppercase">
              <ArrowLeft className="size-3.5" /> Artikel Sebelumnya
            </span>
            <p className="mt-2 font-display font-bold text-slate-900 transition-colors line-clamp-2 group-hover:text-blue-600 dark:text-white dark:group-hover:text-sky-300">
              {older.title}
            </p>
          </Link>
        ) : (
          <span className="hidden sm:block" />
        )}
        {newer && (
          <Link
            to={`/post/${newer.slug}`}
            className="group rounded-2xl border border-slate-200 bg-white p-5 text-right transition-all hover:border-blue-300 hover:shadow-lg dark:border-white/10 dark:bg-navy-925 dark:hover:border-sky-400/30"
          >
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide text-slate-400 uppercase">
              Artikel Berikutnya <ArrowRight className="size-3.5" />
            </span>
            <p className="mt-2 font-display font-bold text-slate-900 transition-colors line-clamp-2 group-hover:text-blue-600 dark:text-white dark:group-hover:text-sky-300">
              {newer.title}
            </p>
          </Link>
        )}
      </nav>

      {/* Artikel terkait */}
      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
            Artikel Terkait
          </h2>
          <p className="mt-1 text-slate-600 dark:text-slate-400">
            Bacaan lain seputar {post.category.toLowerCase()} yang mungkin Anda sukai.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p, i) => (
              <PostCard key={p.id} post={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
