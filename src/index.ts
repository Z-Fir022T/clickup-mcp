import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

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

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("ClickUp MCP server running — tools: " + allTools.length);
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
