import { GithubService } from "@/application/services/github-service";
import { pullRequestToolShema } from "./pull-request-tool-schema";
import { PullRequestTool } from "./pull-requests-tool";

const githubService = new GithubService()
const pullRequestTool = new PullRequestTool(githubService);

export const PULL_REQUEST_TOOL: [
  string,
  typeof pullRequestToolShema,
  (args: Parameters<PullRequestTool["execute"]>[0]) => ReturnType<PullRequestTool["execute"]>
] = [
  "list_github_pull_requests",
  pullRequestToolShema,
  (args) => pullRequestTool.execute(args),
];