export function formatDate(date: string) {
  return new Intl.DateTimeFormat("zh-CN", { year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date(date));
}
export function groupPostsByYear<T extends { date: string }>(items: T[]) {
  const groups = new Map<string, T[]>();
  for (const item of items) {
    const year = new Date(item.date).getFullYear().toString();
    const existing = groups.get(year) ?? [];
    existing.push(item);
    groups.set(year, existing);
  }
  return [...groups.entries()].sort((a, b) => Number(b[0]) - Number(a[0]));
}
export function slugify(input: string) {
  return input.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");
}
