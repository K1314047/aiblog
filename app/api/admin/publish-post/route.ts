import { cookies } from "next/headers";
import { z } from "zod";
import { publishFileToGitHub } from "@/lib/github";
import { slugify } from "@/lib/utils";
const schema = z.object({ title: z.string().min(1), description: z.string().min(1), tags: z.string().optional().default(""), date: z.string().min(1), content: z.string().min(1) });
export async function POST(request: Request) {
  const cookieStore = await cookies(); if (cookieStore.get("admin-auth")?.value !== "ok") return Response.json({ ok: false, reason: "Unauthorized" }, { status: 401 });
  const parsed = schema.safeParse(await request.json()); if (!parsed.success) return Response.json({ ok: false, reason: "Invalid payload" }, { status: 400 });
  const data = parsed.data; const slug = slugify(data.title); const tags = data.tags.split(",").map((item) => item.trim()).filter(Boolean);
  const markdown = `---
title: "${data.title.replace(/"/g, '\"')}"
date: "${data.date}"
description: "${data.description.replace(/"/g, '\"')}"
tags: [${tags.map((tag) => `"${tag.replace(/"/g, '\"')}"`).join(", ")}]
draft: false
---

${data.content}
`;
  const path = `content/posts/${slug}.md`; const result = await publishFileToGitHub({ path, content: markdown, message: `publish(post): ${data.title}` });
  if (!result.ok) return Response.json({ ok: false, reason: result.reason }, { status: 400 });
  return Response.json({ ok: true, slug, path, message: "Published" });
}
