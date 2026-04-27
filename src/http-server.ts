import { createServer, IncomingMessage, ServerResponse } from "node:http";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { tokenStorage } from "./clickup-client.js";

// v2 tools
import { authorizationTools } from "./tools/authorization.js";
import { attachmentTools } from "./tools/attachments.js";
import { teamTools } from "./tools/teams.js";
import { spaceTools } from "./tools/spaces.js";
import { folderTools } from "./tools/folders.js";
import { listTools } from "./tools/lists.js";
import { taskTools } from "./tools/tasks.js";
import { commentTools } from "./tools/comments.js";
import { timeTrackingTools } from "./tools/time-tracking.js";
import { timeTrackingLegacyTools } from "./tools/time-tracking-legacy.js";
import { goalTools } from "./tools/goals.js";
import { checklistTools } from "./tools/checklists.js";
import { webhookTools } from "./tools/webhooks.js";
import { viewTools } from "./tools/views.js";
import { customFieldTools } from "./tools/custom-fields.js";
import { customTaskTypeTools } from "./tools/custom-task-types.js";
import { docTools } from "./tools/docs.js";
import { guestTools } from "./tools/guests.js";
import { userTools } from "./tools/users.js";
import { roleTools } from "./tools/roles.js";
import { userGroupTools } from "./tools/user-groups.js";
import { sharedHierarchyTools } from "./tools/shared-hierarchy.js";
import { templateTools } from "./tools/templates.js";

// v3 tools
import { chatTools } from "./tools/v3-chat.js";
import { auditTools } from "./tools/v3-audit.js";
import { v3DocTools } from "./tools/v3-docs.js";

type ToolDef = {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  handler: (args: Record<string, unknown>) => Promise<unknown>;
};

const allTools: ToolDef[] = [
  // Authorization
  ...authorizationTools,
  // Core hierarchy
  ...teamTools,
  ...spaceTools,
  ...folderTools,
  ...listTools,
  ...taskTools,
  // Collaboration
  ...commentTools,
  ...checklistTools,
  // Attachments
  ...attachmentTools,
  // Time tracking
  ...timeTrackingTools,
  ...timeTrackingLegacyTools,
  // Planning
  ...goalTools,
  // Views & webhooks
  ...viewTools,
  ...webhookTools,
  // Custom fields & task types
  ...customFieldTools,
  ...customTaskTypeTools,
  // Docs (v2)
  ...docTools,
  // People & access
  ...userTools,
  ...guestTools,
  ...roleTools,
  ...userGroupTools,
  ...sharedHierarchyTools,
  // Templates
  ...templateTools,
  // API v3
  ...chatTools,
  ...auditTools,
  ...v3DocTools,
] as ToolDef[];

const toolMap = new Map(allTools.map((t) => [t.name, t]));

function createMcpServer(): Server {
  const server = new Server(
    { name: "clickup-mcp", version: "1.0.0" },
    { capabilities: { tools: {} } }
  );

  server.setRequestHandler(ListToolsRequestSchema, async () => ({
    tools: allTools.map(({ name, description, inputSchema }) => ({
      name,
      description,
      inputSchema,
    })),
  }));

  server.setRequestHandler(CallToolRequestSchema, async (req) => {
    const tool = toolMap.get(req.params.name);
    if (!tool) {
      return {
        content: [{ type: "text", text: `Unknown tool: ${req.params.name}` }],
        isError: true,
      };
    }

    try {
      const result = await tool.handler(
        (req.params.arguments ?? {}) as Record<string, unknown>
      );
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      return {
        content: [{ type: "text", text: `Error: ${message}` }],
        isError: true,
      };
    }
  });

  return server;
}

// Track active SSE transports and their tokens keyed by session ID
const activeTransports = new Map<string, SSEServerTransport>();
const sessionTokens = new Map<string, string>();

async function handleSse(req: IncomingMessage, res: ServerResponse) {
  const url = new URL(req.url ?? "/", `http://${req.headers.host}`);

  // Accept token from ?token= query param OR Authorization: Bearer header
  const token =
    url.searchParams.get("token") ??
    req.headers.authorization?.replace(/^Bearer\s+/i, "").trim() ??
    process.env.CLICKUP_API_TOKEN;

  if (!token || !token.startsWith("pk_")) {
    res.writeHead(401, { "Content-Type": "application/json" });
    res.end(JSON.stringify({
      error: "Missing or invalid ClickUp API token. Pass ?token=pk_... in the URL.",
    }));
    return;
  }

  const transport = new SSEServerTransport("/messages", res);
  activeTransports.set(transport.sessionId, transport);
  sessionTokens.set(transport.sessionId, token);

  res.on("close", () => {
    activeTransports.delete(transport.sessionId);
    sessionTokens.delete(transport.sessionId);
  });

  const mcpServer = createMcpServer();
  await mcpServer.connect(transport);
  await transport.start();
}

async function handleMessages(req: IncomingMessage, res: ServerResponse) {
  const url = new URL(req.url ?? "", `http://${req.headers.host}`);
  const sessionId = url.searchParams.get("sessionId");

  if (!sessionId) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Missing sessionId query parameter" }));
    return;
  }

  const transport = activeTransports.get(sessionId);
  if (!transport) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Session not found" }));
    return;
  }

  // Restore the per-session token into AsyncLocalStorage for this POST context
  const token = sessionTokens.get(sessionId);
  if (token) {
    await tokenStorage.run(token, () => transport.handlePostMessage(req, res));
  } else {
    await transport.handlePostMessage(req, res);
  }
}

function handleHealth(_req: IncomingMessage, res: ServerResponse) {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ status: "ok", tools: allTools.length }));
}

function notFound(_req: IncomingMessage, res: ServerResponse) {
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Not found" }));
}

const PORT = parseInt(process.env.PORT ?? "3000", 10);

const httpServer = createServer(async (req: IncomingMessage, res: ServerResponse) => {
  const pathname = new URL(req.url ?? "/", `http://${req.headers.host}`).pathname;

  try {
    if (req.method === "GET" && pathname === "/sse") {
      await handleSse(req, res);
    } else if (req.method === "POST" && pathname === "/messages") {
      await handleMessages(req, res);
    } else if (req.method === "GET" && pathname === "/health") {
      handleHealth(req, res);
    } else {
      notFound(req, res);
    }
  } catch (err) {
    console.error("Request error:", err);
    if (!res.headersSent) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Internal server error" }));
    }
  }
});

httpServer.listen(PORT, () => {
  console.log(`ClickUp MCP HTTP server listening on port ${PORT}`);
  console.log(`  /sse     — MCP SSE endpoint`);
  console.log(`  /health  — health check`);
  console.log(`  tools loaded: ${allTools.length}`);
});
