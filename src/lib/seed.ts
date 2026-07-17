import type { Post } from "./types";

/**
 * Data awal artikel Zixpedia.
 * Dipakai saat aplikasi pertama kali dijalankan atau saat admin
 * menekan tombol "Reset Data" di dashboard.
 *
 * Format konten (markdown-lite):
 *   ## / ###   -> heading
 *   >          -> blockquote
 *   - / 1.     -> daftar bullet / bernomor
 *   ~~~lang    -> blok kode (ditutup dengan ~~~)
 *   **teks**   -> tebal, *teks* -> miring, `kode` -> kode inline
 */

export const SEED_POSTS: Post[] = [
  {
    id: "seed-001",
    title: "Memulai React 19: Fitur Baru yang Wajib Kamu Tahu",
    slug: "memulai-react-19-fitur-baru",
    excerpt:
      "React 19 membawa Actions, hook use, dan dukungan metadata bawaan. Pelajari fitur terpentingnya dan cara migrasi dari React 18 tanpa pusing.",
    category: "Teknologi",
    tags: ["React", "JavaScript", "Frontend"],
    cover: "/images/blog-react.jpg",
    author: "Zaky Ramadhan",
    date: "2025-01-12",
    featured: true,
    content: `React 19 resmi dirilis sebagai versi stabil dan membawa sejumlah fitur yang mengubah cara kita membangun antarmuka web. Dari Actions hingga dukungan metadata bawaan, pembaruan ini berfokus pada pengalaman developer dan performa aplikasi.

Dalam artikel ini kita akan membahas fitur-fitur paling penting di React 19 dan bagaimana cara mulai menggunakannya di proyek nyata.

## Apa yang Baru di React 19?

### Actions

Actions adalah cara baru menangani mutasi data. Dengan Actions, React mengelola status pending, error, dan optimistic update secara otomatis sehingga kode form menjadi jauh lebih ringkas.

~~~tsx
function UpdateProfile() {
  const [error, submitAction, isPending] = useActionState(
    async (previousState, formData) => {
      const error = await updateName(formData.get("name"));
      if (error) return error;
      redirect("/profile");
      return null;
    },
    null
  );

  return (
    <form action={submitAction}>
      <input type="text" name="name" />
      <button disabled={isPending}>Simpan</button>
      {error && <p>{error}</p>}
    </form>
  );
}
~~~

### Hook use

Hook \`use\` memungkinkan kita membaca resource seperti Promise atau Context langsung di dalam render. Berbeda dengan hook lain, \`use\` boleh dipanggil di dalam percabangan kondisional sehingga pola data fetching menjadi lebih fleksibel.

### Document Metadata

Sekarang kita bisa me-render tag \`<title>\`, \`<meta>\`, dan \`<link>\` dari komponen mana pun. React akan mengangkatnya ke \`<head>\` secara otomatis tanpa library tambahan seperti react-helmet.

## Server Components Semakin Matang

Server Components kini lebih stabil dan terintegrasi baik dengan bundler modern. Komponen dirender di server sehingga mengurangi JavaScript yang dikirim ke klien dan mempercepat waktu muat pertama halaman.

> "React 19 bukan sekadar penomoran versi baru, melainkan fondasi untuk aplikasi web yang lebih cepat dan lebih sederhana."

## Cara Migrasi dari React 18

1. Perbarui dependensi utama dengan \`npm install react@19 react-dom@19\`
2. Jalankan codemod resmi untuk memperbarui API yang deprecated
3. Periksa kompatibilitas library pihak ketiga yang digunakan
4. Uji seluruh alur form dan data fetching aplikasi Anda

Sebagian besar aplikasi React 18 bisa bermigrasi tanpa perubahan besar. Perhatikan penggunaan \`ref\` sebagai prop dan perubahan pada \`useRef\` yang kini mewajibkan argumen awal.

## Kesimpulan

React 19 menghadirkan penyempurnaan yang terasa nyata dalam pekerjaan sehari-hari. Actions menyederhanakan form, metadata bawaan merapikan SEO, dan Server Components memangkas beban JavaScript. Jika Anda memulai proyek baru hari ini, React 19 adalah pilihan yang tepat.`,
  },
  {
    id: "seed-002",
    title: "Tailwind CSS v4: Styling Lebih Cepat dari Sebelumnya",
    slug: "tailwind-css-v4-styling-lebih-cepat",
    excerpt:
      "Engine baru berbasis Rust, konfigurasi CSS-first, dan container query bawaan. Ini alasan Tailwind CSS v4 layak diadopsi untuk proyek Anda berikutnya.",
    category: "Tutorial",
    tags: ["CSS", "Tailwind", "Frontend"],
    cover: "/images/blog-tailwind.jpg",
    author: "Nadia Putri",
    date: "2025-01-05",
    featured: false,
    content: `Tailwind CSS v4 membawa perubahan arsitektur terbesar sejak framework ini diluncurkan. Engine baru bernama Oxide membuat proses build hingga sepuluh kali lebih cepat, sementara konfigurasi kini cukup dilakukan lewat CSS.

## Konfigurasi CSS-First

Tidak ada lagi file \`tailwind.config.js\` yang panjang. Semua token desain didefinisikan langsung di file CSS menggunakan directive \`@theme\`.

~~~css
@import "tailwindcss";

@theme {
  --color-brand-500: #2563eb;
  --font-display: "Sora", sans-serif;
}
~~~

Token yang Anda definisikan otomatis tersedia sebagai utility class, misalnya \`bg-brand-500\` atau \`font-display\`. Pendekatan ini membuat sistem desain terasa lebih dekat dengan standar web.

## Fitur Unggulan Lainnya

- **Engine Oxide** yang ditulis ulang dengan Rust, full build turun ke hitungan milidetik
- **Dukungan container query bawaan** tanpa perlu plugin tambahan
- **Variant \`starting\`** untuk animasi saat elemen pertama kali muncul di layar
- **Komposisi variant** yang lebih fleksibel seperti \`group-has-[...]\`
- **Deteksi konten otomatis**, tidak perlu mendaftar path template secara manual

## Migrasi dari v3

1. Ganti directive \`@tailwind base\` dan kawan-kawannya dengan satu baris \`@import "tailwindcss"\`
2. Pindahkan token dari file config ke blok \`@theme\`
3. Jalankan tool upgrade resmi dengan \`npx @tailwindcss/upgrade\`
4. Periksa class yang mengandalkan warna border default karena kini mengikuti \`currentColor\`

> "Dengan v4, Tailwind terasa seperti bagian alami dari CSS modern, bukan lagi lapisan di atasnya."

## Kesimpulan

Tailwind CSS v4 lebih cepat, lebih sederhana, dan lebih dekat dengan standar web. Untuk proyek baru tidak ada alasan menunda adopsi. Untuk proyek lama, tool upgrade otomatis membuat proses migrasi relatif mulus dan menyenangkan.`,
  },
  {
    id: "seed-003",
    title: "10 Tips TypeScript untuk Kode yang Lebih Aman",
    slug: "10-tips-typescript-kode-lebih-aman",
    excerpt:
      "Dari strict mode hingga operator satisfies, sepuluh tips praktis ini akan membuat codebase TypeScript Anda lebih aman dan mudah dirawat.",
    category: "Tutorial",
    tags: ["TypeScript", "JavaScript", "Best Practice"],
    cover: "/images/blog-typescript.jpg",
    author: "Rizky Pratama",
    date: "2024-12-28",
    featured: false,
    content: `TypeScript telah menjadi standar industri untuk proyek JavaScript berskala besar. Namun banyak developer baru memanfaatkan sebagian kecil kemampuannya. Berikut sepuluh tips yang akan membuat kode Anda lebih aman dan mudah dirawat.

## 1. Aktifkan strict Mode

Selalu gunakan \`"strict": true\` di \`tsconfig.json\`. Mode ini menangkap banyak bug potensial sejak awal, termasuk akses properti pada nilai yang mungkin \`null\` atau \`undefined\`.

## 2. Gunakan unknown daripada any

\`any\` mematikan pemeriksaan tipe sepenuhnya. \`unknown\` memaksa Anda melakukan validasi sebelum menggunakan nilai, sehingga jauh lebih aman untuk data eksternal seperti respons API.

## 3. Manfaatkan Type Inference

TypeScript sangat pintar menebak tipe. Anda tidak perlu menuliskan anotasi di mana-mana, cukup pada boundary seperti parameter fungsi publik dan nilai kembalian.

~~~ts
// Berlebihan
const name: string = "Zixpedia";

// Cukup, tipe ter-infer sebagai string
const name = "Zixpedia";
~~~

## 4. Gunakan Union Types untuk State

- Definisikan \`type Status = "idle" | "loading" | "success" | "error"\`
- Lebih aman daripada boolean terpisah seperti \`isLoading\` dan \`isError\`
- Exhaustive checking memastikan semua kasus tertangani di blok \`switch\`

## 5. Discriminated Unions untuk Data Kompleks

Tambahkan properti pembeda, biasanya \`type\` atau \`kind\`, agar TypeScript bisa menyempitkan tipe secara otomatis di dalam percabangan.

## 6. Utility Types adalah Sahabat Anda

\`Partial<T>\`, \`Pick<T>\`, \`Omit<T>\`, dan \`Record<K, V>\` menghemat banyak penulisan ulang tipe. Pelajari juga \`ReturnType<T>\` dan \`Parameters<T>\` untuk kasus yang lebih lanjut.

## 7. Hindari Type Assertion Berlebihan

Kata kunci \`as\` adalah janji kepada compiler, dan janji yang salah berarti bug di runtime. Gunakan hanya ketika Anda benar-benar tahu lebih banyak daripada compiler.

## 8. Gunakan satisfies

Operator \`satisfies\` memvalidasi bentuk objek tanpa memperlebar tipenya. Ini kombinasi terbaik antara keamanan dan inference yang presisi.

## 9. Pisahkan Tipe Domain

Simpan tipe inti aplikasi di file terpisah seperti \`src/lib/types.ts\`. Struktur ini membuat tipe mudah ditemukan dan digunakan ulang secara konsisten di seluruh proyek.

## 10. Baca Error dengan Sabar

Pesan error TypeScript memang panjang, tetapi hampir selalu menunjuk akar masalah. Biasakan membaca dari baris paling bawah ke atas untuk menemukan penyebab utamanya.

> "TypeScript tidak memperlambat Anda menulis kode, ia mempercepat Anda memperbaiki kode."

Selamat mencoba, dan semoga codebase Anda semakin kokoh!`,
  },
  {
    id: "seed-004",
    title: "Membangun Design System yang Skalabel",
    slug: "membangun-design-system-yang-skalabel",
    excerpt:
      "Design system yang baik bukan kumpulan komponen, melainkan keputusan yang tidak perlu diambil ulang. Mulai dari token hingga dokumentasi hidup.",
    category: "Desain",
    tags: ["Design System", "UI/UX", "Figma"],
    cover: "/images/blog-design.jpg",
    author: "Sinta Maharani",
    date: "2024-12-20",
    featured: false,
    content: `Design system adalah bahasa visual bersama yang memastikan setiap halaman produk terasa konsisten. Tanpanya, antarmuka akan terfragmentasi seiring pertumbuhan tim dan fitur.

## Mulai dari Design Token

Design token adalah nilai dasar seperti warna, ukuran font, dan spacing yang menjadi satu-satunya sumber kebenaran. Simpan token dalam format yang bisa dikonsumsi semua platform, dari web hingga mobile.

~~~css
@theme {
  --color-brand-600: #2050d4;
  --color-surface: #ffffff;
  --radius-card: 0.75rem;
  --spacing-section: 6rem;
}
~~~

## Prinsip Membangun Komponen

1. **Satu tanggung jawab** - komponen melakukan satu hal dengan baik
2. **Composable** - komponen kecil digabung menjadi komponen besar
3. **Accessible by default** - kontras, fokus keyboard, dan ARIA bukan opsional
4. **Terdokumentasi** - setiap komponen punya contoh penggunaan yang hidup

## Konsistensi Mode Terang dan Gelap

Uji setiap komponen pada kedua mode sejak awal. Gunakan token semantik seperti \`surface\` dan \`foreground\` alih-alih warna mentah, sehingga pergantian tema cukup dilakukan di satu tempat dan hasilnya konsisten di seluruh aplikasi.

> "Design system yang baik bukan kumpulan komponen, melainkan sekumpulan keputusan yang tidak perlu diambil ulang."

## Dokumentasi yang Hidup

Dokumentasi terbaik adalah yang bisa dicoba langsung. Gunakan Storybook atau halaman demo internal agar designer dan developer melihat hal yang sama dan berbicara dengan bahasa yang sama pula.

## Kesimpulan

Mulailah kecil: token warna, skala tipografi, dan tiga komponen inti. Biarkan sistem tumbuh mengikuti kebutuhan nyata, bukan spekulasi. Konsistensi adalah maraton, bukan sprint.`,
  },
  {
    id: "seed-005",
    title: "Produktivitas Developer: Membangun Workflow yang Efisien",
    slug: "produktivitas-developer-workflow-efisien",
    excerpt:
      "Produktivitas bukan tentang mengetik lebih cepat, melainkan mengurangi gesekan antara ide dan kode yang berjalan. Ini praktik yang terbukti membantu.",
    category: "Produktivitas",
    tags: ["Produktivitas", "Karier", "Tools"],
    cover: "/images/blog-productivity.jpg",
    author: "Zaky Ramadhan",
    date: "2024-12-12",
    featured: false,
    content: `Produktivitas developer bukan tentang mengetik lebih cepat, melainkan mengurangi gesekan antara ide dan kode yang berjalan. Berikut praktik yang terbukti membantu dalam pekerjaan sehari-hari.

## Optimalkan Editor Anda

Editor adalah rumah tempat kita menghabiskan sebagian besar hari. Pelajari shortcut penting, pasang ekstensi yang benar-benar dipakai, dan hapus yang tidak pernah disentuh.

- **Multi-cursor** untuk mengedit banyak baris sekaligus
- **Command palette** sebagai pintu cepat ke semua fitur
- **Snippet** untuk pola kode yang sering ditulis berulang
- **Format on save** agar tidak pernah berdebat soal gaya kode

## Kelola Konteks, Bukan Hanya Waktu

Context switching adalah pembunuh produktivitas yang paling mahal. Setiap kali berpindah tugas, otak butuh waktu belasan menit untuk memuat ulang konteks.

1. Kelompokkan pekerjaan sejenis dalam satu blok waktu
2. Matikan notifikasi saat sesi deep work
3. Catat hal terakhir yang dikerjakan sebelum istirahat agar mudah kembali

## Otomatiskan yang Berulang

Jika Anda melakukan sesuatu lebih dari tiga kali, tuliskan script-nya. Alias git, template komponen, dan task runner menghemat jam kerja setiap minggunya.

> "Waktu yang dihabiskan untuk mengasah kapak bukanlah waktu yang terbuang."

## Istirahat adalah Bagian dari Sistem

Kode terbaik sering muncul setelah berjalan kaki singkat. Otak memproses masalah di latar belakang, jadi berikan ia ruang. Produktivitas jangka panjang selalu mengalahkan lembur jangka pendek.`,
  },
  {
    id: "seed-006",
    title: "AI dalam Pengembangan Web: Peluang dan Tantangan",
    slug: "ai-dalam-pengembangan-web",
    excerpt:
      "AI telah berpindah dari laboratorium riset ke workflow harian developer. Bagaimana memanfaatkannya tanpa kehilangan kendali atas kualitas kode?",
    category: "Teknologi",
    tags: ["AI", "Machine Learning", "Masa Depan"],
    cover: "/images/blog-ai.jpg",
    author: "Nadia Putri",
    date: "2024-12-05",
    featured: false,
    content: `Kecerdasan buatan telah berpindah dari laboratorium riset ke workflow harian developer. Dari code completion hingga generasi antarmuka, AI mengubah cara perangkat lunak dibangun.

## AI sebagai Pair Programmer

Asisten AI kini mampu menulis boilerplate, menyarankan refactor, dan menjelaskan kode yang asing dalam hitungan detik. Kuncinya adalah memperlakukan AI sebagai rekan diskusi, bukan pengganti berpikir.

- Gunakan AI untuk mempercepat eksplorasi solusi alternatif
- Selalu review kode hasil generasi sebelum di-commit
- Berikan konteks yang jelas agar output lebih relevan

## Peluang Nyata di Frontend

1. **Personalization engine** - konten yang menyesuaikan perilaku pengguna
2. **Pencarian semantik** - pencarian yang memahami maksud, bukan sekadar kata kunci
3. **Aksesibilitas otomatis** - alt text dan caption yang digenerasi AI
4. **Prototyping cepat** - dari prompt menjadi UI yang bisa diuji dalam hitungan menit

## Tantangan yang Harus Dihadapi

> "AI menurunkan biaya menulis kode, tetapi menaikkan nilai kemampuan menilai kode."

Akurasi, bias, dan privasi data tetap menjadi perhatian utama. Tim yang sukses adalah yang membangun proses review kuat di sekitar output AI, bukan yang menelannya mentah-mentah.

## Kesimpulan

AI tidak menggantikan developer, ia menggantikan bagian membosankan dari pekerjaan developer. Mereka yang belajar berkolaborasi dengan AI akan memiliki keunggulan besar dalam dekade ini.`,
  },
  {
    id: "seed-007",
    title: "Dasar Keamanan Web yang Sering Diabaikan",
    slug: "dasar-keamanan-web-yang-sering-diabaikan",
    excerpt:
      "Mayoritas insiden keamanan bukan disebabkan serangan canggih, melainkan kelalaian pada hal mendasar. Enam langkah ini menutup sebagian besar celah.",
    category: "Tutorial",
    tags: ["Security", "Backend", "Best Practice"],
    cover: "/images/blog-security.jpg",
    author: "Rizky Pratama",
    date: "2024-11-28",
    featured: false,
    content: `Banyak insiden keamanan bukan disebabkan serangan canggih, melainkan kelalaian pada hal-hal mendasar. Berikut daftar praktik dasar yang paling sering terlewat.

## 1. Jangan Pernah Percaya Input Pengguna

Semua data dari klien, baik form, query param, maupun header, harus divalidasi dan disanitasi di server. Validasi di frontend hanya untuk pengalaman pengguna, bukan lapisan keamanan.

## 2. Gunakan HTTPS di Mana Saja

Tidak ada alasan melayani konten lewat HTTP. Sertifikat gratis dari Let's Encrypt dan header HSTS memastikan koneksi pengguna selalu terenkripsi.

## 3. Amankan Header HTTP

- \`Content-Security-Policy\` membatasi sumber script yang boleh dieksekusi
- \`X-Frame-Options\` mencegah serangan clickjacking
- \`X-Content-Type-Options: nosniff\` menghentikan MIME sniffing

## 4. Hati-hati dengan XSS

Jangan pernah menyisipkan data pengguna ke HTML tanpa escaping. Di React, hindari \`dangerouslySetInnerHTML\` kecuali konten telah disanitasi dengan library seperti DOMPurify.

~~~tsx
// Berbahaya jika content berasal dari pengguna
<div dangerouslySetInnerHTML={{ __html: content }} />

// Lebih aman, sanitasi terlebih dahulu
<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }} />
~~~

## 5. Kelola Secret dengan Benar

API key dan password database tidak boleh masuk ke repository. Gunakan environment variable dan file \`.env\` yang dikecualikan dari git sejak commit pertama.

## 6. Perbarui Dependensi

Jalankan \`npm audit\` secara rutin dan aktifkan Dependabot. Mayoritas eksploitasi memanfaatkan vulnerability pada dependensi yang sebenarnya sudah lama punya patch.

> "Keamanan bukan fitur yang ditambahkan di akhir, ia adalah proses yang menyertai setiap commit."

Mulailah dari daftar ini hari ini. Enam langkah kecil di atas menutup sebagian besar celah yang biasa dimanfaatkan penyerang.`,
  },
  {
    id: "seed-008",
    title: "Optimasi Performa Web: dari Core Web Vitals hingga Lazy Loading",
    slug: "optimasi-performa-web-core-web-vitals",
    excerpt:
      "Kecepatan memengaruhi konversi, SEO, dan kesan pertama pengguna. Panduan sistematis mengoptimasi Core Web Vitals tanpa menebak-nebak.",
    category: "Teknologi",
    tags: ["Performance", "SEO", "Frontend"],
    cover: "/images/blog-performance.jpg",
    author: "Sinta Maharani",
    date: "2024-11-20",
    featured: false,
    content: `Kecepatan bukan sekadar kenyamanan, ia memengaruhi konversi, SEO, dan kesan pertama pengguna. Google mengukurnya lewat Core Web Vitals, dan kita bisa mengoptimasinya secara sistematis.

## Memahami Core Web Vitals

- **LCP (Largest Contentful Paint)** - seberapa cepat konten utama muncul, target di bawah 2,5 detik
- **INP (Interaction to Next Paint)** - seberapa responsif halaman terhadap interaksi, target di bawah 200 ms
- **CLS (Cumulative Layout Shift)** - seberapa stabil layout saat memuat, target di bawah 0,1

## Optimasi Gambar

Gambar adalah penyebab LCP lambat yang paling umum. Gunakan format modern seperti WebP atau AVIF, ukuran responsif dengan \`srcset\`, dan \`loading="lazy"\` untuk gambar di bawah fold.

## Code Splitting dan Lazy Loading

Kirim hanya JavaScript yang dibutuhkan untuk halaman saat ini. Di React, gunakan \`React.lazy\` dan dynamic import untuk memecah bundle per rute.

~~~tsx
const Admin = lazy(() => import("./pages/Admin"));

<Suspense fallback={<Loading />}>
  <Admin />
</Suspense>
~~~

## Caching yang Cerdas

1. Aset statis ber-hash di-cache selamanya dengan \`Cache-Control: immutable\`
2. HTML divalidasi ulang menggunakan ETag
3. Data API di-cache di sisi klien dengan pola stale-while-revalidate

## Ukur, Bukan Menebak

> "Optimasi tanpa pengukuran hanyalah tebakan yang terdengar pintar."

Gunakan Lighthouse, WebPageTest, dan data lapangan dari CrUX untuk menemukan bottleneck yang sesungguhnya. Perbaiki satu metrik dalam satu waktu, lalu ukur ulang hasilnya.

Performa adalah fitur, dan seperti fitur lainnya, ia layak mendapat tempat di backlog setiap sprint.`,
  },
];

/** Daftar kategori bawaan untuk dropdown form admin */
export const DEFAULT_CATEGORIES = [
  "Teknologi",
  "Tutorial",
  "Desain",
  "Produktivitas",
];

/** Koleksi gambar sampul yang tersedia di folder public/images */
export const COVER_PRESETS = [
  "/images/blog-react.jpg",
  "/images/blog-tailwind.jpg",
  "/images/blog-typescript.jpg",
  "/images/blog-design.jpg",
  "/images/blog-productivity.jpg",
  "/images/blog-ai.jpg",
  "/images/blog-security.jpg",
  "/images/blog-performance.jpg",
];
