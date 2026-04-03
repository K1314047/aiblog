import { getAllThoughts } from "@/lib/thoughts";

export const metadata = {
  title: "想法"
};

export default function ThoughtsPage() {
  const thoughts = getAllThoughts();

  return (
    <main className="mx-auto max-w-[920px] px-6 py-14">
      <div className="mx-auto max-w-[760px] space-y-4">
        {thoughts.map((thought) => (
          <article
            key={thought.id}
            className="rounded-2xl border border-zinc-100 bg-zinc-50/40 p-4 shadow-none dark:border-zinc-900 dark:bg-zinc-900/30"
          >
            <p className="mb-4 whitespace-pre-wrap text-[15px] leading-8 text-zinc-700 dark:text-zinc-200">
              {thought.content}
            </p>

            {thought.images && thought.images.length > 0 ? (
              <div className="mb-4 space-y-3">
                {thought.images.map((image) => (
                  <img key={image} src={image} alt="" className="w-full rounded-xl object-cover" />
                ))}
              </div>
            ) : null}

            <p className="text-right text-[12px] text-zinc-400 dark:text-zinc-500">
              {thought.createdAt.replace("T", " ").slice(0, 16).replaceAll("-", "/")}
            </p>
          </article>
        ))}
      </div>
    </main>
  );
}
