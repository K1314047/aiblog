import { getAllPosts } from "@/lib/posts";
import { getAllThoughts } from "@/lib/thoughts";
export function getSearchIndex() {
  const posts = getAllPosts().map((post) => ({ type: "post" as const, title: post.title, description: post.description, content: post.description, url: `/blog/${post.slug}`, date: post.date, tags: post.tags.join(" ") }));
  const thoughts = getAllThoughts().map((thought) => ({ type: "thought" as const, title: thought.content.slice(0, 32) || "Thought", description: thought.content, content: thought.content, url: "/thoughts", date: thought.createdAt, tags: "thoughts" }));
  return [...posts, ...thoughts].sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));
}
