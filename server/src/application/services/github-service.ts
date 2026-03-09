export type PullRequestState = "open" | "closed" | "all";

export type PullRequest = {
  number: number;
  title: string;
  state: string;
  html_url: string;
  created_at: string;
  body: string | null;
  user: { login: string } | null;
};

export type GetPullRequestsResponse = {
  data: PullRequest[] | null;
  error: boolean;
};

export class GithubService {
  private readonly PULLS_URL = "https://api.github.com/repos";
  private readonly headers: any = {
    Accept: "application/vnd.github.v3+json",
  };

  async getPullRequests(
    owner: string,
    repo: string,
    state: PullRequestState,
  ): Promise<GetPullRequestsResponse> {
    const { headers } = this;
    const url = `${this.PULLS_URL}/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/pulls?state=${state}&per_page=100`;

    if (process.env.GITHUB_TOKEN && process.env.GITHUB_TOKEN !== "") {
      headers["Authorization"] = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const res = await fetch(url, { headers });

    if (!res.ok) return { data: null, error: true };

    const data = await res.json();

    return { data, error: false };
  }
}
