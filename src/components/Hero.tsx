import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  FileText,
  FolderOpen,
  PenSquare,
  Sparkles,
  Users,
} from "lucide-react";
import { usePosts } from "../lib/store";

/** Hero section beranda dengan gradasi biru, statistik, dan CTA */
export default function Hero() {
  const posts = usePosts();
  const categoryCount = new Set(posts.map((p) => p.category)).size;
  const authorCount = new Set(posts.map((p) => p.author)).size;

  const scrollToArticles = () =>
    document.getElementById("artikel")?.scrollIntoView({ behavior: "smooth" });

  const stats = [
    { Icon: FileText, value: `${posts.length}+`, label: "Artikel" },
    { Icon: FolderOpen, value: `${categoryCount}`, label: "Kategori" },
    { Icon: Users, value: `${authorCount}`, label: "Penulis" },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-slate-50 to-slate-50 transition-colors duration-300 dark:from-navy-900 dark:via-navy-950 dark:to-navy-950">
      {/* Pola grid dekoratif */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(37,99,235,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(37,99,235,0.06)_1px,transparent_1px)] bg-[size:36px_36px] dark:bg-[linear-gradient(to_right,rgba(96,165,250,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(96,165,250,0.05)_1px,transparent_1px)]"
      />
      {/* Blob gradasi dekoratif */}
      <div
        aria-hidden
        className="absolute -top-24 -left-24 size-96 rounded-full bg-blue-400/25 blur-3xl dark:bg-blue-600/15"
      />
      <div
        aria-hidden
        className="absolute -top-10 -right-24 size-80 rounded-full bg-sky-300/25 blur-3xl dark:bg-sky-500/10"
      />

      <div className="relative mx-auto max-w-7xl px-4 pt-20 pb-16 sm:px-6 sm:pt-24 sm:pb-20 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/70 px-4 py-1.5 text-sm font-medium text-blue-700 backdrop-blur dark:border-sky-400/20 dark:bg-sky-400/10 dark:text-sky-300"
          >
            <Sparkles className="size-4" />
            Blog Teknologi &amp; Web Development
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="mt-6 font-display text-4xl leading-tight font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-white"
          >
            Jelajahi Wawasan{" "}
            <span className="bg-gradient-to-r from-blue-600 to-sky-400 bg-clip-text text-transparent dark:from-blue-400 dark:to-sky-300">
              Teknologi
            </span>{" "}
            bersama Zixpedia
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-400"
          >
            Kumpulan artikel, tutorial, dan panduan mendalam seputar pengembangan
            web, desain antarmuka, dan tren digital — ditulis dengan bahasa yang
            mudah dipahami.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.3 }}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <button
              type="button"
              onClick={scrollToArticles}
              className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-3.5 text-sm font-semibold text-white shadow-xl shadow-blue-600/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-blue-600/30 sm:w-auto"
            >
              Mulai Membaca
              <ArrowRight className="size-4" />
            </button>
            <Link
              to="/admin"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white/70 px-6 py-3.5 text-sm font-semibold text-slate-700 backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-400 hover:text-blue-700 sm:w-auto dark:border-white/15 dark:bg-white/5 dark:text-slate-200 dark:hover:border-sky-400/50 dark:hover:text-sky-300"
            >
              <PenSquare className="size-4" />
              Tulis Artikel
            </Link>
          </motion.div>

          {/* Statistik */}
          <motion.dl
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.4 }}
            className="mx-auto mt-12 grid max-w-lg grid-cols-3 divide-x divide-slate-200 rounded-2xl border border-slate-200 bg-white/70 py-5 backdrop-blur dark:divide-white/10 dark:border-white/10 dark:bg-white/5"
          >
            {stats.map(({ Icon, value, label }) => (
              <div key={label} className="flex flex-col items-center gap-1 px-4">
                <Icon className="size-4 text-blue-500 dark:text-sky-400" />
                <dd className="font-display text-2xl font-bold text-slate-900 dark:text-white">
                  {value}
                </dd>
                <dt className="text-xs font-medium tracking-wide text-slate-500 uppercase dark:text-slate-400">
                  {label}
                </dt>
              </div>
            ))}
          </motion.dl>
        </div>
      </div>
    </section>
  );
}
