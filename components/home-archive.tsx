import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export function HomeArchive() {
  const posts = getAllPosts();

  return (
    <div className="space-y-10">
      {posts.map((post) => (
        <article key={post.slug} className="space-y-2">
          <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.14em] text-rose-400">
            <time dateTime={post.date}>{post.date.replaceAll("-", "/")}</time>
            {post.tags[0] ? <span>{post.tags[0]}</span> : null}
          </div>

          <h2 className="text-[18px] font-normal leading-[1.5] text-zinc-800 dark:text-zinc-100">
            <Link href={`/blog/${post.slug}`} className="transition hover:text-zinc-500 dark:hover:text-zinc-300">
              {post.title}
            </Link>
          </h2>

          <p className="line-clamp-2 max-w-[760px] text-[13px] leading-7 text-zinc-400 dark:text-zinc-500">
            {post.description}
          </p>
        </article>
      ))}
    </div>
  );
}
