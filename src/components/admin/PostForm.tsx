import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check, Star, X } from "lucide-react";
import type { Post, PostFormData } from "../../lib/types";
import { COVER_PRESETS } from "../../lib/seed";
import { createPost, updatePost } from "../../lib/store";
import { cn, slugify } from "../../lib/utils";

interface PostFormProps {
  /** null = mode tambah artikel baru */
  initial: Post | null;
  existingCategories: string[];
  onClose: () => void;
  onSaved: (message: string) => void;
}

type Errors = Partial<
  Record<
    "title" | "category" | "author" | "date" | "cover" | "excerpt" | "content",
    string
  >
>;

const inputClass =
  "w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 transition-all outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-white/10 dark:bg-white/5 dark:text-white dark:focus:border-sky-400 dark:focus:ring-sky-400/10";
const labelClass =
  "mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-200";
const errorInput = "border-red-400 dark:border-red-400/60";

/** Form modal untuk menambah / mengedit artikel */
export default function PostForm({
  initial,
  existingCategories,
  onClose,
  onSaved,
}: PostFormProps) {
  /* ---------- State field formulir ---------- */
  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(initial));
  const [category, setCategory] = useState(initial?.category ?? "");
  const [author, setAuthor] = useState(initial?.author ?? "");
  const [date, setDate] = useState(
    initial?.date ?? new Date().toISOString().slice(0, 10)
  );
  const [tagsInput, setTagsInput] = useState(initial?.tags.join(", ") ?? "");
  const [cover, setCover] = useState(initial?.cover ?? COVER_PRESETS[0]);
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? "");
  const [content, setContent] = useState(initial?.content ?? "");
  const [featured, setFeatured] = useState(initial?.featured ?? false);
  const [errors, setErrors] = useState<Errors>({});

  // Kunci scroll body & tutup dengan tombol Escape
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  /** Slug otomatis mengikuti judul selama belum diedit manual */
  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!slugTouched) setSlug(slugify(value));
  };

  /* ---------- Validasi & simpan ---------- */

  const validate = (): boolean => {
    const next: Errors = {};
    if (title.trim().length < 3) next.title = "Judul minimal 3 karakter.";
    if (!category.trim()) next.category = "Kategori wajib diisi.";
    if (!author.trim()) next.author = "Nama penulis wajib diisi.";
    if (!date) next.date = "Tanggal publikasi wajib diisi.";
    if (!cover.trim()) next.cover = "Gambar sampul wajib dipilih.";
    if (excerpt.trim().length < 10) next.excerpt = "Ringkasan minimal 10 karakter.";
    if (content.trim().length < 30) next.content = "Konten minimal 30 karakter.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    const data: PostFormData = {
      title: title.trim(),
      slug: slug.trim() || slugify(title),
      category: category.trim(),
      author: author.trim(),
      date,
      tags: tagsInput
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      cover: cover.trim(),
      excerpt: excerpt.trim(),
      content: content.trim(),
      featured,
    };
    if (initial) {
      updatePost(initial.id, data);
      onSaved("Artikel berhasil diperbarui.");
    } else {
      createPost(data);
      onSaved("Artikel baru berhasil diterbitkan.");
    }
  };

  /* ---------- Tampilan ---------- */

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 overflow-y-auto bg-navy-950/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 32, scale: 0.98 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
        className="mx-auto my-6 w-full max-w-3xl rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-white/10 dark:bg-navy-925"
      >
        {/* Kepala form */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 dark:border-white/10">
          <div>
            <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white">
              {initial ? "Edit Artikel" : "Tambah Artikel Baru"}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {initial
                ? "Perbarui informasi artikel lalu simpan perubahan."
                : "Lengkapi formulir berikut untuk menerbitkan artikel."}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup formulir"
            className="grid size-9 cursor-pointer place-items-center rounded-xl border border-slate-200 text-slate-500 transition-colors hover:bg-slate-100 dark:border-white/10 dark:text-slate-400 dark:hover:bg-white/5"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Isi form */}
        <div className="space-y-5 px-6 py-6">
          <div className="grid gap-5 sm:grid-cols-2">
            {/* Judul */}
            <div className="sm:col-span-2">
              <label htmlFor="f-title" className={labelClass}>
                Judul Artikel <span className="text-red-500">*</span>
              </label>
              <input
                id="f-title"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Contoh: Panduan Lengkap React untuk Pemula"
                className={cn(inputClass, errors.title && errorInput)}
              />
              {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title}</p>}
            </div>

            {/* Slug */}
            <div>
              <label htmlFor="f-slug" className={labelClass}>
                Slug URL
              </label>
              <input
                id="f-slug"
                value={slug}
                onChange={(e) => {
                  setSlugTouched(true);
                  setSlug(slugify(e.target.value));
                }}
                placeholder="otomatis-dari-judul"
                className={cn(inputClass, "font-mono text-xs")}
              />
              <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                URL: /post/{slug || "..."}
              </p>
            </div>

            {/* Tanggal publikasi */}
            <div>
              <label htmlFor="f-date" className={labelClass}>
                Tanggal Publikasi <span className="text-red-500">*</span>
              </label>
              <input
                id="f-date"
                type="date"
                value={date}
                max="2100-12-31"
                onChange={(e) => setDate(e.target.value)}
                className={cn(
                  inputClass,
                  "dark:[color-scheme:dark]",
                  errors.date && errorInput
                )}
              />
              <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                Artikel diurutkan dari tanggal terbaru.
              </p>
              {errors.date && <p className="mt-1 text-xs text-red-500">{errors.date}</p>}
            </div>

            {/* Kategori */}
            <div>
              <label htmlFor="f-category" className={labelClass}>
                Kategori <span className="text-red-500">*</span>
              </label>
              <input
                id="f-category"
                list="category-options"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Pilih atau ketik kategori baru"
                className={cn(inputClass, errors.category && errorInput)}
              />
              <datalist id="category-options">
                {existingCategories.map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>
              {errors.category && <p className="mt-1 text-xs text-red-500">{errors.category}</p>}
            </div>

            {/* Penulis */}
            <div>
              <label htmlFor="f-author" className={labelClass}>
                Penulis <span className="text-red-500">*</span>
              </label>
              <input
                id="f-author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Nama penulis"
                className={cn(inputClass, errors.author && errorInput)}
              />
              {errors.author && <p className="mt-1 text-xs text-red-500">{errors.author}</p>}
            </div>

            {/* Tag */}
            <div className="sm:col-span-2">
              <label htmlFor="f-tags" className={labelClass}>
                Tag
              </label>
              <input
                id="f-tags"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="React, Tutorial, Frontend"
                className={inputClass}
              />
              <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                Pisahkan dengan koma.
              </p>
            </div>
          </div>

          {/* Pemilih sampul */}
          <div>
            <span className={labelClass}>
              Gambar Sampul <span className="text-red-500">*</span>
            </span>
            <div className="grid grid-cols-4 gap-2.5">
              {COVER_PRESETS.map((src) => {
                const active = cover === src;
                return (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setCover(src)}
                    className={cn(
                      "relative aspect-[16/9] cursor-pointer overflow-hidden rounded-lg border-2 transition-all",
                      active
                        ? "border-blue-500 ring-4 ring-blue-500/20"
                        : "border-transparent opacity-70 hover:opacity-100"
                    )}
                  >
                    <img src={src} alt="Pilihan sampul" className="size-full object-cover" />
                    {active && (
                      <span className="absolute top-1 right-1 grid size-5 place-items-center rounded-full bg-blue-600 text-white">
                        <Check className="size-3" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
            <input
              value={cover}
              onChange={(e) => setCover(e.target.value)}
              placeholder="atau tempel URL gambar kustom..."
              className={cn(inputClass, "mt-2.5 font-mono text-xs", errors.cover && errorInput)}
            />
            {errors.cover && <p className="mt-1 text-xs text-red-500">{errors.cover}</p>}
          </div>

          {/* Ringkasan */}
          <div>
            <label htmlFor="f-excerpt" className={labelClass}>
              Ringkasan <span className="text-red-500">*</span>
            </label>
            <textarea
              id="f-excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows={2}
              placeholder="Ringkasan singkat yang tampil di kartu artikel..."
              className={cn(inputClass, "resize-none", errors.excerpt && errorInput)}
            />
            {errors.excerpt && <p className="mt-1 text-xs text-red-500">{errors.excerpt}</p>}
          </div>

          {/* Konten */}
          <div>
            <label htmlFor="f-content" className={labelClass}>
              Konten Artikel <span className="text-red-500">*</span>
            </label>
            <textarea
              id="f-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={10}
              placeholder={"Tulis isi artikel di sini...\n\n## Heading\n> Kutipan\n- Daftar poin\n~~~js\nconsole.log('blok kode')\n~~~"}
              className={cn(inputClass, "font-mono text-xs leading-relaxed", errors.content && errorInput)}
            />
            <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
              Mendukung: ## heading, &gt; kutipan, - daftar, 1. nomor, ~~~ blok kode,
              **tebal**, *miring*, `kode inline`.
            </p>
            {errors.content && <p className="mt-1 text-xs text-red-500">{errors.content}</p>}
          </div>

          {/* Toggle unggulan */}
          <button
            type="button"
            onClick={() => setFeatured((f) => !f)}
            className="flex w-full cursor-pointer items-center justify-between rounded-xl border border-slate-200 px-4 py-3 transition-colors hover:bg-slate-50 dark:border-white/10 dark:hover:bg-white/5"
          >
            <span className="flex items-center gap-3">
              <Star
                className={cn(
                  "size-5",
                  featured ? "fill-amber-400 text-amber-400" : "text-slate-400"
                )}
              />
              <span className="text-left">
                <span className="block text-sm font-semibold text-slate-700 dark:text-slate-200">
                  Jadikan Artikel Unggulan
                </span>
                <span className="block text-xs text-slate-500 dark:text-slate-400">
                  Tampil besar di bagian atas beranda.
                </span>
              </span>
            </span>
            <span
              className={cn(
                "relative h-6 w-11 shrink-0 rounded-full transition-colors duration-300",
                featured ? "bg-blue-600" : "bg-slate-300 dark:bg-white/15"
              )}
            >
              <span
                className={cn(
                  "absolute top-0.5 left-0.5 size-5 rounded-full bg-white shadow transition-transform duration-300",
                  featured && "translate-x-5"
                )}
              />
            </span>
          </button>
        </div>

        {/* Aksi form */}
        <div className="flex items-center justify-end gap-3 border-t border-slate-200 px-6 py-4 dark:border-white/10">
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-100 dark:border-white/15 dark:text-slate-300 dark:hover:bg-white/5"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="cursor-pointer rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-all hover:shadow-xl hover:brightness-110"
          >
            {initial ? "Simpan Perubahan" : "Terbitkan Artikel"}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
