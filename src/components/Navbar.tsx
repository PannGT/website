import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { LayoutDashboard, Menu, Newspaper, X } from "lucide-react";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import { cn } from "../lib/utils";

/** Navbar utama: sticky, blur saat scroll, menu mobile responsif */
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Tutup menu mobile setiap kali berpindah halaman
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const scrollToArticles = () => {
    const doScroll = () =>
      document.getElementById("artikel")?.scrollIntoView({ behavior: "smooth" });
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(doScroll, 150);
    } else {
      doScroll();
    }
  };

  const linkBase =
    "rounded-lg px-3.5 py-2 text-sm font-medium transition-colors duration-200";

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b backdrop-blur-xl transition-all duration-300",
        scrolled
          ? "border-slate-200 bg-white/85 shadow-sm dark:border-white/10 dark:bg-navy-950/85"
          : "border-transparent bg-white/60 dark:bg-navy-950/60"
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Logo />

        {/* Navigasi desktop */}
        <div className="hidden items-center gap-1 md:flex">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              cn(
                linkBase,
                isActive
                  ? "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-sky-300"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-white"
              )
            }
          >
            Beranda
          </NavLink>
          <button
            type="button"
            onClick={scrollToArticles}
            className={cn(
              linkBase,
              "cursor-pointer text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-white"
            )}
          >
            Artikel
          </button>
        </div>

        <div className="hidden items-center gap-2.5 md:flex">
          <ThemeToggle />
          <Link
            to="/admin"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-all duration-300 hover:shadow-xl hover:shadow-blue-600/30 hover:brightness-110"
          >
            <LayoutDashboard className="size-4" />
            Dashboard
          </Link>
        </div>

        {/* Tombol mobile */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Tutup menu" : "Buka menu"}
            className="grid size-10 cursor-pointer place-items-center rounded-xl border border-slate-200 bg-white text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {/* Menu mobile */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-slate-200 bg-white/95 backdrop-blur-xl md:hidden dark:border-white/10 dark:bg-navy-950/95"
          >
            <div className="space-y-1.5 px-4 py-4">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium",
                    isActive
                      ? "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-sky-300"
                      : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/5"
                  )
                }
              >
                <Newspaper className="size-4" />
                Beranda
              </NavLink>
              <button
                type="button"
                onClick={scrollToArticles}
                className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/5"
              >
                <Menu className="size-4" />
                Artikel
              </button>
              <Link
                to="/admin"
                className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/25"
              >
                <LayoutDashboard className="size-4" />
                Dashboard Admin
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
