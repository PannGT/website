import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  Clock,
  Newspaper,
  SearchX,
  Star,
} from "lucide-react";
import Hero from "../components/Hero";
import PostCard from "../components/PostCard";
import Sidebar from "../components/Sidebar";
import { usePosts } from "../lib/store";
import { formatDate, initials, readingTime } from "../lib/utils";

/** Halaman beranda: hero, artikel unggulan, grid artikel & sidebar */
export default function Home() {
  const posts = usePosts();
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("kategori") ?? "Semua";
  const [query, setQuery] = useState("");

  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    posts.forEach((p) => counts.set(p.category, (counts.get(p.category) ?? 0) + 1));
    return [
      { name: "Semua", count: posts.length },
      ...[...counts.entries()].map(([name, count]) => ({ name, count })),
    ];
  }, [posts]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      if (category !== "Semua" && p.category !== category) return false;
      if (!q) return true;
      const haystack = [p.title, p.excerpt, p.category, p.author, ...p.tags]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [posts, category, query]);

  const featured = posts.find((p) => p.featured) ?? posts[0];
  const showFeatured = Boolean(featured) && category === "Semua" && !query.trim();
  const list = showFeatured ? filtered.filter((p) => p.id !== featured?.id) : filtered;
  const isFiltering = category !== "Semua" || Boolean(query.trim());

  const selectCategory = (name: string) => {
    if (name === "Semua") {
      searchParams.delete("kategori");
      setSearchParams(searchParams, { preventScrollReset: true });
    } else {
      setSearchParams({ kategori: name }, { preventScrollReset: true });
    }
  };

  const resetFilter = () => {
    setQuery("");
    searchParams.delete("kategori");
    setSearchParams(searchParams, { preventScrollReset: true });
  };

  return (
    <>
      <Hero />

      <section id="artikel" className="scroll-mt-20">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          {/* Kepala section */}
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-blue-600 uppercase dark:text-sky-400">
                <Newspaper className="size-4" />
                Blog Zixpedia
              </span>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
                {category === "Semua" ? "Artikel Terbaru" : `Kategori: ${category}`}
              </h2>
              <p className="mt-2 max-w-xl text-slate-600 dark:text-slate-400">
                {isFiltering
                  ? `Menampilkan ${filtered.length} artikel yang cocok dengan filter Anda.`
                  : "Baca tulisan terbaru dari tim redaksi dan kontributor Zixpedia."}
              </p>
            </div>
            {isFiltering && (
              <button
                type="button"
                onClick={resetFilter}
                className="cursor-pointer rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:border-blue-400 hover:text-blue-600 dark:border-white/15 dark:text-slate-300 dark:hover:border-sky-400/50 dark:hover:text-sky-300"
              >
                Reset Filter
              </button>
            )}
          </div>

          <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
            {/* Kolom utama */}
            <div className="min-w-0">
              {/* Artikel unggulan */}
              {showFeatured && featured && (
                <motion.article
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="group mb-10 grid overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:border-blue-300 hover:shadow-2xl hover:shadow-blue-600/10 md:grid-cols-2 dark:border-white/10 dark:bg-navy-925 dark:hover:border-sky-400/30"
                >
                  <Link
                    to={`/post/${featured.slug}`}
                    className="relative block aspect-[16/9] overflow-hidden md:aspect-auto md:min-h-72"
                    tabIndex={-1}
                  >
                    <img
                      src={featured.cover}
                      alt={featured.title}
                      className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-amber-400 px-3 py-1 text-xs font-bold text-amber-950">
                      <Star className="size-3.5 fill-amber-950" />
                      Unggulan
                    </span>
                  </Link>
                  <div className="flex flex-col justify-center p-6 sm:p-8">
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                      <span className="rounded-full bg-blue-50 px-3 py-1 font-semibold text-blue-700 dark:bg-blue-500/10 dark:text-sky-300">
                        {featured.category}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar className="size-3.5" />
                        {formatDate(featured.date)}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="size-3.5" />
                        {readingTime(featured.content)} mnt baca
                      </span>
                    </div>
                    <Link to={`/post/${featured.slug}`} className="mt-4 block">
                      <h3 className="font-display text-2xl leading-snug font-bold text-slate-900 transition-colors group-hover:text-blue-600 sm:text-3xl dark:text-white dark:group-hover:text-sky-300">
                        {featured.title}
                      </h3>
                    </Link>
                    <p className="mt-3 leading-relaxed text-slate-600 line-clamp-3 dark:text-slate-400">
                      {featured.excerpt}
                    </p>
                    <div className="mt-6 flex items-center justify-between">
                      <span className="inline-flex items-center gap-2.5">
                        <span className="grid size-9 place-items-center rounded-full bg-gradient-to-br from-blue-600 to-sky-400 text-xs font-bold text-white">
                          {initials(featured.author)}
                        </span>
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                          {featured.author}
                        </span>
                      </span>
                      <Link
                        to={`/post/${featured.slug}`}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition-all hover:gap-3 dark:text-sky-400"
                      >
                        Baca Selengkapnya
                        <ArrowRight className="size-4" />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              )}

              {/* Grid artikel */}
              {list.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2">
                  {list.map((post, i) => (
                    <PostCard key={post.id} post={post} index={i} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center rounded-2xl border border-dashed border-slate-300 py-20 text-center dark:border-white/15">
                  <span className="grid size-14 place-items-center rounded-2xl bg-blue-50 text-blue-500 dark:bg-blue-500/10 dark:text-sky-400">
                    <SearchX className="size-7" />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-bold text-slate-900 dark:text-white">
                    Tidak ada artikel ditemukan
                  </h3>
                  <p className="mt-1 max-w-sm text-sm text-slate-500 dark:text-slate-400">
                    Coba kata kunci lain atau reset filter untuk melihat seluruh
                    artikel Zixpedia.
                  </p>
                  <button
                    type="button"
                    onClick={resetFilter}
                    className="mt-5 cursor-pointer rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-blue-700"
                  >
                    Reset Filter
                  </button>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <Sidebar
              posts={posts}
              categories={categories}
              activeCategory={category}
              onSelectCategory={selectCategory}
              query={query}
              onQueryChange={setQuery}
            />
          </div>
        </div>
      </section>
    </>
  );
}
