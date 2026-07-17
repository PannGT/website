/**
 * ============================================================
 *  KONFIGURASI UTAMA ZIXPEDIA
 * ------------------------------------------------------------
 *  File ini adalah "satu pintu" untuk kustomisasi cepat.
 *  Ubah branding, kontak, sosial media, dan kata sandi admin
 *  di sini tanpa perlu menyentuh file komponen.
 * ============================================================
 */

import {
  Github,
  Instagram,
  Linkedin,
  Twitter,
  type LucideIcon,
} from "lucide-react";

/* ---------- Identitas situs ---------- */

export const SITE = {
  /** Nama brand (dipakai di footer & teks copyright) */
  name: "Zixpedia",
  /** Slogan singkat */
  tagline: "Blog Teknologi & Web Development",
  /** Deskripsi singkat yang tampil di footer */
  description:
    "Blog teknologi berbahasa Indonesia yang membahas web development, desain antarmuka, dan wawasan digital terkini.",
  /** Email kontak yang tampil di footer */
  email: "halo@zixpedia.id",
} as const;

/* ---------- Dashboard admin ---------- */

/** Kata sandi masuk halaman /admin - GANTI sebelum website online! */
export const ADMIN_PASSWORD = "admin123";

/** Tampilkan hint kata sandi di halaman login? (berguna untuk demo) */
export const ADMIN_SHOW_HINT = true;

/** Kunci sessionStorage untuk status login admin */
export const AUTH_SESSION_KEY = "zixpedia_admin_auth";

/* ---------- Sosial media (tampil di footer) ---------- */

export interface SocialLink {
  label: string;
  href: string;
  Icon: LucideIcon;
}

export const SOCIAL_LINKS: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/zixpedia", Icon: Github },
  { label: "Twitter", href: "https://twitter.com/zixpedia", Icon: Twitter },
  { label: "Instagram", href: "https://instagram.com/zixpedia", Icon: Instagram },
  { label: "LinkedIn", href: "https://linkedin.com/company/zixpedia", Icon: Linkedin },
];
