import fs from "node:fs";
import path from "node:path";
import { Thought } from "@/lib/types";
const thoughtsDirectory = path.join(process.cwd(), "content/thoughts");
export function getAllThoughts(): Thought[] {
  const filenames = fs.readdirSync(thoughtsDirectory).filter((file) => file.endsWith(".json"));
  return filenames.map((filename) => JSON.parse(fs.readFileSync(path.join(thoughtsDirectory, filename), "utf8")) as Thought).sort((a, b) => Number(new Date(b.createdAt)) - Number(new Date(a.createdAt)));
}
