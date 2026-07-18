import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import type { Post } from "../lib/types";
import { formatDate, initials, readingTime } from "../lib/utils";

interface PostCardProps {
  post: Post;
  index?: number;
}

/** Kartu artikel untuk grid daftar postingan */
export default function PostCard({ post, index = 0 }: PostCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: (index % 6) * 0.06 }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-600/10 dark:border-white/10 dark:bg-navy-925 dark:hover:border-sky-400/30 dark:hover:shadow-sky-500/5"
    >
      {/* Sampul */}
      <Link
        to={`/post/${post.slug}`}
        className="relative block aspect-[16/9] overflow-hidden"
        tabIndex={-1}
      >
        <img
          src={post.cover}
          alt={post.title}
          loading="lazy"
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute top-3 left-3 rounded-full bg-blue-600/90 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
          {post.category}
        </span>
      </Link>

      {/* Isi kartu */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="size-3.5" />
            {formatDate(post.date)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="size-3.5" />
            {readingTime(post.content)} mnt baca
          </span>
        </div>

        <Link to={`/post/${post.slug}`} className="mt-3 block">
          <h3 className="font-display text-lg leading-snug font-bold text-slate-900 transition-colors duration-200 line-clamp-2 group-hover:text-blue-600 dark:text-white dark:group-hover:text-sky-300">
            {post.title}
          </h3>
        </Link>

        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 line-clamp-3 dark:text-slate-400">
          {post.excerpt}
        </p>

        <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-white/5">
          <span className="inline-flex items-center gap-2.5">
            <span className="grid size-8 place-items-center rounded-full bg-gradient-to-br from-blue-600 to-sky-400 text-xs font-bold text-white">
              {initials(post.author)}
            </span>
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {post.author}
            </span>
          </span>
          <Link
            to={`/post/${post.slug}`}
            aria-label={`Baca ${post.title}`}
            className="grid size-8 place-items-center rounded-full border border-slate-200 text-slate-500 transition-all duration-200 group-hover:border-blue-500 group-hover:bg-blue-600 group-hover:text-white dark:border-white/10 dark:text-slate-400 dark:group-hover:border-sky-400 dark:group-hover:bg-sky-400 dark:group-hover:text-navy-950"
          >
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
