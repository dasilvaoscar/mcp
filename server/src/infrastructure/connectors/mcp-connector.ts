import { createMcpExpressApp } from "@modelcontextprotocol/sdk/server/express";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp";

export function createServer() {
  const httpServer = createMcpExpressApp();

  const mcpServer = new McpServer(
    { name: "my-server", version: "1.0.0" },
    { capabilities: { logging: {} } }
  );

  return { httpServer, mcpServer }
}