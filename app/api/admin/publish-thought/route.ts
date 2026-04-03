import { cookies } from "next/headers";
import { z } from "zod";
import { publishFileToGitHub } from "@/lib/github";
const schema = z.object({ content: z.string().min(1), images: z.string().optional().default("") });
export async function POST(request: Request) {
  const cookieStore = await cookies(); if (cookieStore.get("admin-auth")?.value !== "ok") return Response.json({ ok: false, reason: "Unauthorized" }, { status: 401 });
  const parsed = schema.safeParse(await request.json()); if (!parsed.success) return Response.json({ ok: false, reason: "Invalid payload" }, { status: 400 });
  const data = parsed.data; const createdAt = new Date().toISOString(); const id = createdAt.replace(/[:.]/g, "-"); const images = data.images.split(",").map((item) => item.trim()).filter(Boolean);
  const source = JSON.stringify({ id, content: data.content, createdAt, images }, null, 2);
  const path = `content/thoughts/${id}.json`; const result = await publishFileToGitHub({ path, content: source, message: "publish(thought): new thought" });
  if (!result.ok) return Response.json({ ok: false, reason: result.reason }, { status: 400 });
  return Response.json({ ok: true, path, message: "Published" });
}
