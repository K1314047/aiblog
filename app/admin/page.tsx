import { cookies } from "next/headers";
import { AdminPanel } from "@/components/admin-panel";
import Link from "next/link";
export const dynamic = "force-dynamic";
export default async function AdminPage() {
  const cookieStore = await cookies(); const authorized = cookieStore.get("admin-auth")?.value === "ok";
  return <main className="mx-auto max-w-reading px-6 py-20"><div className="mb-8 space-y-3"><h1 className="text-4xl font-semibold tracking-tight">后台</h1><p className="text-zinc-500 dark:text-zinc-400">这个后台默认用环境变量里的 ADMIN_PASSWORD 做保护，方便你本地先跑起来。</p></div>{!authorized ? <form action="/api/admin/login" method="post" className="max-w-md space-y-4 rounded-3xl border border-zinc-100 p-6 dark:border-zinc-900"><input name="password" type="password" placeholder="输入后台密码" className="w-full rounded-xl border border-zinc-200 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-950" /><button className="rounded-xl bg-zinc-900 px-5 py-3 text-white dark:bg-white dark:text-zinc-950">登录后台</button></form> : <AdminPanel />}<div className="mt-8 text-sm text-zinc-500 dark:text-zinc-400"><Link href="/" className="hover:text-zinc-900 dark:hover:text-white">返回前台</Link></div></main>;
}
