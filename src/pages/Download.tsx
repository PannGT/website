import { motion } from "framer-motion";
import {
  CheckCircle2,
  Code2,
  Download,
  FileArchive,
  FolderOpen,
  Globe,
  KeyRound,
  Server,
  Terminal,
  Upload,
} from "lucide-react";
import { ADMIN_PASSWORD } from "../lib/config";

const CPANEL_STEPS = [
  "Download file zixpedia-cpanel.zip dari halaman ini.",
  "Login ke cPanel hosting Anda, lalu buka File Manager.",
  "Masuk ke folder public_html, lalu klik tombol Upload.",
  "Unggah file zixpedia-cpanel.zip hingga selesai.",
  "Klik kanan file zip, pilih Extract, lalu Extract File(s).",
  "Pastikan file .htaccess ikut terekstrak (aktifkan Show Hidden Files di Settings).",
  "Hapus file zip setelah ekstrak selesai (opsional).",
  "Buka domain Anda — website Zixpedia siap digunakan.",
];

const DEV_COMMANDS = [
  { cmd: "npm install", desc: "install dependensi (Node.js 18+)" },
  { cmd: "npm run dev", desc: "jalankan mode pengembangan" },
  { cmd: "npm run build", desc: "build production ke folder dist/" },
];

const packages = [
  {
    Icon: Server,
    title: "Versi cPanel (Siap Upload)",
    file: "zixpedia-cpanel.zip",
    href: "/download/zixpedia-cpanel.zip",
    desc: "Hasil build production. Tinggal unggah dan ekstrak ke public_html — tanpa perlu coding sama sekali.",
    features: [
      "Sudah termasuk .htaccess untuk routing Apache",
      "Aset terkompresi & cache headers optimal",
      "Cocok untuk shared hosting (Niagahoster, Hostinger, dll)",
    ],
    primary: true,
  },
  {
    Icon: Code2,
    title: "Source Code Lengkap",
    file: "zixpedia-source.zip",
    href: "/download/zixpedia-source.zip",
    desc: "Kode sumber penuh untuk dikembangkan lebih lanjut: React 19, TypeScript, Tailwind CSS v4, dan panduan di dalamnya.",
    features: [
      "Struktur folder terorganisir & terdokumentasi",
      "Termasuk README-PANDUAN.md berbahasa Indonesia",
      "Mudah dikembangkan: ganti konten di src/lib/seed.ts",
    ],
    primary: false,
  },
];

