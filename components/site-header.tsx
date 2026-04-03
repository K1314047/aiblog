import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

const nav = [
  { href: "/", label: "博客" },
  { href: "/thoughts", label: "想法" },
  { href: "/about", label: "关于" },
  { href: "/search", label: "搜索" }
];

export function SiteHeader() {
  return (
    <header className="border-b border-zinc-100 dark:border-zinc-900">
      <div className="mx-auto max-w-[920px] px-6 pt-20 pb-10">
        <div className="mb-14 flex items-start justify-between gap-6">
          <div>
            <Link href="/" className="block text-[26px] font-normal tracking-[-0.02em] text-zinc-900 dark:text-white">
              G.Ark
            </Link>
            <p className="mt-2 text-[12px] italic text-zinc-400 dark:text-zinc-500">
              “Seize the day, gather ye rosebuds while ye may.”
            </p>
          </div>

          <div className="pt-0.5">
            <ThemeToggle />
          </div>
        </div>

        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <nav className="flex flex-wrap items-center gap-10 text-[14px] text-zinc-500 dark:text-zinc-400">
            {nav.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className={index === 0 ? "text-rose-400" : "transition hover:text-zinc-900 dark:hover:text-white"}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <form action="/search" className="w-full md:w-[210px]">
            <input
              name="q"
              aria-label="搜索"
              className="h-9 w-full rounded-sm border border-zinc-100 bg-transparent px-3 text-sm outline-none transition focus:border-zinc-300 dark:border-zinc-900 dark:focus:border-zinc-700"
            />
          </form>
        </div>
      </div>
    </header>
  );
}
