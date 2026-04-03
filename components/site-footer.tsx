export function SiteFooter() {
  return (
    <footer className="mt-20 py-10 text-sm text-zinc-300 dark:text-zinc-700">
      <div className="mx-auto max-w-[920px] px-6">
        <p>© {new Date().getFullYear()} G.Ark</p>
      </div>
    </footer>
  );
}
