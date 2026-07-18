import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import Logo from "./Logo";
import { usePosts } from "../lib/store";
import { SITE, SOCIAL_LINKS } from "../lib/config";

/**
 * Footer situs: brand, navigasi, kategori, kontak & sosial media.
 * Teks brand, email, dan sosial media diatur di src/lib/config.ts.
 */
export default function Footer() {
  const posts = usePosts();
  const categories = [...new Set(posts.map((p) => p.category))];

  return (
    <footer className="border-t border-slate-200 bg-white transition-colors duration-300 dark:border-white/10 dark:bg-navy-925">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              {SITE.description}
            </p>
            <div className="mt-5 flex gap-2.5">
              {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="grid size-9 place-items-center rounded-lg border border-slate-200 text-slate-500 transition-all duration-200 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600 dark:border-white/10 dark:text-slate-400 dark:hover:border-sky-400/40 dark:hover:bg-sky-400/10 dark:hover:text-sky-400"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigasi */}
          <div>
            <h3 className="font-display text-sm font-semibold tracking-wide text-slate-900 uppercase dark:text-white">
              Navigasi
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link
                  to="/"
                  className="text-slate-600 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-sky-400"
                >
                  Beranda
                </Link>
              </li>
              <li>
                <Link
                  to="/?kategori=Semua"
                  className="text-slate-600 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-sky-400"
                >
                  Semua Artikel
                </Link>
              </li>
              <li>
                <Link
                  to="/admin"
                  className="text-slate-600 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-sky-400"
                >
                  Dashboard Admin
                </Link>
              </li>
              <li>
                <Link
                  to="/download"
                  className="text-slate-600 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-sky-400"
                >
                  Download Source Code
                </Link>
              </li>
            </ul>
          </div>

          {/* Kategori */}
          <div>
            <h3 className="font-display text-sm font-semibold tracking-wide text-slate-900 uppercase dark:text-white">
              Kategori
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {categories.map((cat) => (
                <li key={cat}>
                  <Link
                    to={`/?kategori=${encodeURIComponent(cat)}`}
                    className="text-slate-600 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-sky-400"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <h3 className="font-display text-sm font-semibold tracking-wide text-slate-900 uppercase dark:text-white">
              Kontak
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              Punya ide artikel atau ingin berkolaborasi? Kirim pesan kepada tim
              redaksi kami.
            </p>
            <a
              href={`mailto:${SITE.email}`}
              className="mt-4 inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition-all duration-200 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700 dark:border-white/10 dark:text-slate-300 dark:hover:border-sky-400/40 dark:hover:bg-sky-400/10 dark:hover:text-sky-300"
            >
              <Mail className="size-4" />
              {SITE.email}
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-slate-200 pt-6 text-sm text-slate-500 sm:flex-row dark:border-white/10 dark:text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} {SITE.name}. Seluruh hak cipta
            dilindungi.
          </p>
          <p>
            Dibangun dengan{" "}
            <span className="font-medium text-blue-600 dark:text-sky-400">React</span>{" "}
            &amp;{" "}
            <span className="font-medium text-blue-600 dark:text-sky-400">Tailwind CSS</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
