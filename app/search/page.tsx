import { SearchClient } from "@/components/search-client";
import { getSearchIndex } from "@/lib/search";
export const metadata = { title: "搜索" };
export default function SearchPage() { const items = getSearchIndex(); return <main className="mx-auto max-w-reading px-6 py-20"><div className="mb-8 space-y-3"><h1 className="text-4xl font-semibold tracking-tight">搜索</h1><p className="text-zinc-500 dark:text-zinc-400">支持文章、标签和 thoughts 的本地搜索。</p></div><SearchClient items={items} /></main>; }
