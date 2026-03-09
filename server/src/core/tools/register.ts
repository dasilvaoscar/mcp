import { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import { PULL_REQUEST_TOOL } from "./pull-request";

export class RegisterTools {
  constructor(private readonly register: McpServer) {}

  registerTools() {
    this.register.registerTool(...PULL_REQUEST_TOOL);
  }
}
