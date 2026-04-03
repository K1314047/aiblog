import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export async function POST(request: Request) {
  const formData = await request.formData(); const password = String(formData.get("password") ?? ""); const expected = process.env.ADMIN_PASSWORD;
  if (!expected || password != expected) return new Response("Invalid password", { status: 401 });
  const cookieStore = await cookies();
  cookieStore.set("admin-auth", "ok", { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/" });
  redirect("/admin");
}
