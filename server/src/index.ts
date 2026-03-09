import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp";
import { createServer } from "@/infrastructure/connectors/mcp-connector";
import { RegisterTools } from "./core/tools/register";

const { httpServer, mcpServer } = createServer()

const registerTools = new RegisterTools(mcpServer);
registerTools.registerTools();

httpServer.post("/mcp", async (req, res) => {
  try {
    const transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: undefined,
    });
    await mcpServer.connect(transport);
    await transport.handleRequest(req, res, req.body);

    res.on("close", () => {
      transport.close();
      mcpServer.close();
    });
  } catch (error) {
    console.error("Erro ao processar request MCP:", error);
    if (!res.headersSent) {
      res.status(500).json({
        jsonrpc: "2.0",
        error: { code: -32603, message: "Internal server error" },
        id: null,
      });
    }
  }
});

httpServer.listen(3000, "127.0.0.1", () => {
  console.log("MCP Server rodando em http://127.0.0.1:3000");
});
