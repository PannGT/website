/**
 * Definisi tipe inti aplikasi Zixpedia.
 * Seluruh struktur data artikel dikelola melalui interface ini.
 */

export interface Post {
  /** ID unik (UUID) */
  id: string;
  /** Judul artikel */
  title: string;
  /** Slug URL ramah SEO, dipakai di /post/:slug */
  slug: string;
  /** Ringkasan singkat untuk card & meta description */
  excerpt: string;
  /** Isi artikel dalam format markdown-lite */
  content: string;
  /** Nama kategori utama */
  category: string;
  /** Daftar tag terkait */
  tags: string[];
  /** URL gambar sampul */
  cover: string;
  /** Nama penulis */
  author: string;
  /** Tanggal publikasi (ISO string, yyyy-mm-dd) */
  date: string;
  /** Tandai sebagai artikel unggulan di beranda */
  featured: boolean;
}

/** Data form admin — semua field kecuali id bisa diedit */
export interface PostFormData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  cover: string;
  author: string;
  /** Tanggal publikasi (format yyyy-mm-dd, dari input date) */
  date: string;
  featured: boolean;
}
