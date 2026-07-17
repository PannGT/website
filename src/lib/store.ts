import { useEffect, useState } from "react";
import type { Post, PostFormData } from "./types";
import { SEED_POSTS } from "./seed";
import { slugify } from "./utils";

/**
 * Store artikel berbasis localStorage dengan event sinkronisasi.
 * Semua operasi CRUD di dashboard admin melewati modul ini sehingga
 * data tetap konsisten di seluruh halaman.
 */

const STORAGE_KEY = "zixpedia_posts_v1";
const EVENT_NAME = "zixpedia:posts-changed";

function byDateDesc(a: Post, b: Post): number {
  return new Date(b.date).getTime() - new Date(a.date).getTime();
}

function load(): Post[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed as Post[];
      }
    }
  } catch {
    // abaikan error parse, kembali ke data awal
  }
  return SEED_POSTS;
}

function persist(posts: Post[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  window.dispatchEvent(new Event(EVENT_NAME));
}

/** Pastikan slug unik dengan menambahkan suffix angka bila perlu */
function ensureUniqueSlug(base: string, excludeId?: string): string {
  const posts = load();
  const fallback = base || "artikel";
  let slug = fallback;
  let counter = 2;
  while (posts.some((p) => p.slug === slug && p.id !== excludeId)) {
    slug = `${fallback}-${counter}`;
    counter += 1;
  }
  return slug;
}

/** Ambil semua artikel, terurut dari yang terbaru */
export function getPosts(): Post[] {
  return [...load()].sort(byDateDesc);
}

/** Ambil satu artikel berdasarkan slug */
export function getPostBySlug(slug: string): Post | undefined {
  return load().find((p) => p.slug === slug);
}

/** Tambah artikel baru, mengembalikan artikel yang tersimpan */
export function createPost(data: PostFormData): Post {
  const post: Post = {
    ...data,
    id: crypto.randomUUID(),
    slug: ensureUniqueSlug(slugify(data.slug || data.title)),
    // Gunakan tanggal dari form; fallback ke hari ini bila kosong
    date: data.date || new Date().toISOString().slice(0, 10),
  };
  persist([post, ...load()]);
  return post;
}

/** Perbarui artikel yang sudah ada */
export function updatePost(id: string, data: PostFormData): Post | undefined {
  const posts = load();
  const index = posts.findIndex((p) => p.id === id);
  if (index === -1) return undefined;
  const updated: Post = {
    ...posts[index],
    ...data,
    id,
    slug: ensureUniqueSlug(slugify(data.slug || data.title), id),
  };
  posts[index] = updated;
  persist(posts);
  return updated;
}

/** Hapus artikel berdasarkan id */
export function deletePost(id: string): void {
  persist(load().filter((p) => p.id !== id));
}

/** Kembalikan seluruh data ke kondisi awal */
export function resetPosts(): void {
  persist(SEED_POSTS);
}

/** Hook reaktif untuk membaca daftar artikel */
export function usePosts(): Post[] {
  const [posts, setPosts] = useState<Post[]>(getPosts);

  useEffect(() => {
    const sync = () => setPosts(getPosts());
    window.addEventListener(EVENT_NAME, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT_NAME, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return posts;
}
