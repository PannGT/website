import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  BookOpen,
  ChevronDown,
  Code2,
  Download,
  FileCode,
  Server,
} from "lucide-react";
import { cn } from "../../lib/utils";

/** Dropdown download paket website (source code & build cPanel) */
export default function DownloadMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Tutup dropdown saat klik di luar area menu
  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const items = [
    {
      href: "/download/zixpedia-source.zip",
      file: "zixpedia-source.zip",
      Icon: Code2,
      title: "Source Code",
      desc: "React + Vite + TypeScript (kurang lebih 4,8 MB)",
    },
    {
      href: "/download/zixpedia-cpanel.zip",
      file: "zixpedia-cpanel.zip",
      Icon: Server,
      title: "Versi cPanel",
      desc: "Build siap upload ke public_html (kurang lebih 4,9 MB)",
    },
    {
      href: "/download/zixpedia-html.zip",
      file: "zixpedia-html.zip",
      Icon: FileCode,
      title: "Versi HTML Statis",
      desc: "Edit langsung via File Manager cPanel (kurang lebih 4,8 MB)",
    },
  ];

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label="Download source code website"
        className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-600 transition-all hover:border-blue-400 hover:text-blue-600 dark:border-white/15 dark:text-slate-300 dark:hover:border-sky-400/50 dark:hover:text-sky-300"
      >
        <Download className="size-4" />
        <span className="hidden sm:inline">Download</span>
        <ChevronDown
          className={cn(
            "size-3.5 transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 z-50 mt-2 w-80 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl dark:border-white/10 dark:bg-navy-925"
          >
            <p className="border-b border-slate-100 px-4 py-2.5 text-xs font-semibold tracking-wide text-slate-400 uppercase dark:border-white/5 dark:text-slate-500">
              Download Paket Website
            </p>
            {items.map(({ href, file, Icon, title, desc }) => (
              <a
                key={file}
                href={href}
                download={file}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3.5 px-4 py-3.5 transition-colors hover:bg-blue-50/60 dark:hover:bg-white/5"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-sky-400">
                  <Icon className="size-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold text-slate-900 dark:text-white">
                    {title}
                  </span>
                  <span className="block truncate text-xs text-slate-500 dark:text-slate-400">
                    {desc}
                  </span>
                </span>
                <Download className="size-4 shrink-0 text-slate-400" />
              </a>
            ))}
            <Link
              to="/download"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 border-t border-slate-100 bg-slate-50 px-4 py-3 text-xs font-semibold text-blue-600 transition-colors hover:bg-blue-50 dark:border-white/5 dark:bg-white/5 dark:text-sky-400 dark:hover:bg-white/10"
            >
              <BookOpen className="size-3.5" />
              Lihat Panduan Upload cPanel
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
