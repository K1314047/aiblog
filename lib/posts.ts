import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { Post, PostMeta } from "@/lib/types";
const postsDirectory = path.join(process.cwd(), "content/posts");
function normalizeTags(tags: unknown) { return Array.isArray(tags) ? tags.map((tag) => String(tag).trim()) : []; }
export function getAllPosts(includeDrafts = false): PostMeta[] {
  const filenames = fs.readdirSync(postsDirectory).filter((file) => file.endsWith(".md"));
  return filenames.map((filename) => {
    const slug = filename.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, filename);
    const source = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(source);
    return { slug, title: String(data.title ?? slug), date: String(data.date ?? "1970-01-01"), description: String(data.description ?? ""), tags: normalizeTags(data.tags), draft: Boolean(data.draft), cover: data.cover ? String(data.cover) : undefined } satisfies PostMeta;
  }).filter((post) => includeDrafts || !post.draft).sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));
}
export function getPostBySlug(slug: string): Post | null {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;
  const source = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(source);
  const post: Post = { slug, title: String(data.title ?? slug), date: String(data.date ?? "1970-01-01"), description: String(data.description ?? ""), tags: normalizeTags(data.tags), draft: Boolean(data.draft), cover: data.cover ? String(data.cover) : undefined, content };
  if (post.draft) return null; return post;
}