/** Halaman download source code & panduan upload ke cPanel */
export default function DownloadPage() {
  return (
    <>
      {/* Kepala halaman */}
      <header className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-b from-blue-50 to-slate-50 dark:border-white/10 dark:from-navy-900 dark:to-navy-950">
        <div
          aria-hidden
          className="absolute -top-20 right-0 size-72 rounded-full bg-blue-400/20 blur-3xl dark:bg-blue-600/10"
        />
        <div className="relative mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/70 px-4 py-1.5 text-sm font-medium text-blue-700 backdrop-blur dark:border-sky-400/20 dark:bg-sky-400/10 dark:text-sky-300"
          >
            <FileArchive className="size-4" />
            Gratis & Siap Pakai
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="mt-5 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white"
          >
            Download Source Code{" "}
            <span className="bg-gradient-to-r from-blue-600 to-sky-400 bg-clip-text text-transparent dark:from-blue-400 dark:to-sky-300">
              Zixpedia
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="mx-auto mt-4 max-w-2xl leading-relaxed text-slate-600 dark:text-slate-400"
          >
            Pilih paket yang Anda butuhkan: versi siap upload ke hosting cPanel,
            atau source code lengkap untuk dikembangkan sendiri.
          </motion.p>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        {/* Kartu download */}
        <div className="grid gap-6 md:grid-cols-2">
          {packages.map(({ Icon, title, file, href, desc, features, primary }, i) => (
            <motion.div
              key={file}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className={`flex flex-col rounded-2xl border p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                primary
                  ? "border-blue-200 bg-gradient-to-br from-blue-50 to-white hover:shadow-blue-600/10 dark:border-sky-400/20 dark:from-navy-900 dark:to-navy-925 dark:hover:shadow-sky-500/5"
                  : "border-slate-200 bg-white hover:shadow-slate-900/5 dark:border-white/10 dark:bg-navy-925"
              }`}
            >
              <span
                className={`grid size-12 place-items-center rounded-2xl text-white shadow-lg ${
                  primary
                    ? "bg-gradient-to-br from-blue-600 to-sky-400 shadow-blue-600/30"
                    : "bg-gradient-to-br from-slate-700 to-slate-500 shadow-slate-600/20 dark:from-blue-500 dark:to-navy-700 dark:shadow-blue-500/20"
                }`}
              >
                <Icon className="size-6" />
              </span>
              <h2 className="mt-5 font-display text-xl font-bold text-slate-900 dark:text-white">
                {title}
              </h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {desc}
              </p>
              <ul className="mt-4 space-y-2">
                {features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-300"
                  >
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href={href}
                download={file}
                className={`mt-6 inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-300 ${
                  primary
                    ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-600/25 hover:-translate-y-0.5 hover:shadow-xl"
                    : "border border-slate-300 text-slate-700 hover:border-blue-400 hover:text-blue-700 dark:border-white/15 dark:text-slate-200 dark:hover:border-sky-400/50 dark:hover:text-sky-300"
                }`}
              >
                <Download className="size-4" />
                Download {file}
              </a>
            </motion.div>
          ))}
        </div>

        {/* Panduan cPanel */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-14 grid gap-6 lg:grid-cols-2"
        >
          <div className="rounded-2xl border border-slate-200 bg-white p-7 dark:border-white/10 dark:bg-navy-925">
            <span className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-blue-600 uppercase dark:text-sky-400">
              <Upload className="size-4" />
              Panduan Upload
            </span>
            <h2 className="mt-2 font-display text-2xl font-bold text-slate-900 dark:text-white">
              Cara Upload ke cPanel
            </h2>
            <ol className="mt-6 space-y-4">
              {CPANEL_STEPS.map((step, i) => (
                <li key={step} className="flex items-start gap-3.5">
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-blue-600 text-xs font-bold text-white">
                    {i + 1}
                  </span>
                  <p className="pt-0.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {step}
                  </p>
                </li>
              ))}
            </ol>
            <div className="mt-6 flex items-start gap-3 rounded-xl bg-amber-50 px-4 py-3.5 text-sm text-amber-800 dark:bg-amber-400/10 dark:text-amber-300">
              <FolderOpen className="mt-0.5 size-4 shrink-0" />
              <p>
                File <code className="font-mono font-semibold">.htaccess</code> wajib
                ada agar URL artikel dan halaman /admin tidak error 404 di
                Apache. Jika website dipasang di subfolder, ubah{" "}
                <code className="font-mono font-semibold">RewriteBase /</code>{" "}
                sesuai nama subfolder.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            {/* Panduan development */}
            <div className="flex-1 rounded-2xl border border-slate-200 bg-white p-7 dark:border-white/10 dark:bg-navy-925">
              <span className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-blue-600 uppercase dark:text-sky-400">
                <Terminal className="size-4" />
                Pengembangan Lokal
              </span>
              <h2 className="mt-2 font-display text-2xl font-bold text-slate-900 dark:text-white">
                Menjalankan Source Code
              </h2>
              <div className="mt-5 space-y-2.5">
                {DEV_COMMANDS.map(({ cmd, desc }) => (
                  <div
                    key={cmd}
                    className="flex items-center justify-between gap-4 rounded-xl border border-navy-800 bg-navy-950 px-4 py-3"
                  >
                    <code className="font-mono text-sm text-sky-300">{cmd}</code>
                    <span className="text-right text-xs text-slate-400">{desc}</span>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                Setelah <code className="font-mono text-xs">npm run build</code>,
                upload seluruh isi folder{" "}
                <code className="font-mono text-xs">dist/</code> ke public_html.
              </p>
            </div>

            {/* Info admin */}
            <div className="rounded-2xl bg-gradient-to-br from-blue-700 via-blue-600 to-sky-500 p-7 text-white">
              <span className="grid size-11 place-items-center rounded-xl bg-white/15">
                <KeyRound className="size-5" />
              </span>
              <h3 className="mt-4 font-display text-lg font-bold">
                Akses Dashboard Admin
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-blue-100">
                Setelah website online, buka{" "}
                <code className="rounded bg-white/15 px-1.5 py-0.5 font-mono text-xs">
                  domainanda.com/admin
                </code>{" "}
                lalu masuk dengan kata sandi demo:
              </p>
              <p className="mt-3 inline-block rounded-xl bg-white/15 px-4 py-2 font-mono text-sm font-bold tracking-wider">
                {ADMIN_PASSWORD}
              </p>
              <p className="mt-3 flex items-start gap-2 text-xs leading-relaxed text-blue-100">
                <Globe className="mt-0.5 size-3.5 shrink-0" />
                Data artikel tersimpan di localStorage browser. Detail lengkap
                ada di README-PANDUAN.md dalam paket source code.
              </p>
            </div>
          </div>
        </motion.section>
      </div>
    </>
  );
}
