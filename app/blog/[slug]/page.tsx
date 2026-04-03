import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { markdownToHtml } from "@/lib/markdown";
import { formatDate } from "@/lib/utils";
import { GiscusComments } from "@/components/giscus-comments";
export function generateStaticParams() { return getAllPosts().map((post) => ({ slug: post.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const post = getPostBySlug(slug); if (!post) return {}; return { title: post.title, description: post.description }; }
export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const post = getPostBySlug(slug); if (!post) notFound(); const html = await markdownToHtml(post.content);
  return <main className="mx-auto max-w-reading px-6 py-20"><Link href="/" className="mb-8 inline-block text-sm text-zinc-400 hover:text-zinc-900 dark:hover:text-white">← 返回博客</Link><article><header className="mb-12 space-y-4"><div className="flex flex-wrap items-center gap-3 text-sm text-zinc-400"><time dateTime={post.date}>{formatDate(post.date)}</time>{post.tags.map((tag) => <span key={tag}>#{tag}</span>)}</div><h1 className="text-4xl font-semibold tracking-tight text-zinc-900 dark:text-white">{post.title}</h1><p className="text-lg leading-8 text-zinc-500 dark:text-zinc-400">{post.description}</p></header><div className="article-content" dangerouslySetInnerHTML={{ __html: html }} /><section className="mt-16"><GiscusComments /></section></article></main>;
}
