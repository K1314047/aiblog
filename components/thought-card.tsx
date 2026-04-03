import { Thought } from "@/lib/types";
import { formatDate } from "@/lib/utils";
export function ThoughtCard({ thought }: { thought: Thought }) {
  return <article className="rounded-3xl border border-zinc-100 bg-zinc-50/60 p-5 shadow-soft dark:border-zinc-900 dark:bg-zinc-900/60"><p className="mb-5 whitespace-pre-wrap text-lg leading-9 text-zinc-800 dark:text-zinc-100">{thought.content}</p>{thought.images && thought.images.length > 0 ? <div className="mb-5 grid gap-3">{thought.images.map((image) => <img key={image} src={image} alt="" className="w-full rounded-2xl object-cover" />)}</div> : null}<p className="text-right text-sm text-zinc-400">{formatDate(thought.createdAt)}</p></article>;
}
