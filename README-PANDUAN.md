# Zixpedia - Blog & Dashboard Admin

Blog teknologi modern minimalis bertema biru dengan light/dark mode, dibangun
menggunakan **React 19 + Vite + TypeScript + Tailwind CSS v4**.

---

## A. Upload ke Hosting cPanel (tanpa coding)

Gunakan file **`zixpedia-cpanel.zip`** (hasil build production):

1. Login ke **cPanel** hosting Anda.
2. Buka **File Manager**, masuk ke folder **`public_html`**.
3. Klik **Upload**, unggah file `zixpedia-cpanel.zip`.
4. Setelah terunggah, klik kanan file zip -> **Extract** -> **Extract File(s)**.
5. Pastikan file **`.htaccess`** ikut terekstrak
   (aktifkan *Settings -> Show Hidden Files* untuk melihatnya).
6. Hapus file zip setelah selesai (opsional).
7. Buka domain Anda - website siap dipakai.

> **Penting:** file `.htaccess` wajib ada agar URL artikel seperti
> `/post/judul-artikel` dan halaman `/admin` tidak error 404 di Apache.
> Jika website dipasang di subfolder (mis. `public_html/blog`), ubah baris
> `RewriteBase /` menjadi `RewriteBase /blog/`.

---

## B. Pengembangan Lokal (source code)

Gunakan file **`zixpedia-source.zip`**:

```bash
# 1. Ekstrak zip, lalu masuk ke foldernya
cd zixpedia

# 2. Install dependensi (butuh Node.js 18+)
npm install

# 3. Jalankan mode pengembangan
npm run dev

# 4. Build untuk production (hasil di folder dist/)
npm run build
```

Isi folder `dist/` itulah yang diupload ke `public_html` bila Anda membangun
ulang sendiri.

---

## C. Dashboard Admin

- URL: **`/admin`** (mis. `https://domainanda.com/admin`)
- Kata sandi demo: **`admin123`**
- Fitur:
  - Tambah / edit / hapus artikel dengan formulir lengkap
  - **Atur tanggal publikasi** artikel (artikel otomatis terurut dari terbaru)
  - Slug URL otomatis dari judul (bisa diedit manual)
  - Pencarian postingan, statistik, reset data
  - Tombol download source code & build cPanel
- Data artikel disimpan di **localStorage browser** (tanpa database), sehingga
  perubahan admin hanya tersimpan di browser yang sama.

---

## D. Panduan Revisi Cepat (kustomisasi sendiri)

| Mau mengubah apa?                | File yang diedit                                   |
| -------------------------------- | -------------------------------------------------- |
| Nama brand, email, sosial media  | `src/lib/config.ts` (objek `SITE` & `SOCIAL_LINKS`)|
| **Kata sandi admin**             | `src/lib/config.ts` (`ADMIN_PASSWORD`)             |
| Sembunyikan hint password demo   | `src/lib/config.ts` (`ADMIN_SHOW_HINT = false`)    |
| Warna tema (navy/biru)           | `src/index.css` (blok `@theme --color-navy-*`)     |
| Jenis font                       | `index.html` (link Google Fonts) + `src/index.css` |
| Artikel bawaan & gambar sampul   | `src/lib/seed.ts` + folder `public/images/`        |
| Teks hero beranda                | `src/components/Hero.tsx`                          |
| Tampilan kartu artikel           | `src/components/PostCard.tsx`                      |
| Format konten artikel (markdown) | `src/components/ContentRenderer.tsx`               |

---

## E. Struktur Kode

```
src/
  lib/
    config.ts   -> (PENTING) pengaturan utama: brand, password, sosmed
    types.ts    -> tipe data Post & PostFormData
    seed.ts     -> artikel bawaan + preset gambar sampul
    store.ts    -> CRUD artikel (localStorage) + hook usePosts
    theme.tsx   -> provider light/dark mode
    utils.ts    -> helper: format tanggal, slug, waktu baca, dll
  components/
    admin/      -> PostForm, LoginGate, ConfirmDialog, DownloadMenu
    ...         -> Navbar, Footer, Hero, PostCard, Sidebar,
                   ContentRenderer, Logo, ThemeToggle
  pages/
    Home.tsx        -> beranda (hero + daftar artikel + sidebar)
    PostDetail.tsx  -> halaman detail artikel (/post/:slug)
    Admin.tsx       -> dashboard admin (/admin)
    Download.tsx    -> halaman download & panduan cPanel
    NotFound.tsx    -> halaman 404
public/
  images/       -> gambar sampul artikel
  .htaccess     -> konfigurasi Apache untuk cPanel
```

Setiap file diawali komentar penjelas fungsinya, sehingga mudah dipahami
saat ingin merevisi sendiri. Selamat menggunakan Zixpedia!
