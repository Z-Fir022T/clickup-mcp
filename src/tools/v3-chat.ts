import { getApiToken } from "../clickup-client.js";

const BASE_V3 = "https://api.clickup.com/api/v3";

async function v3Request<T>(
  method: string,
  path: string,
  body?: unknown,
  params?: Record<string, string | number | boolean | undefined>
): Promise<T> {
  const token = getApiToken();

  let url = `${BASE_V3}${path}`;
  if (params) {
    const qs = Object.entries(params)
      .filter(([, v]) => v !== undefined)
      .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
      .join("&");
    if (qs) url += `?${qs}`;
  }

  const res = await fetch(url, {
    method,
    headers: { Authorization: token, "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json();
  if (!res.ok) throw new Error(`ClickUp v3 API error ${res.status}: ${JSON.stringify(data)}`);
  return data as T;
}

export const chatTools = [
  {
    name: "get_chat_channels",
    description: "Get chat channels in a workspace (API v3)",
    inputSchema: {
      type: "object",
      properties: {
        workspace_id: { type: "string" },
        include_archived: { type: "boolean" },
        cursor: { type: "string", description: "Pagination cursor" },
        limit: { type: "number" },
      },
      required: ["workspace_id"],
    },
    handler: async (args: { workspace_id: string; [key: string]: unknown }) => {
      const { workspace_id, ...params } = args;
      return v3Request(
        "GET",
        `/workspaces/${workspace_id}/channels`,
        undefined,
        params as Record<string, string | number | boolean | undefined>
      );
    },
  },
  {
    name: "create_chat_channel",
    description: "Create a chat channel (API v3)",
    inputSchema: {
      type: "object",
      properties: {
        workspace_id: { type: "string" },
        name: { type: "string" },
        is_private: { type: "boolean" },
        description: { type: "string" },
        member_ids: { type: "array", items: { type: "number" } },
      },
      required: ["workspace_id", "name"],
    },
    handler: async (args: { workspace_id: string; [key: string]: unknown }) => {
      const { workspace_id, ...body } = args;
      return v3Request("POST", `/workspaces/${workspace_id}/channels`, body);
    },
  },
  {
    name: "get_channel_messages",
    description: "Get messages from a chat channel (API v3)",
    inputSchema: {
      type: "object",
      properties: {
        workspace_id: { type: "string" },
        channel_id: { type: "string" },
        cursor: { type: "string" },
        limit: { type: "number" },
      },
      required: ["workspace_id", "channel_id"],
    },
    handler: async (args: {
      workspace_id: string;
      channel_id: string;
      cursor?: string;
      limit?: number;
    }) =>
      v3Request(
        "GET",
        `/workspaces/${args.workspace_id}/channels/${args.channel_id}/messages`,
        undefined,
        { cursor: args.cursor, limit: args.limit }
      ),
  },
  {
    name: "send_chat_message",
    description: "Send a message to a chat channel (API v3)",
    inputSchema: {
      type: "object",
      properties: {
        workspace_id: { type: "string" },
        channel_id: { type: "string" },
        content: { type: "string", description: "Message text" },
      },
      required: ["workspace_id", "channel_id", "content"],
    },
    handler: async (args: {
      workspace_id: string;
      channel_id: string;
      content: string;
    }) =>
      v3Request(
        "POST",
        `/workspaces/${args.workspace_id}/channels/${args.channel_id}/messages`,
        { content: args.content }
      ),
  },
];
