import * as z from "zod/v4";

export const pullRequestToolShema = {
  description:
    "Lista os pull requests de um repositório no GitHub.",
  inputSchema: {
    owner: z.string().describe("Dono do repositório (ex.: octocat)"),
    repo: z.string().describe("Nome do repositório (ex.: hello-world)"),
    state: z
      .enum(["open", "closed", "all"])
      .optional()
      .default("open")
      .describe('Estado dos PRs: "open", "closed" ou "all"'),
  },
};
