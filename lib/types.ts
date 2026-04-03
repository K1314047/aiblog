export type PostMeta = { slug: string; title: string; date: string; description: string; tags: string[]; draft?: boolean; cover?: string; };
export type Post = PostMeta & { content: string };
export type Thought = { id: string; content: string; createdAt: string; images?: string[] };
