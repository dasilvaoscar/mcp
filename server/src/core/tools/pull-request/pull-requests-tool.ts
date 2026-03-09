import { GithubService, PullRequest, PullRequestState } from "@/application/services/github-service";

type PullRequestToolInput = {
  owner: string, 
  repo: string, 
  state: PullRequestState
}

export class PullRequestTool {
  constructor(private readonly repositoryHost: GithubService) {}

  async execute({ owner, repo, state }: PullRequestToolInput) {
    const { data, error } = await this.repositoryHost.getPullRequests(
      owner,
      repo,
      state,
    );

    if (error) {
      return {
        content: [
          { type: "text" as const, text: "Erro ao buscar pull requests." },
        ],
      };
    }

    const prs = data ?? [];
    const text = this.formatPullRequests(prs);
    return {
      content: [{ type: "text" as const, text }],
    };
  }

  private formatPullRequests(prs: PullRequest[]): string {
    if (prs.length === 0) {
      return "Nenhum pull request encontrado.";
    }

    const lines = prs.map(
      (pr) =>
        `- **#${pr.number}** [${pr.title}](${pr.html_url}) — ${pr.state} — @${pr.user?.login ?? "?"} — ${pr.created_at.slice(0, 10)} - ${pr.body ?? ""}`,
    );

    return lines.join("\n");
  }
}
