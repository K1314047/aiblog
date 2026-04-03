"use client";
import { useMemo, useState } from "react";
import Fuse from "fuse.js";
import Link from "next/link";
type Item = { type: "post" | "thought"; title: string; description: string; content: string; url: string; date: string; tags: string; };
export function SearchClient({ items }: { items: Item[] }) {
  const [query, setQuery] = useState("");
  const fuse = useMemo(() => new Fuse(items, { keys: ["title", "description", "content", "tags"], threshold: 0.35, ignoreLocation: true }), [items]);
  const results = query.trim() ? fuse.search(query).map((result) => result.item) : items;
  return <div className="space-y-8"><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索文章、标签、想法..." className="w-full rounded-2xl border border-zinc-200 bg-white px-5 py-4 text-base outline-none transition placeholder:text-zinc-400 focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-950" /><div className="space-y-4">{results.map((item, index) => <Link key={`${item.url}-${index}`} href={item.url} className="block rounded-2xl border border-zinc-100 p-5 transition hover:bg-zinc-50 dark:border-zinc-900 dark:hover:bg-zinc-900"><div className="mb-2 flex items-center gap-3 text-xs uppercase tracking-[0.15em] text-zinc-400"><span>{item.type === "post" ? "博客" : "想法"}</span><span>{item.date.slice(0, 10)}</span></div><h2 className="mb-2 text-lg font-medium text-zinc-900 dark:text-white">{item.title}</h2><p className="line-clamp-2 text-sm leading-7 text-zinc-500 dark:text-zinc-400">{item.description}</p></Link>)}</div></div>;
}
