import { Octokit } from "@octokit/rest";
function getOctokit() { const token = process.env.GITHUB_TOKEN; return token ? new Octokit({ auth: token }) : null; }
function getRepoConfig() { const owner = process.env.GITHUB_OWNER; const repo = process.env.GITHUB_REPO; const branch = process.env.GITHUB_BRANCH || "main"; return owner && repo ? { owner, repo, branch } : null; }
function encodeContent(content: string) { return Buffer.from(content, "utf8").toString("base64"); }
export async function publishFileToGitHub(params: { path: string; content: string; message: string; }) {
  const octokit = getOctokit(); const repoConfig = getRepoConfig();
  if (!octokit || !repoConfig) return { ok: false as const, reason: "Missing GitHub environment variables. Set GITHUB_TOKEN, GITHUB_OWNER and GITHUB_REPO." };
  const { owner, repo, branch } = repoConfig; let sha: string | undefined;
  try { const existing = await octokit.repos.getContent({ owner, repo, path: params.path, ref: branch }); if (!Array.isArray(existing.data) && "sha" in existing.data) sha = existing.data.sha; } catch {}
  await octokit.repos.createOrUpdateFileContents({ owner, repo, branch, path: params.path, message: params.message, content: encodeContent(params.content), sha });
  return { ok: true as const };
}
