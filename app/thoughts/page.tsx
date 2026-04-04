import { getAllThoughts } from "@/lib/thoughts";
import { ThoughtImageGallery } from "@/components/thought-image-gallery";

export const metadata = {
  title: "想法"
};

export default function ThoughtsPage() {
  const thoughts = getAllThoughts();

  return (
    <main className="mx-auto max-w-[920px] px-6 py-14">
      <div className="mx-auto max-w-[760px] space-y-5">
        {thoughts.map((thought) => (
          <article
            key={thought.id}
            className="rounded-2xl border border-zinc-100 bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.03)] dark:border-zinc-900 dark:bg-zinc-950"
          >
            <p className="mb-4 whitespace-pre-wrap text-[15px] leading-8 text-zinc-700 dark:text-zinc-200">
              {thought.content}
            </p>

            {thought.images && thought.images.length > 0 ? (
              <div className="mb-4">
                <ThoughtImageGallery images={thought.images} />
              </div>
            ) : null}

            <div className="flex items-center justify-between">
              <div className="text-[12px] text-zinc-300 dark:text-zinc-600">
                thoughts
              </div>
              <p className="text-right text-[12px] text-zinc-400 dark:text-zinc-500">
                {thought.createdAt.replace("T", " ").slice(0, 16).replaceAll("-", "/")}
              </p>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}